# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.21.0-phase21-ch2-unit2`

## Source of truth

- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed

- Phase 1~14A: textbook method, responsive UI, PIN shell, Pages deployment, review architecture, common Shell
- Phase 15: shared + UNIT-specific content/data contract and semantic CI gate
- Phase 16~19: PART 1 / CHAPTER 1 expansion through UNIT 7
- Phase 20: PART 1 / CHAPTER 2 / UNIT 1 `본동사 + 표현 + [to-V / ~ing]`
- Phase 21: PART 1 / CHAPTER 2 / UNIT 2 `use의 다양한 형태`

## Current learning content

- PART 1 / CHAPTER 1: UNIT 1~7 implemented
- PART 1 / CHAPTER 2: UNIT 1~2 implemented
- Five derived items per lesson
- Total: 45 items

CH 2 · UNIT 2 interaction:
`Cold Attempt → 주어 확인 → be 유무 → use 의미 → 뒤 형태 → 5초 Rule → 원문 재도전`

Author-method summary:
- 사물주어 + be used to V = ~하는 데 사용되다
- 사람주어 + be used to V-ing = ~하는 데 익숙하다
- used to V = ~하곤 했다

Files:
- `js/unit9-data.js`
- `js/unit9-engine.js`
- `docs/PHASE21_CH2_UNIT2_ANALYSIS.md`

## Chapter-aware runtime mapping

- runtime 1~7 = PART 1 / CHAPTER 1 / UNIT 1~7
- runtime 8 = PART 1 / CHAPTER 2 / UNIT 1
- runtime 9 = PART 1 / CHAPTER 2 / UNIT 2

## Content contract

`data/content-contract.js` version `1.6.0`

CH 2 · UNIT 2 fields:
- `subjectTypeAnswer`
- `beAnswer`
- `meaningAnswer`
- `formAnswer`

Semantic CI validates shared fields, lesson-specific decision fields, runtime ID prefixes, answer/choice consistency, and public-source boundary.

## Still pending, non-blocking

- Phase 13B: physical-device visual confirmation
- Phase 14B: live interaction regression confirmation

## Next implementation phase

### Phase 22 — PART 1 / CHAPTER 2 / UNIT 3

Topic: `가목적어를 취하는 동사 M, T, B, F, C`

Order:
1. inspect textbook p.33 author-method rule
2. define UNIT-specific decision schema
3. create derived practice only
4. implement runtime lesson 10 engine
5. register CH 2 · UNIT 3 in common Shell
6. pass syntax + semantic CI

When the user says `JK 5초 다음 작업 진행` or `진행`, continue Phase 22 from latest `main` without requesting a ZIP while GitHub access works.
