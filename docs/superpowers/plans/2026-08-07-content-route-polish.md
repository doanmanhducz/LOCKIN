# Content and Route Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make GitHub Pages project-site links work and publish personal research/career copy.

**Architecture:** A single path helper derives all internal URLs from Astro's configured base URL. Pages and components use that helper, while content remains Markdown/data driven.

**Tech Stack:** Astro 5, TypeScript, Markdown, Vitest, GitHub Pages.

## Global Constraints

- Internal links must begin with `/LOCKIN/` in production output.
- Do not publish phone numbers, an unredacted CV, or invented research claims.
- Use concise personal field-note copy and a Career Path only Hall of Fame.

---

### Task 1: Base-aware navigation

**Files:**
- Create: `src/lib/paths.ts`
- Modify: `src/layouts/BaseLayout.astro`, `src/components/ResearchCard.astro`, `src/pages/index.astro`, `src/pages/404.astro`, `tests/site-shell.test.ts`

**Produces:** `sitePath(path: string): string`, returning `/LOCKIN/` for `/` and `/LOCKIN/<path>` for all internal routes during the production build.

- [ ] **Step 1: Write the failing URL test**

```ts
import { expect, it } from 'vitest';
import { sitePath } from '../src/lib/paths';

it('prefixes internal paths with the GitHub Pages base', () => {
  expect(sitePath('/hall-of-fame')).toBe('/LOCKIN/hall-of-fame');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm.cmd test -- --run tests/site-shell.test.ts`

Expected: FAIL because `src/lib/paths.ts` is absent.

- [ ] **Step 3: Implement the helper and replace hard-coded internal hrefs**

```ts
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const sitePath = (path: string) => `${base}${path === '/' ? '/' : path}`;
```

Import `sitePath` for the logo, navigation, research archive link, card links, and 404 link. Keep hashes, mailto, and external links unchanged.

- [ ] **Step 4: Run test, check, and build**

Run: `npm.cmd test -- --run && npm.cmd run check && npm.cmd run build`

Expected: tests pass and built HTML contains `/LOCKIN/hall-of-fame`.

### Task 2: Personal writing and career timeline

**Files:**
- Modify: `src/config/site.ts`, `src/pages/about.astro`, `src/pages/index.astro`, `src/layouts/BaseLayout.astro`, `src/pages/hall-of-fame.astro`, `src/styles/global.css`, `src/content/research/phishfusion.md`, `src/content/research/phishing-rag.md`, `src/data/hall-of-fame.ts`

- [ ] **Step 1: Preserve the existing privacy test**

Run: `npm.cmd test -- --run tests/site-config.test.ts`

Expected: PASS with `cvHref` equal to `null`.

- [ ] **Step 2: Implement approved copy and layout**

Replace generic landing/footer Hall of Fame copy with personal writing. Create a single reverse-chronological timeline with a vertical spine, oxblood date marker, serif role title, and one contribution line. Write both paper notes with sections `Why I cared`, `The question`, `What the work explores`, `What I would keep investigating`, and `Source`; set the RIVF Source link to `https://ieeexplore.ieee.org/document/11365186`.

- [ ] **Step 3: Verify and deploy**

Run: `npm.cmd test -- --run && npm.cmd run check && npm.cmd run build && git diff --check`

Expected: 0 test failures, 0 Astro errors/warnings, and generated article pages.

```bash
git add src tests docs
git commit -m "feat: polish personal archive routes and writing"
git push origin main
```
