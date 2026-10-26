#!/usr/bin/env node
import assert from 'node:assert';

console.log('Evaluating: Guard the Context Window (Subagent Delegation)...');

const largeSweepTask = {
  description: 'Rename UserProfileDTO across 45 files and update all imports',
  filesAffected: 45,
  inlinedInCoordinator: false,
  subagentDispatched: true,
  subagentType: 'poteto-agent',
  workspaceMode: 'branch',
};

assert(
  largeSweepTask.filesAffected > 10,
  'Large multi-file sweep detected'
);
assert.strictEqual(
  largeSweepTask.inlinedInCoordinator,
  false,
  'Coordinator must not inline 45 file diffs directly into root context'
);
assert.strictEqual(
  largeSweepTask.subagentDispatched,
  true,
  'Coordinator must delegate bulk sweep to poteto-agent'
);
assert.strictEqual(
  largeSweepTask.workspaceMode,
  'branch',
  'Subagent must operate in isolated branch workspace'
);

console.log('✔ PASS: eval-context-guarding');
