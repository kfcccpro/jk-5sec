# Phase 17 — UNIT 5 수동태 불가 동사 분석

## Source boundary

- Source reference: `textbook:p1-c1-u5:p26`
- Source: 「답이 보이는 5초 영어어법」 PART 1 / CHAPTER 1 / UNIT 5
- Public repository에는 교재 확인문제 원문을 저장하지 않는다.
- 실제 앱 문항은 모두 별도 파생 연습문항이다.

## 1. UNIT 5가 기존 능동·수동 공식과 다른 이유

UNIT 2~4에서는 목적어 유무가 능동·수동 판단의 강한 신호였다. UNIT 5에서는 그 공식을 적용하기 전에 먼저 **해당 동사가 수동태를 허용하는 동사인지** 확인해야 한다.

즉 UNIT 5는 일반 공식의 추가 단계가 아니라 **예외 게이트**다.

## 2. 저자식 분류

### A. 자동사형 수동태 불가군

대표적으로 발생·상태·변화·존재를 나타내며 목적어를 직접 취하지 않는 동사들이 포함된다. 예: `occur`, `happen`, `remain`, `seem`, `appear`, `disappear`, `rise`, `arrive` 등.

이 부류는 목적어가 없으므로 수동태 주어로 올릴 목적어 자체가 없다.

### B. 목적어를 취해도 수동태로 쓰지 않는 타동사군

교재는 소유·유사 의미의 일부 타동사를 별도 예외로 다룬다. 대표적으로 `have`, `possess`, `hold`(소유 의미), `resemble`.

따라서 **목적어 있음 = 수동태 가능**이라고 자동 적용하면 안 된다.

### C. 문맥에 따라 자·타 용법이 달라지는 동사군

`see`, `increase`, `decrease`, `read`, `peel` 등은 한쪽으로 고정해 외우면 오류가 생긴다. 문맥에서 자동사인지 타동사인지 먼저 판단한다.

- 자동사 용법이면 수동태를 만들지 않는다.
- 타동사 용법이면 일반 수동태가 가능할 수 있다.

`look`과 `look at`처럼 전치사 결합에 따라 구조가 달라지는 경우도 같은 이유로 문맥 확인이 필요하다.

## 3. 앱용 5초 판단 순서

`대상 동사 확인 → 금지 부류인가? → 능동문 기준 자·타 용법 확인 → 수동태 가능 여부 결정`

### STEP 1 — 동사 부류

1. 자동사형 수동태 불가
2. 목적어를 취해도 수동태 불가
3. 문맥에 따라 자·타 용법 구별

### STEP 2 — 문맥상 자·타 용법

표면 형태가 아니라 능동문을 기준으로 목적어를 직접 취하는 용법인지 확인한다.

### STEP 3 — 수동태 가능 여부

- 고정 자동사형 → 수동태 X
- 수동태 불가 타동사 → 수동태 X
- 문맥 의존 동사 → 해당 문맥이 타동사 용법일 때만 수동태 가능 여부를 일반 규칙으로 판단

## 4. UNIT 5 data contract

Fields:

- `targetVerb`
- `groupAnswer`
- `usageAnswer`
- `formAnswer`

Allowed learning meanings:

- `groupAnswer`
  - `fixedIntransitiveNoPassive`
  - `fixedTransitiveNoPassive`
  - `contextDependent`
- `usageAnswer`
  - `intransitive`
  - `transitive`
- `formAnswer`
  - `activeOnly`
  - `passiveAllowed`

## 5. Derived practice design

5개 파생문항은 다음 범위를 고르게 확인한다.

1. 고정 자동사형: appear
2. 고정 자동사형: seem
3. 목적어가 있어도 수동태 불가: resemble
4. 문맥 의존 타동사 용법: see → 수동태 가능
5. 문맥 의존 자동사 용법: increase → 수동태 불가

교재 확인문제의 문장을 복제하지 않고 동일 판단 규칙만 전이한다.

## 6. Interaction

`Cold Attempt → 동사 부류 → 자·타 용법 → 수동태 가능 여부 → 5초 Rule → 원문 재도전`

UNIT 5 엔진은 다음 문제 전환과 UNIT 종료 시 단일 primary handler를 유지하도록 `pendingNext` / `finished` 상태를 사용한다. 동적 `onclick` 중첩을 만들지 않는다.
