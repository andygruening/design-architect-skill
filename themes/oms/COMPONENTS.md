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
