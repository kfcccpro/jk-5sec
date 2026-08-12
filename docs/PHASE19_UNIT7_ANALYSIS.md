# Phase 19 — UNIT 7 여러 종류의 수동태 분석

## Source boundary

- Source: 「답이 보이는 5초 영어어법」 PART 1 / CHAPTER 1 / UNIT 7
- Textbook page: 29
- Public source storage: reference-only
- 교재 예문·확인문제를 Public GitHub에 복제하지 않고 동일 판단 규칙의 파생문항만 저장한다.

## 1. 저자식 핵심

UNIT 7은 새로운 수동 의미를 만드는 단원이 아니라, 시제·조동사와 결합하면서 길어진 **수동태의 보조동사 사슬을 빠르게 읽는 단원**이다.

교재가 제시하는 핵심 형태:

1. 진행형 수동태: `be + being + p.p.`
2. 완료형 수동태: `have/has/had + been + p.p.`
3. 조동사 수동태: `조동사 + be + p.p.`
4. 조동사 완료 수동태는 위 원리의 결합으로 `조동사 + have been + p.p.`로 읽는다.

## 2. p.p. 뒤 목적어 규칙

교재의 check point는 일반적인 수동태 `be + p.p.` 뒤에는 직접목적어가 오지 못한다는 점을 다시 확인한다.

단, UNIT 6에서 학습한 4형식·5형식 수동태는 예외다.

따라서 앱은 다음 세 가지를 구별한다.

- `noDirectObject`: p.p. 뒤에 직접목적어가 없음. 전치사 뒤 명사는 목적어로 세지 않음.
- `unit6Exception`: 4형식의 남은 목적어 또는 5형식의 보어처럼 UNIT 6 구조상 명사가 허용됨.
- `directObjectConflict`: 일반 수동태인데 직접목적어가 뒤에 남아 구조 충돌.

## 3. 5초 판단 순서

`보조동사 사슬 확인 → 수동 형태 이름 붙이기 → p.p. 뒤 직접목적어 확인 → 최종 수동태 판정`

핵심은 p.p. 하나만 보는 것이 아니라 **앞의 auxiliary chain 전체를 한 덩어리로 읽는 것**이다.

## 4. UNIT 7 data contract

- `passiveFamilyAnswer`
- `auxiliaryChainAnswer`
- `objectAfterPpAnswer`
- `voiceAnswer`

주요 값:

- passive family: `progressivePassive`, `perfectPassive`, `modalPassive`, `modalPerfectPassive`, `simplePassive`
- auxiliary chain: `beBeingPp`, `haveBeenPp`, `modalBePp`, `modalHaveBeenPp`, `simpleBePp`
- object after p.p.: `noDirectObject`, `unit6Exception`, `directObjectConflict`
- voice: `passiveValid`, `activeRequired`

## 5. Derived practice

5개 파생문항:

1. 진행 수동 `be being p.p.`
2. 완료 수동 `have been p.p.` + UNIT 6의 4형식 예외 연결
3. 조동사 수동 `modal + be p.p.`
4. 조동사 완료 수동 `modal + have been p.p.`
5. 일반 수동 + 전치사구를 직접목적어로 오인하지 않기

## 6. Interaction

`Cold Attempt → 보조동사 사슬 → 수동 형태 → p.p. 뒤 확인 → 최종 판정 → 5초 Rule → 원문 재도전`

Phase 13B·14B 실제 기기/브라우저 검증은 별도 증거가 확보될 때까지 non-blocking pending으로 유지한다.
