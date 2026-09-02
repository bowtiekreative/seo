# LAKA SEO Grammar System

Documentation site and JSON API for the LAKA SEO Grammar System — 144 decision rules, eight
hard publication gates, and an engine that runs them.

Production: **https://seosystem.bowtiekreative.com**
Sibling system: [writingsystem.bowtiekreative.com](https://writingsystem.bowtiekreative.com)

## What this is

The system converts SEO from a loose checklist into a formal, measurable operating language.
Two ideas carry the whole thing.

**SEO business value is a product, not a sum.**

```text
SEO BUSINESS VALUE
= VALUABLE DEMAND
× TECHNICAL ELIGIBILITY
× INTENT FIT
× INFORMATION ADVANTAGE
× DISCOVERABILITY
× PROMINENCE
× SEARCH-RESULT RESPONSE
× CONVERSION EFFICIENCY
× CONTRIBUTION MARGIN
× LEARNING VELOCITY
```

Because the terms multiply, a near-zero factor neutralises the rest. Work the weakest link,
not the factor that is easiest to improve.

**Volumetric generation is an analysis technique, not a publishing plan.** Generate broadly
across independent dimensions, normalise, cluster by task, assign exactly one canonical
owner, apply all eight hard gates, and publish the smallest set of assets covering the
largest amount of valuable demand. The twelve published dimension families describe
11,555,086,233,600 theoretical combinations. None of them is a page until it passes the gates.

## The engine does not guess

Where a decision depends on a fact the caller has not supplied, the response names the
missing fact rather than assuming a value.

- `POST /v1/evaluate` — a missing hard gate is a `400`, never an implied pass.
- `POST /v1/cluster` — an unknown condition returns `TEST` (one provisional cluster and an
  observation), never a second page.
- `POST /v1/equation` — an unscored factor is reported as unknown, not treated as `1`.
- `POST /v1/validate` — schema conformance and completeness advisories are reported
  separately, because a document can be schema-valid and still fail the measurement gate.

`GET /v1/engine/spec` states what each endpoint requires.

## Layout

```text
instructions/laka-seo-grammar-system/   the authored source package — the source of truth
scripts/build-corpus.mjs                parses it into the machine-readable corpus
data/laka-seo-grammar-system/           the generated corpus the server loads at boot
  source/                               the authored package copied byte for byte
server/
  corpus.js                             loads the corpus and builds every index
  engine/gates.js                       the eight hard gates and the priority score
  engine/volume.js                      volumetric sizing and bounded sampling
  engine/cluster.js                     the one-page rule, and the LAKA change matrix
  engine/resolve.js                     rule resolution, project validation, experiments
  routes/api.js                         the /v1 JSON API
  routes/site.js                        the server-rendered pages
  views/                                layout, components and page templates
  openapi.js                            OpenAPI 3.1, built from the live corpus
public/laka.css                         the LAKA design system stylesheet
test/engine.test.js                     40 tests
```

### The corpus is generated, not hand-written

`scripts/build-corpus.mjs` parses the ten markdown documents, the 144-rule JSON library, the
project JSON Schema and the templates into the numbered corpus the server reads. Nothing in
it is invented: every record is either copied verbatim or derived by a rule stated in that
script, and each carries a `source` pointer back to the document and heading it came from.

The build asserts the counts it expects (144 rules, 12 areas, 8 gates, 5 levels, 12 dimension
families, 14 SOPs, 11 phases, 10 commands, 12 formulas) and **fails** if the source stops
producing them — so a change to the source package cannot silently reshape the API.

One thing the build repairs: the shipped JSON rule library has `rationale: ""` on every rule,
while document 04 states a **Reason** for each. The build recovers it by rule id, so the API
serves complete records.

```bash
npm run build:corpus
```

Re-run it after editing anything under `instructions/`, and commit the result — `data/` is
what ships in the image.

## Running it

```bash
npm install
npm run build:corpus     # only needed after changing the source package
npm start                # http://localhost:3000
npm test
```

Configuration is in `.env.example`. `PUBLIC_ORIGIN` is the only setting that matters in
production — it drives canonical URLs, Open Graph tags, the sitemap and `llms.txt`.

## Deploying

Docker Compose with Traefik labels for the Dokploy host:

```bash
docker compose up -d --build
```

The image runs unprivileged, writes nothing to disk, and health-checks `/v1/health`.

## Design and accessibility

The site is built on the [LAKA design system](https://designsystem.bowtiekreative.com). The
header follows the four-element nav contract exactly — canonical seal, uppercase site name
with the second word in accent, one MENU pill, one CTA pill, and no inline navigation links.

Every page is server-rendered and works with JavaScript switched off: the mega menu is a
native `<details>`, the rule filters are a GET form, and each of the seven engine pages is a
POST form whose result renders server-side. That is what makes them accessible, and it is
also what makes them indexable.

Colour is never the only signal — every badge and verdict carries a text label and a
monospace mark alongside its colour.

### Release-gate evidence

`POST /v1/audit/site` against the LAKA full-site gate (WCAG 2.2 AA + technical SEO + OWASP
headers), all 100 pages:

| Audit | Findings | Blockers | Escalations |
|---|---|---|---|
| First | 285 | 0 | 0 |
| After fixes | 216 | 0 | 0 |
| Current | 205 | 0 | 0 |

Cleared: table captions (18), autocomplete purpose (43), card and button component contracts
(17), autofocus (1), meta-description quality (1).

Two categories are left open **deliberately**, and both are decisions rather than oversights:

- `design-system.shared-js-missing` (100) — the site loads its own 65-line script rather than
  the shared LAKA bundle. The bundle is not needed for a site whose only client-side behaviour
  is scroll reveal and menu handling.
- `analytics.missing` (96) and `analytics.form-events` (9) — there is no analytics
  instrumentation anywhere, which is exactly what the privacy page promises. Adding a hook to
  satisfy the check would make that page untrue.

The verdict is `REVIEW_REQUIRED` rather than `CLEAR` because the gate also requires signed
evidence for 17 manual checks — keyboard traversal, screen-reader passes, rendered-state
contrast, reflow at 200%, and legal review among them. Automated output alone never proves
WCAG conformance, and this README does not claim it does.

## Privacy

No cookies, no analytics, no third-party trackers. What you submit to an engine endpoint is
evaluated in memory and discarded; nothing is written to disk or retained.

---

Original synthesis of the ClickMinded SEO course into a LAKA decision and measurement system.
Source course material remains the property of its authors.
[Bow Tie Kreative](https://bowtiekreative.com)
