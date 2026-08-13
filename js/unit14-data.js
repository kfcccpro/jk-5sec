window.JK_UNIT14_ITEMS = [
  {
    id: "u14-q1-rise-past",
    prompt: "By noon, the river level ___ nearly twenty centimeters.",
    choices: ["rose", "raised"],
    answer: "rose",
    targetVerb: "rise",
    pairAnswer: "riseRaise",
    transitivityAnswer: "intransitive",
    meaningAnswer: "goUp",
    meaningOptions: [
      { value: "goUp", label: "오르다" },
      { value: "raiseSomething", label: "~을 올리다" }
    ],
    formSeriesAnswer: "rise-rose-risen",
    formOptions: ["rise-rose-risen", "raise-raised-raised"],
    rule: "rise는 목적어 없이 '오르다'의 뜻으로 쓰는 자동사이며 변화형은 rise-rose-risen이다. raise는 '~을 올리다'의 타동사다.",
    errorCode: "U14_CONFUSED_RISE_RAISE"
  },
  {
    id: "u14-q2-lay-past",
    prompt: "She ___ the folder flat on the desk before the meeting.",
    choices: ["laid", "lay"],
    answer: "laid",
    targetVerb: "lay",
    pairAnswer: "lieLay",
    transitivityAnswer: "transitive",
    meaningAnswer: "putDown",
    meaningOptions: [
      { value: "beLocated", label: "놓여 있다" },
      { value: "putDown", label: "~을 놓다" }
    ],
    formSeriesAnswer: "lay-laid-laid",
    formOptions: ["lie-lay-lain", "lay-laid-laid"],
    rule: "lay는 '~을 놓다'의 타동사이고 변화형은 lay-laid-laid다. lie는 '놓여 있다'의 자동사이며 lie-lay-lain으로 변한다.",
    errorCode: "U14_CONFUSED_LIE_LAY"
  },
  {
    id: "u14-q3-lie-falsehood",
    prompt: "The witness ___ about where he had been that evening.",
    choices: ["lied", "lay"],
    answer: "lied",
    targetVerb: "lieFalsehood",
    pairAnswer: "lieMeanings",
    transitivityAnswer: "intransitive",
    meaningAnswer: "tellFalsehood",
    meaningOptions: [
      { value: "tellFalsehood", label: "거짓말하다" },
      { value: "beLocated", label: "놓여 있다" }
    ],
    formSeriesAnswer: "lie-lied-lied",
    formOptions: ["lie-lied-lied", "lie-lay-lain"],
    rule: "'거짓말하다'의 lie는 자동사이고 lie-lied-lied로 규칙 변화한다. '놓여 있다'의 lie는 lie-lay-lain이므로 의미를 먼저 구별한다.",
    errorCode: "U14_CONFUSED_TWO_LIE_FORMS"
  },
  {
    id: "u14-q4-sit-past",
    prompt: "The students ___ quietly near the back wall until the doors opened.",
    choices: ["sat", "seated"],
    answer: "sat",
    targetVerb: "sit",
    pairAnswer: "sitSeat",
    transitivityAnswer: "intransitive",
    meaningAnswer: "sitDown",
    meaningOptions: [
      { value: "sitDown", label: "앉다" },
      { value: "seatSomeone", label: "~을 앉히다" }
    ],
    formSeriesAnswer: "sit-sat-sat",
    formOptions: ["sit-sat-sat", "seat-seated-seated"],
    rule: "sit은 '앉다'의 자동사로 sit-sat-sat이다. seat는 '~을 앉히다'의 타동사로 seat-seated-seated다.",
    errorCode: "U14_CONFUSED_SIT_SEAT"
  },
  {
    id: "u14-q5-arouse-past",
    prompt: "The unexpected delay ___ concern among the passengers.",
    choices: ["aroused", "arose"],
    answer: "aroused",
    targetVerb: "arouse",
    pairAnswer: "ariseArouse",
    transitivityAnswer: "transitive",
    meaningAnswer: "stirUp",
    meaningOptions: [
      { value: "occur", label: "발생하다" },
      { value: "stirUp", label: "~을 불러 일으키다" }
    ],
    formSeriesAnswer: "arouse-aroused-aroused",
    formOptions: ["arise-arose-arisen", "arouse-aroused-aroused"],
    rule: "arouse는 '~을 불러 일으키다'의 타동사로 arouse-aroused-aroused다. arise는 '발생하다'의 자동사로 arise-arose-arisen이다.",
    errorCode: "U14_CONFUSED_ARISE_AROUSE"
  }
];
