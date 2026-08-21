#!/usr/bin/env node
// Builds dist/ (the RN Expo web export) plus dist/landing/ (the marketing
// landing page, a separate Vite project under landing/) with the GitHub
// Pages base path baked in. Shared by scripts/deploy.js (manual local
// deploy) and .github/workflows/deploy.yml (automatic deploy on push to
// main) so both produce identical output.

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APP_JSON_PATH = path.join(ROOT, 'app.json');
const DIST_PATH = path.join(ROOT, 'dist');
const LANDING_PATH = path.join(ROOT, 'landing');
const LANDING_DIST_PATH = path.join(LANDING_PATH, 'dist');
const BASE_URL = '/zekto-app';

function run(cmd, opts = {}) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: ROOT, ...opts });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function buildDist() {
  const appJsonRaw = fs.readFileSync(APP_JSON_PATH, 'utf8');

  try {
    const appJson = JSON.parse(appJsonRaw);
    appJson.expo.experiments = { ...(appJson.expo.experiments || {}), baseUrl: BASE_URL };
    fs.writeFileSync(APP_JSON_PATH, JSON.stringify(appJson, null, 2) + '\n');

    if (fs.existsSync(DIST_PATH)) fs.rmSync(DIST_PATH, { recursive: true, force: true });
    run('npx expo export -p web');
  } finally {
    // Restore byte-for-byte so the temporary baseUrl never gets committed.
    fs.writeFileSync(APP_JSON_PATH, appJsonRaw);
  }

  run('npm install', { cwd: LANDING_PATH });
  run('npm run build', { cwd: LANDING_PATH });
  copyDir(LANDING_DIST_PATH, path.join(DIST_PATH, 'landing'));

  // GitHub Pages runs Jekyll by default, which silently drops the _expo/
  // asset folder without this.
  fs.writeFileSync(path.join(DIST_PATH, '.nojekyll'), '');

  console.log(`\nBuilt: ${DIST_PATH}`);
}

if (require.main === module) {
  buildDist();
}

module.exports = { buildDist, DIST_PATH, ROOT };
