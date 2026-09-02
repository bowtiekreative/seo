import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'

import apiRoutes from './routes/api.js'
import siteRoutes from './routes/site.js'
import { ASSET_BY_URL } from './assets.js'
import { corpus } from './corpus.js'

const here = dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT ?? 3000)
const HOST = process.env.HOST ?? '0.0.0.0'

const app = Fastify({
  logger: { level: process.env.LOG_LEVEL ?? 'info' },
  trustProxy: true,
  bodyLimit: 2_097_152
})

// The engine pages post plain HTML forms, so they must work without JavaScript.
app.addContentTypeParser('application/x-www-form-urlencoded', { parseAs: 'string' }, (req, body, done) => {
  try {
    const out = {}
    for (const [k, v] of new URLSearchParams(body)) out[k] = v
    done(null, out)
  } catch (err) {
    done(err)
  }
})

await app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['content-type']
})

/**
 * Security headers on every response.
 *
 * The site loads its own fingerprinted CSS and JS, Google Fonts, and the brand assets from
 * the design-system CDN — nothing else, so the policy can be tight. Inline style attributes
 * appear in the markup, hence 'unsafe-inline' for styles only; scripts have no such
 * allowance and no inline script is used.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' https://designsystem.bowtiekreative.com data:",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests'
].join('; ')

app.addHook('onSend', async (req, reply, payload) => {
  reply.header('content-security-policy', CSP)
  reply.header('strict-transport-security', 'max-age=31536000; includeSubDomains')
  reply.header('x-content-type-options', 'nosniff')
  reply.header('x-frame-options', 'DENY')
  reply.header('referrer-policy', 'strict-origin-when-cross-origin')
  reply.header('permissions-policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=(), interest-cohort=()')
  reply.header('cross-origin-opener-policy', 'same-origin')
  reply.header('x-robots-tag', 'index, follow')
  return payload
})

// Fingerprinted CSS and JS, served immutable. Registered as explicit routes so they cannot
// shadow anything else.
for (const asset of ASSET_BY_URL.values()) {
  app.get(asset.url, async (req, reply) => reply
    .type(asset.type)
    .header('cache-control', 'public, max-age=31536000, immutable')
    .header('etag', `"${asset.hash}"`)
    .send(asset.body))
}

await app.register(fastifyStatic, {
  root: join(here, '..', 'public'),
  prefix: '/',
  index: false,
  decorateReply: false,
  maxAge: '1h'
})

await app.register(apiRoutes)
await app.register(siteRoutes)

app.setErrorHandler((err, req, reply) => {
  req.log.error({ err }, 'request failed')
  const code = err.statusCode ?? 500
  if (req.url.startsWith('/v1/')) {
    return reply.code(code).send({
      error: code === 500 ? 'internal_error' : 'request_error',
      message: code === 500 ? 'Internal error.' : err.message
    })
  }
  return reply.code(code).type('text/html; charset=utf-8')
    .send(`<!doctype html><meta charset="utf-8"><title>Error</title><p>${code}</p>`)
})

try {
  await app.listen({ port: PORT, host: HOST })
  app.log.info(
    { rules: corpus.rules.length, gates: corpus.hardGates.length, documents: corpus.documents.length },
    `seo system api listening on ${HOST}:${PORT}`
  )
} catch (err) {
  app.log.error(err)
  process.exit(1)
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, async () => {
    app.log.info(`${signal} received, closing`)
    await app.close()
    process.exit(0)
  })
}
