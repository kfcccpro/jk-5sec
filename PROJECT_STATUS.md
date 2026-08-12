# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.16.0-phase16-unit4`

## Source of truth

- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed

- Phase 1~14A: textbook method, UNIT 1~3, responsive UI, PIN shell, Pages deployment, review architecture, 1001 visual baseline, common Shell
- Phase 15: shared + UNIT-specific content/data contract and semantic CI gate
- Phase 16: PART 1 / CHAPTER 1 / UNIT 4 author-method analysis and 5-item learning loop

## Current learning content

Implemented:
- UNIT 1: connector/relative-clause count → finite/nonfinite slot
- UNIT 2: slot → object → active/passive for V-ing/p.p.
- UNIT 3: slot → object relevance → p.p./be+p.p./active past
- UNIT 4: conjunction-retained reduced clause → object shortcut → V-ing/p.p.; subject-relation fallback for intransitive cases

Next textbook unit:
- PART 1 / CHAPTER 1 / UNIT 5: `수동태 불가 동사`

## Phase 16 UNIT 4

Files:
- `js/unit4-data.js`
- `js/unit4-engine.js`
- `docs/PHASE16_UNIT4_ANALYSIS.md`

Interaction:
`Cold Attempt → 축약 자리 → 목적어 확인 → V-ing/p.p. 판단 → 5초 Rule → 원문 재도전`

UNIT 4 contract fields:
- `slotAnswer`
- `objectAnswer`
- `formAnswer`
- `fallbackRequired`

The five live items are derived practice, not copied textbook questions.

## Content contract

Machine-readable: `data/content-contract.js` version `1.1.0`

Implemented collections: UNIT 1~4.

Semantic CI validates:
- shared fields
- UNIT-specific decision fields
- IDs and answer/choice consistency
- Public-repository source boundary
- banned source-text storage keys

## CI / deployment

Workflow: `.github/workflows/pages.yml`

Deployment gates:
1. JavaScript syntax check
2. Content contract semantic check
3. GitHub Pages deployment

## Still pending, non-blocking

### Phase 13B — physical-device visual confirmation

Needs actual iPad / Galaxy Tab / PC evidence when available. Do not block content expansion without screenshots.

### Phase 14B — live interaction regression confirmation

Still requires direct browser/device confirmation of PIN login, UNIT launches, Home navigation, progress labels, localStorage counters, admin counts, and review mode. If a regression appears, fix the common Shell before changing author-specific logic.

## Next implementation phase

### Phase 17 — PART 1 / CHAPTER 1 / UNIT 5

Topic: `수동태 불가 동사`

Before implementation:
1. inspect textbook UNIT 5 author-method rule and examples
2. define UNIT 5-specific decision schema rather than copying UNIT 4 fields
3. create derived practice only
4. register UNIT 5 in common Shell
5. pass syntax + semantic CI

## New-chat restoration sequence

When user says `JK 5초 다음 작업 진행`:
1. read latest `main`
2. read handoff/status/version
3. check latest Actions / Pages
4. keep physical-device/live-browser confirmation explicitly pending if evidence is unavailable
5. continue Phase 17 UNIT 5

Do not request backup ZIPs while GitHub access works.
