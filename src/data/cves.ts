export type Severity = 'Critical' | 'High' | 'Moderate' | 'Low';

export type CveRecord = {
  cve: string;
  program: string;
  severity: Severity;
  score?: number;
  writeup: string;
  advisoryUrl?: string;
};

// Ordered oldest to newest: a smaller CVE number was assigned earlier.
export const cveRecords: CveRecord[] = [
  { cve: 'CVE-2026-61663', program: 'django-cms', severity: 'Moderate', score: 4.3, writeup: 'cve-2026-61663-django-cms' },
  { cve: 'CVE-2026-61726', program: 'TandoorRecipes/recipes', severity: 'High', score: 8.1, writeup: 'cve-2026-61726-tandoor-recipes' },
  { cve: 'CVE-2026-94612', program: 'goauthentik/authentik', severity: 'High', score: 7.4, writeup: '' },
  { cve: 'CVE-2026-105679', program: 'TryGhost/Ghost', severity: 'High', score: 7.3, writeup: '' },
  { cve: 'Pending', program: 'Baserow', severity: 'High', score: 8.6, writeup: '', advisoryUrl: 'https://github.com/baserow/baserow/security/advisories/GHSA-r4rf-mcfj-8vm8' },
  { cve: 'Pending', program: 'TryGhost/Ghost', severity: 'High', score: 8.1, writeup: '', advisoryUrl: 'https://github.com/TryGhost/Ghost/security/advisories/GHSA-q55r-w7fh-rmh6' },
  { cve: 'Pending', program: 'TryGhost/Ghost', severity: 'Moderate', score: 4.3, writeup: '', advisoryUrl: 'https://github.com/TryGhost/Ghost/security/advisories/GHSA-vm82-r49m-224q' },
  { cve: 'Pending', program: 'TryGhost/Ghost', severity: 'Moderate', score: 4.3, writeup: '', advisoryUrl: 'https://github.com/TryGhost/Ghost/security/advisories/GHSA-xcgh-2828-cvmx' },
  { cve: 'Pending', program: 'nautobot', severity: 'Moderate', score: 4.3, writeup: '', advisoryUrl: 'https://github.com/nautobot/nautobot/security/advisories/GHSA-x69f-q4wj-vx72' },
  { cve: 'Pending', program: 'nautobot', severity: 'Moderate', score: 4.3, writeup: '', advisoryUrl: 'https://github.com/nautobot/nautobot/security/advisories/GHSA-m6h7-g92h-9p44' },
  { cve: 'Pending', program: 'grokability/snipe-it', severity: 'Moderate', score: 5.4, writeup: '', advisoryUrl: 'https://github.com/grokability/snipe-it/security/advisories/GHSA-r5q4-mrrm-f59q' },
  { cve: 'Pending', program: 'django-cms', severity: 'Moderate', score: 4.3, writeup: '', advisoryUrl: 'https://github.com/django-cms/django-cms/security/advisories/GHSA-ppqv-h89f-6q9p' },
  { cve: 'Pending', program: 'OpenAEV-Platform/openaev', severity: 'High', score: 8.1, writeup: '', advisoryUrl: 'https://github.com/OpenAEV-Platform/openaev/security/advisories/GHSA-vvh4-p7p3-3p38' },
  { cve: 'Pending', program: 'OpenAEV-Platform/openaev', severity: 'High', score: 8.1, writeup: '', advisoryUrl: 'https://github.com/OpenAEV-Platform/openaev/security/advisories/GHSA-xhcc-mv5c-pch4' },
  { cve: 'Pending', program: 'OpenAEV-Platform/openaev', severity: 'High', score: 7.5, writeup: '', advisoryUrl: 'https://github.com/OpenAEV-Platform/openaev/security/advisories/GHSA-8vff-jf86-v9pp' },
  { cve: 'Pending', program: 'craftcms', severity: 'Low', writeup: '', advisoryUrl: 'https://github.com/craftcms/cms/security/advisories/GHSA-w5rh-mhxj-wr8r' },
  { cve: 'Pending', program: 'nocodb', severity: 'High', score: 7.1, writeup: '', advisoryUrl: 'https://github.com/nocodb/nocodb/security/advisories/GHSA-hm8p-622v-9c6j' },
  { cve: 'Pending', program: 'TandoorRecipes/recipes', severity: 'Moderate', score: 5.4, writeup: '', advisoryUrl: 'https://github.com/TandoorRecipes/recipes/security/advisories/GHSA-5p9v-743w-79h3#event-1213988' },
];

export const severityRank: Record<Severity, number> = { Low: 1, Moderate: 2, High: 3, Critical: 4 };

// Numeric suffix of a CVE id; pending disclosures remain after published CVEs.
export function cveNumber(cve: string): number {
  const match = cve.match(/-(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

// Assigned IDs always lead; changing their direction does not reverse pending risk order.
export function compareCves(a: Pick<CveRecord, 'cve' | 'severity' | 'score'>, b: Pick<CveRecord, 'cve' | 'severity' | 'score'>, ascending = true): number {
  const aAssigned = a.cve !== 'Pending';
  const bAssigned = b.cve !== 'Pending';
  if (aAssigned !== bAssigned) return aAssigned ? -1 : 1;
  if (aAssigned) return (cveNumber(a.cve) - cveNumber(b.cve)) * (ascending ? 1 : -1);
  return severityRank[b.severity] - severityRank[a.severity] || (b.score ?? 0) - (a.score ?? 0);
}
