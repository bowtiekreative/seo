/**
 * The /v1 JSON API.
 *
 * GET endpoints expose the corpus and are cacheable — it is a static, versioned body of
 * rules. POST endpoints run the engine and are never cached.
 */

import { corpus, slugify, readSourceFile } from '../corpus.js'
import { evaluateCandidate, scoreEquation, InputError, HARD_GATES, VALUE_FACTORS, COST_FACTORS, BANDS, EQUATION_FACTORS } from '../engine/gates.js'
import { sizeVolume, MAX_SAMPLE } from '../engine/volume.js'
import { decideCluster, changeMatrix, CLUSTER_FACTS, HARD_SPLITS } from '../engine/cluster.js'
import { filterRules, expandRule, resolveRules, validateProject, buildExperiment } from '../engine/resolve.js'
import { buildOpenApi } from '../openapi.js'
import { ORIGIN } from '../views/layout.js'

const CACHE = 'public, max-age=300, stale-while-revalidate=86400'

function paging (q = {}) {
  const limit = Math.min(Math.max(parseInt(q.limit ?? '50', 10) || 50, 1), 500)
  const offset = Math.max(parseInt(q.offset ?? '0', 10) || 0, 0)
  return { limit, offset }
}

const page = (rows, { limit, offset }) => ({
  count: rows.length,
  limit,
  offset,
  results: rows.slice(offset, offset + limit)
})

const csv = (v) => (v == null || v === '' ? null : String(v).split(',').map((s) => s.trim()).filter(Boolean))

/** Free-text search across every indexed record type. */
export function search (query, { limit = 25, types = null } = {}) {
  const q = String(query ?? '').trim().toLowerCase()
  if (!q) return []
  const wanted = types ? new Set(types) : null
  const terms = q.split(/\s+/)
  return corpus.searchIndex
    .filter((e) => (!wanted || wanted.has(e.type)) && terms.every((t) => e.hay.includes(t)))
    .map((e) => ({
      type: e.type,
      id: e.id,
      title: e.title,
      href: e.href,
      // An id or title hit outranks a body hit.
      rank: (e.id.toLowerCase().includes(q) ? 0 : 10) +
            (e.title.toLowerCase().includes(q) ? 0 : 5) +
            e.hay.indexOf(q) / 1e6
    }))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit)
    .map(({ rank, ...rest }) => rest)
}

export default async function apiRoutes (app) {
  app.addHook('onSend', async (req, reply, payload) => {
    if (req.method === 'GET' && !reply.getHeader('cache-control')) reply.header('cache-control', CACHE)
    return payload
  })

  /** Run an engine call, turning an InputError into a 400 with the offending field named. */
  const engine = (fn) => async (req, reply) => {
    reply.header('cache-control', 'no-store')
    try {
      return fn(req.body ?? {})
    } catch (err) {
      if (err instanceof InputError) {
        return reply.code(400).send({ error: 'bad_request', message: err.message, field: err.field })
      }
      throw err
    }
  }

  // ---- meta -----------------------------------------------------------------
  app.get('/v1', async () => ({
    service: 'laka-seo-system-api',
    title: corpus.manifest.title,
    version: corpus.manifest.version,
    documentation: `${ORIGIN}/`,
    agent_guide: `${ORIGIN}/llms.txt`,
    openapi: `${ORIGIN}/v1/openapi.json`,
    design_system: 'https://api.designsystem.bowtiekreative.com/v1',
    sibling_system: 'https://writingsystem.bowtiekreative.com/v1',
    inventory: corpus.manifest.inventory,
    start_here: corpus.manifest.start_here,
    endpoints: ENDPOINTS,
    usage_note: corpus.manifest.usage_note,
    copyright_note: corpus.manifest.copyright_note
  }))

  app.get('/v1/health', async () => ({
    status: 'ok',
    version: corpus.manifest.version,
    rules: corpus.rules.length,
    areas: corpus.areas.length,
    gates: corpus.hardGates.length,
    documents: corpus.documents.length,
    uptime_s: Math.round(process.uptime())
  }))

  app.get('/v1/openapi.json', async () => buildOpenApi())

  app.get('/v1/manifest', async () => corpus.manifest)

  // ---- the model ------------------------------------------------------------
  app.get('/v1/grammar', async () => ({
    ...corpus.grammar,
    equation_factors: EQUATION_FACTORS.map(({ id, name }) => ({ id, name })),
    object_classes: corpus.objectClasses.classes.map((c) => ({ id: c.id, name: c.name, count: c.members.length }))
  }))

  app.get('/v1/laka', async () => corpus.lakaModel)
  app.get('/v1/operators', async () => corpus.operators)
  app.get('/v1/objects', async () => corpus.objectClasses)

  app.get('/v1/objects/:id', async (req, reply) => {
    const cls = corpus.objectClasses.classes.find((c) => c.id === slugify(req.params.id))
    if (!cls) return reply.code(404).send({ error: 'not_found', id: req.params.id })
    return cls
  })

  app.get('/v1/formats', async () => corpus.formats)

  app.get('/v1/gates', async () => ({
    ...corpus.gates,
    gates: corpus.hardGates.map((g) => ({ ...g, governing_rules: corpus.rulesByGate.get(g.field) ?? [] }))
  }))

  app.get('/v1/gates/:field', async (req, reply) => {
    const key = String(req.params.field).replace(/_/g, '-')
    const gate = corpus.gatesById.get(key)
    if (!gate) {
      return reply.code(404).send({ error: 'not_found', field: req.params.field, valid: HARD_GATES })
    }
    return { ...gate, governing_rules: corpus.rulesByGate.get(gate.field) ?? [] }
  })

  app.get('/v1/dimensions', async () => corpus.dimensions)

  app.get('/v1/dimensions/:id', async (req, reply) => {
    const family = corpus.dimensionsById.get(slugify(req.params.id))
    if (!family) return reply.code(404).send({ error: 'not_found', id: req.params.id })
    return family
  })

  // ---- rules ----------------------------------------------------------------
  app.get('/v1/rules', async (req) => {
    const { limit, offset } = paging(req.query)
    const rules = filterRules(req.query)
    const expand = req.query.expand === 'true' || req.query.expand === '1'
    return {
      count: rules.length,
      limit,
      offset,
      facets: {
        area: corpus.areaFacets,
        laka_level: corpus.levelFacets,
        operator: corpus.operatorFacets
      },
      results: rules.slice(offset, offset + limit).map((r) => (expand
        ? expandRule(r)
        : {
            id: r.id,
            title: r.title,
            area: r.area,
            laka_levels: r.laka_levels,
            if: r.if,
            then: r.then,
            primary_metric: r.primary_metric,
            href: `/v1/rules/${r.id}`
          }))
    }
  })

  app.get('/v1/rules/:id', async (req, reply) => {
    const rule = corpus.rulesById.get(String(req.params.id).toUpperCase())
    if (!rule) return reply.code(404).send({ error: 'not_found', id: req.params.id })
    return expandRule(rule)
  })

  app.get('/v1/areas', async () => ({
    count: corpus.areas.length,
    results: corpus.areas.map((a) => ({ ...a, href: `/v1/rules?area=${a.slug}` }))
  }))

  app.get('/v1/areas/:slug', async (req, reply) => {
    const area = corpus.areaBySlug.get(slugify(req.params.slug))
    if (!area) return reply.code(404).send({ error: 'not_found', slug: req.params.slug })
    return { ...area, rules: corpus.rules.filter((r) => r.area_slug === area.slug) }
  })

  app.get('/v1/levels', async () => ({
    count: corpus.lakaLevels.length,
    escalation_rule: corpus.lakaModel.escalation_rule,
    results: corpus.lakaLevels.map((l) => ({ ...l, href: `/v1/rules?level=${l.name}` }))
  }))

  // ---- collections ----------------------------------------------------------
  const collection = (path, rows, keyFn = (x) => x.id) => {
    app.get(`/v1/${path}`, async (req) => page(rows, paging(req.query)))
    app.get(`/v1/${path}/:id`, async (req, reply) => {
      const wanted = String(req.params.id)
      const found = rows.find((r) => String(keyFn(r)) === wanted || slugify(keyFn(r)) === slugify(wanted))
      if (!found) return reply.code(404).send({ error: 'not_found', id: wanted })
      return found
    })
  }
  collection('sops', corpus.sops)
  collection('templates', [...corpus.templates, ...corpus.templateFiles])
  collection('phases', corpus.phases)
  collection('commands', corpus.commands, (c) => c.id.replace(/^\//, ''))
  collection('glossary', corpus.glossary, (t) => t.slug)

  app.get('/v1/measurement', async () => corpus.measurement)
  app.get('/v1/experiments', async () => corpus.experiments)
  app.get('/v1/backlog', async () => corpus.backlog)
  app.get('/v1/crosswalk', async () => corpus.crosswalk)
  app.get('/v1/agent-prompt', async () => corpus.agentPrompt)
  app.get('/v1/schema', async () => corpus.projectSchema)
  app.get('/v1/examples', async () => corpus.examples)

  // ---- documents ------------------------------------------------------------
  app.get('/v1/documents', async () => ({
    count: corpus.documents.length,
    results: corpus.documents.map((d) => ({
      number: d.number, slug: d.slug, title: d.title, purpose: d.purpose,
      bytes: d.bytes, section_count: d.section_count, href: `/v1/documents/${d.slug}`
    }))
  }))

  app.get('/v1/documents/:slug', async (req, reply) => {
    const key = String(req.params.slug)
    const doc = corpus.documentsBySlug.get(key) ?? corpus.documentsByNumber.get(key)
    if (!doc) return reply.code(404).send({ error: 'not_found', slug: key })
    return doc
  })

  app.get('/v1/source', async () => ({
    count: corpus.sourceFiles.length,
    note: 'The authored source package, byte for byte. The parsed corpus above is derived from these.',
    results: corpus.sourceFiles.map((f) => ({ ...f, href: `/v1/source/${f.slug}` }))
  }))

  app.get('/v1/source/:slug', async (req, reply) => {
    const file = readSourceFile(slugify(req.params.slug))
    if (!file) return reply.code(404).send({ error: 'not_found', slug: req.params.slug })
    const type = file.ext === 'json' ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8'
    return reply.type(type).send(file.body)
  })

  // ---- search and graph -----------------------------------------------------
  app.get('/v1/search', async (req) => {
    const limit = Math.min(Math.max(parseInt(req.query.limit ?? '25', 10) || 25, 1), 200)
    const results = search(req.query.q, { limit, types: csv(req.query.type) })
    return {
      query: req.query.q ?? '',
      count: results.length,
      types: [...new Set(corpus.searchIndex.map((e) => e.type))].sort(),
      results
    }
  })

  app.get('/v1/graph', async () => {
    const nodes = [
      ...corpus.areas.map((a) => ({ id: `area:${a.slug}`, type: 'area', label: a.name, weight: a.count })),
      ...corpus.lakaLevels.map((l) => ({ id: `level:${l.id}`, type: 'level', label: l.name, weight: l.rule_count })),
      ...corpus.hardGates.map((g) => ({ id: `gate:${g.field}`, type: 'gate', label: g.name, order: g.order })),
      ...corpus.rules.map((r) => ({ id: `rule:${r.id}`, type: 'rule', label: r.title, metric: r.primary_metric }))
    ]
    const edges = []
    for (const r of corpus.rules) {
      edges.push({ from: `rule:${r.id}`, to: `area:${r.area_slug}`, rel: 'in_area' })
      for (const level of r.laka_levels ?? []) {
        const l = corpus.lakaLevels.find((x) => x.name === level)
        if (l) edges.push({ from: `rule:${r.id}`, to: `level:${l.id}`, rel: 'operates_at' })
      }
    }
    for (const [field, ids] of corpus.rulesByGate) {
      for (const id of ids) edges.push({ from: `rule:${id}`, to: `gate:${field}`, rel: 'governs' })
    }
    return { node_count: nodes.length, edge_count: edges.length, nodes, edges }
  })

  app.get('/v1/backlinks/:id', async (req, reply) => {
    const id = String(req.params.id)
    const rule = corpus.rulesById.get(id.toUpperCase())
    if (rule) {
      return {
        id: rule.id,
        kind: 'rule',
        area: rule.area,
        governs_gates: [...corpus.rulesByGate.entries()].filter(([, ids]) => ids.includes(rule.id)).map(([f]) => f),
        operates_at: rule.laka_levels,
        shares_area_with: corpus.rules.filter((r) => r.area === rule.area && r.id !== rule.id).map((r) => r.id),
        shares_metric_with: corpus.rules.filter((r) => r.primary_metric === rule.primary_metric && r.id !== rule.id).map((r) => r.id)
      }
    }
    const gate = corpus.gatesById.get(id.replace(/_/g, '-'))
    if (gate) {
      return { id: gate.id, kind: 'gate', governed_by: corpus.rulesByGate.get(gate.field) ?? [], defined_by: gate.defined_by }
    }
    const area = corpus.areaBySlug.get(slugify(id))
    if (area) {
      return { id: area.slug, kind: 'area', rules: corpus.rules.filter((r) => r.area_slug === area.slug).map((r) => r.id) }
    }
    return reply.code(404).send({ error: 'not_found', id })
  })

  // ---- engine ---------------------------------------------------------------
  app.get('/v1/engine/spec', async () => ({
    note: 'What each engine endpoint requires, and what it refuses to guess.',
    evaluate: {
      path: 'POST /v1/evaluate',
      hard_gates: HARD_GATES,
      gate_rule: 'Every gate must be an explicit boolean. A missing or partial gate is an error, never an implied pass.',
      value_factors: VALUE_FACTORS,
      cost_factors: COST_FACTORS,
      score_range: '0–5 per factor; confidence values are probabilities 0–1.',
      bands: BANDS
    },
    volume: {
      path: 'POST /v1/volume',
      max_sample: MAX_SAMPLE,
      rule: 'The Cartesian product is never enumerated for large spaces and never returned as a publishing plan.'
    },
    cluster: {
      path: 'POST /v1/cluster',
      facts: CLUSTER_FACTS,
      hard_splits: HARD_SPLITS,
      rule: 'An unknown fact routes to TEST — one provisional cluster and an observation — never to a second page.'
    },
    equation: { path: 'POST /v1/equation', factors: EQUATION_FACTORS.map(({ id, name }) => ({ id, name })) },
    experiment: { path: 'POST /v1/experiment', required: ['object', 'intervention', 'primary_metric', 'mechanism'] },
    validate: { path: 'POST /v1/validate', schema: 'GET /v1/schema' },
    resolve: { path: 'POST /v1/resolve' },
    laka: { path: 'POST /v1/laka' },
    safe_failure: 'Where the grammar cannot decide without a fact the caller has not supplied, the response names the missing fact rather than assuming a value.'
  }))

  app.post('/v1/evaluate', engine(evaluateCandidate))
  app.post('/v1/volume', engine(sizeVolume))
  app.post('/v1/cluster', engine(decideCluster))
  app.post('/v1/equation', engine(scoreEquation))
  app.post('/v1/resolve', engine(resolveRules))
  app.post('/v1/laka', engine(changeMatrix))
  app.post('/v1/experiment', engine(buildExperiment))
  app.post('/v1/validate', engine(validateProject))
}

export const ENDPOINTS = [
  { method: 'GET', path: '/v1', summary: 'This index' },
  { method: 'GET', path: '/v1/health', summary: 'Liveness and corpus counts' },
  { method: 'GET', path: '/v1/openapi.json', summary: 'OpenAPI 3.1 description of this API' },
  { method: 'GET', path: '/v1/manifest', summary: 'Corpus manifest and inventory' },
  { method: 'GET', path: '/v1/grammar', summary: 'The governing sentence, the governing equation and the layers' },
  { method: 'GET', path: '/v1/laka', summary: 'The five change levels, ten internal variables and fourteen change variables' },
  { method: 'GET', path: '/v1/operators', summary: 'Boolean logic, precedence and the hard-gate pattern' },
  { method: 'GET', path: '/v1/objects', summary: 'The six primitive object classes' },
  { method: 'GET', path: '/v1/objects/{id}', summary: 'One object class and its primitives' },
  { method: 'GET', path: '/v1/formats', summary: 'Task-native format selection' },
  { method: 'GET', path: '/v1/gates', summary: 'The eight hard publication gates and the cluster gates' },
  { method: 'GET', path: '/v1/gates/{field}', summary: 'One gate, with the rules that govern it' },
  { method: 'GET', path: '/v1/dimensions', summary: 'The twelve volumetric opportunity dimension families' },
  { method: 'GET', path: '/v1/dimensions/{id}', summary: 'One dimension family and its values' },
  { method: 'GET', path: '/v1/rules', summary: 'Search and filter the 144 decision rules' },
  { method: 'GET', path: '/v1/rules/{id}', summary: 'One rule, expanded with its area, levels and neighbours' },
  { method: 'GET', path: '/v1/areas', summary: 'Rule counts by area' },
  { method: 'GET', path: '/v1/areas/{slug}', summary: 'One area and all twelve of its rules' },
  { method: 'GET', path: '/v1/levels', summary: 'The five LAKA change levels and the escalation rule' },
  { method: 'GET', path: '/v1/sops', summary: 'The fourteen audit and execution SOPs' },
  { method: 'GET', path: '/v1/sops/{id}', summary: 'One SOP' },
  { method: 'GET', path: '/v1/templates', summary: 'Page and cluster templates' },
  { method: 'GET', path: '/v1/templates/{id}', summary: 'One template' },
  { method: 'GET', path: '/v1/phases', summary: 'The eleven implementation phases' },
  { method: 'GET', path: '/v1/phases/{id}', summary: 'One phase with its tasks and exit gate' },
  { method: 'GET', path: '/v1/commands', summary: 'The ten pseudo-commands' },
  { method: 'GET', path: '/v1/commands/{id}', summary: 'One pseudo-command and its parameters' },
  { method: 'GET', path: '/v1/measurement', summary: 'Outcome hierarchy, KPIs and the twelve formulas' },
  { method: 'GET', path: '/v1/experiments', summary: 'Hypothesis grammar, experiment cards and decision outcomes' },
  { method: 'GET', path: '/v1/backlog', summary: 'The staged rollout and its exit gates' },
  { method: 'GET', path: '/v1/crosswalk', summary: 'Course translation, terminology corrections and primary sources' },
  { method: 'GET', path: '/v1/agent-prompt', summary: 'The operating prompt for an SEO agent' },
  { method: 'GET', path: '/v1/schema', summary: 'JSON Schema for a LAKA SEO project' },
  { method: 'GET', path: '/v1/examples', summary: 'Worked examples: a project, a candidate and a dimension set' },
  { method: 'GET', path: '/v1/glossary', summary: 'Glossary terms' },
  { method: 'GET', path: '/v1/documents', summary: 'The ten source documents, parsed into sections' },
  { method: 'GET', path: '/v1/documents/{slug}', summary: 'One document with its full section tree' },
  { method: 'GET', path: '/v1/source', summary: 'The authored source package, byte for byte' },
  { method: 'GET', path: '/v1/source/{slug}', summary: 'One source file, verbatim' },
  { method: 'GET', path: '/v1/search', summary: 'Search rules, gates, SOPs, templates, terms and document sections' },
  { method: 'GET', path: '/v1/graph', summary: 'The corpus as nodes and edges' },
  { method: 'GET', path: '/v1/backlinks/{id}', summary: 'What a rule, gate or area connects to' },
  { method: 'GET', path: '/v1/engine/spec', summary: 'What each engine endpoint requires and refuses to guess' },
  { method: 'POST', path: '/v1/evaluate', summary: 'Run a candidate through the eight hard gates and the priority score' },
  { method: 'POST', path: '/v1/volume', summary: 'Size a volumetric space, and optionally sample it safely' },
  { method: 'POST', path: '/v1/cluster', summary: 'Same page or separate pages — the one-page rule' },
  { method: 'POST', path: '/v1/equation', summary: 'Score the governing equation and find the weakest link' },
  { method: 'POST', path: '/v1/resolve', summary: 'Which rules govern a context, before you act' },
  { method: 'POST', path: '/v1/laka', summary: 'Generate the five-level change matrix for an object' },
  { method: 'POST', path: '/v1/experiment', summary: 'Turn a proposed change into a decidable experiment card' },
  { method: 'POST', path: '/v1/validate', summary: 'Validate a project document against the schema and the completeness gates' }
]
