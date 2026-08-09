import { expect, it } from 'vitest';
import { portfolio, portfolioNavigation } from '../src/config/site';

it('defines the approved one-page navigation in visual order', () => {
  expect(portfolioNavigation.map((item) => item.href)).toEqual([
    '#home',
    '#skills',
    '#certifications',
    '#projects',
    '/writeups',
    '/blog',
    '#contact'
  ]);
});

it('keeps modal-ready certificates and a direct contact action in site data', () => {
  expect(portfolio.certifications).toHaveLength(4);
  expect(portfolio.contact.email).toMatch(/^mailto:/);
});
