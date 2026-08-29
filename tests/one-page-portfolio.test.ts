import { expect, it } from 'vitest';
import { portfolio, portfolioNavigation } from '../src/config/site';

it('defines the approved one-page navigation in visual order', () => {
  expect(portfolioNavigation.map((item) => item.href)).toEqual([
    '#home',
    '#skills',
    '#research',
    '#certifications',
    '#projects',
    '/writeups',
    '/blog',
    '#contact'
  ]);
});

it('keeps credentials empty until real certificates are added and exposes contact', () => {
  expect(portfolio.achievements).toHaveLength(3);
  expect(portfolio.contact.email).toMatch(/^mailto:/);
});
