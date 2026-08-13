# JK 5SEC Grammar — PROJECT HANDOFF LATEST

> 새 채팅 복구용 최우선 문서
> 시작 문구: `JK 5초 다음 작업 진행`, `다음 작업 진행`, `다음 단계 진행`, 또는 `진행`

## 0. 복구 순서
1. GitHub `kfcccpro/jk-5sec` 최신 `main` 확인
2. `PROJECT_HANDOFF_LATEST.md`, `PROJECT_STATUS.md`, `VERSION` 확인
3. 최신 GitHub Actions / Pages 확인
4. 첫 미완료 단계부터 진행

## 1. Current baseline
- Version: `0.32.0`
- Runtime lessons: 20
- Derived items: 100
- Content contract: `2.7.0`
- HTML/CSS/Vanilla JS + localStorage + GitHub Pages
- 학생 PIN 8081 / 관리자 PIN 2007

## 2. Newly completed continuous block

### Phase 30 — P2 / CH1 / U2
`목적으로 to부정사만을 취하는 타동사`

Source: textbook p.44.
Author list: decide, ask, agree, attempt, expect, fail, want, wish, hope, promise, refuse, allow.
Decision loop:
`본동사 → 목록 확인 → 목적어 역할 → to-V`

Files: `js/unit18-data.js`, `js/unit18-engine.js`, `docs/PHASE30_P2_CH1_UNIT2_ANALYSIS.md`

### Phase 31 — P2 / CH1 / U3
`to부정사의 숙어 표현`

Source: textbook p.45.
Core expressions: manage / choose / come / happen(chance) / intend / seek / pretend / fail + to-V.
Decision loop:
`표현 → 숙어 의미 → 동사 + to-V 패턴 → to-V`

Files: `js/unit19-data.js`, `js/unit19-engine.js`, `docs/PHASE31_P2_CH1_UNIT3_ANALYSIS.md`

### Phase 32 — P2 / CH1 / U4
`목적격 보어로 to부정사만을 취하는 동사`

Source: textbook p.45.
Author list: advise, allow, ask, cause, enable, expect, force, intend, invite, order, persuade, warn, permit, teach, tell, want, recommend, encourage, beg, urge.
Decision loop:
`본동사 → 목적어 O → 목적격 보어 역할 → to-V`

Files: `js/unit20-data.js`, `js/unit20-engine.js`, `docs/PHASE32_P2_CH1_UNIT4_ANALYSIS.md`

## 3. Architecture rules
- Public GitHub에는 교재 원문 예문을 저장하지 않고 파생문항만 저장한다.
- runtime lesson ID는 전역 순번, part/chapter/unit은 실제 교재 metadata다.
- UNIT 2의 `V + to-V`와 UNIT 4의 `V + O + to-V`를 별도 판단 엔진으로 유지한다.
- Shell/index/contract integration은 semantic CI가 검증한다.

## 4. Still pending, non-blocking
- Phase 13B physical-device visual confirmation
- Phase 14B live interaction regression confirmation

## 5. Next phase
### Phase 33 — P2 / CH1 / U5
`의미상의 주어`

Textbook p.46의 `for + 목적격` / `of + 목적격` 구분 조건을 먼저 확인한 뒤 runtime 21로 구현한다.

사용자가 `진행`, `다음 작업 진행`, 또는 여러 단계를 한꺼번에 진행하라고 하면 Phase 33부터 최신 main 기준으로 이어간다.
