# One-Page Terminal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the Astro archive as a responsive, accessible, single-page security-research portfolio with a restrained terminal interface.

**Architecture:** Keep Astro static output and the GitHub Pages base-path helper. A typed site configuration owns all navigable sections and repeatable card data; `index.astro` renders semantic sections from it, while a small inline module handles mobile navigation, reveal state, certificate dialog, and return-to-top behaviour.

**Tech Stack:** Astro 5, TypeScript, CSS, browser-native dialog-compatible JavaScript, Vitest, GitHub Pages.

## Global Constraints

- Preserve the existing Astro configuration and `/LOCKIN/` deployment base.
- Use original placeholder content only; do not copy third-party code, images, names, links, certificates, repositories, or prose.
- Use Inconsolata for body text and JetBrains Mono for headings and labels.
- Respect `prefers-reduced-motion`, semantic landmarks, keyboard focus, Escape-to-close, and a 72px scroll offset.
- Do not add animation libraries or image assets.

---

### Task 1: Define one-page portfolio data and navigation contract

**Files:** Modify `src/config/site.ts`; create `tests/one-page-portfolio.test.ts`.

- [ ] **Step 1: Write the failing test**

```ts
expect(portfolioNavigation.map((item) => item.href)).toEqual([
  '#home', '#skills', '#certifications', '#projects', '#write-ups', '#blog', '#contact'
]);
expect(portfolio.certifications).toHaveLength(4);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm.cmd test -- --run tests/one-page-portfolio.test.ts`

Expected: FAIL because the one-page navigation and portfolio data are not exported.

- [ ] **Step 3: Write minimal implementation**

Export `portfolioNavigation` and a typed `portfolio` data object holding roles, skill groups, certificate cards, project cards, write-ups, blog entries, and contact values.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm.cmd test -- --run tests/one-page-portfolio.test.ts`

Expected: PASS.

### Task 2: Render the semantic page and interactions

**Files:** Modify `src/pages/index.astro`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`; test `tests/one-page-portfolio.test.ts`.

- [ ] **Step 1: Write the failing test**

```ts
expect(portfolioNavigation).toContainEqual({ label: 'Contact', href: '#contact' });
expect(portfolio.contact.email).toMatch(/^mailto:/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm.cmd test -- --run tests/one-page-portfolio.test.ts`

Expected: FAIL until Contact is part of the final navigation contract and the contact action is accessible.

- [ ] **Step 3: Write minimal implementation**

Build the sticky header, terminal hero, section grids, certificate dialog, mobile disclosure menu, and return-to-top control. Use `IntersectionObserver` for reveal state and native events for dialog control; all controls have labels and keyboard-operable semantics.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm.cmd test -- --run tests/one-page-portfolio.test.ts`

Expected: PASS.

### Task 3: Verify static output and presentation

**Files:** Modify only files required by verification fixes.

- [ ] **Step 1: Run test, typecheck, and build**

Run: `npm.cmd test -- --run; npm.cmd run check; npm.cmd run build`

Expected: all tests pass, Astro reports zero errors, and the build emits static output.

- [ ] **Step 2: Inspect generated HTML**

Run: `rg -n 'id="(home|skills|certifications|projects|write-ups|blog|contact)"|skip-link|mobile-menu' dist`

Expected: all anchor destinations and responsive-accessibility hooks are present.

- [ ] **Step 3: Commit the verified change**

```powershell
git add src tests docs/superpowers/plans
git commit -m "feat: rebuild portfolio as one-page terminal site"
```
