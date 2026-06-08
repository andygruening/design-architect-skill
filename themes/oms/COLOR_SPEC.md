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
