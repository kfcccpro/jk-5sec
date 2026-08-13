# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.24.0-phase24-ch3-unit1`

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

## Current learning content

- PART 1 / CHAPTER 1: UNIT 1~7 implemented
- PART 1 / CHAPTER 2: UNIT 1~4 implemented
- PART 1 / CHAPTER 3: UNIT 1 implemented
- Five derived items per lesson
- Total: 60 items

CH 3 · UNIT 1 interaction:
`Cold Attempt → 핵심 동사 → 동사 종류 → O-O.C 관계 → 목적격보어 형태 → 5초 Rule → 원문 재도전`

Author-method summary:
- 사역동사 make/have/let + 능동 O-O.C → 동사원형
- get + 능동 O-O.C → to-V
- help + 능동 O-O.C → 동사원형 또는 to-V
- 지각동사 + 능동 O-O.C → 동사원형 또는 V-ing
- O-O.C가 수동관계이면 앞 동사 종류와 관계없이 p.p.

Files:
- `js/unit12-data.js`
- `js/unit12-engine.js`
- `docs/PHASE24_CH3_UNIT1_ANALYSIS.md`

## Runtime mapping

Runtime lesson IDs remain globally sequential for localStorage compatibility.

- runtime 1~7 = PART 1 / CHAPTER 1 / UNIT 1~7
- runtime 8 = PART 1 / CHAPTER 2 / UNIT 1
- runtime 9 = PART 1 / CHAPTER 2 / UNIT 2
- runtime 10 = PART 1 / CHAPTER 2 / UNIT 3
- runtime 11 = PART 1 / CHAPTER 2 / UNIT 4
- runtime 12 = PART 1 / CHAPTER 3 / UNIT 1

## Content contract

`data/content-contract.js` version `1.9.0`

CH 3 · UNIT 1 fields:
- `targetVerb`
- `familyAnswer`
- `relationAnswer`
- `complementFormAnswer`

Semantic CI validates 60 items across 12 implemented lessons and keeps public-source storage reference-only.

## Still pending, non-blocking

- Phase 13B: physical-device visual confirmation
- Phase 14B: live interaction regression confirmation

## Next implementation phase

### Phase 25 — PART 1 / CHAPTER 3 / UNIT 2

Topic: `make 출제 유형`

Order:
1. inspect textbook CH 3 UNIT 2 p.37 author-method rule
2. define UNIT-specific decision schema
3. create derived practice only
4. implement runtime lesson 13 engine
5. register CH 3 · UNIT 2 in common Shell
6. pass syntax + semantic CI

When the user says `JK 5초 다음 작업 진행`, `다음 작업 진행`, `다음 단계 진행`, or `진행`, continue Phase 25 from latest `main` without requesting a ZIP while GitHub access works.
