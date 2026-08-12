# Phase 15 — Content/Data Contract

## Goal

UNIT 4 이후 확장 전에 현재 UNIT 1~3의 데이터 구조를 고정한다.

핵심 원칙은 **공통 Shell과 공통 메타데이터는 재사용하되, 저자식 판단 알고리즘은 UNIT별로 분리**하는 것이다. 모든 UNIT을 하나의 만능 문제 스키마나 universal stage engine으로 통합하지 않는다.

## 1. Shared item contract

모든 구현 UNIT의 문제 항목은 다음 공통 필드를 가진다.

- `id`
- `prompt`
- `choices`
- `answer`
- `rule`
- `errorCode`

`id`는 UNIT 번호 접두사(`u1-`, `u2-`, `u3-`...)를 사용하고 전체 구현 콘텐츠에서 중복되지 않아야 한다.

`answer`는 반드시 `choices` 중 하나여야 한다.

## 2. UNIT-specific decision contract

### UNIT 1

저자식 핵심 판단: 접속사·관계사와 본동사 개수, 본동사/준동사 자리.

필드:
- `tokens`
- `finiteVerbIndices`
- `connectorIndices`
- `omittedConnector`
- `decisionOptions`
- `decisionAnswer`

### UNIT 2

저자식 핵심 판단: 본동사/준동사 자리 → 목적어 유무 → 능동/수동.

필드:
- `positionAnswer`
- `objectAnswer`
- `voiceAnswer`

### UNIT 3

저자식 핵심 판단: 자리 → 목적어 관련성 → p.p. / be+p.p. / 능동 과거형.

필드:
- `positionAnswer`
- `objectAnswer`
- `formAnswer`

### UNIT 4+

UNIT 4의 `decisionSchema`는 UNIT 4 저자식 판단 분석 후 별도로 정의한다. 기존 UNIT의 필드 집합을 억지로 복사하지 않는다.

## 3. Lineage contract

콘텐츠 연결은 다음 순서를 사용한다.

`source reference → author rule → derived practice → review → delayed review`

- source reference: 교재 위치를 식별하는 참조값만 저장
- author rule: UNIT별 저자식 판단 규칙 식별자
- derived practice: 공개 저장소에 배포 가능한 파생 연습문항 집합
- review: `errorCode`를 기준으로 동일 오류군의 파생 연습으로 연결
- delayed review: 동일 `errorCode`를 키로 연결하되, 실제 복습 주기는 별도 정책 단계에서 확정

복습 주기를 데이터 계약 단계에서 임의로 고정하지 않는다.

## 4. Public repository copyright boundary

현재 저장소는 Public이다.

따라서 다음 원칙을 고정한다.

- 교재 원문 전문을 저장하지 않는다.
- source는 `reference-only`로 유지한다.
- `sourceText`, `fullText`, `verbatimText`, `textbookText` 같은 원문 저장용 키를 콘텐츠 계약과 문제 데이터에 두지 않는다.
- 개발·배포 데이터는 파생 연습문항, 구조 메타데이터, 저자식 판단 규칙 식별자 중심으로 유지한다.

## 5. Machine-readable contract

파일: `data/content-contract.js`

역할:
- 공통 문제 필드 정의
- UNIT별 판단 필드 정의
- source → rule → practice → review → delayed review 연결 규칙 정의
- UNIT 4가 아직 별도 판단 분석이 필요한 planned 상태임을 명시

## 6. CI validation

파일: `scripts/validate-content-contract.js`

GitHub Actions는 배포 전에 다음을 검사한다.

- UNIT 1~3 데이터 배열 존재
- 공통 필드 존재 및 기본 타입
- UNIT별 고유 판단 필드 존재 및 기본 타입
- 문제 ID 접두사 및 전체 중복 여부
- 정답이 선택지에 포함되는지 여부
- Public 저장소에서 금지한 원문 저장 키 존재 여부
- source reference-only 정책 유지 여부

실패하면 GitHub Pages 배포를 중단한다.

## 7. UNIT 4 onboarding rule

UNIT 4를 추가할 때의 순서:

1. 교재의 UNIT 4 저자식 판단 순서를 먼저 분석한다.
2. UNIT 4에 필요한 고유 판단 필드만 정의한다.
3. `data/content-contract.js`의 UNIT 4 `decisionSchema`를 planned에서 implemented 계약으로 승격한다.
4. 파생 연습 데이터 `JK_UNIT4_ITEMS`를 추가한다.
5. 엔진과 공통 Shell 연결을 추가한다.
6. CI content contract 검증을 통과시킨다.
7. 실제 브라우저 상호작용 회귀를 확인한다.

이 순서를 통해 데이터 모델이 학습법을 지배하지 않고, 저자식 판단법이 데이터 모델을 결정하도록 유지한다.
