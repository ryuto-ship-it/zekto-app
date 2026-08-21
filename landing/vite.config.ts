import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served as a sub-path of the same GitHub Pages site the RN app lives on
// (see ../scripts/deploy.js and ../.github/workflows/deploy.yml, which build
// this project and copy its dist/ into the app's dist/landing/).
export default defineConfig({
  base: '/zekto-app/landing/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
