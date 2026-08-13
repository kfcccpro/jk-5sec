# JK 5SEC Grammar — PROJECT STATUS

## Current version
`v0.29.0-phase29-p2-ch1-unit1`

## Source of truth
- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed
- Phase 1~14A: base app, responsive UI, PIN shell, Pages, review architecture, common Shell
- Phase 15: content contract + semantic CI
- Phase 16~26: PART 1 through CHAPTER 4 UNIT 1
- Phase 27: PART 1 / CHAPTER 4 / UNIT 2 `목적어(명사)에 따른 자동사·타동사 구분`
- Phase 28: PART 1 / CHAPTER 5 `감정동사`
- Phase 29: PART 2 / CHAPTER 1 / UNIT 1 `본동사 자리인지 준동사 자리인지부터 판단`

## Current learning content
- Runtime lessons: 17
- Five derived items per lesson
- Total: 85 derived items
- Public repository source policy remains reference-only.

### Phase 27 loop
`Cold Attempt → 핵심 동사 → 명사 연결 방식 → 자동사·타동사 → 전치사 필요 여부 → 5초 Rule → 재도전`

### Phase 28 loop
`Cold Attempt → 감정동사 → 감정 원인/경험자 → 문장 자리 → V-ing/p.p. → 5초 Rule → 재도전`

### Phase 29 loop
`Cold Attempt → 본동사 유무 → 본동사/준동사 자리 → 문장 역할 → 최종 형태 → 5초 Rule → 재도전`

## Runtime mapping added
- runtime 15 = P1 / CH4 / U2
- runtime 16 = P1 / CH5 / chapter-level lesson (unit metadata 0)
- runtime 17 = P2 / CH1 / U1

## Content contract
`data/content-contract.js` version `2.4.0`

Semantic CI validates 85 items across 17 implemented lessons and verifies source boundary, item schema, runtime ID prefix, answer/choices consistency, common Shell registry/start/adapters, and index loading.

## UI integration change
Because PART 2 restarts CHAPTER numbering, student and admin lesson labels now include `PART` explicitly to avoid duplicate `CH 1` ambiguity.

## Still pending, non-blocking
- Phase 13B: physical-device visual confirmation
- Phase 14B: live interaction regression confirmation

## Next implementation phase
### Phase 30 — PART 2 / CHAPTER 1 / UNIT 2
Topic: `목적어로 to부정사만을 취하는 타동사`

1. inspect textbook p.44 author list and decision rule
2. define UNIT-specific contract
3. create derived practice only
4. implement runtime lesson 18
5. register common Shell/index
6. pass syntax + semantic + integration CI
