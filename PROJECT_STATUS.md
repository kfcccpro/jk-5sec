# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.14.0-phase14-common-shell`

## Source of truth

- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed

- Phase 1: textbook philosophy analysis
- Phase 2: UNIT 1 author-method analysis
- Phase 3: responsive iPad/tablet/PC UI shell
- Phase 4: student/admin PIN shell
- Phase 5: GitHub Pages automatic deployment
- Phase 6: UNIT 1 five-question learning loop
- Phase 7: UNIT 2 learning loop
- Phase 8: UNIT 3 learning loop
- Phase 9: full textbook course map for review/navigation
- Phase 10: review-only UI inspection mode expanded
- Phase 11: result/admin/maintenance review architecture
- Phase 12: learner-preferred `1001` visual language adapted to JK 5SEC
- Phase 13A: review-width simulation and visual-density refinement
- Phase 14A: common Shell compatibility layer and stable UNIT registry
- Phase 14A CI: JavaScript syntax gate before GitHub Pages deployment

## Current design baseline

Reference app: `kfcccpro/1001`

Current visual principles:
- warm off-white background
- calm green accent
- 980px-class content width
- low-contrast borders/shadows
- large readable English sentence typography
- large Korean guidance and action labels
- 54–58px-class controls
- deep navy `JK·5S` identity mark only at screen-level brand positions

Primary styles:
- `css/theme-1001-inspired.css`
- `css/phase13-refinement.css`

## Actual learning content currently implemented

- PART 1 / CHAPTER 1 / UNIT 1
- PART 1 / CHAPTER 1 / UNIT 2
- PART 1 / CHAPTER 1 / UNIT 3

Repository is Public; textbook full original text is not copied into GitHub. Derived/practice content and structural metadata are used for development.

## Phase 14 implementation

New common layer:
- `js/phase14-common-shell.js`

It provides:
- one stable UNIT registry for UNIT 1~3 navigation metadata
- one stable student-home renderer
- one stable admin-home renderer
- one common learning Shell renderer
- one primary-action helper
- one progress helper
- one context-block helper

Important architecture rule:
- UNIT-specific author decision logic remains inside each UNIT engine.
- UNIT 1: verb count / connector count / slot judgment
- UNIT 2: position / object / active-passive judgment
- UNIT 3: position / object relevance / p.p. vs be+p.p. vs active past
- do not create a universal stage engine.

Compatibility strategy:
- legacy UNIT 1/2/3 functions remain in place for now.
- the Phase 14 common layer loads after UNIT 3 and replaces only duplicated home/Shell/helper bindings.
- this minimizes behavior changes before live regression confirmation.
- chained home override code inside older UNIT files is now superseded at runtime but has not yet been physically deleted.

## CI / deployment verification

`.github/workflows/pages.yml` now runs a JavaScript syntax gate before deployment:

- all `.js` files in `js/` and `data/` are checked with `node --check`
- deployment is blocked if syntax checking fails

For the Phase 14 deployment run:
- JavaScript syntax check: PASS
- Setup Pages: PASS
- Upload static site: PASS
- Deploy to GitHub Pages: PASS

## Review mode

Use `?review=1` to inspect UI independent of scoring/progress.

Views:
- full structure
- learning flow
- student home
- question
- evidence judgment
- 5-second Rule
- result
- admin
- maintenance/reuse architecture

Widths:
- 768
- 1024
- 1180
- 1366
- 1440

Container-query refinement from Phase 13 allows the preview itself to respond to 768/1024-class widths even when the outer browser is wide.

## First unfinished work

### Phase 13B — physical-device visual confirmation

Not yet claimed complete.

Confirm on actual iPad / Galaxy Tab / PC when available:
- typography scale and wrapping
- card density and vertical whitespace
- choice/button sizing
- sticky action zone behavior
- scrolling burden
- `JK·5S` identity strength

If screenshots or device feedback are provided, refine only the affected visual layer.

### Phase 14B — live interaction regression confirmation

Code-level refactor and syntax/deployment verification are complete, but full browser interaction regression has not been claimed yet.

Confirm:
- student PIN 8081 login
- admin PIN 2007 login
- UNIT 1 / UNIT 2 / UNIT 3 all visible on student home
- each UNIT launches correctly
- Home button returns to stable student home
- progress bar/stage labels update
- completion counters persist in localStorage
- admin screen shows UNIT 1/2/3 completion counts
- review mode still opens

If an actual browser/device regression is found, fix the common layer first without changing author-specific learning logic.

### Phase 15 — finalize content/data contract before UNIT 4+

Next architecture task after Phase 14B confidence is sufficient:
- define shared item metadata
- separate UNIT-specific author-decision fields
- formalize source → author rule → derived practice → review → delayed review links
- preserve Public-repository copyright boundary
- avoid forcing every UNIT into one decision schema

After Phase 15, expand PART 1 / CHAPTER 1 / UNIT 4.

## New-chat restoration sequence

When user says `JK 5초 다음 작업 진행`:

1. Read latest `main`
2. Read `PROJECT_HANDOFF_LATEST.md`
3. Read `PROJECT_STATUS.md`
4. Read `VERSION`
5. Check latest GitHub Actions / Pages status
6. Start from the first unfinished work in this file

If physical-device screenshots are unavailable, do not block on Phase 13B. Continue architecture work while keeping Phase 13B explicitly pending.

Do not ask the user to re-upload backup ZIPs while GitHub access is working.
