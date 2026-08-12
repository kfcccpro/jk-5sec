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
- UNIT 1 `접속사·관계사 + 1 = 동사 개수`
- UNIT 2 `~ing / ~ed`
- UNIT 3 `~ed / be + ~ed`
- UNIT 4 `접속사 + V-ing or p.p.`
- UNIT 5 `수동태 불가 동사`
- UNIT 6 `뒤에 두 개의 명사가 오는 수동태`

각 UNIT 파생문항 5개, 현재 총 30문항.

다음:
- UNIT 7 `여러 종류의 수동태`

## 3. 공통 Shell

`js/phase14-common-shell.js`

공통화: UNIT registry, student/admin home, learning shell, primary action, progress, context block.
UNIT별 저자식 판단 알고리즘·정답 판정·evidence 질문은 공통화하지 않는다.

## 4. Content contract

`data/content-contract.js` version `1.3.0`

공통 필드: `id / prompt / choices / answer / rule / errorCode`

UNIT 6 고유 필드:
- `targetVerb`
- `patternAnswer`
- `remainingRoleAnswer`
- `passiveAnswer`

Public 저장소는 source reference-only이며 교재 원문 전문 및 `sourceText/fullText/verbatimText/textbookText` 저장을 금지한다.

## 5. UNIT 6 저자식 판단

근거: 교재 PART 1 / CHAPTER 1 / UNIT 6, p.27.
분석 문서: `docs/PHASE18_UNIT6_ANALYSIS.md`

핵심:
1. 4형식 동사는 두 목적어 중 하나가 수동태 주어가 되어도 다른 목적어가 뒤에 남을 수 있다.
2. 5형식 동사는 목적어가 수동태 주어가 되면 원래 목적격보어가 주어를 설명하는 보어로 남는다.
3. 따라서 `be + p.p. + 명사`를 보고 명사가 뒤에 있다는 이유만으로 수동태를 제거하지 않는다.
4. 먼저 원래 4형식/5형식을 판정하고, 뒤 명사의 역할을 목적어/보어로 구분한다.

앱 루프:
`Cold Attempt → 4·5형식 구분 → 남은 명사 역할 → 수동태 판정 → 5초 Rule → 원문 재도전`

교재 예문은 Public GitHub에 복제하지 않고 파생 연습문항만 구현한다.

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

### Phase 19 — UNIT 7 `여러 종류의 수동태`

1. 교재 UNIT 7 저자식 판정 규칙 분석
2. UNIT 7 전용 decisionSchema 정의
3. 파생 연습문항 작성
4. UNIT 7 엔진 구현
5. 공통 Shell 등록
6. syntax + semantic CI 통과

사용자가 `JK 5초 다음 작업 진행`이라고 입력하면 최신 main/handoff/status/version/actions를 확인한 뒤 Phase 19부터 진행한다.
