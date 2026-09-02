/**
 * The same-page / separate-page decision.
 *
 * Two candidates share one canonical asset only when they are the same sense, the same task,
 * a compatible answer structure, a compatible result class and a compatible next action.
 * Anything else splits — or, when the evidence is genuinely ambiguous, goes to test rather
 * than to a second page.
 *
 * The test gate matters as much as the other two: the grammar's failure mode is multiplying
 * pages on a guess, so ambiguity resolves to one provisional cluster and an observation,
 * never to two assets.
 */

import { corpus } from '../corpus.js'
import { InputError } from './gates.js'

/**
 * The five conditions of the one-page rule, as tri-state facts.
 *
 * `true` means the two candidates match on this axis, `false` means they differ, and an
 * absent value means unknown — which routes to the test gate rather than being guessed.
 */
export const CLUSTER_FACTS = [
  { id: 'same_sense', question: 'Do both queries refer to the same sense of the concept?', splits_on: 'sense differs' },
  { id: 'same_task', question: 'Is the user trying to complete the same task?', splits_on: 'task differs' },
  { id: 'compatible_answer_structure', question: 'Can one answer structure serve both without padding?', splits_on: 'combined answer harms usability' },
  { id: 'compatible_result_class', question: 'Do the search results return the same class of page?', splits_on: 'result class differs' },
  { id: 'compatible_next_action', question: 'Does the same next action follow for both?', splits_on: 'different conversion path' }
]

/** Conditions that force a split on their own, regardless of the five above. */
export const HARD_SPLITS = [
  { id: 'local_inventory_differs', reason: 'Real local or product inventory differs, so the answers cannot be the same page.' },
  { id: 'legal_context_differs', reason: 'The legal or regulatory context differs, so one page would be wrong for one audience.' }
]

const TRI = (v) => (v === true ? true : v === false ? false : null)

/**
 * Decide whether two candidates belong on one page.
 *
 * @param {object} body { a?, b?, facts, separate_page_value? }
 */
export function decideCluster (body = {}) {
  if (body == null || typeof body !== 'object' || Array.isArray(body)) {
    throw new InputError('The request body must be a JSON object.')
  }
  const facts = body.facts ?? {}
  if (typeof facts !== 'object' || Array.isArray(facts)) {
    throw new InputError('`facts` must be a JSON object.', 'facts')
  }

  const known = new Set([...CLUSTER_FACTS.map((f) => f.id), ...HARD_SPLITS.map((h) => h.id)])
  const unknownKeys = Object.keys(facts).filter((k) => !known.has(k))
  if (unknownKeys.length) {
    throw new InputError(`Unknown facts: ${unknownKeys.join(', ')}. Valid facts: ${[...known].join(', ')}.`, 'facts')
  }

  const evaluated = CLUSTER_FACTS.map((f) => ({ ...f, value: TRI(facts[f.id]) }))
  const hardSplits = HARD_SPLITS
    .map((h) => ({ ...h, value: TRI(facts[h.id]) }))
    .filter((h) => h.value === true)

  const differs = evaluated.filter((f) => f.value === false)
  const unknown = evaluated.filter((f) => f.value === null)

  // separate_page_value is the merge gate's fifth condition: even a perfect match splits if
  // holding a separate page is genuinely worth more.
  const separatePageValue = body.separate_page_value ?? null
  const separatePageValueHigh = separatePageValue != null && String(separatePageValue).toLowerCase() !== 'low'

  let decision
  let because
  const actions = []

  if (hardSplits.length) {
    decision = 'SPLIT'
    because = hardSplits.map((h) => h.reason)
    actions.push('Create a separate cluster candidate and assign it its own canonical owner.')
  } else if (differs.length) {
    decision = 'SPLIT'
    because = differs.map((f) => `${f.id}: ${f.splits_on}`)
    actions.push('Create a separate cluster candidate and assign it its own canonical owner.')
    actions.push('Run each candidate through the eight hard publication gates before publishing either.')
  } else if (unknown.length) {
    decision = 'TEST'
    because = [`Evidence is ambiguous on: ${unknown.map((f) => f.id).join(', ')}.`]
    actions.push('Keep one provisional cluster with a single canonical owner.')
    actions.push('Observe query and page behaviour on that one asset.')
    actions.push('Run a controlled asset-format test.')
    actions.push('Only then decide whether to split — never multiply pages on a guess.')
  } else if (separatePageValueHigh) {
    decision = 'SPLIT'
    because = [`All five conditions match, but separate_page_value is "${separatePageValue}" rather than low.`]
    actions.push('Split only if the separate page carries value the combined page cannot. Record why.')
  } else {
    decision = 'MERGE'
    because = ['Same sense, same task, compatible answer structure, compatible result class and compatible next action.']
    actions.push('Assign both to one cluster with exactly one canonical owner.')
    actions.push('Make the weaker candidate a section of the canonical asset, or redirect it.')
  }

  return {
    a: body.a ?? null,
    b: body.b ?? null,
    decision,
    because,
    actions,
    conditions: evaluated.map(({ splits_on, ...f }) => f),
    hard_splits: hardSplits.map((h) => h.id),
    unknown_facts: unknown.map((f) => f.id),
    separate_page_value: separatePageValue,
    one_page_rule: corpus.gates.one_page_rule ?? [],
    gate: corpus.clusterGates.find((g) => g.id === decision.toLowerCase()) ?? null,
    note: unknown.length && decision === 'TEST'
      ? 'Unknown facts are never guessed. Supply them to get a MERGE or SPLIT verdict.'
      : 'Exactly one canonical owner per cluster. Two owners for one task is a canonical conflict, not a hedge.'
  }
}

/**
 * Build the LAKA change matrix for an object.
 *
 * Every improvement is proposed at all five levels, cheapest and most reversible first, so
 * the choice between a title test and a new information product is made deliberately rather
 * than by whichever idea arrived first.
 */
export function changeMatrix (body = {}) {
  const object = String(body.object ?? '').trim()
  if (!object) throw new InputError('`object` is required — name the SEO object being changed.', 'object')
  const goal = String(body.goal ?? '').trim()

  const levels = corpus.lakaLevels.map((level) => ({
    level: level.name,
    id: level.id,
    definition: level.definition,
    candidate_changes: level.examples,
    rule_count: level.rule_count,
    governing_rules: (corpus.rulesByLevel.get(level.name) ?? []).slice(0, 12),
    reversibility: REVERSIBILITY[level.name] ?? null
  }))

  return {
    object,
    goal: goal || null,
    escalation_rule: corpus.lakaModel.escalation_rule ?? '',
    order: 'Work upward. Escalate only when the cheaper level has been tried, measured and found insufficient.',
    levels,
    internal_variables: corpus.lakaModel.internal_variables ?? [],
    change_variables: corpus.lakaModel.change_variables ?? [],
    describe_the_change_with: 'Every proposed change should be describable against all fourteen change variables before it is scheduled.',
    priority_order: corpus.gates.priority_order ?? [],
    note: 'This is a generator of options, not a recommendation. Each candidate still needs a hypothesis, a primary metric, guardrails and a decision rule before it becomes an experiment.'
  }
}

/** How recoverable each level is. Stated so escalation is a conscious trade, not a drift. */
const REVERSIBILITY = {
  Baseline: 'Fully reversible — observation changes nothing.',
  Minor: 'Reversible within a day. Keep the previous value in the change record.',
  Major: 'Reversible with effort. Archive the previous asset before replacing it.',
  Structural: 'Partly reversible. Redirects, merges and template changes propagate; plan the rollback first.',
  Paradigm: 'Rarely reversible. Treat as a funded bet with an explicit stop rule.'
}
