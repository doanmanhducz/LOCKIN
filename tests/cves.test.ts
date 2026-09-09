import { expect, it } from 'vitest';
import { cveRecords, cveNumber, severityRank } from '../src/data/cves';

it('keeps CVE records ordered oldest to newest by CVE number', () => {
  const numbers = cveRecords.map((record) => cveNumber(record.cve));
  expect([...numbers].sort((a, b) => a - b)).toEqual(numbers);
});

it('keeps published and pending records with valid severity scores', () => {
  expect(cveRecords).toHaveLength(9);
  expect(cveRecords.slice(0, 2).map((record) => record.cve)).toEqual(['CVE-2026-61663', 'CVE-2026-61726']);
  expect(cveRecords.every((record) => record.score > 0)).toBe(true);
  expect(cveRecords.filter((record) => record.cve === 'Pending')).toHaveLength(7);
  expect(cveRecords.filter((record) => record.cve === 'Pending').every((record) => record.writeup === '')).toBe(true);
});

it('parses the numeric part of a CVE id for ordering', () => {
  expect(cveNumber('CVE-2026-61663')).toBe(61663);
  expect(cveNumber('CVE-2026-61726')).toBe(61726);
  expect(cveNumber('Pending')).toBe(Number.MAX_SAFE_INTEGER);
});

it('ranks severity so Moderate < High < Critical', () => {
  expect(severityRank.Moderate).toBeLessThan(severityRank.High);
  expect(severityRank.High).toBeLessThan(severityRank.Critical);
});
