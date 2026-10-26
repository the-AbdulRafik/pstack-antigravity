#!/usr/bin/env node
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const subagentsDir = resolve(__dirname, '..', '.agents', 'subagents');

console.log('Running test: subagent-dag...');

const files = readdirSync(subagentsDir).filter(f => f.endsWith('.json'));
assert(files.length >= 4, 'Must have at least 4 subagent manifests');

for (const file of files) {
  const manifest = JSON.parse(readFileSync(join(subagentsDir, file), 'utf8'));
  assert.strictEqual(
    manifest.enableSubagentTools,
    false,
    `Subagent ${file} must enforce enableSubagentTools: false to prevent recursion`
  );
}

console.log('✔ PASS: subagent-dag (all subagents are non-recursive leaf nodes)');
