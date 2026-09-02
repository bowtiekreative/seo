/**
 * Reference pages: the operating material (SOPs, backlog, templates, commands), the
 * measurement model, the source documents, the API reference, the glossary and search.
 */

import { corpus } from '../corpus.js'
import { esc, attr, icon, ORIGIN, MENU } from './layout.js'
import {
  pageHead, statGrid, codeBlock, jsonBlock, table, chips, chip, defList, prose, bullets,
  sectionBody, disclose, inlineMarkdown, featureCard
} from './components.js'
import { ENDPOINTS } from '../routes/api.js'

const inv = corpus.manifest.inventory

const section = (body, { className = '' } = {}) =>
  `  <section class="${className}">
    <div class="wrap stack">
${body}
    </div>
  </section>`

// ---------------------------------------------------------------------------
// Dimensions
// ---------------------------------------------------------------------------

export function dimensionsPage () {
  const d = corpus.dimensions
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Volumetric',
    title: `${inv.dimension_families} dimension families`,
    lede: `${inv.dimension_values} values across ${inv.dimension_families} independent families. Multiplied out they describe ${BigInt(d.theoretical_volume ?? 0).toLocaleString('en-US')} theoretical combinations — an analysis space, never a publishing target.`
  })}`)}

${section(`      <div class="grid grid--3">
        ${(d.families ?? []).map((f) => `
        <div class="card" data-component="card" id="${attr(f.id)}">
          <strong class="ink t-18">${esc(f.name)}</strong>
          <p class="muted t-14 my-2">${f.values.length} values</p>
          <ul class="chips mt-4">${f.values.map((v) => `<li>${chip(v, { mark: '·' })}</li>`).join('')}</ul>
        </div>`).join('')}
      </div>
      <div class="actions"><a class="pill pill--solid" data-component="cta" href="/volume">Size a space</a></div>`)}

${section(`      <h2>Safe scale</h2>
      <ol class="steps">${(d.safe_scale ?? []).map((s) => `<li><div><p class="m-0 ink">${esc(s)}</p></div></li>`).join('')}</ol>`)}`

  return {
    title: `${inv.dimension_families} volumetric dimension families`,
    description: `The ${inv.dimension_families} independent opportunity dimensions the volumetric engine generates candidates across.`,
    path: '/dimensions',
    body
  }
}

// ---------------------------------------------------------------------------
// Measurement
// ---------------------------------------------------------------------------

export function measurementPage () {
  const m = corpus.measurement
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Measurement',
    title: 'Measured in business value',
    lede: 'Rankings are a diagnostic, not an outcome. Every formula here resolves to something the business can bank, and every one names the grain it must be measured at.'
  })}
      ${prose(m.philosophy)}`)}

${section(`      <h2>The five primary KPIs</h2>
      <ol class="steps">${(m.primary_kpis ?? []).map((k) => `<li><div><p class="m-0 ink">${esc(k)}</p></div></li>`).join('')}</ol>`)}

${section(`      <h2>The outcome hierarchy</h2>
      <p class="muted t-15">Five levels, from business outcomes down to technical states. A metric at a lower level is only worth watching because of the level above it.</p>
      <div class="stack mt-6">
        ${(m.outcome_levels ?? []).map((l) => `
        <article class="finding" data-component="card">
          <div class="finding__head">
            ${chip(`Level ${l.level}`, { mark: '#' })}
            <strong class="ink t-18">${esc(l.name)}</strong>
          </div>
          ${l.measures?.length ? `<ul class="finding__units">${l.measures.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        </article>`).join('')}
      </div>`)}

${section(`      <h2>The ${inv.formulas} formulas</h2>
      <div class="stack">
        ${(m.formulas ?? []).map((f) => `
        <article class="finding" data-component="card" id="${attr(f.id)}">
          <div class="finding__head"><strong class="ink t-18">${esc(f.name)}</strong></div>
          ${codeBlock(f.expression)}
          ${f.notes?.length ? prose(f.notes) : ''}
        </article>`).join('')}
      </div>`)}

${m.data_grain ? section(`      <h2>Data grain</h2>
      ${table(m.data_grain)}`) : ''}

${m.event_dictionary ? section(`      <h2>Event dictionary</h2>
      ${table(m.event_dictionary)}`) : ''}

${(m.baseline_protocol ?? []).length ? section(`      <h2>Baseline protocol</h2>
      ${m.baseline_protocol.map((b) => codeBlock(b.code)).join('')}`) : ''}`

  return {
    title: 'Measurement and KPIs',
    description: `The outcome hierarchy, five primary KPIs and ${inv.formulas} measurement formulas, all denominated in business value.`,
    path: '/measurement',
    body
  }
}

export function experimentsPage () {
  const e = corpus.experiments
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Learning',
    title: 'Hypotheses and decisions',
    lede: 'A change becomes an experiment when it has a mechanism, a primary metric, guardrails and a decision rule agreed before launch rather than after seeing the data.'
  })}`)}

${section(`      <h2>The hypothesis grammar</h2>
      ${(e.hypothesis_grammar ?? []).map((b) => codeBlock(b.code)).join('')}
      ${e.compact_grammar?.length ? codeBlock(e.compact_grammar.join('\n'), 'Compact form') : ''}
      <div class="actions"><a class="pill pill--solid" data-component="cta" href="/experiment">Build an experiment card</a></div>`)}

${(e.experiment_card ?? []).length ? section(`      <h2>The experiment card</h2>
      ${e.experiment_card.map((b) => codeBlock(b.code)).join('')}`) : ''}

${section(`      <h2>Decision outcomes</h2>
      <p class="muted t-15">Seven outcomes, chosen in advance. "Keep going and see" is not one of them.</p>
      <div class="stack mt-6">
        ${(e.decisions ?? []).map((d) => `
        <article class="finding" data-component="card" id="${attr(d.id)}">
          <div class="finding__head"><strong class="ink t-18">${esc(d.name)}</strong></div>
          ${d.prose?.length ? prose(d.prose) : ''}
          ${d.block ? codeBlock(d.block) : ''}
        </article>`).join('')}
      </div>`)}

${section(`      <h2>Experiment types by LAKA level</h2>
      <div class="stack">
        ${(e.types ?? []).map((t) => `
        <article class="finding" data-component="card">
          <div class="finding__head"><strong class="ink t-18">${esc(t.name)}</strong></div>
          ${t.prose?.length ? prose(t.prose) : ''}
          ${t.block ? codeBlock(t.block) : ''}
        </article>`).join('')}
      </div>`)}

${e.comparison_designs ? section(`      <h2>Comparison designs</h2>
      ${table(e.comparison_designs)}`) : ''}

${e.observation_windows ? section(`      <h2>Observation windows</h2>
      ${table(e.observation_windows)}`) : ''}`

  return {
    title: 'Hypotheses and experiments',
    description: 'The hypothesis grammar, the experiment card, seven decision outcomes and the observation windows each change level needs.',
    path: '/experiments',
    body
  }
}

// ---------------------------------------------------------------------------
// SOPs, backlog, templates, commands
// ---------------------------------------------------------------------------

export function sopsPage () {
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Operating',
    title: `${inv.sops} standard procedures`,
    lede: 'Repeatable procedures for the work that recurs — measurement foundations, demand graphs, cannibalization, technical eligibility, authority campaigns and volumetric audits.'
  })}`)}

${section(`      <div class="grid grid--2">
        ${corpus.sops.map((s) => `
        <a class="card feature plain" data-component="card" href="/sops/${attr(s.id)}">
          <span class="feature__icon">${icon('sop')}</span>
          <span>
            <strong class="ink t-18 block">${esc(s.name)}</strong>
            <span class="muted t-14 my-2 block">${esc(s.goal || `${s.sections.length} steps`)}</span>
          </span>
        </a>`).join('')}
      </div>`)}`

  return {
    title: `${inv.sops} audit and execution SOPs`,
    description: 'Repeatable standard operating procedures for SEO measurement, demand mapping, canonical ownership, technical eligibility and authority.',
    path: '/sops',
    body
  }
}

export function sopDetail (sop) {
  const body = `
${section(`      <p class="meta-id">${esc(sop.id)}</p>
      <h1>${esc(sop.name)}</h1>
      ${sop.goal ? `<p class="lede mt-6">${esc(sop.goal)}</p>` : ''}`)}

${sop.sections.map((s) => section(`      <h2>${esc(s.heading)}</h2>
${sectionBody(s)}`)).join('\n')}

${section(`      <div class="panel" data-component="panel">
        <p class="muted t-14 m-0">As JSON: <a href="/v1/sops/${attr(sop.id)}"><code>GET /v1/sops/${esc(sop.id)}</code></a></p>
      </div>
      <div class="actions"><a class="pill" data-component="button" href="/sops">← All SOPs</a></div>`)}`

  return {
    title: sop.name,
    description: sop.goal || `${sop.id} — a standard operating procedure from the LAKA SEO grammar system.`,
    path: `/sops/${sop.id}`,
    body,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: sop.name,
      description: sop.goal || sop.name,
      url: `${ORIGIN}/sops/${sop.id}`,
      step: sop.sections.flatMap((s) => s.bullets.map((b, i) => ({
        '@type': 'HowToStep', position: i + 1, name: s.heading, text: b
      }))).slice(0, 30)
    }
  }
}

export function backlogPage () {
  const b = corpus.backlog
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Operating',
    title: `${inv.phases} phases, each with an exit gate`,
    lede: 'A dependency-ordered rollout. Measurement and technical eligibility come before expansion, because an unmeasurable or ineligible asset cannot pay back what it costs.'
  })}`)}

${section((b.phases ?? []).map((p) => `      <article class="finding" data-component="card" id="${attr(p.id)}">
        <div class="finding__head">
          ${chip(`Phase ${p.number}`, { mark: '#' })}
          <strong class="ink t-18">${esc(p.name)}</strong>
        </div>
        ${p.tasks?.length ? `<ul class="finding__units">${p.tasks.map((t) => `<li>${inlineMarkdown(t)}</li>`).join('')}</ul>` : ''}
        ${p.exit_gate ? `<div class="mt-4">${codeBlock(p.exit_gate, 'Exit gate')}</div>` : ''}
      </article>`).join('\n'))}

${(b.cadence ?? []).length ? section(`      <h2>Ongoing cadence</h2>
      <div class="grid grid--3">
        ${b.cadence.map((c) => `
        <div class="card" data-component="card">
          <strong class="ink t-18">${esc(c.name)}</strong>
          ${c.items?.length ? `<ul class="finding__units">${c.items.map((i) => `<li>${inlineMarkdown(i)}</li>`).join('')}</ul>` : ''}
        </div>`).join('')}
      </div>`) : ''}

${b.definition_of_done ? section(`      <h2>Definition of done</h2>
      ${codeBlock(b.definition_of_done)}`) : ''}`

  return {
    title: 'Implementation backlog',
    description: `A dependency-ordered ${inv.phases}-phase SEO rollout, each phase with an explicit exit gate.`,
    path: '/backlog',
    body
  }
}

export function templatesPage () {
  const all = [...corpus.templates, ...corpus.templateFiles]
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Operating',
    title: `${inv.templates} templates`,
    lede: 'Briefs, matrices, scorecards and page specifications — the artifacts the procedures actually produce.'
  })}`)}

${section(`      <div class="grid grid--3">
        ${all.map((t) => `
        <a class="card feature plain" data-component="card" href="/templates/${attr(t.id)}">
          <span class="feature__icon">${icon('template')}</span>
          <span>
            <strong class="ink t-16 block">${esc(t.name)}</strong>
            <span class="muted t-13 my-2 block"><code>${esc(t.id)}</code></span>
          </span>
        </a>`).join('')}
      </div>`)}`

  return {
    title: `${inv.templates} page and cluster templates`,
    description: 'Page specifications, intent-cluster briefs, change matrices, experiment cards, scorecards and portfolio reviews.',
    path: '/templates',
    body
  }
}

export function templateDetail (tpl) {
  const body = `
${section(`      <p class="meta-id">${esc(tpl.id)}</p>
      <h1>${esc(tpl.name)}</h1>
      ${tpl.prose?.length ? prose(tpl.prose) : ''}`)}

${section(`      ${tpl.body ? codeBlock(tpl.body) : ''}
      ${(tpl.blocks ?? []).slice(1).map((b) => codeBlock(b.code)).join('')}
      ${(tpl.tables ?? []).map(table).join('')}`)}

${section(`      <div class="actions"><a class="pill" data-component="button" href="/templates">← All templates</a></div>`)}`

  return {
    title: tpl.name,
    description: `${tpl.id} — a reusable template from the LAKA SEO grammar system.`,
    path: `/templates/${tpl.id}`,
    body
  }
}

export function commandsPage () {
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Operating',
    title: `${inv.commands} pseudo-commands`,
    lede: 'A compact notation for humans and agents. Not tied to any software package — a way of writing an instruction down so that every parameter it needs is visible.'
  })}`)}

${section(corpus.commands.map((c) => `      <article class="finding" data-component="card" id="${attr(c.name.replace(/^\//, ''))}">
        <div class="finding__head">
          <strong class="ink t-18"><code>${esc(c.name)}</code></strong>
          <span class="muted t-14">${esc(c.purpose)}</span>
        </div>
        ${codeBlock(c.block)}
      </article>`).join('\n'))}`

  return {
    title: `${inv.commands} SEO pseudo-commands`,
    description: 'A compact command notation for defining programs, expanding territories, clustering, gating, running LAKA and creating experiments.',
    path: '/commands',
    body
  }
}

// ---------------------------------------------------------------------------
// Documents and source
// ---------------------------------------------------------------------------

export function docsPage () {
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Reference',
    title: `${inv.documents} source documents`,
    lede: 'The authored package this whole system is derived from. Everything the API serves is either copied from these or parsed out of them.'
  })}`)}

${section(`      <div class="grid grid--2">
        ${corpus.documents.map((d) => `
        <a class="card feature plain" data-component="card" href="/docs/${attr(d.slug)}">
          <span class="feature__icon">${icon('doc')}</span>
          <span>
            <strong class="ink t-18 block">${esc(d.title)}</strong>
            <span class="muted t-14 my-2 block">${esc(d.purpose)} · ${d.section_count} sections</span>
          </span>
        </a>`).join('')}
      </div>`)}

${section(`      <h2>The package, byte for byte</h2>
      <p class="muted t-15">Including the EBNF grammar, the YAML rule library, the JSON Schema and the combined guide.</p>
      <div class="table-scroll">
        <table>
          <caption class="visually-hidden">The authored source files and their sizes</caption>
          <thead><tr><th scope="col">File</th><th scope="col">Size</th><th scope="col"></th></tr></thead>
          <tbody>${corpus.sourceFiles.map((f) => `<tr>
            <td><code>${esc(f.filename)}</code></td>
            <td>${(f.bytes / 1024).toFixed(1)} kB</td>
            <td><a href="/v1/source/${attr(f.slug)}">Raw →</a></td>
          </tr>`).join('')}</tbody>
        </table>
      </div>`)}`

  return {
    title: `${inv.documents} source documents`,
    description: 'The ten authored documents of the LAKA SEO grammar system, plus the EBNF grammar, rule library and project schema.',
    path: '/docs',
    body
  }
}

export function docDetail (doc) {
  const toc = doc.outline.filter((o) => o.depth === 2)
  const body = `
${section(`      <p class="meta-id">Document ${esc(doc.number)}</p>
      <h1>${esc(doc.title)}</h1>
      <p class="lede mt-6">${esc(doc.purpose)}</p>
      ${toc.length ? `<nav class="panel mt-8" aria-label="On this page">
        <h2 class="t-16 m-0">On this page</h2>
        <ul class="stack indent mt-4 m-0">${toc.map((o) => `<li><a href="#${attr(o.anchor)}">${esc(o.heading)}</a></li>`).join('')}</ul>
      </nav>` : ''}`)}

${doc.sections.filter((s) => s.depth > 1).map((s) => {
    const Tag = `h${Math.min(s.depth, 6)}`
    return section(`      <${Tag} id="${attr(s.anchor)}">${esc(s.heading)}</${Tag}>
${sectionBody(s)}`)
  }).join('\n')}

${section(`      <div class="panel" data-component="panel">
        <p class="muted t-14 m-0">This document as JSON: <a href="/v1/documents/${attr(doc.slug)}"><code>GET /v1/documents/${esc(doc.slug)}</code></a> · <a href="/v1/source/${attr(doc.slug.replace(/^/, ''))}">raw markdown</a></p>
      </div>
      <div class="actions"><a class="pill" data-component="button" href="/docs">← All documents</a></div>`)}`

  return {
    title: doc.title,
    description: doc.purpose || `Document ${doc.number} of the LAKA SEO grammar system.`,
    path: `/docs/${doc.slug}`,
    body,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: doc.title,
      description: doc.purpose,
      url: `${ORIGIN}/docs/${doc.slug}`,
      isPartOf: { '@type': 'WebSite', name: corpus.manifest.title, url: ORIGIN },
      publisher: { '@type': 'Organization', name: 'Bow Tie Kreative', url: 'https://bowtiekreative.com' }
    }
  }
}

// ---------------------------------------------------------------------------
// Glossary, crosswalk, agent prompt
// ---------------------------------------------------------------------------

export function glossaryPage () {
  const groups = new Map()
  for (const t of corpus.glossary) {
    const letter = /^[a-z]/i.test(t.term) ? t.term[0].toUpperCase() : '#'
    if (!groups.has(letter)) groups.set(letter, [])
    groups.get(letter).push(t)
  }
  const letters = [...groups.keys()].sort()

  const body = `
${section(`      ${pageHead({
    eyebrow: 'Reference',
    title: `${inv.glossary_terms} terms`,
    lede: 'Every primitive, gate, level and formula the grammar names, with where it is defined.'
  })}
      <ul class="chips mt-6">${letters.map((l) => `<li><a class="badge" data-mark="" href="#letter-${l === '#' ? 'other' : l}">${l}</a></li>`).join('')}</ul>`)}

${letters.map((l) => section(`      <h2 id="letter-${l === '#' ? 'other' : l}">${esc(l)}</h2>
      <dl class="deflist">
        ${groups.get(l).map((t) => `
        <dt id="${attr(t.slug)}">${esc(t.term)}</dt>
        <dd>${esc(t.definition)}${t.source?.heading ? ` <span class="muted t-13">— ${esc(t.source.file ?? '')} ${esc(t.source.heading)}</span>` : ''}</dd>`).join('')}
      </dl>`)).join('\n')}`

  return {
    title: 'Glossary',
    description: `${inv.glossary_terms} defined terms from the LAKA SEO grammar system, each with its source.`,
    path: '/glossary',
    body
  }
}

export function crosswalkPage () {
  const c = corpus.crosswalk
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Reference',
    title: 'Crosswalk and sources',
    lede: 'How the course vocabulary maps onto this grammar, which pieces of common SEO folklore are wrong, and which primary sources the system actually relies on.'
  })}`)}

${(c.translation ?? []).length ? section(`      <h2>Course-to-grammar translation</h2>
      ${c.translation.map((t) => table(t)).join('\n')}`) : ''}

${(c.corrections ?? []).length ? section(`      <h2>Terminology corrections</h2>
      <p class="muted t-15">Widely repeated claims the system does not accept.</p>
      <div class="stack mt-6">
        ${c.corrections.map((x) => `
        <article class="finding" data-component="card" id="${attr(x.id)}">
          <div class="finding__head">
            ${chip('Correction', { mark: '!', cls: 'badge--default' })}
            <strong class="ink t-18">${esc(x.term)}</strong>
          </div>
          <p class="m-0">${esc(x.correction)}</p>
          ${(x.blocks ?? []).map((b) => codeBlock(b.code)).join('')}
        </article>`).join('')}
      </div>`) : ''}

${(c.primary_sources ?? []).length ? section(`      <h2>Primary sources</h2>
      <div class="stack">
        ${c.primary_sources.map((s) => `
        <article class="finding" data-component="card" id="${attr(s.id)}">
          <div class="finding__head"><strong class="ink t-18">${esc(s.name)}</strong></div>
          ${bullets(s.points)}
        </article>`).join('')}
      </div>`) : ''}

${c.evidence_classification?.table || (c.evidence_classification?.blocks ?? []).length ? section(`      <h2>Evidence classification</h2>
      ${c.evidence_classification.table ? table(c.evidence_classification.table) : ''}
      ${(c.evidence_classification.blocks ?? []).map((b) => codeBlock(b.code)).join('')}`) : ''}

${(c.versioning ?? []).length ? section(`      <h2>Versioning</h2>
      ${prose(c.versioning)}`) : ''}`

  return {
    title: 'Crosswalk and sources',
    description: 'Course-to-grammar translation, terminology corrections and the current primary-source guidance the system relies on.',
    path: '/crosswalk',
    body
  }
}

export function agentPromptPage () {
  const a = corpus.agentPrompt
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Reference',
    title: 'The agent operating prompt',
    lede: 'The system prompt for an SEO agent or agent team working inside this grammar. Reproduced verbatim so it can be copied without paraphrase.'
  })}
      <div class="actions"><a class="pill" data-component="button" href="/v1/agent-prompt">As JSON</a> <a class="pill" data-component="button" href="${ORIGIN}/llms.txt">llms.txt</a></div>`)}

${(a.sections ?? []).filter((s) => s.depth > 1).map((s) => {
    const Tag = `h${Math.min(s.depth, 6)}`
    return section(`      <${Tag} id="${attr(s.anchor)}">${esc(s.heading)}</${Tag}>
${sectionBody(s)}`)
  }).join('\n')}`

  return {
    title: 'Agent operating prompt',
    description: 'The operating prompt for an SEO agent working inside the LAKA grammar — gates, evidence standards, workflow and recommendation format.',
    path: '/agent-prompt',
    body
  }
}

// ---------------------------------------------------------------------------
// API reference
// ---------------------------------------------------------------------------

export function apiPage () {
  const byTag = new Map()
  for (const e of ENDPOINTS) {
    const tag = e.path.startsWith('/v1/rules') || e.path.startsWith('/v1/areas') || e.path.startsWith('/v1/levels')
      ? 'Rules'
      : e.method === 'POST' || e.path.startsWith('/v1/engine')
        ? 'Engine'
        : ['/v1', '/v1/health', '/v1/openapi.json', '/v1/manifest'].includes(e.path)
          ? 'Meta'
          : e.path.startsWith('/v1/gates')
            ? 'Gates'
            : ['/v1/grammar', '/v1/laka', '/v1/operators', '/v1/objects', '/v1/formats', '/v1/dimensions'].some((p) => e.path.startsWith(p))
              ? 'Model'
              : 'Corpus'
    if (!byTag.has(tag)) byTag.set(tag, [])
    byTag.get(tag).push(e)
  }

  const order = ['Meta', 'Model', 'Gates', 'Rules', 'Corpus', 'Engine']

  const body = `
${section(`      ${pageHead({
    eyebrow: 'Reference',
    title: 'API',
    lede: `Every page on this site has a JSON equivalent. ${ENDPOINTS.length} endpoints, all public, no key required. GET endpoints are cacheable; POST endpoints run the engine and are never cached.`
  })}
      <div class="actions">
        <a class="pill pill--solid" data-component="cta" href="/v1/openapi.json">OpenAPI 3.1</a>
        <a class="pill" data-component="button" href="/v1">Index</a>
        <a class="pill" data-component="button" href="${ORIGIN}/llms.txt">llms.txt</a>
      </div>`)}

${section(`      <h2>Base URL</h2>
      ${codeBlock(ORIGIN)}
      <p class="muted t-15">The engine never guesses. Where a decision depends on a fact you have not supplied, the response names the missing fact rather than assuming a value.</p>`)}

${order.filter((t) => byTag.has(t)).map((tag) => section(`      <h2 id="${attr(tag.toLowerCase())}">${esc(tag)}</h2>
      <div class="table-scroll">
        <table>
          <caption class="visually-hidden">API endpoints in this group</caption>
          <thead><tr><th scope="col">Method</th><th scope="col">Path</th><th scope="col">Summary</th></tr></thead>
          <tbody>${byTag.get(tag).map((e) => `<tr>
            <td><code>${esc(e.method)}</code></td>
            <td>${e.method === 'GET' && !e.path.includes('{') ? `<a href="${attr(e.path)}"><code>${esc(e.path)}</code></a>` : `<code>${esc(e.path)}</code>`}</td>
            <td class="t-14">${esc(e.summary)}</td>
          </tr>`).join('')}</tbody>
        </table>
      </div>`)).join('\n')}

${section(`      <h2>Worked calls</h2>
      ${disclose('Evaluate a candidate', codeBlock(`curl -X POST ${ORIGIN}/v1/evaluate \\
  -H 'content-type: application/json' \\
  -d '${JSON.stringify(corpus.examples.candidate)}'`), { open: true })}
      <div class="mt-4">${disclose('Size a volumetric space', codeBlock(`curl -X POST ${ORIGIN}/v1/volume \\
  -H 'content-type: application/json' \\
  -d '${JSON.stringify({ ...corpus.examples.dimensions, sample: 5 })}'`))}</div>
      <div class="mt-4">${disclose('Which rules govern a context', codeBlock(`curl -X POST ${ORIGIN}/v1/resolve \\
  -H 'content-type: application/json' \\
  -d '{"area":"technical-eligibility","level":"Structural"}'`))}</div>
      <div class="mt-4">${disclose('Filter the rules', codeBlock(`curl '${ORIGIN}/v1/rules?area=measurement-and-experimentation&level=Baseline'`))}</div>`)}`

  return {
    title: 'API reference',
    description: `${ENDPOINTS.length} public JSON endpoints serving the ${inv.rules}-rule SEO grammar corpus and running its decision engine.`,
    path: '/api',
    body
  }
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

const TYPE_LABEL = {
  rule: 'Rule',
  gate: 'Gate',
  dimension: 'Dimension',
  sop: 'SOP',
  template: 'Template',
  phase: 'Phase',
  command: 'Command',
  formula: 'Formula',
  term: 'Term',
  level: 'Level',
  document: 'Document',
  section: 'Section'
}

export function searchPage ({ q, results }) {
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Reference',
    title: 'Search',
    lede: 'Rules, gates, dimensions, SOPs, templates, phases, commands, formulas, terms and every section of the ten source documents.'
  })}

      <form class="panel" data-component="panel" method="get" action="/search">
        <div class="filters">
          <div class="field">
            <label for="q">Query</label>
            <input type="search" autocomplete="off" id="q" name="q" value="${attr(q)}" placeholder="canonical conflict, contribution margin, cannibalization…">
          </div>
          <div class="field">
            <label for="s-submit" class="visually-hidden">Search</label>
            <button class="pill pill--solid" data-component="cta" id="s-submit" type="submit">Search</button>
          </div>
        </div>
      </form>`)}

${q ? section(`      <p class="muted t-15">${results.length} result${results.length === 1 ? '' : 's'} for “${esc(q)}”</p>
      ${results.length
        ? `<ul class="rules mt-4">${results.map((r) => `<li>
            <a class="rule" href="${attr(r.href)}">
              <span class="rule__id">${esc(TYPE_LABEL[r.type] ?? r.type)}</span>
              <span>
                <span class="rule__name">${esc(r.title)}</span>
                <span class="rule__logic">${esc(r.id)}</span>
              </span>
            </a>
          </li>`).join('')}</ul>`
        : '<div class="panel mt-4"><p class="m-0">Nothing matches. Every term must appear, so try fewer words.</p></div>'}`) : ''}`

  return {
    title: q ? `Search — ${q}` : 'Search',
    description: 'Search the SEO grammar: rules, gates, dimensions, SOPs, templates, formulas, terms and document sections.',
    path: '/search',
    body
  }
}

// ---------------------------------------------------------------------------
// Privacy
// ---------------------------------------------------------------------------

export function privacyPage () {
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Legal',
    title: 'Privacy',
    lede: 'This site sets no cookies, runs no analytics and stores nothing you submit.'
  })}`)}

${section(`      <h2>What is collected</h2>
      <p>Nothing that identifies you. There are no cookies, no analytics scripts, no fingerprinting and no third-party trackers.</p>

      <h2>What happens to what you submit</h2>
      <p>The engine pages and the <code>POST /v1/*</code> endpoints evaluate your input in memory and return the result. Nothing is written to disk or to a database, and nothing is retained after the response is sent. The container's filesystem is read-only at runtime.</p>

      <h2>Logs</h2>
      <p>The server writes ordinary operational request logs — method, path, status and timing. They are not used to build a profile of anyone.</p>

      <h2>Third parties</h2>
      <p>Two external origins are loaded: Google Fonts for the typeface, and the Bow Tie Kreative design-system CDN for the brand seal and icons. No other origin is permitted by the content security policy.</p>

      <h2>Contact</h2>
      <p><a href="https://bowtiekreative.com">Bow Tie Kreative</a>.</p>`)}`

  return {
    title: 'Privacy',
    description: 'No cookies, no analytics, no retention. What you submit to the engine is evaluated in memory and discarded.',
    path: '/privacy',
    body
  }
}
