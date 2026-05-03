/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lockin: {
          bg: '#1F1F1F',
          panel: '#262626',
          panelAlt: '#2E2E2E',
          accent: '#1ABC9C',
          accentSoft: '#2DD4BF',
          text: '#FFFFFF',
          muted: '#A3A3A3',
          line: '#3A3A3A',
          danger: '#F87171',
          warning: '#FBBF24',
          success: '#34D399',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(26, 188, 156, 0.16), 0 24px 60px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'lockin-radial': 'radial-gradient(circle at top left, rgba(26, 188, 156, 0.18), transparent 35%), radial-gradient(circle at top right, rgba(45, 212, 191, 0.12), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 25%)',
      },
    },
  },
  plugins: [],
};
