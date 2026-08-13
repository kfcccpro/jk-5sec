# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.25.0-phase25-ch3-unit2`

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
- Phase 24: PART 1 / CHAPTER 3 / UNIT 1 `사역동사 / 지각동사`
- Phase 25: PART 1 / CHAPTER 3 / UNIT 2 `make 출제 유형`
- Phase 25 also repaired the missing common-Shell launcher/registry entry for runtime 12 from Phase 24.

## Current learning content

- PART 1 / CHAPTER 1: UNIT 1~7 implemented
- PART 1 / CHAPTER 2: UNIT 1~4 implemented
- PART 1 / CHAPTER 3: UNIT 1~2 implemented
- Five derived items per lesson
- Total: 65 items

CH 3 · UNIT 2 interaction:
`Cold Attempt → 핵심 동사 → make 출제 유형 → 능동·수동 → 최종 형태 → 5초 Rule → 원문 재도전`

Author-method summary:
- `make + it + O.C + to-V`: 가목적어 it + 진목적어 to-V
- active `make + O + V`: 사역동사의 목적격보어는 동사원형
- `make + O + adjective`: 형용사가 목적격보어
- passive `be made + to-V`: 능동의 동사원형 앞에 to 복원
- perception passive도 같은 원리로 `be seen + to-V`

Files:
- `js/unit13-data.js`
- `js/unit13-engine.js`
- `docs/PHASE25_CH3_UNIT2_ANALYSIS.md`

## Runtime mapping

Runtime lesson IDs remain globally sequential for localStorage compatibility.

- runtime 1~7 = PART 1 / CHAPTER 1 / UNIT 1~7
- runtime 8 = PART 1 / CHAPTER 2 / UNIT 1
- runtime 9 = PART 1 / CHAPTER 2 / UNIT 2
- runtime 10 = PART 1 / CHAPTER 2 / UNIT 3
- runtime 11 = PART 1 / CHAPTER 2 / UNIT 4
- runtime 12 = PART 1 / CHAPTER 3 / UNIT 1
- runtime 13 = PART 1 / CHAPTER 3 / UNIT 2

## Content contract

`data/content-contract.js` version `2.0.0`

CH 3 · UNIT 2 fields:
- `targetVerb`
- `patternAnswer`
- `voiceAnswer`
- `formAnswer`

Semantic CI validates 65 items across 13 implemented lessons and keeps public-source storage reference-only.

## Still pending, non-blocking

- Phase 13B: physical-device visual confirmation
- Phase 14B: live interaction regression confirmation

## Next implementation phase

### Phase 26 — PART 1 / CHAPTER 4 / UNIT 1

Topic: `혼동하기 쉬운 자동사·타동사`

Order:
1. inspect textbook CH 4 UNIT 1 p.38 author-method rule
2. define UNIT-specific decision schema
3. create derived practice only
4. implement runtime lesson 14 engine
5. register CH 4 · UNIT 1 in common Shell
6. pass syntax + semantic CI

When the user says `JK 5초 다음 작업 진행`, `다음 작업 진행`, `다음 단계 진행`, or `진행`, continue Phase 26 from latest `main` without requesting a ZIP while GitHub access works.
