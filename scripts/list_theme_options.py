#!/usr/bin/env python3
"""List design-architect theme configurations."""

from __future__ import annotations

from pathlib import Path
import sys


def read_frontmatter(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        raise ValueError(f"{path} is missing YAML frontmatter")

    data: dict[str, str] = {}
    for line in lines[1:]:
        if line.strip() == "---":
            break
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = value.strip().strip("\"'")
    return data


def main() -> int:
    skill_root = Path(__file__).resolve().parents[1]
    themes_root = skill_root / "themes"
    if not themes_root.is_dir():
        print(f"Themes directory not found: {themes_root}", file=sys.stderr)
        return 1

    rows: list[tuple[str, str]] = []
    for config_dir in sorted(path for path in themes_root.iterdir() if path.is_dir()):
        config_path = config_dir / "CONFIG.md"
        if not config_path.is_file():
            continue
        try:
            frontmatter = read_frontmatter(config_path)
        except ValueError as error:
            print(error, file=sys.stderr)
            return 1

        name = frontmatter.get("name", "").strip()
        description = frontmatter.get("description", "").strip()
        if not name or not description:
            print(f"{config_path} must define name and description", file=sys.stderr)
            return 1
        rows.append((name, description))

    for name, description in rows:
        print(f"{name}: {description}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
