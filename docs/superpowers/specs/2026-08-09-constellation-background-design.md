# Constellation Background Design

## Goal

Add one subtle, site-wide animated emerald constellation behind the existing terminal portfolio without changing its routes, content, or dark visual language.

## Architecture

`ConstellationBackground.astro` renders one fixed, inaccessible canvas. Its client script owns node generation, DPR-aware sizing, drawing, animation, visibility pausing, resize handling, and teardown. `BaseLayout.astro` places it between the body gradient and existing scanline overlay.

## Visual Rules

- Keep the existing `#050807` / `#0b100f` radial-gradient background.
- Draw 40--55 desktop nodes, 30--38 tablet nodes, and 18--26 mobile nodes.
- Nodes move at 0.10--0.28 CSS pixels per frame, bounce at viewport edges, and use low-alpha `#00ff7f` fills.
- Connect nodes only inside a responsive 130--170px range using `#00b35a`; alpha fades with distance and never exceeds 0.16.
- Canvas remains behind content at a non-negative z-index, cannot receive pointer input, and scanlines stay in their own extremely low-opacity layer above it.

## Accessibility And Performance

- Reduced-motion users receive one sparse static render.
- Page Visibility pauses and resumes the animation loop.
- Device pixel ratio is capped at 2.
- Resize listener and animation frame are cleaned up on page lifecycle teardown.

## Verification

- A source-level test confirms the shared layout mounts the canvas component and the component contains reduced-motion and visibility handling.
- Run Vitest, Astro type checks, and production build.
