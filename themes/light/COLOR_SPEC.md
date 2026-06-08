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
