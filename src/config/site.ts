export const site = {
  name: 'Doan Manh Duc',
  nickname: 'dokjadoan',
  terminalIdentity: 'dokjadoan@portfolio:~$',
  summary: 'Security researcher. Builder. Curious by default.',
  cvHref: null,
  socialLinks: [{ label: 'Email', href: 'mailto:doandokja@gmail.com' }],
  giscus: null
} as const;

export const portfolioNavigation = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Write-Ups', href: '/writeups' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' }
] as const;

// Keep repeatable profile content in one place so replacing placeholders is painless.
export const portfolio = {
  roles: 'ASM / Pentest / Security Researcher',
  introduction: 'Vibe Hacker',
  skillGroups: [
    { title: 'Programming Languages', items: ['Python', 'C/C++'] },
    { title: 'Technical Skills', items: ['Web Development', 'Offensive Security', 'AI Security Research'] },
    { title: 'Others', items: ['Fluent in English and Vietnamese', 'Knows Korean and Chinese curse words'] }
  ],
  achievements: ['Leader, ChapBaiSlayer CTF Team — peak Top 10 Vietnam', 'Top 20 — Hack The Box: Project Nightfall 2026 CTF', 'Top 13 — Hack The Box: The Salt Crown 2026 CTF'],
  projects: [
    { title: 'Eureka2024_Web', description: 'An ecosystem for combating online fraud, including Voice Phishing, Mail Phishing, Phone Number Phishing, and other anti-fraud utilities.', language: 'HTML', url: 'https://github.com/doanmanhducz/Eureka2024_Web' },
    { title: 'YDCC', description: 'YDCC 2024 — a cybersecurity hackathon project and the foundational idea for an anti-fraud ecosystem website integrating AI in fraud prevention.', language: 'HTML', url: 'https://github.com/doanmanhducz/YDCC' },
    { title: 'Cryptography_CP-ABE', description: 'Encryption, access control, and queries on cloud data for real-estate transactions.', language: 'Python', url: 'https://github.com/doanmanhducz/Cryptography_CP-ABE' },
    { title: 'Steganography', description: 'Implementing steganography in text, image, audio, and video using LSB, phase coding, and spread-spectrum algorithms.', language: 'Jupyter Notebook', url: 'https://github.com/doanmanhducz/Steganography' },
    { title: 'Website_Malware_Detection', description: 'A machine-learning-based system for detecting malware on websites to enhance web security.', language: 'Python', url: 'https://github.com/doanmanhducz/Website_Malware_Detection' },
    { title: 'Apollon_MAB_IDS', description: 'An adversarial-resilient intrusion-detection system using multi-armed bandits with dynamic classifier selection.', language: 'Jupyter Notebook', url: 'https://github.com/doanmanhducz/Apollon_MAB_IDS' }
  ],
  publications: [
    { venue: 'ACIIDS 2026', title: 'PhishFusion: A Multimodal Phishing Detection Framework Using Joint URL and JavaScript Features', description: 'A multimodal phishing detection framework combining raw URLs, structured URL features, and JavaScript code.', url: 'https://link.springer.com/chapter/10.1007/978-981-92-0263-8_39', linkLabel: 'Read on Springer' },
    { venue: 'RIVF 2025', title: 'Phishing Website Detection via Multimodal Learning and Retrieval-Augmented Reasoning', description: 'Research on multimodal phishing detection with retrieval-augmented reasoning.', url: 'https://ieeexplore.ieee.org/document/11365186', linkLabel: 'Read on IEEE Xplore' }
  ],
  writeUps: [
    { title: 'CVE-2026-61663 — django-cms', type: 'CVE write-up', excerpt: 'A security write-up for CVE-2026-61663 in django-cms.' },
    { title: 'CVE-2026-61726 — TandoorRecipes/recipes', type: 'CVE write-up', excerpt: 'A security write-up for CVE-2026-61726 in TandoorRecipes/recipes.' }
  ],
  blog: [
    { date: '2026.08.09', title: 'The Work Before the Report', excerpt: 'Research begins before the payload: with attention, context, and a refusal to confuse motion with progress.' },
    { date: '2026.07.22', title: 'Notes on Quiet Systems', excerpt: 'The most interesting behavior often lives in the places that dashboards do not name.' }
  ],
  contact: { email: 'mailto:doandokja@gmail.com', label: 'doandokja@gmail.com', github: 'https://github.com/doanmanhducz', githubLabel: 'github.com/doanmanhducz', linkedin: 'https://www.linkedin.com/in/doanduc1704/', linkedinLabel: 'linkedin.com/in/doanduc1704' }
} as const;

// Kept for legacy routes while the homepage now owns the primary navigation.
export const navigation = portfolioNavigation;
