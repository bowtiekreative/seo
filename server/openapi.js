/**
 * The OpenAPI 3.1 description, built from the live corpus so counts and enumerations in the
 * documentation can never drift from what the API actually serves.
 */

import { corpus } from './corpus.js'
import { HARD_GATES, VALUE_FACTORS, COST_FACTORS, EQUATION_FACTORS } from './engine/gates.js'
import { CLUSTER_FACTS, HARD_SPLITS } from './engine/cluster.js'
import { MAX_SAMPLE } from './engine/volume.js'
import { ORIGIN } from './views/layout.js'

const obj = { type: 'object' }
const ok = (description) => ({ 200: { description, content: { 'application/json': { schema: obj } } } })
const notFound = { 404: { description: 'No such record', content: { 'application/json': { schema: obj } } } }
const badRequest = { 400: { description: 'The request named a value the engine will not guess', content: { 'application/json': { schema: obj } } } }

const pathParam = (name, description) => ({ name, in: 'path', required: true, description, schema: { type: 'string' } })
const queryParam = (name, description, schema = { type: 'string' }) => ({ name, in: 'query', required: false, description, schema })

const PAGING = [
  queryParam('limit', 'Page size, 1–500.', { type: 'integer', default: 50, minimum: 1, maximum: 500 }),
  queryParam('offset', 'Rows to skip.', { type: 'integer', default: 0, minimum: 0 })
]

const get = (tag, summary, { params = [], responses = ok('Success'), description } = {}) => ({
  get: { tags: [tag], summary, ...(description ? { description } : {}), ...(params.length ? { parameters: params } : {}), responses }
})

const post = (tag, summary, { description, schema, example, responses } = {}) => ({
  post: {
    tags: [tag],
    summary,
    ...(description ? { description } : {}),
    requestBody: {
      required: true,
      content: { 'application/json': { schema: schema ?? obj, ...(example ? { example } : {}) } }
    },
    responses: responses ?? { ...ok('Engine result'), ...badRequest }
  }
})

/** A simple `{ count, results }` collection with an item route. */
function collection (paths, path, tag, plural, singular, idDescription) {
  paths[`/v1/${path}`] = get(tag, plural, { params: PAGING })
  paths[`/v1/${path}/{id}`] = get(tag, singular, {
    params: [pathParam('id', idDescription)],
    responses: { ...ok('The record'), ...notFound }
  })
}

export function buildOpenApi () {
  const inv = corpus.manifest.inventory
  const paths = {}

  // ---- meta -----------------------------------------------------------------
  paths['/v1'] = get('Meta', 'API index')
  paths['/v1/health'] = get('Meta', 'Liveness and corpus counts')
  paths['/v1/openapi.json'] = get('Meta', 'This document')
  paths['/v1/manifest'] = get('Meta', 'Corpus manifest and inventory')

  // ---- the model ------------------------------------------------------------
  paths['/v1/grammar'] = get('Model', 'The governing sentence and the governing equation', {
    description: 'The sentence every SEO action must be expressible in, and the ten multiplied factors that determine business value. Because the factors multiply, a near-zero factor neutralises the rest of the system.'
  })
  paths['/v1/laka'] = get('Model', 'The LAKA change model', {
    description: `The ${inv.laka_levels} change levels, ${inv.internal_variables} internal variables and ${inv.change_variables} change variables.`
  })
  paths['/v1/operators'] = get('Model', 'Boolean logic, precedence and the hard-gate pattern')
  paths['/v1/objects'] = get('Model', 'The six primitive object classes')
  paths['/v1/objects/{id}'] = get('Model', 'One object class and its primitives', {
    params: [pathParam('id', `Class id: ${corpus.objectClasses.classes.map((c) => c.id).join(', ')}.`)],
    responses: { ...ok('The class'), ...notFound }
  })
  paths['/v1/formats'] = get('Model', 'Task-native format selection', {
    description: 'The task the searcher must complete selects the format. Appearance does not.'
  })
  paths['/v1/dimensions'] = get('Model', `The ${inv.dimension_families} volumetric opportunity dimension families`)
  paths['/v1/dimensions/{id}'] = get('Model', 'One dimension family and its values', {
    params: [pathParam('id', `Family id, e.g. \`${corpus.dimensionFamilies[0]?.id ?? 'audience'}\`.`)],
    responses: { ...ok('The family'), ...notFound }
  })

  // ---- gates ----------------------------------------------------------------
  paths['/v1/gates'] = get('Gates', `The ${inv.publication_gates} hard publication gates`, {
    description: 'All eight must pass. A candidate that fails any one routes to research, consolidation, repair, deferral or rejection — never to publication. The cluster gates, which decide whether two candidates share one page, are returned alongside them and are a different thing.'
  })
  paths['/v1/gates/{field}'] = get('Gates', 'One gate, with the rules that govern it', {
    params: [pathParam('field', `Gate field: ${HARD_GATES.join(', ')}.`)],
    responses: { ...ok('The gate'), ...notFound }
  })

  // ---- rules ----------------------------------------------------------------
  paths['/v1/rules'] = get('Rules', `Search and filter the ${inv.rules} decision rules`, {
    params: [
      queryParam('q', 'Free-text match against id, title, branches, metric, guardrails and rationale.'),
      queryParam('area', `Comma-separated areas, by name or slug: ${corpus.areas.map((a) => a.slug).join(', ')}.`),
      queryParam('level', `Comma-separated LAKA levels: ${corpus.lakaLevels.map((l) => l.name).join(', ')}.`),
      queryParam('operator', `Comma-separated operators: ${corpus.operatorFacets.map((o) => o.value).join(', ')}.`),
      queryParam('prefix', `Comma-separated id prefixes: ${corpus.areas.map((a) => a.prefix).join(', ')}.`),
      queryParam('metric', 'Substring match against the primary metric.'),
      queryParam('id', 'Comma-separated rule ids.'),
      queryParam('expand', 'Return full rule records with area detail and neighbours.', { type: 'boolean' }),
      ...PAGING
    ]
  })
  paths['/v1/rules/{id}'] = get('Rules', 'One rule, expanded', {
    params: [pathParam('id', 'Rule id, e.g. `BIZ-001`.')],
    responses: { ...ok('The rule with its area, levels, governed gates and neighbours'), ...notFound }
  })
  paths['/v1/areas'] = get('Rules', 'Rule counts by area')
  paths['/v1/areas/{slug}'] = get('Rules', 'One area and all twelve of its rules', {
    params: [pathParam('slug', `Area slug, e.g. \`${corpus.areas[0]?.slug ?? 'business-value'}\`.`)],
    responses: { ...ok('The area'), ...notFound }
  })
  paths['/v1/levels'] = get('Rules', 'The five LAKA change levels and the escalation rule')

  // ---- corpus collections ---------------------------------------------------
  collection(paths, 'sops', 'Corpus', `The ${inv.sops} audit and execution SOPs`, 'One SOP', 'SOP id, e.g. `SOP-01`.')
  collection(paths, 'templates', 'Corpus', 'Page and cluster templates', 'One template', 'Template id, e.g. `TPL-G`.')
  collection(paths, 'phases', 'Corpus', `The ${inv.phases} implementation phases`, 'One phase', 'Phase id, e.g. `PHASE-3`.')
  collection(paths, 'commands', 'Corpus', `The ${inv.commands} pseudo-commands`, 'One pseudo-command', 'Command name without the slash, e.g. `gate`.')
  collection(paths, 'glossary', 'Corpus', 'Glossary terms', 'One term', 'Term slug.')

  paths['/v1/measurement'] = get('Corpus', 'Outcome hierarchy, KPIs and the twelve formulas')
  paths['/v1/experiments'] = get('Corpus', 'Hypothesis grammar, experiment cards and decision outcomes')
  paths['/v1/backlog'] = get('Corpus', 'The staged rollout and its exit gates')
  paths['/v1/crosswalk'] = get('Corpus', 'Course translation, terminology corrections and primary sources')
  paths['/v1/agent-prompt'] = get('Corpus', 'The operating prompt for an SEO agent')
  paths['/v1/schema'] = get('Corpus', 'JSON Schema for a LAKA SEO project')
  paths['/v1/examples'] = get('Corpus', 'Worked examples: a project, a candidate and a dimension set')

  paths['/v1/documents'] = get('Corpus', `The ${inv.documents} source documents`)
  paths['/v1/documents/{slug}'] = get('Corpus', 'One document with its full section tree', {
    params: [pathParam('slug', 'Document slug or two-digit number, e.g. `seo-laka-grammar` or `01`.')],
    responses: { ...ok('The document'), ...notFound }
  })
  paths['/v1/source'] = get('Corpus', 'The authored source package, byte for byte')
  paths['/v1/source/{slug}'] = get('Corpus', 'One source file, verbatim', {
    params: [pathParam('slug', 'File slug, e.g. `quick-reference` or `seo-laka`.')],
    responses: {
      200: { description: 'The file', content: { 'text/plain': { schema: { type: 'string' } } } },
      ...notFound
    }
  })

  paths['/v1/search'] = get('Corpus', 'Search the whole corpus', {
    params: [
      queryParam('q', 'Query string. All terms must match.'),
      queryParam('type', `Comma-separated types: ${[...new Set(corpus.searchIndex.map((e) => e.type))].sort().join(', ')}.`),
      queryParam('limit', 'Maximum results.', { type: 'integer', default: 25, maximum: 200 })
    ]
  })
  paths['/v1/graph'] = get('Corpus', 'The corpus as nodes and edges')
  paths['/v1/backlinks/{id}'] = get('Corpus', 'What a rule, gate or area connects to', {
    params: [pathParam('id', 'A rule id, gate field or area slug.')],
    responses: { ...ok('Backlinks'), ...notFound }
  })

  // ---- engine ---------------------------------------------------------------
  paths['/v1/engine/spec'] = get('Engine', 'What each engine endpoint requires and refuses to guess')

  paths['/v1/evaluate'] = post('Engine', 'Run a candidate through the hard gates and the priority score', {
    description: [
      'Applies the eight hard publication gates, then scores value against cost.',
      '',
      `Every gate must be an explicit boolean — a missing or partial gate is a 400, never an implied pass. Value factors (${VALUE_FACTORS.join(', ')}) and cost factors (${COST_FACTORS.join(', ')}) are rated 0–5; costs are floored at 0.2 so an unrated cost cannot make the score infinite. Both indices are geometric means, so one near-zero factor pulls the whole index down.`,
      '',
      'Priority bands are transparent heuristics, not search-engine scores or guaranteed forecasts. This is a port of `tools/laka_seo_engine.py` and scores identically to it.'
    ].join('\n'),
    schema: {
      type: 'object',
      required: ['gates', 'scores', 'costs'],
      properties: {
        id: { type: 'string' },
        gates: {
          type: 'object',
          description: 'All eight required, each an explicit boolean.',
          required: HARD_GATES,
          properties: Object.fromEntries(HARD_GATES.map((g) => [g, { type: 'boolean' }]))
        },
        scores: {
          type: 'object',
          properties: Object.fromEntries(VALUE_FACTORS.map((f) => [f, { type: 'number', minimum: 0, maximum: 5 }]))
        },
        costs: {
          type: 'object',
          properties: Object.fromEntries(COST_FACTORS.map((f) => [f, { type: 'number', minimum: 0, maximum: 5 }]))
        },
        confidence: {
          type: 'object',
          properties: {
            evidence: { type: 'number', minimum: 0, maximum: 1 },
            measurement: { type: 'number', minimum: 0, maximum: 1 }
          }
        }
      }
    },
    example: corpus.examples.candidate
  })

  paths['/v1/volume'] = post('Engine', 'Size a volumetric space, and optionally sample it safely', {
    description: `Computes the theoretical volume in closed form without enumerating the space, and returns a bounded, deterministic sample only when \`sample\` is given. The sample is capped at ${MAX_SAMPLE.toLocaleString('en-US')} rows. Theoretical volume is an analysis space, never a publishing target.`,
    schema: {
      type: 'object',
      properties: {
        dimensions: { type: 'object', additionalProperties: { type: 'array', items: {} }, description: 'Dimension name → non-empty array of values.' },
        use_published_dimensions: { type: 'boolean', description: `Ignore \`dimensions\` and use the ${inv.dimension_families} published families instead.` },
        sample: { type: 'integer', minimum: 0, maximum: MAX_SAMPLE },
        seed: { type: 'integer', default: 42 }
      }
    },
    example: { ...corpus.examples.dimensions, sample: 10 }
  })

  paths['/v1/cluster'] = post('Engine', 'Same page or separate pages', {
    description: `The one-page rule as a decision. Facts are tri-state: \`true\` matches, \`false\` differs, absent is unknown. An unknown fact routes to TEST — one provisional cluster and an observation — never to a second page. Facts: ${CLUSTER_FACTS.map((f) => f.id).join(', ')}. Hard splits: ${HARD_SPLITS.map((h) => h.id).join(', ')}.`,
    schema: {
      type: 'object',
      properties: {
        a: { type: 'string', description: 'A label for the first candidate.' },
        b: { type: 'string', description: 'A label for the second candidate.' },
        facts: {
          type: 'object',
          properties: Object.fromEntries(
            [...CLUSTER_FACTS, ...HARD_SPLITS].map((f) => [f.id, { type: 'boolean', description: f.question ?? f.reason }])
          )
        },
        separate_page_value: { type: 'string', description: 'How much a separate page would be worth. Anything but "low" forces a deliberate split decision.' }
      }
    },
    example: {
      a: 'web design cost calgary',
      b: 'how much does a website cost',
      facts: { same_sense: true, same_task: true, compatible_answer_structure: true, compatible_result_class: false, compatible_next_action: true }
    }
  })

  paths['/v1/equation'] = post('Engine', 'Score the governing equation and find the weakest link', {
    description: `Ten factors, each a 0–1 proportion of achievable value: ${EQUATION_FACTORS.map((f) => f.id).join(', ')}. They multiply, so the response names the weakest link and what the grammar says to do about it. An unsupplied factor is reported as unknown, not assumed to be 1.`,
    schema: {
      type: 'object',
      required: ['factors'],
      properties: {
        factors: {
          type: 'object',
          properties: Object.fromEntries(EQUATION_FACTORS.map((f) => [f.id, { type: 'number', minimum: 0, maximum: 1, description: f.name }]))
        }
      }
    },
    example: { factors: { valuable_demand: 0.8, technical_eligibility: 1, intent_fit: 0.7, information_advantage: 0.3, discoverability: 0.6, prominence: 0.4, search_result_response: 0.6, conversion_efficiency: 0.5, contribution_margin: 0.7, learning_velocity: 0.4 } }
  })

  paths['/v1/resolve'] = post('Engine', 'Which rules govern a context, before you act', {
    description: 'Filters the rule set and orders it by the published precedence, so what binds hardest appears first.',
    schema: {
      type: 'object',
      properties: {
        area: { type: 'string', description: 'Comma-separated area names or slugs.' },
        level: { type: 'string', description: `Comma-separated LAKA levels: ${corpus.lakaLevels.map((l) => l.name).join(', ')}.` },
        operator: { type: 'string' },
        q: { type: 'string' }
      }
    },
    example: { area: 'technical-eligibility', level: 'Structural' }
  })

  // /v1/laka carries both methods — GET returns the change model, POST builds a matrix from
  // it — so this merges onto the GET declared above rather than replacing it.
  Object.assign(paths['/v1/laka'], post('Engine', 'Generate the five-level change matrix for an object', {
    description: 'Proposes changes at every level, cheapest and most reversible first, so escalation is deliberate rather than accidental.',
    schema: {
      type: 'object',
      required: ['object'],
      properties: {
        object: { type: 'string', description: 'The SEO object being changed.' },
        goal: { type: 'string', description: 'The outcome the change is meant to move.' }
      }
    },
    example: { object: '/services/web-design', goal: 'qualified organic conversions' }
  }))

  paths['/v1/experiment'] = post('Engine', 'Turn a proposed change into a decidable experiment card', {
    description: 'Builds the hypothesis sentence and reports what is still missing. A change with no baseline, no minimum exposure and no decision rule is not measurable, and the response says so rather than pretending otherwise.',
    schema: {
      type: 'object',
      required: ['object', 'intervention', 'primary_metric', 'mechanism'],
      properties: {
        change_id: { type: 'string' },
        object: { type: 'string' },
        laka_level: { type: 'string', enum: corpus.lakaLevels.map((l) => l.name) },
        intervention: { type: 'string' },
        conditions: { type: 'string' },
        primary_metric: { type: 'string' },
        direction: { type: 'string', default: 'increases' },
        mechanism: { type: 'string' },
        guardrails: { type: 'array', items: { type: 'string' } },
        baseline: { type: 'string' },
        minimum_exposure: { type: 'string' },
        decision_rule: { type: 'string' },
        rollback: { type: 'string' }
      }
    },
    example: {
      change_id: 'CHG-014',
      object: '/services/web-design',
      laka_level: 'Minor',
      intervention: 'a title and snippet rewrite naming the price range',
      conditions: 'non-brand queries in positions 4–10',
      primary_metric: 'value-weighted non-brand clicks',
      mechanism: 'the snippet answers the cost question that the query implies',
      guardrails: ['qualified conversion rate', 'average position'],
      baseline: '28 days pre-change',
      minimum_exposure: '28 days and 1,000 impressions',
      decision_rule: 'continue if clicks rise and conversion rate holds; reverse if conversion rate falls more than 10%'
    }
  })

  paths['/v1/validate'] = post('Engine', 'Validate a project document', {
    description: 'Checks a project against the published JSON Schema, then reports the completeness advisories the grammar cares about — canonical conflicts, a missing measurement block, assets with no primary metric. A document can be schema-valid and still fail the measurement gate.',
    schema: corpus.projectSchema,
    example: corpus.examples.project
  })

  return {
    openapi: '3.1.0',
    info: {
      title: 'LAKA SEO Grammar System API',
      version: corpus.manifest.version,
      summary: 'Machine-readable SEO decision rules, and an engine that runs them over candidates, clusters, changes and projects.',
      description: [
        corpus.manifest.purpose,
        '',
        `The corpus holds ${inv.rules} decision rules across ${inv.areas} areas, ${inv.publication_gates} hard publication gates, ${inv.laka_levels} change levels, ${inv.dimension_families} volumetric dimension families, ${inv.sops} SOPs, ${inv.formulas} measurement formulas and ${inv.documents} source documents.`,
        '',
        'Two ideas govern everything here. First, SEO business value is a product of ten factors, so a near-zero factor neutralises the rest — a technically perfect page with no valuable demand is weak, and so is a ranking page that produces no business outcome. Second, volumetric generation is an analysis technique, not a publishing plan: generate broadly, cluster by task, assign exactly one canonical owner, apply all eight hard gates, and publish the smallest set of assets that covers the largest amount of valuable demand.',
        '',
        'The engine does not guess. Where a decision depends on a fact the caller has not supplied, the response names the missing fact instead of assuming a value.',
        '',
        corpus.manifest.usage_note
      ].join('\n'),
      license: { name: corpus.manifest.copyright_note },
      contact: { name: 'Bow Tie Kreative', url: 'https://bowtiekreative.com' }
    },
    servers: [{ url: ORIGIN, description: 'Production' }],
    tags: [
      { name: 'Meta', description: 'Index, health and specification.' },
      { name: 'Model', description: 'The grammar: sentence, equation, objects, levels, dimensions and formats.' },
      { name: 'Gates', description: 'The hard publication gates.' },
      { name: 'Rules', description: `The ${inv.rules} decision rules.` },
      { name: 'Corpus', description: 'SOPs, templates, phases, commands, measurement, documents and source files.' },
      { name: 'Engine', description: 'Running the grammar over candidates, clusters, changes and projects.' }
    ],
    paths
  }
}
