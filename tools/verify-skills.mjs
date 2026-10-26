#!/usr/bin/env node
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = resolve(__dirname, '..');
const skillsDir = join(rootDir, '.agents', 'skills');

if (!existsSync(skillsDir)) {
  console.error(`Error: Skills directory not found at ${skillsDir}`);
  process.exit(1);
}

const skillFolders = readdirSync(skillsDir);
let errors = 0;
let verifiedSkills = 0;

console.log('🔍 Running verification on all generated Antigravity skills...\n');

for (const folder of skillFolders) {
  const skillFile = join(skillsDir, folder, 'SKILL.md');
  if (!existsSync(skillFile)) {
    console.error(`❌ Missing SKILL.md in ${folder}`);
    errors++;
    continue;
  }

  const content = readFileSync(skillFile, 'utf8');

  // Verify YAML frontmatter
  if (!content.startsWith('---')) {
    console.error(`❌ Missing YAML frontmatter start in ${folder}/SKILL.md`);
    errors++;
    continue;
  }

  const frontmatterEnd = content.indexOf('---', 3);
  if (frontmatterEnd === -1) {
    console.error(`❌ Malformed YAML frontmatter in ${folder}/SKILL.md`);
    errors++;
    continue;
  }

  const frontmatter = content.slice(3, frontmatterEnd);
  if (!frontmatter.includes('name:')) {
    console.error(`❌ Missing 'name' field in frontmatter of ${folder}/SKILL.md`);
    errors++;
  }
  if (!frontmatter.includes('description:')) {
    console.error(`❌ Missing 'description' field in frontmatter of ${folder}/SKILL.md`);
    errors++;
  }

  // Check for any legacy unmapped variables
  if (content.includes('${CLAUDE_CONFIG_DIR') || content.includes('${CLAUDE_PLUGIN_ROOT}')) {
    console.warn(`⚠ Warning: Leftover unmapped Claude variable in ${folder}/SKILL.md`);
  }

  verifiedSkills++;
}

console.log(`\n✔ Verified ${verifiedSkills} skills.`);

// Verify playbooks in poteto-mode
const playbooksDir = join(skillsDir, 'poteto-mode', 'playbooks');
if (existsSync(playbooksDir)) {
  const playbooks = readdirSync(playbooksDir).filter(f => f.endsWith('.md'));
  console.log(`✔ Verified ${playbooks.length} playbooks in poteto-mode/playbooks/`);
  if (playbooks.length !== 23) {
    console.error(`❌ Expected 23 playbooks, found ${playbooks.length}`);
    errors++;
  }
} else {
  console.error(`❌ Missing poteto-mode/playbooks/ directory`);
  errors++;
}

if (errors === 0) {
  console.log('\n🎉 All skills and playbooks passed Antigravity verification with 0 errors!');
  process.exit(0);
} else {
  console.error(`\n❌ Verification completed with ${errors} error(s).`);
  process.exit(1);
}
