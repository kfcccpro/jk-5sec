# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.22.0-phase22-ch2-unit3`

## Source of truth

- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed

- Phase 1~14A: textbook method, responsive UI, PIN shell, Pages deployment, review architecture, common Shell
- Phase 15: shared + UNIT-specific content/data contract and semantic CI gate
- Phase 16~19: PART 1 / CHAPTER 1 expansion through UNIT 7
- Phase 20: PART 1 / CHAPTER 2 / UNIT 1
- Phase 21: PART 1 / CHAPTER 2 / UNIT 2 `use의 다양한 형태`
- Phase 22: PART 1 / CHAPTER 2 / UNIT 3 `가목적어를 취하는 동사 M, T, B, F, C`

## Current learning content

- PART 1 / CHAPTER 1: UNIT 1~7 implemented
- PART 1 / CHAPTER 2: UNIT 1~3 implemented
- Five derived items per lesson
- Total: 50 items

CH 2 · UNIT 3 interaction:
`Cold Attempt → M/T/B/F/C 동사 확인 → 가목적어 it → 목적격보어 → 진목적어 to-V/that → 5초 Rule → 원문 재도전`

Author-method summary:
- make / think / believe / find / consider
- 5형식에서 긴 to-V 또는 that절이 목적어이면 가목적어 it을 목적어 자리에 둠
- it 뒤에는 목적격보어, 실제 목적어는 목적격보어 뒤로 이동
- 대표 구조: `M/T/B/F/C + it + 형용사 + to-V / that절`

Files:
- `js/unit10-data.js`
- `js/unit10-engine.js`
- `docs/PHASE22_CH2_UNIT3_ANALYSIS.md`

## Runtime mapping

Runtime lesson IDs remain globally sequential for localStorage compatibility.

- runtime 1~7 = PART 1 / CHAPTER 1 / UNIT 1~7
- runtime 8 = PART 1 / CHAPTER 2 / UNIT 1
- runtime 9 = PART 1 / CHAPTER 2 / UNIT 2
- runtime 10 = PART 1 / CHAPTER 2 / UNIT 3

## Content contract

`data/content-contract.js` version `1.7.0`

CH 2 · UNIT 3 fields:
- `targetVerb`
- `dummyObjectAnswer`
- `complementAnswer`
- `realObjectAnswer`

Semantic CI validates 50 items across 10 implemented lessons and keeps public-source storage reference-only.

## Still pending, non-blocking

- Phase 13B: physical-device visual confirmation
- Phase 14B: live interaction regression confirmation

## Next implementation phase

### Phase 23 — PART 1 / CHAPTER 2 / UNIT 4

Topic: `형용사 보어가 필요한 동사`

Order:
1. inspect textbook CH 2 UNIT 4 p.34 author-method rule
2. define UNIT-specific decision schema
3. create derived practice only
4. implement runtime lesson 11 engine
5. register CH 2 · UNIT 4 in common Shell
6. pass syntax + semantic CI

When the user says `JK 5초 다음 작업 진행`, `다음 단계 진행`, or `진행`, continue Phase 23 from latest `main` without requesting a ZIP while GitHub access works.
