# JK 5SEC Grammar — PROJECT HANDOFF LATEST

> **새 채팅 복구용 최우선 문서**
>
> 사용자가 새 채팅에서 **`다음 작업 진행`**이라고만 입력하면 추가 질문 없이 이 문서를 읽고 아래 `FIRST UNFINISHED WORK`부터 즉시 실행한다.
> `진행`, `계속 진행`, `다음 단계 진행`, `JK 5초 다음 작업 진행`도 같은 의미로 처리한다.

## 0. 새 채팅에서 반드시 수행할 복구 순서
1. GitHub 저장소 `kfcccpro/jk-5sec`의 `main`과 `phase92-full-content-integration` 최신 HEAD를 확인한다.
2. 이 파일 `PROJECT_HANDOFF_LATEST.md`와 `PROJECT_STATUS.md`, `VERSION`을 읽는다.
3. Draft PR **#3** `Phase 92 full content integration + Phase 14B regression evidence` 상태를 확인한다.
4. 최신 `Phase 14B Live Regression` GitHub Actions 실행 상태와 artifact를 확인한다.
5. **콘텐츠를 새로 만들지 않는다.** PART 1~10 콘텐츠 제작은 끝났다.
6. 아래 `FIRST UNFINISHED WORK`의 첫 항목부터 질문 없이 계속 작업한다.

---

## 1. 현재 기준선
- Repository: `kfcccpro/jk-5sec`
- Default branch: `main`
- Integration branch: `phase92-full-content-integration`
- Integration base main SHA: `a4b1bddbef7eddbce2923c103a3d5e77bdd214cc`
- Integration version: `0.92.0`
- Content contract target: `9.0.0`
- 학생 PIN: `8081`
- 관리자 PIN: `2007`
- Production Pages: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`
- Stack: HTML/CSS/Vanilla JS + localStorage + GitHub Pages

## 2. 콘텐츠 완료 상태 — 다시 만들지 말 것
- PART 1~10 콘텐츠 제작 완료.
- Runtime lessons: **79**.
- Derived practice items: **405**.
- Runtime 1~20: 기존 main의 file-based 구조 유지.
- Runtime 21~79: Phase 33~92에서 제작한 305개 파생문항.
- Phase 90: PART 10 최근기출형 신규 혼합평가 runtime 78, 10문항.
- Phase 91: PART 10 다지기형 신규 고난도 전이평가 runtime 79, 10문항.
- Phase 92: answer-map cross-check + 전체 로컬 콘텐츠 QA + GitHub 통합 준비.
- 교재 원문 예문/답지 문항을 public practice data에 복제하지 않는다. 공개 콘텐츠는 파생문항만 사용한다.

## 3. 로컬 Phase 92 QA에서 이미 PASS한 것
- PART 10 혼합문항 20개 검증.
- PART 10에서 11개 문법 family 대표성 확인.
- Deferred runtime 21~79: 305 items / 59 runtimes.
- Integrated target: 405 items / 79 runtimes.
- answer/choices/schema/runtime ID/source boundary semantic validation: PASS.
- JavaScript syntax validation: PASS.

**주의:** 위 PASS는 정적/semantic 검증이다. 실제 브라우저 상호작용 검증인 Phase 14B와 실제기기 시각검증 Phase 13B를 대체하지 않는다.

## 4. 현재 Phase 92 통합 아키텍처 — 실제 GitHub 브랜치 기준
- Branch: `phase92-full-content-integration`.
- `data/runtime-bundle-01.txt` ... `data/runtime-bundle-09.txt`: runtime 21~79 gzip/base64 청크.
- `js/phase92-loader.js`: 9개 청크 fetch → base64 합치기 → gzip 해제 → runtime 코드 eval.
- `data/runtime-meta-21-79.js`: runtime 21~79 metadata/schema 확장.
- `data/content-contract-extension.js`: contract `9.0.0` 확장.
- `js/phase92-registry-extension.js`: common shell에 runtime 21~79 등록, PART 1~10 학생/관리자 UI 확장.
- `scripts/validate-content-contract.js`: 405문항 semantic integration validator.
- `scripts/phase14b-live-regression.cjs`: Playwright 실제 클릭 회귀 harness.
- `.github/workflows/phase14b-regression.yml`: Phase 14B 자동 회귀 및 evidence artifact 생성.

### 중요
대화 중 브라우저 호환성을 위해 runtime 21~79를 일반 JS 번들로 바꾸는 아이디어가 잠시 검토되었지만 **현재 GitHub 브랜치의 실제 구현은 여전히 gzip/base64 9-chunk + `DecompressionStream` loader**이다. 새 채팅은 반드시 저장소 실제 파일을 기준으로 판단하고, 과거 제안만 믿고 구조를 가정하지 않는다.

## 5. Draft PR / Phase 14B 증거 상태
- Draft PR: **#3**
- PR title: `Phase 92 full content integration + Phase 14B regression evidence`
- Base: `main`
- Head: `phase92-full-content-integration`
- PR은 Phase 14B PASS 전 merge 금지로 운용한다.

### Phase 14B first run
- Workflow: `Phase 14B Live Regression`
- Run ID: **31858834679**
- Job ID: **94948361989**
- Conclusion: **FAILURE**
- Evidence artifact name: `phase14b-regression-evidence`
- Artifact ID: **9239878808**
- Artifact SHA-256 reported by Actions: `ca65b5bcf21cfbd91f061c68094bc46a5b0a325c37f671db37e496170708ffbd`

### 첫 실행에서 확인된 실제 결과
PASS:
1. login screen loads
2. wrong student PIN is rejected
3. Playwright/Chromium 설치
4. JavaScript syntax check
5. local app server startup
6. evidence artifact upload

FAIL 위치:
- 학생 PIN `8081` 로그인 후 `window.JK_PHASE92_READY_DONE === true`를 기다리다가 **30,000ms timeout**.
- 따라서 runtime 21~79 deferred content loader가 ready 상태에 도달하지 못했다.
- 이 실패가 해결되기 전에는 Phase 14B 완료 처리 금지.

## 6. 현재 알려진 핵심 blocker
통합 과정에서 `runtime-bundle-04` 길이 불일치가 발견되었다.
- 로컬 canonical source의 runtime-bundle-04 예상 길이: **10,000 bytes**
- GitHub에 올라간 runtime-bundle-04 확인 길이: **9,612 bytes**
- 차이: **388 bytes 부족**
- 로컬 9-chunk canonical total: **80,828 bytes**

이 bundle 손상이 Phase 14B loader timeout의 유력 원인이지만, **로그/아티팩트를 확인하기 전 원인으로 단정하지 않는다.**

Canonical recovery source 이름:
- `jk-5sec-phase33-92-staging.zip`

새 채팅에서 이 ZIP이 현재 runtime에 없다면 File Library에서 exact filename으로 찾는다. 찾을 수 없으면 GitHub branch와 Phase 14B artifact를 근거로 복구하되, 손상된 chunk를 정상 원본이라고 가정하지 않는다.

---

# FIRST UNFINISHED WORK — 새 채팅에서 여기부터 실행

## A. Phase 14B failure evidence 확인
1. Run `31858834679` / artifact `9239878808`에서 `result.json`과 failure screenshot을 확인한다.
2. browser `pageErrors` / `consoleErrors`가 있으면 loader timeout의 직접 원인을 기록한다.
3. 현재 `data/runtime-bundle-01.txt`~`09.txt` 실제 길이와 합계를 GitHub에서 다시 확인한다.

## B. runtime-bundle-04 무결성 복구
1. canonical `jk-5sec-phase33-92-staging.zip`에서 정상 chunk 04를 복구한다.
2. GitHub integration branch의 `data/runtime-bundle-04.txt`를 정상 원본으로 교체한다.
3. 다음 값을 반드시 검증한다.
   - chunk 04 = 10,000 bytes
   - 9 chunks total = 80,828 bytes
   - base64 concat/decode 성공
   - gzip decompress 성공
   - runtime 21~79 로드 성공
4. `node scripts/validate-content-contract.js` 및 JS syntax 검증을 다시 통과시킨다.

## C. Phase 14B 재실행 — PASS evidence 확보
`Phase 14B Live Regression`을 다시 실행한다. 최소 종료조건:
1. 잘못된 PIN 거부
2. 학생 PIN 8081 로그인
3. `JK_PHASE92_READY_DONE === true`
4. 학생 홈에 runtime button **79개**
5. legacy runtime 1 진입
6. legacy runtime 20 진입
7. runtime 21에서 5문항 전체 실제 클릭 흐름 완료
8. runtime 21 completion/localStorage 기록 확인
9. final runtime 78 진입
10. final runtime 79 진입
11. 관리자 PIN 2007 로그인
12. `?review=1` 검수모드 로드
13. browser pageerror/critical console error = 0
14. screenshot + `result.json` artifact 존재

**위 14개가 모두 PASS하고 artifact가 존재해야만 `Phase 14B = COMPLETE`로 바꾼다.**

## D. PR #3 통합
Phase 14B PASS 후에만:
1. Draft PR #3 전체 diff/semantic CI 최종 확인.
2. PR을 merge 가능한 상태로 전환/merge.
3. main에서 VERSION/content contract/runtime totals 재확인.
4. GitHub Pages workflow 성공 확인.
5. production URL에서 학생 PIN, 관리자 PIN, runtime 1/21/78/79, review mode smoke test.

## E. Phase 13B 실제기기 시각검증
Phase 14B와 별개이며 자동 headless 검증으로 닫지 않는다.
실제 Galaxy/iPad/PC에서 최소 확인:
- 8081 학생 로그인
- 홈 PART 1~10 및 79 runtime 표시
- 버튼/터치 타깃
- 긴 영문 줄바꿈
- 스크롤/viewport overflow
- 학습 선택지와 판단 단계
- 관리자 2007 화면
- review mode

실제기기 증거 확보 전 `Phase 13B = PENDING` 유지.

---

## 7. Phase 14B 자동 회귀 harness의 현재 의도
`phase14b-live-regression.cjs`는 다음을 자동 검증하도록 추가됨:
- 잘못된 PIN 거부
- 학생 PIN 8081
- 79 runtime registry
- runtime 1, 20 legacy compatibility
- runtime 21 full 5-item interaction loop
- localStorage completion persistence
- runtime 78/79 진입
- 관리자 PIN 2007
- review mode
- page/console errors
- screenshots + result.json artifact

회귀 script 자체의 locator/단계가 실제 UI와 다르면 앱 결함으로 단정하지 말고 먼저 harness와 실제 DOM을 대조한다. 단, loader가 ready 자체에 도달하지 못하는 문제는 harness 이후 단계가 아니라 앱 로딩 blocker로 취급한다.

## 8. 절대 하지 말 것
- PART 1~10 문법 콘텐츠를 다시 생성하지 않는다.
- Phase 14B PASS 없이 PR #3을 merge하지 않는다.
- headless Chromium viewport만 보고 Phase 13B 실제기기 검증 완료라고 하지 않는다.
- GitHub main이 Phase 92라고 가정하지 않는다. merge 전까지 main은 이전 기준이다.
- 손상된 `runtime-bundle-04`를 canonical source로 재사용하지 않는다.
- 교재 원문 예문을 public practice data에 복제하지 않는다.

## 9. 사용자가 새 채팅에서 `다음 작업 진행`이라고 입력했을 때의 응답 방식
- 설명을 다시 요구하지 않는다.
- 이 파일을 GitHub에서 먼저 읽는다.
- 최신 branch/PR/Actions 상태를 확인한다.
- **`FIRST UNFINISHED WORK` 중 아직 끝나지 않은 첫 작업부터 바로 실행한다.**
- 2~3개 관련 조치를 묶어서 검증하며 진행하되, Phase 14B evidence gate와 Phase 13B physical-device gate는 건너뛰지 않는다.
- 작업 완료 후 `PROJECT_HANDOFF_LATEST.md`와 `PROJECT_STATUS.md`를 다시 최신화한다.
