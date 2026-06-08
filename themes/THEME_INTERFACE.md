# Theme interface

Every directory under `themes/` is a theme configuration. Each theme must include:

- `CONFIG.md`
- `COLOR_SPEC.md`
- `COMPONENTS.md`

## CONFIG.md

Required frontmatter fields:

- `name`: Human-readable theme name.
- `description`: One-sentence summary used when listing available themes.

## COLOR_SPEC.md

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

## COMPONENTS.md

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
