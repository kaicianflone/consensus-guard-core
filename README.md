# consensus-guard-core

Deterministic primitives for the Consensus guard ecosystem.

`consensus-guard-core` is the shared policy/runtime foundation behind the domain guards (action, merge, publish, support, email, deployment, IAM escalation).

## Why this package exists

Guard quality collapses when each package re-implements policy logic differently. This core keeps behavior consistent, replayable, and comparable across domains.

## Core exports

- `aggregateVotes()` — weighted deterministic aggregation
- `updateReputations()` — bounded persona reputation updates
- `makeIdempotencyKey()` — retry-safe request identity
- `rejectUnknown()` — strict schema hygiene helper
- taxonomy helpers (`detectHardBlockFlags`)
- board helpers (`getLatest`, `getPersonaSet`, `getDecisionByKey`, `writeArtifact`)
- `resolveStatePath()` — safe board-state path handling

## Design principles

- **determinism first**
- **explicit policy semantics**
- **artifact-native auditability**
- **minimal orchestration surface**

## `invoke()` behavior

This package is primitives-only.

- `invoke(input, { handler })` delegates to your supplied handler.
- Without a handler, `invoke` returns a structured `NO_HANDLER` error.

That keeps usage explicit and prevents hidden workflow assumptions.

## Quick start

```bash
npm i consensus-guard-core
npm test
```

## Ecosystem alignment

Use this core to maintain consistent decision semantics across all guard packages and tool-call boundaries.

## Related docs

- `SKILL.md`
- `AI-SELF-IMPROVEMENT.md`
