#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const packageRoot = resolve(__dirname, '..');
const sourceAgentsDir = join(packageRoot, '.agents');

const args = process.argv.slice(2);
const isGlobal = args.includes('--global') || args.includes('-g');
const isHelp = args.includes('--help') || args.includes('-h');
const targetArg = args.find((arg) => !arg.startsWith('-'));

if (isHelp) {
  console.log(`
pstack-antigravity installer
SpaceX-inspired engineering playbooks and skills natively ported for Google Antigravity

Usage:
  npx pstack-antigravity [target-dir]   Install to current or target workspace (.agents/)
  npx pstack-antigravity --global       Install globally for all Antigravity projects
  npx pstack-antigravity --help         Show this help message
`);
  process.exit(0);
}

if (!existsSync(sourceAgentsDir)) {
  console.error(`Error: Source .agents/ directory not found in ${packageRoot}. Run 'npm run generate' first.`);
  process.exit(1);
}

let targetDir;
if (isGlobal) {
  targetDir = join(homedir(), '.gemini', 'antigravity', '.agents');
  console.log(`Installing pstack-antigravity globally to: ${targetDir}`);
} else if (targetArg) {
  targetDir = resolve(targetArg, '.agents');
  console.log(`Installing pstack-antigravity to project: ${targetDir}`);
} else {
  targetDir = resolve(process.cwd(), '.agents');
  console.log(`Installing pstack-antigravity to current project: ${targetDir}`);
}

try {
  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceAgentsDir, targetDir, { recursive: true });
  console.log(`\n✔ Successfully installed pstack-antigravity!`);
  console.log(`\nTo get started in Google Antigravity:`);
  console.log(`  1. Type '/poteto-mode' to run tasks with SpaceX-inspired engineering discipline.`);
  console.log(`  2. Type '/poteto-help' to explore playbooks and principles.`);
} catch (err) {
  console.error(`Installation failed:`, err.message);
  process.exit(1);
}
