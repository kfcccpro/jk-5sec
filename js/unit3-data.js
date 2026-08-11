window.JK_UNIT3_ITEMS = [
  {
    id: "u3-q1-finite-passive",
    prompt: "The package cannot ___ without the recipient's signature.",
    choices: ["deliver", "be delivered"],
    answer: "be delivered",
    positionAnswer: "finite",
    objectAnswer: "no",
    formAnswer: "passiveFinite",
    rule: "본동사 자리에서 목적어가 없으면 수동을 의심한다. 수동 본동사는 be + p.p. 형태가 필요하다.",
    errorCode: "MISSED_FINITE_PASSIVE"
  },
  {
    id: "u3-q2-finite-passive-clause",
    prompt: "When visitors enter the gallery, they ___ by a large digital display.",
    choices: ["greet", "are greeted"],
    answer: "are greeted",
    positionAnswer: "finite",
    objectAnswer: "no",
    formAnswer: "passiveFinite",
    rule: "절의 본동사 자리는 동사가 필요하다. 목적어가 없고 주어가 동작을 받으면 be + p.p.를 선택한다.",
    errorCode: "MISSED_PASSIVE_CLAUSE_VERB"
  },
  {
    id: "u3-q3-nonfinite-participle",
    prompt: "The symptoms ___ with chronic stress often disappear after proper rest.",
    choices: ["associated", "are associated"],
    answer: "associated",
    positionAnswer: "nonfinite",
    objectAnswer: "na",
    formAnswer: "participle",
    rule: "이미 본동사가 있으면 명사를 꾸미는 자리는 준동사 자리다. 준동사 자리에서는 be동사를 넣지 않고 p.p.만 쓴다.",
    errorCode: "ADDED_BE_IN_NONFINITE_SLOT"
  },
  {
    id: "u3-q4-nonfinite-modifier",
    prompt: "The documents ___ by the research team contain the final results.",
    choices: ["prepared", "are prepared"],
    answer: "prepared",
    positionAnswer: "nonfinite",
    objectAnswer: "na",
    formAnswer: "participle",
    rule: "문장의 본동사 contain이 이미 있으므로 빈칸은 준동사 자리다. 수동 의미의 준동사는 p.p.만 사용한다.",
    errorCode: "CONFUSED_PARTICIPLE_WITH_PASSIVE_VERB"
  },
  {
    id: "u3-q5-finite-active",
    prompt: "The company ___ the new service last spring and quickly gained new customers.",
    choices: ["launched", "was launched"],
    answer: "launched",
    positionAnswer: "finite",
    objectAnswer: "yes",
    formAnswer: "activePast",
    rule: "본동사 자리에서 뒤에 목적어가 있으면 능동을 우선한다. 과거 시점이면 능동 과거형 ~ed가 온다.",
    errorCode: "MISREAD_ACTIVE_PAST_AS_PASSIVE"
  }
];
