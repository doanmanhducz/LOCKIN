import { expect, it } from 'vitest';
import { portfolio } from '../src/config/site';

it('keeps the six pinned repositories and the requested contact links', () => {
  expect(portfolio.projects).toHaveLength(6);
  expect(portfolio.contact.github).toBe('https://github.com/doanmanhducz');
  expect(portfolio.contact.linkedin).toBe('https://www.linkedin.com/in/doanduc1704/');
});
