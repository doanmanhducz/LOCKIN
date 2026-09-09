import { expect, it } from 'vitest';
// @ts-ignore Vitest supplies Node's runtime module without project-wide Node typings.
import { readFileSync } from 'node:fs';

it('mounts a shared petal background with motion safeguards', () => {
  const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
  const component = readFileSync(new URL('../src/components/SpiritBackground.astro', import.meta.url), 'utf8');

  expect(layout).toContain('<SpiritBackground />');
  expect(layout).not.toContain('<ConstellationBackground />');
  expect(component).toContain('prefers-reduced-motion');
  expect(component).toContain('visibilitychange');
  expect(component).toContain('if (reduced.matches) return');
  expect(component).toContain("removeEventListener('change', populate)");
  expect(component).toContain('aria-hidden="true"');
  expect(component).toContain('12 + i * 17 % 76');
});

it('keeps the constellation and scanlines behind readable content', () => {
  const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'latin1');

  expect(css).toContain('.constellation-canvas,.scanlines{position:fixed;inset:0');
  expect(css).toContain('.scanlines{z-index:1');
  expect(css).toContain('rgba(0,255,127,.016)');
});

it('does not override fixed controls while placing content above the canvas', () => {
  const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'latin1');

  expect(css).toContain('body>main,body>.site-footer{position:relative;z-index:2}');
  expect(css).not.toContain('body> :not(.constellation-canvas):not(.scanlines){position:relative;z-index:2}');
  expect(css).toContain('.back-to-top{z-index:7}');
});
