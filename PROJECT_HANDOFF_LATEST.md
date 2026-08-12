# JK 5SEC Grammar — PROJECT HANDOFF LATEST

> 새 채팅 복구용 최우선 문서
> 시작 문구: `JK 5초 다음 작업 진행`

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
- 각 UNIT 파생문항 5개
- 현재 총 35문항

CHAPTER 1 마지막 UNIT까지 구현 완료.

다음:
- PART 1 / CHAPTER 2 / UNIT 1 `본동사 + ~ + [to-V / ~ing]`

## 3. Content contract

`data/content-contract.js` version `1.4.0`

공통 필드: `id / prompt / choices / answer / rule / errorCode`

UNIT 7 고유 필드:
- `passiveFamilyAnswer`
- `auxiliaryChainAnswer`
- `objectAfterPpAnswer`
- `voiceAnswer`

Public 저장소는 source reference-only이며 교재 원문 전문 및 `sourceText/fullText/verbatimText/textbookText` 저장을 금지한다.

## 4. UNIT 7 저자식 판단

근거: 교재 PART 1 / CHAPTER 1 / UNIT 7, p.29.
분석 문서: `docs/PHASE19_UNIT7_ANALYSIS.md`

핵심:
1. 진행 수동은 `be being p.p.`
2. 완료 수동은 `have been p.p.`
3. 조동사 수동은 `조동사 + be p.p.`
4. 결합형은 `조동사 + have been p.p.`처럼 auxiliary chain 전체를 읽는다.
5. 수동태 p.p. 뒤에는 원칙적으로 직접목적어가 오지 않지만 UNIT 6의 4·5형식 구조는 예외다.
6. 전치사 뒤 명사는 동사의 직접목적어로 세지 않는다.

앱 루프:
`Cold Attempt → 보조동사 사슬 → 수동 형태 → p.p. 뒤 확인 → 최종 판정 → 5초 Rule → 원문 재도전`

교재 예문은 Public GitHub에 복제하지 않고 파생 연습문항만 구현한다.

## 5. 공통 Shell

`js/phase14-common-shell.js`

UNIT 1~7 등록 완료. UNIT별 저자식 알고리즘은 별도 엔진으로 유지한다.
다음 Phase 20부터 CHAPTER 2에 진입하므로 registry의 chapterLabel을 실제 교재 계층에 맞춰 확장한다.

## 6. CI / 배포

`.github/workflows/pages.yml`

배포 전:
- JavaScript syntax check
- `node scripts/validate-content-contract.js`

앱: `https://kfcccpro.github.io/jk-5sec/`
검수: `https://kfcccpro.github.io/jk-5sec/?review=1`

## 7. 남은 실검증

Phase 13B physical-device visual confirmation과 Phase 14B live interaction regression은 실제 기기/브라우저 증거가 있을 때 완료한다. 미확보 상태는 다음 구현을 막지 않는다.

## 8. 다음 단계

### Phase 20 — PART 1 / CHAPTER 2 / UNIT 1

Topic: `본동사 + ~ + [to-V / ~ing]`

1. 교재 저자식 판정 규칙 분석
2. 전용 decisionSchema 정의
3. 파생 연습문항 작성
4. 전용 엔진 구현
5. CHAPTER 2를 반영한 공통 Shell registry 확장
6. syntax + semantic CI 통과

사용자가 `JK 5초 다음 작업 진행`이라고 입력하면 최신 main/handoff/status/version/actions를 확인한 뒤 Phase 20부터 진행한다.
