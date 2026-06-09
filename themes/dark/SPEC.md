---
name: Dark
description: Dark theme configuration with black page backgrounds, translucent #ffffff17 component surfaces, white-on-color labels, Roboto typography, and functional product copy.
---

# Color spec

Use these foundations in Swift, Kotlin, and TypeScript:

- Brand accent: translucent white `#ffffff17`, used for selected states, focus rings, info accents, and active/pressed states. Do not use purple in the dark theme configuration.
- Primary CTA: white `#FFFFFF` background with black `#000000` label. Use a stronger filled hover/pressed state instead of borders.
- App shell/page background: black `#000000`. Primary content surfaces, cards, panels, forms, modals, toasts, boxes, inputs, buttons, search fills, and secondary control fills use `#ffffff17`.
- Borders: do not use borders in the dark theme configuration except for top headers. Separate other surfaces with spacing, elevation, contrast, and state fills instead.
- Top headers: black `#000000` background with a 1px `#ffffff17` bottom border.
- Footers: black `#000000` background with no border.
- Text hierarchy: gray-50 `#F9FAFB` primary, gray-300 `#D1D5DB` secondary, gray-500 `#6B7280` tertiary/placeholder.
- Titles and headings always use the light text color (`gray-50` or `gray-100`), never muted, placeholder, semantic, or brand colors unless the design explicitly defines a status title.
- Semantic colors: gray/info, emerald/success, orange/amber warning, red/danger with dark-mode tonal pairs that preserve readable contrast on black and `#ffffff17` surfaces.
- Typography: Roboto for product UI where available. Use 700 for headings/buttons, 500 for body and labels. Line height is 1.2. Avoid italics, small caps, and decorative letter spacing.
- Icons: Lucide is the canonical icon system. Native implementations should use platform icons that map closely to Lucide intent, line weight around 1.5, and sizes 16/20/24/32.
- Motion: 120ms hover, 200ms base, 320ms drawer/modal; fades and slides only.

# Components

Generate these component families by default:

- Buttons: primary, secondary, danger primary, danger secondary; sizes small, medium, large. Primary uses white `#FFFFFF` with black `#000000` label and a stronger filled hover/pressed state. Secondary uses `#ffffff17` with gray-50 label, no border, and never transparent. Danger primary is red-500 with a white label. Danger secondary is `#ffffff17` with red-100 label and no border. Large buttons are 40px tall with 12px radius; medium/small use 8px radius.
- Inputs: label above, 40px field, 12px radius, `#ffffff17` fill, no border, dark gray focus ring, helper text below. Destructive inputs recolor label/message red; do not add destructive borders unless the user explicitly requests bordered error fields.
- Dropdowns: same visual contract as inputs, with a trailing chevron.
- Labels: plain Roboto text primitives. Colored labels use white text, a filled background in the label color, and no border.
- Badges: 16px radius, 4px by 8px padding, 14px Roboto 500, soft and solid variants for info/neutral/success/warning/danger with dark-mode contrast. Colored badges use white text, a filled background in the badge color, and no border.
- Alerts: dark tonal semantic surface using `#ffffff17`, 24px radius, 24px padding, no border, 16px icon, title/description stack.
- Cards and panels: `#ffffff17`, no border, flat, 24px radius for content cards, 16/20/24px internal padding. Use only for repeated items, structured groups, framed tasks, modals, and tool surfaces; do not box hero text, welcome copy, page titles, or primary marketing messages.
- Top headers: black `#000000` background, 1px `#ffffff17` bottom border, gray-50 text and icons.
- Footers: black `#000000` background, no border, gray-300 text and gray-50 primary links.
- Icon buttons: 40px square, 12px radius, `#ffffff17` fill, no border, gray-50 icon, dark gray focus ring.
- Status banner: 56px high; sandbox gradient `#000000 -> #ffffff17`; live gradient `#000000 -> #ffffff17 -> #2B2B2B`.
