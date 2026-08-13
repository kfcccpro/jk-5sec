# Phase 26 — PART 1 / CHAPTER 4 / UNIT 1 분석

## Topic

`혼동하기 쉬운 자동사·타동사`

## Source boundary

- Source: 「답이 보이는 5초 영어어법」 PART 1 / CHAPTER 4 / UNIT 1
- Textbook page: 38
- Public repository: source reference-only
- 교재 예문·확인문제는 Public GitHub에 복제하지 않고 동일 판단 구조의 파생문항만 저장한다.

## 1. 저자식 핵심 묶음

UNIT 1은 문장 속 목적어 유무를 판정하기 전에, 자주 혼동되는 자동사·타동사의 **의미와 변화형을 한 묶음으로 기억하는 단원**이다.

- `rise` 자동사 — rise / rose / risen — 오르다
- `raise` 타동사 — raise / raised / raised — ~을 올리다
- `lie` 자동사 — lie / lay / lain — 놓여 있다
- `lay` 타동사 — lay / laid / laid — ~을 놓다
- `lie` 자동사 — lie / lied / lied — 거짓말하다
- `sit` 자동사 — sit / sat / sat — 앉다
- `seat` 타동사 — seat / seated / seated — ~을 앉히다
- `arise` 자동사 — arise / arose / arisen — 발생하다
- `arouse` 타동사 — arouse / aroused / aroused — ~을 불러 일으키다

## 2. 5초 판단 순서

`혼동 동사쌍 확인 → 자동사·타동사 성격 → 핵심 의미 → 변화형`

이 UNIT에서는 단순히 현재형 철자만 비교하지 않는다. 특히 `lie`는 '놓여 있다'와 '거짓말하다'가 같은 현재형이지만 변화형이 다르므로 **의미 → 변화형** 연결이 중요하다.

## 3. UNIT 2와의 역할 분리

같은 p.38의 UNIT 2는 `목적어(명사)가 없으면 자동사 / 있으면 타동사`라는 문장 구조 판정 규칙을 적용한다. Phase 26은 그 규칙을 선행 구현하지 않고, UNIT 1의 동사쌍·의미·변화형 기억에 집중한다.

## 4. Runtime mapping

- runtime 1~7 = P1 / CH1 / U1~7
- runtime 8 = P1 / CH2 / U1
- runtime 9 = P1 / CH2 / U2
- runtime 10 = P1 / CH2 / U3
- runtime 11 = P1 / CH2 / U4
- runtime 12 = P1 / CH3 / U1
- runtime 13 = P1 / CH3 / U2
- runtime 14 = P1 / CH4 / U1

## 5. UNIT-specific contract

- `targetVerb`
- `pairAnswer`
- `transitivityAnswer`
  - `intransitive`
  - `transitive`
- `meaningAnswer`
- `meaningOptions`
- `formSeriesAnswer`
- `formOptions`

## 6. Derived practice

교재 원문을 복제하지 않고 다음 5개 판별 가족을 사용한다.

1. rise / raise
2. lie / lay
3. lie-lied-lied / lie-lay-lain
4. sit / seat
5. arise / arouse

## 7. Interaction

`Cold Attempt → 혼동 동사쌍 → 자동사·타동사 → 의미 → 변화형 → 5초 Rule → 원문 재도전`

단계별 판단이 모두 맞고 재도전 정답까지 맞을 때 `MASTERED_NOW`, 재도전에서 교정되면 `REPAIRED`, 재도전도 틀리면 `UNRESOLVED`로 기록한다.

## 8. Integration CI 강화

Phase 24에서 데이터·엔진은 있었지만 공통 Shell 등록이 누락된 사례를 재발 방지하기 위해, Phase 26부터 semantic CI가 구현된 모든 runtime lesson에 대해 다음도 검증한다.

- common Shell `unitRegistry` 등록
- `startUnitN` 등록
- common Shell adapter 등록
- `index.html`의 data/engine script 로딩

Phase 13B physical-device visual confirmation과 Phase 14B live interaction regression은 실제 증거 확보 전까지 non-blocking pending으로 유지한다.
