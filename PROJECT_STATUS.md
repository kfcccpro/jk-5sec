# JK 5SEC Grammar — PROJECT STATUS

## Current version
`v0.50.0-phase50-p4-unit6`

## Source of truth
- Repository: `kfcccpro/jk-5sec`
- Branch: `main`
- Source family: JK `답이 보이는 5초 영어어법`
- General app: `https://kfcccpro.github.io/jk-5sec/`
- Review mode: `https://kfcccpro.github.io/jk-5sec/?review=1`

## Completed
- Phase 1~50
- Runtime lessons: 38
- Five derived items per runtime
- Total: 190 derived items
- Content contract: `3.7.0`

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
- UNIT 1~3 complete

### PART 4
- UNIT 1 `주어 - 부정사, 동명사, 명사구(절)`
- UNIT 2 `주어 - 부분사 + of + 명사`
- UNIT 3 `복수 형태 → 단수 취급`
- UNIT 4 `the number of / a number of`
- UNIT 5 `상관접속사로 연결된 주어`
- UNIT 6 `수식어를 동반하는 주어`
- Latest: UNIT 6, runtime 38

## Source integrity
`data/jk-source-map.js` is the runtime source authority.
- Runtime 1~16: JK textbook p.18~40-41
- Runtime 17~29: JK textbook p.44~51
- Runtime 30~32: JK textbook p.54~56
- Runtime 33~38: PART 4, p.60~63
- Runtime 36/37/38: p.62 / p.63 / p.63
- 3800/PSS/PRACTICE source coordinates are invalid in this repository and CI rejects them.

## Wrong-answer recovery
The JK-native persistent wrong-answer gate is promoted on `main`.
- localStorage key: `jk5sec_wrongbook_v1`
- first wrong answer is retained
- unresolved items from prior chapters/parts are presented before a later chapter/part starts
- same-chapter unit transitions do not unnecessarily trigger the gate
- repeat wrong answer reveals no answer/explanation
- learner is sent to the exact JK textbook page/PART/CHAPTER/UNIT and must retry
- chapterless parts such as PART 3/4 use `PART · UNIT · page` without a false `CH 0` label
- successful recovery is preserved as history rather than deletion

## Validation baseline
- JavaScript syntax check
- semantic content/source-integrity check
- runtime/source-map count is self-maintaining
- every runtime must contain exactly five derived items
- browser wrongbook regression
- GitHub Pages deployment verification

## Next content phase
### Phase 51 — PART 4 / UNIT 7
Topic: `부사(구)가 문두로 나오는 도치구문`
Source: JK textbook p.65.
