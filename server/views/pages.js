/**
 * The primary pages: the home page, the model pages, the rule browser and the four
 * interactive engine pages.
 *
 * Every interactive page is a plain HTML form that posts and renders its result server-side,
 * so it works with JavaScript switched off — which is also what makes it indexable.
 */

import { corpus } from '../corpus.js'
import { esc, attr, icon, lattice, ORIGIN } from './layout.js'
import {
  pageHead, statGrid, featureCard, codeBlock, jsonBlock, table, chips, chip, levelBadge,
  ruleRow, branchTree, verdict, defList, prose, bullets, sectionBody, disclose, pager,
  inlineMarkdown
} from './components.js'
import { HARD_GATES, VALUE_FACTORS, COST_FACTORS, BANDS, EQUATION_FACTORS } from '../engine/gates.js'
import { CLUSTER_FACTS, HARD_SPLITS } from '../engine/cluster.js'
import { MAX_SAMPLE } from '../engine/volume.js'

const inv = corpus.manifest.inventory

const section = (body, { className = '' } = {}) =>
  `  <section class="${className}">
    <div class="wrap stack">
${body}
    </div>
  </section>`

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------

export function home () {
  const equation = corpus.grammar.governing_equation ?? []
  const sentence = corpus.grammar.governing_sentence ?? []

  const body = `
  <section class="hero">
    ${lattice()}
    <div class="wrap hero__content stack">
      <p class="eyebrow">LAKA · Volumetric SEO</p>
      <h1 class="t-32">SEO as a language you can argue with</h1>
      <p class="lede narrow mt-6">${esc(corpus.manifest.purpose)} ${inv.rules} decision rules, ${inv.publication_gates} hard publication gates and an engine that runs them — and that tells you what it cannot know instead of guessing.</p>
      <div class="actions">
        <a class="pill pill--solid" href="/evaluate">Evaluate a candidate</a>
        <a class="pill" href="/gates">The eight gates</a>
        <a class="pill" href="/api">API reference</a>
      </div>
    </div>
  </section>

${section(`      ${statGrid([
    { value: inv.rules, label: 'Decision rules' },
    { value: inv.publication_gates, label: 'Hard gates' },
    { value: inv.dimension_families, label: 'Dimension families' },
    { value: inv.formulas, label: 'Measurement formulas' }
  ])}`)}

${section(`      <h2>The governing equation</h2>
      <p class="lede narrow">SEO business value is a product, not a sum. Because the terms multiply, a near-zero factor neutralises everything else — a technically perfect page with no valuable demand is weak, and so is a ranking page that produces no business outcome.</p>
      <div class="grid grid--2 mt-6">
        ${codeBlock(equation.join('\n'), 'The ten factors')}
        <div class="panel">
          <p class="lead-statement">Work the weakest link.</p>
          <p class="muted t-15 my-3">Improving a strong factor while a near-zero factor stands changes almost nothing. <a href="/equation">Score the equation</a> to find which factor is actually holding the system down.</p>
          <p class="muted t-14 my-4">${esc(corpus.grammar.equation_note ?? '')}</p>
        </div>
      </div>`)}

${section(`      <h2>The governing sentence</h2>
      <p class="lede narrow">Every SEO action must be expressible in one sentence. An action that cannot name its audience, task, canonical asset, mechanism, metric and decision rule is not ready for execution.</p>
      ${codeBlock(sentence.join('\n'), 'Document 01 — the canonical SEO sentence')}`)}

${section(`      <h2>What volumetric actually means</h2>
      <p class="lede narrow">Not publishing every keyword permutation. Generating opportunity candidates across many independent dimensions, then pruning hard.</p>
      <ol class="steps mt-8">
        ${(corpus.dimensions.safe_scale ?? []).map((s) => `<li><div><p class="m-0 ink">${esc(s)}</p></div></li>`).join('')}
      </ol>
      <p class="muted t-15 mt-8">The twelve published dimension families multiply to <strong class="ink">${esc(BigInt(corpus.dimensions.theoretical_volume ?? 0).toLocaleString('en-US'))}</strong> theoretical combinations. That is an analysis space, never a publishing target. <a href="/volume">Size a space safely</a>.</p>`)}

${section(`      <h2>Start here</h2>
      <div class="grid grid--2 mt-6">
        ${featureCard({ href: '/gates', iconName: 'gate', title: 'The eight hard gates', body: 'What may be published at all. Fail one and the candidate routes to research, consolidation, repair or rejection — never to publication.' })}
        ${featureCard({ href: '/rules', iconName: 'rules', title: `${inv.rules} decision rules`, body: `Twelve areas, each with twelve IF / THEN / ELSE rules, ordered by a published precedence so conflicts resolve the same way twice.` })}
        ${featureCard({ href: '/laka', iconName: 'levels', title: 'The five change levels', body: 'Baseline, Minor, Major, Structural, Paradigm. Escalate only when the cheaper, more reversible level has been tried and measured.' })}
        ${featureCard({ href: '/measurement', iconName: 'metric', title: 'Measurement first', body: `${inv.formulas} formulas and five primary KPIs, all denominated in business value rather than rankings.` })}
      </div>`)}

${section(`      <div class="panel">
        <h2 class="t-20 m-0">Built for agents as much as people</h2>
        <p class="muted t-15 my-3">Every page here has a JSON equivalent. The API serves the whole corpus and runs the engine, and it names the facts it is missing rather than assuming them.</p>
        <div class="actions">
          <a class="pill" href="/api">API reference</a>
          <a class="pill" href="${ORIGIN}/v1/openapi.json">OpenAPI</a>
          <a class="pill" href="${ORIGIN}/llms.txt">llms.txt</a>
        </div>
      </div>`)}`

  return {
    title: 'SEO as a formal, measurable language',
    description: `${corpus.manifest.purpose} ${inv.rules} decision rules, ${inv.publication_gates} hard publication gates, and an engine that runs them.`,
    path: '/',
    body,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: corpus.manifest.title,
      url: ORIGIN,
      description: corpus.manifest.purpose,
      publisher: { '@type': 'Organization', name: 'Bow Tie Kreative', url: 'https://bowtiekreative.com' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${ORIGIN}/search?q={search_term_string}` },
        'query-input': 'required name=search_term_string'
      }
    }
  }
}

// ---------------------------------------------------------------------------
// The model
// ---------------------------------------------------------------------------

export function grammarPage () {
  const g = corpus.grammar
  const body = `
${section(`      ${pageHead({
    eyebrow: 'The grammar',
    title: 'Sentence and equation',
    lede: 'The two structures every other page depends on: the sentence an SEO action must be expressible in, and the equation that decides what it is worth.'
  })}`)}

${section(`      <h2>The governing equation</h2>
      ${codeBlock((g.governing_equation ?? []).join('\n'))}
      <p class="muted t-15 mt-6 wide">${esc(g.equation_note ?? '')}</p>
      <h3 class="mt-8">The ten factors</h3>
      <div class="table-scroll">
        <table>
          <thead><tr><th scope="col">Factor</th><th scope="col">When it is the weakest link</th></tr></thead>
          <tbody>${EQUATION_FACTORS.map((f) => `<tr><td><strong class="ink">${esc(f.name)}</strong><br><code>${esc(f.id)}</code></td><td>${esc(f.remedy)}</td></tr>`).join('')}</tbody>
        </table>
      </div>
      <div class="actions"><a class="pill pill--solid" href="/equation">Score the equation</a></div>`)}

${section(`      <h2>The governing sentence</h2>
      ${codeBlock((g.governing_sentence ?? []).join('\n'))}
      ${(g.canonical_sentence ?? []).map((b) => codeBlock(b.code, 'Document 01 — expanded form')).join('')}
      ${(g.compact_notation ?? []).map((b) => codeBlock(b.code, 'Compact notation')).join('')}`)}

${g.layers ? section(`      <h2>The seven layers</h2>
      ${table(g.layers)}`) : ''}

${(g.output_hierarchy ?? []).length ? section(`      <h2>The output hierarchy</h2>
      <p class="muted t-15">Everything the system produces hangs off one chain, from the business down to the feedback that updates it.</p>
      ${codeBlock(g.output_hierarchy.join('\n'))}`) : ''}

${section(`      <h2>The one-page rule</h2>
      ${codeBlock((g.one_page_rule ?? []).join('\n'))}
      <div class="actions"><a class="pill" href="/cluster">Run the cluster decision</a></div>`)}

${(g.validity ?? []).length ? section(`      <h2>Validity</h2>
      ${g.validity.map((b) => codeBlock(b.code)).join('')}`) : ''}`

  return {
    title: 'Sentence and equation',
    description: 'The governing SEO sentence and the ten-factor governing equation — the two structures the whole grammar rests on.',
    path: '/grammar',
    body
  }
}

export function lakaPage () {
  const m = corpus.lakaModel
  const body = `
${section(`      ${pageHead({
    eyebrow: 'The change model',
    title: 'Five levels, ten variables, fourteen descriptors',
    lede: 'Every improvement is proposed at all five levels, cheapest and most reversible first, so the choice between a title test and a new information product is made deliberately rather than by whichever idea arrived first.'
  })}`)}

${section(`      <h2>The five change levels</h2>
      <div class="stack">
        ${(m.levels ?? []).map((l) => `
        <article class="finding" id="${attr(l.id)}">
          <div class="finding__head">
            ${levelBadge(l.name)}
            <strong class="ink t-18">${esc(l.name)}</strong>
            <span class="muted t-14">${l.rule_count} rules operate here</span>
          </div>
          <p class="m-0">${esc(l.definition)}</p>
          ${l.examples?.length ? `<ul class="finding__units">${l.examples.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}
          <p class="muted t-14 mt-4 m-0"><a href="/rules?level=${attr(l.name)}">Browse the ${l.rule_count} rules at this level →</a></p>
        </article>`).join('')}
      </div>
      ${m.escalation_rule ? `<div class="mt-8">${codeBlock(m.escalation_rule, 'The escalation rule')}</div>` : ''}
      <div class="actions"><a class="pill pill--solid" href="/change-matrix">Generate a change matrix</a></div>`)}

${section(`      <h2>The ten internal variables</h2>
      <p class="muted t-15">A change is not fully described until all ten are named.</p>
      ${chips(m.internal_variables ?? [], { mark: '·' })}
      ${(m.internal_variable_sentence ?? []).map((b) => codeBlock(b.code)).join('')}`)}

${section(`      <h2>The fourteen change variables</h2>
      <p class="muted t-15">How a change behaves over time, not just what it is.</p>
      ${chips(m.change_variables ?? [], { mark: '·' })}
      ${m.change_descriptor_table ? table(m.change_descriptor_table) : (m.change_descriptor ?? []).map((b) => codeBlock(b.code)).join('')}`)}`

  return {
    title: 'The LAKA change model',
    description: `The five change levels, ten internal variables and fourteen change descriptors that classify every SEO change.`,
    path: '/laka',
    body
  }
}

export function operatorsPage () {
  const o = corpus.operators
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Logic',
    title: 'Operators and precedence',
    lede: 'Rules conflict. The value of a formal system is that they conflict the same way twice — and that the resolution is written down.'
  })}`)}

${section(`      <h2>Precedence</h2>
      <p class="muted t-15">${esc(o.precedence_note ?? '')}</p>
      <ol class="steps mt-6">
        ${(o.precedence ?? []).map((p) => `<li><div><p class="m-0 ink">${esc(p.replace(/_/g, ' '))}</p></div></li>`).join('')}
      </ol>`)}

${section(`      <h2>The operators</h2>
      <div class="stack">
        ${(o.operators ?? []).map((op) => `
        <article class="finding">
          <div class="finding__head"><strong class="ink t-18">${esc(op.name)}</strong></div>
          ${op.definition ? `<p class="m-0">${inlineMarkdown(op.definition)}</p>` : ''}
          ${op.example ? `<div class="mt-4">${codeBlock(op.example)}</div>` : ''}
        </article>`).join('')}
      </div>`)}

${section(`      <h2>How often each operator is used</h2>
      <div class="table-scroll">
        <table>
          <thead><tr><th scope="col">Operator</th><th scope="col">Rules</th><th scope="col"></th></tr></thead>
          <tbody>${(o.operator_usage ?? []).map((u) => `<tr>
            <td><code>${esc(u.operator)}</code></td>
            <td>${u.count}</td>
            <td><a href="/rules?operator=${attr(u.operator)}">Browse →</a></td>
          </tr>`).join('')}</tbody>
        </table>
      </div>`)}

${o.hard_gate_pattern ? section(`      <h2>The hard-gate pattern</h2>
      ${codeBlock(o.hard_gate_pattern)}
      <div class="actions"><a class="pill" href="/gates">The eight hard gates</a></div>`) : ''}`

  return {
    title: 'Operators and precedence',
    description: 'The Boolean operators the rules are written in, and the precedence order that resolves conflicts between them.',
    path: '/operators',
    body
  }
}

export function objectsPage () {
  const o = corpus.objectClasses
  const body = `
${section(`      ${pageHead({
    eyebrow: 'The grammar',
    title: 'Primitive object classes',
    lede: 'The nouns the language is allowed to use. Typed objects and typed relations, rather than a flat bag of keywords.'
  })}`)}

${section((o.classes ?? []).map((c) => `      <h2 id="${attr(c.id)}">${esc(c.name)}</h2>
      ${c.members[0]?.meaning
        ? `<div class="table-scroll"><table>
            <thead><tr>${c.columns.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
            <tbody>${c.members.map((m) => `<tr>
              <td><code>${esc(m.primitive)}</code></td>
              ${c.columns.slice(1).map((h) => `<td>${inlineMarkdown(m[h.toLowerCase().replace(/[^a-z0-9]+/g, '_')] ?? '')}</td>`).join('')}
            </tr>`).join('')}</tbody>
          </table></div>`
        : `<ol class="steps">${c.members.map((m) => `<li><div><p class="m-0 ink"><code>${esc(m.primitive)}</code></p></div></li>`).join('')}</ol>`}
`).join('\n'))}

${section(`      <h2 id="relations">Relation vocabulary</h2>
      <p class="muted t-15">Use typed relations rather than a flat bag of keywords.</p>
      ${(o.relations?.blocks ?? []).map((b) => codeBlock(b.code)).join('')}
      ${o.relations?.table ? table(o.relations.table) : ''}`)}`

  return {
    title: 'Primitive object classes',
    description: 'The six object classes and the typed relation vocabulary the SEO grammar is built from.',
    path: '/objects',
    body
  }
}

export function formatsPage () {
  const f = corpus.formats
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Assets',
    title: 'The task selects the format',
    lede: 'Not the format you prefer, and not the format that ranks elsewhere. What the searcher must actually complete determines what the asset has to be.'
  })}`)}

${section(`      <div class="table-scroll">
        <table>
          <thead><tr><th scope="col">Task</th><th scope="col">Task-native format</th></tr></thead>
          <tbody>${(f.task_formats ?? []).map((t) => `<tr><td><strong class="ink">${esc(t.task)}</strong></td><td>${esc(t.format)}</td></tr>`).join('')}</tbody>
        </table>
      </div>`)}

${(f.selection_grammar ?? []).length ? section(`      <h2>Format-selection grammar</h2>
      ${f.selection_grammar.map((b) => codeBlock(b.code)).join('')}`) : ''}

${(f.information_product_selector ?? []).length ? section(`      <h2>Information-product selector</h2>
      ${f.information_product_selector.map((b) => codeBlock(b.code)).join('')}`) : ''}`

  return {
    title: 'Task-native formats',
    description: 'The twelve task types and the format each one requires. The task selects the format; appearance does not.',
    path: '/formats',
    body
  }
}

// ---------------------------------------------------------------------------
// Gates
// ---------------------------------------------------------------------------

export function gatesPage () {
  const g = corpus.gates
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Publication',
    title: 'The eight hard gates',
    lede: 'A candidate proceeds only if it passes every one. Fail a single gate and it routes to research, consolidation, repair, deferral or rejection — never to publication.'
  })}
      ${codeBlock((g.approve_expression ?? []).join('\n'))}`)}

${section((corpus.hardGates ?? []).map((gate) => `      <article class="finding" id="${attr(gate.id)}">
        <div class="finding__head">
          ${chip(`Gate ${gate.order}`, { mark: '#' })}
          <strong class="ink t-18">${esc(gate.name)}</strong>
          <code class="muted t-14">${esc(gate.field)}</code>
        </div>
        ${gate.conditions.length
          ? `<p class="muted t-14 m-0">Passes if ${gate.joiner === 'AND' ? 'every one of these holds' : 'any one of these holds'}${gate.qualifier === 'at_least_one' ? ' (at least one)' : ''}:</p>
             <ul class="finding__units">${gate.conditions.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>`
          : `<p class="muted t-14 m-0">This gate has no "pass if" list of its own. It is specified by ${gate.defined_by.map((d) => esc(d)).join(', ')}.</p>`}
        <p class="muted t-14 mt-4 m-0">Governed by ${(corpus.rulesByGate.get(gate.field) ?? []).length} rules · <a href="/rules?area=${attr(areaSlugForGate(gate.field))}">browse them →</a></p>
      </article>`).join('\n'))}

${section(`      <h2>The cluster gates</h2>
      <p class="lede narrow">${esc(g.cluster_gate_note ?? '')}</p>
      <div class="grid grid--3 mt-6">
        ${(g.cluster_gates ?? []).map((c) => `
        <div class="card">
          <strong class="ink t-18">${esc(c.id.toUpperCase())}</strong>
          <ul class="finding__units">${c.conditions.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>`).join('')}
      </div>
      <div class="actions"><a class="pill pill--solid" href="/cluster">Run the cluster decision</a></div>`)}

${section(`      <h2>Priority order</h2>
      <p class="muted t-15">When several things could be worked on, this is the order.</p>
      <ol class="steps mt-6">
        ${(g.priority_order ?? []).map((p) => `<li><div><p class="m-0 ink">${esc(p)}</p></div></li>`).join('')}
      </ol>
      <div class="actions"><a class="pill pill--solid" href="/evaluate">Evaluate a candidate</a></div>`)}`

  return {
    title: 'The eight hard publication gates',
    description: 'Demand, distinctness, business value, information advantage, technical feasibility, maintainability, measurability and compliance. All eight must pass.',
    path: '/gates',
    body
  }
}

/** The area whose rules most directly govern a gate, for the "browse them" link. */
function areaSlugForGate (field) {
  const ids = corpus.rulesByGate.get(field) ?? []
  const first = corpus.rulesById.get(ids[0])
  return first?.area_slug ?? ''
}

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

export function rulesIndex ({ rules, query, limit, offset }) {
  const params = new URLSearchParams(Object.entries(query).filter(([, v]) => v))
  params.delete('offset')
  const base = `/rules${params.toString() ? `?${params}` : ''}`

  const options = (name, values, selected, labelFn = (v) => v) => `
    <div class="field">
      <label for="f-${name}">${esc(name.charAt(0).toUpperCase() + name.slice(1))}</label>
      <select id="f-${name}" name="${name}">
        <option value="">Any</option>
        ${values.map((v) => {
          const value = typeof v === 'object' ? (v.slug ?? v.value) : v
          const label = typeof v === 'object' ? `${labelFn(v)} (${v.count})` : v
          return `<option value="${attr(value)}"${String(selected) === String(value) ? ' selected' : ''}>${esc(label)}</option>`
        }).join('')}
      </select>
    </div>`

  const body = `
${section(`      ${pageHead({
    eyebrow: 'Decisions',
    title: `${inv.rules} rules`,
    lede: `Twelve areas, twelve rules each. Every rule is an IF / THEN / ELSE with a primary metric, a guardrail and the LAKA levels it operates at.`
  })}`)}

${section(`      <form class="panel" method="get" action="/rules">
        <div class="filters">
          <div class="field">
            <label for="f-q">Search</label>
            <input type="search" id="f-q" name="q" value="${attr(query.q)}" placeholder="cannibalization, canonical, margin…">
          </div>
          ${options('area', corpus.areaFacets, query.area, (v) => v.value)}
          ${options('level', corpus.levelFacets, query.level, (v) => v.value)}
          ${options('operator', corpus.operatorFacets, query.operator, (v) => v.value)}
          <div class="field">
            <label for="f-submit" class="visually-hidden">Apply</label>
            <button class="pill pill--solid" id="f-submit" type="submit">Filter</button>
          </div>
        </div>
      </form>

      <p class="muted t-15 mt-6">${rules.length} of ${inv.rules} rules${anyFilter(query) ? ` · <a href="/rules">clear filters</a>` : ''}</p>

      ${rules.length
        ? `<ul class="rules mt-4">${rules.slice(offset, offset + limit).map(ruleRow).join('')}</ul>
           ${pager({ total: rules.length, limit, offset, base })}`
        : `<div class="panel mt-4"><p class="m-0">No rule matches that filter. <a href="/rules">Clear the filters</a> or <a href="/search?q=${attr(query.q)}">search the whole corpus</a>.</p></div>`}`)}`

  return {
    title: anyFilter(query) ? `Rules — ${rules.length} matching` : `${inv.rules} SEO decision rules`,
    description: `Browse and filter ${inv.rules} IF / THEN / ELSE SEO decision rules across ${inv.areas} areas and five LAKA change levels.`,
    path: '/rules',
    body
  }
}

const anyFilter = (q) => Boolean(q.q || q.area || q.level || q.operator)

export function ruleDetail (rule) {
  const area = corpus.areaBySlug.get(rule.area_slug)
  const neighbours = corpus.rules.filter((r) => r.area === rule.area && r.id !== rule.id)
  const gates = [...corpus.rulesByGate.entries()].filter(([, ids]) => ids.includes(rule.id)).map(([f]) => f)

  const body = `
${section(`      <p class="meta-id">${esc(rule.id)} · <a href="/rules?area=${attr(rule.area_slug)}">${esc(rule.area)}</a></p>
      <h1>${esc(rule.title)}</h1>
      <ul class="chips mt-6">
        ${(rule.laka_levels ?? []).map((l) => `<li>${levelBadge(l)}</li>`).join('')}
        ${(rule.operators ?? []).map((o) => `<li>${chip(o, { mark: '·' })}</li>`).join('')}
      </ul>`)}

${section(`      <h2>The decision</h2>
      ${branchTree(rule)}`)}

${section(`      ${defList({
    'Primary metric': esc(rule.primary_metric),
    Guardrail: esc(rule.guardrails),
    Reason: esc(rule.rationale),
    'LAKA levels': chips(rule.laka_levels),
    Operators: chips(rule.operators),
    'Governs gates': gates.length ? chips(gates.map((g) => g.replace(/_/g, ' '))) : '<span class="muted">none directly</span>',
    Source: `${esc(rule.source?.file ?? '')}${rule.source?.heading ? ` — ${esc(rule.source.heading)}` : ''}`
  })}`)}

${section(`      <h2>The other eleven rules in ${esc(rule.area)}</h2>
      <ul class="rules">${neighbours.map(ruleRow).join('')}</ul>`)}

${section(`      <div class="panel">
        <p class="muted t-14 m-0">This rule as JSON: <a href="/v1/rules/${attr(rule.id)}"><code>GET /v1/rules/${esc(rule.id)}</code></a></p>
      </div>`)}`

  return {
    title: `${rule.id} — ${rule.title}`,
    description: `IF ${rule.if} THEN ${rule.then}`,
    path: `/rules/${rule.id}`,
    body,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'HowToSection',
      name: `${rule.id} — ${rule.title}`,
      description: `IF ${rule.if} THEN ${rule.then} ELSE ${rule.else}`,
      url: `${ORIGIN}/rules/${rule.id}`,
      isPartOf: { '@type': 'WebSite', name: corpus.manifest.title, url: ORIGIN }
    }
  }
}

export function areasPage () {
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Decisions',
    title: 'The twelve areas',
    lede: 'Each area holds exactly twelve rules, and each maps onto a band of the precedence order.'
  })}`)}

${section(`      <div class="grid grid--2">
        ${corpus.areas.map((a) => `
        <a class="card feature plain" href="/rules?area=${attr(a.slug)}">
          <span class="feature__icon">${icon('rules')}</span>
          <span>
            <strong class="ink t-18" style="display:block">${esc(a.name)}</strong>
            <span class="muted t-14 my-2" style="display:block">${a.count} rules · prefix <code>${esc(a.prefix)}</code></span>
          </span>
        </a>`).join('')}
      </div>`)}`

  return {
    title: 'The twelve rule areas',
    description: 'Business value, audience, semantic demand, clustering, content, on-page, internal graph, authority, technical, conversion, measurement and governance.',
    path: '/areas',
    body
  }
}

// ---------------------------------------------------------------------------
// Engine: evaluate
// ---------------------------------------------------------------------------

const SAMPLE_CANDIDATE = corpus.examples.candidate

export function evaluatePage ({ submitted, result, form, error }) {
  const gateField = (field) => {
    const gate = corpus.gatesById.get(field.replace(/_/g, '-'))
    const value = form[field] ?? ''
    return `
      <div class="field">
        <label for="g-${field}">${esc(gate?.name ?? field)}</label>
        <select id="g-${field}" name="${field}">
          <option value=""${value === '' ? ' selected' : ''}>— not stated —</option>
          <option value="true"${value === 'true' ? ' selected' : ''}>Passes</option>
          <option value="false"${value === 'false' ? ' selected' : ''}>Fails</option>
        </select>
        <span class="hint">${gate?.conditions.length ? esc(gate.conditions.slice(0, 2).join(gate.joiner === 'AND' ? ' and ' : ' or ')) + '…' : esc((gate?.defined_by ?? []).join(', '))}</span>
      </div>`
  }

  const scoreField = (name, group) => `
      <div class="field">
        <label for="s-${name}">${esc(name.replace(/_/g, ' '))}</label>
        <input type="text" inputmode="decimal" id="s-${name}" name="${group}_${name}" value="${attr(form[`${group}_${name}`] ?? '')}" placeholder="0–5">
      </div>`

  const body = `
${section(`      ${pageHead({
    eyebrow: 'Engine',
    title: 'Evaluate a candidate',
    lede: 'Eight hard gates, then value against cost. Every gate must be stated explicitly — a gate you leave blank is an error, never an implied pass.'
  })}`)}

${error ? section(`      <div class="verdict verdict--blocked">
        <span class="verdict__mark" aria-hidden="true">✕</span>
        <span><strong class="ink">${esc(error)}</strong></span>
      </div>`) : ''}

${section(`      <form class="panel stack" method="post" action="/evaluate">
        <h2 class="t-20 m-0">Hard gates</h2>
        <p class="muted t-14 m-0">All eight must pass. Any failure routes the candidate away from publication.</p>
        <div class="filters">${HARD_GATES.map(gateField).join('')}</div>

        <h2 class="t-20 mt-8 m-0">Value factors <span class="t-count muted">0–5 each</span></h2>
        <div class="filters">${VALUE_FACTORS.map((f) => scoreField(f, 'scores')).join('')}</div>

        <h2 class="t-20 mt-8 m-0">Cost factors <span class="t-count muted">0–5 each</span></h2>
        <div class="filters">${COST_FACTORS.map((f) => scoreField(f, 'costs')).join('')}</div>

        <h2 class="t-20 mt-8 m-0">Confidence <span class="t-count muted">0–1 each</span></h2>
        <div class="filters">
          <div class="field">
            <label for="c-evidence">Evidence</label>
            <input type="text" inputmode="decimal" id="c-evidence" name="confidence_evidence" value="${attr(form.confidence_evidence ?? '')}" placeholder="1.0">
          </div>
          <div class="field">
            <label for="c-measurement">Measurement</label>
            <input type="text" inputmode="decimal" id="c-measurement" name="confidence_measurement" value="${attr(form.confidence_measurement ?? '')}" placeholder="1.0">
          </div>
        </div>

        <div class="actions">
          <button class="pill pill--solid" type="submit">Evaluate</button>
          <button class="pill" type="submit" name="sample" value="1">Use the worked example</button>
        </div>
      </form>`)}

${submitted && result ? evaluateResult(result) : ''}

${section(`      ${disclose('The same call as JSON', `
        ${codeBlock(`curl -X POST ${ORIGIN}/v1/evaluate \\\n  -H 'content-type: application/json' \\\n  -d '${JSON.stringify(SAMPLE_CANDIDATE)}'`)}
        <p class="muted t-14">Bands: ${BANDS.map((b) => `<code>${esc(b.decision)}</code> at ≥ ${b.min}`).join(', ')}. They are transparent heuristics, not search-engine scores.</p>`)}`)}`

  return {
    title: 'Evaluate a candidate',
    description: 'Run an SEO candidate through the eight hard publication gates and the value-against-cost priority score.',
    path: '/evaluate',
    body
  }
}

function evaluateResult (r) {
  return `
${section(`      <h2>Result</h2>
      ${verdict(r.hard_gate_pass,
        r.hard_gate_pass ? 'All eight hard gates pass' : `${r.failed_gates.length} of ${HARD_GATES.length} hard gates fail`,
        r.decision_meaning)}

      <div class="grid grid--4 mt-6">
        <div class="card stat"><span class="stat__value">${esc(r.decision.replace(/_/g, ' '))}</span><span class="stat__label">Decision</span></div>
        <div class="card stat"><span class="stat__value">${esc(r.adjusted_priority)}</span><span class="stat__label">Adjusted priority</span></div>
        <div class="card stat"><span class="stat__value">${esc(r.value_index)}</span><span class="stat__label">Value index</span></div>
        <div class="card stat"><span class="stat__value">${esc(r.cost_index)}</span><span class="stat__label">Cost index</span></div>
      </div>`)}

${r.routing?.length ? section(`      <h2>What to do instead</h2>
      <div class="stack">
        ${r.routing.map((route) => `
        <article class="finding">
          <div class="finding__head">
            ${chip('Failed', { mark: '✕', cls: 'badge--hard' })}
            <strong class="ink t-18">${esc(corpus.gatesById.get(route.gate.replace(/_/g, '-'))?.name ?? route.gate)}</strong>
          </div>
          <p class="m-0">${esc(route.action)}</p>
        </article>`).join('')}
      </div>`) : ''}

${section(`      <h2>Gate detail</h2>
      <div class="table-scroll">
        <table>
          <thead><tr><th scope="col">Gate</th><th scope="col">Result</th><th scope="col">Passes if</th><th scope="col">Rules</th></tr></thead>
          <tbody>${r.gate_detail.map((g) => `<tr>
            <td><strong class="ink">${esc(g.name)}</strong><br><code class="muted">${esc(g.field)}</code></td>
            <td>${g.passed ? '<span class="badge badge--heuristic" data-mark="✓">Pass</span>' : '<span class="badge badge--hard" data-mark="✕">Fail</span>'}</td>
            <td class="t-14">${g.conditions.length ? esc(g.conditions.join(g.joiner === 'AND' ? ' AND ' : ' OR ')) : esc(g.defined_by.join('; '))}</td>
            <td class="t-14">${g.governing_rules.length}</td>
          </tr>`).join('')}</tbody>
        </table>
      </div>`)}

${section(`      <h2>How to read this</h2>
      ${bullets(r.notes)}
      ${disclose('Full JSON response', jsonBlock(r))}`)}`
}

// ---------------------------------------------------------------------------
// Engine: volume
// ---------------------------------------------------------------------------

export function volumePage ({ submitted, result, form, error }) {
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Engine',
    title: 'Size a volumetric space',
    lede: `The theoretical volume is computed in closed form — the Cartesian product is never enumerated, and never returned as a publishing plan. Samples are capped at ${MAX_SAMPLE.toLocaleString('en-US')} rows.`
  })}`)}

${error ? section(`      <div class="verdict verdict--blocked">
        <span class="verdict__mark" aria-hidden="true">✕</span>
        <span><strong class="ink">${esc(error)}</strong></span>
      </div>`) : ''}

${section(`      <form class="panel stack" method="post" action="/volume">
        <div class="field">
          <label for="v-dimensions">Dimensions</label>
          <textarea id="v-dimensions" name="dimensions" rows="14" spellcheck="false">${esc(form.dimensions ?? JSON.stringify(corpus.examples.dimensions, null, 2))}</textarea>
          <span class="hint">A JSON object of dimension name to a non-empty array of values.</span>
        </div>
        <div class="filters">
          <div class="field">
            <label for="v-sample">Sample size</label>
            <input type="text" inputmode="numeric" id="v-sample" name="sample" value="${attr(form.sample ?? '10')}" placeholder="0">
            <span class="hint">0 to size only. Max ${MAX_SAMPLE.toLocaleString('en-US')}.</span>
          </div>
          <div class="field">
            <label for="v-seed">Seed</label>
            <input type="text" inputmode="numeric" id="v-seed" name="seed" value="${attr(form.seed ?? '42')}">
            <span class="hint">The same seed returns the same sample.</span>
          </div>
        </div>
        <div class="actions">
          <button class="pill pill--solid" type="submit">Size it</button>
          <button class="pill" type="submit" name="published" value="1">Use the ${inv.dimension_families} published families</button>
        </div>
      </form>`)}

${submitted && result ? `
${section(`      <h2>Result</h2>
      <div class="grid grid--3">
        <div class="card stat"><span class="stat__value">${esc(BigInt(result.theoretical_volume.exact).toLocaleString('en-US'))}</span><span class="stat__label">Theoretical combinations</span></div>
        <div class="card stat"><span class="stat__value">${result.dimension_count}</span><span class="stat__label">Dimensions</span></div>
        <div class="card stat"><span class="stat__value">${result.sample?.length ?? 0}</span><span class="stat__label">Sampled</span></div>
      </div>
      <div class="verdict mt-6">
        <span class="verdict__mark" aria-hidden="true">!</span>
        <span><strong class="ink">${esc(result.warning)}</strong></span>
      </div>`)}

${section(`      <h2>Dimensions</h2>
      <div class="table-scroll">
        <table>
          <thead><tr><th scope="col">Dimension</th><th scope="col">Values</th></tr></thead>
          <tbody>${Object.entries(result.dimensions).map(([k, v]) => `<tr><td><code>${esc(k)}</code></td><td>${v}</td></tr>`).join('')}</tbody>
        </table>
      </div>`)}

${result.sample?.length ? section(`      <h2>Sample</h2>
      <p class="muted t-15">${esc(result.sample_note)}</p>
      <div class="table-scroll">
        <table>
          <thead><tr>${Object.keys(result.sample[0]).map((k) => `<th scope="col">${esc(k)}</th>`).join('')}</tr></thead>
          <tbody>${result.sample.map((row) => `<tr>${Object.values(row).map((v) => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`) : ''}

${section(`      <h2>Before any of this is published</h2>
      <ol class="steps">${(result.governance ?? []).map((g) => `<li><div><p class="m-0 ink">${esc(g)}</p></div></li>`).join('')}</ol>
      ${disclose('Full JSON response', jsonBlock({ ...result, sample: result.sample ? `${result.sample.length} rows, omitted here` : undefined }))}`)}` : ''}`

  return {
    title: 'Size a volumetric space',
    description: 'Compute the theoretical opportunity volume without enumerating it, and draw a bounded, deterministic sample.',
    path: '/volume',
    body
  }
}

// ---------------------------------------------------------------------------
// Engine: cluster
// ---------------------------------------------------------------------------

export function clusterPage ({ submitted, result, form, error }) {
  const factField = (f) => {
    const value = form[f.id] ?? ''
    return `
      <div class="field">
        <label for="cf-${f.id}">${esc(f.id.replace(/_/g, ' '))}</label>
        <select id="cf-${f.id}" name="${f.id}">
          <option value=""${value === '' ? ' selected' : ''}>— unknown —</option>
          <option value="true"${value === 'true' ? ' selected' : ''}>Yes</option>
          <option value="false"${value === 'false' ? ' selected' : ''}>No</option>
        </select>
        <span class="hint">${esc(f.question ?? f.reason)}</span>
      </div>`
  }

  const body = `
${section(`      ${pageHead({
    eyebrow: 'Engine',
    title: 'One page or two',
    lede: 'The one-page rule as a decision. Leave a fact unknown and the answer is TEST — one provisional cluster and an observation. The engine will not multiply pages on a guess.'
  })}`)}

${error ? section(`      <div class="verdict verdict--blocked">
        <span class="verdict__mark" aria-hidden="true">✕</span>
        <span><strong class="ink">${esc(error)}</strong></span>
      </div>`) : ''}

${section(`      <form class="panel stack" method="post" action="/cluster">
        <div class="filters">
          <div class="field">
            <label for="c-a">First candidate</label>
            <input type="text" id="c-a" name="a" value="${attr(form.a ?? '')}" placeholder="web design cost calgary">
          </div>
          <div class="field">
            <label for="c-b">Second candidate</label>
            <input type="text" id="c-b" name="b" value="${attr(form.b ?? '')}" placeholder="how much does a website cost">
          </div>
        </div>

        <h2 class="t-20 mt-8 m-0">The five conditions</h2>
        <div class="filters">${CLUSTER_FACTS.map(factField).join('')}</div>

        <h2 class="t-20 mt-8 m-0">Hard splits</h2>
        <p class="muted t-14 m-0">Either of these forces a split on its own.</p>
        <div class="filters">${HARD_SPLITS.map(factField).join('')}</div>

        <div class="filters mt-6">
          <div class="field">
            <label for="c-value">Value of a separate page</label>
            <select id="c-value" name="separate_page_value">
              <option value="low"${(form.separate_page_value ?? 'low') === 'low' ? ' selected' : ''}>Low</option>
              <option value="medium"${form.separate_page_value === 'medium' ? ' selected' : ''}>Medium</option>
              <option value="high"${form.separate_page_value === 'high' ? ' selected' : ''}>High</option>
            </select>
          </div>
        </div>

        <div class="actions"><button class="pill pill--solid" type="submit">Decide</button></div>
      </form>`)}

${submitted && result ? `
${section(`      <h2>Decision</h2>
      ${verdict(result.decision === 'MERGE', result.decision, result.because.join(' '))}
      <h3 class="mt-8">What to do</h3>
      ${bullets(result.actions, { ordered: true })}
      ${result.unknown_facts.length ? `<p class="muted t-15 mt-6">${esc(result.note)}</p>` : ''}`)}

${section(`      <h2>The conditions as evaluated</h2>
      <div class="table-scroll">
        <table>
          <thead><tr><th scope="col">Condition</th><th scope="col">Value</th><th scope="col">Question</th></tr></thead>
          <tbody>${result.conditions.map((c) => `<tr>
            <td><code>${esc(c.id)}</code></td>
            <td>${c.value === true ? '<span class="badge badge--heuristic" data-mark="✓">Matches</span>' : c.value === false ? '<span class="badge badge--hard" data-mark="✕">Differs</span>' : '<span class="badge" data-mark="?">Unknown</span>'}</td>
            <td class="t-14">${esc(c.question)}</td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
      ${codeBlock((result.one_page_rule ?? []).join('\n'), 'The one-page rule')}
      ${disclose('Full JSON response', jsonBlock(result))}`)}` : ''}`

  return {
    title: 'One page or two',
    description: 'Apply the one-page rule: same sense, same task, compatible answer, result class and next action, or split.',
    path: '/cluster',
    body
  }
}

// ---------------------------------------------------------------------------
// Engine: equation
// ---------------------------------------------------------------------------

export function equationPage ({ submitted, result, form, error }) {
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Engine',
    title: 'Find the weakest link',
    lede: 'Score each of the ten factors as a proportion of what it could be. Because they multiply, the lowest one is the only one worth working on.'
  })}`)}

${error ? section(`      <div class="verdict verdict--blocked">
        <span class="verdict__mark" aria-hidden="true">✕</span>
        <span><strong class="ink">${esc(error)}</strong></span>
      </div>`) : ''}

${section(`      <form class="panel stack" method="post" action="/equation">
        <div class="filters">
          ${EQUATION_FACTORS.map((f) => `
          <div class="field">
            <label for="e-${f.id}">${esc(f.name)}</label>
            <input type="text" inputmode="decimal" id="e-${f.id}" name="${f.id}" value="${attr(form[f.id] ?? '')}" placeholder="0–1">
          </div>`).join('')}
        </div>
        <div class="actions"><button class="pill pill--solid" type="submit">Score</button></div>
      </form>`)}

${submitted && result ? `
${section(`      <h2>Result</h2>
      <div class="grid grid--3">
        <div class="card stat"><span class="stat__value">${esc(result.product_of_scored)}</span><span class="stat__label">Product of scored factors</span></div>
        <div class="card stat"><span class="stat__value">${result.scored_count}/${result.factor_count}</span><span class="stat__label">Factors supplied</span></div>
        <div class="card stat"><span class="stat__value">${esc(result.weakest_link?.value ?? '—')}</span><span class="stat__label">Weakest factor</span></div>
      </div>
      <p class="muted t-15 mt-6">${esc(result.interpretation)}</p>`)}

${result.weakest_link ? section(`      <h2>Work this first</h2>
      <div class="finding">
        <div class="finding__head">
          ${chip(String(result.weakest_link.value), { mark: '↓', cls: 'badge--hard' })}
          <strong class="ink t-18">${esc(result.weakest_link.name)}</strong>
        </div>
        <p class="m-0">${esc(result.weakest_link.remedy)}</p>
      </div>
      <p class="muted t-15 mt-6">${esc(result.note)}</p>`) : ''}

${section(`      <h2>All ten factors</h2>
      <div class="table-scroll">
        <table>
          <thead><tr><th scope="col">Factor</th><th scope="col">Score</th><th scope="col">If it is the weakest link</th></tr></thead>
          <tbody>${result.factors.map((f) => `<tr>
            <td><strong class="ink">${esc(f.name)}</strong></td>
            <td>${f.supplied ? esc(f.value) : '<span class="muted">unknown</span>'}</td>
            <td class="t-14">${esc(f.remedy ?? '')}</td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
      ${disclose('Full JSON response', jsonBlock(result))}`)}` : ''}`

  return {
    title: 'Score the governing equation',
    description: 'Score the ten factors of SEO business value and find the weakest link — the only one worth working on.',
    path: '/equation',
    body
  }
}

// ---------------------------------------------------------------------------
// Engine: change matrix
// ---------------------------------------------------------------------------

export function changeMatrixPage ({ submitted, result, form, error }) {
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Engine',
    title: 'Generate a change matrix',
    lede: 'Name an object and a goal, and get candidate changes at all five levels — so escalating from a title test to a new information product is a deliberate choice rather than a drift.'
  })}`)}

${error ? section(`      <div class="verdict verdict--blocked">
        <span class="verdict__mark" aria-hidden="true">✕</span>
        <span><strong class="ink">${esc(error)}</strong></span>
      </div>`) : ''}

${section(`      <form class="panel stack" method="post" action="/change-matrix">
        <div class="filters">
          <div class="field">
            <label for="m-object">Object</label>
            <input type="text" id="m-object" name="object" value="${attr(form.object ?? '')}" placeholder="/services/web-design" required>
          </div>
          <div class="field">
            <label for="m-goal">Goal</label>
            <input type="text" id="m-goal" name="goal" value="${attr(form.goal ?? '')}" placeholder="qualified organic conversions">
          </div>
        </div>
        <div class="actions"><button class="pill pill--solid" type="submit">Generate</button></div>
      </form>`)}

${submitted && result ? `
${section(`      <h2>Candidate changes for <code>${esc(result.object)}</code></h2>
      <p class="muted t-15">${esc(result.order)}</p>
      <div class="stack mt-6">
        ${result.levels.map((l) => `
        <article class="finding">
          <div class="finding__head">
            ${levelBadge(l.level)}
            <strong class="ink t-18">${esc(l.level)}</strong>
            <span class="muted t-14">${l.rule_count} rules</span>
          </div>
          <p class="m-0">${esc(l.definition)}</p>
          <ul class="finding__units">${l.candidate_changes.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
          <p class="muted t-14 mt-4 m-0"><strong class="ink">Reversibility.</strong> ${esc(l.reversibility ?? '')}</p>
        </article>`).join('')}
      </div>`)}

${section(`      ${result.escalation_rule ? codeBlock(result.escalation_rule, 'The escalation rule') : ''}
      <p class="muted t-15 mt-6">${esc(result.note)}</p>
      <div class="actions"><a class="pill pill--solid" href="/experiment">Turn one into an experiment</a></div>
      ${disclose('Full JSON response', jsonBlock(result))}`)}` : ''}`

  return {
    title: 'Generate a change matrix',
    description: 'Propose candidate SEO changes at all five LAKA levels, cheapest and most reversible first.',
    path: '/change-matrix',
    body
  }
}

// ---------------------------------------------------------------------------
// Engine: experiment
// ---------------------------------------------------------------------------

export function experimentPage ({ submitted, result, form, error }) {
  const field = (name, label, placeholder, { type = 'text' } = {}) => `
      <div class="field">
        <label for="x-${name}">${esc(label)}</label>
        <input type="${type}" id="x-${name}" name="${name}" value="${attr(form[name] ?? '')}" placeholder="${attr(placeholder)}">
      </div>`

  const body = `
${section(`      ${pageHead({
    eyebrow: 'Engine',
    title: 'Build an experiment card',
    lede: 'A change with no baseline, no minimum exposure and no decision rule is not measurable. This builds the hypothesis sentence and tells you exactly what is still missing.'
  })}`)}

${error ? section(`      <div class="verdict verdict--blocked">
        <span class="verdict__mark" aria-hidden="true">✕</span>
        <span><strong class="ink">${esc(error)}</strong></span>
      </div>`) : ''}

${section(`      <form class="panel stack" method="post" action="/experiment">
        <h2 class="t-20 m-0">The hypothesis</h2>
        <div class="filters">
          ${field('object', 'Object', '/services/web-design')}
          ${field('intervention', 'Intervention', 'a title and snippet rewrite naming the price range')}
          ${field('conditions', 'Under conditions', 'non-brand queries in positions 4–10')}
          ${field('primary_metric', 'Primary metric', 'value-weighted non-brand clicks')}
          <div class="field">
            <label for="x-direction">Direction</label>
            <select id="x-direction" name="direction">
              ${['increases', 'decreases', 'holds'].map((d) => `<option value="${d}"${(form.direction ?? 'increases') === d ? ' selected' : ''}>${d}</option>`).join('')}
            </select>
          </div>
          ${field('mechanism', 'Because (mechanism)', 'the snippet answers the cost question the query implies')}
          <div class="field">
            <label for="x-level">LAKA level</label>
            <select id="x-level" name="laka_level">
              <option value="">— not stated —</option>
              ${corpus.lakaLevels.map((l) => `<option value="${attr(l.name)}"${form.laka_level === l.name ? ' selected' : ''}>${esc(l.name)}</option>`).join('')}
            </select>
          </div>
        </div>

        <h2 class="t-20 mt-8 m-0">Making it decidable</h2>
        <div class="filters">
          ${field('guardrails', 'Guardrails', 'qualified conversion rate, average position')}
          ${field('baseline', 'Baseline', '28 days pre-change')}
          ${field('minimum_exposure', 'Minimum exposure', '28 days and 1,000 impressions')}
          ${field('decision_rule', 'Decision rule', 'continue if clicks rise and conversion rate holds')}
          ${field('rollback', 'Rollback', 'restore the previous title from the change record')}
          ${field('change_id', 'Change ID', 'CHG-014')}
        </div>

        <div class="actions"><button class="pill pill--solid" type="submit">Build the card</button></div>
      </form>`)}

${submitted && result ? `
${section(`      <h2>The card</h2>
      ${verdict(result.ready,
        result.ready ? 'The hypothesis is complete' : `Missing: ${result.missing_fields.join(', ')}`,
        result.ready ? null : 'A hypothesis needs an object, an intervention, a primary metric and a mechanism.')}
      ${result.hypothesis ? `<div class="mt-6">${codeBlock(result.hypothesis, 'Hypothesis')}</div>` : ''}`)}

${result.unresolved.length ? section(`      <h2>Still unresolved</h2>
      <p class="muted t-15">${esc(result.note)}</p>
      ${bullets(result.unresolved)}`) : ''}

${section(`      <h2>The card as recorded</h2>
      ${defList(Object.fromEntries(Object.entries(result.card)
        .filter(([, v]) => v != null && v !== '' && !(Array.isArray(v) && !v.length))
        .map(([k, v]) => [k.replace(/_/g, ' '), esc(Array.isArray(v) ? v.join(', ') : v)])))}
      ${result.reversibility ? `<p class="muted t-15 mt-6"><strong class="ink">Reversibility.</strong> ${esc(result.reversibility)}</p>` : ''}
      <h3 class="mt-8">Available decisions at review</h3>
      ${chips(result.available_decisions)}
      ${disclose('Full JSON response', jsonBlock(result))}`)}` : ''}`

  return {
    title: 'Build an experiment card',
    description: 'Turn a proposed SEO change into a decidable experiment: hypothesis, primary metric, guardrails, baseline and decision rule.',
    path: '/experiment',
    body
  }
}

// ---------------------------------------------------------------------------
// Engine: validate
// ---------------------------------------------------------------------------

export function validatePage ({ submitted, result, form, error }) {
  const body = `
${section(`      ${pageHead({
    eyebrow: 'Engine',
    title: 'Validate a project',
    lede: 'Checks a project document against the published JSON Schema, then reports the completeness advisories the grammar cares about. A document can be schema-valid and still fail the measurement gate.'
  })}`)}

${error ? section(`      <div class="verdict verdict--blocked">
        <span class="verdict__mark" aria-hidden="true">✕</span>
        <span><strong class="ink">${esc(error)}</strong></span>
      </div>`) : ''}

${section(`      <form class="panel stack" method="post" action="/validate">
        <div class="field">
          <label for="p-document">Project document</label>
          <textarea id="p-document" name="document" rows="18" spellcheck="false">${esc(form.document ?? '')}</textarea>
          <span class="hint">JSON conforming to <a href="/v1/schema">the project schema</a>.</span>
        </div>
        <div class="actions">
          <button class="pill pill--solid" type="submit">Validate</button>
          <button class="pill" type="submit" name="sample" value="1">Use the worked example</button>
        </div>
      </form>`)}

${submitted && result ? `
${section(`      <h2>Result</h2>
      ${verdict(result.valid,
        result.valid ? 'Schema-valid' : `${result.error_count} schema ${result.error_count === 1 ? 'error' : 'errors'}`,
        result.valid ? 'The document conforms to the LAKA SEO project schema.' : null)}
      <div class="grid grid--4 mt-6">
        ${Object.entries(result.counts).map(([k, v]) => `<div class="card stat"><span class="stat__value">${v}</span><span class="stat__label">${esc(k.replace(/_/g, ' '))}</span></div>`).join('')}
      </div>`)}

${result.errors.length ? section(`      <h2>Schema errors</h2>
      <div class="table-scroll">
        <table>
          <thead><tr><th scope="col">Path</th><th scope="col">Problem</th></tr></thead>
          <tbody>${result.errors.map((e) => `<tr><td><code>${esc(e.path)}</code></td><td>${esc(e.message)}</td></tr>`).join('')}</tbody>
        </table>
      </div>`) : ''}

${result.advisories.length ? section(`      <h2>Completeness advisories</h2>
      <p class="muted t-15">${esc(result.advisory_note)}</p>
      <div class="stack mt-6">
        ${result.advisories.map((a) => `
        <div class="finding">
          <div class="finding__head">
            ${chip(a.level, { mark: a.level === 'blocking' ? '✕' : '!', cls: a.level === 'blocking' ? 'badge--hard' : 'badge--default' })}
          </div>
          <p class="m-0">${esc(a.message)}</p>
        </div>`).join('')}
      </div>`) : ''}

${section(disclose('Full JSON response', jsonBlock(result)))}` : ''}`

  return {
    title: 'Validate a project',
    description: 'Validate a LAKA SEO project document against the published JSON Schema and the grammar completeness gates.',
    path: '/validate',
    body
  }
}
