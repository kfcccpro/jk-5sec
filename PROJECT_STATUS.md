# JK 5SEC Grammar — PROJECT STATUS

## Current version
`v0.32.0-phase32-p2-ch1-unit4`

## Source of truth
- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed
- Phase 1~29: baseline through PART 2 / CHAPTER 1 / UNIT 1
- Phase 30: PART 2 / CHAPTER 1 / UNIT 2 `목적으로 to부정사만을 취하는 타동사`
- Phase 31: PART 2 / CHAPTER 1 / UNIT 3 `to부정사의 숙어 표현`
- Phase 32: PART 2 / CHAPTER 1 / UNIT 4 `목적격 보어로 to부정사만을 취하는 동사`

## Current learning content
- Runtime lessons: 20
- Five derived items per lesson
- Total: 100 derived items
- Public repository source policy remains reference-only.

### Phase 30 loop
`Cold Attempt → 본동사 → 목록 확인 → 목적어 역할 → to-V → 5초 Rule → 재도전`

### Phase 31 loop
`Cold Attempt → 숙어 표현 → 숙어 의미 → 동사 + to-V 패턴 → to-V → 5초 Rule → 재도전`

### Phase 32 loop
`Cold Attempt → 본동사 → 목적어 O 확인 → 목적격 보어 역할 → to-V → 5초 Rule → 재도전`

## Runtime mapping added
- runtime 18 = P2 / CH1 / U2
- runtime 19 = P2 / CH1 / U3
- runtime 20 = P2 / CH1 / U4

## Content contract
`data/content-contract.js` version `2.7.0`

Semantic CI validates 100 items across 20 implemented lessons and verifies source boundary, item schema, runtime ID prefix, answer/choices consistency, common Shell registry/start/adapters, and index loading.

## Key distinction preserved
- UNIT 2: `V + to-V` — to-V is the object.
- UNIT 3: lexical/idiomatic `V + to-V` meaning bundle.
- UNIT 4: `V + O + to-V` — to-V is the object complement.

## Still pending, non-blocking
- Phase 13B: physical-device visual confirmation
- Phase 14B: live interaction regression confirmation

## Next implementation phase
### Phase 33 — PART 2 / CHAPTER 1 / UNIT 5
Topic: `의미상의 주어`

1. inspect textbook p.46 author rule (`for + 목적격` / `of + 목적격` conditions)
2. define UNIT-specific contract
3. create derived practice only
4. implement runtime lesson 21
5. register common Shell/index
6. pass syntax + semantic + integration CI
