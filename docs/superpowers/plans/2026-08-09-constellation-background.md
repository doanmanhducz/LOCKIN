# Constellation Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render a subtle, accessible, site-wide constellation canvas behind all portfolio pages.

**Architecture:** A dedicated Astro component owns a single client-side canvas lifecycle. The shared layout mounts it once and CSS defines the gradient, canvas, scanline, and content layers.

**Tech Stack:** Astro 5, TypeScript, Canvas API, Vitest.

## Global Constraints

- Do not add dependencies or alter Astro/GitHub Pages configuration.
- Preserve `#050807` background, existing content, sticky header, and scanline overlay.
- Canvas must be fixed, pointer-inert, aria-hidden, DPR-capped, responsive, and respect reduced motion.

---

### Task 1: Cover the shared background contract

**Files:**
- Modify: `tests/constellation-background.test.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Create: `src/components/ConstellationBackground.astro`

- [ ] **Step 1: Write a failing source-level test**

```ts
expect(layout).toContain('<ConstellationBackground />');
expect(component).toContain('prefers-reduced-motion');
expect(component).toContain('visibilitychange');
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm.cmd test -- --run tests/constellation-background.test.ts`

- [ ] **Step 3: Add the canvas component and mount it in the layout**

Render `<canvas class="constellation-canvas" aria-hidden="true"></canvas>` once before the scanlines. Implement the canvas animation with responsive density, distance-faded links, capped DPR, reduced-motion static rendering, visibility pausing, and lifecycle cleanup.

- [ ] **Step 4: Run the focused test and verify it passes**

Run: `npm.cmd test -- --run tests/constellation-background.test.ts`

### Task 2: Define stable visual layers and verify the static build

**Files:**
- Modify: `src/styles/global.css`
- Modify: `tests/constellation-background.test.ts`

- [ ] **Step 1: Extend the failing test with layer assertions**

```ts
expect(css).toContain('.constellation-canvas{position:fixed;inset:0');
expect(css).toContain('.scanlines{z-index:1');
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npm.cmd test -- --run tests/constellation-background.test.ts`

- [ ] **Step 3: Add canvas, scanline, and content z-index rules**

Keep scanlines at very low opacity and use explicit positive layering so the canvas remains visible without blocking content.

- [ ] **Step 4: Run focused and full verification**

Run: `npm.cmd test -- --run; npm.cmd run check; npm.cmd run build`
