export type Severity = 'Critical' | 'High' | 'Moderate' | 'Low';

export type CveRecord = {
  cve: string;
  program: string;
  severity: Severity;
  score: number;
  writeup: string;
};

// Ordered oldest to newest: a smaller CVE number was assigned earlier.
export const cveRecords: CveRecord[] = [
  { cve: 'CVE-2026-61663', program: 'django-cms', severity: 'Moderate', score: 4.3, writeup: 'cve-2026-61663-django-cms' },
  { cve: 'CVE-2026-61726', program: 'TandoorRecipes/recipes', severity: 'High', score: 8.1, writeup: 'cve-2026-61726-tandoor-recipes' },
  { cve: 'Pending', program: 'Baserow', severity: 'High', score: 8.6, writeup: '' },
  { cve: 'Pending', program: 'TryGhost/Ghost', severity: 'High', score: 8.1, writeup: '' },
  { cve: 'Pending', program: 'TryGhost/Ghost', severity: 'Moderate', score: 4.3, writeup: '' },
  { cve: 'Pending', program: 'TryGhost/Ghost', severity: 'Moderate', score: 4.3, writeup: '' },
  { cve: 'Pending', program: 'nautobot', severity: 'Moderate', score: 4.3, writeup: '' },
  { cve: 'Pending', program: 'grokability/snipe-it', severity: 'Moderate', score: 5.4, writeup: '' },
  { cve: 'Pending', program: 'django-cms', severity: 'Moderate', score: 4, writeup: '' }
];

export const severityRank: Record<Severity, number> = { Low: 1, Moderate: 2, High: 3, Critical: 4 };

// Numeric suffix of a CVE id; pending disclosures remain after published CVEs.
export function cveNumber(cve: string): number {
  const match = cve.match(/-(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}
