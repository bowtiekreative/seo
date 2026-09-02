/**
 * Engine tests.
 *
 * The most important of these is `matches the reference Python implementation`: the whole
 * point of porting `tools/laka_seo_engine.py` is that a candidate document scores the same
 * whichever implementation runs it, so that expectation is pinned to the exact numbers the
 * Python tool produces for the shipped worked example.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'

import { corpus } from '../server/corpus.js'
import { evaluateCandidate, scoreEquation, InputError, HARD_GATES, VALUE_FACTORS, COST_FACTORS } from '../server/engine/gates.js'
import { sizeVolume, theoreticalVolume, boundedSample, MAX_SAMPLE } from '../server/engine/volume.js'
import { decideCluster, changeMatrix } from '../server/engine/cluster.js'
import { filterRules, resolveRules, validateProject, buildExperiment } from '../server/engine/resolve.js'
import { buildOpenApi } from '../server/openapi.js'

const passingGates = Object.fromEntries(HARD_GATES.map((g) => [g, true]))

// ---------------------------------------------------------------------------
// Corpus integrity
// ---------------------------------------------------------------------------

test('corpus loads the published inventory', () => {
  const inv = corpus.manifest.inventory
  assert.equal(corpus.rules.length, 144)
  assert.equal(corpus.rules.length, inv.rules)
  assert.equal(corpus.areas.length, 12)
  assert.equal(corpus.hardGates.length, 8)
  assert.equal(corpus.lakaLevels.length, 5)
  assert.equal(corpus.dimensionFamilies.length, 12)
  assert.equal(corpus.documents.length, 10)
  assert.equal(corpus.taskFormats.length, 12)
})

test('every rule is complete and uniquely identified', () => {
  const ids = new Set()
  for (const r of corpus.rules) {
    assert.ok(!ids.has(r.id), `duplicate rule id ${r.id}`)
    ids.add(r.id)
    for (const field of ['title', 'area', 'if', 'then', 'else', 'primary_metric', 'guardrails', 'rationale']) {
      assert.ok(String(r[field] ?? '').trim(), `${r.id} has an empty ${field}`)
    }
    assert.ok(r.laka_levels.length, `${r.id} declares no LAKA level`)
    for (const level of r.laka_levels) {
      assert.ok(corpus.lakaLevels.some((l) => l.name === level), `${r.id} names unknown level ${level}`)
    }
  }
})

test('each of the twelve areas holds exactly twelve rules', () => {
  for (const area of corpus.areas) {
    assert.equal(corpus.rules.filter((r) => r.area === area.name).length, 12, area.name)
  }
})

test('every gate names either its conditions or where it is defined', () => {
  for (const gate of corpus.hardGates) {
    assert.ok(gate.conditions.length || gate.defined_by.length, `${gate.field} specifies nothing`)
    assert.ok(corpus.rulesByGate.get(gate.field)?.length, `${gate.field} has no governing rules`)
  }
})

// ---------------------------------------------------------------------------
// Candidate evaluation
// ---------------------------------------------------------------------------

test('matches the reference Python implementation on the worked example', () => {
  // Expected values produced by:
  //   python tools/laka_seo_engine.py evaluate examples/sample-candidate.json
  const result = evaluateCandidate(corpus.examples.candidate)
  assert.equal(result.candidate_id, 'YYC-COST-001')
  assert.equal(result.hard_gate_pass, true)
  assert.deepEqual(result.failed_gates, [])
  assert.equal(result.value_index, 3.864)
  assert.equal(result.cost_index, 2.7019)
  assert.equal(result.raw_priority, 1.4301)
  assert.equal(result.evidence_confidence, 0.8)
  assert.equal(result.measurement_confidence, 0.85)
  assert.equal(result.adjusted_priority, 0.9725)
  assert.equal(result.decision, 'P3')
})

test('a missing gate is an error, never an implied pass', () => {
  const { gates, ...rest } = corpus.examples.candidate
  const partial = { ...rest, gates: { demand: true } }
  assert.throws(() => evaluateCandidate(partial), (err) => {
    assert.ok(err instanceof InputError)
    assert.equal(err.field, 'gates')
    assert.match(err.message, /Missing hard-gate fields/)
    return true
  })
})

test('a non-boolean gate is rejected rather than coerced', () => {
  const doc = {
    gates: { ...passingGates, demand: 'yes' },
    scores: {},
    costs: {}
  }
  assert.throws(() => evaluateCandidate(doc), /true or false/)
})

test('any failed gate blocks publication and routes the candidate', () => {
  const result = evaluateCandidate({
    gates: { ...passingGates, compliance: false },
    scores: Object.fromEntries(VALUE_FACTORS.map((f) => [f, 5])),
    costs: Object.fromEntries(COST_FACTORS.map((f) => [f, 1]))
  })
  assert.equal(result.hard_gate_pass, false)
  assert.deepEqual(result.failed_gates, ['compliance'])
  // Perfect scores must not rescue a failed gate.
  assert.equal(result.adjusted_priority, 0)
  assert.equal(result.decision, 'REJECT_OR_RESEARCH')
  assert.equal(result.routing.length, 1)
  assert.match(result.routing[0].action, /not tradeable/)
})

test('scores outside 0–5 are rejected', () => {
  const base = { gates: passingGates, costs: {} }
  assert.throws(() => evaluateCandidate({ ...base, scores: { demand_confidence: 6 } }), /between 0 and 5/)
  assert.throws(() => evaluateCandidate({ ...base, scores: { demand_confidence: -1 } }), /between 0 and 5/)
  assert.throws(() => evaluateCandidate({ ...base, scores: { demand_confidence: 'high' } }), /must be a number/)
})

test('confidence must be a probability', () => {
  assert.throws(() => evaluateCandidate({
    gates: passingGates, scores: {}, costs: {}, confidence: { evidence: 1.5 }
  }), /between 0 and 1/)
})

test('an unrated cost is floored, so priority stays finite', () => {
  const result = evaluateCandidate({
    gates: passingGates,
    scores: Object.fromEntries(VALUE_FACTORS.map((f) => [f, 5])),
    costs: Object.fromEntries(COST_FACTORS.map((f) => [f, 0]))
  })
  assert.ok(Number.isFinite(result.adjusted_priority))
  assert.equal(result.cost_index, 0.2)
})

test('one zero value factor collapses the whole value index', () => {
  const scores = Object.fromEntries(VALUE_FACTORS.map((f) => [f, 5]))
  scores.information_advantage = 0
  const result = evaluateCandidate({ gates: passingGates, scores, costs: Object.fromEntries(COST_FACTORS.map((f) => [f, 1])) })
  assert.equal(result.value_index, 0)
  assert.equal(result.decision, 'REJECT_OR_REDESIGN')
})

// ---------------------------------------------------------------------------
// Volume
// ---------------------------------------------------------------------------

test('theoretical volume is exact beyond 2^53', () => {
  const dimensions = Object.fromEntries(
    Array.from({ length: 20 }, (_, i) => [`d${i}`, Array.from({ length: 10 }, (_, j) => j)])
  )
  const v = theoreticalVolume(dimensions)
  assert.equal(v.exact, '100000000000000000000')
  assert.equal(v.is_exact_in_double, false)
})

test('the published families multiply to the documented volume', () => {
  const result = sizeVolume({ use_published_dimensions: true })
  assert.equal(result.dimension_count, 12)
  assert.equal(result.theoretical_volume.exact, String(corpus.dimensions.theoretical_volume))
})

test('sampling is bounded, deterministic and free of duplicates', () => {
  const dimensions = Object.fromEntries(
    Array.from({ length: 12 }, (_, i) => [`d${i}`, Array.from({ length: 12 }, (_, j) => `v${j}`)])
  )
  const a = boundedSample(dimensions, 200, 7)
  const b = boundedSample(dimensions, 200, 7)
  assert.equal(a.length, 200)
  assert.deepEqual(a, b, 'the same seed must return the same sample')
  assert.equal(new Set(a.map((r) => JSON.stringify(r))).size, 200, 'samples must be distinct')
})

test('a small space is sampled without replacement and cannot over-draw', () => {
  const dimensions = { a: [1, 2], b: ['x', 'y'] }
  const rows = boundedSample(dimensions, 99)
  assert.equal(rows.length, 4)
  assert.equal(new Set(rows.map((r) => JSON.stringify(r))).size, 4)
})

test('the sample cap is enforced', () => {
  assert.throws(() => boundedSample({ a: [1, 2] }, MAX_SAMPLE + 1), /capped at/)
})

test('an empty dimension is rejected', () => {
  assert.throws(() => sizeVolume({ dimensions: { a: [] } }), /non-empty array/)
  assert.throws(() => sizeVolume({ dimensions: {} }), /At least one dimension/)
})

test('sizing without a sample returns no rows', () => {
  const result = sizeVolume({ dimensions: { a: [1, 2], b: [3, 4] } })
  assert.equal(result.sample, undefined)
  assert.equal(result.theoretical_volume.exact, '4')
  assert.match(result.warning, /not a publishing target/)
})

// ---------------------------------------------------------------------------
// Cluster
// ---------------------------------------------------------------------------

const allMatch = {
  same_sense: true,
  same_task: true,
  compatible_answer_structure: true,
  compatible_result_class: true,
  compatible_next_action: true
}

test('all five conditions matching merges to one canonical owner', () => {
  const result = decideCluster({ facts: allMatch })
  assert.equal(result.decision, 'MERGE')
  assert.match(result.actions.join(' '), /exactly one canonical owner/)
})

test('any differing condition splits', () => {
  const result = decideCluster({ facts: { ...allMatch, same_task: false } })
  assert.equal(result.decision, 'SPLIT')
  assert.match(result.because.join(' '), /task differs/)
})

test('an unknown condition tests rather than multiplying pages', () => {
  const { compatible_result_class: _omitted, ...partial } = allMatch
  const result = decideCluster({ facts: partial })
  assert.equal(result.decision, 'TEST')
  assert.deepEqual(result.unknown_facts, ['compatible_result_class'])
  assert.match(result.actions.join(' '), /one provisional cluster/)
})

test('a hard split overrides five matching conditions', () => {
  const result = decideCluster({ facts: { ...allMatch, legal_context_differs: true } })
  assert.equal(result.decision, 'SPLIT')
  assert.deepEqual(result.hard_splits, ['legal_context_differs'])
})

test('a high-value separate page forces a deliberate split decision', () => {
  const result = decideCluster({ facts: allMatch, separate_page_value: 'high' })
  assert.equal(result.decision, 'SPLIT')
  assert.match(result.because.join(' '), /rather than low/)
})

test('an unknown fact name is rejected rather than ignored', () => {
  assert.throws(() => decideCluster({ facts: { same_vibe: true } }), /Unknown facts/)
})

// ---------------------------------------------------------------------------
// Equation
// ---------------------------------------------------------------------------

test('the governing equation multiplies and names the weakest link', () => {
  const result = scoreEquation({
    factors: { valuable_demand: 0.5, technical_eligibility: 1, intent_fit: 0.2 }
  })
  assert.equal(result.scored_count, 3)
  assert.equal(result.product_of_scored, 0.1)
  assert.equal(result.weakest_link.id, 'intent_fit')
  assert.equal(result.is_complete, false)
  assert.equal(result.missing_factors.length, 7)
})

test('an unscored factor is unknown, not assumed to be one', () => {
  const result = scoreEquation({ factors: { valuable_demand: 1 } })
  assert.match(result.interpretation, /can only reduce/)
  assert.equal(result.factors.filter((f) => f.supplied).length, 1)
})

test('unknown equation factors are rejected', () => {
  assert.throws(() => scoreEquation({ factors: { vibes: 1 } }), /Unknown factors/)
})

// ---------------------------------------------------------------------------
// Rules and resolution
// ---------------------------------------------------------------------------

test('rules filter by area, level and free text, case-insensitively', () => {
  assert.equal(filterRules({ area: 'technical-eligibility' }).length, 12)
  assert.equal(filterRules({ area: 'Technical Eligibility' }).length, 12)
  assert.equal(filterRules({ level: 'paradigm' }).length, filterRules({ level: 'Paradigm' }).length)
  assert.ok(filterRules({ q: 'canonical' }).length > 0)
  assert.equal(filterRules({ id: 'BIZ-001' }).length, 1)
  assert.equal(filterRules({}).length, 144)
})

test('resolve orders by precedence, hardest-binding first', () => {
  const result = resolveRules({})
  assert.equal(result.count, 144)
  const bands = result.rules.map((r) => r.precedence_band)
  const ranks = bands.map((b) => result.precedence.indexOf(b))
  assert.deepEqual(ranks, [...ranks].sort((a, b) => a - b), 'rules must come back in precedence order')
})

test('resolve rejects an area or level it does not know', () => {
  assert.throws(() => resolveRules({ area: 'vibes' }), /Unknown areas/)
  assert.throws(() => resolveRules({ level: 'Enormous' }), /Unknown LAKA levels/)
})

// ---------------------------------------------------------------------------
// Change matrix and experiments
// ---------------------------------------------------------------------------

test('the change matrix covers all five levels and needs an object', () => {
  const result = changeMatrix({ object: '/services/web-design' })
  assert.equal(result.levels.length, 5)
  assert.equal(result.levels[0].level, 'Baseline')
  assert.ok(result.levels.every((l) => l.reversibility))
  assert.throws(() => changeMatrix({}), /`object` is required/)
})

test('an experiment reports exactly what it is missing', () => {
  const bare = buildExperiment({
    object: '/x', intervention: 'a rewrite', primary_metric: 'clicks', mechanism: 'clearer promise'
  })
  assert.equal(bare.ready, true)
  assert.match(bare.hypothesis, /^IF a rewrite is applied to \/x, THEN clicks increases because/)
  assert.ok(bare.unresolved.some((u) => /baseline/i.test(u)))
  assert.ok(bare.unresolved.some((u) => /decision rule/i.test(u)))

  const incomplete = buildExperiment({ object: '/x' })
  assert.equal(incomplete.ready, false)
  assert.deepEqual(incomplete.missing_fields, ['intervention', 'primary_metric', 'mechanism'])
  assert.equal(incomplete.hypothesis, null)
})

test('an experiment rejects a LAKA level that does not exist', () => {
  assert.throws(() => buildExperiment({
    object: '/x', intervention: 'a', primary_metric: 'b', mechanism: 'c', laka_level: 'Gigantic'
  }), /Unknown LAKA level/)
})

// ---------------------------------------------------------------------------
// Project validation
// ---------------------------------------------------------------------------

test('the worked example project is schema-valid', () => {
  const result = validateProject(corpus.examples.project)
  assert.equal(result.valid, true)
  assert.equal(result.error_count, 0)
})

test('completeness advisories are separate from schema errors', () => {
  // The shipped example is schema-valid but its one change has a null baseline, so the
  // measurement gate cannot pass. That distinction is the point of the advisories.
  const result = validateProject(corpus.examples.project)
  const blocking = result.advisories.filter((a) => a.level === 'blocking')
  assert.ok(blocking.some((a) => a.gate === 'measurement' && /baseline/.test(a.message)))
})

test('a missing measurement block blocks the whole project', () => {
  const result = validateProject({ project_id: 'x' })
  assert.equal(result.valid, false)
  assert.ok(result.advisories.some((a) => a.level === 'blocking' && a.gate === 'measurement'))
})

test('two clusters sharing one canonical owner is a conflict', () => {
  const result = validateProject({
    project_id: 'p',
    version: '1',
    business: {},
    audiences: [],
    clusters: [
      { id: 'C1', canonical_owner: '/same/' },
      { id: 'C2', canonical_owner: '/same/' }
    ],
    changes: [],
    measurement: { primary_business_metric: 'margin' }
  })
  assert.ok(result.advisories.some((a) => a.level === 'blocking' && /Canonical conflict/.test(a.message)))
})

// ---------------------------------------------------------------------------
// OpenAPI
// ---------------------------------------------------------------------------

test('the OpenAPI document describes every declared endpoint', async () => {
  const spec = buildOpenApi()
  assert.equal(spec.openapi, '3.1.0')
  const { ENDPOINTS } = await import('../server/routes/api.js')
  for (const e of ENDPOINTS) {
    const path = e.path.replace(/\{(\w+)\}/g, '{$1}')
    assert.ok(spec.paths[path], `OpenAPI is missing ${e.method} ${e.path}`)
    assert.ok(spec.paths[path][e.method.toLowerCase()], `OpenAPI is missing the ${e.method} on ${e.path}`)
  }
})

test('the OpenAPI counts come from the live corpus', () => {
  const spec = buildOpenApi()
  assert.match(spec.info.description, new RegExp(`${corpus.rules.length} decision rules`))
  assert.equal(spec.info.version, corpus.manifest.version)
})
