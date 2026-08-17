# JK 5SEC Grammar — PROJECT STATUS

## Current version
`v0.44.0-phase44-p3-unit3`

## Source of truth
- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- Source family: JK `답이 보이는 5초 영어어법`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed
- Phase 1~44
- Runtime lessons: 32
- Five derived items per runtime
- Total: 160 derived items
- Content contract: `3.5.0`

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

### PART 3
- UNIT 1 `현재 시제 / 과거 시제`
- UNIT 2 `과거 동사 / have[had] p.p.`
- UNIT 3 `시간과 시제의 불일치`
- Latest: UNIT 3, runtime 32

## Source integrity
`data/jk-source-map.js` is the runtime source authority.
- Runtime 1~16: JK textbook p.18~40-41
- Runtime 17~26: JK textbook p.44~49
- Runtime 27~29: JK textbook p.50~51
- Runtime 30: PART 3 UNIT 1, p.54
- Runtime 31: PART 3 UNIT 2, p.54
- Runtime 32: PART 3 UNIT 3, p.56
- 3800/PSS/PRACTICE source coordinates are invalid in this repository and CI rejects them.

## Wrong-answer recovery
The JK-native persistent wrong-answer gate is promoted on `main`.
- localStorage key: `jk5sec_wrongbook_v1`
- first wrong answer is retained
- unresolved items from prior chapters are presented before a later chapter/part starts
- same-chapter unit transitions do not unnecessarily trigger the gate
- repeat wrong answer reveals no answer/explanation
- learner is sent to the exact JK textbook page/PART/CHAPTER/UNIT and must retry
- chapterless parts such as PART 3 use `PART · UNIT · page` without a false `CH 0` label
- successful recovery is preserved as history rather than deletion

## Validation baseline
- JavaScript syntax check
- semantic content/source-integrity check
- runtime/source-map count is self-maintaining
- every runtime must contain exactly five derived items
- browser wrongbook regression
- GitHub Pages deployment verification

## Next content phase
### Phase 45 — PART 4 / UNIT 1
Topic: `주어 - 부정사, 동명사, 명사구(절)`
Source page will be re-verified from the JK textbook before implementation.
