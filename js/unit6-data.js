window.JK_UNIT6_ITEMS = [
  {
    id: "u6-q1-give-remaining-object",
    prompt: "The interns ___ a detailed safety guide on their first day.",
    choices: ["were given", "gave"],
    answer: "were given",
    targetVerb: "give",
    patternAnswer: "ditransitive4",
    remainingRoleAnswer: "directObject",
    passiveAnswer: "passiveValid",
    rule: "give 같은 4형식 동사가 수동태가 되면 한 목적어가 주어로 올라가고 다른 목적어가 그대로 남을 수 있다. p.p. 뒤 명사를 보고 수동태를 지우지 않는다.",
    errorCode: "U6_REJECTED_4TH_PASSIVE_WITH_OBJECT"
  },
  {
    id: "u6-q2-show-remaining-object",
    prompt: "The visitors ___ the emergency exit before the tour began.",
    choices: ["were shown", "showed"],
    answer: "were shown",
    targetVerb: "show",
    patternAnswer: "ditransitive4",
    remainingRoleAnswer: "directObject",
    passiveAnswer: "passiveValid",
    rule: "show는 두 목적어를 취할 수 있다. 사람 목적어가 수동태의 주어가 되면 사물 목적어가 동사 뒤에 남는다.",
    errorCode: "U6_MISREAD_REMAINING_DIRECT_OBJECT"
  },
  {
    id: "u6-q3-teach-remaining-object",
    prompt: "New employees ___ basic safety procedures during orientation.",
    choices: ["were taught", "taught"],
    answer: "were taught",
    targetVerb: "teach",
    patternAnswer: "ditransitive4",
    remainingRoleAnswer: "directObject",
    passiveAnswer: "passiveValid",
    rule: "teach의 4형식 수동태에서는 사람 목적어가 주어가 되고 학습 내용인 직접목적어가 뒤에 남을 수 있다.",
    errorCode: "U6_MISSED_DITRANSITIVE_PASSIVE"
  },
  {
    id: "u6-q4-consider-complement",
    prompt: "The new policy ___ a practical solution to the staffing problem.",
    choices: ["was considered", "considered"],
    answer: "was considered",
    targetVerb: "consider",
    patternAnswer: "objectComplement5",
    remainingRoleAnswer: "subjectComplement",
    passiveAnswer: "passiveValid",
    rule: "consider의 5형식 수동태에서는 목적어가 주어가 되고 목적격보어가 주격보어 역할로 남는다. 뒤 명사는 목적어가 아니라 보어다.",
    errorCode: "U6_MISREAD_5TH_PASSIVE_COMPLEMENT"
  },
  {
    id: "u6-q5-appoint-complement",
    prompt: "Mina ___ project coordinator for the new campaign.",
    choices: ["was appointed", "appointed"],
    answer: "was appointed",
    targetVerb: "appoint",
    patternAnswer: "objectComplement5",
    remainingRoleAnswer: "subjectComplement",
    passiveAnswer: "passiveValid",
    rule: "appoint는 목적어 뒤에 직책을 목적격보어로 둘 수 있다. 수동태가 되면 그 직책 명사는 주어를 설명하는 보어로 남는다.",
    errorCode: "U6_REJECTED_PASSIVE_BECAUSE_NOUN_FOLLOWS_PP"
  }
];
