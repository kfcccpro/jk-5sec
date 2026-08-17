# JK 5SEC Grammar — PROJECT STATUS

## Current version
`v0.41.0-phase41-p2-ch2-unit3`

## Source of truth
- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- Source family: JK `답이 보이는 5초 영어어법`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed
- Phase 1~41
- Runtime lessons: 29
- Five derived items per runtime
- Total: 145 derived items
- Content contract: `3.4.0`

## Current learning coverage
### PART 1
- CH 1 UNIT 1~7
- CH 2 UNIT 1~4
- CH 3 UNIT 1~2
- CH 4 UNIT 1~2
- CH 5

### PART 2
- CH 1 UNIT 1~10
- CH 2 UNIT 1~3
- Latest: CH 2 UNIT 3 `동명사 관용적 표현 (2) - to + ~ing`

## Source integrity
`data/jk-source-map.js` is the runtime source authority.
- Runtime 1~16: JK textbook p.18~40-41
- Runtime 17~26: JK textbook p.44~49
- Runtime 27: PART 2 CH 2 UNIT 1, p.50
- Runtime 28: PART 2 CH 2 UNIT 2, p.50
- Runtime 29: PART 2 CH 2 UNIT 3, p.51
- 3800/PSS/PRACTICE source coordinates are invalid in this repository and CI rejects them.

## Wrong-answer recovery
The JK-native persistent wrong-answer gate is promoted on `main`.
- localStorage key: `jk5sec_wrongbook_v1`
- first wrong answer is retained
- unresolved items from prior chapters are presented before a later chapter starts
- same-chapter unit transitions do not unnecessarily trigger the gate
- repeat wrong answer reveals no answer/explanation
- learner is sent to the exact JK textbook page/PART/CHAPTER/UNIT and must retry
- successful recovery is preserved as history rather than deletion

## Validation baseline
- JavaScript syntax check
- semantic content/source-integrity check
- 29-runtime / 145-item contract validation
- browser wrongbook regression
- GitHub Pages deployment verification

## Next content phase
### Phase 42 — PART 3 / UNIT 1
Topic: `현재 시제 / 과거 시제`
Source start: JK textbook p.54.
