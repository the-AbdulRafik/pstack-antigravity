#!/usr/bin/env node
import assert from 'node:assert';
import { renderTemplate, buildArtifactMetadata, buildMermaidSequence } from '../tools/artifact-helper.mjs';

console.log('Running test: eval-fixtures...');

// Test 1: renderTemplate substitution
const plan = renderTemplate('plan-artifact.md', {
  TASK_NAME: 'Authentication Caching',
  PLAYBOOK_NAME: 'feature',
  TARGET_BRANCH: 'feature/auth-cache',
  MODEL_TIER: 'Gemini 3.8 Flash',
  OBJECTIVE_SUMMARY: 'Add Redis cache to session lookups.',
  PRINCIPLES_LIST: 'Laziness Protocol, Prove It Works',
  BLAST_RADIUS: 'auth-service only',
  DATA_MODEL_SPEC: 'interface Session { id: string; userId: string; }',
  STEP_1_TITLE: 'Reproduction test',
  STEP_1_CHECK: 'failing test exists',
  STEP_2_TITLE: 'Redis client wiring',
  STEP_2_CHECK: 'cache hits verified',
  STEP_3_TITLE: 'Comment sweep',
  STEP_3_CHECK: 'zero corpse comments',
  STEP_4_TITLE: 'Independent review',
});

assert(plan.includes('Authentication Caching'));
assert(plan.includes('Click **Proceed** to authorize the coordinator'));

// Test 2: buildArtifactMetadata
const meta = buildArtifactMetadata('Test plan', true);
assert.strictEqual(meta.Summary, 'Test plan');
assert.strictEqual(meta.RequestFeedback, true);

// Test 3: buildMermaidSequence
const seq = buildMermaidSequence(
  [{ id: 'Dev', label: 'Developer' }, { id: 'AI', label: 'Agent' }],
  [{ from: 'Dev', to: 'AI', message: 'Execute plan' }]
);
assert(seq.includes('sequenceDiagram'));
assert(seq.includes('Dev->>AI: Execute plan'));

console.log('✔ PASS: eval-fixtures (artifact templates and helper functions verified)');
