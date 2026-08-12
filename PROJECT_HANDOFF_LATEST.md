# JK 5SEC Grammar — PROJECT HANDOFF LATEST

> 새 채팅 복구용 최우선 문서
>
> 시작 문구: `JK 5초 다음 작업 진행`

## 0. 복구 순서

1. GitHub `kfcccpro/jk-5sec` 최신 `main` 확인
2. `PROJECT_HANDOFF_LATEST.md`, `PROJECT_STATUS.md`, `VERSION` 확인
3. 최신 GitHub Actions / Pages 확인
4. 첫 미완료 구현 단계부터 진행

GitHub 연결이 정상이면 ZIP 재업로드나 과거 설명을 요구하지 않는다.

## 1. 프로젝트 정체성

- 프로젝트: JK 5SEC Grammar / JK 5초 영어어법
- 중심 교재: 「답이 보이는 5초 영어어법」
- 목표: 시험장에서 바로 쓰는 저자식 판단 순서를 짧은 클릭 행동으로 체화
- 구조 분석 S/V/O/C는 반복 오답 시 보조 수단

## 2. 운영 구조

- GitHub `main` = 유일한 기준본
- HTML + CSS + Vanilla JS
- GitHub Pages 자동배포
- 학생 1명 / 관리자 1명
- 학생 PIN `8081` / 관리자 PIN `2007`
- 회원가입·이메일 로그인 없음
- 현재 기록은 localStorage
- Firebase/Firestore 및 다기기 동기화 미구현

## 3. UI 기준

- 참고 디자인: `kfcccpro/1001`
- 오프화이트 + 절제된 녹색 포인트
- 약 980px 콘텐츠 폭
- 낮은 대비 테두리/그림자
- 큰 영어 문장, 넉넉한 여백
- 54~58px 주요 컨트롤
- 딥 네이비 `JK·5S`는 화면 상위 브랜드 위치만 사용

## 4. 현재 학습 콘텐츠

완료:
- PART 1 / CHAPTER 1 / UNIT 1
- UNIT 2
- UNIT 3
- UNIT 4 `접속사 + V-ing or p.p.`

다음:
- UNIT 5 `수동태 불가 동사`

## 5. 공통 Shell

`js/phase14-common-shell.js`

공통화:
- UNIT registry
- student/admin home
- learning Shell
- primary action
- progress
- context block

공통화하지 않음:
- UNIT별 저자식 판단 알고리즘
- 정답 판정
- evidence 질문

universal stage engine을 만들지 않는다.

## 6. Content contract

`data/content-contract.js` version `1.1.0`

공통 필드:
- id / prompt / choices / answer / rule / errorCode

UNIT 고유 판단 필드:
- UNIT 1: tokens / finiteVerbIndices / connectorIndices / omittedConnector / decisionOptions / decisionAnswer
- UNIT 2: positionAnswer / objectAnswer / voiceAnswer
- UNIT 3: positionAnswer / objectAnswer / formAnswer
- UNIT 4: slotAnswer / objectAnswer / formAnswer / fallbackRequired

연결:
`source reference → author rule → derived practice → review → delayed review`

Public 저장소 경계:
- source reference-only
- 교재 원문 전문 저장 금지
- sourceText/fullText/verbatimText/textbookText 키 금지

## 7. UNIT 4 저자식 판단

근거 분석 문서:
- `docs/PHASE16_UNIT4_ANALYSIS.md`

판단 순서:
1. 접속사가 남은 축약구문 → 준동사 자리
2. 타동사이면 바로 뒤 목적어 확인
3. 목적어 있음 → 능동 V-ing
4. 목적어 없음 → 수동 p.p. 우선
5. 자동사·전치사 구조라 목적어 공식이 안 되면 주절 주어를 복원하여 능동/수동 관계 판단

실제 앱 루프:
`Cold Attempt → 축약 자리 → 목적어 확인 → V-ing/p.p. 판단 → 5초 Rule → 원문 재도전`

교재 확인문제 문장은 Public GitHub에 복제하지 않고 파생 연습문항 5개만 구현했다.

## 8. CI / 배포

`.github/workflows/pages.yml`

배포 전:
- `node --check` on js/data/scripts
- `node scripts/validate-content-contract.js`

그 후 GitHub Pages 배포.

앱:
- `https://kfcccpro.github.io/jk-5sec/`

검수 모드:
- `https://kfcccpro.github.io/jk-5sec/?review=1`

## 9. 남은 실검증

Phase 13B physical-device visual confirmation과 Phase 14B live interaction regression은 실제 iPad/Galaxy Tab/PC 또는 직접 브라우저 증거가 있을 때 완료 처리한다. 자료가 없으면 다음 구현을 막지 않는다.

## 10. 다음 구현 단계

### Phase 17 — UNIT 5 `수동태 불가 동사`

1. 교재 UNIT 5의 저자식 판정 규칙 분석
2. UNIT 5 전용 decisionSchema 정의
3. 파생 연습문항 작성
4. UNIT 5 엔진 구현
5. 공통 Shell 등록
6. syntax + semantic CI 통과
7. 가능한 브라우저 회귀 확인

## 11. 새 채팅 행동 규칙

사용자가 `JK 5초 다음 작업 진행`이라고 입력하면 최신 main/handoff/status/version/actions를 대조한 뒤 Phase 17부터 진행한다. 실제 기기 자료가 없다는 이유로 멈추지 않는다.
