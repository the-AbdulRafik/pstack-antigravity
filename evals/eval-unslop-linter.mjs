#!/usr/bin/env node
import assert from 'node:assert';

console.log('Evaluating: Unslop Prose Linter...');

function lintProse(text) {
  const violations = [];
  if (text.includes('—') || text.includes('–')) {
    violations.push('Contains em-dash or en-dash');
  }
  if (/[a-zA-Z]:\s+[a-zA-Z]/.test(text)) {
    violations.push('Contains connective mid-sentence colon');
  }
  const fillers = ['Sure!', 'I have updated the code', 'Great question', 'Certainly!', 'As an AI'];
  for (const f of fillers) {
    if (text.includes(f)) {
      violations.push(`Contains conversational filler: "${f}"`);
    }
  }
  return violations;
}

const sloppyResponse = 'Sure! I have updated the code — it now uses Redis: which is much faster.';
const sloppyViolations = lintProse(sloppyResponse);
assert(sloppyViolations.length >= 2, 'Must detect slop in sloppyResponse');

const unsloppedResponse = 'The cache layer now stores tokens in Redis. Benchmark proves a 4x reduction in lookup latency.';
const cleanViolations = lintProse(unsloppedResponse);
assert.strictEqual(cleanViolations.length, 0, 'Unslopped declarative text must pass with 0 violations');

console.log('✔ PASS: eval-unslop-linter');
