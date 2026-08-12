# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.19.0-phase19-unit7`

## Source of truth

- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed

- Phase 1~14A: textbook method, responsive UI, PIN shell, Pages deployment, review architecture, common Shell
- Phase 15: shared + UNIT-specific content/data contract and semantic CI gate
- Phase 16: UNIT 4 `접속사 + V-ing or p.p.`
- Phase 17: UNIT 5 `수동태 불가 동사`
- Phase 18: UNIT 6 `뒤에 두 개의 명사가 오는 수동태`
- Phase 19: UNIT 7 `여러 종류의 수동태`

## Current learning content

PART 1 / CHAPTER 1 UNIT 1~7 implemented.
Each UNIT has five derived items. Total: 35 items.

UNIT 7 interaction:
`Cold Attempt → 보조동사 사슬 → 수동 형태 → p.p. 뒤 확인 → 최종 판정 → 5초 Rule → 원문 재도전`

UNIT 7 author-method summary:
- 진행 수동: be being p.p.
- 완료 수동: have been p.p.
- 조동사 수동: modal + be p.p.
- 조동사 완료 수동: modal + have been p.p.
- 일반 수동 뒤 직접목적어는 원칙적으로 불가하되 UNIT 6의 4·5형식 구조는 예외

Files:
- `js/unit7-data.js`
- `js/unit7-engine.js`
- `docs/PHASE19_UNIT7_ANALYSIS.md`

## Content contract

`data/content-contract.js` version `1.4.0`

UNIT 7 fields:
- `passiveFamilyAnswer`
- `auxiliaryChainAnswer`
- `objectAfterPpAnswer`
- `voiceAnswer`

Semantic CI validates shared fields, UNIT-specific fields, IDs, answer/choice consistency, and public-source boundary.

## Still pending, non-blocking

- Phase 13B: physical-device visual confirmation
- Phase 14B: live interaction regression confirmation

## Next implementation phase

### Phase 20 — PART 1 / CHAPTER 2 / UNIT 1

Topic: `본동사 + ~ + [to-V / ~ing]`

Order:
1. inspect textbook CHAPTER 2 UNIT 1 author-method rule and examples
2. define UNIT-specific decision schema
3. create derived practice only
4. implement engine
5. register next UNIT in common Shell with chapter-aware labeling
6. pass syntax + semantic CI

When the user says `JK 5초 다음 작업 진행`, continue Phase 20 from latest `main` without requesting a ZIP while GitHub access works.
