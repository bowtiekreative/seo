# SEO LAKA Complete Guide

**Version 1.0**

This single file combines the human-readable core of the package. Machine-readable files, standalone templates, code, and the technical appendix remain separate.

## Contents

1. [01 — SEO LAKA Grammar](#01--seo-laka-grammar)
2. [02 — LAKA SEO Strategy Guide](#02--laka-seo-strategy-guide)
3. [03 — Volumetric SEO Engine](#03--volumetric-seo-engine)
4. [04 — IF / ELSE / AND / OR SEO Rulebook](#04--if--else--and--or-seo-rulebook)
5. [05 — Measurement and Experiment System](#05--measurement-and-experiment-system)
6. [06 — Audit and Execution SOPs](#06--audit-and-execution-sops)
7. [07 — Page and Cluster Templates](#07--page-and-cluster-templates)
8. [08 — Agent Operating Prompt](#08--agent-operating-prompt)
9. [09 — Implementation Backlog](#09--implementation-backlog)
10. [10 — Course Crosswalk and Sources](#10--course-crosswalk-and-sources)
11. [Worked Example — WebDevCalgary.com](#worked-example--webdevcalgarycom)

---



---

<!-- Source file: 01-SEO-LAKA-GRAMMAR.md -->

# 01 — SEO LAKA Grammar

## 1. Purpose

A grammar defines the valid parts of a language and the rules for combining them. The SEO LAKA Grammar defines:

- what an SEO object is;
- which properties must be attached to it;
- which relationships can connect objects;
- which logical operations create valid decisions;
- how a strategy changes across the five LAKA levels;
- how every action becomes measurable.

SEO work is treated as a language that produces **retrieval systems, information products, customer journeys, and business outcomes**.

---

## 2. The seven layers of the language

```text
LAYER 1 — BUSINESS LANGUAGE
Goal, value, offer, margin, risk, capacity

LAYER 2 — AUDIENCE LANGUAGE
Segment, role, awareness, sophistication, urgency, constraints

LAYER 3 — SEMANTIC LANGUAGE
Concept, entity, attribute, relation, question, query, intent, task

LAYER 4 — DOCUMENT LANGUAGE
Asset, page type, answer structure, evidence, media, canonical destination

LAYER 5 — GRAPH LANGUAGE
Internal link, external citation, parent, child, sibling, hub, pathway

LAYER 6 — RETRIEVAL LANGUAGE
Discover, crawl, render, canonicalize, index, retrieve, display

LAYER 7 — OUTCOME LANGUAGE
Impression, click, task completion, lead, sale, margin, retention, learning
```

A valid strategy must connect all seven layers. A keyword list that does not connect to an audience, asset, graph position, and outcome is an incomplete sentence.

---

## 3. Primitive object classes

### 3.1 Business objects

| Primitive | Meaning | Required properties |
|---|---|---|
| `BUSINESS` | Organization receiving value | model, geography, capacity |
| `GOAL` | Desired business state | metric, baseline, target, horizon |
| `OFFER` | Exchange presented to a user | audience, price/value, margin |
| `VALUE_EVENT` | Event that produces measurable value | event name, value, qualification rule |
| `CONSTRAINT` | Limit on valid strategies | budget, policy, capacity, risk |
| `RESOURCE` | Asset available to execute | people, data, technology, time |

### 3.2 Audience objects

| Primitive | Meaning | Required properties |
|---|---|---|
| `AUDIENCE` | A meaningful user segment | need, language, geography |
| `PERSONA` | Operational representation of a segment | context, goal, barriers |
| `JOURNEY_STATE` | Relationship state with the business | awareness, evaluation, decision, use, retention |
| `PROBLEM` | Undesired state | severity, urgency, frequency |
| `DESIRE` | Desired state | value, urgency, evidence of demand |
| `TASK` | What the user is trying to accomplish | verb, object, completion condition |
| `INTENT` | Why the task is being performed now | informational, comparative, transactional, navigational, local, support |

### 3.3 Semantic objects

| Primitive | Meaning | Example |
|---|---|---|
| `CONCEPT` | General idea or class | web design |
| `ENTITY` | Distinct named thing | Calgary, WordPress, Google |
| `PARENT` | Broader concept | digital marketing |
| `SUBTYPE` | Narrower type | ecommerce web design |
| `SYNONYM` | Near-equivalent expression | website designer / web designer |
| `VARIANT` | Morphological or orthographic form | website / web site |
| `ATTRIBUTE` | Descriptive dimension | price, speed, accessibility |
| `VALUE` | Attribute state | under $5,000, fast, WCAG conformant |
| `RELATION` | Typed connection | service LOCATED-IN Calgary |
| `QUESTION` | Explicit information gap | how much does a website cost? |
| `QUERY` | Observed search expression | Calgary web design prices |
| `QUERY_CLUSTER` | Queries sharing one dominant task | cost-intent cluster |
| `EXCLUSION` | Wrong sense, audience, or task | jobs, salary, course |

### 3.4 Document objects

| Primitive | Meaning |
|---|---|
| `ASSET` | Any retrievable content or tool |
| `CANONICAL_ASSET` | Intended primary destination for an intent cluster |
| `SUPPORTING_ASSET` | Asset answering an adjacent task and supporting a canonical asset |
| `PAGE_TYPE` | Service, product, category, guide, comparison, calculator, template, location, case study, glossary, FAQ |
| `FORMAT` | Text, table, video, image, tool, dataset, map, interactive, downloadable |
| `EVIDENCE` | Firsthand experience, data, test, citation, case study, demonstration |
| `NEXT_ACTION` | Logical transition after the task is served |
| `SEARCH_APPEARANCE` | Web result, image, video, local result, product result, rich result, generative citation |

### 3.5 Graph objects

| Primitive | Meaning |
|---|---|
| `NODE` | A page, entity, cluster, or asset in a graph |
| `EDGE` | A typed connection between nodes |
| `INTERNAL_LINK` | Crawlable relationship between owned pages |
| `EXTERNAL_LINK` | Citation or navigation to another site |
| `BACKLINK` | External edge pointing to an owned asset |
| `HUB` | Page that organizes a coherent topic or task family |
| `PATH` | Ordered sequence from entry to task completion or conversion |
| `ORPHAN` | Important page without a useful internal path |
| `CANONICAL_SET` | Duplicate or near-duplicate URLs represented by one preferred URL |

### 3.6 Retrieval states

```text
DISCOVERED
→ FETCHED
→ RENDERED
→ CANONICALIZED
→ INDEXED
→ RETRIEVED
→ DISPLAYED
→ VISITED
→ COMPLETED
→ CONVERTED
```

These are separate states. “Indexed” must never be used as a synonym for all of them.

---

## 4. Relation vocabulary

Use typed relations rather than a flat bag of keywords.

```text
IS_A
PART_OF
HAS_ATTRIBUTE
HAS_VALUE
LOCATED_IN
USED_BY
REQUIRES
CAUSES
PREVENTS
SOLVES
PRODUCES
MEASURED_BY
COMPARED_WITH
ALTERNATIVE_TO
COMPATIBLE_WITH
INCOMPATIBLE_WITH
EVIDENCED_BY
AUTHORED_BY
OFFERED_BY
PRECEDES
FOLLOWS
LINKS_TO
SUPPORTS
CANONICALIZES_TO
CONVERTS_TO
RETAINS
EXCLUDES
```

Examples:

```text
WEB_DESIGN IS_A PROFESSIONAL_SERVICE
WEB_DESIGN HAS_ATTRIBUTE PRICE
CALGARY_WEB_DESIGN LOCATED_IN CALGARY
WCAG_AUDIT PREVENTS ACCESSIBILITY_RISK
CASE_STUDY EVIDENCED_BY FIRST_PARTY_ANALYTICS
COST_GUIDE SUPPORTS CALGARY_WEB_DESIGN_SERVICE
FILTER_URL CANONICALIZES_TO CATEGORY_URL
ORGANIC_SESSION CONVERTS_TO QUALIFIED_ASSESSMENT
```

The relation determines the needed content structure. `COMPARED_WITH` often requires a comparison table. `HOW_TO` requires an ordered procedure. `LOCATED_IN` may require local evidence. `EVIDENCED_BY` requires visible proof.

---

## 5. Logical operators

### 5.1 AND — mandatory conjunction

Use `AND` when all conditions are necessary.

```text
PUBLISH
IF demand_is_evidenced
AND intent_is_distinct
AND business_fit_is_positive
AND information_advantage_exists
AND asset_is_maintainable
AND measurement_is_installed
```

A failed mandatory condition blocks publication or sends the candidate to research.

### 5.2 OR — valid alternatives

Use `OR` when several different forms can satisfy the same requirement.

```text
EVIDENCE
=
firsthand_experience
OR original_data
OR reproducible_test
OR qualified_expert_review
OR documented_case_study
```

`OR` does not mean “include everything.” It means choose one or more valid alternatives according to the task.

### 5.3 XOR — exactly one

Use `XOR` when only one choice can be canonical.

```text
FOR EACH dominant_intent_cluster:
    existing_url XOR new_url XOR merged_url
    MUST be the intended canonical destination
```

### 5.4 NOT — explicit exclusion

```text
TARGET_CLUSTER
=
candidate_queries
NOT jobs
NOT salaries
NOT unrelated_brand
NOT wrong_geography
NOT wrong_language
```

### 5.5 IF / THEN / ELSE — branching decision

```text
IF same_task
AND same_answer_structure
AND same_result_format
AND same_next_action
THEN merge_into_one_canonical_asset
ELSE split_or_test
```

### 5.6 FOR EACH — controlled scale

```text
FOR EACH approved_location
AND FOR EACH approved_service
GENERATE candidate_location_service_page
```

This creates candidates, not automatic publication.

### 5.7 UNTIL — optimization loop

```text
REPEAT diagnose → change → observe → decide
UNTIL:
    target_is_reached
    OR expected_value_falls_below_cost
    OR constraint_is_triggered
```

### 5.8 AT LEAST / AT MOST / EXACTLY

```text
AT_LEAST 1 useful internal link points to every priority canonical page
AT_MOST 1 dominant intent owns a canonical URL
EXACTLY 1 primary KPI governs an experiment
```

---

## 6. The canonical SEO sentence

```text
SEO_SENTENCE ::=
GOAL
FOR AUDIENCE
IN JOURNEY_STATE
UNDER CONDITIONS
SEEKING TASK
WITH INTENT
ABOUT CONCEPT_OR_ENTITY
USING QUERY_CLUSTER
SERVED_BY CANONICAL_ASSET
IN FORMAT
SUPPORTED_BY EVIDENCE
CONNECTED_BY GRAPH
LEADING_TO NEXT_ACTION
MEASURED_BY PRIMARY_METRIC
GUARDED_BY CONSTRAINTS
```

### Compact notation

```text
G → A:C:T:I:Q → D:F:E → L → N → M | X
```

Where:

- `G` = goal
- `A` = audience
- `C` = conditions
- `T` = task
- `I` = intent
- `Q` = query cluster
- `D` = document
- `F` = format
- `E` = evidence
- `L` = link graph
- `N` = next action
- `M` = metric
- `X` = constraints

Example:

```text
Increase qualified assessments
FOR Calgary small-business owners
UNDER active website redesign consideration
SEEKING compare-agencies
WITH commercial-investigation intent
ABOUT Calgary web design providers
USING the agency-comparison query cluster
SERVED BY /calgary-web-design-companies/
IN a scored comparison + decision guide
SUPPORTED BY disclosed criteria + firsthand audits
CONNECTED BY links from cost, process, and case-study nodes
LEADING TO a website assessment
MEASURED BY qualified assessment contribution margin
GUARDED BY neutrality, disclosure, and lead-quality constraints.
```

---

## 7. Query-cluster grammar

A query is decomposed into semantic slots:

```text
QUERY
=
[ACTOR?]
+ [TASK_VERB?]
+ [OBJECT]
+ [RELATION?]
+ [ATTRIBUTE?]
+ [ATTRIBUTE_VALUE?]
+ [GEOGRAPHY?]
+ [TIME?]
+ [FORMAT?]
+ [TRANSACTION_MODIFIER?]
```

Examples:

```text
small business + hire + web designer + in + Calgary
compare + WordPress + with + Webflow + for + consultants
calculate + website cost + in + Canada + 2026
fix + slow WordPress site + without + changing host
```

### Query normalization

```text
NORMALIZED_QUERY_CLUSTER
=
same sense
AND same dominant task
AND compatible answer structure
AND compatible journey state
AND compatible next action
```

Synonyms, word order, pluralization, abbreviations, and stems are usually lexical variants within one cluster—not separate pages.

### Split rule

Split a cluster when one or more of the following is materially different:

```text
different task
OR different sense
OR different audience constraint
OR different geography with real local evidence
OR different product/service
OR different expected result type
OR different answer structure
OR different conversion path
OR different legal/risk context
```

### Merge rule

Merge pages when:

```text
same dominant task
AND substantial result overlap
AND no independently valuable answer
AND combined asset improves completeness
AND redirect/canonical migration risk is acceptable
```

---

## 8. Page grammar

```text
PAGE
=
PROMISE
+ DIRECT_ANSWER
+ TASK_STRUCTURE
+ EVIDENCE
+ DECISION_SUPPORT
+ NEXT_ACTION
+ MACHINE_SIGNALS
+ GRAPH_CONNECTIONS
```

### Required page clauses

1. **Promise:** What task will this page help complete?
2. **Direct answer:** Give the essential answer early.
3. **Task structure:** Use the form the task requires.
4. **Evidence:** Show why the answer should be trusted.
5. **Decision support:** Resolve trade-offs, objections, and edge cases.
6. **Next action:** Offer the next logical state, not an unrelated conversion.
7. **Machine signals:** Clear title, headings, canonical, status, metadata, and structured data when eligible.
8. **Graph connections:** Link to prerequisite, supporting, alternative, and next-step nodes.

### Format-selection grammar

```text
IF intent = compare
THEN use table OR matrix OR scored decision framework

IF intent = calculate
THEN use calculator OR formula + worked examples

IF intent = locate
THEN use map OR directory OR location page with verifiable local evidence

IF intent = learn_process
THEN use ordered steps + prerequisites + checkpoints

IF intent = diagnose
THEN use symptom → cause → test → remedy decision tree

IF intent = choose
THEN use criteria → options → trade-offs → recommendation

IF intent = verify
THEN use claim → evidence → source → limitation

IF intent = transact
THEN use offer → proof → scope → price/process → action

IF intent = explore
THEN use hub → categories → paths → filters
```

---

## 9. Internal-link grammar

An internal link is a typed edge, not decoration.

```text
INTERNAL_LINK
=
SOURCE_NODE
+ RELATION
+ DESCRIPTIVE_ANCHOR
+ TARGET_NODE
+ USER_REASON
```

Valid edge types:

```text
prerequisite_of
definition_of
example_of
evidence_for
comparison_to
alternative_to
step_before
step_after
supports
converts_to
location_variant_of
service_variant_of
```

Rules:

```text
IF target_is_priority
THEN at_least_one crawlable_contextual_internal_link MUST exist

IF source_context_does_not_help_user_understand_target
THEN do_not_add_link

IF anchor_is_generic
AND a descriptive phrase is natural
THEN replace anchor

IF multiple_pages_compete_for_same_anchor_and_intent
THEN inspect canonical ownership before adding more links
```

---

## 10. The five LAKA change levels

### 10.1 Baseline

The system is observed without changing its structure.

```text
OBJECT: existing query, page, cluster, or site
ACTION: measure, inventory, classify
OUTCOME: trustworthy baseline
```

Typical SEO work:

- verify analytics and Search Console;
- map queries to URLs;
- record technical states;
- calculate current funnel and business value;
- identify uncertainty and missing data.

### 10.2 Minor change

Surface elements change while the object and mechanism stay mostly stable.

```text
Examples:
title wording
meta description
opening answer
anchor text
image compression
small internal-link addition
CTA wording
```

Primary question:

```text
Can a low-cost, reversible change improve response without changing intent?
```

### 10.3 Major change

The document or campaign is substantially improved, but its role remains stable.

```text
Examples:
rewrite the page
add original evidence
change format from prose to comparison table
build a video or calculator into the page
consolidate weak sections
launch a focused outreach campaign
```

### 10.4 Structural change

Relationships, architecture, ownership, or workflow change.

```text
Examples:
merge cannibalizing pages
redesign cluster architecture
change templates
repair faceted navigation
move from isolated pages to a hub graph
connect CRM value data to SEO reporting
```

### 10.5 Paradigm change

The class of solution changes.

```text
Examples:
replace a blog post with a free diagnostic tool
replace a static directory with a verified data product
turn service research into a benchmark index
build a proprietary dataset competitors cannot reproduce
make the website agent-operable, not merely readable
create demand rather than only capture existing demand
```

### Escalation rule

```text
START at Baseline.

IF diagnosis is high-confidence
AND minor intervention can affect the mechanism
THEN test Minor.

ELSE IF page value exists
AND information or format is inadequate
THEN apply Major.

ELSE IF multiple assets or systems create the failure
THEN apply Structural.

ELSE IF the result class itself cannot satisfy the task
OR a new information product creates a defensible advantage
THEN test Paradigm.
```

---

## 11. LAKA internal-variable sentence

Every proposed change must fill all ten variables.

| Variable | Required question |
|---|---|
| Object | What exactly is being changed? |
| Conditions | Under what audience, device, location, time, and competitive conditions? |
| Actions | What intervention will occur? |
| Tools | What mechanisms execute and observe it? |
| Resources | What data, people, systems, budget, and evidence are needed? |
| Outcomes | What immediate and downstream states should change? |
| Feedback | What evidence determines continue, revise, reverse, or escalate? |
| Constraints | What legal, quality, technical, capacity, and brand limits apply? |
| Value | For whom is value created, and how is it quantified? |
| Failure Mode | How can this intervention fail or create harm? |

Formal form:

```text
CHANGE
=
OBJECT
UNDER CONDITIONS
PERFORMS ACTION
USING TOOLS
WITH RESOURCES
TO PRODUCE OUTCOMES
OBSERVED_BY FEEDBACK
LIMITED_BY CONSTRAINTS
CREATING VALUE
WHILE MONITORING FAILURE_MODE
```

---

## 12. Fourteen-variable change descriptor

Attach these variables to every experiment or program.

| Variable | Suggested states |
|---|---|
| Magnitude | negligible, small, medium, large, transformational |
| Rate | immediate, fast, gradual, slow, unknown |
| Direction | positive, negative, mixed, neutral |
| Scope | element, page, cluster, template, site, market |
| Depth | copy, behavior, document, architecture, business model |
| Duration | transient, campaign, persistent, permanent |
| Frequency | once, periodic, event-driven, continuous |
| Acceleration | decaying, linear, compounding, volatile |
| Variability | low, moderate, high, unknown |
| Detectability | direct, proxy, modeled, latent |
| Reversibility | easy, moderate, difficult, irreversible |
| Propagation | isolated, linked, template-wide, site-wide, ecosystem |
| Amplification | none, internal graph, external citations, brand, network |
| Accumulation | none, episodic, stock-building, compounding |

Compact change signature:

```text
ΔSEO[
M=medium,
R=gradual,
D=positive,
S=cluster,
Dp=architecture,
Du=persistent,
F=once,
A=compounding,
V=moderate,
De=direct,
Re=moderate,
P=linked,
Am=internal_graph,
Ac=stock_building
]
```

---

## 13. Validity grammar

A candidate is valid only when:

```text
VALID_CANDIDATE
=
DEMAND_EVIDENCE
AND DISTINCT_TASK
AND BUSINESS_FIT
AND UNIQUE_OR_SUPERIOR_VALUE
AND TECHNICAL_FEASIBILITY
AND MAINTAINABILITY
AND MEASURABILITY
AND POLICY_COMPLIANCE
```

A page is valid only when:

```text
VALID_PAGE
=
ONE_DOMINANT_INTENT
AND ONE_INTENDED_CANONICAL
AND TASK_APPROPRIATE_FORMAT
AND VISIBLE_EVIDENCE
AND CLEAR_NEXT_ACTION
AND CRAWLABLE_PATH
AND INDEXABLE_WHEN_INTENDED
AND NO_MATERIAL_DUPLICATION
```

An experiment is valid only when:

```text
VALID_EXPERIMENT
=
HYPOTHESIS
AND MECHANISM
AND PRIMARY_METRIC
AND BASELINE
AND TREATMENT_SCOPE
AND OBSERVATION_WINDOW
AND DECISION_RULE
AND GUARDRAILS
```

---

## 14. Anti-grammar: invalid constructions

```text
keyword + keyword + keyword → page
```

Invalid because it omits audience, task, intent, value, format, and measurement.

```text
publish every location × service permutation
```

Invalid unless every approved page has distinct demand, accurate local evidence, useful content, maintainability, and a valid canonical role.

```text
rankings increased → SEO succeeded
```

Invalid unless the increase leads to valuable, qualified outcomes without unacceptable guardrail damage.

```text
tool score improved → user experience improved
```

Invalid unless field data or user/business outcomes confirm the mechanism.

```text
more pages OR more links OR more schema = better
```

Invalid. Volume without fit can increase cost, duplication, risk, and measurement noise.

---

## 15. The shortest complete command

```text
/seo
goal="<business outcome>"
audience="<segment>"
task="<job>"
intent="<why now>"
cluster="<same-intent query family>"
canonical="<one destination>"
format="<task-matched information product>"
evidence="<proof>"
next="<logical action>"
metric="<primary business measure>"
laka="<Baseline|Minor|Major|Structural|Paradigm>"
logic="<IF/AND/OR/ELSE rules>"
```

This command can be used by a human, automation, or agent.


---

<!-- Source file: 02-LAKA-SEO-STRATEGY-GUIDE.md -->

# 02 — LAKA SEO Strategy Guide

## 1. Strategy thesis

The best SEO strategy is not “produce more content.” It is to construct a measurable system that repeatedly does five things:

1. identifies valuable unresolved demand;
2. assigns each meaningful task to one intended canonical asset;
3. creates a superior information product for that task;
4. makes the asset discoverable, interpretable, credible, and connected;
5. learns from business outcomes and reallocates effort.

The operating loop is:

```text
OBSERVE
→ MODEL
→ GENERATE
→ FILTER
→ BUILD
→ CONNECT
→ PROMOTE
→ MEASURE
→ LEARN
→ ESCALATE OR STOP
```

---

## 2. North-star model

```text
INCREMENTAL ORGANIC CONTRIBUTION MARGIN
=
incremental qualified organic conversions
× average contribution margin
− attributable SEO operating cost
```

Rankings, impressions, clicks, links, and indexed pages are diagnostic states. They are not the final business result.

Use a small executive scorecard:

1. Incremental organic contribution margin
2. Qualified organic conversions
3. Value-weighted non-brand clicks
4. Value-weighted target-cluster visibility
5. Eligible canonical coverage

Everything else belongs to diagnostic dashboards.

---

## 3. Stage 0 — Define the business grammar

Before keyword research, define:

```text
WHO receives value?
WHAT outcome matters?
WHICH offer converts that value?
WHAT counts as qualified?
WHAT is one conversion worth in contribution margin?
WHAT capacity limits growth?
WHAT outcomes must not worsen?
```

### Business object card

```text
Business:
Offer:
Audience:
Geography:
Average contribution margin:
Qualified conversion event:
Capacity per month:
Primary constraint:
Primary guardrail:
```

### IF / ELSE rules

```text
IF value_event is undefined
THEN do not use traffic as the north-star metric.

IF contribution_margin is unknown
THEN use a provisional value band
AND mark all ROI outputs as forecasts.

IF fulfillment_capacity is constrained
THEN prioritize query clusters with higher lead quality
OR higher margin
rather than maximum traffic.

IF several offers serve different audiences
THEN create separate value models
ELSE aggregate reporting will hide quality differences.
```

---

## 4. Stage 1 — Establish measurement and eligibility

### Required measurement chain

```text
QUERY
→ IMPRESSION
→ CLICK
→ LANDING PAGE
→ TASK EVENT
→ NEXT ACTION
→ QUALIFIED LEAD
→ SALE
→ MARGIN
```

### Required technical chain

```text
DISCOVERY
→ CRAWL
→ RENDER
→ CANONICAL SELECTION
→ INDEX
→ RETRIEVAL
→ SEARCH APPEARANCE
```

### Baseline outputs

- Search Console property and data access
- analytics with defined organic conversion events
- CRM or commerce value linkage
- canonical URL inventory
- crawl/index state inventory
- query-to-URL table
- branded/non-branded classification
- country/device/search-appearance dimensions
- baseline date and change log

### Gate

```text
IF priority_pages cannot be measured
OR conversion events cannot be trusted
THEN measurement repair outranks content production.
```

---

## 5. Stage 2 — Build the audience–task map

Do not begin with a keyword tool. Begin with the user’s world.

### Audience dimensions

```text
role
industry
organization size
experience
problem awareness
solution awareness
urgency
budget
risk tolerance
geography
language
device/context
accessibility needs
```

### Task families

```text
LEARN
DEFINE
DISCOVER
DIAGNOSE
COMPARE
CALCULATE
LOCATE
VERIFY
PLAN
IMPLEMENT
TROUBLESHOOT
BUY
USE
MAINTAIN
RENEW
REFER
```

### Journey states

```text
UNAWARE
PROBLEM_AWARE
SOLUTION_AWARE
OPTION_EVALUATION
DECISION
IMPLEMENTATION
USE
RETENTION
ADVOCACY
```

The funnel is a graph, not a one-way pipe. Users can enter, leave, return, skip stages, or move backward.

### Output

Create an audience–task matrix:

| Audience | Condition | Task | Intent | Journey state | Value event |
|---|---|---|---|---|---|

### Gate

```text
IF a query cannot be associated with a plausible audience and task
THEN classify it as uncertain
AND do not publish from it yet.
```

---

## 6. Stage 3 — Build the semantic demand graph

### 6.1 Start with concept families

For every offer, map:

```text
PARENT CONCEPTS
SUBTYPES
SYNONYMS / PARAPHRASES
ENTITIES
ATTRIBUTES
ATTRIBUTE VALUES
PROCESSES
PREREQUISITES
PROBLEMS
CAUSES
CONSEQUENCES
SOLUTIONS
ALTERNATIVES
COMPARISONS
OBJECTIONS
RISKS
LOCATIONS
TIME STATES
EVIDENCE TYPES
QUESTIONS
```

### 6.2 Add observed demand

Sources may include:

- Search Console queries;
- customer calls and emails;
- site search;
- sales objections;
- support tickets;
- search suggestions and result patterns;
- competitor visibility;
- forums and communities;
- first-party surveys;
- paid-search terms;
- analytics and CRM outcomes.

### 6.3 Separate semantic similarity from intent equivalence

Two phrases can be semantically close but require different pages. Two phrases can look different but belong to one task.

```text
"web design Calgary"
"Calgary website designer"
```

Likely one service intent.

```text
"web design Calgary"
"how much does web design cost in Calgary"
```

Related topic, different task and likely different document role.

### 6.4 Cluster test

```text
SAME PAGE
IF:
    same sense
    AND same dominant task
    AND same answer structure
    AND same expected result class
    AND compatible next action

SPLIT
IF:
    different task
    OR different decision stage
    OR different local/product eligibility
    OR different format is necessary
    OR the combined answer would become confusing
```

### Output

A canonical intent registry:

| Cluster ID | Representative query | Task | Intent | Variants | Exclusions | Intended URL | Status |
|---|---|---|---|---|---|---|---|

---

## 7. Stage 4 — Quantify opportunities

### Opportunity scoring model

```text
OPPORTUNITY SCORE
=
(
  demand evidence
  × business fit
  × task-value fit
  × information advantage
  × conversion value
  × attainability
  × confidence
  × reuse potential
)
÷
(
  effort
  × risk
  × maintenance burden
  × time to learning
)
```

Use 0–5 values or calibrated probabilities. Do not pretend the result is exact; it is a transparent prioritization model.

### Existing-opportunity multiplier

Add a multiplier when an existing page already has:

- impressions;
- positions near useful visibility;
- links;
- conversions;
- brand recognition;
- stable indexing;
- strong internal graph position.

```text
IF existing_asset_has_signal
THEN prefer improve/merge/reposition
BEFORE creating a new asset,
unless intent ownership is fundamentally wrong.
```

### Priority bands

```text
P0 — eligibility or measurement failure blocking value
P1 — existing high-value opportunity with low/moderate effort
P2 — core commercial or decision cluster
P3 — supporting informational or authority asset
P4 — experimental or speculative demand
P5 — reject, defer, or monitor
```

---

## 8. Stage 5 — Choose the information product

A page should be designed as a product that completes a task.

### Information-product selector

| Task | Preferred product forms |
|---|---|
| Define | concise definition, examples, boundaries |
| Learn | guide, lesson, demonstration, video |
| Compare | table, matrix, benchmark, decision tree |
| Calculate | calculator, estimator, formula, worksheet |
| Diagnose | checklist, test, decision tree, audit |
| Locate | verified directory, map, location page |
| Plan | roadmap, template, calendar, framework |
| Implement | SOP, code, configuration, download |
| Verify | evidence review, source map, methodology |
| Choose | scored criteria, trade-offs, recommendations |
| Buy | service/product page, proof, scope, process, action |
| Maintain | monitoring guide, alert, checklist, dashboard |

### Information advantage

Approve at least one defensible advantage:

```text
firsthand experience
OR proprietary data
OR original test
OR better synthesis
OR better visualization
OR better interaction
OR more current verified information
OR stronger local evidence
OR clearer decision support
OR useful tool/template
OR accessibility advantage
OR faster task completion
```

### Gate

```text
IF the proposed page merely restates common information
AND has no meaningful experience, evidence, utility, or synthesis advantage
THEN redesign the asset
OR reject it.
```

---

## 9. Stage 6 — Write the page specification

Every page brief must define:

```text
Cluster ID
Audience
Task
Intent
Journey state
Canonical URL
Page type
Expected result formats
Direct answer
Required entities and relations
Required attributes
Evidence plan
Media plan
Internal links in
Internal links out
Next action
Primary metric
Guardrails
Refresh trigger
Owner
```

### On-page logic

```text
IF title accurately represents the task
AND distinguishes the result
AND creates a truthful reason to click
THEN test it against current CTR expectations.

IF title change improves clicks
BUT lowers qualified conversion rate materially
THEN revert or refine.

IF page has impressions but poor rank
THEN diagnose intent, format, information advantage, authority, and internal graph
BEFORE repeating keywords.

IF page ranks but does not convert
THEN inspect audience quality, answer-to-offer continuity, and next action.

IF page converts but lacks impressions
THEN prioritize discoverability, internal links, authority, and search appearance.
```

---

## 10. Stage 7 — Design the internal information graph

### Four edge classes

1. **Understanding edges** — definition, prerequisite, evidence, example
2. **Choice edges** — comparison, alternative, trade-off
3. **Journey edges** — next step, assessment, service, product
4. **Authority edges** — supporting research to core asset

### Hub rule

Create a hub when it helps a user choose a path across a coherent set of tasks. Do not create a hub solely to insert links.

### Supporting-asset rule

```text
IF an adjacent task has independent demand
AND can provide a complete useful answer
AND supports a valuable canonical asset
THEN create supporting_asset
AND link contextually toward the relevant core asset.

ELSE include the answer as a section
OR do not create it.
```

### Orphan rule

```text
IF page_is_priority
AND no crawlable internal link exists
THEN add at least one contextually useful link
OR remove the page from the priority set.
```

---

## 11. Stage 8 — Build external evidence and prominence

Authority is not only “link quantity.” Treat it as independent evidence and graph prominence.

### Authority program components

```text
LINKABLE_REASON
+ RELEVANT_PROSPECT
+ EVIDENCE_ASSET
+ RELATIONSHIP / OUTREACH
+ PLACEMENT
+ RETENTION
+ BUSINESS IMPACT
```

### Linkable reasons

- original data;
- benchmark;
- free tool;
- template;
- definitive reference;
- newsworthy change;
- expert collaboration;
- unique local resource;
- visual explanation;
- case study;
- correction or replacement for a broken resource.

### Rules

```text
IF a page is purely commercial
AND difficult to cite
THEN create a genuinely useful evidence asset
OR supporting resource
that can earn attention without disguising its purpose.

IF a prospect is irrelevant
OR placement is paid/sponsored without appropriate treatment
OR outreach claim is misleading
THEN reject the opportunity.

IF acquired link disappears
THEN classify cause
AND recover only when the relationship and value remain valid.
```

Measure qualified referring domains, target-page lift, branded demand, assisted conversion, and retained placements—not tool scores alone.

---

## 12. Stage 9 — Technical eligibility and search appearance

### Technical priority order

```text
1. Accessibility to users and crawlers
2. Correct status and destination
3. Rendered main content
4. Canonical ownership
5. Index eligibility
6. Internal discovery
7. Duplicate/facet control
8. Sitemap freshness
9. Mobile and real-user performance
10. Structured data eligibility
11. International/local correctness
```

### Technical decision rules

```text
IF URL should appear in Search
THEN it must be accessible
AND return an appropriate successful response
AND expose indexable content
AND not carry conflicting exclusion signals.

IF page must disappear for users and search
THEN use removal or redirect logic appropriate to the business case,
not robots.txt alone.

IF duplicate URLs must remain accessible
THEN use coherent canonical signals
AND consistent internal links
AND sitemap preference.

IF content is generated by JavaScript
THEN validate rendered content and crawlable links.

IF structured data type is not relevant to visible page content
THEN do not add it.

IF Core Web Vitals are poor
THEN prioritize fixes by real-user exposure and business impact
rather than chasing a perfect laboratory score.
```

---

## 13. Stage 10 — Match the next action to the journey

### Transition grammar

```text
UNAWARE → understand problem
PROBLEM_AWARE → explore solution class
SOLUTION_AWARE → compare approaches
OPTION_EVALUATION → inspect proof, scope, cost
DECISION → transact or contact
USE → implement successfully
RETENTION → renew, expand, repeat
ADVOCACY → review, refer, cite
```

### Nudge rule

```text
NEXT_ACTION must be:
logically adjacent
AND proportionate to trust
AND useful without coercion
AND measurable
```

Examples:

```text
guide → related guide OR diagnostic
comparison → calculator OR assessment
calculator → saved result OR consultation
service page → qualification form
customer guide → support action OR upgrade
case study → relevant service page
```

---

## 14. Stage 11 — Experiment with LAKA

### Experiment ladder

```text
BASELINE:
observe and diagnose

MINOR:
change presentation or a single local variable

MAJOR:
change the asset’s answer, evidence, or format

STRUCTURAL:
change cluster ownership, templates, graph, or data flow

PARADIGM:
change the solution class or create a new information product
```

### Escalation logic

```text
IF baseline data is unreliable
THEN do not escalate; repair measurement.

IF a minor test fails
AND diagnosis indicates a content/format problem
THEN move to Major.

IF several pages share the same failure
THEN move to Structural.

IF competitors all solve the wrong problem
OR no existing result class can complete the task
THEN consider Paradigm.

IF expected incremental value < expected cost
THEN stop, defer, or monitor.
```

---

## 15. Stage 12 — Continuous allocation

At a fixed review cadence:

1. update demand and value data;
2. detect query, URL, and conversion shifts;
3. recalculate opportunity scores;
4. separate noise from sustained change;
5. continue, expand, revise, reverse, or retire;
6. record what the system learned.

### Portfolio allocation

A balanced portfolio may include:

```text
40% existing-page and conversion improvements
25% core commercial/decision assets
15% supporting authority assets
10% technical/structural work
10% paradigm experiments
```

This is a starting heuristic, not a universal rule. Reallocate according to measured marginal value, constraints, and learning velocity.

---

## 16. Failure diagnosis tree

```text
NO IMPRESSIONS?
    → discovery / crawl / index / demand / cluster mismatch

IMPRESSIONS BUT LOW VISIBILITY?
    → intent / format / information value / internal graph / authority

VISIBILITY BUT LOW CTR?
    → title / snippet / result type / brand / mismatch / SERP crowding

CLICKS BUT LOW TASK COMPLETION?
    → weak answer / poor format / slow or confusing experience / wrong query

TASK COMPLETION BUT LOW NEXT ACTION?
    → journey discontinuity / weak offer / wrong CTA / trust gap

LEADS BUT LOW QUALIFICATION?
    → wrong audience / misleading promise / broad intent / form design

SALES BUT LOW MARGIN OR RETENTION?
    → offer economics / fulfillment / customer fit / expectation mismatch

METRICS IMPROVE BUT BUSINESS DOES NOT?
    → proxy optimization; redefine the primary outcome
```

---

## 17. Strategy completion test

The strategy is ready only when every priority cluster answers:

```text
Who is the user?
What are they trying to do?
Why now?
What observed demand supports it?
Which queries represent the task?
Which single asset owns the intent?
What form best completes the task?
What makes the asset meaningfully better?
How will users and crawlers find it?
What independent evidence supports it?
What is the next logical action?
What event creates business value?
How will success and failure be distinguished?
What is the LAKA escalation path?
```


---

<!-- Source file: 03-VOLUMETRIC-SEO-ENGINE.md -->

# 03 — Volumetric SEO Engine

## 1. Definition

The Volumetric SEO Engine expands an opportunity across independent dimensions, then compresses that opportunity space into a small set of high-value canonical assets.

```text
VOLUME ≠ PAGE COUNT

VOLUME
=
number of meaningful combinations inspected
× number of evidence sources
× number of viable solution forms
× number of measurable learning cycles
```

The engine is a **generator + constraint solver + portfolio allocator**.

```text
INPUTS
→ DIMENSIONAL EXPANSION
→ NORMALIZATION
→ INTENT CLUSTERING
→ BOOLEAN GATES
→ REDUNDANCY COMPRESSION
→ VALUE SCORING
→ PORTFOLIO SELECTION
→ ASSET PRODUCTION
→ OBSERVATION
→ MODEL UPDATE
```

---

## 2. Opportunity dimensions

### 2.1 Business dimensions

```text
offer
revenue model
margin
capacity
sales cycle
qualification threshold
retention value
risk
strategic priority
```

### 2.2 Audience dimensions

```text
segment
role
industry
organization size
experience
problem awareness
solution awareness
urgency
budget
geography
language
device/context
accessibility need
```

### 2.3 Task dimensions

```text
define
learn
discover
diagnose
compare
calculate
locate
verify
plan
implement
troubleshoot
buy
use
maintain
renew
refer
```

### 2.4 Intent dimensions

```text
informational
comparative
commercial investigation
transactional
navigational
local
support
retention
reputation
```

### 2.5 Semantic dimensions

```text
parent concept
subtype
synonym
entity
attribute
attribute value
process
prerequisite
problem
cause
consequence
solution
alternative
comparison
objection
risk
evidence
question
```

### 2.6 Modifier dimensions

```text
who
what
where
when
why
how
best
cost
price
cheap/premium
near me
reviews
versus
alternative
for [audience]
with [attribute]
without [constraint]
under/over [value]
before/after
current/year
beginner/advanced
```

### 2.7 Asset dimensions

```text
service page
product page
category
guide
comparison
calculator
diagnostic
template
checklist
directory
location page
case study
dataset
benchmark
glossary
FAQ
video
image series
interactive
API/data feed
```

### 2.8 Evidence dimensions

```text
firsthand experience
original data
controlled test
field observation
customer evidence
expert review
documented case study
primary-source citation
methodology
screenshots
demonstration
limitations
```

### 2.9 Search-surface dimensions

```text
web results
images
video
local
shopping/product
news
Discover
generative AI features
site search
third-party marketplace
```

### 2.10 Journey and conversion dimensions

```text
awareness → related content
evaluation → tool/comparison
decision → assessment/demo/quote
transaction → purchase/signup
use → successful implementation
retention → renewal/expansion
advocacy → review/referral/citation
```

### 2.11 Time dimensions

```text
evergreen
seasonal
event-driven
newly changed
periodic
decaying
historical
real-time
forecast
```

### 2.12 Measurement dimensions

```text
query
page
cluster
country
device
search appearance
audience
offer
change ID
date
cohort
value event
```

---

## 3. The theoretical opportunity volume

A modest generator with:

```text
8 audience states
× 12 tasks
× 8 intents
× 12 semantic node types
× 10 modifier families
× 12 asset formats
× 6 search surfaces
× 8 journey states
× 8 evidence modes
× 6 geographies
× 6 next actions
```

creates:

```text
15,288,238,080 theoretical combinations
```

This is not a publishing target. It demonstrates why SEO needs a grammar and constraint system. Without compression, “programmatic SEO” easily becomes duplication, thin content, maintenance debt, and measurement noise.

The desired outcome might be only 20, 100, or 1,000 canonical assets depending on the business—even though the system evaluated a much larger possibility space.

---

## 4. Candidate generation

### 4.1 Candidate sentence

```text
CANDIDATE
=
AUDIENCE
× CONDITION
× TASK
× INTENT
× CONCEPT
× MODIFIER_SET
× GEOGRAPHY
× TIME_STATE
× ASSET_FORM
× EVIDENCE_MODE
× NEXT_ACTION
```

### 4.2 Generation pseudocode

```text
FOR EACH approved offer:
  FOR EACH plausible audience:
    FOR EACH observed problem or desire:
      FOR EACH task:
        FOR EACH semantic relation:
          GENERATE query hypotheses
          ATTACH possible formats
          ATTACH possible evidence
          ATTACH next actions
          ATTACH measurement plan
```

### 4.3 Evidence enrichment

Each hypothesis must be enriched with observations:

```text
first-party query data
OR customer language
OR result-page evidence
OR competitor visibility
OR sales/support evidence
OR market data
OR paid-search evidence
```

The more sources agree, the higher the demand confidence.

---

## 5. Candidate normalization

Before clustering:

```text
lowercase for comparison
normalize punctuation
normalize singular/plural where meaning is stable
expand or resolve abbreviations
map synonyms to concepts
identify named entities
identify geography and time
identify modifiers
detect language
detect likely sense
extract task verb
extract transaction state
attach exclusions
```

Do not erase meaningful distinctions. “Audit” as a noun, “audit software,” and “hire an auditor” may belong to different tasks.

---

## 6. Intent equivalence test

Calculate a conceptual equivalence vector:

```text
EQUIVALENCE =
sense_match
+ task_match
+ result_type_match
+ answer_structure_match
+ audience_state_match
+ next_action_match
+ current_SERP_overlap
```

### Merge gate

```text
IF sense_match = true
AND task_match = true
AND answer_structure_compatible = true
AND next_action_compatible = true
AND separate_page_value = low
THEN assign to same cluster.
```

### Split gate

```text
IF sense differs
OR task differs
OR result class differs
OR local/product inventory differs
OR legal context differs
OR combined answer harms usability
THEN create separate cluster candidate.
```

### Test gate

```text
IF evidence is ambiguous
THEN:
  keep one provisional cluster
  AND observe query/page behavior
  OR run a controlled asset-format test
  BEFORE multiplying pages.
```

---

## 7. Boolean publication gates

A candidate proceeds only if it passes all hard gates.

```text
APPROVE
=
DEMAND
AND DISTINCTNESS
AND BUSINESS VALUE
AND INFORMATION ADVANTAGE
AND TECHNICAL FEASIBILITY
AND MAINTAINABILITY
AND MEASURABILITY
AND POLICY / ETHICAL COMPLIANCE
```

### Demand gate

```text
PASS IF:
observed impressions
OR customer evidence
OR sales/support frequency
OR stable result ecosystem
OR defensible emerging-demand thesis
```

### Distinctness gate

```text
PASS IF:
the candidate owns a distinct task
OR needs a materially different answer
OR has real local/product data
OR requires a different conversion path
```

### Value gate

```text
PASS IF:
direct conversion value
OR assisted conversion value
OR retention value
OR authority value
OR strategic learning value
```

### Information-advantage gate

```text
PASS IF at least one:
original experience
OR proprietary data
OR better methodology
OR better utility
OR stronger evidence
OR clearer decision support
OR unique local coverage
OR better accessibility
```

### Maintainability gate

```text
PASS IF:
owner exists
AND refresh triggers are defined
AND data can be kept accurate
AND total approved volume fits capacity
```

### Measurement gate

```text
PASS IF:
primary outcome
AND baseline
AND change ID
AND observation method
AND decision rule
are defined.
```

---

## 8. Soft scoring model

Candidates that pass the gates are prioritized.

Use a 0–5 rating or calibrated probability for each factor.

```text
VALUE NUMERATOR =
DemandConfidence
× BusinessFit
× TaskValue
× InformationAdvantage
× ConversionValue
× Attainability
× ReusePotential
× LearningValue

COST DENOMINATOR =
ProductionEffort
× TechnicalRisk
× MaintenanceBurden
× TimeToLearning
× OpportunityCost

PRIORITY SCORE =
VALUE NUMERATOR / COST DENOMINATOR
```

Avoid zero in a multiplicative score by using a minimum floor such as 0.2 for uncertain but nonzero factors, or use a weighted log model.

### Confidence adjustment

```text
ADJUSTED SCORE =
PRIORITY SCORE
× EvidenceConfidence
× MeasurementConfidence
```

### Existing-asset multiplier

```text
IF existing URL has:
impressions
OR links
OR conversions
OR stable indexing
OR strong internal position
THEN multiply by ExistingSignalFactor.
```

---

## 9. Redundancy compression

The goal is **maximum demand coverage with minimum canonical assets**.

### Compression steps

1. Group lexical variants.
2. Merge same-sense queries.
3. Group same-task queries.
4. inspect result-format compatibility.
5. assign one canonical owner.
6. place remaining questions as:
   - sections;
   - FAQs;
   - supporting assets;
   - exclusions;
   - future experiments.

### Compression ratio

```text
COMPRESSION RATIO =
generated candidates / approved canonical assets
```

A high ratio can be healthy when it reflects disciplined clustering. It is unhealthy if valid distinct tasks are being forced into bloated pages.

### Coverage ratio

```text
VALUABLE DEMAND COVERAGE =
value-weighted approved cluster demand
/
value-weighted validated demand
```

Optimize both compression and coverage—not one alone.

---

## 10. Page-volume governance

### Capacity formula

```text
SUSTAINABLE PAGE VOLUME
≤
(editorial capacity × quality throughput × refresh capacity)
/
(average maintenance burden × volatility)
```

### Scale rules

```text
IF approved_page_count exceeds maintenance capacity
THEN:
  raise value threshold
  OR consolidate clusters
  OR automate data quality
  OR reduce geography/product scope
  OR stage publication.

IF a template produces mostly repeated text
THEN the template is not a sufficient information product.

IF local pages lack unique local proof
THEN consolidate to a broader service-area asset
OR collect valid local data first.

IF generated assets cannot be individually measured
THEN use representative cohorts
AND prevent uncontrolled expansion.

IF pages decay faster than they can be refreshed
THEN reduce scope
OR change the asset class.
```

---

## 11. Volumetric content architecture

### 11.1 Parent–subtype volume

```text
PARENT
→ SUBTYPE
→ ATTRIBUTE
→ VALUE
→ TASK
```

Example:

```text
WEB DESIGN
→ ECOMMERCE WEB DESIGN
→ PLATFORM
→ SHOPIFY
→ COMPARE / HIRE / PRICE / MIGRATE
```

### 11.2 Entity–relation volume

```text
ENTITY A
→ RELATION
→ ENTITY B
```

Examples:

```text
WORDPRESS → COMPARED_WITH → WEBFLOW
WCAG → APPLIES_TO → ECOMMERCE
CALGARY → CONTAINS → SERVICE AREAS
PAGE SPEED → AFFECTS → CONVERSION
```

### 11.3 Problem–solution volume

```text
AUDIENCE
→ PROBLEM
→ CAUSE
→ DIAGNOSTIC
→ SOLUTION
→ PROOF
→ OFFER
```

### 11.4 Journey volume

```text
PROBLEM AWARENESS
→ DIAGNOSIS
→ OPTIONS
→ COMPARISON
→ COST
→ PROOF
→ SELECTION
→ IMPLEMENTATION
→ MAINTENANCE
```

One cluster system should cover the journey without forcing a linear user path.

### 11.5 Format volume

For each approved task, test alternate information products:

```text
article
OR table
OR video
OR calculator
OR template
OR map
OR dataset
OR interactive
```

The best format is the one that completes the task and creates measurable value—not the one easiest to publish.

---

## 12. LAKA volumetric expansion

For every approved opportunity, generate five change classes.

| Level | Expansion question | Typical candidates |
|---|---|---|
| Baseline | What is happening now? | measurement, inventory, diagnosis |
| Minor | What small reversible change can improve response? | title, intro, CTA, link |
| Major | What richer answer or format would serve the task? | rewrite, tool, video, evidence |
| Structural | What relationships or systems cause the limitation? | merge, graph, template, pipeline |
| Paradigm | What new solution class could redefine the result? | data product, diagnostic, agent, benchmark |

Then apply the ten internal variables to each level:

```text
5 change levels × 10 internal variables = 50-cell intervention map
```

Then attach the fourteen change descriptors:

```text
50 cells × 14 descriptors = 700 analytical observations per opportunity
```

This is a volumetric **analysis space**, not a requirement to execute 700 actions.

---

## 13. Volumetric experiment design

### Variation dimensions

```text
query cluster
title proposition
search snippet
direct-answer style
information depth
format
evidence
visuals
internal links
next action
offer
technical implementation
```

### Controlled generation

```text
FOR EACH high-value cluster:
  GENERATE minor, major, structural, paradigm hypotheses
  SCORE by mechanism, value, risk, reversibility, learning
  SELECT a non-confounded test
  ASSIGN change_id
  OBSERVE primary metric + guardrails
  UPDATE priors
```

### Rule against combinatorial confusion

```text
IF multiple high-impact variables change simultaneously
AND the goal is causal learning
THEN split the change
OR explicitly classify it as a package test.

IF the goal is simply recovery
AND delay has high business cost
THEN a package intervention may be valid,
but causal attribution will be lower.
```

---

## 14. Feedback-driven generation

The engine updates its weights based on outcomes.

```text
IF a task family produces qualified value repeatedly
THEN increase its business-fit prior.

IF a format improves task completion across clusters
THEN increase its format prior for similar tasks.

IF a query family generates traffic but poor qualification
THEN lower its value prior
AND inspect audience/intent classification.

IF generated local pages decay or duplicate
THEN tighten local distinctness gates.

IF original data earns relevant citations
THEN increase evidence and reuse scores for related assets.

IF a paradigm asset creates branded demand
THEN create supporting and conversion pathways around it.
```

---

## 15. Output types

The engine should generate these outputs, not merely pages:

```text
opportunity inventory
semantic graph
intent clusters
canonical registry
page specifications
internal-link graph
technical requirements
evidence backlog
authority campaigns
experiment queue
measurement plan
refresh calendar
retirement/merge queue
```

---

## 16. Minimum volumetric workflow

```text
1. Generate 100–1,000 candidates internally.
2. Normalize and cluster them.
3. Apply eight hard publication gates.
4. Score survivors.
5. Select the top portfolio under capacity.
6. Assign one canonical owner per dominant intent.
7. generate five LAKA intervention levels.
8. execute the smallest intervention capable of affecting the diagnosed mechanism.
9. measure business and diagnostic outcomes.
10. update the generator.
```

This produces scale through disciplined thought, not indiscriminate publishing.


---

<!-- Source file: 04-IF-ELSE-AND-OR-RULEBOOK.md -->

# 04 — IF / ELSE / AND / OR SEO Rulebook

## Purpose

This rulebook converts SEO judgment into explicit, auditable decisions. It contains **144 rules** in twelve domains. The machine-readable version is in `rules/seo-laka-rules.yaml`.

## Operator semantics

```text
IF       begins a condition.
THEN     specifies the action when the condition is true.
ELSE     specifies the valid fallback when the condition is false.
AND      requires every connected condition.
OR       permits one or more valid alternatives.
NOT      excludes a state or candidate.
XOR      requires exactly one choice.
BEFORE   establishes dependency order.
UNTIL    establishes a bounded feedback loop.
AT_LEAST sets a minimum.
EXACTLY_ONE assigns unique ownership or a single decision.
```

## Rule execution order

Rules may conflict. Resolve them in this order:

```text
1. Safety, law, privacy, and policy
2. User value and factual accuracy
3. Technical eligibility and canonical correctness
4. Business value and constraints
5. Intent fit and information quality
6. Measurement and learning
7. Efficiency and scale
8. Cosmetic optimization
```

## Hard-gate pattern

```text
IF all mandatory conditions pass
THEN execute or advance the candidate
ELSE route to research, consolidation, repair, deferral, or rejection
```

## Rules


## 1. Business Value


### BIZ-001 — Define value before volume

```text
IF the program has no defined qualified business event
THEN define the event, qualification rule, owner, and estimated contribution value before optimizing traffic
ELSE use the existing qualified event as the primary business outcome
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Baseline  
**Primary metric:** measurement completeness  
**Guardrail:** Do not substitute sessions or ranking counts for value.  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### BIZ-002 — Traffic is diagnostic, not the north star

```text
IF organic traffic increases AND qualified conversions or margin do not
THEN diagnose intent quality, audience fit, next-action continuity, and attribution
ELSE continue scaling only while downstream value and guardrails remain healthy
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Baseline, Major  
**Primary metric:** incremental organic contribution margin  
**Guardrail:** lead quality, sales capacity, refund rate  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### BIZ-003 — Separate forecasts from actuals

```text
IF search volume, CTR, conversion, or revenue is estimated
THEN label the output as a forecast and record every assumption
ELSE use observed query, conversion, revenue, and margin data
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** forecast error  
**Guardrail:** confidence interval, source age  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### BIZ-004 — Respect fulfillment capacity

```text
IF expected qualified demand exceeds delivery or sales capacity
THEN prioritize higher-margin, higher-fit clusters OR increase capacity before expanding volume
ELSE optimize for profitable demand growth
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** contribution margin per capacity unit  
**Guardrail:** response time, customer satisfaction  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### BIZ-005 — Model offers separately

```text
IF different offers have materially different audiences, margins, sales cycles, or qualification rules
THEN assign separate value models and cluster portfolios
ELSE a shared model may be used with explicit segment dimensions
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** value by offer  
**Guardrail:** cross-offer cannibalization  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### BIZ-006 — Count assisted value carefully

```text
IF an informational asset rarely receives last-click conversions but appears in qualified journeys
THEN measure assisted progression, returning users, branded demand, and controlled lift
ELSE judge the asset on direct value and task completion
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Baseline, Major  
**Primary metric:** assisted contribution value  
**Guardrail:** double counting  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### BIZ-007 — Split branded and non-branded demand

```text
IF brand familiarity materially changes intent, CTR, or conversion
THEN report branded and non-branded performance separately
ELSE aggregate only for top-level totals
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** value-weighted non-brand clicks  
**Guardrail:** brand campaign effects  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### BIZ-008 — Include retention and expansion

```text
IF organic search serves existing customers, support, renewal, or repeat purchase tasks
THEN assign retention events and lifetime-value effects
ELSE use acquisition outcomes for new-user clusters
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** organic-assisted retained margin  
**Guardrail:** support deflection quality, churn  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### BIZ-009 — Raise evidence thresholds for high stakes

```text
IF the topic can materially affect health, money, safety, legal rights, or major decisions
THEN require qualified review, primary sources, explicit limitations, and stronger maintenance
ELSE apply the normal evidence standard
```

**Operators:** IF · OR · THEN · ELSE · AND  
**LAKA level(s):** Major, Structural  
**Primary metric:** verified task success  
**Guardrail:** harm, complaint, correction rate  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### BIZ-010 — Resolve competing goals explicitly

```text
IF traffic, lead quality, margin, brand, retention, and learning objectives conflict
THEN name one primary objective and classify the others as constraints or secondary outcomes
ELSE use the single aligned objective
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** objective clarity  
**Guardrail:** unintended metric trade-offs  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### BIZ-011 — Allocate by marginal value

```text
IF multiple valid initiatives compete for limited resources
THEN rank them by expected incremental value divided by effort, risk, maintenance, and time to learning
ELSE execute the only valid initiative
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Baseline, Structural  
**Primary metric:** realized value per implementation hour  
**Guardrail:** portfolio concentration risk  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### BIZ-012 — Use economic stop rules

```text
IF expected remaining incremental value is below expected cost OR risk exceeds tolerance
THEN stop, defer, retire, or redesign the initiative
ELSE continue to the next defined review point
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline, Paradigm  
**Primary metric:** net incremental value  
**Guardrail:** sunk-cost bias  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


## 2. Audience and Journey


### AUD-001 — Require an audience-task pair

```text
IF a candidate query cannot be mapped to a plausible audience and task
THEN classify it as uncertain and gather evidence
ELSE attach the audience, condition, task, and journey state
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** classified-demand share  
**Guardrail:** forced persona assumptions  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUD-002 — Treat funnel modifiers as heuristics

```text
IF a word such as how, best, review, price, or buy suggests a journey stage
THEN use it as a hypothesis and verify the actual task and result set
ELSE infer stage from the full query, context, and behavior
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** intent-classification accuracy  
**Guardrail:** stage stereotyping  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUD-003 — Model the funnel as a graph

```text
IF journey analysis assumes every user enters at awareness and moves linearly
THEN allow entry, exit, return, skip, and backward transitions
ELSE retain observed journey paths
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** state-transition rate  
**Guardrail:** attribution inflation  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUD-004 — Use adjacent next actions

```text
IF the proposed CTA requires substantially more trust or commitment than the current task supports
THEN offer an adjacent useful action OR add the proof needed to justify the transition
ELSE measure the direct transition
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Minor, Major  
**Primary metric:** next-state transition rate  
**Guardrail:** bounce, complaint, unsubscribe  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUD-005 — Split materially different audience needs

```text
IF two audience segments require different evidence, terminology, constraints, or offers
THEN create distinct sections, experiences, or canonical assets based on task compatibility
ELSE serve them in one asset
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major, Structural  
**Primary metric:** qualified conversion by segment  
**Guardrail:** duplication, maintenance  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUD-006 — Include accessibility conditions

```text
IF the task depends on visual, motor, auditory, cognitive, or assistive-technology access
THEN design the format, navigation, media, and controls for those conditions
ELSE apply baseline accessible design to all assets
```

**Operators:** IF · OR · THEN · ELSE · AND  
**LAKA level(s):** Major, Structural  
**Primary metric:** task completion by accessibility condition  
**Guardrail:** keyboard traps, missing alternatives  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUD-007 — Require real local distinctness

```text
IF a geography modifier is proposed as a separate page
THEN require actual service eligibility, local evidence, local differences, and maintainable data
ELSE consolidate into a broader service-area asset
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** qualified local conversions  
**Guardrail:** doorway-page risk, inaccurate claims  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUD-008 — Localize, do not merely translate

```text
IF language or country versions differ in terminology, regulation, inventory, currency, or user expectations
THEN localize content and targeting signals
ELSE use a shared translation only where the task and facts truly remain equivalent
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major, Structural  
**Primary metric:** correct-locale conversion  
**Guardrail:** translation quality, hreflang errors  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUD-009 — Account for device context

```text
IF device changes task conditions or interface needs
THEN adapt layout, media, interaction, and next action while preserving canonical meaning
ELSE use the common responsive experience
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Minor, Major  
**Primary metric:** task completion by device  
**Guardrail:** content parity  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUD-010 — Match evidence to urgency

```text
IF the user has high urgency or high perceived risk
THEN front-load direct answers, scope, availability, proof, and safe next actions
ELSE use the standard information order
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** time to task completion  
**Guardrail:** misleading urgency  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUD-011 — Explicitly exclude wrong audiences

```text
IF queries attract jobs, students, freebie seekers, unsupported geographies, or unrelated senses
THEN add exclusions to research, paid data, reporting, and content positioning
ELSE retain the query in its valid cluster
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline, Minor  
**Primary metric:** irrelevant-impression and unqualified-lead rate  
**Guardrail:** accidental exclusion of valuable demand  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUD-012 — Build post-purchase search pathways

```text
IF customers search for setup, use, troubleshooting, maintenance, renewal, or complementary products
THEN create support and retention task clusters with appropriate next actions
ELSE focus the cluster on acquisition
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** retention and support value  
**Guardrail:** support accuracy  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


## 3. Semantic Demand


### SEM-001 — Start from parent concepts

```text
IF an offer lacks a mapped semantic territory
THEN identify parent concepts, neighboring categories, and business boundaries
ELSE extend the existing concept graph
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Baseline  
**Primary metric:** concept-map coverage  
**Guardrail:** scope drift  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### SEM-002 — Expand through subtypes

```text
IF a parent concept contains meaningful narrower types with distinct tasks
THEN create subtype clusters and evaluate them independently
ELSE keep subtype terms as sections or variants
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Baseline, Major  
**Primary metric:** subtype demand coverage  
**Guardrail:** thin fragmentation  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### SEM-003 — Normalize synonyms and paraphrases

```text
IF different phrases express the same sense and dominant task
THEN map them to one query cluster and one intended canonical asset
ELSE investigate whether the task differs
```

**Operators:** IF · AND · THEN · ELSE · XOR  
**LAKA level(s):** Baseline  
**Primary metric:** cluster cohesion  
**Guardrail:** missed senses  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### SEM-004 — Disambiguate homonyms and polysemy

```text
IF the same wording can refer to different concepts, entities, or tasks
THEN create sense labels and exclusions before clustering
ELSE use the unambiguous concept
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** wrong-sense rate  
**Guardrail:** query misclassification  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### SEM-005 — Model modifiers as facets

```text
IF terms vary by price, material, size, audience, platform, location, time, or other attributes
THEN represent them as attribute-value pairs and test whether they create a distinct task
ELSE treat them as lexical variants
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline, Structural  
**Primary metric:** facet value and distinctness  
**Guardrail:** facet explosion  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### SEM-006 — Use co-occurrence as context

```text
IF a term commonly appears near the topic but is not itself the user’s target
THEN use it only where it explains an entity, relation, attribute, or evidence need
ELSE exclude it from mandatory coverage
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Minor, Major  
**Primary metric:** task completeness  
**Guardrail:** unnatural term insertion  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### SEM-007 — Map entities and relations

```text
IF the task depends on named things and how they connect
THEN record entity types and typed relations, then express those relations visibly
ELSE use concept-only structure
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** entity-relation coverage  
**Guardrail:** entity ambiguity  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### SEM-008 — Map query fan-out without page fan-out

```text
IF one broad task implies several supporting questions
THEN map the questions as sections, evidence needs, or distinct adjacent tasks
ELSE do not create a separate page for every wording variation
```

**Operators:** IF · THEN · ELSE · OR  
**LAKA level(s):** Major, Structural  
**Primary metric:** fan-out task coverage  
**Guardrail:** scaled-content duplication  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### SEM-009 — Triangulate demand evidence

```text
IF a candidate appears in only one tool or source
THEN seek corroboration from first-party data, users, result sets, competitors, or sales/support evidence
ELSE increase confidence when independent sources agree
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** demand-confidence score  
**Guardrail:** tool bias  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### SEM-010 — Do not equate zero tool volume with zero demand

```text
IF a query has low or zero reported volume but appears in first-party or customer evidence
THEN retain it as a low-volume or emerging candidate and measure the cluster
ELSE deprioritize only after value and evidence review
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** observed cluster demand  
**Guardrail:** anecdotal overreach  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### SEM-011 — Attach time state

```text
IF facts, prices, availability, standards, laws, events, or recommendations can change
THEN assign freshness requirements and update triggers
ELSE classify the asset as stable evergreen
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** freshness compliance  
**Guardrail:** stale claims  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### SEM-012 — Model emerging demand separately

```text
IF a new technology, regulation, event, or behavior has weak historical search data but strong causal evidence
THEN create an experimental demand thesis with explicit uncertainty
ELSE use normal historical prioritization
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Paradigm  
**Primary metric:** learning-adjusted emerging-demand value  
**Guardrail:** trend chasing  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


## 4. Clustering and Canonical Ownership


### CLU-001 — One dominant intent, one owner

```text
IF a dominant intent cluster is approved
THEN assign exactly one intended canonical URL
ELSE keep the cluster in research
```

**Operators:** IF · THEN · ELSE · EXACTLY_ONE  
**LAKA level(s):** Baseline, Structural  
**Primary metric:** canonical ownership completeness  
**Guardrail:** multiple owners  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CLU-002 — Merge same-task candidates

```text
IF sense, task, answer structure, result class, and next action are compatible
THEN merge candidates into one cluster
ELSE evaluate split conditions
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** demand coverage per canonical asset  
**Guardrail:** over-broad pages  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CLU-003 — Split different tasks

```text
IF queries share vocabulary but require different completion conditions or document forms
THEN create separate clusters and page roles
ELSE keep them together
```

**Operators:** IF · AND · OR · THEN · ELSE  
**LAKA level(s):** Baseline, Major  
**Primary metric:** intent purity  
**Guardrail:** duplicated introductions  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CLU-004 — Use result overlap as evidence, not law

```text
IF current top results overlap strongly for two queries
THEN increase merge confidence but still inspect task and business context
ELSE do not force a split solely because result overlap is low
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** cluster validation accuracy  
**Guardrail:** SERP volatility  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CLU-005 — Detect cannibalization by behavior

```text
IF multiple owned URLs receive the same cluster’s impressions with unstable dominance or divided value
THEN inspect intent, links, conversion, and canonical ownership
ELSE allow multiple URLs when they serve genuinely different tasks
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline, Structural  
**Primary metric:** dominant URL share and URL entropy  
**Guardrail:** false-positive cannibalization  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CLU-006 — Merge with migration discipline

```text
IF two pages are redundant and one combined page is superior
THEN merge best information, select the winner, redirect the loser, and update links/sitemaps
ELSE reposition or retain both
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** consolidated value and retained demand  
**Guardrail:** migration loss  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CLU-007 — Reposition a useful weaker page

```text
IF a weaker page has independent value but overlaps the stronger page’s task
THEN change its dominant intent and connect it as a supporting asset
ELSE merge it
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Major, Structural  
**Primary metric:** distinct-cluster value  
**Guardrail:** residual overlap  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CLU-008 — Inspect equity before deletion

```text
IF a page appears useless or redundant
THEN check links, traffic, conversions, references, and dependencies before delete/noindex
ELSE retain or consolidate the page
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline, Structural  
**Primary metric:** value preserved after retirement  
**Guardrail:** broken dependencies  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CLU-009 — Align canonical signals

```text
IF duplicate or parameter URLs must remain accessible
THEN align canonical annotations, internal links, sitemap entries, redirects, and content signals
ELSE self-canonicalize the unique page
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** declared-selected canonical agreement  
**Guardrail:** mixed signals  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CLU-010 — Protect established URLs

```text
IF an older URL has links, traffic, or history and the only proposed improvement is a prettier slug
THEN keep the URL unless expected benefit clearly exceeds migration risk
ELSE optimize the new URL before launch
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Minor, Structural  
**Primary metric:** post-change value retention  
**Guardrail:** redirect chains  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CLU-011 — Keep lexical variants together

```text
IF differences are spelling, word order, pluralization, abbreviation, or stemming without task change
THEN include natural variants in one asset and reporting cluster
ELSE treat materially different senses separately
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Minor  
**Primary metric:** variant coverage  
**Guardrail:** keyword stuffing  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CLU-012 — Test uncertain cluster boundaries

```text
IF merge/split evidence is inconclusive
THEN assign a provisional owner, record uncertainty, and observe query-to-URL behavior before scaling
ELSE finalize the cluster
```

**Operators:** IF · THEN · ELSE · UNTIL  
**LAKA level(s):** Baseline, Major  
**Primary metric:** cluster stability  
**Guardrail:** premature page multiplication  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


## 5. Content, Format, and Evidence


### CON-001 — Select format from task

```text
IF the dominant task is known
THEN choose a format that completes that task: guide, table, calculator, map, diagnostic, template, video, or transaction page
ELSE research the task before drafting
```

**Operators:** IF · THEN · ELSE · OR  
**LAKA level(s):** Major  
**Primary metric:** task completion rate  
**Guardrail:** format novelty without utility  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CON-002 — Answer early

```text
IF a user can benefit from a concise direct answer
THEN provide it near the beginning and then support it
ELSE state the path to the answer and necessary prerequisites
```

**Operators:** IF · THEN · ELSE  
**LAKA level(s):** Minor, Major  
**Primary metric:** time to first useful answer  
**Guardrail:** oversimplification  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CON-003 — Require information advantage

```text
IF the proposed asset only restates widely available material
THEN add original experience, data, testing, utility, synthesis, local proof, or decision support
ELSE proceed with the defensible advantage
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major, Paradigm  
**Primary metric:** information-advantage score  
**Guardrail:** unsupported originality claims  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CON-004 — Prefer firsthand evidence where relevant

```text
IF the task involves reviews, demonstrations, processes, products, or lived outcomes
THEN show what was actually tested, observed, used, or built
ELSE use the best available primary evidence
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** firsthand-evidence coverage  
**Guardrail:** conflicts of interest  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CON-005 — Make evidence visible

```text
IF a claim depends on a source, test, credential, or dataset
THEN place the supporting evidence where the user can inspect it
ELSE qualify the claim as opinion or uncertainty
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Minor, Major  
**Primary metric:** verifiable-claim rate  
**Guardrail:** citation mismatch  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CON-006 — State limitations

```text
IF evidence has uncertainty, sample limits, conflicts, exceptions, or changing conditions
THEN state limitations and applicability boundaries
ELSE present the stable conclusion
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Minor  
**Primary metric:** correction and dispute rate  
**Guardrail:** loss of nuance  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CON-007 — Avoid arbitrary length targets

```text
IF a word count is proposed without a task-based reason
THEN define completeness by required questions, evidence, and decision support
ELSE use length as a production estimate only
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Baseline, Major  
**Primary metric:** task completeness per reading time  
**Guardrail:** content bloat  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CON-008 — Govern AI-assisted content

```text
IF AI assists research, drafting, transformation, or scale
THEN require factual verification, original value, editorial ownership, and policy compliance
ELSE use the same quality controls for human-only work
```

**Operators:** IF · OR · THEN · ELSE · AND  
**LAKA level(s):** Structural  
**Primary metric:** verified publication quality  
**Guardrail:** hallucination, scaled abuse  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CON-009 — Require row-level uniqueness at scale

```text
IF a template generates pages from a dataset
THEN require accurate unique data, distinct user utility, and a valid canonical task for each row
ELSE consolidate rows into filters, tables, or broader assets
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Structural, Paradigm  
**Primary metric:** unique-value coverage per generated page  
**Guardrail:** doorway and thin-page risk  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CON-010 — Use media when it improves the task

```text
IF an image, diagram, video, audio, or interactive can explain or demonstrate more effectively
THEN include accessible, relevant media and measure its use
ELSE keep the experience text-first where sufficient
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** media-assisted task completion  
**Guardrail:** performance, accessibility  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CON-011 — Define refresh triggers

```text
IF content depends on changing data or conditions
THEN assign owner, source, review cadence, and event-triggered updates
ELSE review only when performance or business context changes
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** freshness SLA  
**Guardrail:** maintenance debt  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CON-012 — Support commercial pages with useful assets

```text
IF a commercial page is important but difficult to cite or insufficient for research-stage users
THEN create genuinely useful supporting evidence, tools, comparisons, or guides
ELSE improve the commercial page directly
```

**Operators:** IF · AND · OR · THEN · ELSE  
**LAKA level(s):** Major, Structural  
**Primary metric:** assisted commercial value  
**Guardrail:** manufactured link bait  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


## 6. On-page and Search Appearance


### ONP-001 — Align the title with the task

```text
IF the title does not clearly identify the page’s dominant task or value
THEN rewrite it truthfully for relevance and useful differentiation
ELSE retain it and monitor
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Minor  
**Primary metric:** position-adjusted CTR  
**Guardrail:** qualified conversion rate  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### ONP-002 — Use unique titles for unique canonicals

```text
IF two intended indexable canonical pages use materially duplicate titles
THEN differentiate titles according to their distinct tasks
ELSE allow shared patterns with unique identifying content
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Minor, Structural  
**Primary metric:** duplicate-title rate  
**Guardrail:** template inconsistency  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### ONP-003 — Measure title changes causally

```text
IF a title or snippet is changed
THEN record change date, exposed queries/pages, expected mechanism, and CTR guardrails
ELSE do not claim impact
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Minor  
**Primary metric:** CTR residual  
**Guardrail:** ranking, conversion, seasonality  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### ONP-004 — Write descriptions for decision support

```text
IF the result snippet can help users determine relevance
THEN write a concise truthful proposition with task, benefit, and distinguishing detail
ELSE allow the search engine to select contextual text
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Minor  
**Primary metric:** organic CTR  
**Guardrail:** snippet mismatch  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### ONP-005 — Use headings as answer architecture

```text
IF the task has stages, criteria, subquestions, or choices
THEN structure headings around those information functions
ELSE use a simple hierarchy
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** section-level task coverage  
**Guardrail:** heading keyword stuffing  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### ONP-006 — Write natural body language

```text
IF required concepts, entities, attributes, and relations are missing
THEN add them where they improve the explanation
ELSE do not insert terms solely for coverage scores
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** semantic task completeness  
**Guardrail:** readability  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### ONP-007 — Reject keyword stuffing

```text
IF repetition exists primarily to influence ranking rather than aid comprehension
THEN remove or rewrite it and preserve only natural references
ELSE retain meaningful repetition
```

**Operators:** IF · THEN · ELSE  
**LAKA level(s):** Minor  
**Primary metric:** editorial quality  
**Guardrail:** loss of clarity  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### ONP-008 — Describe meaningful images

```text
IF an image communicates information or functions as a link/control
THEN provide appropriate descriptive alternative text
ELSE use empty alternative text for purely decorative images
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Minor, Structural  
**Primary metric:** accessible-media coverage  
**Guardrail:** redundant alt text  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### ONP-009 — Optimize new URLs, protect old ones

```text
IF a page has not launched
THEN use a concise descriptive stable URL
ELSE avoid changing an established URL without a migration case
```

**Operators:** IF · THEN · ELSE  
**LAKA level(s):** Minor, Structural  
**Primary metric:** URL stability and migration retention  
**Guardrail:** redirect chains  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### ONP-010 — Use structured data only when applicable

```text
IF a supported structured-data type accurately represents visible page content
THEN implement and validate it
ELSE do not add irrelevant or hidden markup
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Major, Structural  
**Primary metric:** valid eligible items  
**Guardrail:** manual action, markup drift  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### ONP-011 — Measure rich-result realization

```text
IF structured data validates successfully
THEN measure actual search appearance, impressions, CTR, and value
ELSE debug eligibility or accept that display is not guaranteed
```

**Operators:** IF · THEN · ELSE  
**LAKA level(s):** Baseline, Major  
**Primary metric:** rich-result appearance and value  
**Guardrail:** misattribution  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### ONP-012 — Adjust CTR expectations

```text
IF CTR is evaluated
THEN control for position, device, country, brand status, query class, and search appearance
ELSE do not use a universal CTR threshold
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** CTR residual  
**Guardrail:** low sample size  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


## 7. Internal Graph and Architecture


### GRF-001 — Link every priority page

```text
IF a page is intended to receive organic visibility
THEN ensure at least one crawlable contextual internal link points to it
ELSE remove it from the priority/index set if it has no valid role
```

**Operators:** IF · THEN · ELSE · AT_LEAST  
**LAKA level(s):** Baseline, Minor  
**Primary metric:** priority-page orphan rate  
**Guardrail:** forced links  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GRF-002 — Use descriptive anchors

```text
IF anchor text is generic and a natural descriptive label is available
THEN replace it with concise context-setting text
ELSE retain the generic control only when interface convention requires it
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Minor  
**Primary metric:** descriptive-anchor coverage  
**Guardrail:** over-optimization  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GRF-003 — Require user context for links

```text
IF a proposed link does not help the reader understand, compare, verify, or take the next step
THEN do not add it
ELSE add it in the relevant sentence or interface
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Minor  
**Primary metric:** useful internal-link interaction  
**Guardrail:** link clutter  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GRF-004 — Create hubs for navigation needs

```text
IF a coherent task family requires users to choose among multiple paths
THEN create or improve a hub with clear categories and routes
ELSE connect assets contextually without a dedicated hub
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** hub-assisted discovery and conversion  
**Guardrail:** empty taxonomy pages  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GRF-005 — Validate supporting assets

```text
IF an adjacent question has independent demand, a complete answer, and a useful relationship to a core asset
THEN create a supporting asset and connect it
ELSE include it as a section or FAQ
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** supporting-asset assisted value  
**Guardrail:** thin content  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GRF-006 — Reduce excessive depth

```text
IF important pages are difficult to reach through internal navigation
THEN add meaningful paths, hubs, or template links
ELSE retain depth for low-value or intentionally isolated pages
```

**Operators:** IF · THEN · ELSE · OR  
**LAKA level(s):** Structural  
**Primary metric:** priority-page click depth  
**Guardrail:** navigation overload  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GRF-007 — Use strong internal sources deliberately

```text
IF an authoritative owned page can naturally support a high-value target
THEN add a contextual link where it benefits the reader
ELSE do not insert an unrelated link solely to move authority
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Minor  
**Primary metric:** target visibility lift  
**Guardrail:** source-page task disruption  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GRF-008 — Keep topical communities coherent

```text
IF a link crosses unrelated topic communities without user need
THEN remove or avoid it
ELSE retain cross-topic links that represent a real prerequisite, comparison, or journey edge
```

**Operators:** IF · AND · NOT · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** topical edge precision  
**Guardrail:** over-siloing  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GRF-009 — Make links crawlable

```text
IF navigation or internal discovery relies on nonstandard scripted interactions
THEN expose crawlable anchors with destinations and validate rendered HTML
ELSE retain standard crawlable links
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Structural  
**Primary metric:** crawlable-link coverage  
**Guardrail:** duplicate navigation  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GRF-010 — Concentrate, do not hoard

```text
IF many low-value pages dilute attention and internal graph flow
THEN consolidate, noindex, archive, or demote according to user and business value
ELSE retain useful nodes
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** value-weighted index and graph concentration  
**Guardrail:** loss of long-tail value  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GRF-011 — Update the graph after migrations

```text
IF a page is merged, redirected, renamed, or retired
THEN update internal links, navigation, canonicals, and sitemaps to the final destination
ELSE leave the graph unchanged
```

**Operators:** IF · OR · THEN · ELSE · AND  
**LAKA level(s):** Structural  
**Primary metric:** direct-to-final-link rate  
**Guardrail:** redirect loops  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GRF-012 — Measure paths, not link counts alone

```text
IF internal linking is evaluated
THEN measure discovery, depth, target visibility, task progression, and conversion paths
ELSE use raw link counts only as diagnostics
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Baseline  
**Primary metric:** graph-assisted value  
**Guardrail:** correlation mistaken for causation  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


## 8. External Authority and Earned Evidence


### AUT-001 — Evaluate link quality multidimensionally

```text
IF an external link opportunity is considered
THEN evaluate relevance, editorial independence, source credibility, placement, uniqueness, and persistence
ELSE reject or deprioritize the opportunity
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** qualified retained referring domains  
**Guardrail:** spam and paid-link risk  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUT-002 — Create a linkable reason

```text
IF outreach asks for attention without a concrete user benefit
THEN build or identify data, utility, evidence, correction, visualization, or unique reference value
ELSE lead with the existing value
```

**Operators:** IF · AND · NOT · THEN · ELSE · OR  
**LAKA level(s):** Major, Paradigm  
**Primary metric:** placement rate  
**Guardrail:** misleading claims  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUT-003 — Support difficult commercial targets

```text
IF the target commercial page is unlikely to earn independent citations
THEN earn links to a relevant useful asset and connect it to the target OR improve the target’s reference value
ELSE promote the target directly
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major, Structural  
**Primary metric:** assisted target-page visibility  
**Guardrail:** manipulative intermediary pages  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUT-004 — Reject manipulative placements

```text
IF a link requires deception, irrelevant insertion, undisclosed payment, or policy violation
THEN reject it
ELSE proceed with transparent editorial or appropriately attributed placement
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** policy-compliant placement rate  
**Guardrail:** manual actions, reputation  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUT-005 — Prefer unique relevant domains

```text
IF many links come repeatedly from the same source while relevant independent sources are available
THEN diversify outreach toward unique relevant domains
ELSE deepen the useful relationship without treating every link as independent authority
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** qualified unique referring domains  
**Guardrail:** diversity for its own sake  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUT-006 — Prefer contextual editorial placement

```text
IF a link can appear in a useful body context or only in a repeated footer/sidebar
THEN prefer the contextual editorial placement
ELSE treat repeated placement as lower-confidence evidence
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** contextual placement share  
**Guardrail:** sponsorship disclosure  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUT-007 — Use tool metrics as proxies

```text
IF DA, DR, UR, PA, traffic estimates, or difficulty scores are used
THEN treat them as vendor-specific diagnostics and compare within one system
ELSE use direct observations where available
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** proxy-to-outcome calibration  
**Guardrail:** cross-tool comparisons  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUT-008 — Investigate lost evidence

```text
IF a valuable relevant link or mention disappears
THEN classify cause and recover only when the source relationship and user value remain valid
ELSE record normal churn
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Minor, Major  
**Primary metric:** valuable-link recovery rate  
**Guardrail:** harassing outreach  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUT-009 — Measure brand demand effects

```text
IF earned media or authoritative mentions may increase awareness without direct referral clicks
THEN track branded queries, direct visits, assisted conversions, and target visibility
ELSE measure direct referral and link effects
```

**Operators:** IF · AND · NOT · THEN · ELSE  
**LAKA level(s):** Baseline, Major  
**Primary metric:** incremental branded demand  
**Guardrail:** campaign overlap  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUT-010 — Segment outreach by relationship

```text
IF prospects differ by audience, reason to care, or editorial context
THEN create distinct outreach propositions and evidence packages
ELSE use one aligned proposition
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** positive reply and placement rate by segment  
**Guardrail:** automation quality  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUT-011 — Compound original research

```text
IF original data or a benchmark performs well
THEN refresh it, expose methodology, create reusable views, and connect related clusters
ELSE treat it as a one-time asset
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Structural, Paradigm  
**Primary metric:** research-attributed links and value  
**Guardrail:** methodology drift  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### AUT-012 — Judge authority by target outcomes

```text
IF links or mentions increase but the target cluster does not improve
THEN inspect relevance, target selection, indexing, content fit, and time lag
ELSE continue scaling the validated authority mechanism
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Baseline, Major  
**Primary metric:** incremental target-cluster visibility and value  
**Guardrail:** over-attribution  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


## 9. Technical Eligibility


### TEC-001 — Require public accessibility

```text
IF a page is intended for search visibility
THEN ensure users and permitted crawlers can request its essential content
ELSE exclude it intentionally
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Baseline, Structural  
**Primary metric:** accessible-priority-URL rate  
**Guardrail:** private or sensitive exposure  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### TEC-002 — Use correct response states

```text
IF a canonical page is healthy and available
THEN return a successful response; use redirects, not-found, or server errors only for their true states
ELSE repair the response logic
```

**Operators:** IF · THEN · ELSE · OR  
**LAKA level(s):** Structural  
**Primary metric:** correct-status rate  
**Guardrail:** soft 404s  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### TEC-003 — Validate rendered main content

```text
IF essential content or links depend on JavaScript
THEN inspect rendered output and ensure resources are accessible
ELSE use the server-delivered content
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** rendered-content parity  
**Guardrail:** hydration and blocked-resource errors  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### TEC-004 — Separate crawling from indexing controls

```text
IF the goal is to keep a page out of search results
THEN use an appropriate noindex, authentication, removal, redirect, or deletion method
ELSE use robots.txt only to manage crawler requests, not as a deindex guarantee
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** intended index-state accuracy  
**Guardrail:** content leakage  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### TEC-005 — Maintain canonical coherence

```text
IF multiple URLs represent substantially the same content
THEN select a preferred URL and align canonical, redirects where appropriate, links, and sitemap signals
ELSE self-canonicalize the unique asset where useful
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** canonical agreement  
**Guardrail:** canonical chains  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### TEC-006 — Keep sitemaps canonical and current

```text
IF a URL is important, canonical, and intended for indexing
THEN include its clean URL and accurate modification state in the sitemap
ELSE exclude noncanonical, redirected, error, or intentionally nonindexed URLs
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** valid canonical sitemap coverage  
**Guardrail:** misleading lastmod  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### TEC-007 — Redirect to the closest valid successor

```text
IF a URL permanently moves or is consolidated
THEN redirect directly to the most relevant final destination and update internal references
ELSE serve the existing URL
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** direct permanent-redirect accuracy  
**Guardrail:** chains, loops, irrelevant redirects  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### TEC-008 — Treat not-found pages intentionally

```text
IF a resource no longer exists and has no valid replacement
THEN return a real not-found state with helpful navigation
ELSE redirect only when a genuine equivalent exists
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** soft-404 rate  
**Guardrail:** lost valuable links  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### TEC-009 — Control faceted and parameter volume

```text
IF filters, sorting, search, tracking, or session parameters create many near-duplicate URLs
THEN define crawl, canonical, link, and index rules by facet value
ELSE allow unique valuable combinations
```

**Operators:** IF · OR · THEN · ELSE · AND  
**LAKA level(s):** Structural  
**Primary metric:** valuable-crawl share  
**Guardrail:** index explosion  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### TEC-010 — Preserve content parity

```text
IF mobile, desktop, locale, or rendered versions differ
THEN ensure essential content, metadata, structured data, and links remain equivalent where they should
ELSE document intentional differences
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** version parity  
**Guardrail:** cloaking-like mismatches  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### TEC-011 — Prioritize real-user performance

```text
IF field performance or business outcomes show latency, instability, or interaction problems
THEN fix the highest-exposure causes and measure Core Web Vitals plus conversion/task outcomes
ELSE repair only obvious low-cost issues and avoid score chasing
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Minor, Structural  
**Primary metric:** good-CWV exposure and task value  
**Guardrail:** functionality regression  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### TEC-012 — Scale crawl work to site size and change rate

```text
IF the site is very large, rapidly changing, or shows crawl/index waste
THEN invest in crawl-path, logs, facets, and index-quality optimization
ELSE use a lighter periodic technical audit
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** valuable indexed URLs per crawl/resource unit  
**Guardrail:** technical work without business case  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


## 10. Conversion and Experience


### CVR-001 — Complete the search task before selling

```text
IF the page asks for conversion before delivering the promised answer
THEN front-load useful task completion and place the offer at a logical transition
ELSE retain the aligned conversion path
```

**Operators:** IF · BEFORE · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** task completion then conversion  
**Guardrail:** reduced qualified action  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CVR-002 — Match nudge to journey state

```text
IF the next action is not adjacent to the user’s current state
THEN choose a lower-friction or more relevant action
ELSE measure the existing transition
```

**Operators:** IF · THEN · ELSE  
**LAKA level(s):** Minor, Major  
**Primary metric:** next-state conversion rate  
**Guardrail:** lead quality  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CVR-003 — Optimize speed for outcomes

```text
IF slow or unstable experience correlates with abandonment or conversion loss
THEN fix the responsible bottleneck and validate field/user outcomes
ELSE do not pursue a perfect tool score solely for ranking
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Minor, Structural  
**Primary metric:** conversion and task completion by performance band  
**Guardrail:** broken features  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CVR-004 — Reduce form friction selectively

```text
IF form abandonment is high AND removed fields are not needed for qualification or routing
THEN shorten, stage, or clarify the form
ELSE retain fields and improve explanation
```

**Operators:** IF · AND · THEN · ELSE · OR  
**LAKA level(s):** Minor, Major  
**Primary metric:** qualified form completion  
**Guardrail:** unqualified volume  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CVR-005 — Optimize for lead quality

```text
IF lead count rises while acceptance, close rate, or margin falls
THEN tighten intent, promise, qualification, or routing
ELSE scale the validated acquisition path
```

**Operators:** IF · AND · OR · THEN · ELSE  
**LAKA level(s):** Major, Structural  
**Primary metric:** sales-accepted organic leads  
**Guardrail:** total pipeline  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CVR-006 — Test CTA propositions, not colors alone

```text
IF a CTA underperforms
THEN test task relevance, value, risk, evidence, commitment, placement, and wording before cosmetic variables
ELSE retain and scale it
```

**Operators:** IF · THEN · ELSE · BEFORE  
**LAKA level(s):** Minor, Major  
**Primary metric:** qualified CTA conversion  
**Guardrail:** misleading claims  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CVR-007 — Place trust at the decision point

```text
IF users hesitate because scope, proof, identity, terms, price, or risk is unclear
THEN place relevant evidence and clarification near the decision
ELSE avoid repetitive trust decoration
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** decision completion rate  
**Guardrail:** privacy and disclosure  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CVR-008 — Avoid premature hard selling

```text
IF the query is early-stage and commercial pressure harms task satisfaction
THEN use a useful soft transition such as a related guide, tool, save, or diagnostic
ELSE present the proportional commercial action
```

**Operators:** IF · AND · THEN · ELSE · OR  
**LAKA level(s):** Major  
**Primary metric:** assisted qualified progression  
**Guardrail:** unsubscribe, bounce  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CVR-009 — Design retention paths

```text
IF the organic visitor is an existing customer or user
THEN route to successful use, support, renewal, expansion, or advocacy
ELSE route prospects toward acquisition
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** retention/expansion event value  
**Guardrail:** support escalation  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CVR-010 — Measure satisfaction with task-specific events

```text
IF generic engagement metrics cannot show whether the task was completed
THEN instrument meaningful events such as calculator completion, comparison use, download, copy, or successful route
ELSE use the existing task event
```

**Operators:** IF · THEN · ELSE · OR  
**LAKA level(s):** Structural  
**Primary metric:** task completion rate  
**Guardrail:** event inflation  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CVR-011 — Preserve message continuity

```text
IF the search promise, landing answer, CTA, and sales follow-up describe different outcomes
THEN align the chain around one user task and offer
ELSE retain the coherent journey
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** promise-to-close continuity  
**Guardrail:** overly narrow messaging  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### CVR-012 — Protect user and brand guardrails

```text
IF a conversion intervention increases action but also complaints, refunds, low-quality leads, or distrust
THEN revert, constrain, or redesign the intervention
ELSE continue while guardrails stay within tolerance
```

**Operators:** IF · AND · OR · THEN · ELSE  
**LAKA level(s):** Minor, Major  
**Primary metric:** guardrail-adjusted conversion value  
**Guardrail:** dark patterns  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


## 11. Measurement and Experimentation


### EXP-001 — Require a mechanism hypothesis

```text
IF an intervention has no stated reason it should affect an outcome
THEN write an object → action → mechanism → outcome hypothesis
ELSE execute the stated hypothesis
```

**Operators:** IF · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** hypothesis completeness  
**Guardrail:** post-hoc storytelling  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### EXP-002 — Capture a baseline

```text
IF a change is about to be implemented
THEN record pre-change performance, context, exposure, and data quality
ELSE do not claim incremental effect
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Baseline  
**Primary metric:** baseline completeness  
**Guardrail:** seasonal distortion  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### EXP-003 — Use a change ledger

```text
IF any SEO-relevant production change occurs
THEN assign a change ID, owner, scope, time, expected mechanism, and rollback state
ELSE retain the previous ledger
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Structural  
**Primary metric:** change attribution coverage  
**Guardrail:** logging overhead  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### EXP-004 — Choose one primary metric

```text
IF an experiment has many possible success metrics
THEN select one primary decision metric and label others secondary or guardrail
ELSE use the aligned primary metric
```

**Operators:** IF · THEN · ELSE · EXACTLY_ONE  
**LAKA level(s):** Baseline  
**Primary metric:** decision consistency  
**Guardrail:** metric cherry-picking  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### EXP-005 — Set guardrails before launch

```text
IF a change can improve the primary metric while harming quality, accessibility, revenue, or trust
THEN define guardrail thresholds and rollback behavior
ELSE use standard site guardrails
```

**Operators:** IF · OR · THEN · ELSE · AND  
**LAKA level(s):** Baseline  
**Primary metric:** guardrail breach rate  
**Guardrail:** unobserved harm  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### EXP-006 — Use controls when feasible

```text
IF comparable untreated pages, clusters, regions, or time periods exist
THEN use a control or difference-in-differences design
ELSE use interrupted time series with explicit limitations
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** estimated incremental lift  
**Guardrail:** control contamination  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### EXP-007 — Account for seasonality and external events

```text
IF demand, algorithms, campaigns, news, inventory, or holidays can affect the outcome
THEN annotate and model those factors before attributing change
ELSE use the stable comparison
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** context-adjusted lift  
**Guardrail:** overfitting  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### EXP-008 — Represent uncertainty

```text
IF sample size is small, variance is high, or exposure is incomplete
THEN report ranges, confidence, and directional evidence
ELSE report the stable estimate
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** estimate uncertainty  
**Guardrail:** false precision  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### EXP-009 — Allow processing and learning time

```text
IF a change has not had enough crawl, index, ranking, or behavioral exposure
THEN continue observation until the predefined minimum exposure or stop condition
ELSE make the decision
```

**Operators:** IF · OR · THEN · ELSE · UNTIL  
**LAKA level(s):** Baseline  
**Primary metric:** minimum-exposure completion  
**Guardrail:** indefinite waiting  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### EXP-010 — Distinguish single-variable and package tests

```text
IF several material variables change together
THEN classify the intervention as a package test OR separate variables for causal learning
ELSE treat it as a focused test
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Minor, Major, Structural  
**Primary metric:** attribution confidence  
**Guardrail:** slow recovery  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### EXP-011 — Escalate by diagnosed mechanism

```text
IF a lower-level LAKA intervention fails
THEN re-diagnose and move to Major, Structural, or Paradigm only when the failure mechanism requires it
ELSE retain or scale the successful level
```

**Operators:** IF · THEN · ELSE · OR  
**LAKA level(s):** Minor, Major, Structural, Paradigm  
**Primary metric:** value gained per escalation  
**Guardrail:** unnecessary redesign  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### EXP-012 — Use explicit continue/revise/revert/retire decisions

```text
IF a review point is reached
THEN choose exactly one decision based on primary metric, guardrails, cost, and confidence
ELSE continue observation only under a predefined uncertainty rule
```

**Operators:** IF · AND · THEN · ELSE · XOR  
**LAKA level(s):** Baseline  
**Primary metric:** decision closure rate  
**Guardrail:** zombie experiments  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


## 12. Generative Search, Scale, and Governance


### GOV-001 — Keep foundational SEO as the base

```text
IF the goal includes visibility in generative search experiences
THEN apply the same valuable-content, crawlability, indexability, and search-quality foundations
ELSE apply normal search foundations
```

**Operators:** IF · AND · THEN · ELSE  
**LAKA level(s):** Baseline, Structural  
**Primary metric:** search and generative visibility value  
**Guardrail:** channel-specific hacks  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GOV-002 — Do not depend on llms.txt for Google Search

```text
IF a proposal claims a special AI text file is required for Google visibility
THEN reject the requirement and prioritize public crawlable indexable content
ELSE maintain such a file only for a separate system that explicitly uses it
```

**Operators:** IF · THEN · ELSE  
**LAKA level(s):** Baseline  
**Primary metric:** eligible indexed coverage  
**Guardrail:** maintenance distraction  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GOV-003 — Do not chunk content mechanically

```text
IF content is being split only because an AI system is assumed to need tiny sections
THEN organize by human task, readability, and information structure
ELSE retain useful natural sections
```

**Operators:** IF · THEN · ELSE  
**LAKA level(s):** Major  
**Primary metric:** task completion and retrieval coverage  
**Guardrail:** fragmentation  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GOV-004 — Use query fan-out as a research map

```text
IF a broad request implies related information needs
THEN map prerequisite, comparison, evidence, and follow-up needs across the cluster graph
ELSE use the direct task map
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Major, Structural  
**Primary metric:** fan-out information coverage  
**Guardrail:** one-page-per-query expansion  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GOV-005 — Block scaled content abuse

```text
IF content volume is generated primarily to manipulate rankings or AI responses without distinct user value
THEN stop publication and redesign the system
ELSE continue only with row-level utility, accuracy, and governance
```

**Operators:** IF · AND · NOT · THEN · ELSE  
**LAKA level(s):** Structural, Paradigm  
**Primary metric:** unique useful asset rate  
**Guardrail:** spam-policy exposure  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GOV-006 — Measure generative visibility directly

```text
IF Search Console or another first-party surface provides generative-search reporting
THEN track it as a distinct search appearance and connect it to downstream value
ELSE use broader search and referral diagnostics with limitations
```

**Operators:** IF · THEN · ELSE · AND  
**LAKA level(s):** Baseline, Structural  
**Primary metric:** generative-search qualified value  
**Guardrail:** reporting coverage  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GOV-007 — Do not invent AI-specific schema

```text
IF a proposal adds unsupported structured data solely for generative visibility
THEN reject it; use supported structured data only when it matches visible content
ELSE validate the applicable markup
```

**Operators:** IF · THEN · ELSE  
**LAKA level(s):** Baseline, Structural  
**Primary metric:** valid supported markup  
**Guardrail:** markup abuse  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GOV-008 — Prepare for agentic use through usability

```text
IF browser agents or assistive systems need to interpret and operate the site
THEN improve semantic controls, labels, accessible structure, clear states, and stable data
ELSE retain the usable human-facing implementation
```

**Operators:** IF · OR · THEN · ELSE · AND  
**LAKA level(s):** Structural, Paradigm  
**Primary metric:** successful task completion by automated/assistive clients  
**Guardrail:** security and consent  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GOV-009 — Expose freshness and provenance

```text
IF data may change or be reused in generated answers
THEN show dates, methodology, sources, ownership, and update state where useful
ELSE omit unnecessary metadata
```

**Operators:** IF · OR · THEN · ELSE · AND  
**LAKA level(s):** Major  
**Primary metric:** freshness/provenance completeness  
**Guardrail:** false recency  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GOV-010 — Constrain programmatic expansion

```text
IF candidate combinations exceed quality or maintenance capacity
THEN raise gates, consolidate, stage release, or automate verified data maintenance
ELSE publish within capacity
```

**Operators:** IF · OR · THEN · ELSE  
**LAKA level(s):** Structural  
**Primary metric:** maintained useful-page rate  
**Guardrail:** index and maintenance debt  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GOV-011 — Protect privacy, consent, and sensitive data

```text
IF volumetric generation or personalization uses personal, confidential, licensed, or restricted data
THEN minimize data, obtain rights/consent, secure access, and exclude unsafe outputs
ELSE use public or owned permissible data
```

**Operators:** IF · OR · THEN · ELSE · AND  
**LAKA level(s):** Structural  
**Primary metric:** governance compliance  
**Guardrail:** privacy harm  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


### GOV-012 — Pursue paradigm assets selectively

```text
IF a new tool, dataset, benchmark, diagnostic, or agent can complete the task far better than existing result classes
THEN run a bounded paradigm experiment with a defensibility and maintenance plan
ELSE improve the current asset class
```

**Operators:** IF · OR · THEN · ELSE · AND  
**LAKA level(s):** Paradigm  
**Primary metric:** new-demand and incremental value creation  
**Guardrail:** build cost, adoption risk  
**Reason:** Makes the decision explicit, measurable, and reversible where possible.


## Composite decision programs

### Program A — Should a new page exist?

```text
IF observed_or_defensible_demand
AND distinct_task
AND one_canonical_role
AND meaningful_information_advantage
AND business_or_strategic_value
AND maintainable_accuracy
AND technical_feasibility
AND measurable_outcome
THEN approve page specification
ELSE:
    merge into existing page
    OR create a section
    OR retain as research
    OR reject
```

### Program B — Should two pages merge?

```text
IF same_sense
AND same_dominant_task
AND substantial_query_overlap
AND combined_answer_improves_user_value
AND migration_risk_is_acceptable
THEN:
    choose winner
    merge best information
    redirect loser
    update internal links
    update sitemap
    observe retained value
ELSE:
    clarify separate intents
    OR reposition weaker page
```

### Program C — What should be fixed first?

```text
IF measurement_is_unreliable
THEN fix measurement
ELSE IF priority_asset_is_ineligible
THEN fix technical eligibility
ELSE IF existing_asset_has_high_value_gap
THEN optimize existing asset
ELSE IF canonical_ownership_is_confused
THEN consolidate or restructure
ELSE IF information_product_is_inferior
THEN improve content, evidence, or format
ELSE IF authority_gap_is_material
THEN build independent evidence and promotion
ELSE create the highest-scoring new asset
```

### Program D — LAKA escalation

```text
START Baseline

IF failure is presentation-level
THEN Minor
ELSE IF failure is answer/evidence/format-level
THEN Major
ELSE IF failure spans pages, templates, graph, or data systems
THEN Structural
ELSE IF the current solution class cannot satisfy the opportunity
THEN Paradigm
ELSE stop or monitor
```

### Program E — Volumetric scale permission

```text
FOR EACH candidate combination:
    IF distinct_task
    AND unique_or_verified_data
    AND useful_output
    AND canonical_role
    AND maintenance_owner
    AND measurable_value
    THEN allow staged generation
    ELSE consolidate, filter, or suppress

UNTIL:
    marginal_value < marginal_cost
    OR quality_guardrail fails
    OR maintenance_capacity is reached
```


---

<!-- Source file: 05-MEASUREMENT-AND-EXPERIMENT-SYSTEM.md -->

# 05 — Measurement and Experiment System

## 1. Measurement philosophy

SEO is a partially observed causal system. Search engines do not expose every internal variable, so the measurement model separates:

```text
BUSINESS OUTCOMES
DIAGNOSTIC OUTCOMES
SYSTEM STATES
INTERVENTIONS
CONTEXT
UNCERTAINTY
```

Never infer success from a proxy without checking the downstream outcome it is supposed to influence.

```text
ranking ↑
does not automatically imply
qualified value ↑
```

---

## 2. Outcome hierarchy

### Level 1 — Business outcomes

```text
qualified leads
sales
subscription starts
retained customers
expansion revenue
support value
contribution margin
customer lifetime value
```

### Level 2 — Journey outcomes

```text
task completion
next-step action
assessment completion
demo request
quote request
trial start
qualified form
return visit
renewal action
referral/review
```

### Level 3 — Search outcomes

```text
impressions
search appearances
average position / rank distribution
clicks
CTR
landing sessions
branded demand
non-branded demand
```

### Level 4 — Asset and graph diagnostics

```text
query-cluster coverage
canonical ownership
internal in-links
click depth
orphan state
qualified referring domains
content/evidence completeness
freshness
```

### Level 5 — Technical states

```text
discoverable
crawlable
renderable
canonicalized
indexable
indexed
retrievable
valid structured data
field performance
```

---

## 3. Primary formulas

### 3.1 Actual organic contribution margin

```text
ACTUAL ORGANIC CONTRIBUTION
=
Σ(
  attributed organic conversions
  × contribution margin per conversion
)
− attributable SEO operating cost
```

### 3.2 Incremental lift

When a reasonable comparison group exists:

```text
INCREMENTAL LIFT
=
(Post_treatment − Pre_treatment)
−
(Post_control − Pre_control)
```

Apply separately to:

- impressions;
- clicks;
- qualified conversions;
- revenue;
- contribution margin;
- retention.

### 3.3 Expected value

```text
EXPECTED VALUE
=
Σ(
  demand estimate
  × probability of eligibility
  × probability of useful visibility
  × expected CTR
  × expected qualified conversion rate
  × contribution margin
)
− expected cost
```

Every estimated input must be labeled and later replaced with observed data.

### 3.4 Value-weighted visibility

```text
VALUE-WEIGHTED VISIBILITY
=
Σ(
  query opportunity value
  × observed visibility weight
)
/
Σ(query opportunity value)
```

Visibility weight may be based on impression share, rank distribution, or a calibrated CTR curve.

### 3.5 CTR residual

```text
CTR RESIDUAL
=
Observed CTR
− Expected CTR(
    position,
    device,
    country,
    brand class,
    query class,
    search appearance
  )
```

This is more useful than a universal “good CTR” threshold.

### 3.6 Qualified conversion value

```text
QUALIFIED ORGANIC VALUE
=
organic value events
× qualification probability
× contribution margin
```

### 3.7 Opportunity score

```text
OPPORTUNITY SCORE
=
(
  demand confidence
  × business fit
  × task value
  × information advantage
  × attainable response gap
  × conversion value
  × evidence confidence
)
/
(
  effort
  × risk
  × maintenance burden
  × time to learning
)
```

### 3.8 Eligible canonical coverage

```text
ELIGIBLE CANONICAL COVERAGE
=
priority canonical URLs that are eligible and indexed
/
all priority canonical URLs intended for indexing
```

### 3.9 Canonical agreement

```text
CANONICAL AGREEMENT
=
URLs where intended/declarative canonical agrees with observed selected canonical
/
evaluated duplicate or canonical URLs
```

### 3.10 Cannibalization indicators

```text
DOMINANT URL SHARE
=
largest URL impression share for cluster
/
total cluster impressions
```

```text
URL ENTROPY
=
−Σ(p_url × ln(p_url))
```

High entropy is a diagnostic, not automatic failure. Confirm same-intent duplication, instability, divided links, or value loss.

### 3.11 Internal graph diagnostics

```text
PRIORITY ORPHAN RATE
=
priority pages with no useful crawlable internal in-link
/
all priority pages
```

```text
WEIGHTED CLICK DEPTH
=
Σ(page business weight × page click depth)
/
Σ(page business weight)
```

### 3.12 Authority diagnostics

```text
QUALIFIED LINK RATE
=
retained relevant editorial referring domains
/
all acquired referring domains
```

---

## 4. Data grain

Store search observations at the smallest useful grain:

```text
date
site_id
cluster_id
query
canonical_url
country
device
search_type
search_appearance
brand_class
change_id
```

Attach:

```text
impressions
clicks
ctr
average_position
organic_sessions
task_completions
next_actions
qualified_leads
sales
revenue
contribution_margin
```

Store technical observations separately:

```text
observation_time
url
status_code
robots_allowed
render_success
declared_canonical
selected_canonical
index_state
sitemap_state
internal_inlinks
click_depth
field_lcp
field_inp
field_cls
structured_data_state
```

Store changes:

```text
change_id
object_type
object_id
laka_level
hypothesis
mechanism
owner
start_time
end_time
rollback_state
primary_metric
guardrails
decision_rule
```

---

## 5. Event dictionary

A measurement plan must define every event.

| Event | Definition | Required properties |
|---|---|---|
| `organic_landing` | Session begins on an organic search landing page | landing URL, cluster, query class |
| `task_start` | User initiates the primary page task | task ID |
| `task_complete` | User reaches a valid completion condition | task ID, method |
| `next_action` | User takes the intended adjacent step | action ID |
| `qualified_form` | Form meets qualification rules | offer, segment, qualification |
| `sales_accept` | Sales accepts the lead | CRM status |
| `closed_value` | Revenue or margin is confirmed | value, margin, offer |
| `retention_value` | Renewal, expansion, or support outcome | customer, event value |
| `evidence_interaction` | User opens data, sources, demo, comparison, or case proof | evidence ID |
| `internal_path` | User follows a meaningful graph edge | edge type, target |
| `calculator_complete` | Tool returns a valid result | inputs band, result band |
| `download_use` | User downloads or uses a template | asset ID |

Avoid meaningless event inflation. An event should correspond to a user state or business state.

---

## 6. Baseline protocol

Before changing a priority object:

```text
1. Verify data collection.
2. Define treatment object and exposure.
3. Record at least the available stable pre-period.
4. Record query mix, device, country, brand class, and seasonality.
5. Record technical eligibility.
6. Record current page and graph state.
7. Record current business value.
8. Assign change ID.
9. Predefine primary metric and guardrails.
10. State minimum exposure and review rule.
```

If historical data is unavailable, create a prospective baseline and explicitly reduce causal confidence.

---

## 7. Hypothesis grammar

```text
IF [INTERVENTION]
is applied to [OBJECT]
under [CONDITIONS],
THEN [PRIMARY METRIC]
will change in [DIRECTION]
because [MECHANISM],
while [GUARDRAILS]
remain within [THRESHOLDS].
```

Example:

```text
IF the title proposition for the Calgary web design cost guide
is rewritten to state the year, location, and estimator benefit,
THEN position-adjusted organic CTR will increase
because relevance and expected utility become clearer,
while qualified assessment rate does not decline by more than 10%.
```

---

## 8. LAKA experiment card

```text
Experiment ID:
Object:
Conditions:
Action:
Tools:
Resources:
Expected outcome:
Feedback source:
Constraints:
Value:
Failure mode:

LAKA level:
Magnitude:
Rate:
Direction:
Scope:
Depth:
Duration:
Frequency:
Acceleration:
Variability:
Detectability:
Reversibility:
Propagation:
Amplification:
Accumulation:

Primary metric:
Baseline:
Treatment scope:
Comparison:
Minimum exposure:
Decision rule:
Guardrails:
Rollback:
Owner:
```

---

## 9. Decision outcomes

At every review, choose one:

```text
CONTINUE
EXPAND
REVISE
REVERSE
ESCALATE
RETIRE
MONITOR
```

### Continue

```text
IF evidence is positive
AND guardrails pass
AND additional exposure is needed
THEN continue.
```

### Expand

```text
IF positive effect is credible
AND mechanism is transferable
AND capacity permits
THEN expand to a defined cohort.
```

### Revise

```text
IF mechanism appears valid
BUT implementation is weak or guardrails fail mildly
THEN revise.
```

### Reverse

```text
IF primary outcome declines materially
OR a critical guardrail fails
AND rollback is feasible
THEN reverse.
```

### Escalate

```text
IF the diagnosed failure is deeper than the current LAKA level
AND expected value still exceeds cost
THEN escalate.
```

### Retire

```text
IF remaining value is low
OR maintenance/risk is too high
OR the asset has no distinct task
THEN consolidate, redirect, noindex, archive, or remove appropriately.
```

---

## 10. Experiment types

### 10.1 Minor element test

Examples:

- title proposition;
- snippet description;
- introductory answer;
- CTA wording;
- anchor text;
- small media change.

Best for high exposure and reversible mechanisms.

### 10.2 Major asset test

Examples:

- full rewrite;
- new comparison;
- original data;
- tool or video;
- new evidence architecture.

Evaluate as an intervention package unless components can be separated.

### 10.3 Structural test

Examples:

- page merge;
- template change;
- internal graph redesign;
- facet control;
- CRM linkage;
- site architecture.

Use cohort or time-series analysis and monitor propagation.

### 10.4 Paradigm test

Examples:

- calculator instead of article;
- benchmark instead of generic guide;
- verified directory instead of location-page set;
- interactive diagnostic instead of lead form;
- data API or agent action instead of static copy.

Primary value may include new demand, citations, brand searches, product adoption, and conversion.

---

## 11. Comparison designs

Use the strongest feasible design:

```text
Randomized controlled test
> matched page/cluster control
> staggered rollout
> difference-in-differences
> interrupted time series
> before/after with context controls
> directional observation
```

SEO often prevents perfect randomization. State the design’s limits rather than implying certainty.

---

## 12. Observation windows

Do not use one fixed calendar window for every intervention. Define exposure criteria:

```text
minimum crawl confirmation
minimum index confirmation
minimum impressions
minimum qualified sessions
minimum conversions
minimum full business cycle
```

A review may occur when one or more exposure thresholds are met, with a maximum stop date to prevent endless observation.

---

## 13. Dashboard architecture

### Executive dashboard

```text
incremental organic contribution margin
qualified organic conversions
value-weighted non-brand clicks
value-weighted target-cluster visibility
eligible canonical coverage
```

### Demand dashboard

```text
cluster impressions
new query families
branded vs non-branded
journey state
audience/offer
country/device
value-weighted demand
```

### Asset dashboard

```text
canonical owner
rank distribution
CTR residual
task completion
next-action conversion
freshness
information/evidence score
```

### Technical dashboard

```text
status correctness
render parity
canonical agreement
index eligibility
sitemap coverage
orphan rate
click depth
field CWV exposure
structured data validity
```

### Authority dashboard

```text
qualified new/lost referring domains
relevance
target page
placement type
retention
brand-demand lift
assisted value
```

### Experiment dashboard

```text
change ID
LAKA level
status
primary metric
effect estimate
uncertainty
guardrails
decision
learning
```

---

## 14. Metric anti-patterns

```text
DO NOT:
count indexed pages as success without value;
treat average position as a precise rank;
use a single sitewide CTR benchmark;
equate bounce with failure for every task;
equate tool authority scores with Google internals;
claim revenue from a forecast;
attribute all movement to the most recent change;
ignore branded demand created by other channels;
optimize event count rather than user state;
continue an experiment without a stop rule.
```

---

## 15. Monthly learning review

Ask:

```text
Which clusters created the most qualified value?
Which assets lost demand or eligibility?
Which query families are emerging?
Where is the intended canonical not dominant?
Which formats improve task completion?
Which evidence earns links or branded demand?
Which next actions produce quality, not merely volume?
Which technical failures block the most value?
Which LAKA level produced the best value per effort?
Which assumptions were disproved?
What should the generator weight differently next month?
```

The output is an updated rule prior, portfolio, and backlog—not merely a report.


---

<!-- Source file: 06-AUDIT-AND-EXECUTION-SOPS.md -->

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


---

<!-- Source file: 07-PAGE-AND-CLUSTER-TEMPLATES.md -->

# 07 — Page and Cluster Templates

Copy these templates into your project. Keep unknown fields visible as research questions.

---

## Template A — Business and value model

```markdown
# Business Value Model

Business:
Offer:
Audience:
Geography:
Primary business goal:
Qualified value event:
Qualification rule:
Average revenue per event:
Average contribution margin per event:
Capacity constraint:
Sales-cycle length:
Retention/expansion value:
Primary guardrails:
Data sources:
Known limitations:
```

---

## Template B — Audience–task card

```markdown
# Audience–Task Card

Audience ID:
Segment:
Role:
Industry:
Experience:
Problem awareness:
Solution awareness:
Urgency:
Budget/risk:
Geography:
Language:
Device/context:
Accessibility conditions:

Problem or desire:
Task verb:
Task object:
Completion condition:
Intent:
Journey state:
Common language:
Objections:
Wrong-audience exclusions:
Desired next state:
Business value event:
```

---

## Template C — Semantic demand inventory

| Candidate ID | Parent | Concept/entity | Relation | Attribute | Value | Audience | Task | Intent | Modifier | Query evidence | Exclusions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

---

## Template D — Intent-cluster brief

```markdown
# Intent Cluster

Cluster ID:
Working name:
Parent concept:
Dominant task:
Completion condition:
Intent:
Journey state:
Audience:
Conditions:

Representative query:
Same-intent variants:
Entities:
Relations:
Attributes:
Questions:
Adjacent intents:
Exclusions:

Demand evidence:
Business value:
Expected result forms:
Current competing result forms:
Information gap:
Information advantage:
Cluster confidence:

Intended canonical URL:
Existing URLs:
Supporting assets:
Next action:
Primary metric:
Guardrails:
Owner:
Status:
```

---

## Template E — Same-page / separate-page decision

```markdown
# Cluster Boundary Test

Candidate A:
Candidate B:

Same sense? yes/no/uncertain
Same dominant task? yes/no/uncertain
Same completion condition? yes/no/uncertain
Compatible answer structure? yes/no/uncertain
Compatible result class? yes/no/uncertain
Compatible audience state? yes/no/uncertain
Compatible next action? yes/no/uncertain
Substantial current result overlap? yes/no/uncertain
Independent user value if separated? high/medium/low
Maintenance cost if separated? high/medium/low

Decision:
- Merge
- Split
- Keep provisional
- Test

Reason:
Canonical owner:
Uncertainty:
Review trigger:
```

---

## Template F — Canonical registry

| Cluster ID | Dominant task | Intended canonical | Existing competing URLs | Decision | Redirect/canonical action | Internal-link action | Status |
|---|---|---|---|---|---|---|---|

---

## Template G — Page specification

```markdown
# Page Specification

Page ID:
Cluster ID:
Canonical URL:
Page type:
Owner:
Status:

## Audience and task
Audience:
Conditions:
Dominant task:
Completion condition:
Intent:
Journey state:
Next logical action:

## Search language
Representative query:
Same-intent variants:
Exclusions:
Expected search appearances:
Competing result forms:

## Promise and answer
Title proposition:
Direct answer:
Core promise:
User success condition:

## Information architecture
Required sections:
Required entities:
Required relations:
Required attributes:
Required comparisons:
Required edge cases:
Required FAQs:

## Format
Primary format:
Supporting media:
Interactive element:
Downloadable:
Accessibility requirements:

## Evidence
Firsthand evidence:
Original data:
Primary sources:
Expert review:
Case proof:
Methodology:
Limitations:
Freshness date:
Refresh trigger:

## Graph
Parent/hub:
Prerequisite links:
Supporting links:
Comparison links:
Commercial/next-step links:
Required links into page:
Required links out:

## Technical
Intended index state:
Status:
Canonical:
Sitemap:
Structured data:
Rendering requirements:
Performance risks:
Locale/device notes:

## Measurement
Primary metric:
Secondary metrics:
Guardrails:
Baseline:
Change ID:
Minimum exposure:
Decision rule:
```

---

## Template H — LAKA 50-cell change matrix

| Internal variable | Baseline | Minor change | Major change | Structural change | Paradigm change |
|---|---|---|---|---|---|
| Object | | | | | |
| Conditions | | | | | |
| Actions | | | | | |
| Tools | | | | | |
| Resources | | | | | |
| Outcomes | | | | | |
| Feedback | | | | | |
| Constraints | | | | | |
| Value | | | | | |
| Failure mode | | | | | |

Attach the fourteen descriptors to every shortlisted change.

---

## Template I — Fourteen-variable change descriptor

```markdown
Change ID:
LAKA level:

Magnitude:
Rate:
Direction:
Scope:
Depth:
Duration:
Frequency:
Acceleration:
Variability:
Detectability:
Reversibility:
Propagation:
Amplification:
Accumulation:
```

---

## Template J — Experiment card

```markdown
# SEO Experiment

Experiment ID:
Date:
Owner:
Object:
LAKA level:

Hypothesis:
Mechanism:
Treatment:
Treatment scope:
Comparison/control:
Baseline:
Minimum exposure:
Maximum review date:

Primary metric:
Expected direction:
Expected minimum useful effect:
Secondary metrics:
Guardrails:
Rollback:

Magnitude:
Rate:
Direction:
Scope:
Depth:
Duration:
Frequency:
Acceleration:
Variability:
Detectability:
Reversibility:
Propagation:
Amplification:
Accumulation:

Decision:
- Continue
- Expand
- Revise
- Reverse
- Escalate
- Retire
- Monitor

Result:
Uncertainty:
Learning:
Rule-weight update:
```

---

## Template K — Opportunity scorecard

| Factor | 0–5 score | Evidence | Confidence |
|---|---:|---|---:|
| Demand confidence | | | |
| Business fit | | | |
| Task value | | | |
| Information advantage | | | |
| Conversion value | | | |
| Attainability | | | |
| Existing signal | | | |
| Reuse potential | | | |
| Learning value | | | |
| Production effort | | | |
| Technical risk | | | |
| Maintenance burden | | | |
| Time to learning | | | |

```text
Adjusted priority
=
value factors
/
cost factors
× evidence confidence
× measurement confidence
```

---

## Template L — Technical state record

| URL | Intended state | Accessible | Status | Rendered | Robots | Index directive | Declared canonical | Selected canonical | Indexed | Sitemap | In-links | Depth | CWV | Structured data | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---:|---:|---|---|---|

---

## Template M — Internal graph map

| Source URL | Edge type | Anchor/context | Target URL | User reason | Crawlable | Priority | Change ID |
|---|---|---|---|---|---|---|---|

Allowed edge types:

```text
definition_of
prerequisite_of
example_of
evidence_for
comparison_to
alternative_to
step_before
step_after
supports
converts_to
location_variant_of
service_variant_of
```

---

## Template N — Authority campaign

```markdown
# Authority Campaign

Campaign ID:
Target cluster:
Target URL:
Business outcome:
Diagnosed gap:

Linkable reason:
Evidence asset:
Relevant audiences:
Publisher/prospect classes:
Outreach propositions:
Disclosures:
Placement requirements:
Rejected placement conditions:

Primary metric:
Qualified-domain definition:
Target-page metric:
Brand-demand metric:
Conversion metric:
Retention check:
Owner:
Refresh/compound plan:
```

---

## Template O — Content refresh / merge / retirement decision

```markdown
URL:
Cluster:
Distinct task still valid?:
Demand:
Business value:
Links/evidence:
Conversions:
Freshness:
Accuracy:
Maintenance burden:
Competing owned URLs:
Dependencies:

Decision:
- Preserve
- Refresh
- Reposition
- Merge
- Redirect
- Noindex
- Archive
- Remove

Reason:
Migration steps:
Guardrails:
Observation plan:
```

---

## Template P — Monthly portfolio review

```markdown
# Monthly SEO Portfolio Review

Period:
Owner:

## Business
Contribution margin:
Qualified conversions:
Lead quality:
Capacity:

## Demand
Growing clusters:
Declining clusters:
New queries:
Brand/non-brand movement:

## Canonical ownership
Conflicts:
Merges needed:
Missing assets:
Uncertain clusters:

## Technical
Highest-value blockers:
Canonical agreement:
Eligible coverage:
Orphans/depth:
Field performance:

## Information products
Best task-completion assets:
Weak assets:
Evidence gaps:
Refreshes:

## Authority
Qualified new/lost domains:
Target lift:
Research/assets to compound:

## Experiments
Won:
Lost:
Uncertain:
Escalated:
Retired:

## Allocation decisions
Continue:
Expand:
Revise:
Reverse:
Escalate:
Retire:
Monitor:

## Generator updates
Weights increased:
Weights decreased:
New gates:
Removed assumptions:
```


---

<!-- Source file: 08-AGENT-OPERATING-PROMPT.md -->

# 08 — Agent Operating Prompt

Use this prompt to configure a lead SEO agent or an agent team.

---

## System prompt

You are the **LAKA SEO Architect**, a rigorous SEO strategist, semantic modeler, information architect, technical auditor, conversion analyst, and experiment designer.

Your purpose is not to maximize page count, keyword count, or rankings in isolation. Your purpose is to produce **incremental qualified business value** by connecting valuable user demand to technically eligible, task-completing, evidence-rich information products.

### Governing equation

```text
SEO BUSINESS VALUE
=
VALUABLE DEMAND
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

Treat every factor as necessary. Do not hide a near-zero factor behind strong proxy metrics.

### Required grammar

Every recommendation must name:

```text
GOAL
AUDIENCE
CONDITIONS
TASK
INTENT
QUERY CLUSTER
CANONICAL ASSET
FORMAT
EVIDENCE
INTERNAL GRAPH ROLE
NEXT ACTION
PRIMARY METRIC
GUARDRAILS
LAKA LEVEL
DECISION RULE
```

### LAKA levels

```text
Baseline
Minor Change
Major Change
Structural Change
Paradigm Change
```

Always start with Baseline diagnosis. Select the lowest level capable of affecting the diagnosed mechanism.

### LAKA internal variables

For every shortlisted intervention, fill:

```text
Object
Conditions
Actions
Tools
Resources
Outcomes
Feedback
Constraints
Value
Failure Mode
```

### LAKA change descriptors

Attach:

```text
Magnitude
Rate
Direction
Scope
Depth
Duration
Frequency
Acceleration
Variability
Detectability
Reversibility
Propagation
Amplification
Accumulation
```

### Boolean logic

Use explicit logic:

```text
IF
THEN
ELSE
AND
OR
NOT
XOR
FOR EACH
UNTIL
AT LEAST
EXACTLY ONE
```

Do not substitute vague recommendations such as “improve content” or “build authority” without conditions, mechanisms, outputs, and metrics.

### Semantic rules

1. A core keyword is only a representative label for an intent cluster.
2. Synonyms, paraphrases, pluralization, stems, spelling, and word order usually remain in one cluster when the task is unchanged.
3. Homonyms and different senses must be separated.
4. Co-occurring terms are contextual entities, relations, and attributes—not words to insert mechanically.
5. One dominant intent cluster has exactly one intended canonical owner.
6. Split pages only when task, sense, necessary answer, result type, audience condition, geography/product eligibility, or next action materially differs.
7. Do not create a page for every query fan-out variation.
8. Generate candidates volumetrically, but publish only candidates that pass all hard gates.

### Hard publication gates

```text
APPROVE
IF demand is evidenced
AND task is distinct
AND business or strategic value exists
AND information advantage exists
AND technical feasibility exists
AND maintainability exists
AND measurement exists
AND policy, privacy, legal, and ethical requirements pass.
```

Otherwise merge, include as a section, research, defer, or reject.

### Evidence standard

Prefer:

```text
firsthand experience
OR original data
OR reproducible testing
OR primary sources
OR expert review
OR documented case evidence
OR useful tool/visualization
```

State limitations and uncertainty. Never invent data, citations, tool outputs, customer evidence, or search results.

### Technical state model

Keep these states separate:

```text
Discovered
Fetched
Rendered
Canonicalized
Indexed
Retrieved
Displayed
Visited
Completed
Converted
```

Prioritize technical work by affected business value, not by audit score alone.

### Measurement standard

The primary business measure is normally:

```text
Incremental Organic Contribution Margin
```

Also use:

```text
Qualified Organic Conversions
Value-Weighted Non-Brand Clicks
Value-Weighted Target-Cluster Visibility
Eligible Canonical Coverage
```

Every experiment requires a change ID, baseline, mechanism, primary metric, guardrails, exposure rule, decision rule, and rollback.

### Workflow

#### Phase 1 — Inputs and constraints

Collect or infer only from evidence:

```text
business
offers
audiences
geographies
value events
margins/value bands
capacity
constraints
available data
site scope
```

Mark unknown information explicitly.

#### Phase 2 — Baseline

Audit:

```text
measurement
technical eligibility
query-to-URL behavior
canonical ownership
existing opportunity
content/evidence
internal graph
external evidence
conversion continuity
```

#### Phase 3 — Semantic demand graph

Generate:

```text
parents
subtypes
synonyms
entities
attributes
relations
problems
causes
solutions
alternatives
comparisons
objections
risks
questions
time states
```

Attach audience, task, intent, query evidence, and exclusions.

#### Phase 4 — Clustering

Apply the same-page/split rules. Produce a canonical intent registry. Flag uncertainty.

#### Phase 5 — Volumetric generation

For each valid cluster, generate possible:

```text
formats
evidence modes
journey transitions
search surfaces
internal graph roles
LAKA interventions
```

Do not automatically publish combinations.

#### Phase 6 — Scoring

Score by:

```text
demand confidence
business fit
task value
information advantage
conversion value
attainability
existing signal
reuse potential
learning value
effort
risk
maintenance
time to learning
```

#### Phase 7 — Output

Produce:

1. executive diagnosis;
2. opportunity inventory;
3. semantic graph;
4. intent clusters;
5. canonical registry;
6. page specifications;
7. internal graph plan;
8. technical backlog;
9. evidence/authority campaigns;
10. LAKA experiment matrix;
11. measurement plan;
12. prioritized implementation backlog;
13. explicit rejected/deferred candidates and reasons.

### Required recommendation format

```markdown
## [Recommendation]

Goal:
Audience:
Task:
Intent:
Object:
Condition:
Diagnosed failure:
LAKA level:
Action:
Mechanism:
Required resources:
Expected outcome:
Primary metric:
Guardrails:
IF:
THEN:
ELSE:
Failure mode:
Reversibility:
Next review rule:
```

### Quality controls

Before finalizing, check:

```text
No keyword-only recommendations.
No page without one canonical role.
No invented search volume.
No traffic-only success claims.
No arbitrary word-count requirement.
No automatic page per location, modifier, or fan-out query.
No use of tool scores as Google internals.
No unsupported AI/GEO hacks.
No hidden structured data.
No robots.txt recommendation as the sole deindex method.
No migration without value and risk analysis.
No experiment without a primary metric and stop rule.
```

### Communication

Be direct. Show the logic. Distinguish observation, inference, forecast, and decision. Report uncertainty without becoming vague. Prefer a smaller executable plan over a large undifferentiated list.


---

<!-- Source file: 09-IMPLEMENTATION-BACKLOG.md -->

# 09 — Implementation Backlog

This backlog installs the system in stages. The sequence is dependency-based; it is not a promise of when rankings will change.

## Phase 0 — Governance and workspace

### Deliverables

- project owner;
- site and offer scope;
- source-of-truth repository;
- change ledger;
- access and privacy rules;
- naming conventions;
- rule-library version.

### Exit gate

```text
owner
AND scope
AND permissions
AND change control
are defined.
```

---

## Phase 1 — Business and measurement baseline

### Tasks

1. Define offers and audiences.
2. Define qualified value events.
3. Record margin or value bands.
4. verify Search Console and analytics.
5. connect CRM/commerce outcomes where feasible.
6. classify brand/non-brand.
7. create executive dashboard.
8. test the event chain.
9. document limitations.
10. capture baseline.

### Output

`business-value-model`  
`event-dictionary`  
`baseline-scorecard`

---

## Phase 2 — Technical eligibility baseline

### Tasks

1. Inventory intended canonical URLs.
2. classify intended index state.
3. inspect status, robots, rendering, canonical, index, sitemap.
4. calculate eligible canonical coverage.
5. calculate canonical agreement.
6. identify orphan and depth issues.
7. inspect duplicate/facet volume.
8. inspect field performance by exposure.
9. rank issues by affected business value.
10. repair P0 blockers.

### Output

`technical-state-table`  
`value-ranked-technical-backlog`

---

## Phase 3 — Existing opportunity recovery

### Tasks

1. join queries, URLs, conversions, and value.
2. cluster current queries.
3. find strong pages with weak targeting.
4. find high-impression pages with low CTR residual.
5. find converting pages with weak visibility.
6. find ranking pages with poor qualification.
7. find cannibalizing clusters.
8. find pages with authority but no useful target.
9. score opportunities.
10. launch the first bounded Minor/Major cohort.

### Output

`existing-opportunity-portfolio`  
`experiment-cards`

---

## Phase 4 — Semantic and canonical architecture

### Tasks

1. Build audience-task map.
2. build semantic graph.
3. collect query and customer language.
4. normalize synonyms and variants.
5. disambiguate senses.
6. cluster by task.
7. assign exactly one canonical owner.
8. map supporting assets.
9. flag missing, duplicate, and uncertain clusters.
10. approve priority cluster portfolio.

### Output

`semantic-demand-inventory`  
`canonical-intent-registry`  
`cluster-boundary-log`

---

## Phase 5 — Core information products

### Tasks

1. Select highest-value decision and commercial clusters.
2. create page specifications.
3. choose task-native formats.
4. add information advantage.
5. create evidence.
6. connect next actions.
7. implement technical requirements.
8. add measurement.
9. publish in cohorts.
10. review and update rule priors.

### Output

`core-page-specifications`  
`published-core-assets`

---

## Phase 6 — Supporting graph

### Tasks

1. Identify prerequisite and adjacent tasks.
2. validate supporting asset distinctness.
3. create or improve hubs where useful.
4. add understanding, choice, journey, and authority edges.
5. repair orphans.
6. reduce excessive depth.
7. update links after migrations.
8. measure assisted value.
9. remove weak or redundant nodes.
10. refresh canonical registry.

### Output

`internal-graph-map`  
`supporting-asset-backlog`

---

## Phase 7 — Earned evidence and authority

### Tasks

1. Diagnose target cluster authority gaps.
2. create linkable reasons.
3. prioritize original data, tools, benchmarks, case evidence, and visual references.
4. segment prospects.
5. launch transparent outreach.
6. track retained relevant placements.
7. measure target visibility and brand demand.
8. recover valid lost links.
9. compound successful evidence assets.
10. recalibrate authority proxies.

### Output

`authority-campaigns`  
`evidence-asset-roadmap`

---

## Phase 8 — Volumetric expansion

### Preconditions

```text
canonical model is stable
AND templates are quality controlled
AND data is accurate
AND maintenance capacity exists
AND measurement cohorts exist
AND policy gates pass
```

### Tasks

1. Expand approved dimensions.
2. generate candidates.
3. normalize and cluster.
4. apply hard gates.
5. sample quality.
6. score survivors.
7. stage publication.
8. monitor duplicate, index, quality, and conversion behavior.
9. pause automatically on guardrail breach.
10. scale only validated cohorts.

### Output

`volumetric-candidate-register`  
`staged-generation-plan`

---

## Phase 9 — Structural improvements

Examples:

- merge cannibalizing assets;
- redesign hubs and templates;
- control faceted navigation;
- improve data pipelines;
- connect value data;
- localize international architecture;
- improve field performance at scale;
- standardize evidence and refresh workflows.

Use change IDs and cohort rollouts.

---

## Phase 10 — Paradigm experiments

Potential classes:

```text
diagnostic tool
calculator
benchmark
verified directory
original dataset
interactive map
assessment engine
comparison system
API/data feed
agent-operable transaction
```

### Gate

```text
IF new solution class completes the task materially better
AND creates defensible value
AND has a maintenance model
AND can be measured
THEN run a bounded paradigm experiment.
```

---

## Ongoing cadence

### Weekly operating review

- P0 measurement/technical blockers;
- live experiments;
- data-quality failures;
- major demand or value shifts;
- guardrail breaches.

### Monthly portfolio review

- contribution value;
- qualified conversions;
- cluster visibility;
- canonical ownership;
- technical eligibility;
- authority and evidence;
- refresh/retirement;
- allocation.

### Quarterly model review

- rule performance;
- scoring calibration;
- audience/offer changes;
- semantic territory;
- structural debt;
- paradigm opportunities.

---

## Definition of done

An implementation item is complete only when:

```text
change is deployed
AND change ID is recorded
AND intended technical state is verified
AND measurement is active
AND owner is assigned
AND review rule is scheduled
AND documentation is updated
```


---

<!-- Source file: 10-COURSE-CROSSWALK-AND-SOURCES.md -->

# 10 — Course Crosswalk and Sources

## 1. Course-to-grammar translation

This system preserves the course’s practical workflow while replacing ambiguous or outdated labels with measurable technical concepts.

| Course concept | Grammar translation | Operational meaning |
|---|---|---|
| Target persona | Audience + conditions | Segment whose task, context, and value can be measured |
| Sales funnel | Journey-state graph | Awareness, evaluation, decision, use, retention, and return paths |
| Search framework | Audience–task–asset–surface–transition sentence | Who needs what, where it is served, and what happens next |
| Core keyword | Representative query | Human-readable label for one dominant intent cluster |
| Secondary keywords | Same-intent variants | Closely equivalent queries that one canonical asset can satisfy |
| Accessory keywords | Adjacent task clusters | Related but independently useful information needs |
| Keyword variations | Lexical normalization | Synonyms, spelling, word order, pluralization, abbreviations, stems |
| LSI keywords | Contextual terms, entities, relations, attributes | Replace the “LSI” bucket with explicit semantic roles |
| One keyword = one page | One dominant intent cluster = one canonical owner | Prevent conflicting page ownership without making a page per wording |
| Intent bucketing | Task-based query clustering | Group queries according to one completion condition |
| Revenue estimates | Probabilistic demand-to-value forecast | Separate assumptions from actual contribution margin |
| SEO timeline estimate | Time-to-event forecast | Track crawl, index, impression, value, and uncertainty separately |
| Reverse-engineering competitors | Competitive retrieval and information-gap analysis | Identify result forms, gaps, authority, and unmet tasks |
| Document relevancy | Query–document task fit | Make the asset understandable and useful for the intended task |
| On-page optimization | Document and search-appearance intervention | Improve relevance, response, evidence, and task completion |
| Pages vs domains | URL-level intent ownership | Assign work and measurement to canonical assets |
| Site architecture | Directed information graph | Paths, depth, hubs, communities, and canonical nodes |
| SEO silos | Topical link communities | Useful internal relationships, not ritual folder structures |
| UX signals | User-outcome telemetry | Task completion, progression, conversion, and experience measures |
| Link building | Independent citation acquisition | Relevant, credible, editorial evidence and prominence |
| Authority metrics | Vendor model outputs | Diagnostic proxies that require calibration to direct outcomes |
| Technical optimization | Retrieval-eligibility engineering | Discover, fetch, render, canonicalize, index, retrieve, display |
| Indexation | One technical state | Inclusion in an index, separated from discovery and display |
| Canonical tags | Preferred representative signal | One signal in a coherent canonical system |
| Keyword cannibalization | Query-to-URL ownership instability | Confirm same-intent competition and business loss before fixing |
| Site speed | Real-user performance system | Improve field experience and value, not a perfect lab score |
| Structured data | Machine-readable eligibility signal | Use supported markup that matches visible content |
| Analytics and tracking | Outcome and intervention model | Connect search exposure to qualified value and learning |

---

## 2. Lesson map

The following transcript modules informed the system.

### Strategy, audience, and funnel

```text
004-target-personas-and-the-sales-funnel.md
005-the-search-framework.md
006-branded-search.md
007-what-is-reputation-management.md
012-keywords-vs-the-sales-funnel.md
```

The grammar converts the course’s persona, asset, medium, optimization, and nudge model into:

```text
Audience
+ Conditions
+ Task
+ Intent
+ Canonical asset
+ Search surface
+ Next action
+ Business outcome
```

### Semantic research and mapping

```text
008-keyword-research-overview.md
009-keyword-types.md
010-keyword-variations-lsi.md
011-keyword-competitiveness.md
013-keyword-research-walkthrough.md
014-keyword-mapping-intent-bucketing.md
015-keyword-mapping-core-secondary-accessory-keywords.md
016-keyword-mapping-revenue-estimates.md
017-seo-roi-timeline-estimates.md
018-reverse-engineering-competitors.md
```

The grammar preserves the course’s practical grouping process but changes the unit from an isolated keyword to a user task and intended canonical asset.

### Document and page design

```text
019-what-is-document-relevancy.md
020-on-page-ranking-factors.md
021-pages-vs-domains.md
022-title-tags-meta-descriptions.md
023-urls.md
024-headers.md
025-body-copy.md
026-image-alt-filename.md
027-internal-links-anchor-text.md
028-site-architecture-silos.md
030-freshness-recency.md
031-ux-signals.md
032-searcher-intent-quality-content-and-competition.md
033-walkthrough-finding-your-low-hanging-fruit.md
034-walkthrough-optimizing-a-blog-post.md
```

The grammar turns checklists into task-specific page specifications and measured interventions.

### Authority and earned evidence

```text
035-link-building-earned-media-authority.md
036-pagerank.md
037-authority-metrics.md
038-follow-vs-nofollow.md
039-ugc-sponsored-attributes.md
040-social-media-link-building-seo.md
041-google-s-medic-update-eat.md
042-link-building-page-types.md
043-negative-seo-and-disavowing-links.md
044-overview-of-prospecting-outreach.md
045-link-prospecting-and-tools.md
046–060 Ahrefs, outreach, and campaign walkthroughs
061-advanced-search-operators.md
```

The grammar broadens authority from raw link counts to relevant independent evidence, qualified referring domains, brand demand, and target-cluster outcomes.

### Technical eligibility

```text
062-what-is-technical-optimization.md
063–069 Google Search Console lessons
070-crawl-indexation-introduction.md
071-crawl-indexation-followed-links-indexed-pages.md
072-crawl-indexation-xml-sitemaps.md
073-crawl-indexation-robots-txt.md
074-crawl-indexation-server-response-codes.md
075-crawl-indexation-redirects.md
076-crawl-indexation-canonical-tags-duplicate-content.md
077-crawl-indexation-keyword-cannibalization.md
078-crawl-indexation-internal-links-crawl-depth.md
079-site-speed.md
080-structured-data.md
081-international-multilingual-seo.md
082-ssl-www-pagination.md
083-demo-technical-seo-audit.md
```

The grammar separates the technical lifecycle into:

```text
Discover
→ Fetch
→ Render
→ Canonicalize
→ Index
→ Retrieve
→ Display
```

### Measurement

```text
084-introduction-to-analytics-tracking.md
085-google-analytics-secure-search.md
086-connecting-google-analytics-and-google-search-console.md
087-google-analytics-google-data-studio.md
088-rank-tracking-link-monitor.md
```

The system extends these lessons into an intervention ledger, task events, qualification, margin, controls, and explicit experiment decisions.

---

## 3. Important terminology corrections

### “LSI keywords”

The course uses “LSI” as a broad label for terms that co-occur around a topic. The grammar replaces this with:

```text
entities
relations
attributes
values
collocations
questions
evidence
```

These elements should be included because they complete the task, not because a tool produced a term list.

### “One keyword equals one page”

Use:

```text
one dominant intent cluster
=
one intended canonical owner
```

A page can be relevant to many query variants. Different words do not automatically require different pages.

### “Ranking factors”

Treat lists of factors as hypotheses and diagnostics. The system requires each intervention to state a mechanism and measured outcome.

### “UX signals”

Do not claim that any analytics metric perfectly reveals a search engine’s internal behavior. Use user behavior as task and business telemetry.

### “PageRank no longer exists”

The public toolbar metric disappeared. Link-based systems and link signals remain conceptually relevant. Do not optimize for an obsolete public score.

### “EAT”

Use the current E-E-A-T framing cautiously as a quality-evaluation concept, not a single numeric ranking factor. The operational system measures evidence, experience, authorship, sources, transparency, review, and correction practices.

---

## 4. Current primary-source guidance used

The system was checked against current Google Search Central and web.dev guidance available in September 2026.

### Google Search fundamentals

- SEO Starter Guide  
  `https://developers.google.com/search/docs/fundamentals/seo-starter-guide`
- Search Essentials  
  `https://developers.google.com/search/docs/essentials`
- Spam policies  
  `https://developers.google.com/search/docs/essentials/spam-policies`
- Creating helpful, reliable, people-first content  
  `https://developers.google.com/search/docs/fundamentals/creating-helpful-content`

### Crawling, indexing, and links

- Crawling and indexing overview  
  `https://developers.google.com/search/docs/crawling-indexing`
- Link best practices  
  `https://developers.google.com/search/docs/crawling-indexing/links-crawlable`
- Canonicalization  
  `https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls`
- Sitemaps  
  `https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview`
- JavaScript SEO  
  `https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics`
- Robots.txt introduction  
  `https://developers.google.com/search/docs/crawling-indexing/robots/intro`

### Search appearance and experience

- Structured data introduction  
  `https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data`
- Core Web Vitals and Search  
  `https://developers.google.com/search/docs/appearance/core-web-vitals`
- Web Vitals  
  `https://web.dev/articles/vitals`

### Generative search

- Optimizing for generative AI features on Google Search  
  `https://developers.google.com/search/docs/fundamentals/ai-optimization-guide`

Key current implications:

```text
foundational SEO still applies;
valuable non-commodity content matters;
query fan-out expands supporting information needs;
a page must be eligible and indexed for Search-based retrieval;
a page should not be created for every search variation;
scaled low-value content is a governance risk;
Google Search does not require llms.txt;
AI-specific chunking is not required;
supported structured data remains for applicable search features;
generative performance should be measured through first-party reporting when available.
```

---

## 5. Evidence classification

Statements in a project should be tagged as:

```text
OBSERVATION
directly measured or inspected.

SOURCE FACT
supported by a cited primary source.

INFERENCE
a reasoned interpretation of observations.

FORECAST
an estimated future value with assumptions.

HYPOTHESIS
a testable proposed mechanism.

DECISION
an action chosen under constraints.

UNKNOWN
information still required.
```

This prevents forecasts and hypotheses from being presented as established facts.

---

## 6. Versioning

The rule library and source guidance should be reviewed when:

```text
Google publishes material documentation changes
OR site architecture/technology changes
OR business offers/audiences change
OR measured rules repeatedly fail
OR a new search surface becomes strategically important
```

Record:

```text
system version
rule version
source review date
changed rules
reason
migration impact
```


---

<!-- Source file: examples/webdevcalgary-example.md -->

# Worked Example — WebDevCalgary.com

> This is an illustrative application of the grammar. It deliberately does not invent current search volumes, rankings, or revenue. Those fields must be populated from live first-party and market evidence.

## 1. Business sentence

```text
Increase qualified Calgary website-project assessments
FOR small and midsize businesses
UNDER active website launch, redesign, accessibility, or growth needs
SEEKING to choose and hire a web-development solution
WITH local commercial-investigation and transactional intent
ABOUT web design and development in Calgary
SERVED BY a canonical local-service and decision-support system
SUPPORTED BY firsthand audits, case evidence, transparent process, and useful tools
CONNECTED BY a task-based internal graph
LEADING TO a qualification assessment
MEASURED BY incremental organic contribution margin
GUARDED BY lead quality, delivery capacity, accessibility, accuracy, and trust.
```

---

## 2. Business value model

```text
Business: WebDevCalgary.com
Offer: web strategy, design, development, accessibility, SEO, and related consulting
Primary audience: Calgary-area organizations seeking a new or improved website
Primary value event: qualified project assessment
Qualification rule: project fits services, geography, scope, and realistic budget/timeline
Primary business metric: incremental organic contribution margin
Capacity constraint: must be filled from actual sales and delivery capacity
Guardrails: lead quality, response time, close rate, customer fit, accessibility, truthful claims
```

---

## 3. Audience–task map

| Audience | Condition | Task | Intent | Journey state | Next action |
|---|---|---|---|---|---|
| Local business owner | Needs a provider | Locate and evaluate Calgary web designers | Local commercial | Option evaluation | View service/process or assessment |
| Marketing manager | Planning a redesign | Build requirements and compare approaches | Informational/comparative | Problem/solution aware | Download brief or assessment |
| Founder | Budgeting | Estimate website cost | Commercial investigation | Evaluation | Use estimator or scope assessment |
| Organization with accessibility risk | Existing site may be inaccessible | Diagnose and plan remediation | Diagnostic/commercial | Problem aware | Accessibility audit |
| Ecommerce company | Platform or conversion problem | Compare platform/build options | Comparative | Option evaluation | Ecommerce consultation |
| Existing client/user | Needs support or improvement | Troubleshoot, maintain, expand | Support/retention | Use/retention | Support or improvement plan |

---

## 4. Semantic territory

### Parent concepts

```text
web development
web design
digital experience
website strategy
accessibility
search optimization
conversion design
```

### Subtypes

```text
small-business websites
ecommerce websites
professional-service websites
accessible websites
website redesign
WordPress development
custom development
landing pages
website maintenance
```

### Entities

```text
Calgary
Alberta
WordPress
Webflow
Shopify
WCAG
Google Search Console
Google Analytics
```

### Attributes

```text
price
scope
timeline
platform
accessibility
performance
maintainability
ownership
support
conversion
local experience
```

### Relations

```text
WEB_DESIGN LOCATED_IN CALGARY
WEBSITE_REQUIREMENTS PRECEDES WEBSITE_REDESIGN
WCAG_AUDIT DIAGNOSES ACCESSIBILITY_RISK
PLATFORM_SELECTION AFFECTS MAINTAINABILITY
CASE_STUDY EVIDENCES DELIVERY_ABILITY
COST_ESTIMATOR SUPPORTS PROJECT_ASSESSMENT
```

### Exclusions

```text
web design jobs
web developer salary
free coding course
unrelated Calgary events
unsupported service geographies
DIY-only intent where no useful business pathway exists
```

---

## 5. Candidate space

Illustrative dimensions:

```text
6 audiences
× 12 tasks
× 8 intents
× 10 service/subtype nodes
× 12 modifier families
× 8 formats
× 4 local scopes
× 6 next actions
=
1,658,880 theoretical candidates
```

The engine does not publish 1.6 million pages. It normalizes language, groups same tasks, rejects weak combinations, and selects a small portfolio.

---

## 6. Hard-gate example

Candidate:

```text
"Calgary restaurant website design under $2,000"
```

Evaluate:

```text
Demand evidence?             UNKNOWN
Distinct task?               MAYBE
Business fit?                DEPENDS on offer and budget
Information advantage?       NOT YET
Real local evidence?         NOT YET
Maintainable?                YES at low volume
Measurable?                  YES
Policy/accuracy?             PASS if truthful
```

Decision:

```text
IF live evidence shows a meaningful restaurant-specific task
AND the offer actually serves that budget/segment
AND unique restaurant evidence exists
THEN create a distinct restaurant solution or guide.
ELSE include restaurant examples in a broader small-business asset
OR reject the candidate.
```

---

## 7. Initial canonical portfolio

| Cluster | Dominant task | Intended canonical role | Likely format | Next action |
|---|---|---|---|---|
| Calgary web design service | Find, evaluate, hire | Core local service page | Service + process + proof | Qualification assessment |
| Website cost in Calgary | Estimate realistic budget | Decision-support asset | Calculator + cost model | Scoped estimate |
| Website redesign Calgary | Plan and select redesign help | Service/guide hybrid | Diagnostic + redesign process | Redesign assessment |
| Accessible web design Calgary | Diagnose risk and choose help | Specialized service page | Audit evidence + remediation plan | Accessibility audit |
| Ecommerce development Calgary | Select ecommerce solution | Specialized service page | Platform and delivery comparison | Ecommerce consultation |
| WordPress vs Webflow vs custom | Compare implementation paths | Comparison asset | Decision matrix | Platform assessment |
| How to write a website brief | Plan requirements | Supporting guide/template | Downloadable brief | Brief review |
| Calgary web design case studies | Verify provider ability | Evidence hub | Case-study collection | Relevant service |
| Website maintenance Calgary | Keep site reliable | Retention/service page | Service + checklist | Maintenance assessment |
| Calgary web-design company comparison | Compare provider types | Neutral decision guide | Criteria matrix | Assessment after criteria |

This is a provisional architecture. Live result sets, customer language, query evidence, existing URLs, and business data determine final boundaries.

---

## 8. Same-page / split examples

### Example A

```text
web design Calgary
Calgary web designer
website design company Calgary
```

Likely decision:

```text
same sense
AND same dominant task
AND same local service result class
AND same next action
→ one canonical service cluster
```

### Example B

```text
web design Calgary
website cost Calgary
```

Likely decision:

```text
related concept
BUT different task
AND different answer structure
AND different journey stage
→ separate clusters connected by internal links
```

### Example C

```text
Calgary WordPress developer
Calgary Webflow developer
```

Decision depends on the offer and result ecosystem:

```text
IF platform choice is part of one broader selection task
THEN one comparison/service architecture may suffice.
ELSE IF each platform has distinct demand, proof, process, and offer
THEN split into platform-specific clusters.
```

---

## 9. Page specification — Website cost in Calgary

```text
Cluster ID: YYC-COST-001
Dominant task: estimate the likely cost and scope of a Calgary business website
Intent: commercial investigation
Journey state: evaluation
Representative query: website cost Calgary
Canonical role: cost decision-support asset
Recommended format: calculator + pricing bands + scope matrix + examples
Information advantage: transparent local assumptions, real project patterns, accessible estimator
Evidence: disclosed methodology, case ranges where permission exists, explicit exclusions
Next action: save result or request a scoped assessment
Primary metric: qualified assessment contribution value
Guardrails: estimator accuracy, unqualified inquiry rate, delivery capacity
```

### Required sections

```text
Direct answer and range disclaimer
What changes the cost
Project-type matrix
Calgary/Alberta-specific assumptions where real
Calculator
Examples or anonymized scope patterns
What is not included
DIY, template, freelancer, agency, and custom trade-offs
Timeline implications
Questions to ask a provider
Next-step assessment
Methodology and update date
```

---

## 10. LAKA 50-cell example for the cost asset

| Variable | Baseline | Minor | Major | Structural | Paradigm |
|---|---|---|---|---|---|
| Object | Existing cost content and query behavior | Title/snippet/direct answer | Full cost guide and evidence | Connect estimator, CRM, service pages, case data | Live project-scope intelligence product |
| Conditions | Local users, device, query mix, current offers | High impressions or weak CTR | Weak task completion or inferior format | Repeated cost questions across journeys | Market lacks transparent usable estimates |
| Actions | Measure and classify | Rewrite proposition/CTA | Build matrix, examples, calculator | Integrate data and graph | Build adaptive scope engine |
| Tools | Search Console, analytics, CRM | CMS, change ledger | Calculator, content, design | CRM/API, event pipeline | Rules engine, dataset, agent interface |
| Resources | Existing data | Copy/design time | Project evidence and development | Engineering and sales operations | Proprietary data and product maintenance |
| Outcomes | Trusted baseline | Better qualified clicks/action | Better task completion and leads | Closed-loop forecast calibration | New demand, citations, product adoption |
| Feedback | Query, CTR, conversion | CTR residual and quality | completion, qualification, close rate | estimate-vs-actual error | market usage, links, brand, margin |
| Constraints | Data gaps | Snippet rewrite uncertainty | Range accuracy and disclosure | Privacy and data quality | Build cost and defensibility |
| Value | Opportunity quantified | Low-cost response lift | Better decisions and pipeline | Better pricing/qualification | Category-defining utility |
| Failure mode | Wrong baseline | Clickbait or low-quality traffic | Misleading estimates | Bad CRM data propagates | Complex tool with no adoption |

---

## 11. IF / ELSE program for the cost asset

```text
IF the existing page has meaningful impressions
AND selected canonical is correct
AND qualified conversion is possible
THEN optimize the existing asset before creating a replacement.

ELSE IF multiple cost pages compete for the same task
THEN select one owner, merge useful information, and migrate carefully.

ELSE IF no useful cost asset exists
AND demand/business gates pass
THEN create the canonical estimator/guide.

IF users complete the estimator
BUT do not take the next action
THEN test value continuity, trust, qualification, and CTA commitment.

IF the calculator produces many unqualified inquiries
THEN tighten audience conditions, assumptions, outputs, or routing.

IF the tool earns citations and branded demand
THEN compound it with annual benchmarks, platform views, and case evidence.

ELSE maintain it as a decision-support asset without uncontrolled expansion.
```

---

## 12. Internal graph

```text
/calgary-web-design/  [core local service]
    ↑ supported by
/website-cost-calgary/
/website-redesign-calgary/
/website-brief-template/
/web-design-company-comparison/
/case-studies/

website cost
    → platform comparison
    → website brief
    → relevant case study
    → scoped assessment

accessibility service
    ← WCAG diagnostic guide
    ← accessibility case study
    → accessibility audit
```

Every edge needs a user reason. Do not add links solely to make the diagram denser.

---

## 13. Measurement plan

### Executive

```text
incremental organic contribution margin
qualified organic assessments
value-weighted non-brand clicks
value-weighted priority-cluster visibility
eligible canonical coverage
```

### Cluster diagnostics

```text
impressions
CTR residual
dominant URL share
task completion
next-action rate
qualified rate
close rate
contribution value
```

### Cost-estimator task events

```text
estimator_start
estimator_complete
result_band
assumption_expand
methodology_view
brief_download
assessment_start
qualified_assessment
sales_accept
closed_value
```

Do not collect sensitive inputs unnecessarily.

---

## 14. First execution order

```text
1. Verify measurement and qualified-value chain.
2. Audit existing URL/index/canonical state.
3. Build current query-to-URL clusters.
4. Fix high-value cannibalization and technical blockers.
5. Improve existing pages with signal.
6. Build the cost estimator and core service proof where gaps exist.
7. Build internal graph and supporting task assets.
8. Launch evidence/authority campaigns.
9. Test selected platform, industry, or neighborhood expansions only after hard gates pass.
10. Pursue paradigm tools from observed user needs, not from page-volume goals.
```
