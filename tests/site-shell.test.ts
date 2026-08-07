import { expect, it } from 'vitest';
import { navigation } from '../src/config/site';

it('keeps the three approved primary pages', () => {
  expect(navigation.map((item) => item.href)).toEqual(['/about', '/research', '/hall-of-fame']);
});
