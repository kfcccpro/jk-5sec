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
- Version: `0.47.0`
- Runtime lessons: 35
- Derived items: 175
- Content contract: `3.6.0`
- HTML/CSS/Vanilla JS + localStorage + GitHub Pages
- 학생 PIN 8081 / 관리자 PIN 2007

## 2. Latest completed phases
### Phase 45 — PART 4 / UNIT 1
`주어 - 부정사, 동명사, 명사구(절)`
- Source: JK textbook p.60
- Runtime 33
- 판단 순서: 주어 덩어리 확인 → to부정사구·동명사구·명사절은 하나의 내용으로 보고 단수 취급

### Phase 46 — PART 4 / UNIT 2
`주어 - 부분사 + of + 명사`
- Source: JK textbook p.61
- Runtime 34
- 판단 순서: 부분사보다 `of` 뒤 기준 명사 확인 → 그 명사의 수에 동사 일치

### Phase 47 — PART 4 / UNIT 3
`복수 형태 → 단수 취급`
- Source: JK textbook p.62
- Runtime 35
- 판단 순서: 겉모양보다 실제 의미 확인 → 국가명·병명·학문명·news는 단수 가능 / statistics는 의미에 따라 단·복수 구분

## 3. Implemented JK source boundary
현재 runtime 1~35는 `data/jk-source-map.js`에서 JK 교재의 PART/CHAPTER/UNIT/페이지와 연결한다.
- PART 1 implemented range: p.18~40-41
- PART 2 implemented range: p.44~51
- PART 3 implemented range: p.54~56
- PART 4 implemented range: p.60~62
- Runtime 33/34/35 source pages: p.60 / p.61 / p.62
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
- chapter가 없는 PART 3/4 구간은 `PART n · UNIT n`으로 표시하며 `CH 0`은 노출하지 않음
- 맞힌 기록도 삭제하지 않고 recovered 상태로 보존

## 6. Validation baseline
- JavaScript syntax
- semantic content/source-integrity CI
- runtime/source map self-maintaining validation
- 35 runtime / 175 derived items
- browser wrong-answer recovery regression
- GitHub Pages deployment

## 7. Still pending
- Phase 13B physical-device visual confirmation
- Phase 14B live interaction regression confirmation

## 8. Next content phase
### Phase 48 — PART 4 / UNIT 4
`the number of / a number of`
Source: JK textbook p.62.

새 대화에서는 3800 저장소를 기준으로 복구하지 않는다. `kfcccpro/jk-5sec`의 최신 main을 기준으로 이어간다.
