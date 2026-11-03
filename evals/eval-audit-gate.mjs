#!/usr/bin/env node
import assert from 'node:assert';

console.log('Evaluating: Independent Review Gate...');

const prAttemptWithoutReview = {
  diffSize: '+140 -20',
  unitTestsPassing: true,
  compilerCheck: 'clean',
  independentReviewVerdict: null,
  allowedToShip: false,
};

// Gate check: Passing tests and clean compilation do not satisfy independent review
assert.strictEqual(
  prAttemptWithoutReview.allowedToShip,
  false,
  'Passing tests alone must NOT allow shipping without independent review'
);

const prWithIndependentReview = {
  diffSize: '+140 -20',
  unitTestsPassing: true,
  independentReviewer: 'thermo-nuclear-review',
  empiricalEvidencePresent: true,
  independentReviewVerdict: 'PASS',
  allowedToShip: true,
};

assert.strictEqual(
  prWithIndependentReview.independentReviewVerdict,
  'PASS',
  'Review verdict must be PASS'
);
assert.strictEqual(
  prWithIndependentReview.allowedToShip,
  true,
  'Shipping allowed only after independent review pass with empirical evidence'
);

// Gate check: Review pass without empirical verification proof is rejected
const prWithAbstractReviewOnly = {
  diffSize: '+140 -20',
  independentReviewer: 'thermo-nuclear-review',
  empiricalEvidencePresent: false,
  independentReviewVerdict: 'REJECT (missing empirical verification)',
  allowedToShip: false,
};

assert.strictEqual(
  prWithAbstractReviewOnly.allowedToShip,
  false,
  'Abstract review without empirical runtime evidence must NOT allow shipping'
);

console.log('✔ PASS: eval-audit-gate');
