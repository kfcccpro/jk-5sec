window.JK_UNIT4_ITEMS = [
  {
    id: "u4-q1-passive-after-when",
    prompt: "When ___ by trained technicians, the equipment operates reliably for years.",
    choices: ["inspecting", "inspected"],
    answer: "inspected",
    slotAnswer: "reducedNonfinite",
    objectAnswer: "no",
    formAnswer: "passivePp",
    fallbackRequired: false,
    rule: "접속사 뒤 축약구문은 준동사 자리다. 타동사 뒤에 목적어가 없으면 수동을 먼저 보고 p.p.를 선택한다.",
    errorCode: "U4_MISSED_PASSIVE_NO_OBJECT"
  },
  {
    id: "u4-q2-active-with-object",
    prompt: "While ___ the final report, the manager noticed a missing figure in the table.",
    choices: ["reviewing", "reviewed"],
    answer: "reviewing",
    slotAnswer: "reducedNonfinite",
    objectAnswer: "yes",
    formAnswer: "activeIng",
    fallbackRequired: false,
    rule: "접속사 뒤 축약구문에서 타동사 바로 뒤에 목적어가 이어지면 능동을 우선하고 V-ing를 선택한다.",
    errorCode: "U4_MISSED_ACTIVE_WITH_OBJECT"
  },
  {
    id: "u4-q3-intransitive-fallback",
    prompt: "When ___ with overseas clients, our staff usually uses English for clarity.",
    choices: ["speaking", "spoken"],
    answer: "speaking",
    slotAnswer: "reducedNonfinite",
    objectAnswer: "na",
    formAnswer: "activeIng",
    fallbackRequired: true,
    rule: "자동사처럼 목적어 유무로 판정하기 어려우면 주절 주어를 분사 앞에 복원한다. 주어가 동작을 하면 능동이므로 V-ing다.",
    errorCode: "U4_FAILED_SUBJECT_RELATION_FALLBACK"
  },
  {
    id: "u4-q4-passive-even-if",
    prompt: "The samples remain usable even if ___ for several days at a low temperature.",
    choices: ["storing", "stored"],
    answer: "stored",
    slotAnswer: "reducedNonfinite",
    objectAnswer: "no",
    formAnswer: "passivePp",
    fallbackRequired: false,
    rule: "접속사가 남은 축약구문에서도 같은 자·타 공식을 쓴다. 타동사 뒤 목적어가 없고 주어가 저장되는 관계이므로 p.p.가 맞다.",
    errorCode: "U4_MISSED_PASSIVE_REDUCED_CLAUSE"
  },
  {
    id: "u4-q5-active-once-object",
    prompt: "Once ___ the safety checklist, employees may enter the laboratory.",
    choices: ["completing", "completed"],
    answer: "completing",
    slotAnswer: "reducedNonfinite",
    objectAnswer: "yes",
    formAnswer: "activeIng",
    fallbackRequired: false,
    rule: "접속사 뒤 준동사에서 바로 뒤 목적어를 취하면 능동 관계다. 주어가 직접 그 동작을 하므로 V-ing를 선택한다.",
    errorCode: "U4_MISSED_ACTIVE_REDUCED_CLAUSE"
  }
];
