/**
 * Volumetric sizing.
 *
 * The point of the volumetric engine is that you may reason about a very large opportunity
 * space without ever enumerating it, and must never publish it. This module therefore
 * computes the theoretical volume in closed form, and returns a *bounded* sample only when
 * one is explicitly asked for.
 *
 * Ported from `tools/laka_seo_engine.py`, including the 10,000-row sample cap and the
 * without-replacement index sampling used for spaces too large to enumerate.
 */

import { corpus } from '../corpus.js'
import { InputError } from './gates.js'

export const MAX_SAMPLE = 10_000

/** Deterministic PRNG, so the same seed returns the same sample across processes. */
function mulberry32 (seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Validate a `{ dimensions: { name: [values] } }` document. */
export function validateDimensions (document) {
  if (document == null || typeof document !== 'object' || Array.isArray(document)) {
    throw new InputError('The dimension document must be a JSON object.', 'dimensions')
  }
  const source = document.dimensions ?? document
  if (source == null || typeof source !== 'object' || Array.isArray(source)) {
    throw new InputError('`dimensions` must be a JSON object of name → array of values.', 'dimensions')
  }
  const out = {}
  for (const [name, values] of Object.entries(source)) {
    if (!name) throw new InputError('Every dimension name must be a non-empty string.', 'dimensions')
    if (!Array.isArray(values) || values.length === 0) {
      throw new InputError(`Dimension "${name}" must be a non-empty array.`, `dimensions.${name}`)
    }
    out[name] = values
  }
  if (!Object.keys(out).length) throw new InputError('At least one dimension is required.', 'dimensions')
  return out
}

/**
 * The product of the dimension sizes.
 *
 * Returned as an exact integer where JavaScript can represent one, and always as a decimal
 * string as well — the twelve published dimension families multiply past 2^53.
 */
export function theoreticalVolume (dimensions) {
  const lengths = Object.values(dimensions).map((v) => v.length)
  const exact = lengths.reduce((acc, n) => acc * BigInt(n), 1n)
  const asNumber = Number(exact)
  return {
    exact: exact.toString(),
    approximate: asNumber,
    is_exact_in_double: Number.isSafeInteger(asNumber)
  }
}

/** Draw `count` distinct combinations without enumerating the space. */
export function boundedSample (dimensions, count, seed = 42) {
  if (!Number.isInteger(count) || count < 0) throw new InputError('`sample` must be a non-negative integer.', 'sample')
  if (count > MAX_SAMPLE) {
    throw new InputError(`\`sample\` is capped at ${MAX_SAMPLE.toLocaleString('en-US')}; requested ${count.toLocaleString('en-US')}.`, 'sample')
  }
  if (count === 0) return []

  const names = Object.keys(dimensions)
  const lengths = names.map((n) => dimensions[n].length)
  const total = lengths.reduce((acc, n) => acc * BigInt(n), 1n)
  const target = BigInt(count) < total ? count : Number(total)
  const rng = mulberry32(seed)

  // Small spaces: enumerate, shuffle, take. Guarantees uniqueness and full coverage.
  if (total <= BigInt(MAX_SAMPLE)) {
    const rows = []
    const build = (i, acc) => {
      if (i === names.length) { rows.push({ ...acc }); return }
      for (const value of dimensions[names[i]]) build(i + 1, { ...acc, [names[i]]: value })
    }
    build(0, {})
    for (let i = rows.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [rows[i], rows[j]] = [rows[j], rows[i]]
    }
    return rows.slice(0, target)
  }

  // Large spaces: draw distinct index tuples. Never materialises the Cartesian product.
  const seen = new Set()
  const out = []
  while (out.length < target) {
    const idx = lengths.map((len) => Math.floor(rng() * len))
    const key = idx.join(',')
    if (seen.has(key)) continue
    seen.add(key)
    out.push(Object.fromEntries(names.map((n, i) => [n, dimensions[n][idx[i]]])))
  }
  return out
}

/**
 * Size a volumetric space, and optionally sample it.
 *
 * @param {object} body { dimensions, sample?, seed?, use_published_dimensions? }
 */
export function sizeVolume (body = {}) {
  const usePublished = body.use_published_dimensions === true
  const dimensions = usePublished
    ? Object.fromEntries(corpus.dimensionFamilies.map((f) => [f.id, f.values]))
    : validateDimensions(body)

  const volume = theoreticalVolume(dimensions)
  const sample = Number.isInteger(body.sample) ? body.sample : 0
  const seed = Number.isInteger(body.seed) ? body.seed : 42

  const result = {
    source: usePublished ? 'published_dimension_families' : 'request',
    dimension_count: Object.keys(dimensions).length,
    dimensions: Object.fromEntries(Object.entries(dimensions).map(([k, v]) => [k, v.length])),
    theoretical_volume: volume,
    warning: 'Theoretical volume is an analysis space, not a publishing target. Cluster by task, assign one canonical owner, and apply all eight hard gates before anything is published.',
    governance: corpus.dimensions.safe_scale ?? []
  }

  if (sample > 0) {
    result.sample_size = sample
    result.seed = seed
    result.sample = boundedSample(dimensions, sample, seed)
    result.sample_note = `A bounded, deterministic sample of ${result.sample.length} combinations. It is an inspection aid, not an approved publishing plan.`
  }

  return result
}
