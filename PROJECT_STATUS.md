# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.17.0-phase17-unit5`

## Source of truth

- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed

- Phase 1~14A: textbook method, UNIT 1~3, responsive UI, PIN shell, Pages deployment, review architecture, 1001 visual baseline, common Shell
- Phase 15: shared + UNIT-specific content/data contract and semantic CI gate
- Phase 16: UNIT 4 `접속사 + V-ing or p.p.`
- Phase 17: UNIT 5 `수동태 불가 동사`

## Current learning content

Implemented:
- UNIT 1: connector/relative-clause count → finite/nonfinite slot
- UNIT 2: slot → object → active/passive for V-ing/p.p.
- UNIT 3: slot → object relevance → p.p./be+p.p./active past
- UNIT 4: conjunction-retained reduced clause → object shortcut → V-ing/p.p.; subject-relation fallback
- UNIT 5: passive-ban group → contextual transitivity → passive availability

Next textbook unit:
- PART 1 / CHAPTER 1 / UNIT 6: `뒤에 두 개의 명사가 오는 수동태`

## Phase 17 UNIT 5

Textbook source verified from uploaded OCR:
- PART 1 / CHAPTER 1 / UNIT 5, textbook page 26

Files:
- `js/unit5-data.js`
- `js/unit5-engine.js`
- `docs/PHASE17_UNIT5_ANALYSIS.md`

Interaction:
`Cold Attempt → 동사 부류 → 자·타 용법 → 수동태 가능 여부 → 5초 Rule → 원문 재도전`

UNIT 5 contract fields:
- `targetVerb`
- `groupAnswer`
- `usageAnswer`
- `formAnswer`

Five live items are derived practice and do not copy the textbook check questions.

## Content contract

Machine-readable: `data/content-contract.js` version `1.2.0`

Implemented collections: UNIT 1~5.

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

### Phase 18 — PART 1 / CHAPTER 1 / UNIT 6

Topic: `뒤에 두 개의 명사가 오는 수동태`

Order:
1. inspect textbook UNIT 6 author-method rule and examples
2. define UNIT 6-specific decision schema
3. create derived practice only
4. implement UNIT 6 engine
5. register UNIT 6 in common Shell
6. pass syntax + semantic CI
7. keep direct-device regression pending unless evidence is available

## New-chat restoration sequence

When user says `JK 5초 다음 작업 진행`:
1. read latest `main`
2. read handoff/status/version
3. check latest Actions / Pages
4. keep physical-device/live-browser confirmation pending if evidence is unavailable
5. continue Phase 18 UNIT 6

Do not request backup ZIPs while GitHub access works.
