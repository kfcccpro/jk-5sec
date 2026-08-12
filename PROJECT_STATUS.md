# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.13.0-phase13-refinement`

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
- Phase 12: learner-preferred `1001` visual language analyzed and adapted to JK 5SEC
- Phase 13A: code-level visual refinement and review-width simulation correction

## Current design baseline

Reference app:
- `kfcccpro/1001`

Adapted principles:
- warm off-white background
- calm green accent
- 980px-class content width
- low-contrast borders/shadows
- large readable English sentence typography
- larger Korean guidance and action labels
- 54–58px-class controls

JK-specific distinction:
- deep navy `JK·5S` micro-mark
- author-method 5-second decision workflow
- different course architecture and learning logic

Primary theme stylesheet:
- `css/theme-1001-inspired.css`

Phase 13 refinement layer:
- `css/phase13-refinement.css`

Phase 13A changes:
- `JK·5S` no longer repeats before every panel eyebrow; it is limited to screen-level brand positions.
- duplicate `JK 5SEC` review-title badge removed.
- learning card minimum height and line-height reduced to lower unnecessary vertical scrolling.
- review viewport now uses CSS container queries so 768/1024-class preview widths trigger their own responsive layout rules even on a wide desktop browser.

## Actual learning content currently implemented

- PART 1 / CHAPTER 1 / UNIT 1
- PART 1 / CHAPTER 1 / UNIT 2
- PART 1 / CHAPTER 1 / UNIT 3

Repository is Public; textbook full original text is not copied into GitHub. Derived/practice content and structural metadata are used for development.

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

Important Phase 13 note:
- Before v0.13.0, width preset buttons only changed the preview element width while ordinary viewport media queries still used the outer browser width. This made desktop review of 768px/1024px presets incomplete.
- v0.13.0 adds container-query-based responsive review behavior for the preview itself.

## First unfinished phase

### Phase 13B — real-device visual confirmation

Code-level refinement is complete, but physical-device visual confirmation is not claimed yet.

Confirm on actual iPad / Galaxy Tab / PC when available:
- typography scale and wrapping
- card density and vertical whitespace
- choice/button sizing
- sticky action zone behavior
- scrolling burden
- `JK·5S` identity strength
- 768 / 1024 / 1180 / 1366 / 1440 review presets after the container-query correction

If user sends screenshots or concrete device feedback, refine only the affected visual layer and keep the learning logic unchanged.

### Phase 14 — simplify common Shell and UNIT engine duplication

Goal:
- reduce duplicated screen/storage/state code
- preserve simple Vanilla JS architecture
- avoid over-abstraction
- audit UNIT 1/2/3 before changing behavior

### Phase 15 — finalize content/data contract before UNIT 4+

Goal:
- separate shared fields from UNIT-specific author-decision fields
- preserve author philosophy per unit
- keep Public-repository copyright boundary

## New-chat restoration sequence

When user says `JK 5초 다음 작업 진행`:

1. Read latest `main`
2. Read `PROJECT_HANDOFF_LATEST.md`
3. Read `PROJECT_STATUS.md`
4. Read `VERSION`
5. Check latest GitHub Actions / Pages status
6. Start from the first unfinished phase in this file

Current first unfinished phase is Phase 13B. If no real-device screenshots/feedback are available, do not block: proceed with Phase 14 code audit while clearly keeping Phase 13B marked as pending physical-device confirmation.

Do not ask the user to re-upload backup ZIPs while GitHub access is working.
