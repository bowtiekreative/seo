/**
 * Server-rendered pages.
 *
 * Everything works with JavaScript switched off: the menu is a native <details>, the rule
 * filters are a GET form, and every engine page is a POST form whose result is rendered
 * server-side. That is what makes the pages indexable as well as accessible.
 */

import { corpus, slugify } from '../corpus.js'
import { layout, MENU, ORIGIN } from '../views/layout.js'
import {
  home, grammarPage, lakaPage, operatorsPage, objectsPage, formatsPage, gatesPage,
  rulesIndex, ruleDetail, areasPage, evaluatePage, volumePage, clusterPage, equationPage,
  changeMatrixPage, experimentPage, validatePage
} from '../views/pages.js'
import {
  dimensionsPage, measurementPage, experimentsPage, sopsPage, sopDetail, backlogPage,
  templatesPage, templateDetail, commandsPage, docsPage, docDetail, glossaryPage,
  crosswalkPage, agentPromptPage, apiPage, searchPage, privacyPage
} from '../views/reference.js'
import { filterRules, resolveRules, validateProject, buildExperiment } from '../engine/resolve.js'
import { evaluateCandidate, scoreEquation, InputError, HARD_GATES, VALUE_FACTORS, COST_FACTORS } from '../engine/gates.js'
import { sizeVolume } from '../engine/volume.js'
import { decideCluster, changeMatrix, CLUSTER_FACTS, HARD_SPLITS } from '../engine/cluster.js'

const CACHE = 'public, max-age=300, stale-while-revalidate=86400'

const page = (reply, built, { status = 200, cache = CACHE } = {}) =>
  reply.code(status).type('text/html; charset=utf-8').header('cache-control', cache).send(layout(built))

/** Parse a form field as a number, or return null when it is blank or not a number. */
function num (value) {
  const s = String(value ?? '').trim()
  if (!s) return null
  const n = Number(s)
  return Number.isFinite(n) ? n : null
}

/** Parse a tri-state select: "true", "false", or blank for unknown. */
function tri (value) {
  const s = String(value ?? '').trim()
  return s === 'true' ? true : s === 'false' ? false : undefined
}

/**
 * Render an engine page, mapping an InputError onto the form rather than a stack trace.
 *
 * @param render  builds the page from { submitted, result, form, error }
 * @param run     the engine call
 */
function engineHandler (render, run) {
  return async (req, reply, form) => {
    try {
      const result = run(form)
      return page(reply, render({ submitted: true, result, form: form.__raw ?? form, error: null }), { cache: 'no-store' })
    } catch (err) {
      if (err instanceof InputError || err instanceof SyntaxError) {
        return page(
          reply,
          render({ submitted: true, result: null, form: form.__raw ?? form, error: err.message }),
          { status: 400, cache: 'no-store' }
        )
      }
      throw err
    }
  }
}

export default async function siteRoutes (app) {
  app.get('/', async (req, reply) => page(reply, home()))

  // ---- the grammar ----------------------------------------------------------
  app.get('/grammar', async (req, reply) => page(reply, grammarPage()))
  app.get('/laka', async (req, reply) => page(reply, lakaPage()))
  app.get('/operators', async (req, reply) => page(reply, operatorsPage()))
  app.get('/objects', async (req, reply) => page(reply, objectsPage()))
  app.get('/formats', async (req, reply) => page(reply, formatsPage()))
  app.get('/gates', async (req, reply) => page(reply, gatesPage()))
  app.get('/dimensions', async (req, reply) => page(reply, dimensionsPage()))

  // ---- rules ----------------------------------------------------------------
  app.get('/rules', async (req, reply) => {
    const query = {
      q: req.query.q ?? '',
      area: req.query.area ?? '',
      level: req.query.level ?? '',
      operator: req.query.operator ?? ''
    }
    const limit = 25
    const offset = Math.max(parseInt(req.query.offset ?? '0', 10) || 0, 0)
    return page(reply, rulesIndex({ rules: filterRules(query), query, limit, offset }))
  })

  app.get('/rules/:id', async (req, reply) => {
    const rule = corpus.rulesById.get(String(req.params.id).toUpperCase())
    if (!rule) return notFound(reply, `No rule with the id ${req.params.id}.`)
    return page(reply, ruleDetail(rule))
  })

  app.get('/areas', async (req, reply) => page(reply, areasPage()))

  // ---- engine: evaluate -----------------------------------------------------
  app.get('/evaluate', async (req, reply) =>
    page(reply, evaluatePage({ submitted: false, result: null, form: {}, error: null })))

  app.post('/evaluate', async (req, reply) => {
    const b = req.body ?? {}
    if (b.sample === '1') {
      const example = corpus.examples.candidate
      const form = { ...flattenCandidate(example) }
      return engineHandler(evaluatePage, () => evaluateCandidate(example))(req, reply, { __raw: form })
    }

    const form = { ...b }
    const document = {
      gates: Object.fromEntries(HARD_GATES.map((g) => [g, tri(b[g])])),
      scores: Object.fromEntries(VALUE_FACTORS.map((f) => [f, num(b[`scores_${f}`]) ?? 0])),
      costs: Object.fromEntries(COST_FACTORS.map((f) => [f, num(b[`costs_${f}`]) ?? 0])),
      confidence: {
        evidence: num(b.confidence_evidence) ?? 1,
        measurement: num(b.confidence_measurement) ?? 1
      }
    }
    // A blank gate select is `undefined`; the evaluator rejects it, which is the point.
    for (const g of HARD_GATES) if (document.gates[g] === undefined) delete document.gates[g]

    return engineHandler(evaluatePage, () => evaluateCandidate(document))(req, reply, { __raw: form })
  })

  // ---- engine: volume -------------------------------------------------------
  app.get('/volume', async (req, reply) =>
    page(reply, volumePage({ submitted: false, result: null, form: {}, error: null })))

  app.post('/volume', async (req, reply) => {
    const b = req.body ?? {}
    const form = { dimensions: b.dimensions ?? '', sample: b.sample ?? '', seed: b.seed ?? '' }

    if (b.published === '1') {
      return engineHandler(volumePage, () => sizeVolume({
        use_published_dimensions: true,
        sample: num(b.sample) ?? 10,
        seed: num(b.seed) ?? 42
      }))(req, reply, { __raw: form })
    }

    return engineHandler(volumePage, () => {
      let parsed
      try {
        parsed = JSON.parse(String(b.dimensions ?? ''))
      } catch (err) {
        throw new InputError(`That is not valid JSON: ${err.message}`, 'dimensions')
      }
      return sizeVolume({
        ...parsed,
        sample: num(b.sample) ?? 0,
        seed: num(b.seed) ?? 42
      })
    })(req, reply, { __raw: form })
  })

  // ---- engine: cluster ------------------------------------------------------
  app.get('/cluster', async (req, reply) =>
    page(reply, clusterPage({ submitted: false, result: null, form: {}, error: null })))

  app.post('/cluster', async (req, reply) => {
    const b = req.body ?? {}
    const facts = {}
    for (const f of [...CLUSTER_FACTS, ...HARD_SPLITS]) {
      const v = tri(b[f.id])
      if (v !== undefined) facts[f.id] = v
    }
    return engineHandler(clusterPage, () => decideCluster({
      a: b.a || null,
      b: b.b || null,
      facts,
      separate_page_value: b.separate_page_value || 'low'
    }))(req, reply, { __raw: b })
  })

  // ---- engine: equation -----------------------------------------------------
  app.get('/equation', async (req, reply) =>
    page(reply, equationPage({ submitted: false, result: null, form: {}, error: null })))

  app.post('/equation', async (req, reply) => {
    const b = req.body ?? {}
    const factors = {}
    for (const f of EQUATION_IDS) {
      const v = num(b[f])
      if (v !== null) factors[f] = v
    }
    return engineHandler(equationPage, () => scoreEquation({ factors }))(req, reply, { __raw: b })
  })

  // ---- engine: change matrix ------------------------------------------------
  app.get('/change-matrix', async (req, reply) =>
    page(reply, changeMatrixPage({ submitted: false, result: null, form: {}, error: null })))

  app.post('/change-matrix', async (req, reply) => {
    const b = req.body ?? {}
    return engineHandler(changeMatrixPage, () => changeMatrix({ object: b.object, goal: b.goal }))(req, reply, { __raw: b })
  })

  // ---- engine: experiment ---------------------------------------------------
  app.get('/experiment', async (req, reply) =>
    page(reply, experimentPage({ submitted: false, result: null, form: {}, error: null })))

  app.post('/experiment', async (req, reply) => {
    const b = req.body ?? {}
    return engineHandler(experimentPage, () => buildExperiment({
      ...b,
      guardrails: String(b.guardrails ?? '').split(',').map((s) => s.trim()).filter(Boolean)
    }))(req, reply, { __raw: b })
  })

  // ---- engine: validate -----------------------------------------------------
  app.get('/validate', async (req, reply) =>
    page(reply, validatePage({ submitted: false, result: null, form: {}, error: null })))

  app.post('/validate', async (req, reply) => {
    const b = req.body ?? {}
    if (b.sample === '1') {
      const example = corpus.examples.project
      const form = { document: JSON.stringify(example, null, 2) }
      return engineHandler(validatePage, () => validateProject(example))(req, reply, { __raw: form })
    }
    return engineHandler(validatePage, () => {
      let parsed
      try {
        parsed = JSON.parse(String(b.document ?? ''))
      } catch (err) {
        throw new InputError(`That is not valid JSON: ${err.message}`, 'document')
      }
      return validateProject(parsed)
    })(req, reply, { __raw: b })
  })

  // ---- operating ------------------------------------------------------------
  app.get('/sops', async (req, reply) => page(reply, sopsPage()))
  app.get('/sops/:id', async (req, reply) => {
    const sop = corpus.sopsById.get(String(req.params.id).toUpperCase()) ??
      corpus.sops.find((s) => slugify(s.id) === slugify(req.params.id))
    if (!sop) return notFound(reply, `No SOP called ${req.params.id}.`)
    return page(reply, sopDetail(sop))
  })

  app.get('/backlog', async (req, reply) => page(reply, backlogPage()))
  app.get('/measurement', async (req, reply) => page(reply, measurementPage()))
  app.get('/experiments', async (req, reply) => page(reply, experimentsPage()))
  app.get('/commands', async (req, reply) => page(reply, commandsPage()))

  app.get('/templates', async (req, reply) => page(reply, templatesPage()))
  app.get('/templates/:id', async (req, reply) => {
    const all = [...corpus.templates, ...corpus.templateFiles]
    const tpl = all.find((t) => t.id === req.params.id || slugify(t.id) === slugify(req.params.id))
    if (!tpl) return notFound(reply, `No template called ${req.params.id}.`)
    return page(reply, templateDetail(tpl))
  })

  // ---- reference ------------------------------------------------------------
  app.get('/api', async (req, reply) => page(reply, apiPage()))
  app.get('/glossary', async (req, reply) => page(reply, glossaryPage()))
  app.get('/crosswalk', async (req, reply) => page(reply, crosswalkPage()))
  app.get('/agent-prompt', async (req, reply) => page(reply, agentPromptPage()))
  app.get('/privacy', async (req, reply) => page(reply, privacyPage()))

  app.get('/docs', async (req, reply) => page(reply, docsPage()))
  app.get('/docs/:slug', async (req, reply) => {
    const key = String(req.params.slug)
    const doc = corpus.documentsBySlug.get(key) ?? corpus.documentsByNumber.get(key)
    if (!doc) return notFound(reply, `No document called ${key}.`)
    return page(reply, docDetail(doc))
  })

  app.get('/search', async (req, reply) => {
    const q = String(req.query.q ?? '').trim()
    const { search } = await import('./api.js')
    return page(reply, searchPage({ q, results: q ? search(q, { limit: 60 }) : [] }),
      { cache: q ? 'no-store' : CACHE })
  })

  // ---- machine files --------------------------------------------------------
  app.get('/robots.txt', async (req, reply) => reply
    .type('text/plain; charset=utf-8')
    .header('cache-control', 'public, max-age=86400')
    .send(`User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`))

  app.get('/sitemap.xml', async (req, reply) => {
    const paths = [
      '/', '/grammar', '/laka', '/operators', '/objects', '/formats', '/gates', '/dimensions',
      '/rules', '/areas', '/evaluate', '/volume', '/cluster', '/equation', '/change-matrix',
      '/experiment', '/validate', '/sops', '/backlog', '/measurement', '/experiments',
      '/templates', '/commands', '/api', '/docs', '/glossary', '/crosswalk', '/agent-prompt',
      '/search', '/privacy',
      ...corpus.rules.map((r) => `/rules/${r.id}`),
      ...corpus.sops.map((s) => `/sops/${s.id}`),
      ...[...corpus.templates, ...corpus.templateFiles].map((t) => `/templates/${t.id}`),
      ...corpus.documents.map((d) => `/docs/${d.slug}`)
    ]
    const lastmod = (corpus.manifest.generated_at ?? new Date().toISOString()).slice(0, 10)
    const urls = paths.map((p) =>
      `  <url><loc>${ORIGIN}${encodeURI(p)}</loc><lastmod>${lastmod}</lastmod>${p === '/' ? '<priority>1.0</priority>' : ''}</url>`).join('\n')
    return reply
      .type('application/xml; charset=utf-8')
      .header('cache-control', 'public, max-age=86400')
      .send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
  })

  app.get('/site.webmanifest', async (req, reply) => reply
    .type('application/manifest+json; charset=utf-8')
    .header('cache-control', 'public, max-age=86400')
    .send({
      name: corpus.manifest.title,
      short_name: 'SEO System',
      description: corpus.manifest.purpose,
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#07090D',
      theme_color: '#07090D',
      icons: [
        { src: 'https://designsystem.bowtiekreative.com/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'https://designsystem.bowtiekreative.com/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: 'https://designsystem.bowtiekreative.com/brand/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    }))

  app.get('/llms.txt', async (req, reply) => reply
    .type('text/plain; charset=utf-8')
    .header('cache-control', 'public, max-age=3600')
    .send(llmsTxt()))

  // ---- 404 ------------------------------------------------------------------
  app.setNotFoundHandler((req, reply) => {
    if (req.url.startsWith('/v1/')) return reply.code(404).send({ error: 'not_found', path: req.url })
    return notFound(reply, 'That page does not exist.')
  })
}

const EQUATION_IDS = [
  'valuable_demand', 'technical_eligibility', 'intent_fit', 'information_advantage',
  'discoverability', 'prominence', 'search_result_response', 'conversion_efficiency',
  'contribution_margin', 'learning_velocity'
]

/** Turn the worked candidate example back into flat form fields, so the form reflects it. */
function flattenCandidate (example) {
  const form = {}
  for (const [k, v] of Object.entries(example.gates ?? {})) form[k] = String(v)
  for (const [k, v] of Object.entries(example.scores ?? {})) form[`scores_${k}`] = String(v)
  for (const [k, v] of Object.entries(example.costs ?? {})) form[`costs_${k}`] = String(v)
  for (const [k, v] of Object.entries(example.confidence ?? {})) form[`confidence_${k}`] = String(v)
  return form
}

function notFound (reply, message) {
  const body = `
  <section>
    <div class="wrap stack">
      <p class="eyebrow">404</p>
      <h1>Not found</h1>
      <p class="lede">${message}</p>
      <div class="actions">
        <a class="pill pill--solid" href="/">Home</a>
        <a class="pill" href="/rules">Browse the rules</a>
        <a class="pill" href="/search">Search</a>
      </div>
    </div>
  </section>`
  return reply.code(404).type('text/html; charset=utf-8').header('cache-control', 'no-store').send(layout({
    title: 'Not found', description: 'That page does not exist.', path: '/404', body
  }))
}

function llmsTxt () {
  const m = corpus.manifest
  const inv = m.inventory
  return `# ${m.title}

> ${m.purpose}

Version ${m.version}. ${inv.rules} decision rules across ${inv.areas} areas, ${inv.publication_gates} hard publication gates, ${inv.laka_levels} LAKA change levels, ${inv.dimension_families} volumetric dimension families, ${inv.sops} SOPs, ${inv.formulas} measurement formulas and ${inv.documents} source documents.

## The two ideas everything rests on

SEO business value is a PRODUCT of ten factors, not a sum:
${(corpus.grammar.governing_equation ?? []).join('\n')}

Because they multiply, a near-zero factor neutralises the rest. A technically perfect page with
no valuable demand is weak. A ranking page that produces no business outcome is weak. Work the
weakest link, not the factor that is easiest to improve.

Volumetric generation is an analysis technique, NOT a publishing plan:
${(corpus.dimensions.safe_scale ?? []).map((s, i) => `${i + 1}. ${s}`).join('\n')}

## The eight hard publication gates
${corpus.hardGates.map((g) => `- ${g.field}: ${g.conditions.length ? `passes if ${g.conditions.join(g.joiner === 'AND' ? ' AND ' : ' OR ')}` : `specified by ${g.defined_by.join('; ')}`}`).join('\n')}

All eight must pass. A candidate failing any one routes to research, consolidation, repair,
deferral or rejection — never to publication.

## The minimum operating rule
An SEO action is not ready for execution until it can name: the audience, the task, the intended
canonical asset, the expected mechanism, the primary metric, and the decision rule.

## API
Base URL: ${ORIGIN}
OpenAPI: ${ORIGIN}/v1/openapi.json
Index: ${ORIGIN}/v1

Read:
- ${ORIGIN}/v1/rules?area=technical-eligibility — filter ${inv.rules} rules by area, LAKA level, operator, metric or free text
- ${ORIGIN}/v1/rules/{id} — one rule with its branches, area, levels and neighbours
- ${ORIGIN}/v1/gates — the eight hard gates and the rules that govern each
- ${ORIGIN}/v1/documents/{slug} — any of the ${inv.documents} source documents, parsed into sections
- ${ORIGIN}/v1/source/{slug} — the authored package byte for byte, including the EBNF grammar
- ${ORIGIN}/v1/search?q= — search rules, gates, SOPs, templates, terms and document sections

Run:
- POST ${ORIGIN}/v1/evaluate — a candidate through the eight gates and the priority score
- POST ${ORIGIN}/v1/volume — size a volumetric space without enumerating it
- POST ${ORIGIN}/v1/cluster — same page or separate pages, by the one-page rule
- POST ${ORIGIN}/v1/equation — score the governing equation and find the weakest link
- POST ${ORIGIN}/v1/resolve — which rules govern a context, before you act
- POST ${ORIGIN}/v1/laka — the five-level change matrix for an object
- POST ${ORIGIN}/v1/experiment — turn a change into a decidable experiment card
- POST ${ORIGIN}/v1/validate — a project document against the schema and completeness gates

## What the engine refuses to do
It does not guess. Where a decision depends on a fact the caller has not supplied, the response
names the missing fact rather than assuming a value. On POST /v1/evaluate a missing gate is a
400, never an implied pass. On POST /v1/cluster an unknown condition returns TEST — one
provisional cluster and an observation — never a second page. On POST /v1/equation an unscored
factor is reported as unknown, not treated as 1.

See ${ORIGIN}/v1/engine/spec for what each endpoint requires.

## Rule areas
${corpus.areas.map((a) => `- ${a.name} (${a.count} rules, prefix ${a.prefix}): ${ORIGIN}/v1/rules?area=${a.slug}`).join('\n')}

## LAKA change levels
${corpus.lakaLevels.map((l) => `- ${l.name} (${l.rule_count} rules): ${l.definition}`).join('\n')}

## Pages
${MENU.flatMap((g) => g.items.map((i) => `- ${ORIGIN}${i.href} — ${i.title}: ${i.note}`)).join('\n')}

## Usage note
${m.usage_note}

## Copyright
${m.copyright_note}
`
}
