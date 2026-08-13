# Phase 24 — PART 1 / CHAPTER 3 / UNIT 1 분석

## Topic

`사역동사 / 지각동사`

## Source boundary

- Source: 「답이 보이는 5초 영어어법」 PART 1 / CHAPTER 3 / UNIT 1
- Textbook page: 35
- Public repository: source reference-only
- 교재 예문·확인문제는 Public GitHub에 복제하지 않고 동일 판단 구조의 파생문항만 저장한다.

## 1. 저자식 핵심

교재는 5형식 `S + V + O + O.C`에서 먼저 핵심 동사를 세 분류로 묶는다.

- 사역동사: make / have / let
- 준사역동사: get / help
- 지각동사: see / watch / hear / touch / listen to 등
- taste / feel / smell은 문맥에 따라 2형식 감각동사와 5형식 지각동사로 모두 쓰일 수 있다.

그 다음 목적어(O)와 목적격보어(O.C)의 관계가 능동인지 수동인지 판단한다.

## 2. 목적격보어 분기

### A. O-O.C가 능동관계

- 사역동사 make / have / let → 동사원형
- 준사역동사 get → to-V
- 준사역동사 help → 동사원형 또는 to-V
- 지각동사 → 동사원형 또는 V-ing

### B. O-O.C가 수동관계

앞 동사가 사역·준사역·지각 중 무엇이든 목적격보어는 p.p.로 판단한다.

## 3. 5초 판단 순서

`핵심 동사 확인 → 사역/준사역/지각 분류 → O-O.C 능동·수동 관계 → 목적격보어 형태`

단순히 “사역동사 뒤 동사원형”으로 암기하지 않고, 수동관계이면 p.p.가 우선한다는 분기를 반드시 거친다.

## 4. Runtime mapping

- runtime 1~7 = P1 / CH1 / U1~7
- runtime 8 = P1 / CH2 / U1
- runtime 9 = P1 / CH2 / U2
- runtime 10 = P1 / CH2 / U3
- runtime 11 = P1 / CH2 / U4
- runtime 12 = P1 / CH3 / U1

기존 localStorage 호환성을 위해 전역 runtime lesson ID를 유지하고 화면에는 `PART 1 · CH 3 · UNIT 1`을 표시한다.

## 5. UNIT-specific contract

- `targetVerb`
- `familyAnswer`
  - `causative`
  - `quasiCausative`
  - `perception`
- `relationAnswer`
  - `active`
  - `passive`
- `complementFormAnswer`
  - `baseVerb`
  - `toInfinitive`
  - `baseOrTo`
  - `baseOrIng`
  - `pastParticiple`

## 6. Derived practice

교재 문장을 복제하지 않고 분기별 파생문항 5개를 둔다.

1. make + O + 동사원형
2. get + O + to-V
3. help + O + 동사원형/(to-V)
4. 지각동사 + O + V-ing
5. 지각동사 + O + p.p. — 수동관계 우선

## 7. Interaction

`Cold Attempt → 핵심 동사 → 동사 종류 → O-O.C 관계 → 목적격보어 형태 → 5초 Rule → 원문 재도전`

단계별 판단이 모두 맞고 재도전 정답까지 맞을 때 `MASTERED_NOW`, 재도전에서 교정되면 `REPAIRED`, 재도전도 틀리면 `UNRESOLVED`로 기록한다.

Phase 13B physical-device visual confirmation과 Phase 14B live interaction regression은 실제 증거 확보 전까지 non-blocking pending으로 유지한다.
