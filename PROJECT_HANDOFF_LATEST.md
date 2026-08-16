# JK 5SEC Grammar — PROJECT HANDOFF LATEST

> 새 채팅 복구용 최우선 문서
> 시작 문구: `JK 5초 다음 작업 진행`, `다음 작업 진행`, `다음 단계 진행`, `진행`, 또는 `전진`

## 0. 복구 순서
1. GitHub `kfcccpro/jk-5sec` 최신 `main` 확인
2. `PROJECT_HANDOFF_LATEST.md`, `PROJECT_STATUS.md`, `VERSION` 확인
3. 최신 GitHub Actions / Pages 확인
4. 첫 미완료 단계부터 진행

## 1. Current baseline
- Version: `0.33.0`
- Runtime lessons: 21
- Derived items: 105
- Content contract: `2.8.0`
- HTML/CSS/Vanilla JS + localStorage + GitHub Pages
- 학생 PIN 8081 / 관리자 PIN 2007

## 2. Latest completed phase
### Phase 33 — P2 / CH1 / U5
`의미상의 주어`

Source: textbook p.46.
Author rule:
- 사람의 성질·태도를 평가하는 형용사 → `of + 목적격`
- 그 외 일반 조건·상황·난이도 등 → `for + 목적격`

Decision loop:
`형용사 확인 → 사람의 성질 평가? → YES: of / NO: for → 5초 Rule → 재도전`

Files:
- `js/unit21-data.js`
- `js/unit21-engine.js`
- `js/phase14-common-shell.js`
- `data/content-contract.js`
- `index.html`

Runtime mapping: runtime 21 = P2 / CH1 / U5.

## 3. Architecture rules
- Public GitHub에는 교재 원문 예문을 저장하지 않고 파생문항만 저장한다.
- runtime lesson ID는 전역 순번, part/chapter/unit은 실제 교재 metadata다.
- 각 UNIT은 교재 저자의 실제 판단 순서를 짧은 클릭 행동으로 변환한다.
- Shell/index/contract integration은 semantic CI가 검증한다.

## 4. Still pending, non-blocking
- Phase 13B physical-device visual confirmation
- Phase 14B live interaction regression confirmation

## 5. Next phase
### Phase 34 — P2 / CH1 / U6
`to부정사의 부정`

다음 교재 UNIT의 저자식 판단 규칙을 확인한 뒤 runtime 22로 구현한다.

사용자가 `진행`, `전진`, `다음 작업 진행`, 또는 여러 단계를 한꺼번에 진행하라고 하면 Phase 34부터 최신 main 기준으로 이어간다.
