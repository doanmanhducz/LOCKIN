import { expect, it } from 'vitest';
import { site } from '../src/config/site';

it('points to the public CV asset', () => {
  expect(site.cvHref).toBe('/cv-placeholder.pdf');
});
