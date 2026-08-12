# Phase 20 — PART 1 / CHAPTER 2 / UNIT 1 분석

## Topic

`본동사 + 표현 + [to-V / ~ing]`

## Source boundary

- Source: 「답이 보이는 5초 영어어법」 PART 1 / CHAPTER 2 / UNIT 1
- Textbook page: 31
- Public repository: source reference-only
- 교재 예문을 Public GitHub에 복제하지 않고 동일 판단 구조의 파생문항만 저장한다.

## 1. 저자식 핵심

이 UNIT은 to부정사/동명사의 일반 이론을 길게 비교하는 단원이 아니다. 빈칸 바로 앞의 **본동사 + 중간 표현**을 하나의 패턴으로 읽고 뒤 형태를 빠르게 결정하는 단원이다.

교재가 제시하는 핵심 패턴은 세 가지다.

1. `spend / waste + 시간·돈 + ~ing`
2. `take + 시간 + to-V`
3. `have difficulty / a problem / a hard time + ~ing`

따라서 판단 순서는 `to-V냐 ~ing냐`부터 시작하지 않는다.

## 2. 5초 판단 순서

`앞 본동사·표현 식별 → 본동사와 빈칸 사이 표현 확인 → 뒤 형태 결정`

### A. spend / waste

시간·돈을 무엇을 하는 데 쓰거나 낭비한다는 구조이면 뒤 행동은 V-ing다.

### B. take + 시간

어떤 행동에 시간이 걸린다는 구조이면 시간 표현 뒤에 to-V가 온다.

### C. difficulty family

`have difficulty`, `have a problem`, `have a hard time` 뒤의 행동은 V-ing로 연결한다.

## 3. Runtime lesson ID와 교재 UNIT 번호

CHAPTER 1에서 runtime lesson ID 1~7을 사용했다. 기존 localStorage 호환성을 유지하기 위해 CHAPTER 2 / UNIT 1은 runtime lesson ID `8`을 사용한다.

표시 계층은 별도로 `PART 1 · CH 2 · UNIT 1`을 유지한다. Content contract의 collection key `8`은 runtime ID이고, collection metadata의 `chapter: 2`, `unit: 1`이 교재 구조를 나타낸다.

## 4. UNIT-specific contract

- `patternAnswer`
  - `spendWaste`
  - `takeTime`
  - `difficultyFamily`
- `bridgeAnswer`
  - `timeMoneyResource`
  - `elapsedTime`
  - `difficultyExpression`
- `formAnswer`
  - `gerundIng`
  - `toInfinitive`

## 5. Derived practice

5개 파생문항:

1. spend + 시간 + V-ing
2. waste + 돈 + V-ing
3. take + 시간 + to-V
4. have difficulty + V-ing
5. have a hard time + V-ing

## 6. Interaction

`Cold Attempt → 앞 표현 식별 → 중간 표현 확인 → to-V/~ing 결정 → 5초 Rule → 원문 재도전`

## 7. Chapter-aware Shell

Phase 20부터 common Shell registry에 `part/chapter/unit` 메타데이터를 추가한다.

- 내부 store.currentUnit은 runtime lesson ID를 유지한다.
- 학생/관리자 화면에는 실제 `CHAPTER · UNIT`을 표시한다.
- 다음 미구현 UNIT 표시는 course-map을 이용해 계산한다.

Phase 13B·14B 실제 기기/브라우저 검증은 증거 확보 전까지 non-blocking pending으로 유지한다.
