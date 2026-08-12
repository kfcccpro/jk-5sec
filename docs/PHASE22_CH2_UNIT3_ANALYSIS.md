# Phase 22 — PART 1 / CHAPTER 2 / UNIT 3 분석

## Topic

`가목적어를 취하는 동사 M, T, B, F, C`

## Source boundary

- Source: 「답이 보이는 5초 영어어법」 PART 1 / CHAPTER 2 / UNIT 3
- Textbook page: 33
- Public repository: source reference-only
- 교재 예문·확인문제는 Public GitHub에 복제하지 않고 동일 판단 구조의 파생문항만 저장한다.

## 1. 저자식 핵심

교재가 묶는 동사는 다음 다섯 개다.

- M: make
- T: think
- B: believe
- F: find
- C: consider

이 동사들은 여러 용법을 가질 수 있지만, **목적어 + 목적격보어의 5형식에서 실제 목적어가 긴 to-V 또는 that절일 때** 긴 목적어를 뒤로 보내고 목적어 자리에 가목적어 `it`을 둔다.

핵심 구조:

`M/T/B/F/C + it + 목적격보어(주로 형용사) + to-V / that절`

## 2. 5초 판단 순서

`M/T/B/F/C 확인 → 목적어 자리에 it → it 뒤 목적격보어 → 진목적어 to-V/that절`

### A. 가목적어 it

긴 to-V 또는 that절을 목적어 자리에 그대로 두지 않고 `it`으로 먼저 받는다.

### B. 목적격보어

`it` 뒤에는 목적어를 설명하는 목적격보어가 오며, 교재의 대표 출제는 형용사/부사 구별이다. 따라서 `easy/easily`처럼 보이면 목적격보어 자리라는 이유로 형용사를 선택한다.

### C. 진목적어

실제 내용은 목적격보어 뒤의 `to-V` 또는 `that절`이 담당한다.

## 3. Runtime mapping

- runtime 1~7 = P1 / CH1 / U1~7
- runtime 8 = P1 / CH2 / U1
- runtime 9 = P1 / CH2 / U2
- runtime 10 = P1 / CH2 / U3

기존 localStorage 호환성을 위해 전역 runtime lesson ID를 유지하고 화면에는 `PART 1 · CH 2 · UNIT 3`을 표시한다.

## 4. UNIT-specific contract

- `targetVerb`
- `dummyObjectAnswer`
  - `dummyIt`
  - `ordinaryObject`
- `complementAnswer`
  - `adjectiveComplement`
  - `adverbial`
- `realObjectAnswer`
  - `toInfinitive`
  - `thatClause`

## 5. Derived practice

교재 문장을 복제하지 않고 다섯 동사별 파생문항을 1개씩 둔다.

1. make — 가목적어 it 선택
2. find — 형용사 목적격보어 선택
3. think — that절 진목적어
4. believe — 가목적어 it + to-V
5. consider — 형용사 목적격보어 + to-V

## 6. Interaction

`Cold Attempt → M/T/B/F/C 동사 확인 → 가목적어 it → 목적격보어 → 진목적어 to-V/that → 5초 Rule → 원문 재도전`

단계별 판단이 모두 맞고 재도전 정답까지 맞을 때 `MASTERED_NOW`, 재도전에서 교정되면 `REPAIRED`, 재도전도 틀리면 `UNRESOLVED`로 기록한다.

Phase 13B physical-device visual confirmation과 Phase 14B live interaction regression은 실제 증거 확보 전까지 non-blocking pending으로 유지한다.
