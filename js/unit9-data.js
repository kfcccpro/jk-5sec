window.JK_UNIT9_ITEMS = [
  {
    id: "u9-q1-device-purpose",
    prompt: "This compact device is used to ___ air quality in small rooms.",
    choices: ["measure", "measuring"],
    answer: "measure",
    subjectTypeAnswer: "thingSubject",
    beAnswer: "bePresent",
    meaningAnswer: "purposeUse",
    formAnswer: "baseVerb",
    rule: "사물주어 + be used to + 동사원형은 '~하는 데 사용되다'이다. 여기서 to는 목적을 나타내는 to부정사의 to이므로 뒤에 동사원형이 온다.",
    errorCode: "U9_CONFUSED_PURPOSE_TO_WITH_PREPOSITION_TO"
  },
  {
    id: "u9-q2-technique-purpose",
    prompt: "Several filtering techniques are used to ___ fine dust from the air.",
    choices: ["remove", "removing"],
    answer: "remove",
    subjectTypeAnswer: "thingSubject",
    beAnswer: "bePresent",
    meaningAnswer: "purposeUse",
    formAnswer: "baseVerb",
    rule: "사물·방법이 주어이고 be used to가 '~하기 위해 사용되다'라는 뜻이면 to 뒤는 동사원형이다. V-ing로 바꾸지 않는다.",
    errorCode: "U9_USED_ING_AFTER_PURPOSE_BE_USED_TO"
  },
  {
    id: "u9-q3-person-accustomed",
    prompt: "After years on the night shift, Mina is used to ___ before sunrise.",
    choices: ["working", "work"],
    answer: "working",
    subjectTypeAnswer: "personSubject",
    beAnswer: "bePresent",
    meaningAnswer: "accustomed",
    formAnswer: "gerundIng",
    rule: "사람주어 + be used to + V-ing는 '~하는 데 익숙하다'이다. 이때 to는 전치사이므로 뒤에 동명사 V-ing가 온다.",
    errorCode: "U9_MISREAD_ACCUSTOMED_TO_AS_INFINITIVE"
  },
  {
    id: "u9-q4-team-accustomed",
    prompt: "The rescue team is used to ___ under severe weather conditions.",
    choices: ["operating", "operate"],
    answer: "operating",
    subjectTypeAnswer: "personSubject",
    beAnswer: "bePresent",
    meaningAnswer: "accustomed",
    formAnswer: "gerundIng",
    rule: "사람 집단이 주어이고 '익숙하다'라는 의미이면 be used to의 to는 전치사다. 따라서 뒤 행동은 V-ing로 연결한다.",
    errorCode: "U9_DROPPED_ING_AFTER_ACCUSTOMED_USE"
  },
  {
    id: "u9-q5-past-habit",
    prompt: "Before the new subway line opened, Daniel used to ___ to the office by bus.",
    choices: ["commute", "commuting"],
    answer: "commute",
    subjectTypeAnswer: "personSubject",
    beAnswer: "beAbsent",
    meaningAnswer: "pastHabit",
    formAnswer: "baseVerb",
    rule: "be 없이 used to + 동사원형이면 과거의 습관 '~하곤 했다'이다. be used to V-ing와 형태를 섞지 않는다.",
    errorCode: "U9_CONFUSED_PAST_HABIT_WITH_ACCUSTOMED_PATTERN"
  }
];
