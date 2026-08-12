# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.12.0-review-theme`

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

Primary override stylesheet:
- `css/theme-1001-inspired.css`

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

## First unfinished phase

### Phase 13 — real-device and review-mode visual refinement

Check:
- typography scale
- line-height
- card height/density
- vertical whitespace
- choice/button sizing
- scrolling burden
- JK·5S identity strength

Test widths:
- 768 / 1024 / 1180 / 1366 / 1440

### Phase 14 — simplify common Shell and UNIT engine duplication

Goal:
- reduce duplicated screen/storage/state code
- preserve simple Vanilla JS architecture
- avoid over-abstraction

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
6. Start from Phase 13 unless status has since advanced

Do not ask the user to re-upload backup ZIPs while GitHub access is working.
