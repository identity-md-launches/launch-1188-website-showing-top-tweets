# Top tweets about IdentityMD

A single-page static site that shows a curated, ranked feed of posts about IdentityMD.
Dark green, with pepes armed with AI kit. Built with Vite, React and TypeScript; the
production export in `dist/` is committed and uses relative asset URLs, so it can be served
from any folder, a gateway subpath or a content-addressed host with no backend.

Primary interactions: search posts, filter by topic, sort (top overall, most liked, most
reposted, newest), copy a post's text, and share a filtered view through the URL hash
(for example `#topic=agents&sort=newest`).

## Install

Requires Node 20 or newer (built and checked with Node 24.21.0, npm 11.19.0).

```sh
npm ci
```

## Preview

Development server with hot reload:

```sh
npm run dev
```

Preview the committed production export exactly as it will be published:

```sh
npm run preview
```

Both print a local URL. The export also works from a plain static server, for example
`npx serve dist` or `python3 -m http.server --directory dist`.

## Rebuild

```sh
npm run check     # typecheck + unit/interaction tests + production build
```

or step by step:

```sh
npm run typecheck   # tsc --noEmit
npm test            # vitest (jsdom)
npm run build       # vite build -> dist/
```

Always rebuild after editing anything in `src/`, `public/` or `index.html`, and commit
`dist/` together with the source. The publisher serves the committed export; it does not
rebuild.

## Edit the content

All posts live in `src/data/tweets.ts`. Each entry has an id, author, handle, avatar kit,
text, ISO date, like/repost/reply counts, topics and an optional `url`. The entries shipped
here were written as a representative sample set for the launch of the site; replace them
with the real posts you want to feature, then rebuild. Ranking for "Top overall" is
`likes + 2 × reposts + 3 × replies` (see `src/lib/feed.ts`).

## Publish

1. Run `npm run check` and make sure it exits 0.
2. Commit `dist/` with the source and `package-lock.json`.
3. Upload the contents of `dist/` to any static host (an object-storage bucket, GitHub
   Pages, IPFS, an ENS content hash, or a plain web server). No rewrite rules are needed:
   the site is one page and uses hash state only. Asset paths are relative (`./assets/…`),
   so the site works at `/` and at any subpath.

## Validation record

Commands run on the final source (2026-10-09):

| Command | Result |
| --- | --- |
| `npm run typecheck` | exit 0, no errors |
| `npm test` | 2 files, 15 tests passed (feed logic, hash round-trip, rendering, search, topic filter, sort, hash restore, copy success and failure) |
| `npm run build` | exit 0; `dist/index.html`, `dist/assets/index-*.js` (245 kB, 76 kB gzip), `dist/assets/index-*.css` (15 kB), `dist/favicon.svg`; all URLs relative |
| Browser verification script | 60/60 checks passed in headless Chromium against `dist/` served under `/preview/` |

The browser run served the built export from a throwaway local server under a `/preview/`
subpath, drove headless Chromium through the installed playwright-core, and checked: all
14 posts render; no console errors or warnings; no failed resource loads; no horizontal
overflow at 320, 768, 1024 and 1280 px and at 200% root font size; one `h1` with
descending heading sizes; search, empty state, clear filters (focus returns to the search
box), topic chips, sort, hash write and restore, clipboard copy and its polite
announcement; skip link as the first Tab stop and focus moving to `main`; every Tab stop
named with a visible 2px focus outline; arrow keys moving the topic radio group; axe-core
4 (WCAG 2.x A/AA and best-practice rules) with zero violations; hero animation off under
`prefers-reduced-motion: reduce`; all controls at least 40px tall at 320 px; 21 rendered
text/background pairs measured at or above their WCAG threshold. Screenshots are in
`artifacts/screenshots/`. The full review, findings and limitations are in
`artifacts/validation.md`; the design system is documented in `DESIGN.md`.

Limitations: no screen-reader session, no physical-device test, no browser-native zoom
(root font size 200% was used as a reflow proxy), no RTL mirror (the site is English only),
and the sample content is placeholder text, not scraped from X.

## Repository layout

```
index.html            entry document (lang, viewport, color-scheme, favicon)
public/favicon.svg    pepe favicon, copied verbatim into dist/
src/main.tsx          React root
src/App.tsx           page composition and state (search, topic, sort, hash sync, notices)
src/components/       PepeAvatar, TweetCard, FeedControls, Icons
src/data/tweets.ts    the content
src/lib/              feed filtering/sorting/hash helpers, number and date formatting
src/styles/global.css tokens and all component styles
src/*.test.ts(x)      vitest unit and interaction tests
dist/                 committed production export (rebuild, do not edit by hand)
artifacts/            validation report and screenshots
DESIGN.md             implemented design system
```
