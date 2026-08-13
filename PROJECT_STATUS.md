# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.23.0-phase23-ch2-unit4`

## Source of truth

- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed

- Phase 1~14A: textbook method, responsive UI, PIN shell, Pages deployment, review architecture, common Shell
- Phase 15: shared + UNIT-specific content/data contract and semantic CI gate
- Phase 16~19: PART 1 / CHAPTER 1 expansion through UNIT 7
- Phase 20~23: PART 1 / CHAPTER 2 UNIT 1~4 complete

## Current learning content

- PART 1 / CHAPTER 1: UNIT 1~7 implemented
- PART 1 / CHAPTER 2: UNIT 1~4 implemented
- Five derived items per lesson
- Total: 55 items

CH 2 · UNIT 4 interaction:
`Cold Attempt → 감각동사 확인 → 2형식 판정 → 주격보어 확인 → 형용사/부사 판정 → 5초 Rule → 원문 재도전`

Author-method summary:
- 감각동사: feel / look / smell / sound / taste
- 감각동사가 주어의 상태·인상을 이어 주면 2형식
- 뒤는 주격보어 자리
- 주격보어에는 부사가 아니라 형용사를 사용

Files:
- `js/unit11-data.js`
- `js/unit11-engine.js`
- `docs/PHASE23_CH2_UNIT4_ANALYSIS.md`

## Runtime mapping

Runtime lesson IDs remain globally sequential for localStorage compatibility.

- runtime 1~7 = PART 1 / CHAPTER 1 / UNIT 1~7
- runtime 8 = PART 1 / CHAPTER 2 / UNIT 1
- runtime 9 = PART 1 / CHAPTER 2 / UNIT 2
- runtime 10 = PART 1 / CHAPTER 2 / UNIT 3
- runtime 11 = PART 1 / CHAPTER 2 / UNIT 4

## Content contract

`data/content-contract.js` version `1.8.0`

CH 2 · UNIT 4 fields:
- `sensoryVerb`
- `linkingAnswer`
- `complementRoleAnswer`
- `formAnswer`

Semantic CI validates 55 items across 11 implemented lessons and keeps public-source storage reference-only.

## Still pending, non-blocking

- Phase 13B: physical-device visual confirmation
- Phase 14B: live interaction regression confirmation

## Next implementation phase

### Phase 24 — PART 1 / CHAPTER 3 / UNIT 1

Topic: `사역동사 / 지각동사`

Order:
1. inspect textbook CH 3 UNIT 1 p.35 author-method rule
2. define UNIT-specific decision schema
3. create derived practice only
4. implement runtime lesson 12 engine
5. register CH 3 · UNIT 1 in common Shell
6. pass syntax + semantic CI

When the user says `JK 5초 다음 작업 진행`, `다음 작업 진행`, `다음 단계 진행`, or `진행`, continue Phase 24 from latest `main` without requesting a ZIP while GitHub access works.
