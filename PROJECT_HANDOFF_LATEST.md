# JK 5SEC Grammar — PROJECT HANDOFF LATEST

> 새 채팅 복구용 최우선 문서
>
> 시작 문구: `JK 5초 다음 작업 진행`

## 0. 복구 순서

새 채팅에서는 다음 순서로 현재 상태를 복원한다.

1. GitHub `kfcccpro/jk-5sec` 최신 `main` 확인
2. `PROJECT_HANDOFF_LATEST.md` 읽기
3. `PROJECT_STATUS.md` 읽기
4. `VERSION` 읽기
5. 최신 GitHub Actions / Pages 상태 확인
6. 첫 미완료 구현 단계부터 진행

GitHub 연결이 정상이라면 사용자에게 ZIP 재업로드나 과거 설명을 요구하지 않는다.

---

## 1. 프로젝트 정체성

- 프로젝트명: JK 5SEC Grammar / JK 5초 영어어법
- 중심 교재: 「답이 보이는 5초 영어어법」
- 목표: 긴 문법 설명보다 시험장에서 바로 쓰는 저자식 판단 순서를 짧은 클릭 행동으로 체화
- 구조 분석 S/V/O/C는 반복 오답 시 보조 수단이며 전면 학습법이 아니다.

핵심 판단 철학:
- 접속사·관계사 수와 본동사 수 비교
- 본동사 자리 / 준동사 자리 먼저 판정
- `~ing / ~ed`는 목적어 유무로 능동·수동 판단
- `p.p. / be + p.p.`는 자리 판단 후 형태 결정

---

## 2. 운영 구조

- GitHub 원격 `main` = 유일한 기준본
- HTML + CSS + Vanilla JS
- React / Next.js / 복잡한 npm build chain 없음
- GitHub Pages 자동배포
- 현재 학습기록은 `localStorage`
- Firebase/Firestore 없음
- 다기기 동기화는 아직 미구현

사용자 역할:
- 요청
- 실제 화면 테스트
- 스크린샷/피드백

ChatGPT 역할:
- 최신 main 확인
- 수정
- commit
- Actions / Pages 검증
- 다음 단계 진행

---

## 3. 사용자 구조

- 학생 1명
- 관리자 1명
- 학생 PIN: `8081`
- 관리자 PIN: `2007`
- 회원가입 없음
- 이메일 로그인 없음

---

## 4. UI 기준

참고 디자인: `kfcccpro/1001`

현재 원칙:
- 오프화이트 배경
- 절제된 녹색 포인트
- 약 980px 콘텐츠 폭
- 낮은 대비의 그림자/테두리
- 큰 영어 문장
- 넉넉한 여백
- 54~58px급 주요 컨트롤
- 딥 네이비 `JK·5S` 마크는 화면 상위 브랜드 위치에만 사용

주요 CSS:
- `css/theme-1001-inspired.css`
- `css/phase13-refinement.css`

---

## 5. 현재 학습 콘텐츠

구현 완료:
- PART 1 / CHAPTER 1 / UNIT 1
- PART 1 / CHAPTER 1 / UNIT 2
- PART 1 / CHAPTER 1 / UNIT 3

다음 UNIT:
- PART 1 / CHAPTER 1 / UNIT 4: `접속사 + V-ing or p.p.`

학습 루프:
`Cold Attempt → 저자식 판단 → 5초 Rule → 원문 재도전 → 짧은 전이 → 예약 복습`

Public 저장소이므로 교재 원문 전문은 GitHub에 저장하지 않는다.

---

## 6. Phase 14 공통 Shell

공통 파일:
- `js/phase14-common-shell.js`

공통화 범위:
- UNIT 레지스트리
- 학생 홈
- 관리자 홈
- 학습 Shell
- primary action helper
- progress helper
- context block helper

절대 공통화하지 않는 범위:
- UNIT별 저자식 판단 알고리즘
- 정답 판정 로직
- 단계별 evidence 질문

핵심 원칙:
- universal stage engine을 만들지 않는다.
- 공통 Shell + UNIT별 고유 판단 로직을 유지한다.

기존 UNIT 1/2/3의 중복 함수는 회귀 위험을 줄이기 위해 물리 삭제하지 않았고, Phase 14 공통 레이어가 런타임에서 중복 홈/Shell/helper 바인딩을 대체한다.

---

## 7. Phase 15 데이터 계약

현재 버전: `0.15.0`

새 파일:
- `data/content-contract.js`
- `scripts/validate-content-contract.js`
- `docs/PHASE15_DATA_CONTRACT.md`

공통 문제 필드:
- `id`
- `prompt`
- `choices`
- `answer`
- `rule`
- `errorCode`

UNIT별 판단 계약:
- UNIT 1: `tokens`, `finiteVerbIndices`, `connectorIndices`, `omittedConnector`, `decisionOptions`, `decisionAnswer`
- UNIT 2: `positionAnswer`, `objectAnswer`, `voiceAnswer`
- UNIT 3: `positionAnswer`, `objectAnswer`, `formAnswer`
- UNIT 4: 저자식 판단 분석 후 별도 정의

UNIT 4에 기존 UNIT의 판단 필드를 억지로 복사하지 않는다.

콘텐츠 연결 규칙:
`source reference → author rule → derived practice → review → delayed review`

- source는 교재 위치 참조만 저장
- review는 `errorCode` 오류군으로 연결
- delayed review도 `errorCode`로 연결하되 실제 복습 주기는 아직 고정하지 않음

Public 저장소 저작권 경계:
- source는 `reference-only`
- 교재 원문 전문 저장 금지
- `sourceText`, `fullText`, `verbatimText`, `textbookText` 같은 원문 저장용 키를 semantic validator가 차단

---

## 8. CI / 배포

Workflow:
- `.github/workflows/pages.yml`

배포 게이트:
1. Checkout
2. `js/`, `data/`, `scripts/` 전체 JavaScript `node --check`
3. `node scripts/validate-content-contract.js`
4. Setup Pages
5. Upload static site
6. Deploy GitHub Pages

일반 앱:
- `https://kfcccpro.github.io/jk-5sec/`

검수 모드:
- `https://kfcccpro.github.io/jk-5sec/?review=1`

---

## 9. 아직 남은 실검증

### Phase 13B — 실제 기기 시각 검증

실제 iPad / Galaxy Tab / PC 자료가 있을 때 확인:
- 글자 크기와 줄바꿈
- 카드 밀도
- 버튼 크기
- sticky action zone
- 스크롤 부담
- JK·5S 강도

스크린샷이 없으면 이 단계 때문에 전체 작업을 멈추지 않는다.

### Phase 14B — 실제 브라우저 상호작용 회귀 검증

아직 별도 확인이 필요한 항목:
- 8081 학생 로그인
- 2007 관리자 로그인
- 학생 홈 UNIT 1~3 표시
- UNIT 1/2/3 시작
- 홈 복귀
- 진행률/단계 라벨
- 완료횟수 localStorage 유지
- 관리자 화면 UNIT 1~3 완료횟수
- review mode 정상 진입

문제가 발견되면 UNIT별 판단 로직이 아니라 공통 Shell 레이어부터 수정한다.

---

## 10. 다음 구현 단계

### Phase 16 — PART 1 / CHAPTER 1 / UNIT 4

주제: `접속사 + V-ing or p.p.`

진행 순서:
1. UNIT 4 저자식 판단 순서 분석
2. UNIT 4 고유 `decisionSchema` 정의
3. `data/content-contract.js`의 UNIT 4를 planned → implemented로 승격
4. 공개 저장소 경계를 지키는 파생 연습문항 작성
5. UNIT 4 엔진 구현
6. Phase 14 공통 Shell에 UNIT 4 등록
7. syntax + semantic CI 통과
8. 가능한 범위에서 실제 브라우저 흐름 확인

---

## 11. 새 채팅 행동 규칙

사용자가 `JK 5초 다음 작업 진행`이라고 입력하면:

- 사용자에게 과거 설명을 다시 요구하지 않는다.
- GitHub 최신 main을 직접 읽는다.
- handoff/status/version/actions를 대조한다.
- 실제 기기 자료가 없으면 Phase 13B/14B에 막히지 않는다.
- 최신 배포가 정상이라면 Phase 16 UNIT 4 작업부터 진행한다.
- 중요한 단계 완료 시 `PROJECT_STATUS.md`, `PROJECT_HANDOFF_LATEST.md`, `VERSION`을 함께 갱신한다.

---

## 12. 주요 파일

루트:
- `index.html`
- `README.md`
- `VERSION`
- `PROJECT_STATUS.md`
- `PROJECT_HANDOFF_LATEST.md`

CSS:
- `css/app.css`
- `css/context-fix.css`
- `css/review.css`
- `css/theme-1001-inspired.css`
- `css/phase13-refinement.css`

Data:
- `data/course-map.js`
- `data/content-contract.js`

JS:
- `js/app.js`
- `js/unit1-data.js`
- `js/unit2-data.js`
- `js/unit2-engine.js`
- `js/unit3-data.js`
- `js/unit3-engine.js`
- `js/phase14-common-shell.js`
- `js/review-mode.js`

Validation:
- `scripts/validate-content-contract.js`

Docs:
- `docs/PHASE2_UNIT1_ANALYSIS.md`
- `docs/PHASE3_UI_WIREFRAME.md`
- `docs/PHASE14_SHELL_AUDIT.md`
- `docs/PHASE15_DATA_CONTRACT.md`

---

이 프로젝트의 복구 기준은 **GitHub main + PROJECT_HANDOFF_LATEST.md + PROJECT_STATUS.md + VERSION + GitHub Actions**이다.
