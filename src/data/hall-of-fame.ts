export type AchievementKind = 'paper' | 'cve' | 'certification' | 'acknowledgement' | 'career';
export type Achievement = { kind: AchievementKind; title: string; date: string; organization: string; summary: string; url?: string };

export const achievements: Achievement[] = [
  { kind: 'career', title: 'Attack Surface Management', date: '2025 - Present', organization: 'NAB Innovation Centre Vietnam', summary: 'Developing asset discovery, reconnaissance, scanning, and AI-assisted workflows for bug hunting and CVE research.' },
  { kind: 'career', title: 'Intern Penetration Testing', date: 'Aug 2025 - Oct 2025', organization: 'Lien Phat Technology Corporation', summary: 'Researched one-day vulnerabilities, built recon and scanning automation, and prepared remediation reports.' },
  { kind: 'career', title: 'TeamQ Researcher', date: '2023 - Present', organization: 'Information Security Laboratory (INSECLAB)', summary: 'Researching software security and LLM-based cybersecurity applications; contributing to international publications.' }
];
