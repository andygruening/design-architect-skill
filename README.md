# Design Architect

Design Architect is a Codex skill for generating and applying design-system UI components across:

- Native iOS with SwiftUI
- Android with Jetpack Compose and Kotlin
- React TypeScript web apps

The skill uses theme specifications from `themes/` and platform design guidance from `design/` to produce shared styling files and app design proposals.

## Repository layout

```text
.
├── SKILL.md
├── agents/
│   └── openai.yaml
├── design/
│   ├── DESIGN_MOBILE.md
│   └── DESIGN_WEB.md
├── scripts/
│   ├── generate_components.py
│   └── list_theme_options.py
├── themes/
│   ├── THEME_INTERFACE.md
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

- `CONFIG.md`
- `COLOR_SPEC.md`
- `COMPONENTS.md`

The required theme contract is documented in `themes/THEME_INTERFACE.md`.

List available themes with:

```bash
python3 scripts/list_theme_options.py
```

The skill uses `themes/light/` by default. Users can select another theme by naming it in the prompt, such as `use oms` or `use dark`.

## Component generation

Generate one platform styling file into a target project root:

```bash
python3 scripts/generate_components.py <project-root> --platform typescript --theme light
```

Available platforms:

- `swift`: writes `styling.gen.swift`
- `kotlin`: writes `styling.gen.kt`
- `typescript`: writes `styling.gen.ts`

The generator reads the selected theme directory, validates the required theme fields, and renders the selected platform file from that theme's `CONFIG.md`, `COLOR_SPEC.md`, and `COMPONENTS.md`.

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

Run it locally only when dependencies are already installed:

```bash
cd example
npm run dev
```
