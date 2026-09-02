import { esc, attr, icon } from './layout.js'

/**
 * LAKA levels carry a badge whose colour tracks cost and reversibility — but colour is never
 * the only signal, so each also carries a text label and a monospace mark.
 */
const LEVEL_META = {
  Baseline: { cls: 'badge--heuristic', mark: '0' },
  Minor: { cls: 'badge--option', mark: '1' },
  Major: { cls: 'badge--default', mark: '2' },
  Structural: { cls: 'badge--hard', mark: '3' },
  Paradigm: { cls: 'badge--hard', mark: '4' }
}

export function levelBadge (level) {
  const m = LEVEL_META[level] ?? { cls: '', mark: '·' }
  return `<span class="badge ${m.cls}" data-mark="${attr(m.mark)}">${esc(level)}</span>`
}

export function chip (text, { mark = '·', cls = '' } = {}) {
  return `<span class="badge ${cls}" data-mark="${attr(mark)}">${esc(text)}</span>`
}

export function chips (values, opts) {
  if (!values?.length) return '<span class="muted">none</span>'
  return `<ul class="chips">${values.map((v) => `<li>${chip(v, opts)}</li>`).join('')}</ul>`
}

/** A pass/fail verdict banner. Mark and text carry the meaning, not colour alone. */
export function verdict (passed, label, detail) {
  return `<div class="verdict ${passed ? 'verdict--clear' : 'verdict--blocked'}">
    <span class="verdict__mark" aria-hidden="true">${passed ? '✓' : '✕'}</span>
    <span>
      <strong class="ink">${esc(label)}</strong>
      ${detail ? `<span class="muted t-14 my-1 block">${esc(detail)}</span>` : ''}
    </span>
  </div>`
}

/** One row in the rule browser. */
export function ruleRow (rule) {
  return `<li>
    <a class="rule" href="/rules/${attr(rule.id)}">
      <span class="rule__id">${esc(rule.id)}</span>
      <span>
        <span class="rule__name">${esc(rule.title)}</span>
        <span class="rule__logic">IF ${esc(rule.if)}</span>
      </span>
      ${(rule.laka_levels ?? []).slice(0, 1).map(levelBadge).join('')}
    </a>
  </li>`
}

/** An IF / THEN / ELSE branch rendered as a readable tree rather than a paragraph. */
export function branchTree (rule) {
  return `<ul class="tree">
    <li><span class="op">IF</span><ul><li><span class="path">${esc(rule.if)}</span></li></ul></li>
    <li><span class="op">THEN</span><ul><li><span class="val">${esc(rule.then)}</span></li></ul></li>
    <li><span class="op">ELSE</span><ul><li><span class="val">${esc(rule.else)}</span></li></ul></li>
  </ul>`
}

/** A monospace block, captioned with where the content came from. */
export function codeBlock (code, caption) {
  if (!code) return ''
  return `<figure class="m-0">
    ${caption ? `<figcaption class="muted t-13 mb-2">${esc(caption)}</figcaption>` : ''}
    <pre><code>${esc(code)}</code></pre>
  </figure>`
}

export function jsonBlock (value, caption) {
  return codeBlock(JSON.stringify(value, null, 2), caption)
}

export function statGrid (stats, { columns = 4 } = {}) {
  return `<div class="grid grid--${columns}">${stats.map((s) => `
    <div class="card stat" data-component="card">
      <span class="stat__value">${esc(s.value)}</span>
      <span class="stat__label">${esc(s.label)}</span>
    </div>`).join('')}</div>`
}

export function featureCard ({ href, iconName, title, body }) {
  const inner = `
    <span class="feature__icon">${icon(iconName)}</span>
    <span>
      <strong class="ink t-18 block">${esc(title)}</strong>
      <span class="muted t-14 my-2 block">${esc(body)}</span>
    </span>`
  return href
    ? `<a class="card feature plain" data-component="card" href="${attr(href)}">${inner}</a>`
    : `<div class="card feature" data-component="card">${inner}</div>`
}

/**
 * A table caption.
 *
 * Every table needs one so a screen reader can announce what it holds before reading into
 * it. Where the surrounding heading already names the table, the caption is hidden visually
 * rather than duplicated on screen.
 */
export function caption (text, { visible = false } = {}) {
  if (!text) return ''
  return `<caption${visible ? '' : ' class="visually-hidden"'}>${esc(text)}</caption>`
}

/** A parsed markdown table, in a horizontally scrollable container. */
export function table (t, captionText) {
  if (!t?.headers?.length) return ''
  // Fall back to naming the columns, so no table ever ships without a caption.
  const text = captionText || `${t.headers.join(', ')} — ${t.rows.length} rows`
  return `<div class="table-scroll">
    <table>
      ${caption(text)}
      <thead><tr>${t.headers.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${t.rows.map((row) => `<tr>${row.map((c) => `<td>${inlineMarkdown(c)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
  </div>`
}

/**
 * Render the small subset of inline markdown the corpus actually uses: `code`, **bold** and
 * *emphasis*. Everything is escaped first, so no authored content can inject markup.
 */
export function inlineMarkdown (text) {
  return esc(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="ink">$1</strong>')
    .replace(/(^|\W)\*([^*]+)\*/g, '$1<em>$2</em>')
}

export function bullets (items, { ordered = false } = {}) {
  if (!items?.length) return ''
  const tag = ordered ? 'ol' : 'ul'
  return `<${tag} class="stack indent m-0">${items.map((i) => `<li>${inlineMarkdown(i)}</li>`).join('')}</${tag}>`
}

export function prose (lines) {
  if (!lines?.length) return ''
  return lines.map((p) => `<p class="my-3">${inlineMarkdown(p)}</p>`).join('')
}

/** Render one parsed document section: prose, then lists, then blocks, then tables. */
export function sectionBody (section) {
  return [
    prose(section.prose),
    section.bullets?.length ? bullets(section.bullets) : '',
    ...(section.blocks ?? []).map((b) => codeBlock(b.code)),
    ...(section.tables ?? []).map(table)
  ].filter(Boolean).join('\n')
}

/** Definition list from an object of label → rendered value. */
export function defList (pairs) {
  const entries = Object.entries(pairs).filter(([, v]) => v != null && v !== '')
  if (!entries.length) return ''
  return `<dl class="deflist">${entries.map(([k, v]) => `
    <dt>${esc(k)}</dt>
    <dd>${v}</dd>`).join('')}</dl>`
}

export function pageHead ({ eyebrow, title, lede, id = 'top' }) {
  return `<div id="${attr(id)}">
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h1>${esc(title)}</h1>
    ${lede ? `<p class="lede mt-6">${esc(lede)}</p>` : ''}
  </div>`
}

/** A collapsed disclosure. Native <details>, so it works with no JavaScript. */
export function disclose (summary, body, { open = false } = {}) {
  return `<details class="disclose"${open ? ' open' : ''}>
    <summary>${esc(summary)}</summary>
    <div>${body}</div>
  </details>`
}

/** Offset-based pager for the rule browser. */
export function pager ({ total, limit, offset, base }) {
  if (total <= limit) return ''
  const url = (o) => `${base}${base.includes('?') ? '&' : '?'}offset=${o}`
  const prev = offset > 0 ? `<a class="pill" data-component="button" href="${attr(url(Math.max(0, offset - limit)))}">← Previous</a>` : '<span></span>'
  const next = offset + limit < total ? `<a class="pill" data-component="button" href="${attr(url(offset + limit))}">Next →</a>` : '<span></span>'
  return `<nav class="pager" aria-label="Pagination">
    ${prev}
    <span class="muted t-14">${offset + 1}–${Math.min(offset + limit, total)} of ${total}</span>
    ${next}
  </nav>`
}
