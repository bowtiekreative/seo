/**
 * The corpus: everything the server knows, loaded once at boot.
 *
 * `data/laka-seo-grammar-system` is generated from the authored source package by
 * `scripts/build-corpus.mjs`. This module reads those files, builds the indexes the API and
 * the site need, and freezes the result. Nothing writes to it at runtime — the corpus is a
 * static, versioned body of rules.
 */

import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
export const DATA_DIR = join(here, '..', 'data', 'laka-seo-grammar-system')
export const SOURCE_DIR = join(DATA_DIR, 'source')

export function slugify (s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/** Flatten any JSON value into a searchable string of its leaf values. */
export function flat (value, out = []) {
  if (value == null) return out.join(' ')
  if (Array.isArray(value)) { for (const v of value) flat(v, out); return out.join(' ') }
  if (typeof value === 'object') { for (const v of Object.values(value)) flat(v, out); return out.join(' ') }
  out.push(String(value))
  return out.join(' ')
}

/** "08-rules.json" -> { num: "08", slug: "rules" } */
function parseName (filename) {
  const base = filename.replace(/\.json$/, '')
  const m = base.match(/^(\d{2})-(.+)$/)
  return m ? { num: m[1], slug: m[2], base } : { num: null, slug: base, base }
}

function load () {
  const filenames = readdirSync(DATA_DIR).filter((f) => f.endsWith('.json')).sort()
  const byNum = new Map()
  const bySlug = new Map()
  const raw = new Map()

  for (const filename of filenames) {
    const { num, slug, base } = parseName(filename)
    const json = JSON.parse(readFileSync(join(DATA_DIR, filename), 'utf8'))
    const entry = { num, slug, base, filename, title: json.title ?? base, json }
    raw.set(base, entry)
    if (num) byNum.set(num, entry)
    bySlug.set(slug, entry)
  }

  const file = (num) => byNum.get(num)?.json ?? {}

  const manifest = file('00')
  const grammar = file('01')
  const lakaModel = file('02')
  const operators = file('03')
  const objectClasses = file('04')
  const dimensions = file('05')
  const gates = file('06')
  const formats = file('07')
  const rulesFile = file('08')
  const measurement = file('09')
  const experiments = file('10')
  const sopsFile = file('11')
  const templatesFile = file('12')
  const backlog = file('13')
  const commandsFile = file('14')
  const crosswalk = file('15')
  const agentPrompt = file('16')
  const glossaryFile = file('17')
  const documentsFile = file('18')
  const projectSchema = file('19')
  const examples = file('20')

  // ---- rules ---------------------------------------------------------------
  const rules = rulesFile.rules ?? []
  const rulesById = new Map(rules.map((r) => [r.id, r]))
  const areas = rulesFile.areas ?? []
  const areaBySlug = new Map(areas.map((a) => [a.slug, a]))

  /** Facet counts over the rule set. `pick` returns one value or an array of values. */
  const facet = (pick) => {
    const counts = new Map()
    for (const r of rules) {
      for (const v of [pick(r)].flat().filter((x) => x != null)) counts.set(v, (counts.get(v) ?? 0) + 1)
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))
      .map(([value, count]) => ({ value, count }))
  }

  const areaFacets = areas.map((a) => ({ value: a.name, slug: a.slug, prefix: a.prefix, count: a.count }))
  const levelFacets = facet((r) => r.laka_levels)
  const operatorFacets = facet((r) => r.operators)
  const metricFacets = facet((r) => r.primary_metric)

  // ---- collections ---------------------------------------------------------
  const sops = sopsFile.sops ?? []
  const templates = templatesFile.templates ?? []
  const templateFiles = templatesFile.files ?? []
  const phases = backlog.phases ?? []
  const commands = commandsFile.commands ?? []
  const glossary = glossaryFile.terms ?? []
  const documents = documentsFile.documents ?? []
  const formulas = measurement.formulas ?? []
  const dimensionFamilies = dimensions.families ?? []
  const hardGates = gates.gates ?? []
  const clusterGates = gates.cluster_gates ?? []
  const lakaLevels = lakaModel.levels ?? []
  const taskFormats = formats.task_formats ?? []

  const byId = (rows, key = 'id') => new Map(rows.map((r) => [String(r[key]), r]))
  const sopsById = byId(sops)
  const templatesById = byId(templates)
  const phasesById = byId(phases)
  const commandsById = byId(commands)
  const gatesById = byId(hardGates)
  const documentsByNumber = new Map(documents.map((d) => [d.number, d]))
  const documentsBySlug = new Map(documents.map((d) => [d.slug, d]))
  const glossaryBySlug = new Map(glossary.map((t) => [t.slug, t]))
  const levelsById = byId(lakaLevels)
  const formulasById = byId(formulas)
  const dimensionsById = byId(dimensionFamilies)

  // ---- verbatim source files ----------------------------------------------
  const sourceFiles = readdirSync(SOURCE_DIR).sort().map((filename) => ({
    filename,
    slug: slugify(filename.replace(/\.[^.]+$/, '')),
    ext: filename.split('.').pop(),
    bytes: readFileSync(join(SOURCE_DIR, filename)).byteLength
  }))
  const sourceBySlug = new Map(sourceFiles.map((f) => [f.slug, f]))

  // ---- cross-references ----------------------------------------------------
  // Which rules govern each hard gate, by the area that owns the gate's subject matter.
  const GATE_AREAS = {
    demand: ['Semantic Demand', 'Business Value'],
    distinct_task: ['Clustering and Canonical Ownership', 'Audience and Journey'],
    business_value: ['Business Value', 'Conversion and Experience'],
    information_advantage: ['Content, Format, and Evidence', 'External Authority and Earned Evidence'],
    technical_feasibility: ['Technical Eligibility'],
    maintainability: ['Generative Search, Scale, and Governance'],
    measurement: ['Measurement and Experimentation'],
    compliance: ['Generative Search, Scale, and Governance']
  }
  const rulesByGate = new Map(
    Object.entries(GATE_AREAS).map(([field, areaNames]) => [
      field,
      rules.filter((r) => areaNames.includes(r.area)).map((r) => r.id)
    ])
  )

  const rulesByLevel = new Map(
    lakaLevels.map((l) => [l.name, rules.filter((r) => (r.laka_levels ?? []).includes(l.name)).map((r) => r.id)])
  )

  // ---- search index --------------------------------------------------------
  const searchIndex = []
  const push = (type, id, title, body, href) =>
    searchIndex.push({ type, id: String(id), title: String(title), href, hay: `${id} ${title} ${body}`.toLowerCase() })

  for (const r of rules) {
    push('rule', r.id, r.title, flat([r.if, r.then, r.else, r.area, r.primary_metric, r.guardrails, r.rationale, r.laka_levels, r.operators]), `/rules/${r.id}`)
  }
  for (const g of hardGates) push('gate', g.id, g.name, flat([g.conditions, g.defined_by, g.term]), `/gates#${g.id}`)
  for (const d of dimensionFamilies) push('dimension', d.id, `${d.name} dimensions`, flat(d.values), `/volume#${d.id}`)
  for (const s of sops) push('sop', s.id, s.name, flat([s.goal, s.sections]), `/sops/${s.id}`)
  for (const t of templates) push('template', t.id, t.name, flat([t.body, t.prose]), `/templates/${t.id}`)
  for (const t of templateFiles) push('template', t.id, t.name, t.body, `/templates/${t.id}`)
  for (const p of phases) push('phase', p.id, `Phase ${p.number} — ${p.name}`, flat([p.tasks, p.output, p.exit_gate]), `/backlog#${p.id}`)
  for (const c of commands) push('command', c.id, c.name, flat([c.purpose, c.block]), `/commands#${slugify(c.id)}`)
  for (const f of formulas) push('formula', f.id, f.name, flat([f.expression, f.notes]), `/measurement#${f.id}`)
  for (const t of glossary) push('term', t.term, t.term, t.definition, `/glossary#${t.slug}`)
  for (const l of lakaLevels) push('level', l.id, `${l.name} change`, flat([l.definition, l.examples]), `/laka#${l.id}`)
  for (const d of documents) {
    push('document', d.number, d.title, d.outline.map((o) => o.heading).join(' '), `/docs/${d.slug}`)
    for (const s of d.sections.filter((x) => x.depth <= 3)) {
      push('section', `${d.number}#${s.anchor}`, s.heading, flat([s.prose, s.bullets]), `/docs/${d.slug}#${s.anchor}`)
    }
  }

  return Object.freeze({
    files: [...raw.values()],
    byNum, bySlug, raw,
    manifest, grammar, lakaModel, operators, objectClasses, dimensions, gates, formats,
    measurement, experiments, backlog, crosswalk, agentPrompt, projectSchema, examples,
    rules, rulesById, areas, areaBySlug,
    hardGates, gatesById, clusterGates,
    lakaLevels, levelsById,
    dimensionFamilies, dimensionsById,
    taskFormats,
    sops, sopsById,
    templates, templatesById, templateFiles,
    phases, phasesById,
    commands, commandsById,
    formulas, formulasById,
    glossary, glossaryBySlug,
    documents, documentsByNumber, documentsBySlug,
    sourceFiles, sourceBySlug,
    areaFacets, levelFacets, operatorFacets, metricFacets,
    rulesByGate, rulesByLevel,
    searchIndex
  })
}

/** Read one verbatim source file. Guards against traversal — slug must be a known file. */
export function readSourceFile (slug) {
  const entry = corpus.sourceBySlug.get(slug)
  if (!entry) return null
  return { ...entry, body: readFileSync(join(SOURCE_DIR, entry.filename), 'utf8') }
}

export const corpus = load()
