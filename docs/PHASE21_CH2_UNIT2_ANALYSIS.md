# Phase 21 — PART 1 / CHAPTER 2 / UNIT 2 분석

## Topic

`use의 다양한 형태`

## Source boundary

- Source: 「답이 보이는 5초 영어어법」 PART 1 / CHAPTER 2 / UNIT 2
- Textbook page: 32
- Public repository: source reference-only
- 교재 예문·확인문제를 Public GitHub에 복제하지 않고 동일 판정 규칙의 파생문항만 저장한다.

## 1. 저자식 핵심

교재는 겉모양이 비슷한 `used to`를 세 구조로 구분한다.

1. 사물주어 + `be used to V`: '~하는 데 사용되다'
2. 사람주어 + `be used to V-ing`: '~하는 데 익숙하다' (= be accustomed to V-ing)
3. `used to V`: '~하곤 했다'라는 과거 습관

핵심은 `to`만 보고 동사원형/V-ing를 결정하지 않는 것이다. 먼저 주어와 be동사 유무를 확인해야 한다.

## 2. 5초 판단 순서

`주어가 사람/사물인지 확인 → be 유무 확인 → 의미 결정 → 동사원형/V-ing 결정`

### A. 사물주어 + be used to V

사물·방법이 어떤 목적에 '사용된다'는 뜻이면 `to`는 목적을 나타내는 to부정사의 일부다. 뒤에는 동사원형이 온다.

### B. 사람주어 + be used to V-ing

사람이 어떤 행동에 '익숙하다'는 뜻이면 `to`는 전치사다. 뒤에는 명사 역할의 V-ing가 온다.

### C. used to V

be 없이 `used to`가 쓰이고 과거의 반복 습관을 나타내면 뒤에는 동사원형이 온다.

## 3. Runtime lesson mapping

- runtime 9 = PART 1 / CHAPTER 2 / UNIT 2
- 기존 runtime 1~8 localStorage와 호환성을 유지한다.
- 학생·관리자 화면은 runtime ID가 아니라 `CH 2 · UNIT 2`를 표시한다.

## 4. UNIT-specific contract

- `subjectTypeAnswer`
  - `thingSubject`
  - `personSubject`
- `beAnswer`
  - `bePresent`
  - `beAbsent`
- `meaningAnswer`
  - `purposeUse`
  - `accustomed`
  - `pastHabit`
- `formAnswer`
  - `baseVerb`
  - `gerundIng`

## 5. Derived practice

5개 파생문항:

1. 사물주어 + be used to + 동사원형
2. 방법주어 + be used to + 동사원형
3. 사람주어 + be used to + V-ing
4. 사람집단 주어 + be used to + V-ing
5. used to + 동사원형의 과거 습관

## 6. Interaction

`Cold Attempt → 주어 확인 → be 유무 → use 의미 → 뒤 형태 → 5초 Rule → 원문 재도전`

Phase 13B·14B 실제 기기/브라우저 검증은 직접 증거 확보 전까지 non-blocking pending으로 유지한다.
