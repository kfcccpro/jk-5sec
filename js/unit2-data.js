window.JK_UNIT2_ITEMS = [
  {
    id: "u2-q1-passive-participle",
    prompt: "The report ___ by the committee contains several important recommendations.",
    choices: ["preparing", "prepared"],
    answer: "prepared",
    positionAnswer: "nonfinite",
    objectAnswer: "no",
    voiceAnswer: "passive",
    rule: "준동사 자리에서 뒤에 목적어가 없으면 수동을 먼저 의심한다. 이 경우 p.p.가 맞다.",
    errorCode: "MISSED_PASSIVE_NO_OBJECT"
  },
  {
    id: "u2-q2-active-participle",
    prompt: "The new device saves energy, ___ operating costs for small businesses.",
    choices: ["reducing", "reduced"],
    answer: "reducing",
    positionAnswer: "nonfinite",
    objectAnswer: "yes",
    voiceAnswer: "active",
    rule: "준동사 자리에서 뒤에 목적어가 있으면 능동을 우선한다. 목적어를 취하면 V-ing가 맞다.",
    errorCode: "MISSED_ACTIVE_WITH_OBJECT"
  },
  {
    id: "u2-q3-reported-like",
    prompt: "Only applications ___ before Friday will be reviewed by the admissions office.",
    choices: ["submitting", "submitted"],
    answer: "submitted",
    positionAnswer: "nonfinite",
    objectAnswer: "no",
    voiceAnswer: "passive",
    rule: "명사를 꾸미는 준동사 뒤에 목적어가 없고 의미가 수동이면 p.p.를 선택한다.",
    errorCode: "MISSED_PASSIVE_MODIFIER"
  },
  {
    id: "u2-q4-including-like",
    prompt: "The guide explains several routes, ___ a shortcut through the old market.",
    choices: ["including", "included"],
    answer: "including",
    positionAnswer: "nonfinite",
    objectAnswer: "yes",
    voiceAnswer: "active",
    rule: "준동사 뒤에 목적어가 바로 이어지면 타동사의 능동 형태로 보고 V-ing를 선택한다.",
    errorCode: "MISSED_TRANSITIVE_OBJECT"
  },
  {
    id: "u2-q5-involved-like",
    prompt: "Students ___ in the project must attend the final presentation.",
    choices: ["involving", "involved"],
    answer: "involved",
    positionAnswer: "nonfinite",
    objectAnswer: "no",
    voiceAnswer: "passive",
    rule: "준동사 뒤에 목적어가 없고 주어가 그 동작을 당하는 관계라면 p.p.가 맞다.",
    errorCode: "MISSED_PASSIVE_RELATION"
  }
];
