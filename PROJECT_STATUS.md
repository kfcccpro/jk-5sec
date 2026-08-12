# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.18.0-phase18-unit6`

## Source of truth

- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed

- Phase 1~14A: textbook method, UNIT 1~3, responsive UI, PIN shell, Pages deployment, review architecture, common Shell
- Phase 15: shared + UNIT-specific content/data contract and semantic CI gate
- Phase 16: UNIT 4 `접속사 + V-ing or p.p.`
- Phase 17: UNIT 5 `수동태 불가 동사`
- Phase 18: UNIT 6 `뒤에 두 개의 명사가 오는 수동태`

## Current learning content

Implemented UNIT 1~6, five derived items each, total 30 items.

UNIT 6 interaction:
`Cold Attempt → 4·5형식 구분 → 남은 명사 역할 → 수동태 판정 → 5초 Rule → 원문 재도전`

UNIT 6 author-method summary:
- 4형식 수동태: 한 목적어가 주어가 되고 다른 목적어가 남을 수 있음
- 5형식 수동태: 목적어가 주어가 되고 원래 목적격보어가 주어를 설명하는 보어로 남음
- `be + p.p.` 뒤 명사가 있다는 이유만으로 수동태를 배제하지 않음

Files:
- `js/unit6-data.js`
- `js/unit6-engine.js`
- `docs/PHASE18_UNIT6_ANALYSIS.md`

## Content contract

`data/content-contract.js` version `1.3.0`

UNIT 6 fields:
- `targetVerb`
- `patternAnswer`
- `remainingRoleAnswer`
- `passiveAnswer`

Semantic CI validates shared fields, UNIT-specific fields, IDs, answer/choice consistency, and public-source boundary.

## Still pending, non-blocking

- Phase 13B: physical-device visual confirmation
- Phase 14B: live interaction regression confirmation

These remain pending until actual iPad / Galaxy Tab / PC or direct-browser evidence is available; they do not block content expansion.

## Next implementation phase

### Phase 19 — PART 1 / CHAPTER 1 / UNIT 7

Topic: `여러 종류의 수동태`

Order:
1. inspect textbook UNIT 7 author-method rules
2. define UNIT 7-specific decision schema
3. create derived practice only
4. implement UNIT 7 engine
5. register UNIT 7 in common Shell
6. pass syntax + semantic CI

When the user says `JK 5초 다음 작업 진행`, continue Phase 19 from latest `main` without requesting a ZIP while GitHub access works.
