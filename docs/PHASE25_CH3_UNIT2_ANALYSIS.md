# Phase 25 — PART 1 / CHAPTER 3 / UNIT 2 분석

## Topic

`make 출제 유형`

## Source boundary

- Source: 「답이 보이는 5초 영어어법」 PART 1 / CHAPTER 3 / UNIT 2
- Textbook page: 37
- Public repository: source reference-only
- 교재 예문·확인문제는 Public GitHub에 복제하지 않고 동일 판단 구조의 파생문항만 저장한다.

## 1. 저자식 핵심 4유형

### A. 가목적어 it

`make + it + O.C + to-V`

긴 to-V 진목적어를 뒤로 보내고 목적어 자리에 가목적어 `it`을 둔다.

### B. 사역동사 make

`make + O + 동사원형`

능동태에서 목적어가 뒤 행동의 주체이면 목적격보어는 동사원형이다.

### C. make + O + 형용사

make는 목적어의 상태를 설명하는 형용사를 목적격보어로 취할 수 있다. 형용사/부사가 경쟁하면 목적격보어 자리이므로 형용사를 고른다.

### D. 사역·지각동사의 수동태

능동태에서 목적격보어로 동사원형을 취하던 사역동사·지각동사가 수동태가 되면 동사원형 앞에 `to`가 복원되어 `to-V`가 된다.

- active: make/see + O + V
- passive: O + be made/seen + to-V

## 2. 5초 판단 순서

`핵심 동사 확인 → 4개 출제 유형 판정 → 능동/수동 확인 → 최종 형태 결정`

특히 수동태에서는 직전 UNIT의 “사역동사 → 동사원형” 규칙을 그대로 적용하지 않고 `to-V` 복원 여부를 다시 확인한다.

## 3. Runtime mapping

- runtime 1~7 = P1 / CH1 / U1~7
- runtime 8 = P1 / CH2 / U1
- runtime 9 = P1 / CH2 / U2
- runtime 10 = P1 / CH2 / U3
- runtime 11 = P1 / CH2 / U4
- runtime 12 = P1 / CH3 / U1
- runtime 13 = P1 / CH3 / U2

## 4. UNIT-specific contract

- `targetVerb`
- `patternAnswer`
  - `dummyItToInf`
  - `activeCausativeBare`
  - `adjectiveComplement`
  - `passiveBareToTo`
- `voiceAnswer`
  - `active`
  - `passive`
- `formAnswer`
  - `dummyIt`
  - `baseVerb`
  - `adjective`
  - `toInfinitive`

## 5. Derived practice

교재 원문을 복제하지 않고 다음 5개 분기를 파생문항으로 구성한다.

1. make + it + O.C + to-V
2. 능동 make + O + 동사원형
3. make + O + 형용사
4. 수동 be made + to-V
5. 수동 be seen + to-V

## 6. Interaction

`Cold Attempt → 핵심 동사 → make 출제 유형 → 능동·수동 → 최종 형태 → 5초 Rule → 원문 재도전`

단계별 판단이 모두 맞고 재도전 정답까지 맞을 때 `MASTERED_NOW`, 재도전에서 교정되면 `REPAIRED`, 재도전도 틀리면 `UNRESOLVED`로 기록한다.

## 7. Phase 24 shell registration correction

Phase 24에서 `unit12-data.js`, `unit12-engine.js`, index 로딩, content contract는 반영되었으나 공통 Shell `unitRegistry`에 runtime 12 등록이 빠져 학생 홈에서 UNIT 12 실행 버튼이 노출되지 않는 상태였다. Phase 25에서 runtime 12와 13을 함께 공통 Shell에 등록해 복구한다.

Phase 13B physical-device visual confirmation과 Phase 14B live interaction regression은 실제 증거 확보 전까지 non-blocking pending으로 유지한다.
