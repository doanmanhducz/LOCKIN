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
  { cve: 'CVE-2026-61726', program: 'TandoorRecipes/recipes', severity: 'High', score: 8.1, writeup: 'cve-2026-61726-tandoor-recipes' }
];

export const severityRank: Record<Severity, number> = { Low: 1, Moderate: 2, High: 3, Critical: 4 };

// Numeric suffix of a CVE id, e.g. CVE-2026-61663 -> 61663. Smaller means older.
export function cveNumber(cve: string): number {
  const match = cve.match(/-(\d+)$/);
  return match ? Number(match[1]) : 0;
}