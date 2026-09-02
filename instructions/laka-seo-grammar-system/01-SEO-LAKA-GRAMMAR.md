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
