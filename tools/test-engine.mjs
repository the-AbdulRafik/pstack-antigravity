#!/usr/bin/env node
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = resolve(__dirname, '..');

console.log('🧪 Running pstack-antigravity Phase 3 engine verification...\n');

let errors = 0;

// 1. Check AGENTS.md rules token budget
const rulesPath = join(rootDir, '.agents', 'rules', 'AGENTS.md');
if (!existsSync(rulesPath)) {
  console.error('❌ Missing .agents/rules/AGENTS.md');
  errors++;
} else {
  const content = readFileSync(rulesPath, 'utf8');
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  console.log(`✔ Found AGENTS.md (${wordCount} words, ~${Math.round(wordCount * 1.3)} tokens).`);
  if (wordCount > 400) {
    console.warn(`⚠ Warning: AGENTS.md exceeds 400 words (${wordCount} words). Keep it compact to save token budget.`);
  }
}

// 2. Check Plugin Manifests
const pluginDir = join(rootDir, '.agents', 'plugins', 'pstack');
for (const file of ['plugin.json', 'models.json', 'hooks.json']) {
  const filePath = join(pluginDir, file);
  if (!existsSync(filePath)) {
    console.error(`❌ Missing ${file} in .agents/plugins/pstack/`);
    errors++;
  } else {
    try {
      JSON.parse(readFileSync(filePath, 'utf8'));
      console.log(`✔ Validated JSON manifest: .agents/plugins/pstack/${file}`);
    } catch (err) {
      console.error(`❌ Invalid JSON in ${file}:`, err.message);
      errors++;
    }
  }
}

// 3. Check Subagent manifests & Directed Acyclic Graph (DAG) rules
const subagentsDir = join(rootDir, '.agents', 'subagents');
if (!existsSync(subagentsDir)) {
  console.error('❌ Missing .agents/subagents/ directory');
  errors++;
} else {
  const subagentFiles = readdirSync(subagentsDir).filter(f => f.endsWith('.json'));
  console.log(`\n✔ Discovered ${subagentFiles.length} subagent manifests.`);

  for (const file of subagentFiles) {
    const filePath = join(subagentsDir, file);
    const manifest = JSON.parse(readFileSync(filePath, 'utf8'));

    // Check strict DAG rule
    if (manifest.enableSubagentTools !== false) {
      console.error(`❌ Recursion Risk: ${file} does not have enableSubagentTools set to false!`);
      errors++;
    } else {
      console.log(`  • ${manifest.name}: Verified leaf node (enableSubagentTools: false).`);
    }

    // Check read-only audits
    if (file.includes('review') || file.includes('quality')) {
      if (manifest.enableWriteTools !== false) {
        console.error(`❌ Mutation Risk: Audit subagent ${file} does not have enableWriteTools set to false!`);
        errors++;
      }
    }
  }
}

if (errors === 0) {
  console.log('\n🎉 Phase 3 engine verification passed with 0 errors! System is fully compliant.');
  process.exit(0);
} else {
  console.error(`\n❌ Engine verification failed with ${errors} error(s).`);
  process.exit(1);
}
