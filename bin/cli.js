#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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

try {
  if (isGlobal) {
    const home = homedir();
    console.log(`Installing pstack-antigravity globally across Antigravity runtime...`);

    // 1. Install skills to ~/.gemini/skills/
    const globalSkillsDir = join(home, '.gemini', 'skills');
    mkdirSync(globalSkillsDir, { recursive: true });
    cpSync(join(sourceAgentsDir, 'skills'), globalSkillsDir, { recursive: true });
    console.log(`✔ Skills installed to: ${globalSkillsDir}`);

    // 2. Install plugin to ~/.gemini/config/plugins/pstack/
    const globalPluginDir = join(home, '.gemini', 'config', 'plugins', 'pstack');
    mkdirSync(globalPluginDir, { recursive: true });
    cpSync(join(sourceAgentsDir, 'plugins', 'pstack'), globalPluginDir, { recursive: true });
    console.log(`✔ Plugin installed to: ${globalPluginDir}`);

    // 3. Register ~/.gemini/skills in ~/.gemini/config/skills.json
    const globalConfigDir = join(home, '.gemini', 'config');
    mkdirSync(globalConfigDir, { recursive: true });
    const skillsJsonPath = join(globalConfigDir, 'skills.json');
    let skillsConfig = { entries: [] };
    if (existsSync(skillsJsonPath)) {
      try {
        skillsConfig = JSON.parse(readFileSync(skillsJsonPath, 'utf-8'));
        if (!Array.isArray(skillsConfig.entries)) skillsConfig.entries = [];
      } catch {
        skillsConfig = { entries: [] };
      }
    }
    const alreadyRegistered = skillsConfig.entries.some((entry) => entry.path === globalSkillsDir);
    if (!alreadyRegistered) {
      skillsConfig.entries.push({ path: globalSkillsDir });
      writeFileSync(skillsJsonPath, JSON.stringify(skillsConfig, null, 2), 'utf-8');
      console.log(`✔ Configured global skills in: ${skillsJsonPath}`);
    }

    // 4. Install full .agents to ~/.gemini/antigravity/.agents
    const antigravityAgentsDir = join(home, '.gemini', 'antigravity', '.agents');
    mkdirSync(antigravityAgentsDir, { recursive: true });
    cpSync(sourceAgentsDir, antigravityAgentsDir, { recursive: true });
    console.log(`✔ Agents runtime synced to: ${antigravityAgentsDir}`);

    // 5. Global rules in ~/.gemini/GEMINI.md
    const globalGeminiMd = join(home, '.gemini', 'GEMINI.md');
    const rulesSource = join(sourceAgentsDir, 'rules', 'AGENTS.md');
    if (existsSync(rulesSource)) {
      const rulesContent = readFileSync(rulesSource, 'utf-8');
      writeFileSync(globalGeminiMd, rulesContent, 'utf-8');
      console.log(`✔ Global rules synced to: ${globalGeminiMd}`);
    }
  } else {
    let targetDir;
    if (targetArg) {
      targetDir = resolve(targetArg, '.agents');
      console.log(`Installing pstack-antigravity to project: ${targetDir}`);
    } else {
      targetDir = resolve(process.cwd(), '.agents');
      console.log(`Installing pstack-antigravity to current project: ${targetDir}`);
    }
    mkdirSync(targetDir, { recursive: true });
    cpSync(sourceAgentsDir, targetDir, { recursive: true });
  }

  console.log(`\n✔ Successfully installed pstack-antigravity!`);
  console.log(`\nTo get started in Google Antigravity:`);
  console.log(`  1. Type '/poteto-mode' to run tasks with SpaceX-inspired engineering discipline.`);
  console.log(`  2. Type '/poteto-help' to explore playbooks and principles.`);
} catch (err) {
  console.error(`Installation failed:`, err.message);
  process.exit(1);
}
