---
name: Light
description: Default light theme configuration with white page backgrounds, light gray accents, Roboto typography, and functional product copy.
---

# Color spec

Use these foundations in Swift, Kotlin, and TypeScript:

- Brand accent: light gray `#E5E7EB`, used for links, selected states, focus rings, info accents, and active/pressed states. Do not use purple in the light theme configuration.
- Primary CTA: gray-950 `#111827`, white label.
- App shell/page background: always white `#FFFFFF`. Primary content surfaces, cards, panels, forms, modals, and toasts are also white. Search fills and secondary control fills use gray-100 `#F3F4F6`.
- Default border: gray-300 `#D1D5DB`; lighter content borders: gray-200 `#E5E7EB`.
- Text hierarchy: gray-900 `#111827` primary, gray-600 `#4B5563` secondary, gray-400 `#9CA3AF` tertiary/placeholder.
- Titles and headings always use the dark text color (`gray-900` or `gray-950`), never muted, placeholder, semantic, or brand colors unless the design explicitly defines a status title.
- Semantic colors: gray/info, emerald/success, orange/amber warning, red/danger with matching 50/200/700 scale pairs.
- Typography: Roboto for product UI where available. Use 700 for headings/buttons, 500 for body and labels. Line height is 1.2. Avoid italics, small caps, and decorative letter spacing.
- Icons: Lucide is the canonical icon system. Native implementations should use platform icons that map closely to Lucide intent, line weight around 1.5, and sizes 16/20/24/32.
- Motion: 120ms hover, 200ms base, 320ms drawer/modal; fades and slides only.

# Components

Generate these component families by default:

- Buttons: primary, secondary, danger primary, danger secondary; sizes small, medium, large. Primary is gray-950 with a white label. Secondary is gray-100 with gray-950 label, no border, and never transparent. Danger primary is red-600. Danger secondary is red-50 with red-700 label and no border. Large buttons are 40px tall with 12px radius; medium/small use 8px radius.
- Inputs: label above, 40px field, 12px radius, white fill, gray-300 border, gray-400 focus/active border, light gray focus ring, helper text below. Destructive inputs recolor label/message red; do not make default destructive borders red unless representing an active/error state.
- Dropdowns: same visual contract as inputs, with a trailing chevron.
- Labels: plain Roboto text primitives, not bordered pills.
- Badges: 16px radius, 4px by 8px padding, 14px Roboto 500, soft and solid variants for info/neutral/success/warning/danger.
- Alerts: tonal semantic surface, 24px radius, 24px padding, 1px tonal border, 16px icon, title/description stack.
- Cards and panels: white, 1px gray-200 border, flat, 24px radius for content cards, 16/20/24px internal padding. Use only for repeated items, structured groups, framed tasks, modals, and tool surfaces; do not box hero text, welcome copy, page titles, or primary marketing messages.
- Icon buttons: 40px square, 12px radius, gray-100 fill, no border, gray-950 icon, light gray focus ring.
- Status banner: 56px high; sandbox gradient `#F9FAFB -> #F3F4F6`; live gradient `#F3F4F6 -> #E5E7EB -> #F9FAFB`.
