# JK 5SEC Grammar — PROJECT HANDOFF LATEST

> 이 파일은 새 ChatGPT 채팅에서 과거 대화를 읽지 못하더라도 프로젝트를 정확히 이어가기 위한 최우선 인계 문서입니다.
>
> **새 채팅 시작 문구:** `JK 5초 다음 작업 진행`

## 0. 새 채팅에서 반드시 먼저 할 일

새 채팅에서는 추측으로 작업을 시작하지 말고 다음 순서로 현재 상태를 복원한다.

1. GitHub 저장소 `kfcccpro/jk-5sec`의 최신 `main` HEAD 확인
2. `PROJECT_HANDOFF_LATEST.md` 읽기
3. `PROJECT_STATUS.md` 읽기
4. `VERSION` 읽기
5. 최신 GitHub Actions / GitHub Pages 배포 상태 확인
6. 작업 성격에 따라 실제 관련 파일을 추가 확인
   - UI/디자인: `css/theme-1001-inspired.css`, `css/app.css`, `css/review.css`
   - 검수 모드: `js/review-mode.js`
   - 교재 구조: `data/course-map.js`
   - 실제 학습: `js/app.js`, `js/unit*-data.js`, `js/unit*-engine.js`
7. `PROJECT_STATUS.md`의 **첫 미완료 단계**부터 이어서 진행
8. GitHub 연결이 정상이라면 사용자의 로컬 파일 업로드/다운로드를 요구하지 않는다.

---

## 1. 프로젝트 정체성

- 프로젝트명: **JK 5SEC Grammar / JK 5초 영어어법**
- 중심 교재: **「답이 보이는 5초 영어어법」**
- 핵심 목표: 저자의 직설적이고 실전적인 영어 어법 접근을 존중하면서, 학생이 문제를 보는 순간 무엇을 확인해야 하는지 짧은 판단 행동으로 체화하는 웹앱
- 학습자도 교재 저자의 영어 접근과 철학을 선호함
- 기존 PFAL의 장점은 사용하되, 이 앱의 전면에는 S/V/O/C 구조 분석을 두지 않는다.
- 구조 분석은 반복 오답 등 필요한 경우에만 fallback 보조 도구로 사용한다.

### 핵심 저자식 판단 방식

- 접속사·관계사 수와 본동사 수 비교
- 먼저 본동사 자리 / 준동사 자리 판정
- `~ing / ~ed`는 목적어 유무를 이용한 자·타/능동·수동 판단
- `p.p. / be + p.p.`는 자리 판단 후 형태 결정
- 시제·수일치·관계사 등도 긴 이론보다 시험장에서 바로 쓰는 신호와 판단 규칙을 중심으로 설계

---

## 2. 운영 아키텍처

### 절대 운영 원칙

**GitHub 원격 `main` = 유일한 기준본(Single Source of Truth)**

사용자 역할:
- 요청
- 실제 화면 테스트
- 스크린샷/피드백

ChatGPT 역할:
- 최신 `main` 확인
- 수정
- commit
- 자동배포 확인
- 다음 검수 단계 진행

GitHub 연결 권한이 정상일 때는 로컬 ZIP 복사, 수동 덮어쓰기, GitHub Desktop 작업을 기본 흐름으로 사용하지 않는다.

GitHub 연결이 해제되거나 회사 환경에서 접근이 제한되는 경우에만 GitHub Desktop/브라우저를 비상 수단으로 사용한다.

### 기술 구조

- HTML + CSS + Vanilla JS 우선
- React / Next.js / 복잡한 npm build chain 사용하지 않음
- 교재 데이터와 앱 로직 분리
- 공통 Shell + 교재별 course-map / unit data / 판단 engine 구조
- GitHub Pages 자동배포
- 현재 별도 Firebase/Firestore 없음
- 현재 실제 학습 기록은 브라우저 `localStorage` 중심
- 다기기 동기화는 아직 구현하지 않았으며, 실제 필요성이 확정될 때만 최소 구조로 추가 검토

---

## 3. 사용자/관리자 구조

- 학습자 1명
- 관리자 1명
- 학생 PIN: `8081`
- 관리자 PIN: `2007`
- 회원가입 없음
- 이메일/비밀번호 로그인 UI 없음
- 복잡한 권한/보안 구조 없음

이 앱은 공개 서비스용 다중 사용자 시스템이 아니라 **1인 학습자 + 1인 관리자용 폐쇄형 학습 도구**로 설계한다.

---

## 4. 디바이스/UI 원칙

주 사용 환경:
- iPad
- Galaxy Tab 등 태블릿
- PC/노트북

원칙:
- 한 화면 한 과제
- 영어 문장을 축소해서 억지로 맞추지 않음
- 큰 카운트다운 사용하지 않음
- 실패를 빨간색으로 강하게 강조하지 않음
- 터치 영역 충분히 크게 유지
- 세로 태블릿은 기본 1열
- PC에서만 제한적 2열
- safe-area, 100dvh 고려
- 시인성과 읽기 편함을 기능보다 우선

---

## 5. 현재 디자인 방향 — 1001 참고, JK 5SEC로 재해석

사용자가 가장 선호도가 높았던 기존 앱 `https://kfcccpro.github.io/1001/`의 디자인을 분석하여 현재 JK 5SEC에 참고 적용했다.

### 1001에서 가져온 시각 원칙

- 따뜻한 오프화이트 배경 `#f7f7f5`
- 절제된 녹색 계열 포인트 `#315d52`
- 화면 최대 폭 약 980px
- 매우 약한 그림자
- 과도하게 두껍지 않은 카드
- 넉넉한 여백
- 영어 문장 Georgia 계열
- 영어 문장 약 22~34px
- 한국어 지시문 약 24~30px
- 버튼 약 54~58px
- 차분하고 피로가 적은 인터페이스

### JK 5SEC 고유 표식

1001과 혼동되지 않도록 별도 **딥 네이비 `JK·5S` 마이크로 마크**를 사용한다.

즉:
- 전반적 학습 감각 = 1001에서 검증된 차분함과 가독성
- 프로젝트 정체성 = JK 5SEC 고유 표식과 저자식 판단 구조

핵심 스타일 파일:
- `css/theme-1001-inspired.css`

---

## 6. 학습 루프

기본 방향:

`Cold Attempt → 저자식 판단 → 5초 Rule → 원문 재도전 → 짧은 전이 → D+1/D+3/D+7 복습`

UNIT마다 저자식 판단 인터랙션은 달라질 수 있다.

### UNIT 1

주제: 접속사·관계사 + 1 = 동사 개수

흐름:
`답 선택 → 본동사 찾기 → 연결어 찾기 → 자리 판단 → 5초 Rule → 원문 재도전`

### UNIT 2

주제: `~ing / ~ed`

흐름:
`답 선택 → 본동사/준동사 자리 → 목적어 유무 → 능동/수동 → 5초 Rule → 원문 재도전`

### UNIT 3

주제: `~ed / be + ~ed`

흐름:
`답 선택 → 자리 판단 → 목적어/의미 → p.p. / be+p.p. / 능동형 판단 → 5초 Rule → 원문 재도전`

---

## 7. 현재 콘텐츠 구현 상태

실제 학습 엔진 구현 완료 범위:
- PART 1 · CHAPTER 1 · UNIT 1
- PART 1 · CHAPTER 1 · UNIT 2
- PART 1 · CHAPTER 1 · UNIT 3

현재 저장소는 **Public**이므로 교재 원문 전체를 GitHub에 복제하지 않는다.
현재 GitHub에는 저자식 판단 구조를 검증하기 위한 파생/대표 문항을 사용한다.

교재 전체 내비게이션 기준:
- `data/course-map.js`
- PART 1~10 구조를 반영

주의:
- 새 UNIT의 실제 교재 내용 분석이 필요할 경우 GitHub handoff만으로 원본 교재 전문을 복원할 수는 없다.
- 새 채팅에서 교재 PDF가 File Library/현재 대화에 접근 가능하면 그 자료를 우선 사용한다.
- 접근할 수 없다면 사용자에게 원본 교재를 다시 제공받아야 할 수 있다.
- GitHub에는 저작권상 교재 원문 전문을 handoff 목적으로 저장하지 않는다.

---

## 8. 검수 모드

검수 URL:

`https://kfcccpro.github.io/jk-5sec/?review=1`

목적:
- 진도 무시
- 채점 무시
- 정답 여부 무시
- 콘텐츠 구조, 화면 계층, UI 크기, 디자인, 정보 밀도, 기기별 시인성 검토

현재 검수 화면:
- 전체 구조
- 학습 흐름
- 학생 홈
- 문제
- 근거 판단
- 5초 Rule
- 학습 결과
- 관리자
- 유지보수/재사용 구조

검수 기기 폭:
- iPad 세로 768px
- 태블릿 1024px
- 태블릿 가로 1180px
- 노트북 1366px
- PC 1440px

관련 파일:
- `js/review-mode.js`
- `css/review.css`

---

## 9. 관리자 방향

복잡한 LMS를 만들지 않는다.

관리자에게 필요한 최소 정보:
- 진도
- 학습시간
- 최초 무도움 정답률
- 근거까지 맞힌 비율
- 반복 오답 Rule
- 취약 PART / UNIT
- D+1 / D+3 / D+7 복습 예정
- 6개 판단축

6개 판단축:
1. 규칙 인출력
2. 자리 판별력
3. 동사 구조 감지력
4. 자·타 판단력
5. 근거 판단력
6. 유형 전이력

풀이 속도는 육각형 핵심 축에서 분리하고 필요 시 페이스 안정성으로 별도 관리한다.

---

## 10. 현재 주요 파일

### 루트
- `index.html`
- `README.md`
- `VERSION`
- `PROJECT_STATUS.md`
- `PROJECT_HANDOFF_LATEST.md`

### CSS
- `css/app.css` — 기본 Shell/UI
- `css/context-fix.css` — 문제 문맥 지속 표시
- `css/review.css` — 검수 모드
- `css/theme-1001-inspired.css` — 현재 최종 시각 테마 override

### Data
- `data/course-map.js` — 교재 전체 PART/CHAPTER/UNIT 구조
- `data/unit1.schema.json` — 초기 UNIT 1 구조 스키마

### JS
- `js/app.js` — 기본 앱/UNIT 1
- `js/review-mode.js` — UI 검수 모드
- `js/unit1-data.js`
- `js/unit2-data.js`
- `js/unit2-engine.js`
- `js/unit3-data.js`
- `js/unit3-engine.js`

### Docs
- `docs/PHASE2_UNIT1_ANALYSIS.md`
- `docs/PHASE3_UI_WIREFRAME.md`

---

## 11. 배포

GitHub Pages URL:
- 일반 앱: `https://kfcccpro.github.io/jk-5sec/`
- 검수 모드: `https://kfcccpro.github.io/jk-5sec/?review=1`

자동배포:
- `.github/workflows/pages.yml`
- `main` push 시 GitHub Actions → GitHub Pages

인계 문서 작성 직전 기준으로 최신 디자인 커밋의 Pages 배포는 성공 상태였다.
새 채팅에서는 반드시 당시 상태를 믿지 말고 최신 Actions를 다시 확인한다.

---

## 12. 현재 완료 단계

### Phase 1~3
- 교재 철학 분석
- UNIT 1 저자식 판단 구조 설계
- iPad/태블릿/PC 반응형 UI 1차 구현

### Phase 4~5
- 학생/관리자 PIN 진입
- 최소 홈/관리 화면
- GitHub Pages 자동배포

### Phase 6~8
- UNIT 1~3 실제 학습 엔진 확장

### Phase 9~11
- 교재 전체 course map
- 검수 모드 확장
- 학생 결과/관리자/유지보수 구조 검수 화면

### Phase 12
- 기존 선호 앱 `kfcccpro/1001`의 디자인 분석
- 색감, 폰트 크기, 카드/버튼 크기, 여백 감각을 JK 5SEC에 재해석
- `JK·5S` 고유 표식 추가
- `css/theme-1001-inspired.css` 적용

---

## 13. 다음 미완료 작업 — 새 채팅에서 여기부터 시작

### Phase 13 — 1001-inspired 테마 실제 기기 검수 및 미세조정

우선순위:
1. 최신 Pages가 정상 배포되었는지 확인
2. `?review=1`에서 학생 홈 → 문제 → 근거 판단 → 5초 Rule → 결과 → 관리자 순으로 검수
3. 768 / 1024 / 1180 / 1366 / 1440 폭에서 다음을 확인
   - 영어 문장 크기와 행간
   - 한국어 지시문 크기
   - 카드 높이
   - 위아래 공백
   - 선택지와 주요 버튼 크기
   - 화면 스크롤 과다 여부
   - JK·5S 표식이 과도하거나 약하지 않은지
4. 사용자가 보내는 스크린샷/피드백을 기준으로 테마 미세조정

### Phase 14 — 공통 Shell과 UNIT 엔진 구조 정리

- UNIT 1/2/3에서 중복되는 화면 Shell과 저장/상태 로직을 단순화할 수 있는지 감사
- 너무 복잡한 추상화는 금지
- 유지보수 관점에서 `공통 Shell + unit config` 정도의 최소 정리를 목표로 함
- 현재 잘 작동하는 인터랙션을 깨뜨리지 않는 범위에서만 진행

### Phase 15 — 다음 교재 UNIT 확장 전 데이터 계약 확정

- 각 UNIT마다 필요한 판단단계가 다르므로 고정된 하나의 문제 엔진을 강요하지 않는다.
- 공통 필드와 UNIT별 고유 판단 필드를 분리
- Public 저장소에 원문 전문을 저장하지 않는 원칙 유지
- 교재 source → author rule → derived practice → review → delayed review의 연결 규칙 확정

이후에 PART 1 CHAPTER 1 UNIT 4부터 순차 확장한다.

---

## 14. 새 채팅 작업 원칙

사용자가 새 창에서 `JK 5초 다음 작업 진행`이라고 입력하면:

- 과거 대화 내용을 사용자에게 다시 설명해 달라고 요구하지 않는다.
- GitHub가 연결되어 있으면 직접 최신 `main`을 읽는다.
- 이 handoff 파일과 status/version/actions를 확인한다.
- 첫 미완료 단계인 Phase 13부터 진행한다.
- 필요 시 2~3개 세부 단계를 한 번에 묶어 진행할 수 있다.
- 모든 수정은 `main` 기준으로 하고 자동배포 상태까지 확인한다.
- 실제 화면 품질 검증이 필요하면 검수 URL을 우선 사용한다.

---

## 15. 이 인계 방식의 한계

이 방식은 ZIP 백업을 새 채팅마다 업로드하는 것보다 프로젝트 코드 상태 인계에는 우수하다. 다만 다음은 별개다.

1. GitHub 연결 권한이 새 채팅/계정에서 정상이어야 함
2. GitHub에 없는 교재 원본 PDF 자체는 handoff 파일이 대신할 수 없음
3. `PROJECT_HANDOFF_LATEST.md`가 오래되면 잘못된 기준점이 될 수 있으므로 중요한 단계 완료 때마다 업데이트해야 함
4. 실제 배포 성공 여부는 문서에 적힌 과거 상태가 아니라 항상 Actions에서 재확인해야 함
5. Public 저장소이므로 저작권 있는 교재 전문, 민감정보, 비밀번호 등은 저장하지 않음

이 한계를 지키면 **GitHub main + handoff + status + version + Actions** 방식이 이 프로젝트의 기본 인계/복구 방식이다.
