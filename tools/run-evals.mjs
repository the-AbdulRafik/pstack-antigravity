#!/usr/bin/env node
import { readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const evalsDir = resolve(__dirname, '..', 'evals');

const files = readdirSync(evalsDir).filter(f => f.startsWith('eval-') && f.endsWith('.mjs'));

console.log(`🎯 Running ${files.length} pstack-antigravity behavioral evaluations...\n`);

let passed = 0;
let failed = 0;

for (const file of files) {
  const filePath = join(evalsDir, file);
  try {
    const output = execSync(`node "${filePath}"`, { encoding: 'utf8', stdio: 'pipe' });
    process.stdout.write(output);
    passed++;
  } catch (err) {
    console.error(`❌ FAILED: ${file}`);
    console.error(err.stderr || err.stdout || err.message);
    failed++;
  }
}

console.log(`\n========================================`);
console.log(`Evaluations Summary: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 All behavioral evaluations passed!');
  process.exit(0);
}
