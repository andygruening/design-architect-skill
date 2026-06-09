# Design Architect

Design Architect is a Codex skill for generating and applying design-system UI components across:

- Native iOS with SwiftUI
- Android with Jetpack Compose and Kotlin
- React TypeScript web apps

The skill uses theme specifications from `themes/` and platform design guidance from `designs/` to produce shared styling files and app design proposals.

## Repository layout

```text
.
├── SKILL.md
├── agents/
│   └── openai.yaml
├── designs/
│   ├── TEMPLATE.md
│   ├── mobile/
│   │   └── SPEC.md
│   └── web/
│       └── SPEC.md
├── scripts/
│   ├── generate_components.py
│   ├── generate_example_themes.py
│   ├── validate_themes.py
│   └── list_theme_options.py
├── themes/
│   ├── TEMPLATE.md
│   ├── theme.schema.json
│   ├── dark/
│   ├── light/
│   └── oms/
└── example/
```

## Installation

The local Codex skill path should point at this repository:

```bash
ln -s /Users/agruning/Documents/GitHub/design-architect-skill /Users/agruning/.codex/skills/design-architect
```

After installation, invoke the skill as:

```text
$design-architect
```

## Themes

Theme configurations live under `themes/<theme-name>/`. Each theme must include:

- `SPEC.md`
- `theme.json`

The human-readable theme contract is documented in `SPEC.md` and `themes/TEMPLATE.md`. The machine-readable generation contract is `theme.json`, validated against `themes/theme.schema.json`.

List available themes with:

```bash
python3 scripts/list_theme_options.py
```

The skill uses `themes/light/` by default. Users can select another theme by naming it in the prompt, such as `use oms` or `use dark`.

Validate every theme config with:

```bash
python3 scripts/validate_themes.py
```

## Component generation

Generate one platform styling file into a target project root:

```bash
python3 scripts/generate_components.py <project-root> --platform typescript --theme light
```

Available platforms:

- `swift`: writes `styling.gen.swift`
- `kotlin`: writes `styling.gen.kt`
- `typescript`: writes `styling.gen.ts`

The generator reads the selected theme directory, validates `theme.json`, and renders the selected platform file from that theme's machine-readable tokens.

Generate another theme with:

```bash
python3 scripts/generate_components.py <project-root> --platform swift --theme dark
python3 scripts/generate_components.py <project-root> --platform kotlin --theme oms
```

Use a custom Kotlin package name when needed:

```bash
python3 scripts/generate_components.py <project-root> --platform kotlin --theme light --kotlin-package com.example.designsystem
```

Check whether generated files are stale:

```bash
python3 scripts/generate_components.py <project-root> --platform typescript --theme light --check
```

## Example app

The `example/` directory contains a Vite React TypeScript app that showcases the current theme options. Generated files and dependencies are ignored by git.

The example imports generated TypeScript theme modules from `example/src/generated/themes/`. Refresh them with:

```bash
cd example
npm run generate:themes
```

Run it locally only when dependencies are already installed:

```bash
cd example
npm run dev
```
