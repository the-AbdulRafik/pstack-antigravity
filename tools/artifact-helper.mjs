#!/usr/bin/env node
/**
 * Artifact Helper Module for pstack-antigravity
 * Formats structured Antigravity Artifacts with Mermaid charts and proceed gates.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const templatesDir = resolve(__dirname, '..', 'templates');

export function renderTemplate(templateName, variables = {}) {
  const filePath = join(templatesDir, templateName);
  if (!existsSync(filePath)) {
    throw new Error(`Template not found: ${templateName}`);
  }

  let content = readFileSync(filePath, 'utf8');
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    content = content.replace(regex, value ?? '');
  }
  return content;
}

export function buildArtifactMetadata(summary, requestFeedback = false) {
  return {
    Summary: summary,
    UserFacing: true,
    RequestFeedback: requestFeedback,
  };
}

export function buildMermaidSequence(participants, interactions) {
  let chart = 'sequenceDiagram\n    autonumber\n';
  for (const p of participants) {
    chart += `    participant ${p.id} as ${p.label}\n`;
  }
  for (const item of interactions) {
    chart += `    ${item.from}->>${item.to}: ${item.message}\n`;
  }
  return `\`\`\`mermaid\n${chart}\`\`\``;
}
