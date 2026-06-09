# Theme template

Use this template when creating or validating a theme configuration. Every directory under `themes/` is a theme configuration. Each theme must include:

- `SPEC.md`
- `theme.json`

`theme.json` is the machine-readable source for generated platform files. `SPEC.md` is human-readable design guidance for agents and reviewers.

## SPEC.md

Required frontmatter fields:

- `name`: Human-readable theme name.
- `description`: One-sentence summary used when listing available themes.

Required sections:

- `Color spec`: Visual foundations in prose, including brand/accent, CTA, page/surface, border, text, semantic color, typography, icon, and motion rules.
- `Components`: Component contracts in prose, including buttons, inputs, dropdowns, labels, badges, alerts, cards/panels, icon buttons, and status banner rules.

## theme.json

Required top-level fields:

- `id`: Theme directory slug. Must match the directory name.
- `name`: Human-readable theme name.
- `description`: One-sentence summary used when listing available themes.
- `typography`: Machine-readable type tokens.
- `colors`: Machine-readable color tokens.
- `components`: Machine-readable component flags.

Required `typography` fields:

- `fontFamily`: Preferred product UI font family.
- `headingWeight`: Numeric heading font weight.
- `bodyWeight`: Numeric body font weight.
- `lineHeight`: Numeric line-height multiplier.

Required `colors` fields:

- `page`
- `surface`
- `secondarySurface`
- `header`
- `headerBorder`
- `footer`
- `primaryText`
- `secondaryText`
- `placeholderText`
- `border`
- `focusRing`
- `brand`
- `primaryButton`
- `primaryButtonText`
- `secondaryButton`
- `secondaryButtonText`
- `danger`
- `dangerSoft`
- `dangerText`
- `success`
- `successSoft`
- `warning`
- `warningSoft`
- `info`
- `infoSoft`

Required `components` fields:

- `usesBorders`: Boolean flag for whether generated components should render default borders.

`theme.json` must conform to `themes/theme.schema.json`.

## Color spec

Required fields to implement:

- `Brand accent`: Primary accent color and where it may be used.
- `Primary CTA`: Default primary action fill, text color, hover/pressed behavior, and border rule.
- `App shell/page background`: Page background color and default surface colors for cards, panels, forms, modals, toasts, boxes, inputs, buttons, search fills, and secondary controls.
- `Borders`: Default border color and where borders are allowed or forbidden.
- `Top headers`: Header background, border rule, text color, and icon color.
- `Footers`: Footer background, border rule, text color, and link color.
- `Text hierarchy`: Primary, secondary, tertiary, and placeholder text colors.
- `Titles and headings`: Required title/heading color behavior.
- `Semantic colors`: Info, success, warning, and danger color behavior with contrast requirements.
- `Typography`: Font family, weights, line height, and prohibited typography treatments.
- `Icons`: Icon family, stroke weight, sizes, and usage rules.
- `Motion`: Hover, base, and modal/drawer timing rules.

## Components

Required component contracts to implement:

- `Buttons`: Primary, secondary, danger primary, danger secondary, sizes, fills, text colors, borders, hover, pressed, focus-visible, and disabled states.
- `Inputs`: Label placement, field height, radius, fill, text color, placeholder color, border rule, focus-visible state, helper text, and destructive state.
- `Dropdowns`: Input parity plus trailing indicator behavior.
- `Labels`: Plain text labels and colored label treatment.
- `Badges`: Radius, padding, type size/weight, info, neutral, success, warning, danger variants, text colors, fills, and border rule.
- `Alerts`: Surface, radius, padding, border rule, icon treatment, title color, and description color.
- `Cards and panels`: Surface, border rule, radius, padding, and allowed usage.
- `Top headers`: Background, border, text, icon, active, hover, and focus-visible behavior.
- `Footers`: Background, border, text, link, hover, and focus-visible behavior.
- `Icon buttons`: Size, radius, fill, icon color, border rule, hover, pressed, focus-visible, and disabled states.
- `Status banner`: Height, sandbox styling, live styling, text treatment, and border rule.
