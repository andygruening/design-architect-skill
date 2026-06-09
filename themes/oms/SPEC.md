---
name: Polygon Labs' Open Money Stack
description: OMS financial product theme with white surfaces, slate neutrals, Fustat typography, sparse purple accents, and precise functional copy.
---

# Color spec

Use these foundations in Swift, Kotlin, and TypeScript:

- Brand purple: `#670DE5`, used sparingly for links, selected states, focus rings, info accents, and active/pressed states.
- Primary CTA: slate-950 `#090624`, white label. Purple is not the default CTA fill.
- App shell/page background: slate-50 `#F6F6FC`; primary content surfaces, cards, panels, forms, modals, and toasts are white. Search fills also use slate-50.
- Default border: slate-300 `#C8CFE1`; lighter content borders: slate-200 `#DFE3F0`.
- Text hierarchy: slate-900 `#141635` primary, slate-500 `#64708F` secondary, slate-400 `#929EBA` tertiary/placeholder.
- Titles and headings always use the dark text color (`slate-900` or `slate-950`), never muted, placeholder, semantic, or brand colors unless the design explicitly defines a status title.
- Semantic colors: purple/info, emerald/success, orange/amber warning, red/danger with matching 50/200/700 scale pairs.
- Typography: Fustat for product UI where available. Use 700 for headings/buttons, 500 for body and labels. Line height is 1.2. Avoid italics, small caps, and decorative letter spacing except a tiny `-0.01em` for large headings.
- Icons: Lucide is the canonical icon system. Native implementations should use platform icons that map closely to Lucide intent, line weight around 1.5, and sizes 16/20/24/32.
- Motion: 120ms hover, 200ms base, 320ms drawer/modal; fades and slides only.

# Components

Generate these component families by default:

- Buttons: primary, secondary, danger primary, danger secondary; sizes small, medium, large. Primary is slate-950, secondary is white/transparent with slate border, danger primary is red-600, danger secondary is white/transparent with red border. Large buttons are 40px tall with 12px radius; medium/small use 8px radius.
- Inputs: label above, 40px field, 12px radius, white fill, slate-300 border, slate-400 focus/active border, purple focus ring, helper text below. Destructive inputs recolor label/message red; do not make default destructive borders red unless representing an active/error state.
- Dropdowns: same visual contract as inputs, with a trailing chevron.
- Labels: plain Fustat text primitives, not bordered pills.
- Badges: 16px radius, 4px by 8px padding, 14px Fustat 500, soft and solid variants for info/neutral/success/warning/danger.
- Alerts: tonal semantic surface, 24px radius, 24px padding, 1px tonal border, 16px icon, title/description stack.
- Cards and panels: white, 1px slate-200 border, flat, 24px radius for content cards, 16/20/24px internal padding. Use only for repeated items, structured groups, framed tasks, modals, and tool surfaces; do not box hero text, welcome copy, page titles, or primary marketing messages.
- Icon buttons: 40px square, 12px radius, white fill, slate-300 border, slate-950 icon, purple focus ring.
- Status banner: 56px high; sandbox gradient `#EAE4F5 -> #F6F3FB`; live gradient `#D5C8F4 -> #D2D8F6 -> #D0F5FD`.
