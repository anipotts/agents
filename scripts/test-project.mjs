import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { projectRoot, runProject } from './project.mjs';

function fixture() {
  const root = mkdtempSync(path.join(os.tmpdir(), 'agent project spaces '));
  writeFileSync(path.join(root, 'package.json'), JSON.stringify({ packageManager: 'bun@1.3.4' }));
  return root;
}
function harness(options = {}) {
  const root = fixture();
  const calls = [];
  const messages = [];
  return {
    root, calls, messages,
    options: {
      root, bun: '/runtime with spaces/bin/bun', node: process.execPath,
      env: { PATH: '/usr/bin', KEEP: 'value' },
      report: (message) => messages.push(message),
      spawn: (executable, args, settings) => {
        calls.push({ executable, args, ...settings });
        return args[0] === '--version'
          ? { status: 0, stdout: '1.3.4\n' }
          : { status: 0 };
      },
      ...options,
    },
  };
}

test('setup repeats without sharing checkout dependencies or invoking shell/system installers', () => {
  const a = harness();
  const b = harness();
  for (const h of [a, a, b]) assert.equal(runProject('setup', h.options), 0);
  assert.notEqual(a.root, b.root);
  assert.deepEqual(a.calls[1].args, ['install', '--frozen-lockfile']);
  assert.deepEqual(a.calls[2].args, [path.join(a.root, 'node_modules/playwright/cli.js'), 'install', 'chromium']);
  assert.equal(a.calls.length, 6);
  for (const call of [...a.calls, ...b.calls]) {
    assert.equal(call.shell, undefined);
    assert.ok([a.root, b.root].includes(call.cwd));
    assert.equal(call.env.KEEP, 'value');
    assert.equal(call.env.PATH, `/runtime with spaces/bin${path.delimiter}/usr/bin`);
  }
});

test('missing Bun gives actionable error and stops before installation', () => {
  const h = harness({ bun: '/missing/bun', spawn: spawnSync });
  assert.equal(runProject('setup', h.options), 1);
  assert.match(h.messages[0], /Cannot find.*Bun 1\.3\.4.*does not download runtimes/);
});

test('wrong Bun version stops before installation', () => {
  const h = harness({ spawn: () => ({ status: 0, stdout: '1.3.3\n' }) });
  assert.equal(runProject('setup', h.options), 1);
  assert.match(h.messages[0], /1\.3\.4.*found 1\.3\.3/);
});

test('child failure propagates its exit code and skips subsequent steps', () => {
  const h = harness();
  h.options.spawn = (executable, args) => {
    h.calls.push(args);
    return args[0] === '--version' ? { status: 0, stdout: '1.3.4' } : { status: 23 };
  };
  assert.equal(runProject('setup', h.options), 23);
  assert.equal(h.calls.length, 2);
  h.calls.length = 0;
  assert.equal(runProject('check', h.options), 23);
  assert.deepEqual(h.calls[1], ['run', 'check:content']);
  assert.equal(h.calls.length, 2);
});

test('missing Node at Playwright installation fails clearly', () => {
  const h = harness();
  h.options.node = '/missing/node';
  const original = h.options.spawn;
  h.options.spawn = (executable, args, settings) => executable === '/missing/node'
    ? spawnSync(executable, args, settings) : original(executable, args, settings);
  assert.equal(runProject('setup', h.options), 1);
  assert.match(h.messages[0], /Cannot find \/missing\/node/);
});

test('dev is localhost with an OS assigned port, foreground, and normal lock behavior', () => {
  const h = harness();
  assert.equal(runProject('dev', h.options), 0);
  assert.deepEqual(h.calls[1].args, ['run', 'dev', '--host', '127.0.0.1', '--port', '0']);
  assert.equal(h.calls[1].env.ASTRO_DEV_BACKGROUND, '1');
  assert.equal(h.calls[1].stdio, 'inherit');
});

test('check and verify delegate to canonical package scripts', () => {
  const h = harness();
  assert.equal(runProject('check', h.options), 0);
  assert.deepEqual(h.calls.slice(1).map((call) => call.args), [
    ['run', 'check:content'], ['run', 'check:ui'], ['run', 'test:editorial'],
  ]);
  assert.equal(runProject('verify', h.options), 0);
  assert.deepEqual(h.calls.at(-1).args, ['run', 'verify']);
});

test('invalid command or unpinned runtime never launches a process', () => {
  const h = harness();
  assert.equal(runProject('other', h.options), 2);
  writeFileSync(path.join(h.root, 'package.json'), '{"packageManager":"bun@latest"}');
  assert.equal(runProject('setup', h.options), 1);
  assert.equal(h.calls.length, 0);
});

test('CLI resolves checkout from its own path, including spaces, and preserves failure status', () => {
  const root = fixture();
  mkdirSync(path.join(root, 'scripts'));
  for (const name of ['project.mjs', 'runtime.mjs']) {
    writeFileSync(path.join(root, 'scripts', name), readFileSync(path.join(projectRoot, 'scripts', name)));
  }
  mkdirSync(path.join(root, 'runtime/bin'), { recursive: true });
  writeFileSync(path.join(root, 'runtime/bin/bun'), '#!/bin/sh\nif [ "$1" = "--version" ]; then echo 1.3.4; else exit 29; fi\n', { mode: 0o755 });
  const result = spawnSync(process.execPath, [path.join(root, 'scripts/project.mjs'), 'check'], {
    cwd: os.tmpdir(), encoding: 'utf8',
    env: { ...process.env, npm_execpath: '', BUN_INSTALL: path.join(root, 'runtime') },
  });
  assert.equal(result.status, 29, result.stderr);
});
