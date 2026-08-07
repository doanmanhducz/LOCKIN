import { expect, it } from 'vitest';
import { navigation } from '../src/config/site';
import { sitePath } from '../src/lib/paths';

it('keeps the three approved primary pages', () => {
  expect(navigation.map((item) => item.href)).toEqual(['/about', '/research', '/hall-of-fame']);
});

it('prefixes internal paths with the GitHub Pages base', () => {
  expect(sitePath('/hall-of-fame')).toBe('/LOCKIN/hall-of-fame');
});
