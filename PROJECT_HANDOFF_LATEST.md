# JK 5SEC Grammar — PROJECT HANDOFF LATEST

> 새 채팅 복구용 최우선 문서
> 시작 문구: `JK 5초 다음 작업 진행`, `다음 작업 진행`, `다음 단계 진행`, `진행`, 또는 `전진`

## 0. 복구 순서
1. GitHub `kfcccpro/jk-5sec` 최신 `main` 확인
2. `PROJECT_HANDOFF_LATEST.md`, `PROJECT_STATUS.md`, `VERSION` 확인
3. 최신 GitHub Actions / Pages 확인
4. 첫 미완료 단계부터 진행

## 1. Current baseline
- Repository: `kfcccpro/jk-5sec`
- Source family: JK `답이 보이는 5초 영어어법`
- Version: `0.38.0`
- Runtime lessons: 26
- Derived items: 130
- Content contract: `3.3.0`
- HTML/CSS/Vanilla JS + localStorage + GitHub Pages
- 학생 PIN 8081 / 관리자 PIN 2007

## 2. Latest completed phase
### Phase 38 — PART 2 / CHAPTER 1 / UNIT 10
`to부정사의 시제`

Source: JK textbook p.49.
Author-rule conversion:
- to부정사 사건이 본동사와 같은 시점 → `to-V`
- to부정사 사건이 본동사보다 먼저 → `to have p.p.`

Runtime mapping: runtime 26 = P2 / CH1 / U10.

## 3. Implemented JK source boundary
현재 runtime 1~26은 `data/jk-source-map.js`에서 JK 교재의 PART/CHAPTER/UNIT/페이지와 연결한다.
- PART 1 implemented range: p.18~40-41
- PART 2 CH1 implemented range: p.44~49
- 3800제의 `PSS`, `PRACTICE`, 3800 페이지 체계는 이 프로젝트의 출처로 사용하지 않는다.

## 4. Architecture rules
- Public GitHub에는 JK 교재 원문 전체를 저장하지 않고 파생문항만 저장한다.
- runtime lesson ID는 전역 순번, part/chapter/unit은 실제 JK 교재 metadata다.
- 각 UNIT은 JK 교재 저자의 실제 판단 순서를 짧은 클릭 행동으로 변환한다.
- Shell/index/contract integration은 semantic CI가 검증한다.
- 교재 출처는 `JK_SOURCE_MAP`만 사용하며 다른 교재 좌표를 혼합하지 않는다.

## 5. Wrong-answer recovery direction
오답은 `jk5sec_wrongbook_v1`에 별도 저장한다.
- 최초 오답이 발생하면 runtime/item ID와 JK 교재 좌표를 저장
- 이후 더 뒤의 runtime 학습을 시작하기 전에 이전 미해결 오답을 먼저 회수
- 복습에서 다시 틀리면 정답/해설을 노출하지 않고 JK 교재 페이지/PART/CHAPTER/UNIT만 표시
- `책 확인 완료 · 다시 풀기` 후 같은 문제 재도전
- 맞힌 기록도 삭제하지 않고 recovered 상태로 보존

## 6. Still pending
- 새 wrong-answer gate 브라우저 회귀검증 및 main 승격
- Phase 13B physical-device visual confirmation
- Phase 14B live interaction regression confirmation

## 7. Next content phase
### Phase 39 — PART 2 / CHAPTER 2 / UNIT 1
`동명사를 취하는 타동사`
Source start: JK textbook p.50.

새 대화에서는 3800 저장소를 기준으로 복구하지 않는다. `kfcccpro/jk-5sec`의 최신 main을 기준으로 이어간다.
