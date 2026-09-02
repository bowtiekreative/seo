/**
 * Rule resolution, project validation and experiment construction.
 *
 * `resolveRules` answers "which rules govern this situation, before I act". `validateProject`
 * checks a project document against the published JSON Schema. `buildExperiment` turns a
 * proposed change into an experiment card that the measurement system can actually decide.
 */

// The project schema declares draft 2020-12, so it needs Ajv's 2020 build rather than the
// default draft-07 export.
import Ajv from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

import { corpus } from '../corpus.js'
import { InputError } from './gates.js'

// ---------------------------------------------------------------------------
// Rule resolution
// ---------------------------------------------------------------------------

const csv = (v) => (v == null || v === '' ? null : [v].flat().flatMap((s) => String(s).split(',')).map((s) => s.trim()).filter(Boolean))

/** Case-insensitive membership, so `?level=minor` and `?level=Minor` behave the same. */
const includesCI = (list, value) => list.some((x) => String(x).toLowerCase() === String(value).toLowerCase())

/**
 * Filter the 144 rules.
 *
 * @param {object} q { q, area, level, operator, metric, id, prefix }
 */
export function filterRules (q = {}) {
  const areas = csv(q.area)
  const levels = csv(q.level)
  const operators = csv(q.operator)
  const metrics = csv(q.metric)
  const ids = csv(q.id)
  const prefixes = csv(q.prefix)
  const query = String(q.q ?? '').trim().toLowerCase()

  return corpus.rules.filter((r) => {
    if (areas && !areas.some((a) => includesCI([r.area, r.area_slug], a))) return false
    if (levels && !levels.some((l) => includesCI(r.laka_levels ?? [], l))) return false
    if (operators && !operators.some((o) => includesCI(r.operators ?? [], o))) return false
    if (metrics && !metrics.some((m) => String(r.primary_metric).toLowerCase().includes(m.toLowerCase()))) return false
    if (ids && !ids.some((id) => id.toUpperCase() === r.id)) return false
    if (prefixes && !prefixes.some((p) => p.toUpperCase() === r.prefix)) return false
    if (query) {
      const hay = `${r.id} ${r.title} ${r.if} ${r.then} ${r.else} ${r.area} ${r.primary_metric} ${r.guardrails} ${r.rationale}`.toLowerCase()
      if (!hay.includes(query)) return false
    }
    return true
  })
}

/** A rule with everything the corpus knows about it attached. */
export function expandRule (rule) {
  const area = corpus.areaBySlug.get(rule.area_slug)
  const gates = [...corpus.rulesByGate.entries()]
    .filter(([, ids]) => ids.includes(rule.id))
    .map(([field]) => field)
  return {
    ...rule,
    sentence: `IF ${rule.if} THEN ${rule.then} ELSE ${rule.else}`,
    area_detail: area ?? null,
    governs_gates: gates,
    precedence: corpus.operators.precedence ?? [],
    neighbours: corpus.rules.filter((r) => r.area === rule.area && r.id !== rule.id).map((r) => r.id),
    levels: (rule.laka_levels ?? []).map((name) => corpus.levelsById.get(corpus.lakaLevels.find((l) => l.name === name)?.id) ?? { name })
  }
}

/**
 * Which rules govern a context, before you act.
 *
 * Filters by area, LAKA level and stage, then orders by the published precedence so the
 * caller sees what binds hardest first.
 */
export function resolveRules (body = {}) {
  if (body == null || typeof body !== 'object' || Array.isArray(body)) {
    throw new InputError('The request body must be a JSON object.')
  }

  const rules = filterRules({
    area: body.area,
    level: body.level,
    operator: body.operator,
    q: body.q
  })

  if (body.area) {
    const wanted = csv(body.area)
    const known = corpus.areas.flatMap((a) => [a.name.toLowerCase(), a.slug])
    const unknownAreas = wanted.filter((a) => !known.includes(a.toLowerCase()))
    if (unknownAreas.length) {
      throw new InputError(`Unknown areas: ${unknownAreas.join(', ')}. See GET /v1/areas.`, 'area')
    }
  }

  if (body.level) {
    const wanted = csv(body.level)
    const known = corpus.lakaLevels.map((l) => l.name.toLowerCase())
    const unknownLevels = wanted.filter((l) => !known.includes(l.toLowerCase()))
    if (unknownLevels.length) {
      throw new InputError(`Unknown LAKA levels: ${unknownLevels.join(', ')}. Valid: ${corpus.lakaLevels.map((l) => l.name).join(', ')}.`, 'level')
    }
  }

  // Precedence maps onto rule areas: a technical-eligibility rule outranks a cosmetic one.
  const PRECEDENCE_AREAS = {
    safety_law_privacy_policy: ['Generative Search, Scale, and Governance'],
    user_value_and_accuracy: ['Content, Format, and Evidence', 'Audience and Journey'],
    technical_eligibility_and_canonical_correctness: ['Technical Eligibility', 'Clustering and Canonical Ownership'],
    business_value_and_constraints: ['Business Value'],
    intent_fit_and_information_quality: ['Semantic Demand', 'External Authority and Earned Evidence'],
    measurement_and_learning: ['Measurement and Experimentation'],
    efficiency_and_scale: ['Internal Graph and Architecture'],
    cosmetic_optimization: ['On-page and Search Appearance', 'Conversion and Experience']
  }
  const rank = new Map()
  ;(corpus.operators.precedence ?? []).forEach((band, i) => {
    for (const area of PRECEDENCE_AREAS[band] ?? []) rank.set(area, i)
  })

  const ordered = [...rules].sort((a, b) =>
    (rank.get(a.area) ?? 99) - (rank.get(b.area) ?? 99) || a.id.localeCompare(b.id))

  return {
    query: {
      area: body.area ?? null,
      level: body.level ?? null,
      operator: body.operator ?? null,
      q: body.q ?? null
    },
    count: ordered.length,
    precedence: corpus.operators.precedence ?? [],
    precedence_note: 'Rules conflict. When they do, the earlier band wins — safety before value, value before cosmetics.',
    hard_gates: corpus.hardGates.map((g) => ({ field: g.field, name: g.name, order: g.order })),
    priority_order: corpus.gates.priority_order ?? [],
    minimum_operating_rule: [
      'An SEO action is not ready for execution until it can name:',
      '1. the audience', '2. the task', '3. the intended canonical asset',
      '4. the expected mechanism', '5. the primary metric', '6. the decision rule'
    ],
    rules: ordered.map((r) => ({
      id: r.id,
      title: r.title,
      area: r.area,
      precedence_band: (corpus.operators.precedence ?? [])[rank.get(r.area)] ?? null,
      laka_levels: r.laka_levels,
      if: r.if,
      then: r.then,
      else: r.else,
      primary_metric: r.primary_metric,
      guardrails: r.guardrails,
      href: `/v1/rules/${r.id}`
    }))
  }
}

// ---------------------------------------------------------------------------
// Project validation
// ---------------------------------------------------------------------------

const ajv = new Ajv({ allErrors: true, strict: false, allowUnionTypes: true })
addFormats(ajv)
const validateSchema = ajv.compile(corpus.projectSchema)

/** Validate a project document against the published JSON Schema. */
export function validateProject (document) {
  if (document == null || typeof document !== 'object' || Array.isArray(document)) {
    throw new InputError('The project document must be a JSON object.')
  }

  const valid = validateSchema(document)
  const errors = (validateSchema.errors ?? []).map((e) => ({
    path: e.instancePath || '/',
    keyword: e.keyword,
    message: e.message,
    params: e.params
  }))

  // Beyond schema conformance, check the things the grammar treats as completeness gates.
  // These read the field names the published schema actually declares.
  const advisories = []
  const clusters = document.clusters ?? []
  const assets = document.assets ?? []
  const changes = document.changes ?? []

  const add = (level, gate, message) => advisories.push({ level, gate, message })

  // Canonical ownership: exactly one owner per cluster, and one cluster per owner.
  const owners = new Map()
  for (const c of clusters) {
    const id = c.id ?? '(unnamed cluster)'
    const owner = c.canonical_owner
    if (!owner) {
      add('warning', 'distinct_task', `Cluster ${id} names no canonical_owner. Exactly one asset must own a cluster, or the value divides between them.`)
      continue
    }
    if (!owners.has(owner)) owners.set(owner, [])
    owners.get(owner).push(id)
  }
  for (const [owner, ids] of owners) {
    if (ids.length > 1) {
      add('blocking', 'distinct_task', `Canonical conflict: ${owner} is the canonical owner of ${ids.length} clusters (${ids.join(', ')}). One owner may own one cluster.`)
    }
  }

  // Assets must belong to a cluster that exists — an orphan asset has no demand behind it.
  const clusterIds = new Set(clusters.map((c) => c.id).filter(Boolean))
  for (const a of assets) {
    const id = a.id ?? a.url ?? '(unnamed asset)'
    if (!a.cluster_id) add('warning', 'distinct_task', `Asset ${id} names no cluster_id, so no demand is attached to it.`)
    else if (clusterIds.size && !clusterIds.has(a.cluster_id)) {
      add('warning', 'distinct_task', `Asset ${id} points at cluster ${a.cluster_id}, which this project does not define.`)
    }
  }

  // Clusters with a canonical owner that no asset implements.
  const assetUrls = new Set(assets.flatMap((a) => [a.url, a.id]).filter(Boolean))
  for (const c of clusters) {
    if (c.canonical_owner && assetUrls.size && !assetUrls.has(c.canonical_owner)) {
      add('warning', 'distinct_task', `Cluster ${c.id ?? '?'} names ${c.canonical_owner} as canonical owner, but no asset in this project implements it.`)
    }
  }

  // The measurement gate: a primary outcome, a baseline, a change ID, an observation method
  // and a decision rule must all be defined.
  if (!document.measurement) {
    add('blocking', 'measurement', 'No measurement block. The measurement gate cannot pass, so nothing in this project is ready for execution.')
  } else if (!document.measurement.primary_business_metric) {
    add('blocking', 'measurement', 'The measurement block names no primary_business_metric. Traffic and rankings are diagnostics, not the primary outcome.')
  }

  if (!changes.length) {
    add('warning', 'measurement', 'No changes recorded. Without change IDs, no outcome can be attributed to anything.')
  }
  for (const c of changes) {
    const id = c.id ?? '(unnamed change)'
    const missing = ['primary_metric', 'baseline', 'decision_rule'].filter((f) => !c[f])
    if (missing.length) {
      add('blocking', 'measurement', `Change ${id} is missing ${missing.join(', ')}. A change without these cannot be read as a result, only as a hope.`)
    }
    if (c.laka_level && !c.rollback && !/baseline/i.test(c.laka_level)) {
      add('warning', 'maintainability', `Change ${id} is a ${c.laka_level} with no rollback. The more a change propagates, the more the rollback matters.`)
    }
  }

  return {
    valid,
    schema: corpus.projectSchema.$id ?? corpus.projectSchema.title ?? 'LAKA SEO Project',
    error_count: errors.length,
    errors,
    advisories,
    advisory_note: 'Advisories are completeness checks from the grammar, not schema violations. A document can be schema-valid and still fail the measurement gate.',
    counts: {
      audiences: (document.audiences ?? []).length,
      semantic_nodes: (document.semantic_nodes ?? []).length,
      clusters: clusters.length,
      assets: assets.length,
      graph_edges: (document.graph_edges ?? []).length,
      changes: (document.changes ?? []).length
    }
  }
}

// ---------------------------------------------------------------------------
// Experiments
// ---------------------------------------------------------------------------

const REQUIRED_EXPERIMENT_FIELDS = ['object', 'intervention', 'primary_metric', 'mechanism']

/**
 * Turn a proposed change into an experiment card.
 *
 * The hypothesis grammar is fixed: an intervention applied to an object under conditions
 * changes a primary metric in a direction because of a mechanism, while guardrails hold. A
 * card missing any of those is not an experiment — it is a hope, and this says so.
 */
export function buildExperiment (body = {}) {
  if (body == null || typeof body !== 'object' || Array.isArray(body)) {
    throw new InputError('The request body must be a JSON object.')
  }

  const missing = REQUIRED_EXPERIMENT_FIELDS.filter((f) => !String(body[f] ?? '').trim())
  const level = body.laka_level ? String(body.laka_level) : null

  if (level && !corpus.lakaLevels.some((l) => l.name.toLowerCase() === level.toLowerCase())) {
    throw new InputError(`Unknown LAKA level "${level}". Valid: ${corpus.lakaLevels.map((l) => l.name).join(', ')}.`, 'laka_level')
  }

  const direction = body.direction ? String(body.direction) : 'increases'
  const guardrails = [body.guardrails ?? []].flat().filter(Boolean)

  const hypothesis = missing.length
    ? null
    : `IF ${body.intervention} is applied to ${body.object}${body.conditions ? ` under ${body.conditions}` : ''}, THEN ${body.primary_metric} ${direction} because ${body.mechanism}${guardrails.length ? `, while ${guardrails.join(' and ')} pass` : ''}.`

  const levelRecord = level
    ? corpus.lakaLevels.find((l) => l.name.toLowerCase() === level.toLowerCase())
    : null

  return {
    ready: missing.length === 0,
    missing_fields: missing,
    hypothesis,
    card: {
      change_id: body.change_id ?? null,
      object: body.object ?? null,
      laka_level: levelRecord?.name ?? null,
      intervention: body.intervention ?? null,
      conditions: body.conditions ?? null,
      primary_metric: body.primary_metric ?? null,
      direction,
      mechanism: body.mechanism ?? null,
      guardrails,
      baseline: body.baseline ?? null,
      minimum_exposure: body.minimum_exposure ?? null,
      decision_rule: body.decision_rule ?? null,
      rollback: body.rollback ?? null
    },
    unresolved: [
      ...(body.baseline ? [] : ['No baseline. Without one the result cannot be read as a change.']),
      ...(body.minimum_exposure ? [] : ['No minimum exposure. Set it before launch, not after seeing the data.']),
      ...(body.decision_rule ? [] : ['No decision rule. Decide in advance what result produces which action.']),
      ...(body.rollback || levelRecord?.name === 'Baseline' ? [] : ['No rollback plan.']),
      ...(guardrails.length ? [] : ['No guardrails. Name what must not get worse.'])
    ],
    reversibility: levelRecord ? REVERSIBILITY_NOTE[levelRecord.name] ?? null : null,
    available_decisions: corpus.experiments.decision_names ?? [],
    decisions: corpus.experiments.decisions ?? [],
    grammar: corpus.experiments.hypothesis_grammar ?? [],
    note: 'A change without a hypothesis, a primary metric and a decision rule is not measurable, and the grammar treats it as not ready for execution.'
  }
}

const REVERSIBILITY_NOTE = {
  Baseline: 'Fully reversible — observation changes nothing.',
  Minor: 'Reversible within a day. Keep the previous value in the change record.',
  Major: 'Reversible with effort. Archive the previous asset before replacing it.',
  Structural: 'Partly reversible. Redirects, merges and template changes propagate; plan the rollback first.',
  Paradigm: 'Rarely reversible. Treat as a funded bet with an explicit stop rule.'
}
