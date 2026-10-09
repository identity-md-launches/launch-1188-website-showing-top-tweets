# DESIGN.md — IdentityMD top tweets

Design system of the implemented site, extracted from the final source. Use it to add
another page or component that belongs to the same product. Every token, class and path
below exists in the repository; nothing here is a proposal.

Source of truth:

- Tokens and all component CSS: `src/styles/global.css`
- Components: `src/components/*.tsx`, page composition in `src/App.tsx`
- Content: `src/data/tweets.ts`
- No framework theme file, no CSS-in-JS, no Tailwind. One plain stylesheet.

## Overview

Audience: people in and around the IdentityMD contributor network who want to skim the
posts the community is sharing. The brief asked for "dark green with a theme of pepes armed
with AI", and that is the whole visual identity: one deep green neutral ramp for every
surface, one lime accent for the single primary action and selected state, and a hand-drawn
SVG pepe (`PepeAvatar`) that wears a piece of AI kit (visor, antenna, headset, chip,
goggles). The pepe is the only illustration asset; it is drawn from primitives and recolored
by CSS custom properties, so no bitmap images ship.

Hierarchy comes from weight and size, not from more colors. Density is medium: 16px body
text, 16px (`--space-4`) padding inside cards and controls, 16px gaps between cards, 32px
and 48px between sections. Composition is a single column of sections (header, hero, feed,
about, footer) inside one centered container. The hero's two-column split and the card grid
are page-level arrangements, not rules for every future page.

System-wide rules:

- Dark only. `color-scheme: dark` is set on `:root` and `index.html`; there is no light theme.
- Exactly one filled accent action per view (`.btn--primary`). Everything else is a ghost
  button or a text link.
- Lime (`--color-accent-*`) means interactive or selected. It is never used on static text
  except the small uppercase eyebrow label and the rank badge, which both sit inside
  component chrome.
- Grouping is done with space and surfaces first; 1px borders mark structure only.

## Colors

Notation is `oklch()` throughout. Primitives are named by hue and never referenced in a
component; components use the semantic tokens. All are defined on `:root` in
`src/styles/global.css`.

Primitives (green neutral ramp and lime accent ramp):

| Token | Value | sRGB (converted) |
| --- | --- | --- |
| `--green-950` | `oklch(0.17 0.035 155)` | `#031409` |
| `--green-900` | `oklch(0.21 0.04 155)` | `#071e10` |
| `--green-800` | `oklch(0.26 0.045 155)` | `#102a1a` |
| `--green-700` | `oklch(0.33 0.05 155)` | `#1f3d2a` |
| `--green-600` | `oklch(0.54 0.07 150)` | `#507a59` |
| `--green-300` | `oklch(0.75 0.07 145)` | `#93ba93` |
| `--green-100` | `oklch(0.94 0.02 140)` | `#e4efe2` |
| `--lime-500` | `oklch(0.82 0.2 132)` | `#92de40` |
| `--lime-400` | `oklch(0.88 0.18 128)` | `#b5ed60` |
| `--pepe-600` | `oklch(0.6 0.13 145)` | `#47944c` |
| `--pepe-900` | `oklch(0.2 0.05 150)` | `#021c09` |
| `--eye-100` | `oklch(0.97 0.01 110)` | `#f5f6ee` |

Semantic tokens and their jobs:

| Token | Points at | Use |
| --- | --- | --- |
| `--color-bg-page` | `--green-950` | `body`, input backgrounds, avatar backing |
| `--color-bg-surface` | `--green-900` | cards, the controls panel, about panel, empty state |
| `--color-bg-raised` | `--green-800` | ghost buttons, chips, rank badge, nav hover |
| `--color-border` | `--green-700` | structural 1px borders and dividers (non-text, decorative) |
| `--color-border-strong` | `--green-600` | borders of controls: inputs, select, chips, hovered cards |
| `--color-text-primary` | `--green-100` | headings, body, labels |
| `--color-text-secondary` | `--green-300` | lead, meta, hints, stats, tags, footer |
| `--color-text-on-accent` | `--green-950` | text on a lime fill |
| `--color-accent-solid` | `--lime-500` | primary button, selected chip, skip link, `::selection` |
| `--color-accent-solid-hover` | `--lime-400` | primary button hover |
| `--color-accent-text` | `--lime-400` | links, eyebrow, rank badge, copied state |
| `--color-focus-ring` | `--lime-400` | every `:focus-visible` outline |
| `--color-image-outline` | `oklch(1 0 0 / 0.1)` | 1px outline on avatars |
| `--pepe-skin`, `--pepe-ink`, `--pepe-glow`, `--pepe-eye` | pepe primitives + `--lime-500` | the `PepeAvatar` SVG fills |

Status colors: none. The site has no error, warning or success states that need a hue; the
copy feedback uses the accent text color plus an icon and label change.

Measured contrast (see `artifacts/validation.md` for method): text-primary on page 16.0:1,
on surface 14.8:1, on raised 13.0:1; text-secondary on page 8.7:1, on surface 8.1:1, on
raised 7.1:1; accent-text on page 13.8:1, on raised 11.1:1; text-on-accent on accent-solid
11.5:1; focus ring on page/surface/raised 13.8 / 12.7 / 11.1:1; border-strong on
page/surface/raised 3.9 / 3.6 / 3.1:1. Pepe ink on pepe skin 4.8:1.

Gradient and texture: `body` carries a fixed radial lime glow at the top trailing corner and
a 2rem grid of 2.5% white lines (`background-image` in `global.css`). It is decorative and
sits under opaque surfaces, so text contrast is measured against the surface tokens. The
sticky header is `--color-bg-page` at 85% alpha with `backdrop-filter: blur(12px)`.

## Typography

Fonts are system stacks; no font files ship and nothing is downloaded.

- `--font-sans`: `ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` for everything.
- `--font-mono`: `ui-monospace, 'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace` for eyebrow labels, `dt` captions, handles, rank numbers, chip counts, topic tags and squad labels.

Scale (`:root`):

| Token | Size | Role | Weight | Line height |
| --- | --- | --- | --- | --- |
| `--text-h1` | `clamp(2rem, 1.2rem + 3.5vw, 3.5rem)` | `.hero__title` | 800, `-0.02em` tracking, `text-wrap: balance` | 1.1 |
| `--text-h2` | 1.5rem | every `h2`, hero stat values | 700, `-0.01em` | 1.1 |
| `--text-lead` | 1.125rem | `.hero__lead` | 400 | 1.55 |
| `--text-body` | 1rem | body, card text, inputs (16px on every width, so iOS does not zoom) | 400 | 1.55 |
| `--text-h3` | 1rem | `.card__author` (weight 700 carries the level) | 700 | 1.3 |
| `--text-ui` | 0.875rem | buttons, chips, nav links, status, stats, field labels | 500–600 | 1.2 |
| `--text-caption` | 0.8125rem | eyebrow, `dt`, meta line, tags, counts | 400–600 | inherited |

Rules in force: uppercase labels get `letter-spacing: var(--tracking-caps)` (0.08em) and
the mono family; changing numbers (`.hero__stat dd`, `.stat`, `.card__rank`, `.chip__count`,
`.feed__status`) use `font-variant-numeric: tabular-nums`; long-form text is capped at
`--measure` (62ch) on `.hero__lead`, `.card__text`, `.section-head__hint` and
`.about__copy`; headings use `text-wrap: balance`, descriptions `text-wrap: pretty`; card
text keeps author line breaks with `white-space: pre-line`; `overflow-wrap: break-word` is
set on `body`. Links use `from-font` underline metrics. Font smoothing is set once on `body`.

## Layout

- Container: `.container` is `min(100% - 2 * 1rem, 72rem)` with `margin-inline: auto`,
  widening the gutter to 2rem from 40rem up.
- Spacing scale: `--space-1` 0.25rem, `-2` 0.5rem, `-3` 0.75rem, `-4` 1rem, `-5` 1.5rem,
  `-6` 2rem, `-7` 3rem, `-8` 4.5rem. Inside a component use one step (`--space-3`/`-4`);
  between groups use at least two steps up (`--space-5`/`-6`).
- Logical properties only (`inline-size`, `padding-inline`, `inset-inline-start`,
  `margin-block-start`). No physical left/right in layout rules.
- Breakpoints come from the content, in rem:
  - `40rem`: controls row goes from stacked to `1fr | minmax(12rem, 16rem)` (search + sort).
  - `52rem`: hero goes from stacked to `3fr | 2fr`; about panel goes to `1fr | auto` with the
    squad on the trailing side; hero padding grows to `--space-8`.
  - `35.99rem` and below: `.brand__sub` is hidden so the brand stays on one line.
- Card grid: `.grid` is `repeat(auto-fill, minmax(min(100%, 21rem), 1fr))`. Observed: 1
  column at 320px, 2 at 768px and 1024px, 3 at 1280px.
- Sections (`.feed`, `.about`) have `scroll-margin-top: 4.5rem` for the sticky header.
- Overflow: verified no horizontal scrolling at 320, 768, 1024 and 1280px and at 200% root
  font size on 1280px. Wrapping is allowed everywhere except `time` in the card meta line,
  chips and button labels (`white-space: nowrap`), which wrap as whole units.

## Elevation & Depth

Three tonal layers do most of the work: page (`--color-bg-page`) → surface
(`--color-bg-surface`) → raised (`--color-bg-raised`). Borders of `--color-border`
outline surfaces; `--color-border-strong` outlines controls.

- `--shadow-raised`: `0 1px 0 oklch(1 0 0 / 0.04) inset, 0 8px 24px oklch(0 0 0 / 0.35)`;
  only on `.card`.
- `.hero__pepe` has a `drop-shadow(0 12px 32px oklch(0 0 0 / 0.5))`; `.hero__glow` is a
  radial lime gradient behind it with `pointer-events: none`.
- The sticky header floats at `z-index: 10` with blur; the skip link is `z-index: 100`.
- Avatars get the 1px white 10% `--color-image-outline`.

## Shapes

- `--radius-sm` 0.5rem: rank badge, tags, nav links, skip link, brand focus shape.
- `--radius-md` 0.75rem: buttons, inputs, select.
- `--radius-lg` 1.25rem: cards, controls panel, about panel, empty state (concentric with
  the 0.75rem inner radius plus 0.5rem of the 1rem padding step).
- `--radius-pill` 999px: topic chips.
- Avatars are circles (`border-radius: 50%`). The empty state uses a dashed
  `--color-border-strong` border to read as a placeholder.

## Components

All styles live in `src/styles/global.css`; components are plain React function components
with no props beyond what is listed.

- **`PepeAvatar`** (`src/components/PepeAvatar.tsx`): `kit: 'visor' | 'antenna' | 'headset'
  | 'chip' | 'goggles'`, optional `size`, `title`, `className`. Decorative by default
  (`aria-hidden`); pass `title` to make it an informative `role="img"`. Fluid, recolored by
  the `--pepe-*` tokens. Used at 2rem (brand), 2.75rem (card avatar), 4rem (squad), 5rem
  (empty state) and full width in the hero.
- **Buttons** (`.btn`): `.btn--primary` (lime fill, the one filled action per view) and
  `.btn--ghost` (raised fill, border). 40px min height on pointer devices, 44px under
  `(hover: none)`. `scale: 0.96` on `:active` (off under reduced motion). The copy button
  sets `data-copied` to switch to accent text and border with a check icon. Works as `<a>`
  or `<button>`.
- **`FeedControls`** (`src/components/FeedControls.tsx`): a `role="group"` with a labelled
  `type="search"` input (`#feed-search`), a labelled native `<select>` (`#feed-sort`) and a
  `fieldset` of native radio chips (`.chip`, inputs visually hidden over the `.chip__face`).
  Radio semantics give one Tab stop and arrow-key movement for free. Selected chip uses the
  lime fill; focus ring is drawn on the face via `.chip__input:focus-visible + .chip__face`.
  Props: `state`, `onChange`, `counts`.
- **`TweetCard`** (`src/components/TweetCard.tsx`): `article` labelled by its `h3`. Rank
  badge (visually hidden "Rank n." for readers), avatar, author, mono handle, `time`, text,
  topic tags (`ul.card__topics > li.tag`), an engagement list (`ul.stats`, compact numbers
  visible, full numbers visually hidden) and actions. Optional `url` renders an "Open post"
  link with the external icon. Hover lifts the card 2px (pointer devices, motion allowed).
- **Icons** (`src/components/Icons.tsx`): 16px, 1.5px stroke, `currentColor`,
  `aria-hidden`. Beside 600-weight button text they stay at 1.5px because the button text is
  14px; keep one stroke weight per surface.
- **Live regions**: `.feed__status` (`role="status"`) always holds the templated count
  sentence; a visually hidden `p[role="status"]` at the end of `App` carries one-off notices
  (copied, copy failed, filters cleared). Both exist from first render.
- **Empty state** (`.empty`): names the query, gives one hint and one primary action
  ("Clear filters"), which also returns focus to the search box.
- **Header / footer**: sticky `.site-header` with `.brand` and `nav[aria-label="Sections"]`;
  `.site-footer` with a back-to-top link. The skip link targets `main#main` (`tabIndex=-1`).

Motion: `--ease-standard` `cubic-bezier(0.2, 0, 0, 1)`, `--duration-fast` 150ms for
color/border/scale on buttons and chips, `--duration-medium` 250ms for the card lift. The
only keyframe animation is the hero glow `pulse` (4s, alternate), wrapped in
`@media (prefers-reduced-motion: no-preference)`. Under `reduce` all transitions are 0ms.

Forced colors: the selected chip maps to `Highlight`/`HighlightText`; card, controls and
about borders use `CanvasText`.

## Do's and Don'ts

- Start a new page from `.container` sections with `h2` headings; keep one `h1` per page.
- Put copy in natural case and let `.eyebrow` / `dt` uppercase it with CSS.
- Use `.btn--primary` once per view. Secondary actions are `.btn--ghost`.
- Use semantic tokens only. If a role is missing, add a `--color-*` token that points at a
  primitive; do not drop a new `oklch()` literal into a component rule.
- Keep every control at 40px tall or more and give it a background or border; text that
  acts like a button is not a button here.
- Keep inputs at 16px font size; do not shrink them on mobile.
- Do not add a light theme, a second accent hue, or bitmap avatars. New characters are new
  `kit` variants of `PepeAvatar`.
- Do not animate anything new without a reduced-motion guard and a static cue.

Recipe for one more page (for example a "Threads" page):

1. Copy `index.html` to `threads.html`, keep the `<meta name="color-scheme">` and favicon
   links, and point the module script at a new `src/threads.tsx` that imports
   `./styles/global.css` and renders a new root component.
2. Reuse the header and footer markup from `src/App.tsx` (brand, nav, skip link, `main#main`).
3. Put the content in `.container` sections with `.section-head`; list items are
   `TweetCard`s inside `ol.grid`; filters are `FeedControls` or the same `.field`/`.chip`
   classes; a one-off illustration is `PepeAvatar` with a new `kit` if needed.
4. Add the file to Vite's `build.rollupOptions.input` in `vite.config.ts` and rebuild.
