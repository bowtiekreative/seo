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
