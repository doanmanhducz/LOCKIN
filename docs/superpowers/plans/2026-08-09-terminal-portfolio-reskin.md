# Terminal Portfolio Reskin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the personal research archive to a complete terminal-styled portfolio without changing the three public tabs.

**Architecture:** Replace the shared CSS system and upgrade the existing layout/components with terminal primitives. Content/data/routes remain unchanged.

**Tech Stack:** Astro 5, CSS, TypeScript, Vitest, GitHub Pages.

## Global Constraints

- Preserve About, Research, Hall of Fame and all `/LOCKIN/` paths.
- Use dark terminal colors, command labels, no copied assets/code, and reduced-motion support.
- Keep articles readable and do not add a canvas or external animation library.

---

### Task 1: Terminal tokens and shared shell

**Files:** Modify `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/PortraitPlaceholder.astro`; test `tests/site-shell.test.ts`.

- [ ] Write a failing test for a terminal identity label in site configuration.
- [ ] Run `npm.cmd test -- --run tests/site-shell.test.ts`; expect failure.
- [ ] Add the terminal shell, typography imports, scanline/grid decorations, titlebar-style header, mobile navigation, focus styles, and reduced-motion rules.
- [ ] Run `npm.cmd test -- --run && npm.cmd run check && npm.cmd run build`; expect all pass.

### Task 2: Terminal home, archive, articles, and career log

**Files:** Modify `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/research/index.astro`, `src/pages/research/[...slug].astro`, `src/pages/hall-of-fame.astro`, `src/components/ResearchCard.astro`, `src/components/ResearchFilters.astro`.

- [ ] Preserve route-helper tests and run them before changing markup.
- [ ] Add terminal command labels and panels while retaining existing content and links.
- [ ] Render Career Path as `tail career.log`; retain chronological data.
- [ ] Run the full test/check/build suite, inspect built routes, commit, and push.
