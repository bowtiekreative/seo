/**
 * The page shell.
 *
 * The header is the LAKA four-element nav contract: the canonical Bow Tie seal, the
 * uppercase site name with the second word in accent, one MENU pill, one CTA pill. Nothing
 * else goes in the bar; every destination lives in the mega menu, which is a native
 * <details> disclosure so it works with JavaScript switched off.
 */

import { corpus } from '../corpus.js'
import { ASSETS } from '../assets.js'

const BRAND = 'https://designsystem.bowtiekreative.com/brand'
export const ORIGIN = process.env.PUBLIC_ORIGIN ?? 'https://seosystem.bowtiekreative.com'

export const esc = (v) => String(v ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;')

export const attr = (v) => esc(v)

/** Icons: one stroke weight, one metaphor per concept. */
const ICON_PATHS = {
  equation: '<path d="M4 6h16M4 12h10M4 18h16"/><path d="m17 15 4 4m0-4-4 4"/>',
  levels: '<path d="M3 20h18M6 20V9m6 11V4m6 16v-7"/>',
  gate: '<path d="M4 20V8l8-4 8 4v12"/><path d="M9 20v-6h6v6M4 20h16"/>',
  rules: '<path d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5"/>',
  volume: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m12 12 8-4.5M12 12v9M12 12 4 7.5"/>',
  cluster: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7.5 10.5 16M16 7.5 13.5 16M8.5 6h7"/>',
  graph: '<circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="m7 11 10-4M7 13l10 4"/>',
  metric: '<path d="M4 20V10m5 10V4m5 16v-7m5 7V8"/>',
  sop: '<path d="M5 4h11l3 3v13H5z"/><path d="M9 11h7M9 15h7M9 7h4"/>',
  template: '<path d="M4 4h16v4H4zM4 12h7v8H4zM15 12h5v8h-5z"/>',
  phase: '<path d="M3 7h6l3 5 3-5h6M3 17h6l3-5"/><circle cx="19" cy="17" r="2"/>',
  api: '<path d="m9 16-4-4 4-4m6 0 4 4-4 4"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
  glossary: '<path d="M5 5a2 2 0 0 1 2-2h12v18H7a2 2 0 0 1-2-2z"/><path d="M9 3v18"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  experiment: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
  command: '<path d="M8 4H6a2 2 0 0 0 0 4h12a2 2 0 0 1 0 4H6a2 2 0 0 0 0 4h2"/><path d="M9 4v16"/>',
  object: '<path d="M4 7h6v6H4zM14 4h6v6h-6zM14 14h6v6h-6zM4 17h6v3H4z"/>'
}

export function icon (name, { size = 24 } = {}) {
  const path = ICON_PATHS[name]
  if (!path) return ''
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${path}</svg>`
}

const inv = corpus.manifest.inventory

/** Every destination on the site. The bar carries none of these — the mega menu does. */
export const MENU = [
  {
    label: 'The grammar',
    items: [
      { href: '/grammar', title: 'Sentence and equation', note: 'The ten factors that multiply', icon: 'equation' },
      { href: '/laka', title: 'The LAKA change model', note: `${inv.laka_levels} levels, ${inv.change_variables} change variables`, icon: 'levels' },
      { href: '/objects', title: 'Object classes', note: 'The primitives the language names', icon: 'object' },
      { href: '/operators', title: 'Logic and precedence', note: 'IF, THEN, ELSE, and what outranks what', icon: 'api' }
    ]
  },
  {
    label: 'The decisions',
    items: [
      { href: '/gates', title: 'The eight hard gates', note: 'What may be published at all', icon: 'gate' },
      { href: '/rules', title: `Browse ${inv.rules} rules`, note: `${inv.areas} areas, filterable`, icon: 'rules' },
      { href: '/formats', title: 'Task-native formats', note: 'The task selects the format', icon: 'template' },
      { href: '/measurement', title: 'Measurement', note: `${inv.formulas} formulas, five primary KPIs`, icon: 'metric' }
    ]
  },
  {
    label: 'Run it',
    items: [
      { href: '/evaluate', title: 'Evaluate a candidate', note: 'Gates, then value against cost', icon: 'gate' },
      { href: '/volume', title: 'Size a volumetric space', note: 'Without ever enumerating it', icon: 'volume' },
      { href: '/cluster', title: 'One page or two', note: 'The one-page rule as a decision', icon: 'cluster' },
      { href: '/equation', title: 'Find the weakest link', note: 'Score the governing equation', icon: 'equation' }
    ]
  },
  {
    label: 'Operating it',
    items: [
      { href: '/sops', title: 'SOPs', note: `${inv.sops} repeatable procedures`, icon: 'sop' },
      { href: '/backlog', title: 'Implementation backlog', note: `${inv.phases} phases with exit gates`, icon: 'phase' },
      { href: '/templates', title: 'Templates', note: `${inv.templates} briefs and matrices`, icon: 'template' },
      { href: '/commands', title: 'Pseudo-commands', note: `${inv.commands} compact notations`, icon: 'command' }
    ]
  },
  {
    label: 'Reference',
    items: [
      { href: '/api', title: 'API reference', note: 'Every endpoint, with examples', icon: 'api' },
      { href: '/docs', title: 'Source documents', note: `${inv.documents} documents, verbatim`, icon: 'doc' },
      { href: '/glossary', title: 'Glossary', note: `${inv.glossary_terms} terms`, icon: 'glossary' },
      { href: '/search', title: 'Search', note: 'Rules, gates, SOPs, sections', icon: 'search' }
    ]
  }
]

function header () {
  const groups = MENU.map((g) => `
        <div class="mega__group">
          <h2>${esc(g.label)}</h2>
          <ul>${g.items.map((i) => `
            <li><a href="${attr(i.href)}">${esc(i.title)}<span>${esc(i.note)}</span></a></li>`).join('')}
          </ul>
        </div>`).join('')

  return `
  <header class="bar">
    <div class="wrap bar__inner">
      <a class="bar__left" href="/">
        <img class="bar__seal" src="${BRAND}/btk-seal-white.png" alt="Bow Tie Kreative" width="34" height="34">
        <span class="bar__name">SEO <b>System</b></span>
      </a>
      <div class="bar__right">
        <details class="menu" id="menu">
          <summary class="pill" aria-label="Menu">
            <svg class="menu__icon menu__icon--open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            <svg class="menu__icon menu__icon--close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
            <span>MENU</span>
          </summary>
          <nav class="mega" aria-label="All pages">
            <div class="wrap mega__grid">${groups}
            </div>
          </nav>
        </details>
        <a class="pill pill--solid" href="/evaluate">Evaluate a candidate</a>
      </div>
    </div>
  </header>`
}

function footer () {
  const cols = MENU.map((g) => `
        <div>
          <h2>${esc(g.label)}</h2>
          <ul>${g.items.map((i) => `<li><a href="${attr(i.href)}">${esc(i.title)}</a></li>`).join('')}</ul>
        </div>`).join('')

  return `
  <footer class="foot">
    <div class="wrap">
      <div class="foot__grid">${cols}
      </div>
      <div class="foot__legal">
        <p class="m-0">${esc(corpus.manifest.title)} v${esc(corpus.manifest.version)} · ${inv.rules} rules · ${inv.publication_gates} hard gates · ${inv.documents} source documents</p>
        <p class="m-0"><a href="/privacy">Privacy</a> · <a href="/api">API</a> · <a href="https://writingsystem.bowtiekreative.com">Writing System</a></p>
        <p class="m-0">Powered by <a href="https://bowtiekreative.com">Bow Tie Kreative</a></p>
      </div>
      <p class="muted mt-6 t-13 wide">${esc(corpus.manifest.copyright_note)}</p>
    </div>
  </footer>`
}

/** Trim to a whole word at or under `max` characters. */
export function clampText (text, max) {
  const t = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, '')}…`
}

/**
 * @param {object} page
 * @param {string} page.title       the <title>, without the site suffix
 * @param {string} page.description meta description
 * @param {string} page.path        canonical path
 * @param {string} page.body        page markup, starting with its single <h1>
 * @param {object} [page.jsonLd]    structured data describing content visible on the page
 */
export function layout (page) {
  const suffix = ' · SEO System'
  const title = `${clampText(page.title, 60 - suffix.length)}${suffix}`
  const description = clampText(page.description, 158)
  const canonical = `${ORIGIN}${page.path}`

  // Structured data describes content that is actually visible on the page.
  const structured = page.jsonLd ?? {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description,
    url: canonical,
    isPartOf: { '@type': 'WebSite', name: corpus.manifest.title, url: ORIGIN },
    publisher: { '@type': 'Organization', name: 'Bow Tie Kreative', url: 'https://bowtiekreative.com' }
  }
  const jsonLd = `\n  <script type="application/ld+json">${JSON.stringify(structured).replace(/</g, '\\u003c')}</script>`

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(description)}">
  <link rel="canonical" href="${attr(canonical)}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="LAKA SEO Grammar System">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:url" content="${attr(canonical)}">
  <meta property="og:image" content="${BRAND}/btk-seal.png">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${attr(title)}">
  <meta name="twitter:description" content="${attr(description)}">
  <meta name="theme-color" content="#07090D">
  <link rel="icon" href="${BRAND}/favicon-32.png" sizes="32x32">
  <link rel="icon" href="${BRAND}/favicon-48.png" sizes="48x48">
  <link rel="apple-touch-icon" href="${BRAND}/apple-touch-icon-180.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">
  <link rel="stylesheet" href="${ASSETS.css.url}">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="alternate" type="application/json" href="${ORIGIN}/v1">${jsonLd}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
${header()}
  <main id="main" tabindex="-1">
${page.body}
  </main>
${footer()}
  <script src="${ASSETS.js.url}" defer></script>
</body>
</html>`
}

/** The environmental-motion anchor for hero sections. */
export function lattice () {
  const cols = 14
  const rows = 7
  let lines = ''
  let dots = ''
  for (let r = 0; r <= rows; r++) {
    lines += `<line x1="0" y1="${r * 60}" x2="1400" y2="${r * 60 - 120}" stroke-width="1" opacity="0.16"/>`
  }
  for (let c = 0; c <= cols; c++) {
    lines += `<line x1="${c * 100}" y1="0" x2="${c * 100 - 140}" y2="420" stroke-width="1" opacity="0.16"/>`
  }
  for (let r = 1; r < rows; r += 2) {
    for (let c = 1; c < cols; c += 3) {
      dots += `<circle class="pulse" cx="${c * 100}" cy="${r * 60}" r="3" fill="currentColor" stroke="none" opacity="0.4"/>`
    }
  }
  return `<div class="lattice"><svg viewBox="0 0 1400 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" role="presentation" class="lattice__svg"><g class="drift">${lines}${dots}</g></svg></div>`
}
