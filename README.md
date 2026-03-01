# consensus-guard-core

Deterministic policy primitives for the Consensus guard ecosystem.

`consensus-guard-core` is the shared foundation used by guard skills to make pre-execution decisions reproducible, auditable, and safe under retries.

## Why this package exists

Without a shared core, every guard drifts in behavior and semantics. This package keeps policy logic consistent across domains (publish, support, email, code merge, deployment, IAM escalation, and agent actions).

## What you get

- **Deterministic vote aggregation** (`aggregateVotes`)
- **Hard-block taxonomy helpers** (`detectHardBlockFlags`)
- **Reputation update rules with clamping** (`updateReputations`)
- **Retry-safe idempotency keys** (`makeIdempotencyKey`)
- **Strict unknown-field rejection** (`rejectUnknown`)
- **Board artifact indexing + write helpers** (latest/by-id/idempotency lookups)
- **Safe state path resolution** (`resolveStatePath`)

## Design goals

- **Validation over vibes**: explicit policy checks, no hidden magic
- **Replayability**: same input should produce the same decision path
- **Composability**: domain guards plug in policy adapters, not custom orchestration stacks
- **Auditability**: board-native artifacts for every decision

## Install

```bash
npm i consensus-guard-core
```

## Minimal usage

```js
import {
  aggregateVotes,
  makeIdempotencyKey,
  rejectUnknown
} from 'consensus-guard-core/src/index.mjs';

const idem = makeIdempotencyKey({ board_id: 'board_x', request_id: 'r1' });
const agg = aggregateVotes(votes, { approve_threshold: 0.7 });
```

## `invoke()` contract

`consensus-guard-core` is a primitives package, not a domain guard.

- `invoke(input, { handler })` delegates to your supplied handler
- `invoke(input)` returns structured `NO_HANDLER` error

This keeps core behavior explicit and avoids accidental hidden workflows.

## Test

```bash
npm test
```

## Related repos

- `consensus-agent-action-guard`
- `consensus-code-merge-guard`
- `consensus-publish-guard`
- `consensus-send-email-guard`
- `consensus-support-reply-guard`
- `consensus-permission-escalation-guard`
- `consensus-deployment-guard`

## Continuous improvement

See `AI-SELF-IMPROVEMENT.md` for iteration loops and reliability-focused evolution guidance.
