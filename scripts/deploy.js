#!/usr/bin/env node
// Deploys the current web build to the `gh-pages` branch of
// https://github.com/ryuto-ship-it/zekto-app so it serves at
// https://ryuto-ship-it.github.io/zekto-app/.
//
// The build itself (app export + landing page + .nojekyll) lives in
// build-dist.js, shared with .github/workflows/deploy.yml — that workflow
// runs this same build automatically on every push to main, so this script
// is only needed for a manual/local deploy. This script's own job is just
// the publish step: force-push dist/ as a fresh orphan gh-pages branch
// using your local git credentials.

const { execSync } = require('child_process');
const fs = require('fs');
const { buildDist, DIST_PATH } = require('./build-dist');

const REPO_URL = 'https://github.com/ryuto-ship-it/zekto-app.git';
const GIT_AUTHOR_NAME = 'Ryuto';
const GIT_AUTHOR_EMAIL = 'ryuto@zekto.co.kr';

function run(cmd, opts = {}) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', ...opts });
}

function main() {
  buildDist();

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
