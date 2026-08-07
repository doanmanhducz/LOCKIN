export type AchievementKind = 'paper' | 'cve' | 'certification' | 'acknowledgement' | 'career';
export type Achievement = { kind: AchievementKind; title: string; date: string; organization: string; summary: string; url?: string };

export const achievements: Achievement[] = [
  { kind: 'paper', title: 'Conference paper placeholder', date: '2026', organization: 'Conference', summary: 'Replace with a published paper and conference link.' },
  { kind: 'cve', title: 'CVE-YYYY-NNNN', date: '2026', organization: 'Vendor', summary: 'Replace with a public vulnerability record.' },
  { kind: 'certification', title: 'Certification placeholder', date: '2025', organization: 'Issuer', summary: 'Replace with a credential.' },
  { kind: 'acknowledgement', title: 'Bounty acknowledgement placeholder', date: '2025', organization: 'Program', summary: 'Replace with a public acknowledgement.' },
  { kind: 'career', title: 'Career milestone placeholder', date: '2024', organization: 'Team', summary: 'Replace with a meaningful career step.' }
];
