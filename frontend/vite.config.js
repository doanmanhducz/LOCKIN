import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const backendProxy = process.env.VITE_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': backendProxy,
    },
  },
});
