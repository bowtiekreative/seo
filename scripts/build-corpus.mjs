#!/usr/bin/env node
/**
 * Build the machine-readable corpus from the authored source package.
 *
 * The source of truth is `instructions/laka-seo-grammar-system` — ten markdown documents,
 * a 144-rule JSON/YAML rule library, a project JSON Schema, an EBNF grammar, sixteen
 * templates and two worked examples.
 *
 * Nothing here invents content. Every field is either copied verbatim from the source or
 * derived from it by a rule stated in this file, and every derived record carries a
 * `source` pointer back to the document and heading it came from. Run:
 *
 *     npm run build:corpus
 *
 * The output lands in `data/laka-seo-grammar-system/` and is what the server loads at boot.
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync, copyFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const ROOT = join(here, '..')
const SRC = join(ROOT, 'instructions', 'laka-seo-grammar-system')
const OUT = join(ROOT, 'data', 'laka-seo-grammar-system')

if (!existsSync(SRC)) {
  console.error(`Source package not found at ${SRC}`)
  process.exit(1)
}

const read = (...p) => readFileSync(join(SRC, ...p), 'utf8')
const readJson = (...p) => JSON.parse(read(...p))

export function slugify (s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// ---------------------------------------------------------------------------
// Markdown → section tree
// ---------------------------------------------------------------------------

/**
 * Split a markdown document into a flat list of sections, one per ATX heading.
 *
 * Each section keeps its heading text, depth, anchor and the raw body beneath it, plus the
 * fenced code blocks, tables and top-level list items found in that body. The body stops at
 * the next heading of any depth, so a section holds only its own prose — children are
 * reachable through `path`.
 */
export function parseMarkdown (text, { doc }) {
  const lines = text.split('\n')
  const sections = []
  const stack = []
  let current = null

  const flush = () => { if (current) sections.push(finishSection(current)) }

  let inFence = false
  for (const line of lines) {
    if (/^```/.test(line)) inFence = !inFence
    const m = !inFence && line.match(/^(#{1,6})\s+(.*?)\s*$/)
    if (!m) {
      if (current) current.raw.push(line)
      continue
    }
    flush()
    const depth = m[1].length
    const heading = m[2].trim()
    while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop()
    const path = [...stack.map((s) => s.heading), heading]
    current = { doc, depth, heading, path, anchor: slugify(heading), raw: [] }
    stack.push(current)
  }
  flush()
  return sections
}

/** Pull the structured payloads out of a section body. */
function finishSection (section) {
  const raw = section.raw.join('\n')

  const blocks = []
  const fence = /^```([\w-]*)\n([\s\S]*?)^```\s*$/gm
  let m
  while ((m = fence.exec(raw)) !== null) {
    blocks.push({ lang: m[1] || 'text', code: m[2].replace(/\s+$/, '') })
  }

  // Prose is the body with fences, tables and horizontal rules removed.
  const prose = raw
    .replace(/^```[\w-]*\n[\s\S]*?^```\s*$/gm, '')
    .replace(/^\|.*$/gm, '')
    .replace(/^---\s*$/gm, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  const tables = parseTables(raw)
  const bullets = raw
    .replace(/^```[\w-]*\n[\s\S]*?^```\s*$/gm, '')
    .split('\n')
    .map((l) => l.match(/^[-*]\s+(.*)$/) || l.match(/^\d+\.\s+(.*)$/))
    .filter(Boolean)
    .map((mm) => mm[1].trim())

  return {
    doc: section.doc,
    depth: section.depth,
    heading: section.heading,
    path: section.path,
    anchor: section.anchor,
    prose,
    bullets,
    blocks,
    tables,
    text: raw.trim()
  }
}

/** Parse GitHub-style pipe tables into { headers, rows }. */
function parseTables (raw) {
  const out = []
  const lines = raw.split('\n')
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*\|/.test(lines[i])) continue
    if (!/^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] ?? '')) continue
    const cells = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim())
    const headers = cells(lines[i])
    const rows = []
    let j = i + 2
    while (j < lines.length && /^\s*\|/.test(lines[j])) { rows.push(cells(lines[j])); j++ }
    out.push({ headers, rows })
    i = j - 1
  }
  return out
}

/** Every line of the first `text` fence under a section, as a trimmed list. */
const linesOf = (section) => {
  const block = section?.blocks.find((b) => b.lang === 'text') ?? section?.blocks[0]
  if (!block) return []
  return block.code.split('\n').map((l) => l.trim()).filter(Boolean)
}

const findSection = (sections, predicate) => sections.find(predicate)
const findByHeading = (sections, re) => findSection(sections, (s) => re.test(s.heading))
const childrenOf = (sections, parentHeading, depth) =>
  sections.filter((s) => s.depth === depth && s.path.includes(parentHeading))

// ---------------------------------------------------------------------------
// Load the source documents
// ---------------------------------------------------------------------------

const DOC_FILES = readdirSync(SRC).filter((f) => /^\d\d-.*\.md$/.test(f)).sort()

const DOCS = DOC_FILES.map((filename) => {
  const text = read(filename)
  const num = filename.slice(0, 2)
  const slug = slugify(filename.replace(/^\d\d-/, '').replace(/\.md$/, ''))
  const sections = parseMarkdown(text, { doc: num })
  const title = (sections[0]?.heading ?? filename).replace(/^\d\d\s*—\s*/, '')
  return { number: num, slug, filename, title, sections, text }
})

const docByNum = new Map(DOCS.map((d) => [d.number, d]))
const sectionsOf = (num) => docByNum.get(num)?.sections ?? []

const sourceRef = (num, heading) => ({ document: num, file: docByNum.get(num)?.filename, heading })

// ---------------------------------------------------------------------------
// 08 — Rules: the JSON library, with the rationale recovered from the rulebook
// ---------------------------------------------------------------------------

const rulesDoc = readJson('rules', 'seo-laka-rules.json')

/**
 * The JSON rule library ships every rule with `rationale: ""`, but document 04 states a
 * **Reason:** for each one. Recover it by rule id so the API can serve a complete record.
 */
function rationaleFromRulebook () {
  const map = new Map()
  for (const s of sectionsOf('04')) {
    const m = s.heading.match(/^([A-Z]{3}-\d{3})\s*—\s*(.*)$/)
    if (!m) continue
    const reason = s.text.match(/\*\*Reason:\*\*\s*(.+)/)
    map.set(m[1], { title: m[2].trim(), rationale: reason ? reason[1].trim() : '', anchor: s.anchor })
  }
  return map
}

const rationale = rationaleFromRulebook()

const AREA_SLUGS = new Map()
const rules = rulesDoc.rules.map((r) => {
  const extra = rationale.get(r.id)
  const areaSlug = slugify(r.area)
  AREA_SLUGS.set(r.area, areaSlug)
  return {
    ...r,
    prefix: r.id.split('-')[0],
    area_slug: areaSlug,
    rationale: r.rationale || extra?.rationale || '',
    source: { ...sourceRef('04', extra ? `${r.id} — ${extra.title}` : r.id), anchor: extra?.anchor ?? null }
  }
})

const missingRationale = rules.filter((r) => !r.rationale).map((r) => r.id)

// ---------------------------------------------------------------------------
// 05 — Volumetric opportunity dimensions
// ---------------------------------------------------------------------------

const dimensionFamilies = sectionsOf('03')
  .filter((s) => /^2\.\d+\s/.test(s.heading))
  .map((s) => {
    const name = s.heading.replace(/^2\.\d+\s+/, '').replace(/\s+dimensions$/i, '')
    return {
      id: slugify(name),
      name,
      heading: s.heading,
      values: linesOf(s),
      source: sourceRef('03', s.heading)
    }
  })

// ---------------------------------------------------------------------------
// 06 — Hard publication gates and the soft scoring model
// ---------------------------------------------------------------------------

/**
 * Two different things in document 03 are called gates, and they must not be mixed.
 *
 * Section 6 holds the *cluster* gates — merge, split and test — which decide whether two
 * candidates belong on one page. Section 7 holds the *publication* gates, which decide
 * whether a candidate may be published at all. Split them by the section they sit under.
 */
const gateSectionsUnder = (parent) => sectionsOf('03')
  .filter((s) => s.depth === 3 && /gate$/i.test(s.heading) && s.path.some((h) => parent.test(h)))

const GATE_SECTIONS = gateSectionsUnder(/^7\.\s*Boolean publication gates/)
const CLUSTER_GATE_SECTIONS = gateSectionsUnder(/^6\.\s*Intent equivalence test/)

/** "PASS IF:" blocks list conditions joined by AND or OR. Keep the joiner — it is the rule. */
function parseGate (section) {
  const lines = linesOf(section)
  const idx = lines.findIndex((l) => /^PASS IF/i.test(l))
  const head = idx >= 0 ? lines[idx] : null
  const body = (idx >= 0 ? lines.slice(idx + 1) : lines)
    .filter((l) => !/^are defined\.$/i.test(l))
  const joiner = body.some((l) => /^AND\s/i.test(l)) ? 'AND' : 'OR'
  const conditions = body.map((l) => l.replace(/^(AND|OR)\s+/i, '').replace(/\.$/, '')).filter(Boolean)
  return {
    id: slugify(section.heading.replace(/\s*gate$/i, '')),
    name: section.heading,
    qualifier: head && /at least one/i.test(head) ? 'at_least_one' : null,
    joiner,
    conditions,
    source: sourceRef('03', section.heading)
  }
}

const approveSection = findByHeading(sectionsOf('03'), /^7\.\s*Boolean publication gates/)
const approveExpression = linesOf(approveSection)

/**
 * The eight hard gates, in the order the APPROVE expression conjoins them.
 *
 * `field` is the key the evaluator reads on a candidate — it matches the reference
 * implementation in `tools/laka_seo_engine.py`, so a document written for the Python tool
 * evaluates identically here. Six of the eight have a "PASS IF" subsection in document 03;
 * technical feasibility and compliance do not, and their conditions are left empty rather
 * than invented. `defined_by` says where each one is actually specified.
 */
const HARD_GATES = [
  { field: 'demand', term: 'DEMAND', section: /^Demand gate/, defined_by: ['03 §7 Demand gate'] },
  { field: 'distinct_task', term: 'DISTINCTNESS', section: /^Distinctness gate/, defined_by: ['03 §7 Distinctness gate', '03 §6 Intent equivalence test'] },
  { field: 'business_value', term: 'BUSINESS VALUE', section: /^Value gate/, defined_by: ['03 §7 Value gate'] },
  { field: 'information_advantage', term: 'INFORMATION ADVANTAGE', section: /^Information-advantage gate/, defined_by: ['03 §7 Information-advantage gate'] },
  { field: 'technical_feasibility', term: 'TECHNICAL FEASIBILITY', section: null, defined_by: ['06 SOP 9 — Technical eligibility audit', 'Rules TEC-001…TEC-012'] },
  { field: 'maintainability', term: 'MAINTAINABILITY', section: /^Maintainability gate/, defined_by: ['03 §7 Maintainability gate'] },
  { field: 'measurement', term: 'MEASURABILITY', section: /^Measurement gate/, defined_by: ['03 §7 Measurement gate', '05 §6 Baseline protocol'] },
  { field: 'compliance', term: 'POLICY / ETHICAL COMPLIANCE', section: null, defined_by: ['Rules GOV-001…GOV-012', '10 §4 Current primary-source guidance used'] }
]

const gateDetail = HARD_GATES.map((g, order) => {
  const section = g.section ? GATE_SECTIONS.find((s) => g.section.test(s.heading)) : null
  const parsed = section ? parseGate(section) : null
  return {
    id: g.field.replace(/_/g, '-'),
    field: g.field,
    order: order + 1,
    term: g.term,
    name: section?.heading ?? `${g.term.charAt(0)}${g.term.slice(1).toLowerCase()} gate`,
    qualifier: parsed?.qualifier ?? null,
    joiner: parsed?.joiner ?? null,
    conditions: parsed?.conditions ?? [],
    defined_by: g.defined_by,
    source: parsed?.source ?? sourceRef('03', '7. Boolean publication gates')
  }
})

const clusterGates = CLUSTER_GATE_SECTIONS.map(parseGate)

const scoringSection = findByHeading(sectionsOf('03'), /^8\.\s*Soft scoring model/)
const confidenceSection = findByHeading(sectionsOf('03'), /^Confidence adjustment/)
const existingSection = findByHeading(sectionsOf('03'), /^Existing-asset multiplier/)

/** Split "A × B × C" factor lists out of the scoring block. */
function factorsAfter (lines, label) {
  const start = lines.findIndex((l) => l.toUpperCase().startsWith(label))
  if (start < 0) return []
  const out = []
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i]
    if (/^[A-Z][A-Z\s]+=$/.test(l) || /^[A-Z][A-Z\s]+ =$/.test(l)) break
    const cleaned = l.replace(/^×\s*/, '').replace(/^\/\s*/, '').trim()
    if (!cleaned || cleaned === '/') break
    if (/^[A-Z ]+$/.test(cleaned) && cleaned.includes(' ')) break
    out.push(cleaned)
  }
  return out
}

const scoringLines = linesOf(scoringSection)

// ---------------------------------------------------------------------------
// 07 / 09 / 10 — quick-reference derived maps
// ---------------------------------------------------------------------------

const quickRef = read('QUICK-REFERENCE.txt')

/**
 * Read one block out of QUICK-REFERENCE.txt by its underlined title.
 *
 * A block runs from its dashed underline to the next underlined title, or to the end of the
 * file. The end anchor must be end-of-input, not end-of-line — `$` under the `m` flag would
 * stop at the block's first newline.
 */
function quickBlock (title) {
  // A title may carry lowercase letters ("PRIMARY KPIs"); the dashed underline is what
  // actually marks it as a title, so match on that rather than on all-caps.
  const re = new RegExp(`^${title}\\n-{3,}\\n([\\s\\S]*?)(?=\\n[A-Z][A-Za-z \\-/>]*\\n-{3,}\\n|$(?![\\s\\S]))`, 'm')
  const m = quickRef.match(re)
  if (!m) throw new Error(`QUICK-REFERENCE.txt has no block titled ${title}`)
  return m[1].split('\n').map((l) => l.replace(/\s+$/, '')).filter((l) => l.trim())
}

const taskFormats = quickBlock('TASK -> FORMAT').map((l) => {
  const m = l.match(/^(\S+)\s+(.*)$/)
  return m ? { task: m[1], format: m[2].trim() } : null
}).filter(Boolean)

const technicalStates = quickBlock('TECHNICAL STATES')
  .map((l) => l.replace(/^->\s*/, '').trim())
  .filter(Boolean)

const priorityOrder = quickBlock('PRIORITY')
  .join(' ')
  .split('>')
  .map((s) => s.trim())
  .filter(Boolean)

const primaryKpis = quickBlock('PRIMARY KPIs')
  .map((l) => l.replace(/^\d+\.\s*/, '').trim())
  .filter(Boolean)

const reviewDecisions = quickBlock('REVIEW DECISIONS')
const internalVariables = quickBlock('INTERNAL VARIABLES')
const changeVariables = quickBlock('CHANGE VARIABLES')
const governingSentence = quickBlock('CORE SENTENCE')
const governingEquation = quickBlock('CORE EQUATION')
const onePageRule = quickBlock('ONE-PAGE RULE')
const safeScale = quickBlock('SAFE SCALE')
const experimentGrammar = quickBlock('EXPERIMENT')

// ---------------------------------------------------------------------------
// 02 — LAKA levels
// ---------------------------------------------------------------------------

const levelSections = sectionsOf('01').filter((s) => /^10\.\d+\s/.test(s.heading))
const lakaLevels = levelSections.map((s) => {
  const name = s.heading.replace(/^10\.\d+\s+/, '').replace(/\s+change$/i, '')
  const canonical = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  return {
    id: slugify(name),
    name: canonical,
    definition: s.prose[0] ?? '',
    examples: linesOf(s),
    rule_count: rules.filter((r) => (r.laka_levels ?? []).includes(canonical)).length,
    source: sourceRef('01', s.heading)
  }
})

const escalationSection = findByHeading(sectionsOf('01'), /^Escalation rule/)

// ---------------------------------------------------------------------------
// 04 — Object classes, relations, retrieval states
// ---------------------------------------------------------------------------

/**
 * Object classes are tables of `| Primitive | Meaning | … |`, except the retrieval states,
 * which are a plain sequence in a fenced block. Read whichever the section actually uses.
 */
const objectClasses = sectionsOf('01')
  .filter((s) => /^3\.\d+\s/.test(s.heading))
  .map((s) => {
    const name = s.heading.replace(/^3\.\d+\s+/, '')
    const table = s.tables[0]
    const members = table
      ? table.rows.map((row) => {
          const primitive = row[0].replace(/`/g, '').trim()
          const rest = {}
          for (let i = 1; i < table.headers.length; i++) {
            rest[slugify(table.headers[i]).replace(/-/g, '_')] = row[i] ?? ''
          }
          return { primitive, ...rest }
        })
      // The retrieval-state block draws the chain with arrows; the arrow is not part of the name.
      : linesOf(s).map((l, i) => ({ primitive: l.replace(/^[→>-]+\s*/, '').trim(), step: i + 1 }))
    return {
      id: slugify(name),
      name,
      columns: table?.headers ?? ['Primitive'],
      members,
      source: sourceRef('01', s.heading)
    }
  })

const relationSection = findByHeading(sectionsOf('01'), /^4\.\s*Relation vocabulary/)
const operatorSections = sectionsOf('01').filter((s) => /^5\.\d+\s/.test(s.heading))

// ---------------------------------------------------------------------------
// 11 — SOPs
// ---------------------------------------------------------------------------

const sops = sectionsOf('06')
  .filter((s) => /^SOP \d+/.test(s.heading))
  .map((s) => {
    const m = s.heading.match(/^SOP (\d+)\s*—\s*(.*)$/)
    const num = m ? m[1] : null
    const name = m ? m[2] : s.heading
    const kids = sectionsOf('06').filter((c) => c.depth === 3 && c.path.includes(s.heading))
    const part = (re) => kids.find((c) => re.test(c.heading))
    return {
      id: `SOP-${String(num ?? '0').padStart(2, '0')}`,
      number: Number(num),
      name,
      goal: part(/^Goal/)?.prose.join(' ') ?? '',
      sections: kids.map((c) => ({
        heading: c.heading,
        prose: c.prose,
        bullets: c.bullets,
        blocks: c.blocks,
        tables: c.tables
      })),
      source: sourceRef('06', s.heading)
    }
  })

// ---------------------------------------------------------------------------
// 12 — Templates (document 07 plus the standalone template files)
// ---------------------------------------------------------------------------

const templates = sectionsOf('07')
  .filter((s) => /^Template [A-Z]\b/.test(s.heading))
  .map((s) => {
    const m = s.heading.match(/^Template ([A-Z])\s*—\s*(.*)$/)
    return {
      id: `TPL-${m ? m[1] : slugify(s.heading)}`,
      letter: m ? m[1] : null,
      name: m ? m[2] : s.heading,
      body: s.blocks[0]?.code ?? '',
      blocks: s.blocks,
      tables: s.tables,
      prose: s.prose,
      source: sourceRef('07', s.heading)
    }
  })

const standaloneTemplates = readdirSync(join(SRC, 'templates'))
  .filter((f) => f.endsWith('.md'))
  .sort()
  .map((f) => {
    const text = read('templates', f)
    return {
      id: `FILE-${slugify(f.replace(/\.md$/, ''))}`,
      name: (text.match(/^#\s+(.*)$/m) ?? [null, f])[1],
      filename: `templates/${f}`,
      body: text
    }
  })

// ---------------------------------------------------------------------------
// 13 — Implementation backlog
// ---------------------------------------------------------------------------

const phases = sectionsOf('09')
  .filter((s) => /^Phase \d+/.test(s.heading))
  .map((s) => {
    const m = s.heading.match(/^Phase (\d+)\s*—\s*(.*)$/)
    const kids = sectionsOf('09').filter((c) => c.depth === 3 && c.path.includes(s.heading))
    const part = (re) => kids.find((c) => re.test(c.heading))
    return {
      id: `PHASE-${m ? m[1] : slugify(s.heading)}`,
      number: m ? Number(m[1]) : null,
      name: m ? m[2] : s.heading,
      tasks: part(/^Tasks|^Deliverables/)?.bullets ?? [],
      output: part(/^Output/)?.blocks[0]?.code ?? part(/^Output/)?.prose.join(' ') ?? '',
      exit_gate: part(/^Exit gate|^Gate|^Preconditions/)?.blocks[0]?.code ?? '',
      sections: kids.map((c) => ({ heading: c.heading, prose: c.prose, bullets: c.bullets, blocks: c.blocks })),
      source: sourceRef('09', s.heading)
    }
  })

// ---------------------------------------------------------------------------
// 14 — Pseudo-commands
// ---------------------------------------------------------------------------

const commandsMd = read('tools', 'seo-laka-commands.md')
const commandSections = parseMarkdown(commandsMd, { doc: 'tools' })
const commands = commandSections
  .filter((s) => s.depth === 2 && s.blocks.length)
  .map((s) => {
    const code = s.blocks[0].code
    const name = (code.match(/^\/(\S+)/m) ?? [null, null])[1]
    const params = code.split('\n').slice(1)
      .map((l) => l.match(/^(\w+)="(.*)"$/))
      .filter(Boolean)
      .map((m) => ({ name: m[1], placeholder: m[2] }))
    return {
      id: name ? `/${name}` : slugify(s.heading),
      name: name ? `/${name}` : s.heading,
      purpose: s.heading,
      parameters: params,
      block: code,
      source: { document: 'tools', file: 'tools/seo-laka-commands.md', heading: s.heading }
    }
  })
  .filter((c) => c.name.startsWith('/'))

// ---------------------------------------------------------------------------
// 15 — Crosswalk, terminology corrections, primary sources
// ---------------------------------------------------------------------------

const corrections = sectionsOf('10')
  .filter((s) => s.depth === 3 && s.path.includes('3. Important terminology corrections'))
  .map((s) => ({
    id: slugify(s.heading),
    term: s.heading.replace(/[“”"]/g, ''),
    correction: s.prose.join(' '),
    blocks: s.blocks,
    source: sourceRef('10', s.heading)
  }))

const primarySources = sectionsOf('10')
  .filter((s) => s.depth === 3 && s.path.includes('4. Current primary-source guidance used'))
  .map((s) => ({
    id: slugify(s.heading),
    name: s.heading,
    points: s.bullets.length ? s.bullets : s.prose,
    source: sourceRef('10', s.heading)
  }))

const crosswalkTables = sectionsOf('10').flatMap((s) =>
  s.tables.map((t) => ({ heading: s.heading, ...t, source: sourceRef('10', s.heading) })))

const evidenceSection = findByHeading(sectionsOf('10'), /^5\.\s*Evidence classification/)

// ---------------------------------------------------------------------------
// 09 — Measurement: outcome hierarchy, formulas
// ---------------------------------------------------------------------------

const outcomeLevels = sectionsOf('05')
  .filter((s) => /^Level \d+\s*—/.test(s.heading))
  .map((s) => {
    const m = s.heading.match(/^Level (\d+)\s*—\s*(.*)$/)
    return {
      level: Number(m[1]),
      name: m[2],
      measures: linesOf(s),
      prose: s.prose,
      source: sourceRef('05', s.heading)
    }
  })

const formulas = sectionsOf('05')
  .filter((s) => /^3\.\d+\s/.test(s.heading))
  .map((s) => ({
    id: slugify(s.heading.replace(/^3\.\d+\s+/, '')),
    name: s.heading.replace(/^3\.\d+\s+/, ''),
    expression: s.blocks[0]?.code ?? '',
    notes: s.prose,
    source: sourceRef('05', s.heading)
  }))

const experimentTypes = sectionsOf('05')
  .filter((s) => /^10\.\d+\s/.test(s.heading))
  .map((s) => ({
    id: slugify(s.heading.replace(/^10\.\d+\s+/, '')),
    name: s.heading.replace(/^10\.\d+\s+/, ''),
    block: s.blocks[0]?.code ?? '',
    prose: s.prose,
    source: sourceRef('05', s.heading)
  }))

const decisionOutcomes = sectionsOf('05')
  .filter((s) => s.depth === 3 && s.path.includes('9. Decision outcomes'))
  .map((s) => ({
    id: slugify(s.heading),
    name: s.heading,
    block: s.blocks[0]?.code ?? '',
    prose: s.prose,
    source: sourceRef('05', s.heading)
  }))

// ---------------------------------------------------------------------------
// Glossary — every defined term the grammar names, with where it is defined
// ---------------------------------------------------------------------------

const glossary = []
const seenTerm = new Set()
const addTerm = (term, definition, source) => {
  const key = term.toLowerCase()
  if (!term || seenTerm.has(key)) return
  seenTerm.add(key)
  glossary.push({ term, slug: slugify(term), definition, source })
}

for (const cls of objectClasses) {
  for (const member of cls.members) {
    const definition = member.meaning ?? `A ${cls.name.toLowerCase().replace(/ objects?$/, '')} state in the SEO grammar.`
    addTerm(member.primitive, definition, cls.source)
  }
}
for (const level of lakaLevels) addTerm(level.name, level.definition, level.source)
for (const g of gateDetail) {
  addTerm(g.name, g.conditions.length
    ? `Hard publication gate ${g.order} of 8. Passes if ${g.conditions.join(` ${g.joiner} `)}.`
    : `Hard publication gate ${g.order} of 8. Specified in ${g.defined_by.join('; ')}.`, g.source)
}
for (const f of formulas) addTerm(f.name, f.notes.join(' ') || 'Measurement formula.', f.source)
for (const t of taskFormats) addTerm(`${t.task} (task)`, `Task-native format: ${t.format}.`, sourceRef('01', 'Format-selection grammar'))
glossary.sort((a, b) => a.term.localeCompare(b.term))

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

rmSync(OUT, { recursive: true, force: true })
mkdirSync(join(OUT, 'source'), { recursive: true })

const written = []
function emit (filename, payload) {
  const body = JSON.stringify(payload, null, 2) + '\n'
  writeFileSync(join(OUT, filename), body, 'utf8')
  written.push({
    name: filename,
    bytes: Buffer.byteLength(body),
    sha256: createHash('sha256').update(body).digest('hex')
  })
}

const sourceManifest = readJson('manifest.json')

emit('01-grammar.json', {
  title: 'The SEO grammar',
  purpose: 'The vocabulary, sentence forms and operators the whole system is written in.',
  governing_sentence: governingSentence,
  governing_equation: governingEquation,
  equation_note: 'The terms are multiplied conceptually, so a near-zero factor neutralises the rest of the system.',
  layers: (findByHeading(sectionsOf('01'), /^2\.\s*The seven layers/)?.tables[0]) ?? null,
  output_hierarchy: linesOf(findByHeading(parseMarkdown(read('README.md'), { doc: 'readme' }), /^Core output hierarchy/)),
  one_page_rule: onePageRule,
  compact_notation: findByHeading(sectionsOf('01'), /^Compact notation/)?.blocks ?? [],
  canonical_sentence: findByHeading(sectionsOf('01'), /^6\.\s*The canonical SEO sentence/)?.blocks ?? [],
  validity: findByHeading(sectionsOf('01'), /^13\.\s*Validity grammar/)?.blocks ?? [],
  source: sourceRef('01', 'whole document')
})

emit('02-laka-model.json', {
  title: 'The LAKA change model',
  levels: lakaLevels,
  escalation_rule: escalationSection?.blocks[0]?.code ?? '',
  internal_variables: internalVariables,
  internal_variable_sentence: findByHeading(sectionsOf('01'), /^11\.\s*LAKA internal-variable sentence/)?.blocks ?? [],
  change_variables: changeVariables,
  change_descriptor: findByHeading(sectionsOf('01'), /^12\.\s*Fourteen-variable change descriptor/)?.blocks ?? [],
  change_descriptor_table: findByHeading(sectionsOf('01'), /^12\.\s*Fourteen-variable change descriptor/)?.tables[0] ?? null,
  source: sourceRef('01', '10–12')
})

emit('03-operators.json', {
  title: 'Boolean and decision logic',
  operators: operatorSections.map((s) => ({
    id: slugify(s.heading.replace(/^5\.\d+\s+/, '')),
    name: s.heading.replace(/^5\.\d+\s+/, ''),
    definition: s.prose.join(' '),
    example: s.blocks[0]?.code ?? '',
    source: sourceRef('01', s.heading)
  })),
  semantics: linesOf(findByHeading(sectionsOf('04'), /^Operator semantics/)),
  precedence: rulesDoc.precedence,
  precedence_note: 'Rules conflict. Resolve them in this order, highest first.',
  execution_order: linesOf(findByHeading(sectionsOf('04'), /^Rule execution order/)),
  hard_gate_pattern: findByHeading(sectionsOf('04'), /^Hard-gate pattern/)?.blocks[0]?.code ?? '',
  operator_usage: Object.entries(
    rules.reduce((acc, r) => {
      for (const op of r.operators ?? []) acc[op] = (acc[op] ?? 0) + 1
      return acc
    }, {})
  ).sort((a, b) => b[1] - a[1]).map(([operator, count]) => ({ operator, count }))
})

emit('04-object-classes.json', {
  title: 'Primitive object classes',
  classes: objectClasses,
  relations: {
    heading: relationSection?.heading ?? null,
    blocks: relationSection?.blocks ?? [],
    table: relationSection?.tables[0] ?? null,
    source: sourceRef('01', '4. Relation vocabulary')
  },
  retrieval_states: technicalStates,
  retrieval_state_detail: objectClasses.find((c) => c.id === 'retrieval-states') ?? null
})

emit('05-dimensions.json', {
  title: 'Volumetric opportunity dimensions',
  note: 'Theoretical volume is an analysis space, not a publishing target.',
  families: dimensionFamilies,
  family_count: dimensionFamilies.length,
  theoretical_volume: dimensionFamilies.reduce((n, f) => n * Math.max(f.values.length, 1), 1),
  safe_scale: safeScale,
  source: sourceRef('03', '2. Opportunity dimensions')
})

emit('06-gates.json', {
  title: 'Hard publication gates and the soft scoring model',
  approve_expression: approveExpression,
  gates: gateDetail,
  gate_count: gateDetail.length,
  gate_note: 'All eight must pass. A candidate that fails any one routes to research, consolidation, repair, deferral or rejection — never to publication.',
  cluster_gates: clusterGates,
  cluster_gate_note: 'These decide whether two candidates share one canonical page. They are not publication gates.',
  one_page_rule: onePageRule,
  scoring: {
    value_factors: factorsAfter(scoringLines, 'VALUE NUMERATOR'),
    cost_factors: factorsAfter(scoringLines, 'COST DENOMINATOR'),
    priority_expression: 'VALUE NUMERATOR / COST DENOMINATOR',
    floor_note: scoringSection?.prose.find((p) => /floor/i.test(p)) ?? '',
    confidence_adjustment: linesOf(confidenceSection),
    existing_asset_multiplier: linesOf(existingSection),
    source: sourceRef('03', '8. Soft scoring model')
  },
  priority_order: priorityOrder,
  source: sourceRef('03', '7. Boolean publication gates')
})

emit('07-formats.json', {
  title: 'Task-native format selection',
  note: 'The task the searcher must complete selects the format. Appearance does not.',
  task_formats: taskFormats,
  selection_grammar: findByHeading(sectionsOf('01'), /^Format-selection grammar/)?.blocks ?? [],
  information_product_selector: findByHeading(sectionsOf('02'), /^Information-product selector/)?.blocks ?? [],
  source: sourceRef('01', 'Format-selection grammar')
})

emit('08-rules.json', {
  title: 'The 144-rule decision library',
  system: rulesDoc.system,
  version: rulesDoc.version,
  rule_count: rules.length,
  precedence: rulesDoc.precedence,
  areas: [...new Set(rules.map((r) => r.area))].map((area) => ({
    name: area,
    slug: AREA_SLUGS.get(area),
    prefix: rules.find((r) => r.area === area).prefix,
    count: rules.filter((r) => r.area === area).length
  })),
  rules
})

emit('09-measurement.json', {
  title: 'Measurement and experiment system',
  philosophy: findByHeading(sectionsOf('05'), /^1\.\s*Measurement philosophy/)?.prose ?? [],
  primary_kpis: primaryKpis,
  outcome_levels: outcomeLevels,
  formulas,
  data_grain: findByHeading(sectionsOf('05'), /^4\.\s*Data grain/)?.tables[0] ?? null,
  event_dictionary: findByHeading(sectionsOf('05'), /^5\.\s*Event dictionary/)?.tables[0] ?? null,
  baseline_protocol: findByHeading(sectionsOf('05'), /^6\.\s*Baseline protocol/)?.blocks ?? [],
  source: sourceRef('05', 'whole document')
})

emit('10-experiments.json', {
  title: 'Hypotheses, experiment cards and decisions',
  hypothesis_grammar: findByHeading(sectionsOf('05'), /^7\.\s*Hypothesis grammar/)?.blocks ?? [],
  compact_grammar: experimentGrammar,
  experiment_card: findByHeading(sectionsOf('05'), /^8\.\s*LAKA experiment card/)?.blocks ?? [],
  decisions: decisionOutcomes,
  decision_names: reviewDecisions,
  types: experimentTypes,
  comparison_designs: findByHeading(sectionsOf('05'), /^11\.\s*Comparison designs/)?.tables[0] ?? null,
  observation_windows: findByHeading(sectionsOf('05'), /^12\.\s*Observation windows/)?.tables[0] ?? null,
  source: sourceRef('05', '7–12')
})

emit('11-sops.json', { title: 'Audit and execution SOPs', count: sops.length, sops })

emit('12-templates.json', {
  title: 'Page and cluster templates',
  count: templates.length + standaloneTemplates.length,
  templates,
  files: standaloneTemplates
})

emit('13-backlog.json', {
  title: 'Implementation backlog',
  count: phases.length,
  phases,
  cadence: sectionsOf('09')
    .filter((s) => s.depth === 3 && s.path.includes('Ongoing cadence'))
    .map((s) => ({ name: s.heading, items: s.bullets, blocks: s.blocks, source: sourceRef('09', s.heading) })),
  definition_of_done: findByHeading(sectionsOf('09'), /^Definition of done/)?.blocks[0]?.code ?? '',
  source: sourceRef('09', 'whole document')
})

emit('14-commands.json', { title: 'Pseudo-command notation', count: commands.length, commands })

emit('15-crosswalk.json', {
  title: 'Course crosswalk and sources',
  translation: crosswalkTables,
  corrections,
  primary_sources: primarySources,
  evidence_classification: {
    blocks: evidenceSection?.blocks ?? [],
    table: evidenceSection?.tables[0] ?? null,
    source: sourceRef('10', '5. Evidence classification')
  },
  versioning: findByHeading(sectionsOf('10'), /^6\.\s*Versioning/)?.prose ?? [],
  source: sourceRef('10', 'whole document')
})

emit('16-agent-prompt.json', {
  title: 'Agent operating prompt',
  sections: sectionsOf('08').map((s) => ({
    heading: s.heading, depth: s.depth, anchor: s.anchor, prose: s.prose, bullets: s.bullets, blocks: s.blocks
  })),
  source: sourceRef('08', 'whole document')
})

emit('17-glossary.json', { title: 'Glossary', count: glossary.length, terms: glossary })

emit('18-documents.json', {
  title: 'The ten source documents',
  count: DOCS.length,
  documents: DOCS.map((d) => ({
    number: d.number,
    slug: d.slug,
    filename: d.filename,
    title: d.title,
    bytes: Buffer.byteLength(d.text),
    section_count: d.sections.length,
    purpose: sourceManifest.files.find((f) => f.path === d.filename)?.purpose ?? '',
    outline: d.sections.filter((s) => s.depth <= 2).map((s) => ({ heading: s.heading, anchor: s.anchor, depth: s.depth })),
    sections: d.sections.map((s) => ({
      heading: s.heading, depth: s.depth, anchor: s.anchor, path: s.path,
      prose: s.prose, bullets: s.bullets, blocks: s.blocks, tables: s.tables
    }))
  }))
})

emit('19-project-schema.json', readJson('schemas', 'seo-laka-project.schema.json'))

emit('20-examples.json', {
  title: 'Worked examples',
  project: readJson('examples', 'webdevcalgary-example.json'),
  candidate: readJson('examples', 'sample-candidate.json'),
  dimensions: readJson('examples', 'sample-dimensions.json'),
  narrative: read('examples', 'webdevcalgary-example.md')
})

// Verbatim source files, so the API can serve the originals alongside the parsed corpus.
const VERBATIM = [
  ...DOC_FILES,
  'README.md', 'QUICK-REFERENCE.txt', 'SEO-LAKA-COMPLETE-GUIDE.md',
  'appendix/clickminded-seo-technical-ontology-and-measurement.md',
  'tools/seo-laka.ebnf', 'tools/seo-laka-commands.md',
  'rules/seo-laka-rules.yaml', 'schemas/seo-laka-project.schema.json',
  'examples/webdevcalgary-example.md'
]
for (const rel of VERBATIM) {
  const target = join(OUT, 'source', basename(rel))
  copyFileSync(join(SRC, rel), target)
}

emit('00-manifest.json', {
  title: 'LAKA SEO Grammar System',
  version: sourceManifest.version,
  purpose: 'Convert SEO from a loose checklist into a formal, measurable, volumetric operating language.',
  course_basis: sourceManifest.course_basis,
  source_created: sourceManifest.created_date,
  generated_at: new Date().toISOString(),
  inventory: {
    rules: rules.length,
    areas: AREA_SLUGS.size,
    laka_levels: lakaLevels.length,
    internal_variables: internalVariables.length,
    change_variables: changeVariables.length,
    publication_gates: gateDetail.length,
    dimension_families: dimensionFamilies.length,
    dimension_values: dimensionFamilies.reduce((n, f) => n + f.values.length, 0),
    sops: sops.length,
    templates: templates.length + standaloneTemplates.length,
    phases: phases.length,
    commands: commands.length,
    formulas: formulas.length,
    glossary_terms: glossary.length,
    documents: DOCS.length
  },
  start_here: [
    'Read the governing sentence and the governing equation: GET /v1/grammar',
    'Read the eight hard publication gates: GET /v1/gates',
    'Browse the 144 decision rules: GET /v1/rules',
    'Evaluate a candidate against the gates: POST /v1/evaluate',
    'Size a volumetric space without enumerating it: POST /v1/volume'
  ],
  usage_note: 'This is a decision and measurement system, not a ranking guarantee. Priority bands are transparent heuristics, not search-engine scores.',
  copyright_note: 'Original synthesis of the ClickMinded SEO course into a LAKA decision and measurement system. Source course material remains the property of its authors.',
  files: written.slice().sort((a, b) => a.name.localeCompare(b.name)),
  verbatim_sources: VERBATIM.map((f) => basename(f))
})

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const report = {
  rules: rules.length,
  rules_missing_rationale: missingRationale.length,
  areas: AREA_SLUGS.size,
  gates: gateDetail.length,
  dimension_families: dimensionFamilies.length,
  laka_levels: lakaLevels.length,
  sops: sops.length,
  templates: templates.length + standaloneTemplates.length,
  phases: phases.length,
  commands: commands.length,
  formulas: formulas.length,
  task_formats: taskFormats.length,
  glossary_terms: glossary.length,
  documents: DOCS.length,
  files_written: written.length + 1
}

console.log(JSON.stringify(report, null, 2))

const problems = []
if (rules.length !== 144) problems.push(`expected 144 rules, got ${rules.length}`)
if (missingRationale.length) problems.push(`rules with no rationale: ${missingRationale.join(', ')}`)
if (gateDetail.length !== 8) problems.push(`expected 8 publication gates, got ${gateDetail.length}`)
if (clusterGates.length !== 3) problems.push(`expected 3 cluster gates, got ${clusterGates.length}`)
const gatesWithoutConditions = gateDetail.filter((g) => !g.conditions.length).map((g) => g.field)
if (gatesWithoutConditions.join(',') !== 'technical_feasibility,compliance') {
  problems.push(`unexpected gates without parsed conditions: ${gatesWithoutConditions.join(', ') || 'none'}`)
}
if (sops.length !== 14) problems.push(`expected 14 SOPs, got ${sops.length}`)
const emptyClasses = objectClasses.filter((c) => !c.members.length).map((c) => c.id)
if (emptyClasses.length) problems.push(`object classes with no members: ${emptyClasses.join(', ')}`)
if (phases.length !== 11) problems.push(`expected 11 phases, got ${phases.length}`)
if (formulas.length !== 12) problems.push(`expected 12 formulas, got ${formulas.length}`)
if (dimensionFamilies.length !== 12) problems.push(`expected 12 dimension families, got ${dimensionFamilies.length}`)
if (lakaLevels.length !== 5) problems.push(`expected 5 LAKA levels, got ${lakaLevels.length}`)
if (taskFormats.length !== 12) problems.push(`expected 12 task→format pairs, got ${taskFormats.length}`)
if (commands.length !== 10) problems.push(`expected 10 pseudo-commands, got ${commands.length}`)
if (priorityOrder.length !== 8) problems.push(`expected 8 priority steps, got ${priorityOrder.length}: ${priorityOrder.join(' > ')}`)
if (primaryKpis.length !== 5) problems.push(`expected 5 primary KPIs, got ${primaryKpis.length}`)
if (technicalStates.length !== 10) problems.push(`expected 10 retrieval states, got ${technicalStates.length}`)
if (internalVariables.length !== 10) problems.push(`expected 10 LAKA internal variables, got ${internalVariables.length}`)
if (changeVariables.length !== 14) problems.push(`expected 14 LAKA change variables, got ${changeVariables.length}`)
if (reviewDecisions.length !== 7) problems.push(`expected 7 review decisions, got ${reviewDecisions.length}`)

if (problems.length) {
  console.error('\nBuild produced unexpected counts:')
  for (const p of problems) console.error(`  - ${p}`)
  process.exit(1)
}
