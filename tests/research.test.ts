import { describe, expect, it } from 'vitest';
import { filterResearchEntries, getRelatedResearch } from '../src/lib/research';

const entries = [
  { slug: 'a', data: { type: 'CVE Analysis', tags: ['web', 'auth'], publishedAt: new Date('2026-07-01') } },
  { slug: 'b', data: { type: 'Paper Notes', tags: ['web'], publishedAt: new Date('2026-05-01') } },
  { slug: 'c', data: { type: 'Disclosure', tags: ['cloud'], publishedAt: new Date('2026-03-01') } }
] as any[];

describe('research helpers', () => {
  it('filters by type and tag', () => {
    expect(filterResearchEntries(entries, 'CVE Analysis', 'web').map((entry) => entry.slug)).toEqual(['a']);
  });

  it('ranks shared tags and excludes the current entry', () => {
    expect(getRelatedResearch(entries, 'a', 2).map((entry) => entry.slug)).toEqual(['b']);
  });
});
