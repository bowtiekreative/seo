# LAKA SEO Grammar System

**Version:** 1.0  
**Purpose:** Convert SEO from a loose checklist into a formal, measurable, volumetric operating language.

This system synthesizes the ClickMinded SEO course into a more rigorous framework built around:

- the five LAKA change levels: **Baseline, Minor, Major, Structural, Paradigm**;
- the ten LAKA internal variables: **Object, Conditions, Actions, Tools, Resources, Outcomes, Feedback, Constraints, Value, Failure Mode**;
- the fourteen LAKA change variables: **Magnitude, Rate, Direction, Scope, Depth, Duration, Frequency, Acceleration, Variability, Detectability, Reversibility, Propagation, Amplification, Accumulation**;
- formal Boolean operators: **IF, THEN, ELSE, AND, OR, NOT, XOR, FOR EACH, UNTIL**;
- volumetric generation followed by evidence-based pruning;
- business measurement rather than rankings alone.

## The governing sentence

```text
FOR [AUDIENCE]
UNDER [CONDITIONS]
WHO NEEDS [TASK]
WITH [INTENT]
ABOUT [CONCEPT / ENTITY]
MODIFIED BY [ATTRIBUTES]
CREATE [CANONICAL ASSET]
IN [BEST FORMAT]
CONNECTED THROUGH [INTERNAL GRAPH]
SUPPORTED BY [EVIDENCE / AUTHORITY]
LEADING TO [NEXT ACTION]
MEASURED BY [PRIMARY OUTCOME]
```

## The governing equation

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

Because the terms are multiplied conceptually, a near-zero factor can neutralize the rest of the system. A technically perfect page with no valuable demand is weak. A high-demand page that cannot be indexed is weak. A ranking page that attracts the wrong audience or produces no business value is also weak.

## What “volumetric” means

Volumetric SEO does **not** mean publishing every keyword permutation. It means:

1. Generate opportunity candidates across many independent dimensions.
2. Evaluate each combination with Boolean gates.
3. Merge combinations that represent the same underlying task.
4. Reject candidates that lack demand, value, uniqueness, maintainability, or measurable outcomes.
5. Publish the smallest set of assets that covers the largest amount of valuable demand.
6. Continuously use results to update the generator.

The system may generate thousands or millions of possible combinations internally while approving only a small, high-value set for publication.

## Package contents

| File | Purpose |
|---|---|
| `01-SEO-LAKA-GRAMMAR.md` | Formal vocabulary, syntax, operators, sentence forms, and LAKA transformations |
| `02-LAKA-SEO-STRATEGY-GUIDE.md` | End-to-end strategy from demand to contribution margin |
| `03-VOLUMETRIC-SEO-ENGINE.md` | Combinatorial generation, consolidation, scoring, and scaling |
| `04-IF-ELSE-AND-OR-RULEBOOK.md` | Human-readable decision rules |
| `05-MEASUREMENT-AND-EXPERIMENT-SYSTEM.md` | KPIs, formulas, event model, tests, and decision thresholds |
| `06-AUDIT-AND-EXECUTION-SOPS.md` | Repeatable operating procedures |
| `07-PAGE-AND-CLUSTER-TEMPLATES.md` | Briefs, matrices, scorecards, and page specifications |
| `08-AGENT-OPERATING-PROMPT.md` | Prompt for an SEO agent or agent team |
| `09-IMPLEMENTATION-BACKLOG.md` | A practical staged rollout |
| `10-COURSE-CROSSWALK-AND-SOURCES.md` | Translation from course terminology to the grammar |
| `rules/seo-laka-rules.yaml` | Machine-readable rule library |
| `tools/seo-laka.ebnf` | Formal EBNF grammar |
| `schemas/seo-laka-project.schema.json` | JSON Schema for a project |
| `templates/*.md` | Standalone reusable templates |
| `examples/webdevcalgary-example.md` | Worked local-service example |
| `appendix/clickminded-seo-technical-ontology-and-measurement.md` | Earlier technical mapping of the course |
| `SEO-LAKA-COMPLETE-GUIDE.md` | Combined human-readable manual |
| `QUICK-REFERENCE.txt` | Compact command and operator reference |

## Minimum operating rule

```text
IF an SEO action cannot name:
  1. the audience,
  2. the task,
  3. the intended canonical asset,
  4. the expected mechanism,
  5. the primary metric,
  6. the decision rule,
THEN the action is not ready for execution.
```

## Core output hierarchy

```text
BUSINESS
└── AUDIENCE
    └── PROBLEM / DESIRE
        └── JOURNEY STATE
            └── INTENT
                └── TASK
                    └── QUERY CLUSTER
                        └── CANONICAL ASSET
                            └── SUPPORTING GRAPH
                                └── SEARCH APPEARANCE
                                    └── USER ACTION
                                        └── BUSINESS OUTCOME
                                            └── FEEDBACK
```

## Recommended starting order

```text
MEASUREMENT
AND TECHNICAL ELIGIBILITY
AND EXISTING-OPPORTUNITY AUDIT
AND INTENT MAP
AND CANONICAL MAP
THEN PAGE IMPROVEMENT
THEN INTERNAL GRAPH
THEN AUTHORITY
THEN NEW ASSETS
THEN STRUCTURAL OR PARADIGM EXPERIMENTS
```

This ordering favors recoverable, measurable opportunities before expensive expansion.
## Executable helper

`tools/laka_seo_engine.py` provides two safe commands:

```bash
python tools/laka_seo_engine.py evaluate examples/sample-candidate.json
python tools/laka_seo_engine.py volume examples/sample-dimensions.json --sample 25
```

The first applies hard publication gates and a transparent value/cost score. The second calculates theoretical combinatorial volume and returns only a bounded sample; it never treats the Cartesian product as a publishing plan.
