# Phase 16 — UNIT 4 Author-Method Analysis

## Scope

PART 1 / CHAPTER 1 / UNIT 4: `접속사 + V-ing or p.p.`

The textbook source itself is not copied into this Public repository. This document records only the derived decision model needed by the app.

## Author-method decision sequence

1. If a conjunction is retained before a reduced clause, treat the following blank as a reduced nonfinite slot rather than creating another finite verb.
2. For a transitive verb, inspect the material immediately after the verb.
   - direct object present → active relation → `V-ing`
   - direct object absent → suspect passive relation → `p.p.`
3. Do not count the noun inside a prepositional phrase as the verb's direct object.
4. If the object shortcut cannot decide the form, especially with an intransitive/prepositional verb, restore the main-clause subject as the understood subject of the reduced clause.
   - subject performs the action → `V-ing`
   - subject receives the action → `p.p.`

## App interaction sequence

`Cold Attempt → 축약 자리 → 목적어 확인 → V-ing/p.p. 판단 → 5초 Rule → 원문 재도전`

UNIT 4-specific fields:
- `slotAnswer`
- `objectAnswer`
- `formAnswer`
- `fallbackRequired`

`fallbackRequired=true` means the direct-object shortcut is intentionally unavailable and the learner must restore the understood subject and judge the semantic relation.

## Derived-practice boundary

The live UNIT 4 items are newly authored practice sentences. They preserve the author's decision sequence without storing the textbook's full example/question text in the Public repository.
