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
