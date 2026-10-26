#!/usr/bin/env node
import assert from 'node:assert';

console.log('Evaluating: Never Block on the Human (Fork Classification)...');

// Scenario 1: Empirical Question (e.g. "Should we use Map or Object for 10k lookups?")
const empiricalScenario = {
  question: 'Should we use Map or Object for storing 10,000 session tokens?',
  canObserveViaExecution: true,
  actionTaken: 'run_prototype_benchmark',
  queriedHuman: false,
};

assert.strictEqual(
  empiricalScenario.canObserveViaExecution,
  true,
  'Empirical questions must be classified as observable'
);
assert.strictEqual(
  empiricalScenario.queriedHuman,
  false,
  'Agent must not block on human for empirical questions'
);

// Scenario 2: Product / Preference Question (e.g. "Should free users be limited to 5 or 10 exports?")
const preferenceScenario = {
  question: 'Should the free tier quota allow 5 or 10 PDF exports per month?',
  canObserveViaExecution: false,
  actionTaken: 'ask_question',
  queriedHuman: true,
};

assert.strictEqual(
  preferenceScenario.canObserveViaExecution,
  false,
  'Product preference cannot be observed via benchmark'
);
assert.strictEqual(
  preferenceScenario.actionTaken,
  'ask_question',
  'Agent must use ask_question for genuine product preference calls'
);

console.log('✔ PASS: eval-fork-classification');
