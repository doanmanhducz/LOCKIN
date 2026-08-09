export const site = {
  name: 'Your Name',
  nickname: 'Alias',
  terminalIdentity: 'yourname@portfolio:~$',
  summary: 'Security researcher. Builder. Curious by default.',
  cvHref: null,
  socialLinks: [{ label: 'Email', href: 'mailto:hello@example.com' }],
  giscus: null
} as const;

export const portfolioNavigation = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Write-Ups', href: '/writeups' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' }
] as const;

// Keep repeatable profile content in one place so replacing placeholders is painless.
export const portfolio = {
  roles: 'Security Researcher / Offensive Security / Builder',
  introduction: 'I investigate where systems bend, write down what matters, and build quieter ways to make them safer.',
  skillGroups: [
    { title: 'Offensive Research', items: ['Web application security', 'Attack surface mapping', 'Vulnerability validation', 'Responsible disclosure'] },
    { title: 'Applied Security', items: ['Threat modeling', 'Secure architecture review', 'Cloud security posture', 'Detection engineering'] },
    { title: 'Research Toolkit', items: ['Python & automation', 'Protocol analysis', 'LLM security', 'Technical writing'] }
  ],
  certifications: [
    { id: 'cert-foundations', category: 'Security Foundations', title: 'Security Research Foundations', issuer: 'Placeholder Institute', description: 'A sample credential card. Replace its title, issuer, and full-image link from this config.', tone: 'matrix' },
    { id: 'cert-web', category: 'Offensive Practice', title: 'Web Exploitation Practice', issuer: 'Placeholder Academy', description: 'A sample badge for practical web security work.', tone: 'signal' },
    { id: 'cert-cloud', category: 'Security Foundations', title: 'Cloud Security Essentials', issuer: 'Placeholder Institute', description: 'A sample badge for cloud and infrastructure research.', tone: 'grid' },
    { id: 'cert-analysis', category: 'Offensive Practice', title: 'Adversarial Analysis', issuer: 'Placeholder Academy', description: 'A sample credential for research methodology.', tone: 'terminal' }
  ],
  projects: [
    { title: 'Surface Ledger', description: 'A concise attack-surface inventory workflow for keeping complex targets legible.', tags: ['automation', 'recon'] },
    { title: 'Signal Triage', description: 'A research notebook pattern that separates useful security signals from scanner noise.', tags: ['analysis', 'tooling'] },
    { title: 'Model Boundary Tests', description: 'Small reproducible checks for studying trust boundaries in AI-enabled systems.', tags: ['AI security', 'research'] }
  ],
  writeUps: [
    { title: 'Tracing the Thin Edge of Authentication', type: 'Case note', excerpt: 'A placeholder field note on following authorization decisions through a noisy stack.' },
    { title: 'When a Finding Is Not Yet a Finding', type: 'Research note', excerpt: 'A short argument for evidence, reproduction, and knowing when to stop.' },
    { title: 'Attack Surface as a Living Map', type: 'Method', excerpt: 'A placeholder walkthrough of the questions that keep reconnaissance grounded.' }
  ],
  blog: [
    { date: '2026.08.09', title: 'The Work Before the Report', excerpt: 'Research begins before the payload: with attention, context, and a refusal to confuse motion with progress.' },
    { date: '2026.07.22', title: 'Notes on Quiet Systems', excerpt: 'The most interesting behavior often lives in the places that dashboards do not name.' }
  ],
  contact: { email: 'mailto:hello@example.com', label: 'hello@example.com', location: 'Remote / GMT+7', availability: 'Open to meaningful research' }
} as const;

// Kept for legacy routes while the homepage now owns the primary navigation.
export const navigation = portfolioNavigation;
