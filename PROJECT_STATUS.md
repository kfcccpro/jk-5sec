# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.26.0-phase26-ch4-unit1`

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
- Phase 24~25: PART 1 / CHAPTER 3 UNIT 1~2 complete
- Phase 26: PART 1 / CHAPTER 4 / UNIT 1 `혼동하기 쉬운 자동사·타동사`
- Phase 26 strengthened CI to verify Shell registry/adapters and index script loading for every implemented runtime lesson.

## Current learning content

- PART 1 / CHAPTER 1: UNIT 1~7 implemented
- PART 1 / CHAPTER 2: UNIT 1~4 implemented
- PART 1 / CHAPTER 3: UNIT 1~2 implemented
- PART 1 / CHAPTER 4: UNIT 1 implemented
- Five derived items per lesson
- Total: 70 items

CH 4 · UNIT 1 interaction:
`Cold Attempt → 혼동 동사쌍 → 자동사·타동사 → 의미 → 변화형 → 5초 Rule → 원문 재도전`

Author-method summary:
- rise / raise
- lie / lay + 별도 `lie-lied-lied` 거짓말하다
- sit / seat
- arise / arouse
- 동사쌍의 자동사·타동사 성격, 의미, 변화형을 함께 연결

Files:
- `js/unit14-data.js`
- `js/unit14-engine.js`
- `docs/PHASE26_CH4_UNIT1_ANALYSIS.md`

## Runtime mapping

Runtime lesson IDs remain globally sequential for localStorage compatibility.

- runtime 1~7 = PART 1 / CHAPTER 1 / UNIT 1~7
- runtime 8 = PART 1 / CHAPTER 2 / UNIT 1
- runtime 9 = PART 1 / CHAPTER 2 / UNIT 2
- runtime 10 = PART 1 / CHAPTER 2 / UNIT 3
- runtime 11 = PART 1 / CHAPTER 2 / UNIT 4
- runtime 12 = PART 1 / CHAPTER 3 / UNIT 1
- runtime 13 = PART 1 / CHAPTER 3 / UNIT 2
- runtime 14 = PART 1 / CHAPTER 4 / UNIT 1

## Content contract

`data/content-contract.js` version `2.1.0`

CH 4 · UNIT 1 fields:
- `targetVerb`
- `pairAnswer`
- `transitivityAnswer`
- `meaningAnswer`
- `meaningOptions`
- `formSeriesAnswer`
- `formOptions`

Semantic CI validates 70 items across 14 implemented lessons, keeps public-source storage reference-only, and also verifies Shell/index integration.

## Still pending, non-blocking

- Phase 13B: physical-device visual confirmation
- Phase 14B: live interaction regression confirmation

## Next implementation phase

### Phase 27 — PART 1 / CHAPTER 4 / UNIT 2

Topic: `목적어(명사)에 따른 자동사·타동사 구분`

Order:
1. inspect textbook CH 4 UNIT 2 p.38 author-method rule and p.39 confirmation patterns
2. define UNIT-specific decision schema
3. create derived practice only
4. implement runtime lesson 15 engine
5. register CH 4 · UNIT 2 in common Shell
6. pass syntax + semantic + Shell/index CI

When the user says `JK 5초 다음 작업 진행`, `다음 작업 진행`, `다음 단계 진행`, or `진행`, continue Phase 27 from latest `main` without requesting a ZIP while GitHub access works.
