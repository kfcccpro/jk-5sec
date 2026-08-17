# JK 5SEC Grammar — PROJECT STATUS

## Current version
`v0.38.0-phase38-p2-ch1-unit10`

## Source of truth
- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- Source family: JK `답이 보이는 5초 영어어법`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed
- Phase 1~38
- Runtime lessons: 26
- Five derived items per runtime
- Total: 130 derived items
- Content contract: `3.3.0`

## Current learning coverage
### PART 1
- CH 1 UNIT 1~7
- CH 2 UNIT 1~4
- CH 3 UNIT 1~2
- CH 4 UNIT 1~2
- CH 5

### PART 2
- CH 1 UNIT 1~10
- Latest: UNIT 10 `to부정사의 시제`

## Source integrity
`data/jk-source-map.js` is the runtime source authority.
- Runtime 1~16: JK textbook p.18~40-41
- Runtime 17~26: JK textbook p.44~49
- Runtime 23 `way to-V`: p.47
- 3800/PSS/PRACTICE source coordinates are not valid in this repository.

## Wrong-answer recovery
Work branch `work/jk-recovery-wrongbook` adds a JK-native persistent wrong-answer gate.
- localStorage key: `jk5sec_wrongbook_v1`
- first wrong answer is retained
- prior unresolved items are presented before a later runtime starts
- repeat wrong answer reveals no answer/explanation
- learner is sent to the exact JK textbook page/PART/CHAPTER/UNIT and must retry
- successful recovery is preserved as history rather than deletion

## Still pending before promotion
- syntax/content/source-integrity CI
- browser wrongbook flow regression
- merge to main only after green verification

## Next content phase
### Phase 39 — PART 2 / CHAPTER 2 / UNIT 1
Topic: `동명사를 취하는 타동사`
Source start: JK textbook p.50.
