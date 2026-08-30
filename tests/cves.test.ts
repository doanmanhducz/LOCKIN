import { expect, it } from 'vitest';
import { cveRecords, severityRank } from '../src/data/cves';

it('sorts CVE records oldest to newest by default', () => {
  const dates = cveRecords.map((record) => record.date);
  expect([...dates].sort()).toEqual(dates);
});

it('keeps the two expected CVE records with severity and write-up links', () => {
  expect(cveRecords).toHaveLength(2);
  expect(cveRecords.map((record) => record.cve)).toEqual(['CVE-2026-61663', 'CVE-2026-61726']);
  expect(cveRecords.every((record) => record.writeup.startsWith('cve-') && record.score > 0)).toBe(true);
});

it('ranks severity so Moderate < High < Critical', () => {
  expect(severityRank.Moderate).toBeLessThan(severityRank.High);
  expect(severityRank.High).toBeLessThan(severityRank.Critical);
});