window.JK_UNIT13_ITEMS = [
  {
    id: "u13-q1-dummy-it",
    prompt: "The revised guide made ___ easier for new staff to locate the correct form.",
    choices: ["it", "them"],
    answer: "it",
    targetVerb: "make",
    patternAnswer: "dummyItToInf",
    voiceAnswer: "active",
    formAnswer: "dummyIt",
    rule: "make + it + 목적격보어 + to-V 구조에서는 긴 진목적어를 뒤로 보내고 목적어 자리에 가목적어 it을 둔다.",
    errorCode: "U13_MISSED_DUMMY_IT_PATTERN"
  },
  {
    id: "u13-q2-active-causative",
    prompt: "The instructor made the group ___ the safety sequence again.",
    choices: ["repeat", "to repeat"],
    answer: "repeat",
    targetVerb: "make",
    patternAnswer: "activeCausativeBare",
    voiceAnswer: "active",
    formAnswer: "baseVerb",
    rule: "능동태의 사역 make + O + O.C 구조에서 목적어가 직접 행동하면 목적격보어는 동사원형이다.",
    errorCode: "U13_USED_TO_V_AFTER_ACTIVE_MAKE"
  },
  {
    id: "u13-q3-adjective-complement",
    prompt: "The new lighting made the hallway ___ at night.",
    choices: ["safer", "safely"],
    answer: "safer",
    targetVerb: "make",
    patternAnswer: "adjectiveComplement",
    voiceAnswer: "active",
    formAnswer: "adjective",
    rule: "make + O + 형용사 구조에서는 목적어의 상태를 설명하는 목적격보어가 필요하므로 부사가 아니라 형용사를 고른다.",
    errorCode: "U13_USED_ADVERB_AS_MAKE_COMPLEMENT"
  },
  {
    id: "u13-q4-passive-make-to-v",
    prompt: "The group was made ___ the safety sequence again before leaving.",
    choices: ["to repeat", "repeat"],
    answer: "to repeat",
    targetVerb: "make",
    patternAnswer: "passiveBareToTo",
    voiceAnswer: "passive",
    formAnswer: "toInfinitive",
    rule: "능동태에서 make + O + 동사원형이던 구조가 수동태가 되면 목적격보어의 동사원형은 to-V로 바뀐다.",
    errorCode: "U13_FAILED_TO_RESTORE_TO_IN_PASSIVE_MAKE"
  },
  {
    id: "u13-q5-passive-perception-to-v",
    prompt: "The visitor was seen ___ the restricted area shortly before closing.",
    choices: ["to enter", "enter"],
    answer: "to enter",
    targetVerb: "see",
    patternAnswer: "passiveBareToTo",
    voiceAnswer: "passive",
    formAnswer: "toInfinitive",
    rule: "지각동사의 능동태에서 O + 동사원형이던 구조도 수동태가 되면 동사원형 앞에 to를 복원해 to-V를 쓴다.",
    errorCode: "U13_FAILED_TO_RESTORE_TO_IN_PASSIVE_PERCEPTION"
  }
];
