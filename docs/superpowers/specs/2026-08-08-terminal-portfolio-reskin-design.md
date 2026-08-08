# Terminal Portfolio Reskin Design

## Goal

Reskin the existing public personal research archive as a full dark terminal portfolio while preserving its three public sections: About, Research, and Hall of Fame.

## Visual System

- Canvas: near-black `#050807`; panel `#0a0f0c`; primary phosphor text `#d3ffe0`; muted text `#7fa88b`; terminal green `#55ff89`; alert amber `#f6c85f`.
- Typography: JetBrains Mono for interface, metadata, and body; Inconsolata for oversized display identity. Load both from Google Fonts.
- Background: a fixed low-opacity grid, scanline overlay, and sparse CSS-only phosphor dots. No canvas, image, stock asset, or high-frequency animation.
- Components use crisp one-pixel borders, square corners, command prompts, and terminal titlebars. The green accent is used for focus, prompts, and status indicators only.
- Motion: one hero typewriter/reveal, a subdued cursor blink, and content entrance. `prefers-reduced-motion` disables every animation and transition.

## Information Architecture

Navigation remains `About`, `Research`, and `Hall of Fame`, with the home wordmark returning to the index. All existing `/LOCKIN/` base-aware routing remains unchanged.

Home is a terminal session: `whoami` renders name/nickname, `cat roles.txt` renders the positioning line, and actions point to About and Research. Research becomes a command-indexed archive; article pages retain their current content and source links but render in a high-contrast reading terminal. Hall of Fame is `tail career.log`, retaining the existing chronology and contribution lines.

## Accessibility and Verification

Text and focus indicators meet high-contrast dark-surface use. Scanlines and decorative dots are aria-hidden. Navigation retains mobile behavior and visible keyboard focus. Tests cover the original route-base helper and navigation; build verification checks all seven static routes.
