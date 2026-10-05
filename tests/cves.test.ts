import { expect, it } from 'vitest';
import { cveRecords, cveNumber, severityRank } from '../src/data/cves';

it('keeps CVE records ordered oldest to newest by CVE number', () => {
  const numbers = cveRecords.map((record) => cveNumber(record.cve));
  expect([...numbers].sort((a, b) => a - b)).toEqual(numbers);
});

it('keeps published and pending records with valid severity scores', () => {
  expect(cveRecords).toHaveLength(22);
  expect(cveRecords.slice(0, 2).map((record) => record.cve)).toEqual(['CVE-2026-61663', 'CVE-2026-61726']);
  expect(cveRecords.every((record) => record.score > 0)).toBe(true);
  expect(cveRecords.filter((record) => record.cve === 'Pending')).toHaveLength(20);
  expect(cveRecords.filter((record) => record.program === 'TOTOLINK/A3700R').map(({ cve, severity, score }) => ({ cve, severity, score }))).toEqual([
    { cve: 'Pending', severity: 'Critical', score: 9.8 },
    { cve: 'Pending', severity: 'Critical', score: 9.8 },
    { cve: 'Pending', severity: 'High', score: 8.0 },
    { cve: 'Pending', severity: 'High', score: 8.1 },
    { cve: 'Pending', severity: 'High', score: 7.5 },
    { cve: 'Pending', severity: 'High', score: 7.2 },
    { cve: 'Pending', severity: 'High', score: 7.2 }
  ]);
  expect(cveRecords.filter((record) => record.program === 'OpenAEV-Platform/openaev').map(({ cve, severity, score }) => ({ cve, severity, score }))).toEqual([
    { cve: 'Pending', severity: 'High', score: 8.1 },
    { cve: 'Pending', severity: 'High', score: 8.1 },
    { cve: 'Pending', severity: 'High', score: 7.5 }
  ]);
  expect(cveRecords.filter((record) => record.program === 'nautobot')).toHaveLength(2);
  expect(cveRecords).toContainEqual({ cve: 'Pending', program: 'goauthentik/authentik', severity: 'High', score: 7.4, writeup: '' });
  expect(cveRecords.filter((record) => record.cve === 'Pending').every((record) => record.writeup === '')).toBe(true);
  expect(cveRecords.filter((record) => record.cve !== 'Pending')).toHaveLength(2);
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
