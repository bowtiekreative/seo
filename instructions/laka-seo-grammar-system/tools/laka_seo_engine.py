#!/usr/bin/env python3
"""
LAKA SEO candidate evaluator and safe volumetric sampler.

Usage:
    python laka_seo_engine.py evaluate candidate.json
    python laka_seo_engine.py volume dimensions.json
    python laka_seo_engine.py volume dimensions.json --sample 25 --output samples.json

The volume command never enumerates the full Cartesian product unless a bounded
sample is explicitly requested. The sample is capped to prevent accidental
combinatorial explosions.
"""

from __future__ import annotations

import argparse
import itertools
import json
import math
import random
import sys
from pathlib import Path
from typing import Any, Iterable, Mapping, Sequence

HARD_GATES: tuple[str, ...] = (
    "demand",
    "distinct_task",
    "business_value",
    "information_advantage",
    "technical_feasibility",
    "maintainability",
    "measurement",
    "compliance",
)

VALUE_FACTORS: tuple[str, ...] = (
    "demand_confidence",
    "business_fit",
    "task_value",
    "information_advantage",
    "conversion_value",
    "attainability",
    "existing_signal",
    "reuse_potential",
    "learning_value",
)

COST_FACTORS: tuple[str, ...] = (
    "production_effort",
    "technical_risk",
    "maintenance_burden",
    "time_to_learning",
    "opportunity_cost",
)

MAX_SAMPLE = 10_000


class InputError(ValueError):
    """Raised when an input document cannot be evaluated safely."""


def load_json(path: Path) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise InputError(f"File not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise InputError(f"Invalid JSON in {path}: {exc}") from exc


def require_mapping(value: Any, name: str) -> Mapping[str, Any]:
    if not isinstance(value, Mapping):
        raise InputError(f"{name} must be a JSON object.")
    return value


def bounded_score(value: Any, name: str) -> float:
    if not isinstance(value, (int, float)) or isinstance(value, bool):
        raise InputError(f"{name} must be a number from 0 to 5.")
    number = float(value)
    if number < 0 or number > 5:
        raise InputError(f"{name} must be between 0 and 5; got {number}.")
    return number


def probability(value: Any, name: str) -> float:
    if not isinstance(value, (int, float)) or isinstance(value, bool):
        raise InputError(f"{name} must be a probability from 0 to 1.")
    number = float(value)
    if number < 0 or number > 1:
        raise InputError(f"{name} must be between 0 and 1; got {number}.")
    return number


def geometric_mean(values: Sequence[float]) -> float:
    if not values:
        raise InputError("Cannot calculate a geometric mean of an empty list.")
    if any(value == 0 for value in values):
        return 0.0
    return math.exp(sum(math.log(value) for value in values) / len(values))


def evaluate_candidate(document: Mapping[str, Any]) -> dict[str, Any]:
    gates = require_mapping(document.get("gates"), "gates")
    missing_gate_fields = [name for name in HARD_GATES if name not in gates]
    if missing_gate_fields:
        raise InputError(
            "Missing hard-gate fields: " + ", ".join(missing_gate_fields)
        )

    failed_gates = [
        name for name in HARD_GATES
        if gates[name] is not True
    ]
    gate_pass = not failed_gates

    scores = require_mapping(document.get("scores"), "scores")
    costs = require_mapping(document.get("costs"), "costs")
    confidence = require_mapping(document.get("confidence", {}), "confidence")

    value_scores = [
        bounded_score(scores.get(name, 0), f"scores.{name}")
        for name in VALUE_FACTORS
    ]
    cost_scores = [
        max(0.2, bounded_score(costs.get(name, 0), f"costs.{name}"))
        for name in COST_FACTORS
    ]

    evidence_confidence = probability(
        confidence.get("evidence", 1.0), "confidence.evidence"
    )
    measurement_confidence = probability(
        confidence.get("measurement", 1.0), "confidence.measurement"
    )

    value_index = geometric_mean(value_scores)
    cost_index = geometric_mean(cost_scores)
    raw_priority = value_index / cost_index if cost_index else 0.0
    adjusted_priority = (
        raw_priority * evidence_confidence * measurement_confidence
        if gate_pass else 0.0
    )

    if not gate_pass:
        decision = "REJECT_OR_RESEARCH"
    elif adjusted_priority >= 1.50:
        decision = "P0_OR_P1"
    elif adjusted_priority >= 1.00:
        decision = "P2"
    elif adjusted_priority >= 0.60:
        decision = "P3"
    elif adjusted_priority > 0:
        decision = "P4_MONITOR_OR_EXPERIMENT"
    else:
        decision = "REJECT_OR_REDESIGN"

    return {
        "candidate_id": document.get("id"),
        "hard_gate_pass": gate_pass,
        "failed_gates": failed_gates,
        "value_index": round(value_index, 4),
        "cost_index": round(cost_index, 4),
        "raw_priority": round(raw_priority, 4),
        "evidence_confidence": evidence_confidence,
        "measurement_confidence": measurement_confidence,
        "adjusted_priority": round(adjusted_priority, 4),
        "decision": decision,
        "note": (
            "Priority bands are transparent heuristics, not search-engine scores "
            "or guaranteed forecasts."
        ),
    }


def validate_dimensions(document: Any) -> dict[str, list[Any]]:
    mapping = require_mapping(document, "dimension document")
    dimensions = mapping.get("dimensions", mapping)
    dimensions = require_mapping(dimensions, "dimensions")
    result: dict[str, list[Any]] = {}
    for name, values in dimensions.items():
        if not isinstance(name, str) or not name:
            raise InputError("Every dimension name must be a non-empty string.")
        if not isinstance(values, list) or not values:
            raise InputError(f"Dimension {name!r} must be a non-empty array.")
        result[name] = values
    if not result:
        raise InputError("At least one dimension is required.")
    return result


def theoretical_volume(dimensions: Mapping[str, Sequence[Any]]) -> int:
    return math.prod(len(values) for values in dimensions.values())


def bounded_cartesian_sample(
    dimensions: Mapping[str, Sequence[Any]], count: int, seed: int
) -> list[dict[str, Any]]:
    if count < 0:
        raise InputError("Sample count cannot be negative.")
    if count > MAX_SAMPLE:
        raise InputError(
            f"Sample count is capped at {MAX_SAMPLE:,}; requested {count:,}."
        )
    if count == 0:
        return []

    names = list(dimensions)
    total = theoretical_volume(dimensions)
    target = min(count, total)
    rng = random.Random(seed)

    # For small spaces, enumerate safely and sample without replacement.
    if total <= MAX_SAMPLE:
        combinations = [
            dict(zip(names, values))
            for values in itertools.product(*(dimensions[name] for name in names))
        ]
        rng.shuffle(combinations)
        return combinations[:target]

    # For large spaces, draw unique index tuples without enumerating the space.
    seen: set[tuple[int, ...]] = set()
    output: list[dict[str, Any]] = []
    lengths = [len(dimensions[name]) for name in names]
    while len(output) < target:
        index_tuple = tuple(rng.randrange(length) for length in lengths)
        if index_tuple in seen:
            continue
        seen.add(index_tuple)
        output.append({
            name: dimensions[name][index]
            for name, index in zip(names, index_tuple)
        })
    return output


def command_evaluate(args: argparse.Namespace) -> int:
    document = require_mapping(load_json(args.input), "candidate")
    result = evaluate_candidate(document)
    rendered = json.dumps(result, indent=2, ensure_ascii=False)
    if args.output:
        args.output.write_text(rendered + "\n", encoding="utf-8")
    else:
        print(rendered)
    return 0


def command_volume(args: argparse.Namespace) -> int:
    dimensions = validate_dimensions(load_json(args.input))
    volume = theoretical_volume(dimensions)
    result: dict[str, Any] = {
        "dimension_count": len(dimensions),
        "dimensions": {name: len(values) for name, values in dimensions.items()},
        "theoretical_volume": volume,
        "warning": (
            "Theoretical volume is an analysis space, not a publishing target. "
            "Apply clustering and all hard publication gates."
        ),
    }
    if args.sample:
        result["sample"] = bounded_cartesian_sample(
            dimensions, args.sample, args.seed
        )
    rendered = json.dumps(result, indent=2, ensure_ascii=False)
    if args.output:
        args.output.write_text(rendered + "\n", encoding="utf-8")
    else:
        print(rendered)
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Evaluate LAKA SEO candidates and inspect volumetric spaces."
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    evaluate = subparsers.add_parser("evaluate", help="Evaluate one candidate.")
    evaluate.add_argument("input", type=Path)
    evaluate.add_argument("--output", type=Path)
    evaluate.set_defaults(func=command_evaluate)

    volume = subparsers.add_parser(
        "volume", help="Calculate theoretical volume and optionally sample it."
    )
    volume.add_argument("input", type=Path)
    volume.add_argument("--sample", type=int, default=0)
    volume.add_argument("--seed", type=int, default=42)
    volume.add_argument("--output", type=Path)
    volume.set_defaults(func=command_volume)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        return int(args.func(args))
    except InputError as exc:
        print(f"Input error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
