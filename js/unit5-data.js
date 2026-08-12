window.JK_UNIT5_ITEMS = [
  {
    id: "u5-q1-appear-no-passive",
    prompt: "A strange pattern ___ on the monitor shortly after the system restarted.",
    choices: ["appeared", "was appeared"],
    answer: "appeared",
    targetVerb: "appear",
    groupAnswer: "fixedIntransitiveNoPassive",
    usageAnswer: "intransitive",
    formAnswer: "activeOnly",
    rule: "appear처럼 자동사로 외우는 동사는 목적어가 없고 수동태로 만들지 않는다. be + p.p.를 기계적으로 붙이지 않는다.",
    errorCode: "U5_PASSIVIZED_FIXED_INTRANSITIVE"
  },
  {
    id: "u5-q2-seem-no-passive",
    prompt: "The proposed schedule ___ reasonable to most participants.",
    choices: ["seems", "is seemed"],
    answer: "seems",
    targetVerb: "seem",
    groupAnswer: "fixedIntransitiveNoPassive",
    usageAnswer: "intransitive",
    formAnswer: "activeOnly",
    rule: "seem은 보어와 이어지는 자동사형 동사다. 목적어를 수동태 주어로 올리는 구조가 아니므로 is seemed처럼 쓰지 않는다.",
    errorCode: "U5_PASSIVIZED_LINKING_INTRANSITIVE"
  },
  {
    id: "u5-q3-resemble-no-passive",
    prompt: "The new prototype closely ___ the earlier model in size and shape.",
    choices: ["resembles", "is resembled"],
    answer: "resembles",
    targetVerb: "resemble",
    groupAnswer: "fixedTransitiveNoPassive",
    usageAnswer: "transitive",
    formAnswer: "activeOnly",
    rule: "resemble은 목적어를 취하지만 교재의 수동태 불가 타동사군이다. 목적어가 있다는 이유만으로 수동태를 만들지 않는다.",
    errorCode: "U5_PASSIVIZED_NO_PASSIVE_TRANSITIVE"
  },
  {
    id: "u5-q4-see-passive-allowed",
    prompt: "On clear mornings, the distant island can ___ from the observation deck.",
    choices: ["be seen", "see"],
    answer: "be seen",
    targetVerb: "see",
    groupAnswer: "contextDependent",
    usageAnswer: "transitive",
    formAnswer: "passiveAllowed",
    rule: "see는 문맥에 따라 자·타 용법을 구별해야 한다. 여기서는 능동문에서 목적어를 취하는 '보다'의 타동사 용법이므로 수동태가 가능하다.",
    errorCode: "U5_OVERGENERALIZED_PASSIVE_BAN"
  },
  {
    id: "u5-q5-increase-intransitive",
    prompt: "Online orders ___ sharply after the holiday campaign began.",
    choices: ["increased", "were increased"],
    answer: "increased",
    targetVerb: "increase",
    groupAnswer: "contextDependent",
    usageAnswer: "intransitive",
    formAnswer: "activeOnly",
    rule: "increase는 자·타 둘 다 가능하므로 문맥을 먼저 본다. 여기서는 orders 자체가 증가하는 자동사 용법이므로 수동태를 쓰지 않는다.",
    errorCode: "U5_MISREAD_FLEXIBLE_VERB_AS_PASSIVE"
  }
];
