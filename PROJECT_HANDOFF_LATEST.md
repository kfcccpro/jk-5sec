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
- PART 1 / CHAPTER 4 / UNIT 1
- 각 lesson 파생문항 5개
- 현재 총 70문항

다음:
- PART 1 / CHAPTER 4 / UNIT 2 `목적어(명사)에 따른 자동사·타동사 구분`

## 3. CHAPTER 4 · UNIT 1 저자식 판단

근거: 교재 PART 1 / CHAPTER 4 / UNIT 1, p.38.
분석 문서: `docs/PHASE26_CH4_UNIT1_ANALYSIS.md`

핵심 묶음:
1. rise(자동사)-rose-risen / raise(타동사)-raised-raised
2. lie(자동사)-lay-lain / lay(타동사)-laid-laid
3. lie(거짓말하다, 자동사)-lied-lied
4. sit(자동사)-sat-sat / seat(타동사)-seated-seated
5. arise(자동사)-arose-arisen / arouse(타동사)-aroused-aroused

앱 루프:
`Cold Attempt → 혼동 동사쌍 → 자동사·타동사 → 의미 → 변화형 → 5초 Rule → 원문 재도전`

교재 예문은 Public GitHub에 복제하지 않고 파생 연습문항만 구현한다.

## 4. Runtime lesson ID와 교재 계층

- runtime 1~7 = P1 / CH1 / U1~7
- runtime 8 = P1 / CH2 / U1
- runtime 9 = P1 / CH2 / U2
- runtime 10 = P1 / CH2 / U3
- runtime 11 = P1 / CH2 / U4
- runtime 12 = P1 / CH3 / U1
- runtime 13 = P1 / CH3 / U2
- runtime 14 = P1 / CH4 / U1

화면에서는 runtime ID가 아니라 실제 교재 계층을 표시한다.

## 5. Content contract

`data/content-contract.js` version `2.1.0`

CH 4 · UNIT 1 fields:
- `targetVerb`
- `pairAnswer`
- `transitivityAnswer`
- `meaningAnswer`
- `meaningOptions`
- `formSeriesAnswer`
- `formOptions`

collection key는 runtime lesson ID, collection의 `part/chapter/unit`은 실제 교재 구조다.
Public 저장소는 source reference-only이며 교재 원문 전문 및 `sourceText/fullText/verbatimText/textbookText` 저장을 금지한다.

## 6. CI / 배포

`.github/workflows/pages.yml`

배포 전:
- JavaScript syntax check
- `node scripts/validate-content-contract.js`

Phase 26부터 semantic CI는 콘텐츠 계약뿐 아니라 모든 implemented runtime lesson의 다음 통합 조건도 확인한다.
- common Shell registry 등록
- start 함수 등록
- common Shell adapter 등록
- index data/engine script 로딩

앱: `https://kfcccpro.github.io/jk-5sec/`
검수: `https://kfcccpro.github.io/jk-5sec/?review=1`

## 7. 남은 실검증

Phase 13B physical-device visual confirmation과 Phase 14B live interaction regression은 실제 기기/브라우저 증거가 있을 때 완료한다. 미확보 상태는 다음 구현을 막지 않는다.

## 8. 다음 단계

### Phase 27 — PART 1 / CHAPTER 4 / UNIT 2

Topic: `목적어(명사)에 따른 자동사·타동사 구분`

1. 교재 p.38 UNIT 2 규칙과 p.39 확인문제의 판정 패턴 분석
2. 전용 decisionSchema 정의
3. 파생 연습문항 작성
4. runtime lesson 15 엔진 구현
5. CH 4 · UNIT 2 공통 Shell 등록
6. syntax + semantic + Shell/index CI 통과

사용자가 `JK 5초 다음 작업 진행`, `다음 작업 진행`, `다음 단계 진행`, 또는 `진행`이라고 입력하면 최신 main/handoff/status/version/actions를 확인한 뒤 Phase 27부터 진행한다.
