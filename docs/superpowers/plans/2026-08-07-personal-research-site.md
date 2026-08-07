# Personal Research Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Replace LOCKIN's legacy full-stack productivity application with a public Astro research archive deployable to GitHub Pages.

**Architecture:** Astro statically builds routes from typed Markdown content and local TypeScript data. A shared BaseLayout owns the Night Essay shell; page components consume narrow helpers. Giscus is configuration-gated, so the site has no custom backend or database.

**Tech Stack:** Astro 5, TypeScript, Zod content collections, Markdown, Vitest, plain CSS, GitHub Actions, GitHub Pages, Giscus.

## Global Constraints

- Site copy and sample content are English-only.
- Publish static output only; do not add Express, a database, server endpoints, analytics, contact forms, or an authoring UI.
- Keep source public and deploy GitHub Pages from main.
- Use Night Essay: #ece7dc paper, #161513 ink, restrained #8d3028 stamps, serif display type, monospace metadata, no gradients, neon, parallax, or stock imagery.
- Support 320px upward and honor prefers-reduced-motion.
- Omit Giscus until configured; moderation is through GitHub Discussions.
- Preserve Git history; remove legacy working-tree files only in the migration commit.

---

## File Structure

- package.json: single Astro package and scripts.
- astro.config.mjs, tsconfig.json, src/env.d.ts: static build setup.
- src/styles/global.css: tokens, typography, responsive/reduced-motion rules.
- src/layouts/BaseLayout.astro: document shell, header, and footer.
- src/config/site.ts: profile placeholders, links, CV, and Giscus config.
- src/content.config.ts and src/content/research/*.md: validated writing.
- src/lib/research.ts: filtering and related-article functions.
- src/data/hall-of-fame.ts: typed achievement records.
- src/components/*.astro and src/pages/**: interface and routes.
- tests/*.test.ts: pure behavior tests.
- .github/workflows/deploy.yml: Pages deployment.

## Task 1: Replace the legacy app with an Astro foundation

**Files:**
- Delete: backend/, frontend/, docker-compose.yml, CV_DOANMANHDUC_latest.pdf, Prompt.md, Rule.md, Todolist.md, legacy README.md, and workspace package.json.
- Create: package.json, astro.config.mjs, tsconfig.json, src/env.d.ts, .gitignore, public/cv-placeholder.pdf, README.md, tests/site-config.test.ts.

**Produces:** npm run dev, npm run check, npm test, npm run build; public CV path /cv-placeholder.pdf.

- [ ] **Step 1: Write the failing configuration test**

~~~ts
import { expect, it } from 'vitest';
import { site } from '../src/config/site';

it('points to the public CV asset', () => {
  expect(site.cvHref).toBe('/cv-placeholder.pdf');
});
~~~

- [ ] **Step 2: Verify the test fails**

Run: npm test -- --run tests/site-config.test.ts

Expected: FAIL because the legacy root has no test script or src/config/site.ts.

- [ ] **Step 3: Implement the minimal static foundation**

Create this root package manifest:

~~~json
{
  "name": "personal-research-archive",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "check": "astro check",
    "test": "vitest",
    "build": "astro build",
    "preview": "astro preview"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "astro": "^5.0.0",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  }
}
~~~

Set output: 'static', site: 'https://doanmanhducz.github.io', and base: '/LOCKIN' in astro.config.mjs. Add node_modules/, dist/, .astro/, and .superpowers/ to .gitignore. Add a valid small placeholder PDF and a README listing the scripts.

- [ ] **Step 4: Install and verify Astro**

Run: npm install

Run: npm run check && npm run build

Expected: both exit 0 and produce dist/.

- [ ] **Step 5: Commit**

~~~bash
git add -A
git commit -m "chore: replace legacy app with Astro foundation"
~~~

## Task 2: Define configuration, content schema, and research helpers

**Files:**
- Create: src/config/site.ts, src/content.config.ts, src/content/research/trust-boundaries.md, src/content/research/failure-modes.md, src/content/research/large-assumption.md, src/lib/research.ts, tests/research.test.ts.
- Modify: tests/site-config.test.ts.

**Produces:** site: SiteConfig; filterResearchEntries(entries, type, tag): ResearchEntry[]; getRelatedResearch(entries, currentSlug, max): ResearchEntry[].

- [ ] **Step 1: Write failing helper tests**

~~~ts
import { describe, expect, it } from 'vitest';
import { filterResearchEntries, getRelatedResearch } from '../src/lib/research';

const entries = [
  { slug: 'a', data: { type: 'CVE Analysis', tags: ['web', 'auth'], publishedAt: new Date('2026-07-01') } },
  { slug: 'b', data: { type: 'Paper Notes', tags: ['web'], publishedAt: new Date('2026-05-01') } },
  { slug: 'c', data: { type: 'Disclosure', tags: ['cloud'], publishedAt: new Date('2026-03-01') } }
] as any[];

describe('research helpers', () => {
  it('filters by type and tag', () => expect(filterResearchEntries(entries, 'CVE Analysis', 'web').map((x) => x.slug)).toEqual(['a']));
  it('ranks shared tags and excludes current', () => expect(getRelatedResearch(entries, 'a', 2).map((x) => x.slug)).toEqual(['b']));
});
~~~

- [ ] **Step 2: Verify failure**

Run: npm test -- --run tests/research.test.ts tests/site-config.test.ts

Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Implement types and data**

Define the research collection with required title, description, publishedAt, type, tags, and draft; optional cveIds, references, featured, and coverLabel. Restrict type to CVE Analysis, Paper Notes, Disclosure, or Field Note.

Implement:

~~~ts
export function filterResearchEntries(entries, type = 'All', tag = 'All') {
  return entries.filter((entry) =>
    (type === 'All' || entry.data.type === type) &&
    (tag === 'All' || entry.data.tags.includes(tag))
  );
}
export function getRelatedResearch(entries, currentSlug, max = 3) {
  const current = entries.find((entry) => entry.slug === currentSlug);
  if (!current) return [];
  return entries.filter((entry) => entry.slug !== currentSlug)
    .map((entry) => ({ entry, score: entry.data.tags.filter((tag) => current.data.tags.includes(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.entry.data.publishedAt.valueOf() - a.entry.data.publishedAt.valueOf())
    .slice(0, max).map(({ entry }) => entry);
}
~~~

Seed three non-sensitive articles and configure visibly placeholder identity, null social URLs, /cv-placeholder.pdf, and giscus: null.

- [ ] **Step 4: Verify schema and helpers**

Run: npm run check && npm test -- --run

Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src tests
git commit -m "feat: add typed research content model"
~~~

## Task 3: Build the Night Essay shared shell

**Files:**
- Create: src/styles/global.css, src/layouts/BaseLayout.astro, src/components/SiteHeader.astro, src/components/SiteFooter.astro, src/components/PortraitPlaceholder.astro, src/components/ResearchCard.astro, src/components/SectionHeading.astro, tests/site-shell.test.ts.
- Modify: src/config/site.ts.

**Produces:** BaseLayout accepting title, description?, currentPath?; ResearchCard accepting a research entry.

- [ ] **Step 1: Write the failing navigation test**

~~~ts
import { expect, it } from 'vitest';
import { navigation } from '../src/config/site';

it('keeps the three approved primary pages', () => {
  expect(navigation.map((item) => item.href)).toEqual(['/about', '/research', '/hall-of-fame']);
});
~~~

- [ ] **Step 2: Verify failure**

Run: npm test -- --run tests/site-shell.test.ts

Expected: FAIL because navigation does not exist.

- [ ] **Step 3: Implement shell and components**

Export:

~~~ts
export const navigation = [
  { label: 'About', href: '/about' },
  { label: 'Research', href: '/research' },
  { label: 'Hall of Fame', href: '/hall-of-fame' }
] as const;
~~~

Implement one main landmark, a skip link, keyboard focus styles, responsive grids, and reduced-motion overrides. Use CSS-only portrait geometry. Make ResearchCard link to /research/{entry.slug} and show type, date, title, description, tags. Do not add client hydration.

- [ ] **Step 4: Verify the shared shell**

Run: npm run check && npm test -- --run tests/site-shell.test.ts && npm run build

Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src tests
git commit -m "feat: add Night Essay site shell"
~~~

## Task 4: Implement home, About, and Hall of Fame

**Files:**
- Create: src/data/hall-of-fame.ts, src/pages/index.astro, src/pages/about.astro, src/pages/hall-of-fame.astro.
- Modify: src/config/site.ts, tests/site-config.test.ts.

**Produces:** Achievement with kind, title, date, organization, summary, url?.

- [ ] **Step 1: Write a failing social placeholder test**

~~~ts
it('keeps social links inert until configured', () => {
  expect(site.socialLinks.every((link) => link.href === null)).toBe(true);
});
~~~

- [ ] **Step 2: Verify failure**

Run: npm test -- --run tests/site-config.test.ts

Expected: FAIL until socialLinks is an array of { label: string; href: string | null }.

- [ ] **Step 3: Implement the three pages**

Create five clearly-marked sample achievements across paper, CVE, certification, acknowledgement, and career kinds. Home has hero, portrait placeholder, three latest articles, and a Hall of Fame callout. About has profile, passions, interests, social links only for non-null URLs, and CV link. Hall of Fame groups achievements by kind and orders each group newest first.

- [ ] **Step 4: Verify routes/assets**

Run: npm run check && npm test -- --run tests/site-config.test.ts && npm run build

Run: rg -n "cv-placeholder.pdf|Hall of Fame|Research" dist

Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src tests
git commit -m "feat: add profile and recognition pages"
~~~

## Task 5: Implement Research, article routes, filtering, and Giscus

**Files:**
- Create: src/components/ResearchFilters.astro, src/components/giscus-config.ts, src/components/GiscusComments.astro, src/pages/research/index.astro, src/pages/research/[...slug].astro, src/pages/404.astro, tests/giscus.test.ts.
- Modify: src/lib/research.ts, src/config/site.ts.

**Produces:** /research, static /research/<slug> routes, and Giscus behavior only when config is present.

- [ ] **Step 1: Write a failing Giscus test**

~~~ts
import { expect, it } from 'vitest';
import { giscusScriptAttributes } from '../src/components/giscus-config';

it('does not emit a script without configuration', () => {
  expect(giscusScriptAttributes(null)).toBeNull();
});
~~~

- [ ] **Step 2: Verify failure**

Run: npm test -- --run tests/giscus.test.ts tests/research.test.ts

Expected: FAIL because the Giscus boundary does not exist.

- [ ] **Step 3: Implement archive and article generation**

Use getStaticPaths for non-draft entries. The archive includes native selects and a small script toggling cards with data-type and data-tags. Articles render title, date, type, tags, heading-derived table of contents, references, getRelatedResearch(entries, slug, 3), and Giscus.

Implement this exact config boundary:

~~~ts
export function giscusScriptAttributes(config: GiscusConfig | null) {
  if (!config) return null;
  return {
    src: 'https://giscus.app/client.js',
    'data-repo': config.repo,
    'data-repo-id': config.repoId,
    'data-category': config.category,
    'data-category-id': config.categoryId,
    'data-mapping': 'pathname',
    'data-theme': 'noborder_light',
    crossorigin: 'anonymous',
    async: true
  };
}
~~~

When null, render Discussion is not configured yet, never a broken iframe. Add 404.astro linking to /research.

- [ ] **Step 4: Verify archive, article, and fallback output**

Run: npm run check && npm test -- --run && npm run build

Run: rg -n "Discussion is not configured yet|data-type|trust-boundaries" dist

Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src tests
git commit -m "feat: add research archive and article pages"
~~~

## Task 6: Deploy with GitHub Pages and release-check

**Files:**
- Create: .github/workflows/deploy.yml.
- Modify: README.md, astro.config.mjs.

**Produces:** Pages workflow for pushes to main using npm ci, check, test, build, upload artifact, deploy.

- [ ] **Step 1: Verify the workflow is absent**

Run: Test-Path .github/workflows/deploy.yml

Expected: False.

- [ ] **Step 2: Implement deployment and author docs**

Create Deploy Astro site with push to main and workflow_dispatch; grant pages: write and id-token: write; use Node 22/cache; run npm ci, npm run check, npm test -- --run, npm run build; upload ./dist with actions/upload-pages-artifact@v3; deploy with actions/deploy-pages@v4.

Document author flow: edit src/config/site.ts; write Markdown in src/content/research/; add achievements in src/data/hall-of-fame.ts; check, test, build, commit, push; configure Giscus GitHub Discussions before setting credentials.

- [ ] **Step 3: Run full local verification**

Run: npm run check && npm test -- --run && npm run build

Run: git status --short && git diff --check

Expected: all checks pass, dist/ exists, no whitespace errors.

- [ ] **Step 4: Inspect local responsive routes**

Run: npm run preview -- --host 127.0.0.1

Expected: /, /about, /research, /research/trust-boundaries, /hall-of-fame, and an invalid route load without horizontal overflow at 320px and 1440px.

- [ ] **Step 5: Commit and push**

~~~bash
git add .github README.md astro.config.mjs
git commit -m "ci: deploy research site to GitHub Pages"
git push origin main
~~~

## Plan Self-Review

- **Spec coverage:** Tasks 1-6 cover static Astro architecture, Markdown writing, all approved pages, CV/social placeholders, typed achievements, Night Essay styling, responsive/reduced-motion behavior, optional Giscus, 404, migration, GitHub Pages, and verification.
- **Placeholder scan:** There are no deferred implementation instructions. User profile values intentionally remain safe placeholders per the approved spec.
- **Type consistency:** site, navigation, research entries, helper functions, Achievement, and GiscusConfig are defined before their consumers.
