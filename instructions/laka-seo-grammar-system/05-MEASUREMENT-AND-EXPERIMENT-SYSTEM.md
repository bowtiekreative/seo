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
