# Phase 14 — Common Shell / UNIT Engine Audit

Date: 2026-08-12
Repository baseline: `kfcccpro/jk-5sec` `main`
Version baseline: `0.13.0`

## Goal

Reduce duplicated screen/state code without turning the Vanilla JS app into an abstract framework. Preserve the author-method differences of each UNIT.

## Findings

### 1. Home rendering is currently load-order dependent

Current pattern:

- `js/app.js` defines `renderStudentHome()` and `renderAdminHome()` for UNIT 1.
- `js/unit2-engine.js` stores the originals and then replaces both functions with new full-page implementations for UNIT 1+2.
- `js/unit3-engine.js` stores the UNIT 2 versions, replaces both functions again, calls the previous renderer, then injects UNIT 3 DOM.

Risk:

- Every future UNIT may need another wrapper or another replacement.
- Script loading order becomes behavior-critical.
- A UI change to the student/admin home can require edits in more than one engine file.
- A future UNIT can accidentally omit or duplicate a previous UNIT entry.

Recommendation:

Create one stable home renderer in the common app layer and feed it a small UNIT registry/config. Do not let UNIT engine files override the full home renderer.

### 2. Learning shell markup is duplicated

`renderLearningShell`, `renderUnit2Shell`, and `renderUnit3Shell` reproduce the same structure:

- screen
- topbar
- JK English / 5초 영어어법 title
- UNIT badge
- Home button
- progress meta + track
- task-card / taskContent
- sticky primary action

Only these values materially differ:

- UNIT badge text
- primary button handler
- stage label map and progress calculation

Recommendation:

Extract a very small common helper such as:

`renderLearningShell({ unitBadge, onPrimary })`

The helper should only create the shell and bind the Home / primary-action buttons. UNIT-specific stage rendering stays inside each UNIT engine.

### 3. Primary button helpers are repeated

Patterns repeated as:

- `setPrimary`
- `setUnit2Primary`
- `setUnit3Primary`

Recommendation:

Use one common helper:

`setPrimaryAction(enabled, label)`

No UNIT-specific abstraction is needed here.

### 4. Progress calculations are structurally identical

UNIT 1/2/3 each calculate:

- item number
- stage number
- item count
- total step count
- completed steps
- progress percentage

Recommendation:

Use a common function receiving session, item count, and label map. Keep stage arrays and labels in UNIT configs.

### 5. Context blocks are nearly identical but should remain lightly configurable

UNIT 1, UNIT 2, and UNIT 3 all retain the original sentence and initial choice during evidence steps.

Recommendation:

Extract one common context renderer with arguments:

- prompt
- item number
- initial answer
- optional label

Do not force all UNIT evidence logic into a generic engine.

### 6. UNIT-specific decision logic should NOT be unified

The following differences are intentional and should remain in each UNIT engine:

- UNIT 1: verb count / connector count / slot judgment
- UNIT 2: finite vs nonfinite / object / active-passive
- UNIT 3: position / object relevance / p.p. vs be+p.p. vs active past

A single universal question engine would hide the author's different decision procedures and increase complexity.

## Minimal target architecture

### Common app layer

Responsibilities:

- login / role shell
- stable student home
- stable admin home
- UNIT registry display
- learning shell creation
- primary-action helper
- progress helper
- context block helper
- shared localStorage functions

### UNIT registry

A small JS structure describing available UNITs, for example:

- id
- chapter label
- title/focus
- item count
- start function name or callable registration
- completion counter key

The registry is presentation/navigation metadata only. It does not contain the UNIT's author-decision algorithm.

### UNIT engine files

Responsibilities:

- session shape
- stage sequence
- evidence questions
- correctness rules
- repair/retry logic
- UNIT-specific completion status

## Refactor order

1. Introduce common shell helpers without changing current UNIT behavior.
2. Switch UNIT 1 to the common learning shell helper.
3. Switch UNIT 2 and UNIT 3 to the same helper.
4. Replace chained home renderer overrides with one stable UNIT registry-driven home renderer.
5. Verify student PIN 8081, admin PIN 2007, UNIT 1/2/3 launch, Home return, completion counters, localStorage persistence.
6. Only after regression verification, remove obsolete duplicated shell/home code.

## Guardrails

- No React / build chain.
- No class hierarchy.
- No universal stage engine.
- No migration of author-specific decision rules into generic config just to reduce line count.
- No change to learning content or answer logic during shell refactor.
- Keep `main` as the single source of truth.

## Phase 14 audit conclusion

A modest refactor is justified. The highest-value change is eliminating chained overrides of `renderStudentHome` / `renderAdminHome` and centralizing the repeated learning shell. The author-method stage logic should remain UNIT-specific.
