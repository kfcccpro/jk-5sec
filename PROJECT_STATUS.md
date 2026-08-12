# JK 5SEC Grammar — PROJECT STATUS

## Current version

`v0.15.0-phase15-content-contract`

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
- Phase 12: `1001` visual language adapted to JK 5SEC
- Phase 13A: review-width simulation and visual-density refinement
- Phase 14A: common Shell compatibility layer and stable UNIT registry
- Phase 14A CI: JavaScript syntax gate before GitHub Pages deployment
- Phase 15: content/data contract finalized before UNIT 4+
- Phase 15 CI: semantic content-contract gate added before deployment

## Current learning content

Implemented:
- PART 1 / CHAPTER 1 / UNIT 1
- PART 1 / CHAPTER 1 / UNIT 2
- PART 1 / CHAPTER 1 / UNIT 3

Next textbook unit:
- PART 1 / CHAPTER 1 / UNIT 4: `접속사 + V-ing or p.p.`

The repository is Public. Textbook full original text is not copied into GitHub.

## Phase 14 architecture baseline

Common layer: `js/phase14-common-shell.js`

Commonized:
- UNIT registry
- student home
- admin home
- learning Shell
- primary action helper
- progress helper
- context block helper

Not universalized:
- UNIT-specific author decision logic
- answer judgment logic
- stage-specific evidence questions

Legacy UNIT 1/2/3 functions remain physically present for compatibility; the Phase 14 layer replaces duplicated home/Shell/helper bindings at runtime.

## Phase 15 content/data contract

Machine-readable contract:
- `data/content-contract.js`

Architecture document:
- `docs/PHASE15_DATA_CONTRACT.md`

Semantic validator:
- `scripts/validate-content-contract.js`

Shared item fields:
- `id`
- `prompt`
- `choices`
- `answer`
- `rule`
- `errorCode`

UNIT-specific fields stay separate:
- UNIT 1: verb/connector count and slot judgment fields
- UNIT 2: position/object/voice fields
- UNIT 3: position/object/form fields
- UNIT 4: define only after UNIT 4 author-method analysis

Formal lineage:
`source reference → author rule → derived practice → review → delayed review`

Review and delayed-review linking uses `errorCode`; delayed-review cadence is intentionally not fixed yet.

Public repository boundary:
- source is reference-only
- full textbook text is not stored
- source-text style keys are rejected by the semantic validator

## CI / deployment

Workflow: `.github/workflows/pages.yml`

Deployment gate order:
1. Checkout
2. JavaScript syntax check for `js/`, `data/`, `scripts/`
3. Content contract semantic check
4. Setup Pages
5. Upload static site
6. Deploy GitHub Pages

## Still pending, non-blocking

### Phase 13B — physical-device visual confirmation

Needs actual iPad / Galaxy Tab / PC evidence when available:
- typography scale and wrapping
- card density
- button sizing
- sticky action zone
- scrolling burden
- `JK·5S` identity strength

Do not block architecture/content expansion if screenshots are unavailable.

### Phase 14B — live interaction regression confirmation

Needs live browser/device confirmation:
- student PIN 8081 login
- admin PIN 2007 login
- UNIT 1~3 visible on student home
- each UNIT launches
- Home returns correctly
- progress/stage labels update
- localStorage completion counters persist
- admin shows UNIT 1~3 counts
- review mode opens

If a live regression appears, fix the common Shell layer first without changing UNIT-specific author logic.

## Next implementation phase

### Phase 16 — PART 1 / CHAPTER 1 / UNIT 4

Topic: `접속사 + V-ing or p.p.`

Order:
1. analyze UNIT 4 author-method decision sequence
2. define UNIT 4-specific `decisionSchema`
3. promote UNIT 4 contract from planned to implemented
4. create derived practice items without storing textbook full text
5. implement UNIT 4 engine
6. register UNIT 4 in common Shell
7. pass syntax + semantic CI gates
8. verify live browser flow as far as environment allows

## New-chat restoration sequence

When user says `JK 5초 다음 작업 진행`:
1. read latest `main`
2. read `PROJECT_HANDOFF_LATEST.md`
3. read `PROJECT_STATUS.md`
4. read `VERSION`
5. check latest GitHub Actions / Pages
6. if physical-device evidence is unavailable, keep Phase 13B/14B pending and continue the next implementation phase
7. start Phase 16 UNIT 4 work

Do not ask for backup ZIPs while GitHub access works.
