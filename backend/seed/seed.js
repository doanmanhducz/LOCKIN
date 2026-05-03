import { db, initializeDatabase } from '../config/database.js';
import {
    createBlog,
    createGymSession,
    createMeal,
    createPomodoroSession,
    createTodo,
    getPomodoroSettings,
    upsertPomodoroSettings,
    upsertPortfolio
} from '../models/repositories.js';

initializeDatabase();

const portfolioSeed = {
  name: 'Doan Manh Duc',
  objective: 'Aspiring Red Team operator with hands-on penetration testing experience, aiming to advance from pentester to Red Team roles to execute adversary emulations and strengthen security posture.',
  bio: 'Cybersecurity-focused builder who works across penetration testing, attack surface management, offensive tooling, and security research.',
  education: 'Bachelor of Information Security, University of Information Technology - VNUHCM, Sep 2022 – Present.',
  skills: [
    'OWASP Top 10',
    'MITRE ATT&CK',
    'Cryptography',
    'Steganography',
    'Security Protocols',
    'Network Security',
    'SSDLC',
    'BurpSuite',
    'Metasploit',
    'Nmap',
    'Wireshark',
    'Hydra',
    'Apktool',
    'gdb',
    'Gobuster',
    'Nikto',
    'Python',
    'C++',
    'C#',
    'JavaScript',
    'Penetration Testing',
  ],
  experience: [
    'NAB Innovation Centre Vietnam, StarCamp Batch 18 - Attack Surface Management, Ho Chi Minh City, 11/2025 – Present: completed internal CISSP training and triaged Bugcrowd submissions while developing ASM tooling for asset discovery, reconnaissance, and scanning workflows.',
    'Lien Phat Technology Corporation, Intern Penetration Testing, Ho Chi Minh City, 08/2025 – 10/2025: researched vulnerabilities, built reconnaissance and automation tools, investigated 0-day issues, and produced remediation reports.',
    'Information Security Laboratory (INSECLAB), Member of TeamQ - Researcher, Ho Chi Minh City, 2023 – Present: developed phishing detection websites and ML models, contributed to research, and competed in CTFs and cybersecurity events.',
  ],
  projects: [
    'Phishing Website Detection via Multimodal Learning and Retrieval-Augmented Reasoning: multimodal phishing detection framework using URLs, structured features, HTML, and selective cross-attention fusion with RAG.',
    'Website Malware & Ransomware Detection using Machine Learning: Android ransomware detection from APK static features with a web tool for malware analysis.',
    'Apollon: Robust IDS against Adversarial Machine Learning Attacks: adaptive intrusion detection using MAB-based classifier selection and GAN-based adversarial traffic generation.',
  ],
  publications: [
    'PhishFusion: A Multimodal Phishing Detection Framework using Joint URL and JavaScript Feature, 2026 International Conference on Applied Cryptography and Network Security, December 2025.',
    'Phishing Website Detection via Multimodal Learning and Retrieval-Augmented Reasoning, 2025 RIVF International Conference on Computing and Communication Technologies, December 2025.',
  ],
  github: 'https://github.com/doanmanhducz',
  linkedin: 'https://www.linkedin.com/in/doanduc1704/',
  email: 'doanmanhduc1704@gmail.com',
};

const now = new Date().toISOString();

function seedIfEmpty() {
  upsertPortfolio(portfolioSeed);

  if (!getPomodoroSettings()) {
    upsertPomodoroSettings({
      workMinutes: 25,
      shortBreakMinutes: 5,
      longBreakMinutes: 20,
      longBreakInterval: 4,
    });
  }
}

function seedCollections() {
  const blogCount = db.prepare('SELECT COUNT(*) AS count FROM blogs').get().count;
  const todoCount = db.prepare('SELECT COUNT(*) AS count FROM todos').get().count;
  const mealCount = db.prepare('SELECT COUNT(*) AS count FROM meals').get().count;
  const gymCount = db.prepare('SELECT COUNT(*) AS count FROM gym_sessions').get().count;
  const pomodoroCount = db.prepare('SELECT COUNT(*) AS count FROM pomodoro_sessions').get().count;

  if (blogCount === 0) {
    createBlog({
      title: 'Building the LOCKIN system',
      content: 'LOCKIN is a personal operating system that combines focus, reflection, and action into a single daily workflow.',
      tags: ['productivity', 'build-in-public'],
    });
  }

  if (todoCount === 0) {
    [
      {
        title: 'Review weekly goals',
        description: 'Look at the current week and realign tasks with the top priorities.',
        dueDate: now,
        status: 'in-progress',
        priority: 'high',
      },
      {
        title: 'Write growth journal entry',
        description: 'Document one lesson learned from today.',
        dueDate: now,
        status: 'todo',
        priority: 'medium',
      },
      {
        title: 'Complete focus session',
        description: 'Run a 25-minute Pomodoro and record the result.',
        dueDate: now,
        status: 'done',
        priority: 'high',
      },
    ].forEach((item) => createTodo(item));
  }

  if (mealCount === 0) {
    [
      { name: 'Oatmeal breakfast', calories: 320, consumedAt: now, notes: 'Protein topped' },
      { name: 'Chicken rice bowl', calories: 610, consumedAt: now, notes: 'Post-workout lunch' },
    ].forEach((item) => createMeal(item));
  }

  if (gymCount === 0) {
    [
      { exerciseType: 'Push day', sets: 4, reps: 10, caloriesBurned: 260, performedAt: now, notes: 'Bench and shoulders' },
      { exerciseType: 'Cardio', sets: 1, reps: 1, caloriesBurned: 180, performedAt: now, notes: 'Bike intervals' },
    ].forEach((item) => createGymSession(item));
  }

  if (pomodoroCount === 0) {
    [
      { sessionType: 'focus', durationMinutes: 25, completed: true, startedAt: now, endedAt: now, notes: 'Planning' },
      { sessionType: 'short-break', durationMinutes: 5, completed: true, startedAt: now, endedAt: now, notes: 'Reset' },
    ].forEach((item) => createPomodoroSession(item));
  }
}

seedIfEmpty();
seedCollections();

if (import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  console.log('LOCKIN seed completed');
}
