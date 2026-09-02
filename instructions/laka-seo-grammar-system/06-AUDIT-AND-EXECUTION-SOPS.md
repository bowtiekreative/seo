# 06 — Audit and Execution SOPs

## SOP 1 — Establish the SEO measurement foundation

### Goal

Create a trustworthy chain from search visibility to contribution margin.

### Steps

1. List offers, audiences, and qualified value events.
2. Define contribution margin or provisional value bands.
3. Verify Search Console and analytics access.
4. Define organic landing and task events.
5. connect leads/sales to CRM or commerce records where possible.
6. classify branded and non-branded demand.
7. create a change ledger.
8. record data limitations.
9. build the five-metric executive dashboard.
10. run a test transaction and verify the complete chain.

### Pass rule

```text
PASS
IF search exposure
AND landing
AND task event
AND qualified outcome
AND value
can be connected at an acceptable confidence level.
```

---

## SOP 2 — Build the semantic demand graph

### Inputs

```text
offers
customer interviews/calls
sales objections
support questions
site search
Search Console
paid-search terms
competitor visibility
industry entities
```

### Steps

1. Define the parent concept and business boundary.
2. Generate subtypes, entities, attributes, relations, problems, causes, solutions, comparisons, and questions.
3. Attach audience and journey states.
4. collect observed query language.
5. normalize synonyms and variants.
6. mark homonyms and exclusions.
7. attach demand evidence and source confidence.
8. attach possible task formats.
9. export candidates for clustering.

### Output

`semantic-demand-inventory`

---

## SOP 3 — Cluster queries and assign canonical ownership

### Steps

1. Group same-sense lexical variants.
2. identify the dominant task for each query.
3. compare answer structure and result class.
4. inspect current result overlap as supporting evidence.
5. merge same-task queries.
6. split different completion conditions.
7. assign one intended canonical URL.
8. map existing URLs to clusters.
9. flag missing pages, duplicate owners, and uncertain boundaries.
10. record exclusions and supporting questions.

### Decision

```text
same sense
AND same task
AND compatible answer
AND compatible next action
→ same cluster

different task
OR different sense
OR different necessary format
→ separate cluster
```

---

## SOP 4 — Find high-value existing opportunities

### Steps

1. Export query-page data.
2. join business value and conversion data.
3. calculate cluster-level impressions, clicks, CTR residual, and value.
4. identify positions or visibility below potential.
5. identify pages with links/authority but weak intent alignment.
6. identify ranking pages with poor conversion.
7. identify converting pages with low visibility.
8. identify high-value pages with technical eligibility problems.
9. score opportunities by incremental value per effort.
10. select a bounded treatment portfolio.

### Priority logic

```text
measurement block
> eligibility block
> canonical conflict
> existing high-value response gap
> content/format gap
> authority gap
> new asset
```

---

## SOP 5 — Create a page specification

### Steps

1. Copy the page brief template.
2. state one dominant task.
3. define audience, condition, intent, and journey state.
4. list same-intent queries and exclusions.
5. choose canonical URL and page type.
6. define the direct answer.
7. map required entities, attributes, and relations.
8. choose the task-appropriate format.
9. define evidence and media.
10. define links in and out.
11. define next action.
12. define primary metric, guardrails, refresh trigger, and owner.

### Gate

```text
IF any required field is unknown
THEN mark it as a research question
AND do not silently invent it.
```

---

## SOP 6 — Optimize an existing page with LAKA

### Baseline

- record query mix;
- verify canonical/index state;
- measure current CTR, task completion, conversion, and value;
- inspect current result classes and competitors;
- map content/evidence gaps;
- map internal and external graph position.

### Minor candidates

- title;
- snippet;
- direct answer;
- heading;
- anchor;
- CTA;
- image optimization.

### Major candidates

- rewrite;
- new evidence;
- comparison;
- calculator;
- video;
- decision tree;
- accessibility improvement.

### Structural candidates

- merge/split;
- template;
- hub;
- internal graph;
- canonical/facet repair;
- conversion data pipeline.

### Paradigm candidates

- new information product;
- proprietary benchmark;
- free diagnostic;
- verified directory;
- agent-operable workflow.

### Selection

Choose the lowest LAKA level capable of affecting the diagnosed failure.

---

## SOP 7 — Resolve cannibalization

### Detection

Flag clusters with:

```text
multiple ranking URLs
AND unstable dominant URL
OR divided links
OR wrong landing page
OR lower conversion from the winning URL
```

### Options

```text
MERGE
if task and answer substantially overlap.

REPOSITION
if the weaker page has a valid adjacent task.

KEEP BOTH
if tasks are distinct and behavior is healthy.

RETIRE
if the weak page has no value, dependencies, or equity.
```

### Migration steps

1. choose canonical winner;
2. combine unique useful information;
3. preserve required evidence and media;
4. redirect when the old URL should disappear;
5. update internal links;
6. update sitemap and canonical signals;
7. observe impressions, dominant share, links, and value;
8. rollback or refine if material loss occurs.

---

## SOP 8 — Build a useful internal graph

### Steps

1. list priority canonical pages.
2. calculate orphan state and click depth.
3. classify page relationships.
4. create understanding, choice, journey, and authority edges.
5. use crawlable links and descriptive anchors.
6. add hubs only where path selection is useful.
7. link strong pages to high-value targets where contextually appropriate.
8. remove irrelevant or repetitive link clutter.
9. update links after migrations.
10. measure discovery, path use, visibility, and conversion.

---

## SOP 9 — Technical eligibility audit

### Ordered checks

1. intended search state;
2. public accessibility;
3. HTTP status;
4. rendered main content and links;
5. robots and index directives;
6. declared and selected canonical;
7. duplicate/facet behavior;
8. internal discovery and depth;
9. sitemap correctness;
10. mobile/content parity;
11. field performance;
12. structured data eligibility;
13. international/local signals;
14. security/manual-action issues.

### Value ranking

For every issue:

```text
Affected priority URLs
× affected demand/value
× probability of blocking or degrading visibility
÷ repair effort and risk
```

Fix business-blocking defects before generic audit-score improvements.

---

## SOP 10 — Authority and earned-evidence campaign

### Steps

1. choose a target cluster and business goal.
2. diagnose the authority/evidence gap.
3. define a linkable reason.
4. select or build the evidence asset.
5. identify relevant audiences and publishers.
6. segment prospects by reason to care.
7. create truthful outreach.
8. record placement type and destination.
9. monitor retained links, brand demand, target visibility, and value.
10. refresh or compound successful evidence assets.

---

## SOP 11 — Volumetric page-generation audit

### Use before programmatic publishing

For every proposed template row, verify:

```text
distinct task
AND unique accurate data
AND real user utility
AND one canonical role
AND local/product eligibility
AND internal path
AND quality ownership
AND refresh mechanism
AND measurable value
```

### Sampling

1. inspect random rows;
2. inspect highest- and lowest-data rows;
3. inspect duplicate-risk rows;
4. inspect missing-data behavior;
5. inspect stale-data behavior;
6. inspect generated titles/descriptions;
7. inspect canonical and facet behavior;
8. inspect mobile/accessibility;
9. inspect conversion continuity;
10. inspect index and maintenance capacity.

### Launch

Use staged cohorts. Do not release the full theoretical volume at once.

---

## SOP 12 — Monthly portfolio review

1. update all business and diagnostic data.
2. review technical eligibility by value.
3. review cluster ownership and cannibalization.
4. review existing opportunities.
5. review new demand.
6. review authority and evidence.
7. review experiments and guardrails.
8. update opportunity scores.
9. choose continue, expand, revise, reverse, escalate, retire, or monitor.
10. rebalance the portfolio under capacity.

---

## SOP 13 — Content refresh or retirement

### Refresh

```text
IF demand remains valuable
AND facts/format/evidence are stale
AND improvement value exceeds cost
THEN refresh.
```

### Consolidate

```text
IF several assets overlap
AND one stronger canonical can cover the task
THEN merge and migrate.
```

### Retire

```text
IF the page has no distinct task
AND no meaningful demand, value, links, or dependency
THEN retire with the appropriate technical state.
```

### Preserve

```text
IF the page serves a valid user need despite low search traffic
THEN preserve it
AND do not judge it only by SEO metrics.
```

---

## SOP 14 — Generative-search readiness

1. ensure valuable content is public, crawlable, indexable, and snippet-eligible where intended.
2. map broad tasks and their supporting information needs.
3. add firsthand experience, original data, evidence, and useful media.
4. avoid creating a page for every query fan-out variation.
5. avoid unsupported AI-specific markup or assumed special files.
6. expose freshness, provenance, and limitations when relevant.
7. make controls, labels, content, and data understandable to humans, assistive technology, and browser agents.
8. measure generative search appearances and downstream value when first-party reporting is available.
9. apply the same spam, quality, privacy, and legal governance as ordinary search.
10. test paradigm assets that let users or agents complete real tasks.
