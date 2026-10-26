#!/usr/bin/env node
import assert from 'node:assert';

console.log('Evaluating: Model the Domain (State Machine vs Scattered Conditionals)...');

// Antipattern: scattered ad-hoc boolean flags
const scatteredFlags = {
  isLoading: false,
  isError: true,
  isSuccess: true, // Impossible illegal state!
};

assert(
  scatteredFlags.isError && scatteredFlags.isSuccess,
  'Scattered flags permit illegal impossible states'
);

// Canonical Domain Shape: Discriminated Union / State Machine
const validStateMachine = {
  status: 'error',
  error: new Error('Network timeout'),
};

function transition(current, event) {
  switch (current.status) {
    case 'idle':
      return event.type === 'FETCH' ? { status: 'loading' } : current;
    case 'loading':
      return event.type === 'SUCCESS' ? { status: 'success', data: event.data } : { status: 'error', error: event.error };
    default:
      return current;
  }
}

const nextState = transition({ status: 'loading' }, { type: 'SUCCESS', data: [1, 2, 3] });
assert.strictEqual(nextState.status, 'success');
assert.deepStrictEqual(nextState.data, [1, 2, 3]);

console.log('✔ PASS: eval-domain-modeling');
