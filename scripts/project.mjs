import { spawnSync } from 'node:child_process';
import { readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { resolveBun } from './runtime.mjs';

export const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const commands = new Set(['setup', 'dev', 'check', 'verify']);

// Keep processes attached to their caller and keep dependencies local to this checkout.
export function runProject(command, {
  root = projectRoot,
  bun = resolveBun(),
  node = process.execPath,
  env = process.env,
  spawn = spawnSync,
  report = (message) => console.error(message),
} = {}) {
  if (!commands.has(command)) {
    report('usage: node scripts/project.mjs <setup|dev|check|verify>');
    return 2;
  }

  const { packageManager } = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
  const match = /^bun@(\d+\.\d+\.\d+)$/.exec(packageManager ?? '');
  if (!match) {
    report('package.json must pin packageManager to an exact Bun version.');
    return 1;
  }
  const childEnv = {
    ...env,
    PATH: path.isAbsolute(bun)
      ? `${path.dirname(bun)}${path.delimiter}${env.PATH ?? ''}`
      : env.PATH,
  };
  const execute = (executable, args, capture = false, extraEnv = {}) => {
    const result = spawn(executable, args, {
      cwd: root,
      env: { ...childEnv, ...extraEnv },
      stdio: capture ? 'pipe' : 'inherit',
      encoding: 'utf8',
    });
    if (result.error) {
      const missing = result.error.code === 'ENOENT';
      report(missing
        ? `Cannot find ${executable}. Install the required runtime, then rerun this command. Bun ${match[1]} is required; setup does not download runtimes.`
        : `Cannot run ${executable}: ${result.error.message}`);
    } else if (result.signal) {
      report(`${path.basename(executable)} stopped by ${result.signal}.`);
    }
    return { ...result, code: result.status ?? 1 };
  };

  const version = execute(bun, ['--version'], true);
  if (version.code !== 0) return version.code;
  if (version.stdout.trim() !== match[1]) {
    report(`Bun ${match[1]} is required by package.json; found ${version.stdout.trim()}. Select the pinned version and rerun.`);
    return 1;
  }

  let steps;
  switch (command) {
    case 'setup':
      steps = [
        [bun, ['install', '--frozen-lockfile']],
        [node, [path.join(root, 'node_modules/playwright/cli.js'), 'install', 'chromium']],
      ];
      break;
    case 'dev':
      // Astro preserves port 0 through Vite to HTTP listen, which asks the OS for a free port.
      steps = [[bun, ['run', 'dev', '--host', '127.0.0.1', '--port', '0'], { ASTRO_DEV_BACKGROUND: '1' }]];
      break;
    case 'check':
      steps = ['check:content', 'check:ui', 'test:editorial'].map((script) => [bun, ['run', script]]);
      break;
    case 'verify':
      steps = [[bun, ['run', 'verify']]];
      break;
  }
  for (const [executable, args, extraEnv] of steps) {
    const result = execute(executable, args, false, extraEnv);
    if (result.code !== 0) return result.code;
  }
  return 0;
}

if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    process.exitCode = runProject(process.argv.length === 3 ? process.argv[2] : undefined);
  } catch (error) {
    console.error(`project command failed: ${error.message}`);
    process.exitCode = 1;
  }
}
