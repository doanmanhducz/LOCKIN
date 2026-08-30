export type Severity = 'Critical' | 'High' | 'Moderate' | 'Low';

export type CveRecord = {
  cve: string;
  program: string;
  severity: Severity;
  score: number;
  date: string;
  writeup: string;
};

// Default order: oldest to newest (django-cms is older, listed first).
export const cveRecords: CveRecord[] = [
  { cve: 'CVE-2026-61663', program: 'django-cms', severity: 'Moderate', score: 4.3, date: '2026-08-10', writeup: 'cve-2026-61663-django-cms' },
  { cve: 'CVE-2026-61726', program: 'TandoorRecipes/recipes', severity: 'High', score: 8.1, date: '2026-08-20', writeup: 'cve-2026-61726-tandoor-recipes' }
];

export const severityRank: Record<Severity, number> = { Low: 1, Moderate: 2, High: 3, Critical: 4 };