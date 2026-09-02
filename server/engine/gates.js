/**
 * Candidate evaluation: the eight hard publication gates, then the soft priority score.
 *
 * This is a port of the reference implementation shipped with the grammar package,
 * `tools/laka_seo_engine.py`. It is deliberately faithful: the same gate fields, the same
 * factor lists, the same 0.2 cost floor, the same geometric means and the same priority
 * bands, so a candidate document scores identically whichever implementation runs it.
 *
 * One documented divergence from document 03 §8, inherited from the reference tool: the
 * prose lists eight value factors and treats the existing-asset signal as a separate
 * multiplier, while the tool folds `existing_signal` into the numerator as a ninth factor.
 * The tool's behaviour wins here, and `notes` on the result says so.
 */

import { corpus } from '../corpus.js'

/** Gate fields, in the order the APPROVE expression conjoins them. */
export const HARD_GATES = corpus.hardGates.map((g) => g.field)

export const VALUE_FACTORS = [
  'demand_confidence',
  'business_fit',
  'task_value',
  'information_advantage',
  'conversion_value',
  'attainability',
  'existing_signal',
  'reuse_potential',
  'learning_value'
]

export const COST_FACTORS = [
  'production_effort',
  'technical_risk',
  'maintenance_burden',
  'time_to_learning',
  'opportunity_cost'
]

/** A multiplicative model cannot take a zero, so uncertain-but-nonzero costs floor here. */
const COST_FLOOR = 0.2

/** Priority bands. Transparent heuristics, not search-engine scores. */
export const BANDS = [
  { min: 1.50, decision: 'P0_OR_P1', meaning: 'Schedule now. High value against low cost and risk.' },
  { min: 1.00, decision: 'P2', meaning: 'Schedule in the current cycle.' },
  { min: 0.60, decision: 'P3', meaning: 'Backlog. Revisit when cost falls or evidence improves.' },
  { min: 0, decision: 'P4_MONITOR_OR_EXPERIMENT', meaning: 'Do not build yet. Monitor, or run a cheap experiment first.', exclusive: true }
]

export class InputError extends Error {
  constructor (message, field) {
    super(message)
    this.name = 'InputError'
    this.field = field ?? null
    this.statusCode = 400
  }
}

const isNumber = (v) => typeof v === 'number' && Number.isFinite(v)

function boundedScore (value, name) {
  if (!isNumber(value)) throw new InputError(`${name} must be a number from 0 to 5.`, name)
  if (value < 0 || value > 5) throw new InputError(`${name} must be between 0 and 5; got ${value}.`, name)
  return value
}

function probability (value, name) {
  if (!isNumber(value)) throw new InputError(`${name} must be a probability from 0 to 1.`, name)
  if (value < 0 || value > 1) throw new InputError(`${name} must be between 0 and 1; got ${value}.`, name)
  return value
}

export function geometricMean (values) {
  if (!values.length) throw new InputError('Cannot take a geometric mean of an empty list.')
  if (values.some((v) => v === 0)) return 0
  return Math.exp(values.reduce((sum, v) => sum + Math.log(v), 0) / values.length)
}

const round = (n, places = 4) => Number(n.toFixed(places))

function requireObject (value, name) {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    throw new InputError(`\`${name}\` must be a JSON object.`, name)
  }
  return value
}

/**
 * Evaluate one candidate.
 *
 * @param {object} document  { id?, gates, scores, costs, confidence? }
 * @returns the gate verdict, the value/cost indices, the adjusted priority and the decision.
 */
export function evaluateCandidate (document) {
  requireObject(document, 'candidate')
  const gates = requireObject(document.gates, 'gates')

  const missing = HARD_GATES.filter((name) => !(name in gates))
  if (missing.length) {
    throw new InputError(`Missing hard-gate fields: ${missing.join(', ')}.`, 'gates')
  }

  const notBoolean = HARD_GATES.filter((name) => typeof gates[name] !== 'boolean')
  if (notBoolean.length) {
    throw new InputError(
      `Hard gates must be true or false, never absent or partial: ${notBoolean.join(', ')}.`,
      'gates'
    )
  }

  const failedGates = HARD_GATES.filter((name) => gates[name] !== true)
  const gatePass = failedGates.length === 0

  const scores = requireObject(document.scores, 'scores')
  const costs = requireObject(document.costs, 'costs')
  const confidence = requireObject(document.confidence ?? {}, 'confidence')

  const valueScores = VALUE_FACTORS.map((name) => boundedScore(scores[name] ?? 0, `scores.${name}`))
  const costScores = COST_FACTORS.map((name) => Math.max(COST_FLOOR, boundedScore(costs[name] ?? 0, `costs.${name}`)))

  const evidenceConfidence = probability(confidence.evidence ?? 1, 'confidence.evidence')
  const measurementConfidence = probability(confidence.measurement ?? 1, 'confidence.measurement')

  const valueIndex = geometricMean(valueScores)
  const costIndex = geometricMean(costScores)
  const rawPriority = costIndex ? valueIndex / costIndex : 0
  const adjustedPriority = gatePass ? rawPriority * evidenceConfidence * measurementConfidence : 0

  let decision
  if (!gatePass) decision = 'REJECT_OR_RESEARCH'
  else if (adjustedPriority > 0) decision = BANDS.find((b) => adjustedPriority >= b.min).decision
  else decision = 'REJECT_OR_REDESIGN'

  const band = BANDS.find((b) => b.decision === decision) ?? null

  return {
    candidate_id: document.id ?? null,
    hard_gate_pass: gatePass,
    failed_gates: failedGates,
    gate_detail: HARD_GATES.map((field) => {
      const gate = corpus.gatesById.get(field.replace(/_/g, '-'))
      return {
        field,
        passed: gates[field] === true,
        name: gate?.name ?? field,
        conditions: gate?.conditions ?? [],
        joiner: gate?.joiner ?? null,
        defined_by: gate?.defined_by ?? [],
        governing_rules: corpus.rulesByGate.get(field) ?? []
      }
    }),
    value_index: round(valueIndex),
    cost_index: round(costIndex),
    raw_priority: round(rawPriority),
    evidence_confidence: evidenceConfidence,
    measurement_confidence: measurementConfidence,
    adjusted_priority: round(adjustedPriority),
    decision,
    decision_meaning: gatePass
      ? band?.meaning ?? null
      : 'One or more hard gates failed. Route to research, consolidation, repair, deferral or rejection — not publication.',
    routing: gatePass ? null : routeFailure(failedGates),
    notes: [
      'Priority bands are transparent heuristics, not search-engine scores or guaranteed forecasts.',
      `Cost factors are floored at ${COST_FLOOR} so an unrated cost cannot make the score infinite.`,
      'Value and cost indices are geometric means, so one near-zero factor pulls the whole index down.',
      '`existing_signal` is scored inside the value numerator, following tools/laka_seo_engine.py. Document 03 §8 describes it as a separate existing-asset multiplier.'
    ]
  }
}

/** What a candidate should do next, per gate, from the grammar's own fallbacks. */
function routeFailure (failedGates) {
  const ROUTES = {
    demand: 'Research demand, or hold the candidate as an emerging-demand thesis with an explicit review date.',
    distinct_task: 'Merge into the canonical asset that already owns this task, or make it a section of that asset.',
    business_value: 'Reject, or reposition the candidate against an offer that carries value.',
    information_advantage: 'Defer until you have original experience, data, methodology or utility to add.',
    technical_feasibility: 'Repair the technical state first. Run SOP 9 — technical eligibility audit.',
    maintainability: 'Reduce approved volume, or assign an owner and refresh triggers before publishing.',
    measurement: 'Define the primary outcome, baseline, change ID, observation method and decision rule first.',
    compliance: 'Reject. Policy and ethical compliance is not tradeable against traffic.'
  }
  return failedGates.map((field) => ({ gate: field, action: ROUTES[field] ?? 'Route to research or rejection.' }))
}

/**
 * Score the governing equation.
 *
 * SEO business value is the product of ten factors, so a near-zero factor neutralises the
 * rest. The caller supplies each factor as a 0–1 proportion of its achievable value; the
 * result reports the product, the weakest link and what the grammar says to do about it.
 */
export const EQUATION_FACTORS = [
  { id: 'valuable_demand', name: 'Valuable demand', remedy: 'Return to the semantic demand graph. Demand without value is not an opportunity.' },
  { id: 'technical_eligibility', name: 'Technical eligibility', remedy: 'Run SOP 9. An ineligible page cannot earn anything downstream.' },
  { id: 'intent_fit', name: 'Intent fit', remedy: 'Re-run the cluster test. The asset is probably answering a different task.' },
  { id: 'information_advantage', name: 'Information advantage', remedy: 'Add original experience, data, methodology or utility, or retire the asset.' },
  { id: 'discoverability', name: 'Discoverability', remedy: 'Fix the internal graph and canonical ownership before adding assets.' },
  { id: 'prominence', name: 'Prominence', remedy: 'Run an authority and earned-evidence campaign (SOP 10).' },
  { id: 'search_result_response', name: 'Search-result response', remedy: 'Test the title and snippet. Check the CTR residual against position.' },
  { id: 'conversion_efficiency', name: 'Conversion efficiency', remedy: 'Fix the next action and the conversion path, not the traffic.' },
  { id: 'contribution_margin', name: 'Contribution margin', remedy: 'Re-check the offer economics. Volume against a negative margin destroys value.' },
  { id: 'learning_velocity', name: 'Learning velocity', remedy: 'Shorten the observation window and define decision rules in advance.' }
]

export function scoreEquation (body) {
  requireObject(body, 'body')
  const factors = requireObject(body.factors, 'factors')

  const unknown = Object.keys(factors).filter((k) => !EQUATION_FACTORS.some((f) => f.id === k))
  if (unknown.length) {
    throw new InputError(`Unknown factors: ${unknown.join(', ')}. See GET /v1/grammar for the ten.`, 'factors')
  }

  const scored = EQUATION_FACTORS.map((f) => {
    const supplied = factors[f.id]
    const value = supplied === undefined ? null : probability(supplied, `factors.${f.id}`)
    return { ...f, value, supplied: supplied !== undefined }
  })

  const missingFactors = scored.filter((f) => !f.supplied).map((f) => f.id)
  const present = scored.filter((f) => f.supplied)

  // An unsupplied factor is unknown, not 1. Report the product of what is known, and say
  // plainly that the unknowns can only lower it.
  const product = present.reduce((acc, f) => acc * f.value, 1)
  const weakest = present.length
    ? present.reduce((min, f) => (f.value < min.value ? f : min))
    : null

  return {
    factor_count: EQUATION_FACTORS.length,
    scored_count: present.length,
    missing_factors: missingFactors,
    product_of_scored: round(product, 6),
    is_complete: missingFactors.length === 0,
    interpretation: missingFactors.length
      ? `Product of the ${present.length} factors supplied. The ${missingFactors.length} unscored factors are unknown, and can only reduce this number — never raise it.`
      : 'Product of all ten factors.',
    weakest_link: weakest
      ? { id: weakest.id, name: weakest.name, value: weakest.value, remedy: weakest.remedy }
      : null,
    factors: scored.map(({ remedy, ...f }) => (f.supplied ? { ...f, remedy } : f)),
    note: 'Because the terms multiply, work the weakest link first. Improving a strong factor while a near-zero factor stands changes almost nothing.'
  }
}
