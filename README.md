# JK 5SEC Grammar

「답이 보이는 5초 영어어법」의 저자식 문제풀이 철학을 중심으로 설계하는 1인 학습자용 영어어법 웹앱입니다.

## 운영 원칙

- GitHub 원격 `main`을 유일한 기준본으로 사용
- 1인 학습자 / 1인 관리자
- 학생 PIN 8081 / 관리자 PIN 2007
- 회원가입·이메일 로그인 UI 없음
- iPad·Galaxy Tab·PC에서 높은 시인성과 동일한 학습 흐름 유지
- HTML/CSS/Vanilla JS 우선
- 교재 데이터와 앱 로직 분리
- 교재의 저자식 판단법을 우선하고, 구조분석은 필요할 때만 보조로 제공
- 화면 Shell은 공통화하고 교재별 판단 엔진·데이터만 교체할 수 있도록 설계

## 현재 단계

Phase 11 - 검수 모드 확장 및 전체 제품 구조 1차 확정

### 현재 검수 가능한 영역

1. 전체 교재 구조(PART → CHAPTER → UNIT)
2. 저자식 학습 흐름
3. 학생 홈
4. 문제 화면
5. 근거 판단
6. 5초 Rule
7. 학습 결과
8. 관리자 화면
9. 유지보수·재사용 구조

### 검수 모드

GitHub Pages 주소 뒤에 `?review=1`을 붙여 사용합니다.

검수 모드는 실제 진도·정답·채점과 분리되어 있으며 UI, 콘텐츠 계층, 정보 밀도, 태블릿·PC 시인성만 확인하기 위한 화면입니다.

### 현재 구현된 실제 학습 UNIT

- PART 1 · CHAPTER 1 · UNIT 1
- PART 1 · CHAPTER 1 · UNIT 2
- PART 1 · CHAPTER 1 · UNIT 3

### 핵심 파일

- `index.html`
- `css/app.css`
- `css/context-fix.css`
- `css/review.css`
- `data/course-map.js`
- `js/app.js`
- `js/review-mode.js`
- `js/unit1-data.js`
- `js/unit2-data.js`
- `js/unit2-engine.js`
- `js/unit3-data.js`
- `js/unit3-engine.js`

현재 저장소가 Public이므로 교재 원문 전체를 저장소에 복제하지 않고, 앱 검증용 파생 문항과 구조 데이터를 사용합니다.
