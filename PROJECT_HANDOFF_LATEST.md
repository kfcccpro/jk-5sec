# JK 5SEC Grammar — PROJECT HANDOFF LATEST

> 새 채팅 복구용 최우선 문서
> 시작 문구: `JK 5초 다음 작업 진행`, `다음 작업 진행`, `다음 단계 진행`, 또는 `진행`

## 0. 복구 순서
1. GitHub `kfcccpro/jk-5sec` 최신 `main`과 `phase92-full-content-integration` 상태 확인.
2. `PROJECT_HANDOFF_LATEST.md`, `PROJECT_STATUS.md`, `VERSION` 확인.
3. 최신 GitHub Actions / Pages 배포 상태 확인.
4. 아래 첫 미완료 단계부터 진행.

## 1. Current content baseline
- Integration version: `0.92.0`.
- PART 1~10 콘텐츠 제작 완료.
- Runtime lessons: 79.
- Derived items: 405.
- Content contract target: `9.0.0`.
- HTML/CSS/Vanilla JS + localStorage + GitHub Pages.
- 학생 PIN 8081 / 관리자 PIN 2007.
- Integration base main SHA: `a4b1bddbef7eddbce2923c103a3d5e77bdd214cc`.

## 2. Completed deferred content block
- Phase 33~89: PART 2 CH1 U5부터 PART 9 U4까지 runtime 21~77, 285 newly derived items.
- Phase 90: PART 10 `실전 종합 문제 - 최근 기출` 구조를 참고한 신규 혼합평가 runtime 78, 10 derived items.
- Phase 91: PART 10 `실전 종합 문제 - 다지기` 구조를 참고한 신규 고난도 전이평가 runtime 79, 10 derived items.
- Phase 92: answer-map cross-check + full local content QA + GitHub integration preparation.
- 교재 PART 10 답지 구간은 학생 runtime으로 만들지 않는다.

## 3. Validated totals
Local Phase 92 QA passed before GitHub integration:
- 20 PART 10 mixed assessment items verified.
- 11 grammar families represented in PART 10.
- Deferred runtime 21~79: 305 items / 59 runtimes.
- Integrated target including existing runtime 1~20: 405 items / 79 runtimes.
- Source/copyright boundary: PASS; public practice data stores derived practice only.

## 4. Phase 92 integration architecture
- Branch: `phase92-full-content-integration`.
- Existing runtime 1~20 remains unchanged and file-based.
- Runtime 21~79 is packaged into nine gzip/base64 chunks: `data/runtime-bundle-01.txt` ... `09.txt`.
- `js/phase92-loader.js` fetches/decompresses/evaluates the deferred runtime bundle.
- `data/runtime-meta-21-79.js` extends collection metadata and schemas.
- `data/content-contract-extension.js` extends contract to version `9.0.0`.
- `js/phase92-registry-extension.js` exposes PART 1~10 in the common student/admin shell after runtime loading.
- `scripts/validate-content-contract.js` validates all 405 items and Phase 92 integration in CI.

## 5. Learning architecture rules preserved
- Public GitHub stores no textbook example/full source text; textbook remains reference-only.
- Runtime ID is a global internal sequence. PART/CHAPTER/UNIT remain actual textbook metadata.
- Every UNIT retains its author-specific decision sequence; do not replace them with one generic grammar heuristic.
- PART 10 uses newly derived mixed questions, not copied recent-exam or answer-section questions.
- Problem-first loop remains: Cold Attempt → decision clue → author rule → repair → retry/review.

## 6. Still pending — do not mark complete without evidence
- Phase 13B: physical-device visual confirmation.
- Phase 14B: live interaction regression confirmation.

## 7. Immediate next milestone
1. Finish branch sanity/PR review for `phase92-full-content-integration`.
2. Merge to `main` if semantic integration is clean.
3. Confirm GitHub Actions semantic CI and Pages deploy success.
4. Run production smoke checks at `https://kfcccpro.github.io/jk-5sec/` and `?review=1`.
5. Keep Phase 13B/14B open until physical-device/live-interaction evidence is actually collected.

사용자가 새 채팅에서 `진행` 또는 `다음 작업 진행`이라고 하면 콘텐츠를 새로 만들지 말고 **Phase 92 통합·CI·배포 검증의 첫 미완료 단계부터** 이어간다.
