#!/usr/bin/env node
/**
 * Helper utility to inspect and output Antigravity define_subagent payloads
 * from .agents/subagents/*.json definitions.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const subagentsDir = resolve(__dirname, '..', '.agents', 'subagents');

const files = readdirSync(subagentsDir).filter(f => f.endsWith('.json'));

console.log('📋 Registered Antigravity Subagent Definitions:\n');

for (const file of files) {
  const data = JSON.parse(readFileSync(join(subagentsDir, file), 'utf8'));
  console.log(`[Subagent: ${data.name}]`);
  console.log(`  • Role: ${data.role}`);
  console.log(`  • Model: ${data.model}`);
  console.log(`  • Workspace Mode: ${data.workspace}`);
  console.log(`  • Write Tools: ${data.enableWriteTools}`);
  console.log(`  • Subagent Delegation Tools: ${data.enableSubagentTools} (DAG Enforced)`);
  console.log(`  • Description: ${data.description}\n`);
}
