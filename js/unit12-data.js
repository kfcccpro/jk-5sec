window.JK_UNIT12_ITEMS = [
  {
    id: "u12-q1-make-active-base",
    prompt: "The coach made the players ___ the final drill once more.",
    choices: ["repeat", "to repeat"],
    answer: "repeat",
    targetVerb: "make",
    familyAnswer: "causative",
    relationAnswer: "active",
    complementFormAnswer: "baseVerb",
    rule: "make/have/let 같은 사역동사에서 목적어와 목적격보어가 능동관계이면 목적격보어는 동사원형이다.",
    errorCode: "U12_USED_TO_V_AFTER_MAKE_ACTIVE"
  },
  {
    id: "u12-q2-get-active-to-v",
    prompt: "We got the technician ___ the network settings before class.",
    choices: ["to check", "check"],
    answer: "to check",
    targetVerb: "get",
    familyAnswer: "quasiCausative",
    relationAnswer: "active",
    complementFormAnswer: "toInfinitive",
    rule: "준사역동사 get은 목적어와 목적격보어가 능동관계일 때 목적격보어로 to-V를 취한다.",
    errorCode: "U12_USED_BASE_AFTER_GET_ACTIVE"
  },
  {
    id: "u12-q3-help-active-base-or-to",
    prompt: "Her classmate helped her ___ the presentation slides before lunch.",
    choices: ["organize", "organizing"],
    answer: "organize",
    targetVerb: "help",
    familyAnswer: "quasiCausative",
    relationAnswer: "active",
    complementFormAnswer: "baseOrTo",
    rule: "help는 목적어와 목적격보어가 능동관계일 때 동사원형과 to-V가 모두 가능하다. V-ing는 이 규칙의 선택지가 아니다.",
    errorCode: "U12_USED_ING_AFTER_HELP_ACTIVE"
  },
  {
    id: "u12-q4-hear-active-ing",
    prompt: "I heard someone ___ softly in the hallway while the lights were off.",
    choices: ["whispering", "whispered"],
    answer: "whispering",
    targetVerb: "hear",
    familyAnswer: "perception",
    relationAnswer: "active",
    complementFormAnswer: "baseOrIng",
    rule: "지각동사는 목적어와 목적격보어가 능동관계이면 동사원형 또는 V-ing를 취한다. 진행 장면을 강조하면 V-ing가 자연스럽다.",
    errorCode: "U12_USED_PP_FOR_ACTIVE_PERCEPTION"
  },
  {
    id: "u12-q5-see-passive-pp",
    prompt: "We saw the equipment ___ onto the truck before sunrise.",
    choices: ["loaded", "loading"],
    answer: "loaded",
    targetVerb: "see",
    familyAnswer: "perception",
    relationAnswer: "passive",
    complementFormAnswer: "pastParticiple",
    rule: "목적어와 목적격보어가 수동관계이면 앞 동사가 사역·준사역·지각 중 무엇이든 목적격보어는 p.p.로 판단한다.",
    errorCode: "U12_MISSED_PASSIVE_OBJECT_COMPLEMENT"
  }
];
