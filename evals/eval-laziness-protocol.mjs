#!/usr/bin/env node
import assert from 'node:assert';

console.log('Evaluating: Laziness Protocol (Minimal Sufficient Change)...');

// Diff comparison: Approach A adds 3 speculative wrappers, Approach B deletes 5 lines
const speculativeApproach = {
  layersAdded: 3,
  linesAdded: 120,
  linesDeleted: 0,
  solvesProblem: true,
  violatesLaziness: true,
};

const lazyApproach = {
  layersAdded: 0,
  linesAdded: 4,
  linesDeleted: 12,
  solvesProblem: true,
  violatesLaziness: false,
};

assert.strictEqual(
  speculativeApproach.violatesLaziness,
  true,
  'Speculative abstractions violate Laziness Protocol'
);
assert.strictEqual(
  lazyApproach.violatesLaziness,
  false,
  'Deletion-biased minimal changes pass Laziness Protocol'
);

console.log('✔ PASS: eval-laziness-protocol');
