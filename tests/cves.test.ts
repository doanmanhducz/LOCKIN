import { expect, it } from 'vitest';
import { cveRecords, cveNumber, severityRank, compareCves, type CveRecord } from '../src/data/cves';

it('keeps CVE records ordered oldest to newest by CVE number', () => {
  const numbers = cveRecords.map((record) => cveNumber(record.cve));
  expect([...numbers].sort((a, b) => a - b)).toEqual(numbers);
});

it('keeps published and pending records with valid severity scores', () => {
  expect(cveRecords).toHaveLength(15);
  expect(cveRecords.slice(0, 4).map((record) => record.cve)).toEqual(['CVE-2026-61663', 'CVE-2026-61726', 'CVE-2026-94612', 'CVE-2026-105679']);
  expect(cveRecords.every((record) => record.score > 0)).toBe(true);
  expect(cveRecords.filter((record) => record.cve === 'Pending')).toHaveLength(11);
  expect(cveRecords.every((record) => !record.program.toLowerCase().includes('totolink'))).toBe(true);
  const pendingWithAdvisories = cveRecords.filter((record) => record.advisoryUrl);
  expect(pendingWithAdvisories).toHaveLength(11);
  expect(pendingWithAdvisories.every((record) => record.cve === 'Pending')).toBe(true);
  expect(pendingWithAdvisories.every((record) => record.advisoryUrl?.startsWith('https://github.com/'))).toBe(true);
  expect(cveRecords.filter((record) => record.program === 'OpenAEV-Platform/openaev').map(({ cve, severity, score }) => ({ cve, severity, score }))).toEqual([
    { cve: 'Pending', severity: 'High', score: 8.1 },
    { cve: 'Pending', severity: 'High', score: 8.1 },
    { cve: 'Pending', severity: 'High', score: 7.5 }
  ]);
  expect(cveRecords.filter((record) => record.program === 'nautobot')).toHaveLength(2);
  expect(cveRecords).toContainEqual({ cve: 'CVE-2026-94612', program: 'goauthentik/authentik', severity: 'High', score: 7.4, writeup: '' });
  expect(cveRecords.filter((record) => record.cve === 'Pending').every((record) => record.writeup === '')).toBe(true);
  expect(cveRecords.filter((record) => record.cve !== 'Pending')).toHaveLength(4);
  expect(cveRecords.filter((record) => record.program === 'TryGhost/Ghost' && record.score === 7.3).map((record) => record.cve)).toEqual(['CVE-2026-105679']);
  expect(cveRecords.filter((record) => record.program === 'TryGhost/Ghost' && record.score === 4.3 && record.advisoryUrl)).toHaveLength(2);
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

it('keeps assigned CVEs first in either ID direction and pending severity/scores descending', () => {
  for (const ascending of [true, false]) {
    const sorted = [...cveRecords].sort((a, b) => compareCves(a, b, ascending));
    const assigned = sorted.slice(0, 4).map((r) => r.cve);
    expect(assigned).toEqual(ascending ? ['CVE-2026-61663', 'CVE-2026-61726', 'CVE-2026-94612', 'CVE-2026-105679'] : ['CVE-2026-105679', 'CVE-2026-94612', 'CVE-2026-61726', 'CVE-2026-61663']);
    const pending = sorted.slice(4);
    expect(pending.every((r) => r.cve === 'Pending')).toBe(true);
    for (let i = 1; i < pending.length; i++) {
      expect(severityRank[pending[i - 1].severity]).toBeGreaterThanOrEqual(severityRank[pending[i].severity]);
      if (pending[i - 1].severity === pending[i].severity) expect(pending[i - 1].score).toBeGreaterThanOrEqual(pending[i].score);
    }
  }
});

it('uses severity before score for pending records and preserves equal-risk ties', () => {
  const records: CveRecord[] = [
    { cve: 'Pending', program: 'first high', severity: 'High', score: 8.1, writeup: '' },
    { cve: 'Pending', program: 'critical', severity: 'Critical', score: 8.0, writeup: '' },
    { cve: 'Pending', program: 'second high', severity: 'High', score: 8.1, writeup: '' }
  ];
  expect(records.sort(compareCves).map((r) => r.program)).toEqual(['critical', 'first high', 'second high']);
});
