# Static Post Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add static Write-Ups and Blog listings with Markdown detail pages to the existing Astro terminal portfolio.

**Architecture:** A single `posts` Astro content collection validates frontmatter and produces every listing/detail page at build time. Shared helpers filter drafts, sort by date, and generate `/writeups/<slug>/` and `/blog/<slug>/` paths; a shared page component renders both detail types and derives its TOC from Astro Markdown headings.

**Tech Stack:** Astro 5 content collections, Markdown, TypeScript, CSS, Vitest, GitHub Pages.

## Global Constraints

- Retain `output: 'static'` and `base: '/LOCKIN'` exactly as configured.
- Keep Home, Skills, Certifications, Projects, and Contact as homepage anchors; route Write-Ups and Blog to static listings.
- Do not render `draft: true` entries in listings or static detail paths.
- Store local covers under `public/images/posts/` and pass every internal URL through `sitePath`.
- Preserve keyboard support, reduced motion, responsive navigation, and the established terminal palette.

### Task 1: Post collection and route helper

**Files:** Modify `src/content.config.ts`; create `src/lib/posts.ts`, `tests/posts.test.ts`, and six Markdown files in `src/content/posts/`.

- [ ] Write a failing test that expects published posts to omit a draft, sort newest first, and build `/blog/<slug>/` paths.
- [ ] Run `npm.cmd test -- --run tests/posts.test.ts` and observe the missing helper failure.
- [ ] Add the `posts` collection schema and helper functions `getPublishedPosts`, `getPostsByType`, and `postPath`.
- [ ] Run the targeted test and confirm it passes.

### Task 2: Shared navigation and static pages

**Files:** Modify `src/config/site.ts`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`; create `src/pages/writeups/index.astro`, `src/pages/blog/index.astro`, `src/pages/writeups/[slug].astro`, `src/pages/blog/[slug].astro`, and reusable post components.

- [ ] Write a failing test asserting the navigation targets `/writeups` and `/blog` rather than homepage fragments.
- [ ] Run the targeted test and observe the old fragment links fail the assertion.
- [ ] Add active-route navigation, data-driven listing cards, static detail paths, desktop TOC, scroll progress, and no-result fallback.
- [ ] Run the targeted tests and confirm they pass.

### Task 3: Local covers and article styles

**Files:** Create `public/images/posts/*.svg`; modify `src/styles/global.css` and `README.md`.

- [ ] Add three original low-cost SVG covers and use a patterned visual fallback when a cover is absent.
- [ ] Style cards, typography, code, tables, blockquotes, images, progress, and responsive TOC within the existing design tokens.
- [ ] Document the frontmatter and local cover workflow in README.

### Task 4: Full verification and release

**Files:** Modify only verification fixes.

- [ ] Run `npm.cmd test -- --run`, `npm.cmd run check`, and `npm.cmd run build` with Astro telemetry disabled.
- [ ] Inspect generated `dist` output for write-up/blog listings, all six detail routes, base-prefixed navigation, and absence of old menu fragments.
- [ ] Commit verified files and push `main`; confirm the GitHub Pages workflow succeeds.
