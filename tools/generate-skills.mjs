#!/usr/bin/env node
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'node:fs';
import { resolve, join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = resolve(__dirname, '..');
const sourceSkillsDir = join(rootDir, '.tmp_pstack_claude', 'plugins', 'pstack', 'skills');
const targetSkillsDir = join(rootDir, '.agents', 'skills');

if (!existsSync(sourceSkillsDir)) {
  console.error(`Error: Source skills directory not found at ${sourceSkillsDir}`);
  process.exit(1);
}

// Transformation rules for markdown content
function transformMarkdown(content, filename = '') {
  let transformed = content;

  // 1. Tool name mappings
  transformed = transformed.replace(/\bAskUserQuestion\b/g, 'ask_question');
  transformed = transformed.replace(/`AskUserQuestion`/g, '`ask_question`');
  transformed = transformed.replace(/\bthe `Agent` tool\b/g, 'the `invoke_subagent` tool');
  transformed = transformed.replace(/\bthe `Task` tool\b/g, 'the `invoke_subagent` tool');
  transformed = transformed.replace(/\bthe `Skill` tool\b/g, 'Antigravity Skills');
  transformed = transformed.replace(/`subagent_type:\s*"pstack:poteto-agent"`/g, '`Role: "poteto-agent"`');
  transformed = transformed.replace(/`subagent_type:\s*"poteto-agent"`/g, '`Role: "poteto-agent"`');
  transformed = transformed.replace(/`subagent_type:\s*"pstack:comment-sicko"`/g, '`Role: "comment-sicko"`');
  transformed = transformed.replace(/`subagent_type:\s*"comment-sicko"`/g, '`Role: "comment-sicko"`');
  transformed = transformed.replace(/`subagent_type:\s*"pstack:thermo-nuclear-review-subagent"`/g, '`Role: "thermo-nuclear-review"`');
  transformed = transformed.replace(/`subagent_type:\s*"pstack:thermo-nuclear-code-quality-review-subagent"`/g, '`Role: "thermo-nuclear-code-quality"`');

  // 2. Path mappings
  transformed = transformed.replace(/\$\{CLAUDE_CONFIG_DIR:-\$HOME\/\.claude\}\/projects\/<encoded-cwd>\/\*\.jsonl/g, '<appDataDir>/brain/<conversation-id>/.system_generated/logs/transcript.jsonl');
  transformed = transformed.replace(/\$\{CLAUDE_CONFIG_DIR:-\$HOME\/\.claude\}\/projects\/<encoded-cwd>\//g, '<appDataDir>/brain/<conversation-id>/.system_generated/logs/');
  transformed = transformed.replace(/\$\{CLAUDE_CONFIG_DIR:-\$HOME\/\.claude\}\/projects\//g, '<appDataDir>/brain/<conversation-id>/');
  transformed = transformed.replace(/\$\{CLAUDE_CONFIG_DIR:-\$HOME\/\.claude\}\/skills\//g, '.agents/skills/');
  transformed = transformed.replace(/\$\{CLAUDE_CONFIG_DIR:-\$HOME\/\.claude\}\//g, '.agents/');
  transformed = transformed.replace(/\$\{CLAUDE_CODE_PLUGIN_CACHE_DIR:-\$\{CLAUDE_CONFIG_DIR:-\$HOME\/\.claude\}\/plugins\}\//g, '.agents/plugins/');
  transformed = transformed.replace(/\$\{CLAUDE_PLUGIN_ROOT\}\//g, '.agents/plugins/pstack/');
  transformed = transformed.replace(/~\/\.claude\/skills\//g, '.agents/skills/');
  transformed = transformed.replace(/~\/\.cursor\/skills\//g, '.agents/skills/');
  transformed = transformed.replace(/\.claude\/skills\//g, '.agents/skills/');
  transformed = transformed.replace(/\.cursor\/skills\//g, '.agents/skills/');

  // 3. Model mappings
  transformed = transformed.replace(/\bopus\b/g, 'Gemini 3.8 Flash (High Reasoning)');
  transformed = transformed.replace(/\bfable\b/g, 'Gemini 3.8 Pro / High Reasoning');
  transformed = transformed.replace(/\bhaiku\b/g, 'Gemini 3.8 Flash Lite');
  transformed = transformed.replace(/\bsonnet\b/g, 'Gemini 3.8 Flash');

  // 4. Artifact & Proceed gate mappings
  transformed = transformed.replace(/\buncommitted `todo\.md` Markdown checklist\b/g, 'Antigravity Plan Artifact with `RequestFeedback: true`');
  
  return transformed;
}

// Recursively process and copy a directory
function processDirectory(sourceDir, targetDir) {
  mkdirSync(targetDir, { recursive: true });
  const entries = readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(sourceDir, entry.name);
    const destPath = join(targetDir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(srcPath, destPath);
    } else if (entry.isFile()) {
      if (extname(entry.name) === '.md') {
        const raw = readFileSync(srcPath, 'utf8');
        const transformed = transformMarkdown(raw, entry.name);
        writeFileSync(destPath, transformed, 'utf8');
      } else {
        cpSync(srcPath, destPath);
      }
    }
  }
}

console.log('🚀 Starting pstack-antigravity skill generation...');
console.log(`Source: ${sourceSkillsDir}`);
console.log(`Target: ${targetSkillsDir}\n`);

const skillDirs = readdirSync(sourceSkillsDir).filter(name => {
  const fullPath = join(sourceSkillsDir, name);
  return statSync(fullPath).isDirectory();
});

let principleCount = 0;
let companionCount = 0;

for (const skillName of skillDirs) {
  const srcSkillDir = join(sourceSkillsDir, skillName);
  const destSkillDir = join(targetSkillsDir, skillName);

  processDirectory(srcSkillDir, destSkillDir);

  if (skillName.startsWith('principle-')) {
    principleCount++;
  } else {
    companionCount++;
  }
}

console.log(`✔ Successfully generated ${principleCount} Principles.`);
console.log(`✔ Successfully generated ${companionCount} Companion & Orchestrator Skills.`);
console.log(`✔ Total Skills Generated: ${principleCount + companionCount}\n`);

// Verify playbooks in poteto-mode
const playbooksDir = join(targetSkillsDir, 'poteto-mode', 'playbooks');
if (existsSync(playbooksDir)) {
  const playbooks = readdirSync(playbooksDir).filter(f => f.endsWith('.md'));
  console.log(`✔ Verified ${playbooks.length} Operational Playbooks in poteto-mode/playbooks/`);
} else {
  console.warn(`⚠ Warning: poteto-mode/playbooks/ was not found!`);
}

console.log('\n✨ Generation complete. All skills native to Google Antigravity!');
