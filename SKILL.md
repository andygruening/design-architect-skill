---
name: design-architect
description: Generate design-system UI components, build new design-system-styled apps, and retrofit existing apps for native iOS SwiftUI, Android Jetpack Compose/Kotlin, and React TypeScript web. Use when Codex needs shared styling wrappers, design tokens, buttons, inputs, labels, dropdowns, badges, alerts, cards, navigation primitives, or app screens that consume generated styling files from a design-system bundle.
---

# Design Architect

## Source

Use this skill to generate and apply the selected design-system theme through the platform-specific styling file: `styling.gen.swift` for iOS, `styling.gen.kt` for Android, and `styling.gen.ts` for React TypeScript web. After generation, that generated styling file is the implementation source for tokens, component wrappers, variants, recipes, and interaction states.

Use the `light` theme configuration by default. If the user names another theme configuration, such as `use oms`, read `CONFIG.md`, `COLOR_SPEC.md`, and `COMPONENTS.md` from that configuration directory instead.

## Proposal Gate

Do not make file changes immediately when this skill is triggered. First inspect enough context to understand the request, read the relevant reference files, and propose all intended changes before editing, generating, or integrating anything.

Only proceed with implementation after the user gives clear approval such as `go ahead`, `integrate all changes`, `do it`, or an equivalent confirmation. If the user approves only part of the proposal, implement only the approved subset.

If the user explicitly asks for code changes in the same message that triggers the skill, still provide the proposal first and wait for approval unless the user also explicitly says to skip the proposal gate.

## Proposal Response Format

Use a polished proposal format with large section titles, emoji in the titles, and horizontal separators. Product UI copy rules still apply to generated app content, but the proposal response itself may use emoji and expressive headings.

Make proposals precise and implementation-ready. Do not present alternatives such as "do this or that", "either X or Y", or open-ended option lists. Choose the best path based on the skill instructions and project context, then state exactly what to integrate. Proposals are used as context for later integration, so every proposed change must be a clear directive.

In the `Theme` and `Design` sections, prioritize every proposal as `P1`, `P2`, or `P3`, and sort proposals in that order. Create one category heading for each priority that has proposals, then put plain bullet points under that heading. Do not prefix every bullet with the priority marker. Use these Markdown-safe visual priority headings:

- P1: required for correctness, navigation integrity, production readiness, accessibility, or core design-system compliance.
- P2: important for usability, layout quality, platform fit, or consistency.
- P3: polish, refinement, or lower-risk improvements.

Structure proposal responses like this:

```markdown
# 🎨 Design proposal

---

## 🧭 What I understand

[Brief summary of the app, platform, audience, and design goal.]

---

## 🌟 Theme

[Evaluate the app against the selected theme configuration's COLOR_SPEC.md and COMPONENTS.md. State the exact theme/component changes to make. Sort proposals under priority headings: "#### P1", then "#### P2", then "#### P3". Omit empty priority headings. Put plain bullet points under each heading. Use direct wording and avoid alternatives.]

---

## 🧱 Design

[Evaluate the app against design/DESIGN_WEB.md for web or design/DESIGN_MOBILE.md for iOS/Android. State the exact pages/screens, flows, navigation structures, content placement, and layout changes to implement. Sort proposals under priority headings: "#### P1", then "#### P2", then "#### P3". Omit empty priority headings. Put plain bullet points under each heading. Use direct wording such as "Add X page", "Move Y into Z", or "Remove X".]

---

## ▶️ Next step

Say `go ahead` to integrate all changes, or tell me which proposed changes to do instead.
```

## Default Workflow

1. Identify the trigger mode:
   - **New app from idea**: the user must provide the target platform(s) (`ios`, `android`, and/or `web`) and the app idea. If either is missing, ask for only that missing input. Propose the app structure before building from scratch, including how the idea will use the shared generated styling file for each platform: `styling.gen.swift` for iOS, `styling.gen.kt` for Android, and `styling.gen.ts` for React TypeScript web. Question the first obvious layout; make the proposal feel modern and organized, using tabs, segmented controls, sidebars, split views, or section navigation when one long page would feel cluttered.
   - **Existing project update**: inspect the current project, identify its platform(s), and propose how to generate or refresh the relevant styling file(s), then replace local one-off styling with semantic usage of the generated wrappers/recipes. Preserve user changes and avoid broad rewrites. Review the existing layout choices and propose modernization when possible, especially by breaking crowded single-page screens into tabs, sections, or clearer navigation.
   - **List theme options**: if the user asks what theme configurations are available, run `python3 /path/to/design-architect/scripts/list_theme_options.py` and use the script output as the source of truth. Respond with a short, polished Markdown list titled `Available theme options`, with each option formatted as `- **<name>**: <description>`.
   - **Create theme config**: if the user asks to create a new theme configuration, read `themes/THEME_INTERFACE.md`, then propose copying `themes/light/COLOR_SPEC.md`, `themes/light/CONFIG.md`, and `themes/light/COMPONENTS.md` into `themes/<new-name>/`, then updating those three copied files to match the user's new theme specifications and the required theme interface. After approval, create the directory, copy the default files, update `CONFIG.md` frontmatter with the new `name` and `description`, and revise `COLOR_SPEC.md` and `COMPONENTS.md` for the new theme.
2. Identify the project root for the current task. Default to the current working directory.
3. Read the relevant reference files and present the proposal using the required proposal response format.
4. Evaluate new-project and existing-project proposals in two categories:
   - **Theme**: select a theme configuration, read its `CONFIG.md`, `COLOR_SPEC.md`, and `COMPONENTS.md`, then verify whether the app uses that configuration's design system specifications for color, typography, motion, iconography, product voice, and component variants. Use `themes/light/` by default. If the user says `use oms` or names another available configuration, use `themes/<name>/` instead. Propose any design-token, component, styling, or interaction changes needed to align the app.
   - **Design**: read `design/DESIGN_WEB.md` for web projects and `design/DESIGN_MOBILE.md` for iOS or Android projects. If a task covers multiple platforms, read each matching file under `design/`. Treat the matching design instructions as mandatory. Analyze what each existing or proposed page/screen is doing, verify whether each page/screen aligns with the required design patterns, and propose structural changes based on required flows and page/screen patterns. Always verify that the app has a separate `Home`, landing, welcome, or introduction page/screen that introduces and sells the app before the first real product workflow, with a clear primary CTA that routes to the first real page/screen. Check whether authentication requires sign-in/sign-up/recovery/verification pages or screens, where the main content should live, which dashboard/detail/list/form/settings pages or screens are needed, and whether navigation matches the target platform. Check every visible button, link, nav item, CTA, footer link, toolbar action, tab, list row, and in-app route target; if it points to a page/screen or flow that does not exist, propose integrating that missing page/screen or removing/retargeting the control when the destination should not exist. Evaluate whether the app exposes debug, implementation, or environment data in the UI, such as `server is ready`, raw API responses, localhost URLs, stack traces, test IDs, sandbox mode labels, mock/dev banners, console output, feature-flag names, or similar non-product information; propose removing or replacing it with product-appropriate states unless the user explicitly requires an environment indicator.
5. Make proposals for both categories based on this skill's instructions, even when one category has no major issues. State when no changes are needed for a category. Keep proposals decisive: do not include option lists, unresolved alternatives, or vague recommendations. If several valid approaches exist, choose one and propose that specific implementation.
6. Wait for the user to approve the proposal before running generators, editing files, or integrating changes.
7. For new app and existing project update modes, run the bundled generator only for the requested or detected platform after approval. Always pass `--platform` and the selected theme with `--theme`; use `light` when the user did not name a theme:

   ```bash
   python3 /path/to/design-architect/scripts/generate_components.py <project-root> --platform <swift|kotlin|typescript> --theme <theme-name>
   ```

8. Review the generated file for the selected platform:
   - `styling.gen.swift`: SwiftUI tokens and reusable iOS components.
   - `styling.gen.kt`: Jetpack Compose/Kotlin tokens and reusable Android components.
   - `styling.gen.ts`: TypeScript tokens, typed variants, and React-friendly component recipes for web parity.
9. If the user explicitly requires a different package name, rerun with:

   ```bash
   python3 /path/to/design-architect/scripts/generate_components.py <project-root> --platform kotlin --theme <theme-name> --kotlin-package com.example.designsystem
   ```

10. Keep generated file names stable. `styling.gen.ts` is the TypeScript design-token/component-recipe output; Kotlin implementation belongs in `styling.gen.kt`.

## Reference Files

- Select the theme configuration before reading theme files. Default to `themes/light/`. If the user says `use oms`, read `themes/oms/`. If they name another available theme configuration, read `themes/<name>/`.
- Read `themes/THEME_INTERFACE.md` when creating or validating theme configurations, or whenever a theme appears incomplete.
- Each theme configuration directory must contain `CONFIG.md`, `COLOR_SPEC.md`, and `COMPONENTS.md`.
- Read the selected theme configuration's `CONFIG.md` first. Its frontmatter must define `name` and `description`.
- Read the selected theme configuration's `COLOR_SPEC.md` before applying visual foundations, typography, color, motion, icon, or product voice decisions.
- Read the selected theme configuration's `COMPONENTS.md` before generating or updating buttons, inputs, dropdowns, labels, badges, alerts, cards, panels, icon buttons, status banners, web top headers, footers, or component variants.
- Read `design/DESIGN_WEB.md` whenever making web page design decisions to identify required page types, states, navigation structure, and page-level layout rules.
- Read `design/DESIGN_MOBILE.md` whenever making iOS or Android app design decisions to identify required screen types, states, navigation structure, and screen-level layout rules.

## Theme Commands

- To list available theme options, run:

  ```bash
  python3 /path/to/design-architect/scripts/list_theme_options.py
  ```

  Use the script output as the source of truth, then respond in this format:

  ```markdown
  **Available theme options**
  - **<name>**: <description>
  - **<name>**: <description>
  ```
- To create a new theme configuration, read `themes/THEME_INTERFACE.md`, copy `themes/light/COLOR_SPEC.md`, `themes/light/CONFIG.md`, and `themes/light/COMPONENTS.md` into `themes/<new-name>/`, then update the copied files based on the user's theme specifications. Keep `CONFIG.md` frontmatter concise and include only `name` and `description`.
- To generate components for a selected theme, run:

  ```bash
  python3 /path/to/design-architect/scripts/generate_components.py <project-root> --platform <swift|kotlin|typescript> --theme <theme-name>
  ```

  The generator reads `themes/<theme-name>/CONFIG.md`, `themes/<theme-name>/COLOR_SPEC.md`, and `themes/<theme-name>/COMPONENTS.md`, validates required fields from `themes/THEME_INTERFACE.md`, and renders only the selected platform file from that theme. If the user does not name a theme, pass `--theme light`.

## Product Rules

- Use sentence case. No Title Case, emoji, exclamation marks, or marketing CTA language.
- Use functional labels such as `Save`, `Cancel`, `Documentation`, and `Create deposit address`.
- Use precise financial formatting and tabular numerals for money, counts, percentages, addresses, and timestamps.
- Do not introduce new hex values when a selected theme token exists.
- Do not use gradient backgrounds except the sandbox/live status banner and explicitly defined data-viz gradients.
- Do not add decorative icons; every icon labels an action or state.

## Implementation Rules

- Put generated implementation files at the project root.
- For new app mode, build only the requested platform apps: iOS means SwiftUI, Android means Jetpack Compose/Kotlin, and web means React TypeScript. The generated styling file for that platform is the source of component styling. Once generated, use `styling.gen.swift`, `styling.gen.kt`, or `styling.gen.ts` as the implementation source for tokens, components, variants, recipes, and interaction states.
- React TypeScript apps must include interaction styling for hover, active/click/pressed, focus-visible, and disabled states for buttons, icon buttons, fields, dropdowns, tabs, and other interactive controls where applicable. Derive those states from `styling.gen.ts` recipes and tokens.
- Keep app call sites semantic. App screens should consume generated component variants, not restyle them.
- Prefer SwiftUI `ButtonStyle` and composable wrappers for Swift.
- Prefer Jetpack Compose Material 3 wrappers for Kotlin.
- TypeScript should export tokens, typed variants, and React-friendly component style recipes rather than raw prose.
- Do not introduce network-dependent setup unless the user asks to build or run the apps.
- If generated files already exist, inspect them first and preserve user changes unless the task clearly asks to regenerate.

## Verification

After generation, run:

```bash
python3 /path/to/design-architect/scripts/generate_components.py <project-root> --platform <swift|kotlin|typescript> --theme <theme-name> --check
```

Use available local build tools when present:

- iOS: run the project or package's local Xcode build command when Xcode and an iOS SDK are available.
- Android: use the project's Gradle wrapper or installed Gradle if present. Do not download Gradle or Android dependencies without user approval.
- Web: run the project's local build command only when dependencies are already installed. Do not run `npm install` or download web dependencies without user approval.
