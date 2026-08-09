import { expect, it } from 'vitest';
// @ts-ignore Vitest supplies Node's runtime module without project-wide Node typings.
import { readFileSync } from 'node:fs';

it('mounts one shared constellation canvas with motion safeguards', () => {
  const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
  const component = readFileSync(new URL('../src/components/ConstellationBackground.astro', import.meta.url), 'utf8');

  expect(layout).toContain('<ConstellationBackground />');
  expect(component).toContain('prefers-reduced-motion');
  expect(component).toContain('visibilitychange');
  expect(component).toContain('devicePixelRatio');
  expect(component).toContain('const connectionDistance = () => 180');
  expect(component).toContain('* 0.26');
});

it('keeps the constellation and scanlines behind readable content', () => {
  const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'latin1');

  expect(css).toContain('.constellation-canvas,.scanlines{position:fixed;inset:0');
  expect(css).toContain('.scanlines{z-index:1');
  expect(css).toContain('rgba(0,255,127,.016)');
});

it('mounts a base-path-safe, user-controlled background music player', () => {
  const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
  const component = readFileSync(new URL('../src/components/MusicControl.astro', import.meta.url), 'utf8');

  expect(layout).toContain('<MusicControl src={sitePath(\'/audio/TimEm.mp3\')} />');
  expect(component).toContain('loop');
  expect(component).toContain('autoplay');
  expect(component).toContain('preload="metadata"');
  expect(component).toContain('localStorage');
  expect(component).toContain('Play background music');
  expect(component).toContain('Pause background music');
  expect(component).toContain('audio.volume = 0.25');
  expect(component).toContain("if (preference !== 'off') void play();");
});

it('does not override fixed controls while placing content above the canvas', () => {
  const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'latin1');

  expect(css).toContain('body>main,body>.site-footer{position:relative;z-index:2}');
  expect(css).not.toContain('body> :not(.constellation-canvas):not(.scanlines){position:relative;z-index:2}');
});
