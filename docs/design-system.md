# InjectCompass Design System (locked 2026-04-30)

The Stitch dark theme is now the canonical visual system. This doc is the
contract every page must honor. If you're tempted to use a token not listed
here, stop and add it here first.

## Palette

### Midnight (dark surfaces)
| Token | Hex | Use |
|-------|-----|-----|
| `bg-midnight-deep` | `#020D12` | Page body, hero ground |
| `bg-midnight` | `#061B23` | Default dark surface |
| `bg-midnight-raised` | `#0E2A35` | Inputs, sticky nav strip |
| `bg-midnight-card` | `#103040` | Cards on midnight background |
| `bg-midnight-elevated` | `#143A4C` | Elevated cards (hover, modals) |
| `bg-midnight-overlay` | `#1A4859` | Dropdowns, mega-menu, mobile overlay |
| `border-midnight-rule` | `#16384A` | Default dark border |
| `border-midnight-rule-soft` | `#0F2832` | Subtle internal divider |

### Aqua (accents + CTAs)
| Token | Hex | Use |
|-------|-----|-----|
| `bg-aqua` | `#5EEAD4` | Primary CTA fill |
| `bg-aqua-soft` | `#7FF0DD` | CTA hover |
| `bg-aqua-deep` | `#2DD4BF` | Active CTA, focus accent |
| `text-aqua-deep-2` | `#14B8A6` | Aqua link on light surface |
| `text-aqua-dim` | `#0E8A7A` | Aqua text on warm/light surface |

### Text on dark
| Token | Hex | Contrast on `midnight-deep` |
|-------|-----|----|
| `text-on-dark` | `#F8FAFC` | 17.4:1 (AAA) |
| `text-on-dark-muted` | `#CBD5E1` | 7.8:1 (AAA) |
| `text-on-dark-faint` | `#94A3B8` | 4.6:1 (AA — never for body copy) |

**Rule:** body copy on dark MUST be `text-on-dark` or `text-on-dark-muted`.
Never use `text-white/70`-style opacity hacks.

## Type ramp

Use the named sizes — they bake in `line-height`, `letter-spacing`, and
`font-weight`. Don't compose with separate `tracking-*` / `leading-*` /
`font-*` classes unless you're intentionally overriding one axis.

| Token | Use |
|-------|-----|
| `text-display-xl` | Hero on home / category landings only |
| `text-display-lg` | Section opener on long-form pages |
| `text-display-md` | Stitch component section header |
| `text-h1` | Article H1 |
| `text-h2` | Article H2, page H2 |
| `text-h3` | Card heading, sub-section |
| `text-h4` | Card sub-heading, list item heading |
| `text-eyebrow` | UPPERCASE label above heading |
| `text-body` | Article body (17px, 1.65 leading) |
| `text-body-sm` | Card body, captions |
| `text-caption` | Disclaimer text, footnote |

Fonts: **Inter** (sans), **Merriweather** (serif, headlines on long-form
pillar pages only), **IBM Plex Mono** (numerics in calculators).

## Elevation (dark)

Drop shadows are invisible on dark surfaces. Use the dark-shadow tokens —
they combine an inset top highlight with a softer outer shadow.

| Token | Use |
|-------|-----|
| `shadow-dark-card` | Default card on midnight |
| `shadow-dark-elevated` | Card on hover / elevated |
| `shadow-dark-overlay` | Dropdown, modal, mega-menu |
| `shadow-aqua-glow` | Selected state accent |
| `shadow-focus-aqua` | Focus ring (inputs, buttons) |

## Motion

| Token | Value | Use |
|-------|-------|-----|
| `duration-fast` | 150ms | Hover color, link underline |
| `duration-base` | 220ms | Card hover, button press |
| `duration-slow` | 320ms | Layout transitions, drawer open |
| `ease-out` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | Default |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Tab/toggle, playful |

**MUST** wrap all motion in `motion-safe:` or honor `prefers-reduced-motion`.

## Focus states

Every interactive element MUST show focus. Use:
```
focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-focus
```
On midnight ground, also add `focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-deep`.

## Z-index scale

`z-base` (0) → `z-raised` (10) → `z-sticky` (20) → `z-overlay` (30) →
`z-modal` (40) → `z-nav` (50) → `z-toast` (60). Never use bare numbers.

## Component patterns

### CTA button
```
inline-flex items-center h-11 px-5 rounded-pill bg-aqua text-midnight-deep
font-semibold hover:bg-aqua-soft active:bg-aqua-deep transition-colors
duration-base focus-visible:ring-focus focus-visible:ring-offset-2
focus-visible:ring-offset-midnight-deep
```

### Dark card
```
bg-midnight-card border border-midnight-rule rounded-lg p-6
shadow-dark-card hover:shadow-dark-elevated hover:border-midnight-rule
transition-shadow duration-base
```

### Dark input
```
h-11 px-4 rounded-pill bg-midnight-raised border border-midnight-rule
text-on-dark placeholder:text-on-dark-faint focus-within:border-aqua/60
focus-visible:ring-focus
```

## Anti-patterns (do not ship)

- `text-white/70` — use `text-on-dark-muted` instead
- `bg-white` on a dark page — use `bg-midnight-overlay`
- `border-white/10` — invisible; use `border-midnight-rule`
- Emoji as icons — always SVG (Lucide is the project default)
- `transition-all` — name the property
- `bg-surface` on routes that should render dark
- Light shadows (`shadow-card`) on midnight cards — use `shadow-dark-card`

## Accessibility floor (non-negotiable)

- 4.5:1 contrast for body, 3:1 for large text and UI components
- 44x44px minimum touch target
- Focus visible on every interactive element
- `prefers-reduced-motion: reduce` honored
- Form inputs labeled (`<label for>` or `aria-label`)
