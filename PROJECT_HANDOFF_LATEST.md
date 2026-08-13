# JK 5SEC Grammar — PROJECT HANDOFF LATEST

> 새 채팅 복구용 최우선 문서
> 시작 문구: `JK 5초 다음 작업 진행`, `다음 작업 진행`, `다음 단계 진행`, 또는 `진행`

## 0. 복구 순서
1. GitHub `kfcccpro/jk-5sec` 최신 `main` 확인
2. `PROJECT_HANDOFF_LATEST.md`, `PROJECT_STATUS.md`, `VERSION` 확인
3. 최신 GitHub Actions / Pages 확인
4. 첫 미완료 단계부터 진행

## 1. Current baseline
- Version: `0.29.0`
- Runtime lessons: 17
- Derived items: 85
- Content contract: `2.4.0`
- HTML/CSS/Vanilla JS + localStorage + GitHub Pages
- 학생 PIN 8081 / 관리자 PIN 2007

## 2. Newly completed continuous block

### Phase 27 — P1 / CH4 / U2
`목적어(명사)에 따른 자동사·타동사 구분`

Source: textbook p.38~39.
Decision loop:
`핵심 동사 → 명사 직접 연결/전치사 연결 → 자동사/타동사 → 전치사 필요 여부`

Files: `js/unit15-data.js`, `js/unit15-engine.js`, `docs/PHASE27_CH4_UNIT2_ANALYSIS.md`

### Phase 28 — P1 / CH5
`감정동사`

Source: textbook p.40~41.
The textbook TOC has no UNIT number for CH5, so runtime metadata uses `unit: 0` and UI displays only `PART 1 · CH 5`.
Decision loop:
`감정동사 → 감정의 원인/경험자 → 문장 자리 → V-ing/p.p.`

Files: `js/unit16-data.js`, `js/unit16-engine.js`, `docs/PHASE28_CH5_EMOTION_VERBS_ANALYSIS.md`

### Phase 29 — P2 / CH1 / U1
`본동사 자리인지 준동사 자리인지부터 판단`

Source: textbook p.44.
Decision loop:
`본동사 유무 → 본동사/준동사 자리 → 명사·형용사·부사 역할 → 본동사/to-V`

Files: `js/unit17-data.js`, `js/unit17-engine.js`, `docs/PHASE29_P2_CH1_UNIT1_ANALYSIS.md`

## 3. Integration rules
- Public GitHub에는 교재 원문 문장을 저장하지 않고 파생문항만 저장한다.
- runtime lesson ID는 전역 순번, part/chapter/unit metadata는 실제 교재 구조다.
- PART 2부터 CHAPTER 번호가 다시 시작되므로 학생 홈의 모든 lesson label은 PART 번호까지 표시한다.
- Phase 26 이후 CI는 콘텐츠 계약뿐 아니라 Shell/index 연결까지 검사한다.

## 4. Next phase
### Phase 30 — PART 2 / CHAPTER 1 / UNIT 2
`목적어로 to부정사만을 취하는 타동사`

교재 p.44의 저자 목록과 판단 구조를 먼저 확인한 후 runtime lesson 18로 구현한다.

사용자가 `진행` 또는 `다음 작업 진행`이라고 입력하면 Phase 30부터 이어간다.
