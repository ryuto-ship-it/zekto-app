#!/usr/bin/env node
// Deploys the current web build to the `gh-pages` branch of
// https://github.com/ryuto-ship-it/zekto-app so it serves at
// https://ryuto-ship-it.github.io/zekto-app/.
//
// This mirrors the manual process used all session: temporarily set
// experiments.baseUrl so asset paths resolve under the /zekto-app/ subpath,
// export, restore app.json, add .nojekyll (GitHub Pages runs Jekyll by
// default, which silently drops the _expo/ asset folder without it), then
// force-push dist/ as a fresh orphan gh-pages branch.

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APP_JSON_PATH = path.join(ROOT, 'app.json');
const DIST_PATH = path.join(ROOT, 'dist');
const REPO_URL = 'https://github.com/ryuto-ship-it/zekto-app.git';
const BASE_URL = '/zekto-app';
const GIT_AUTHOR_NAME = 'Ryuto';
const GIT_AUTHOR_EMAIL = 'ryuto@zekto.co.kr';

function run(cmd, opts = {}) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: ROOT, ...opts });
}

function main() {
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

  fs.writeFileSync(path.join(DIST_PATH, '.nojekyll'), '');

  const distOpts = { cwd: DIST_PATH };
  run('git init -q', distOpts);
  run('git checkout -b gh-pages -q', distOpts);
  run('git add -A', distOpts);
  run(
    `git -c user.name="${GIT_AUTHOR_NAME}" -c user.email="${GIT_AUTHOR_EMAIL}" commit -q -m "Deploy: ${new Date().toISOString()}"`,
    distOpts
  );
  run(`git remote add origin ${REPO_URL}`, distOpts);
  run('git push -f origin gh-pages', distOpts);

  fs.rmSync(DIST_PATH, { recursive: true, force: true });

  console.log('\nDeployed: https://ryuto-ship-it.github.io/zekto-app/');
}

main();
