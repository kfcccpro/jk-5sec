# JK 5SEC Grammar — PROJECT STATUS

## Current version
`v0.33.0-phase33-p2-ch1-unit5`

## Source of truth
- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed
- Phase 1~32: baseline through PART 2 / CHAPTER 1 / UNIT 4
- Phase 33: PART 2 / CHAPTER 1 / UNIT 5 `의미상의 주어`

## Current learning content
- Runtime lessons: 21
- Five derived items per lesson
- Total: 105 derived items
- Public repository source policy remains reference-only.

### Phase 33 loop
`Cold Attempt → 형용사 확인 → 사람의 성질·태도 평가 여부 → of/for 의미상 주어 → 5초 Rule → 재도전`

## Runtime mapping added
- runtime 21 = P2 / CH1 / U5

## Content contract
`data/content-contract.js` version `2.8.0`

Semantic CI target is now 105 items across 21 implemented lessons and verifies source boundary, item schema, runtime ID prefix, answer/choices consistency, common Shell registry/start/adapters, and index loading.

## Key distinction preserved
- 사람의 성질·태도를 평가하는 형용사: `of + 목적격`
- 일반 조건·상황·난이도 등을 나타내는 형용사: `for + 목적격`

## Still pending, non-blocking
- Phase 13B: physical-device visual confirmation
- Phase 14B: live interaction regression confirmation

## Next implementation phase
### Phase 34 — PART 2 / CHAPTER 1 / UNIT 6
Topic: `to부정사의 부정`

1. inspect textbook author rule in the next source unit
2. define UNIT-specific decision contract
3. create five derived practice items
4. implement runtime lesson 22
5. register common Shell/index/content contract
6. pass syntax + semantic + integration CI
