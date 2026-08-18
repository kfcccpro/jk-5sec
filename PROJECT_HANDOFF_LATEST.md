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
- Version: `0.50.0`
- Runtime lessons: 38
- Derived items: 190
- Content contract: `3.7.0`
- HTML/CSS/Vanilla JS + localStorage + GitHub Pages
- 학생 PIN 8081 / 관리자 PIN 2007

## 2. Latest completed phases
### Phase 48 — PART 4 / UNIT 4
`the number of / a number of`
- Source: JK textbook p.62
- Runtime 36
- 판단 순서: number 표현 확인 → `the number of`는 ‘~의 수’라 단수 / `a number of`는 ‘많은 ~’이라 복수

### Phase 49 — PART 4 / UNIT 5
`상관접속사로 연결된 주어`
- Source: JK textbook p.63
- Runtime 37
- 판단 순서: 연결 형태 확인 → not only/but also·not/but·either/or·neither/nor는 동사에 가까운 주어 / `A as well as B`는 앞 A / `both A and B`는 복수

### Phase 50 — PART 4 / UNIT 6
`수식어를 동반하는 주어`
- Source: JK textbook p.63
- Runtime 38
- 판단 순서: 관계사절·형용사구·분사·to부정사구·전치사구·동격 that절 같은 수식어 제거 → 진짜 주어에 수일치

## 3. Implemented JK source boundary
현재 runtime 1~38은 `data/jk-source-map.js`에서 JK 교재의 PART/CHAPTER/UNIT/페이지와 연결한다.
- PART 1 implemented range: p.18~40-41
- PART 2 implemented range: p.44~51
- PART 3 implemented range: p.54~56
- PART 4 implemented range: p.60~63
- Runtime 36/37/38 source pages: p.62 / p.63 / p.63
- 3800제의 `PSS`, `PRACTICE`, 3800 페이지 체계는 이 프로젝트의 출처로 사용하지 않으며 CI에서 차단한다.

## 4. Architecture rules
- Public GitHub에는 JK 교재 원문 전체를 저장하지 않고 파생문항만 저장한다.
- runtime lesson ID는 전역 순번, part/chapter/unit은 실제 JK 교재 metadata다.
- 각 UNIT은 JK 교재 저자의 실제 판단 순서를 짧은 클릭 행동으로 변환한다.
- Shell/index/contract integration은 semantic CI가 검증한다.
- 교재 출처는 `JK_SOURCE_MAP`만 사용하며 다른 교재 좌표를 혼합하지 않는다.
- semantic validator는 source map과 implemented runtime 수를 자동 대조하고 runtime당 정확히 5문항을 요구한다.

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
- 38 runtime / 190 derived items
- browser wrong-answer recovery regression
- runtime 36~38 browser rendering regression
- GitHub Pages deployment

## 7. Still pending
- Phase 13B physical-device visual confirmation
- Phase 14B live interaction regression confirmation

## 8. Next content phase
### Phase 51 — PART 4 / UNIT 7
`부사(구)가 문두로 나오는 도치구문`
Source: JK textbook p.65.

새 대화에서는 3800 저장소를 기준으로 복구하지 않는다. `kfcccpro/jk-5sec`의 최신 main을 기준으로 이어간다.
