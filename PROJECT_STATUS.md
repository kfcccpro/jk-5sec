# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.20.0-phase20-ch2-unit1`

## Source of truth

- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed

- Phase 1~14A: textbook method, responsive UI, PIN shell, Pages deployment, review architecture, common Shell
- Phase 15: shared + UNIT-specific content/data contract and semantic CI gate
- Phase 16~19: PART 1 / CHAPTER 1 UNIT 4~7 expansion
- Phase 20: PART 1 / CHAPTER 2 / UNIT 1 `본동사 + 표현 + [to-V / ~ing]`

## Current learning content

- PART 1 / CHAPTER 1: UNIT 1~7 implemented
- PART 1 / CHAPTER 2: UNIT 1 implemented
- Five derived items per lesson
- Total: 40 items

CH 2 · UNIT 1 interaction:
`Cold Attempt → 앞 표현 식별 → 중간 표현 확인 → to-V/~ing 결정 → 5초 Rule → 원문 재도전`

Author-method summary:
- spend/waste + 시간·돈 + V-ing
- take + 시간 + to-V
- have difficulty / a problem / a hard time + V-ing

Files:
- `js/unit8-data.js`
- `js/unit8-engine.js`
- `docs/PHASE20_CH2_UNIT1_ANALYSIS.md`

## Chapter-aware runtime mapping

Runtime lesson IDs remain globally sequential for localStorage compatibility.

- runtime 1~7 = PART 1 / CHAPTER 1 / UNIT 1~7
- runtime 8 = PART 1 / CHAPTER 2 / UNIT 1

Common Shell now stores `part/chapter/unit` metadata separately and renders the textbook hierarchy rather than displaying runtime ID as the UNIT number.

## Content contract

`data/content-contract.js` version `1.5.0`

CH 2 · UNIT 1 fields:
- `patternAnswer`
- `bridgeAnswer`
- `formAnswer`

Validator now uses the collection key as runtime ID while reporting the actual PART/CHAPTER/UNIT metadata.

## Still pending, non-blocking

- Phase 13B: physical-device visual confirmation
- Phase 14B: live interaction regression confirmation

## Next implementation phase

### Phase 21 — PART 1 / CHAPTER 2 / UNIT 2

Topic: `use의 다양한 형태`

Order:
1. inspect textbook CH 2 UNIT 2 author-method rule
2. define UNIT-specific decision schema
3. create derived practice only
4. implement runtime lesson 9 engine
5. register CH 2 · UNIT 2 in chapter-aware common Shell
6. pass syntax + semantic CI

When the user says `JK 5초 다음 작업 진행` or `진행`, continue Phase 21 from latest `main` without requesting a ZIP while GitHub access works.
