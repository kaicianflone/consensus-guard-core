import test from 'node:test';
import assert from 'node:assert/strict';
import { detectHardBlockFlags, aggregateVotes, updateReputations, makeIdempotencyKey } from '../src/index.mjs';

test('taxonomy detects hard blocks', ()=>{
  const f = detectHardBlockFlags('we guarantee results and share ssn');
  assert.equal(f.includes('DISALLOWED_GUARANTEE'), true);
  assert.equal(f.includes('SENSITIVE_DATA'), true);
});

test('aggregation approve', ()=>{
  const a = aggregateVotes([{vote:'YES',reputation_before:0.8,red_flags:[]},{vote:'NO',reputation_before:0.1,red_flags:[]}], {approve_threshold:0.7});
  assert.equal(a.final_decision,'APPROVE');
});

test('reputation clamp', ()=>{
  const { updates } = updateReputations([{persona_id:'p1',reputation:0.95}], [{persona_id:'p1',vote:'YES',confidence:0.6}], 'APPROVE');
  assert.equal(updates[0].reputation_after<=0.95, true);
});

test('idempotency stable', ()=>{
  assert.equal(makeIdempotencyKey({a:1}), makeIdempotencyKey({a:1}));
});
