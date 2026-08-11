window.JK_UNIT1_ITEMS = [
  {
    id: "u1-q1-extra-finite",
    prompt: "The new schedule requires every team to report early, also ___ the time available for preparation.",
    choices: ["reduces", "reducing"],
    answer: "reducing",
    tokens: ["The new schedule", "requires", "every team", "to report", "early", ",", "also", "___", "the time available for preparation"],
    finiteVerbIndices: [1],
    connectorIndices: [],
    omittedConnector: false,
    decisionOptions: [
      { value: "finite", label: "본동사 자리" },
      { value: "nonfinite", label: "준동사 자리" }
    ],
    decisionAnswer: "nonfinite",
    rule: "접속사·관계사가 없고 이미 본동사 1개가 있으면, 빈칸에는 본동사를 하나 더 쓰지 않는다.",
    errorCode: "ADDED_EXTRA_FINITE_VERB"
  },
  {
    id: "u1-q2-omitted-relative",
    prompt: "The books students borrow from the library often ___ on their desks for weeks.",
    choices: ["remain", "remaining"],
    answer: "remain",
    tokens: ["The books", "students", "borrow", "from the library", "often", "___", "on their desks for weeks"],
    finiteVerbIndices: [2],
    connectorIndices: [],
    omittedConnector: true,
    decisionOptions: [
      { value: "finite", label: "본동사 자리" },
      { value: "nonfinite", label: "준동사 자리" }
    ],
    decisionAnswer: "finite",
    rule: "명사 + 주어 + 동사 구조에서는 목적격 관계사가 생략될 수 있다. 생략 관계사까지 세면 본동사가 하나 더 필요하다.",
    errorCode: "MISSED_OMITTED_RELATIVE"
  },
  {
    id: "u1-q3-it-which",
    prompt: "When the final results were announced, ___ was clear that the new system would work.",
    choices: ["it", "which"],
    answer: "it",
    tokens: ["When", "the final results", "were announced", ",", "___", "was clear", "that", "the new system", "would work"],
    finiteVerbIndices: [2, 5, 8],
    connectorIndices: [0, 6],
    omittedConnector: false,
    decisionOptions: [
      { value: "pronoun", label: "대명사 자리" },
      { value: "relative", label: "관계사 자리" }
    ],
    decisionAnswer: "pronoun",
    rule: "필요한 동사 수가 이미 맞으면 관계사를 추가하지 않는다. 이 경우 which가 아니라 대명사 it이 맞다.",
    errorCode: "OVERCOUNTED_RELATIVE_CLAUSE"
  },
  {
    id: "u1-q4-when-nonfinite",
    prompt: "When the research team finished the trial, the report will be published next week, ___ a short summary of the findings.",
    choices: ["includes", "including"],
    answer: "including",
    tokens: ["When", "the research team", "finished", "the trial", ",", "the report", "will be published", "next week", ",", "___", "a short summary of the findings"],
    finiteVerbIndices: [2, 6],
    connectorIndices: [0],
    omittedConnector: false,
    decisionOptions: [
      { value: "finite", label: "본동사 자리" },
      { value: "nonfinite", label: "준동사 자리" }
    ],
    decisionAnswer: "nonfinite",
    rule: "when이 절을 하나 추가하므로 본동사는 2개가 필요하다. 이미 2개가 있으면 빈칸은 준동사 자리다.",
    errorCode: "FAILED_FINITE_COUNT"
  },
  {
    id: "u1-q5-and-finite",
    prompt: "Unlike older models, this device ___ less power and produces less heat.",
    choices: ["uses", "using"],
    answer: "uses",
    tokens: ["Unlike older models", ",", "this device", "___", "less power", "and", "produces", "less heat"],
    finiteVerbIndices: [6],
    connectorIndices: [5],
    omittedConnector: false,
    decisionOptions: [
      { value: "finite", label: "본동사 자리" },
      { value: "nonfinite", label: "준동사 자리" }
    ],
    decisionAnswer: "finite",
    rule: "and가 두 동사 구조를 연결하고 뒤에 produces가 있으므로, 앞 빈칸에도 본동사가 필요하다.",
    errorCode: "MISSED_REQUIRED_FINITE_VERB"
  }
];
