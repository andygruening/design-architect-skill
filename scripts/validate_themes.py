#!/usr/bin/env python3
"""Validate every design-architect theme.json file."""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
THEMES_ROOT = ROOT / "themes"
GENERATOR_PATH = ROOT / "scripts" / "generate_components.py"


def load_generator():
    spec = importlib.util.spec_from_file_location("generate_components", GENERATOR_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load {GENERATOR_PATH}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


def main() -> int:
    generator = load_generator()
    count = 0
    for theme_dir in sorted(path for path in THEMES_ROOT.iterdir() if path.is_dir()):
        if not (theme_dir / "theme.json").is_file():
            continue
        validate_spec(theme_dir / "SPEC.md")
        generator.read_theme(theme_dir.name)
        count += 1

    print(f"Validated {count} theme configuration files.")
    return 0


def validate_spec(path: Path) -> None:
    if not path.is_file():
        raise ValueError(f"{path} is missing.")

    lines = path.read_text().splitlines()
    if not lines or lines[0].strip() != "---":
        raise ValueError(f"{path} is missing YAML frontmatter.")

    fields: dict[str, str] = {}
    for line in lines[1:]:
        if line.strip() == "---":
            break
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        fields[key.strip()] = value.strip().strip("\"'")

    missing = [field for field in ("name", "description") if not fields.get(field)]
    if missing:
        raise ValueError(f"{path} frontmatter is missing: {', '.join(missing)}.")


if __name__ == "__main__":
    raise SystemExit(main())
