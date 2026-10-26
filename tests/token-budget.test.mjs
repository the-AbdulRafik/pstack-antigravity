#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rulesPath = resolve(__dirname, '..', '.agents', 'rules', 'AGENTS.md');

console.log('Running test: token-budget...');
assert(existsSync(rulesPath), 'AGENTS.md must exist');

const content = readFileSync(rulesPath, 'utf8');
const words = content.split(/\s+/).filter(Boolean).length;

console.log(`AGENTS.md word count: ${words}`);
assert(
  words <= 400,
  `AGENTS.md exceeds 400 words (${words} words). Keep under 400 words to conserve token budget.`
);

console.log('✔ PASS: token-budget (AGENTS.md is under 400 words)');
