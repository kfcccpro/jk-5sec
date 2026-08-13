# JK 5SEC Grammar — PROJECT HANDOFF LATEST

> 새 채팅 복구용 최우선 문서
> 시작 문구: `JK 5초 다음 작업 진행`, `다음 작업 진행`, `다음 단계 진행`, 또는 `진행`

## 0. 복구 순서

1. GitHub `kfcccpro/jk-5sec` 최신 `main` 확인
2. `PROJECT_HANDOFF_LATEST.md`, `PROJECT_STATUS.md`, `VERSION` 확인
3. 최신 GitHub Actions / Pages 확인
4. 첫 미완료 구현 단계부터 진행

GitHub 연결이 정상이면 ZIP 재업로드나 과거 설명을 요구하지 않는다.

## 1. 프로젝트

- JK 5SEC Grammar / JK 5초 영어어법
- 중심 교재: 「답이 보이는 5초 영어어법」
- GitHub `main` = 유일한 기준본
- HTML + CSS + Vanilla JS / GitHub Pages
- 학생 PIN `8081`, 관리자 PIN `2007`
- 현재 기록: localStorage

## 2. 현재 콘텐츠

완료:
- PART 1 / CHAPTER 1 / UNIT 1~7
- PART 1 / CHAPTER 2 / UNIT 1~4
- PART 1 / CHAPTER 3 / UNIT 1~2
- 각 lesson 파생문항 5개
- 현재 총 65문항

다음:
- PART 1 / CHAPTER 4 / UNIT 1 `혼동하기 쉬운 자동사·타동사`

## 3. CHAPTER 3 · UNIT 2 저자식 판단

근거: 교재 PART 1 / CHAPTER 3 / UNIT 2, p.37.
분석 문서: `docs/PHASE25_CH3_UNIT2_ANALYSIS.md`

핵심:
1. `make + it + O.C + to-V` — 긴 진목적어를 뒤로 보내고 가목적어 it 사용
2. 능동 `make + O + V` — 사역동사의 목적격보어는 동사원형
3. `make + O + 형용사` — 형용사가 목적격보어
4. 사역·지각동사의 수동태 — 능동의 동사원형 앞에 to를 복원하여 `to-V`

앱 루프:
`Cold Attempt → 핵심 동사 → make 출제 유형 → 능동·수동 → 최종 형태 → 5초 Rule → 원문 재도전`

교재 예문은 Public GitHub에 복제하지 않고 파생 연습문항만 구현한다.

## 4. Phase 24 누락 교정

Phase 24의 runtime 12 데이터·엔진·계약은 main에 있었지만 `js/phase14-common-shell.js`의 `unitRegistry`에 UNIT 12가 등록되지 않아 학생 홈에서 실행할 수 없었다. Phase 25에서 runtime 12와 runtime 13을 공통 Shell에 함께 등록했다.

## 5. Runtime lesson ID와 교재 계층

- runtime 1~7 = P1 / CH1 / U1~7
- runtime 8 = P1 / CH2 / U1
- runtime 9 = P1 / CH2 / U2
- runtime 10 = P1 / CH2 / U3
- runtime 11 = P1 / CH2 / U4
- runtime 12 = P1 / CH3 / U1
- runtime 13 = P1 / CH3 / U2

화면에서는 runtime ID가 아니라 실제 교재 계층을 표시한다.

## 6. Content contract

`data/content-contract.js` version `2.0.0`

CH 3 · UNIT 2 fields:
- `targetVerb`
- `patternAnswer`
- `voiceAnswer`
- `formAnswer`

collection key는 runtime lesson ID, collection의 `part/chapter/unit`은 실제 교재 구조다.
Public 저장소는 source reference-only이며 교재 원문 전문 및 `sourceText/fullText/verbatimText/textbookText` 저장을 금지한다.

## 7. CI / 배포

`.github/workflows/pages.yml`

배포 전:
- JavaScript syntax check
- `node scripts/validate-content-contract.js`

앱: `https://kfcccpro.github.io/jk-5sec/`
검수: `https://kfcccpro.github.io/jk-5sec/?review=1`

## 8. 남은 실검증

Phase 13B physical-device visual confirmation과 Phase 14B live interaction regression은 실제 기기/브라우저 증거가 있을 때 완료한다. 미확보 상태는 다음 구현을 막지 않는다.

## 9. 다음 단계

### Phase 26 — PART 1 / CHAPTER 4 / UNIT 1

Topic: `혼동하기 쉬운 자동사·타동사`

1. 교재 p.38 저자식 판정 규칙 분석
2. 전용 decisionSchema 정의
3. 파생 연습문항 작성
4. runtime lesson 14 엔진 구현
5. CH 4 · UNIT 1 공통 Shell 등록
6. syntax + semantic CI 통과

사용자가 `JK 5초 다음 작업 진행`, `다음 작업 진행`, `다음 단계 진행`, 또는 `진행`이라고 입력하면 최신 main/handoff/status/version/actions를 확인한 뒤 Phase 26부터 진행한다.
