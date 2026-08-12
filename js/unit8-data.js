window.JK_UNIT8_ITEMS = [
  {
    id: "u8-q1-spend-time-ing",
    prompt: "Jina spent two hours ___ the presentation before the meeting.",
    choices: ["rehearsing", "to rehearse"],
    answer: "rehearsing",
    patternAnswer: "spendWaste",
    bridgeAnswer: "timeMoneyResource",
    formAnswer: "gerundIng",
    rule: "spend/waste + 시간·돈 + ~ing 형태를 먼저 잡는다. spent 뒤에 시간 표현이 오면 그 다음 행동은 V-ing로 연결한다.",
    errorCode: "U8_MISSED_SPEND_WASTE_ING_PATTERN"
  },
  {
    id: "u8-q2-waste-money-ing",
    prompt: "The company wasted a large amount of money ___ features that customers never used.",
    choices: ["adding", "to add"],
    answer: "adding",
    patternAnswer: "spendWaste",
    bridgeAnswer: "timeMoneyResource",
    formAnswer: "gerundIng",
    rule: "waste도 spend와 같은 구조로 시간·돈 뒤에 V-ing를 취한다. 중간의 money가 목적어처럼 보여도 뒤 행동은 to-V가 아니라 V-ing다.",
    errorCode: "U8_CHOSE_TO_V_AFTER_WASTE_RESOURCE"
  },
  {
    id: "u8-q3-take-time-to-v",
    prompt: "It took the team forty minutes ___ the backup system.",
    choices: ["to restart", "restarting"],
    answer: "to restart",
    patternAnswer: "takeTime",
    bridgeAnswer: "elapsedTime",
    formAnswer: "toInfinitive",
    rule: "take + 시간 + to-V는 ‘~하는 데 시간이 걸리다’의 고정 판단이다. 시간 표현 뒤 행동은 to-V로 연결한다.",
    errorCode: "U8_USED_ING_AFTER_TAKE_TIME"
  },
  {
    id: "u8-q4-have-difficulty-ing",
    prompt: "Some students have difficulty ___ the main idea in long passages.",
    choices: ["identifying", "to identify"],
    answer: "identifying",
    patternAnswer: "difficultyFamily",
    bridgeAnswer: "difficultyExpression",
    formAnswer: "gerundIng",
    rule: "have difficulty + ~ing를 한 덩어리로 기억한다. difficulty 뒤에는 to-V가 아니라 V-ing를 붙인다.",
    errorCode: "U8_MISSED_HAVE_DIFFICULTY_ING"
  },
  {
    id: "u8-q5-hard-time-ing",
    prompt: "We had a hard time ___ a quiet place to study near the station.",
    choices: ["finding", "to find"],
    answer: "finding",
    patternAnswer: "difficultyFamily",
    bridgeAnswer: "difficultyExpression",
    formAnswer: "gerundIng",
    rule: "have a hard time / have a problem도 difficulty 계열과 같이 뒤에 V-ing를 취한다. 앞 표현을 먼저 식별하면 형태를 바로 결정할 수 있다.",
    errorCode: "U8_MISSED_HARD_TIME_ING_PATTERN"
  }
];
