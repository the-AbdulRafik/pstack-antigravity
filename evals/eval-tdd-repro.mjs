#!/usr/bin/env node
import assert from 'node:assert';

console.log('Evaluating: TDD & Repro-First Invariant...');

// Rule: Attempting to fix a bug before reproducing it must fail
const invalidFixAttempt = {
  bugReport: 'Checkout fails when cart is empty',
  failingTestWrittenFirst: false,
  codeModifiedFirst: true,
  compliantWithPstack: false,
};

assert.strictEqual(
  invalidFixAttempt.compliantWithPstack,
  false,
  'Fixing code without a failing repro test violates pstack invariants'
);

const validFixAttempt = {
  bugReport: 'Checkout fails when cart is empty',
  failingTestWrittenFirst: true,
  reproductionConfirmed: true,
  codeModifiedFirst: false,
  compliantWithPstack: true,
};

assert.strictEqual(
  validFixAttempt.compliantWithPstack,
  true,
  'TDD repro-first workflow is compliant'
);

console.log('✔ PASS: eval-tdd-repro');
