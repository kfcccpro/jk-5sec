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
- Version: `0.44.0`
- Runtime lessons: 32
- Derived items: 160
- Content contract: `3.5.0`
- HTML/CSS/Vanilla JS + localStorage + GitHub Pages
- 학생 PIN 8081 / 관리자 PIN 2007

## 2. Latest completed phases
### Phase 42 — PART 3 / UNIT 1
`현재 시제 / 과거 시제`
- Source: JK textbook p.54
- Runtime 30
- 판단 순서: 문장 성격 확인 → 일반 사실·습관·불변의 진리는 현재 / 끝난 역사적 사실은 과거

### Phase 43 — PART 3 / UNIT 2
`과거 동사 / have[had] p.p.`
- Source: JK textbook p.54
- Runtime 31
- 판단 순서: 끝난 과거 시점 → 과거 / 현재까지 이어짐 → 현재완료 / 다른 과거보다 더 이전 → 과거완료

### Phase 44 — PART 3 / UNIT 3
`시간과 시제의 불일치`
- Source: JK textbook p.56
- Runtime 32
- 판단 순서: 절의 역할 확인 → 시간·조건 부사절이면 미래 의미라도 현재 시제

## 3. Implemented JK source boundary
현재 runtime 1~32는 `data/jk-source-map.js`에서 JK 교재의 PART/CHAPTER/UNIT/페이지와 연결한다.
- PART 1 implemented range: p.18~40-41
- PART 2 implemented range: p.44~51
- PART 3 implemented range: p.54~56
- Runtime 30/31/32 source pages: p.54 / p.54 / p.56
- 3800제의 `PSS`, `PRACTICE`, 3800 페이지 체계는 이 프로젝트의 출처로 사용하지 않으며 CI에서 차단한다.

## 4. Architecture rules
- Public GitHub에는 JK 교재 원문 전체를 저장하지 않고 파생문항만 저장한다.
- runtime lesson ID는 전역 순번, part/chapter/unit은 실제 JK 교재 metadata다.
- 각 UNIT은 JK 교재 저자의 실제 판단 순서를 짧은 클릭 행동으로 변환한다.
- Shell/index/contract integration은 semantic CI가 검증한다.
- 교재 출처는 `JK_SOURCE_MAP`만 사용하며 다른 교재 좌표를 혼합하지 않는다.
- semantic validator는 source map과 implemented runtime 수를 자동 대조하고 runtime당 정확히 5문항을 요구하므로 Phase마다 총량 상수를 수동 수정하지 않는다.

## 5. Wrong-answer recovery
오답 게이트는 `main`에 승격되어 있다.
- localStorage key: `jk5sec_wrongbook_v1`
- 최초 오답이 발생하면 runtime/item ID와 JK 교재 좌표를 저장
- 같은 Chapter 안의 UNIT 이동에는 불필요한 게이트를 걸지 않음
- 이후 더 뒤의 Chapter/Part를 시작하기 전에 이전 미해결 오답을 먼저 회수
- 복습에서 다시 틀리면 정답/해설을 노출하지 않고 JK 교재 위치만 표시
- `책 확인 완료 · 다시 풀기` 후 같은 문제 재도전
- PART 3처럼 chapter가 없는 구간은 `PART 3 · UNIT n`으로 표시하며 `CH 0`은 노출하지 않음
- 맞힌 기록도 삭제하지 않고 recovered 상태로 보존

## 6. Validation baseline
- JavaScript syntax
- semantic content/source-integrity CI
- runtime/source map self-maintaining validation
- 32 runtime / 160 derived items
- browser wrong-answer recovery regression
- GitHub Pages deployment

## 7. Still pending
- Phase 13B physical-device visual confirmation
- Phase 14B live interaction regression confirmation

## 8. Next content phase
### Phase 45 — PART 4 / UNIT 1
`주어 - 부정사, 동명사, 명사구(절)`
Source page is re-verified from the JK textbook immediately before implementation.

새 대화에서는 3800 저장소를 기준으로 복구하지 않는다. `kfcccpro/jk-5sec`의 최신 main을 기준으로 이어간다.
