import { expect, it } from 'vitest';
import { navigation } from '../src/config/site';
import { site } from '../src/config/site';
import { sitePath } from '../src/lib/paths';

it('keeps the primary navigation on one accessible page', () => {
  expect(navigation.map((item) => item.href)).toEqual([
    '#home', '#skills', '#certifications', '#projects', '/writeups', '/blog', '#contact'
  ]);
});

it('prefixes internal paths with the GitHub Pages base', () => {
  expect(sitePath('/hall-of-fame')).toBe('/LOCKIN/hall-of-fame');
});

it('exposes a terminal identity label for the shared shell', () => {
  expect(site.terminalIdentity).toBe('doandokja@portfolio:~$');
});
