window.JK_UNIT10_ITEMS = [
  {
    id: "u10-q1-make-dummy-it",
    prompt: "The new dashboard makes ___ easier to compare weekly results at a glance.",
    choices: ["it", "them"],
    answer: "it",
    targetVerb: "make",
    dummyObjectAnswer: "dummyIt",
    complementAnswer: "adjectiveComplement",
    realObjectAnswer: "toInfinitive",
    rule: "make가 5형식에서 긴 to-V 목적어를 뒤로 보낼 때 목적어 자리에 가목적어 it을 두고, 그 뒤에 형용사 목적격보어를 둔다.",
    errorCode: "U10_MISSED_DUMMY_IT_AFTER_MAKE"
  },
  {
    id: "u10-q2-find-adjective-complement",
    prompt: "Most users find it ___ to locate the updated policy in the new menu.",
    choices: ["easy", "easily"],
    answer: "easy",
    targetVerb: "find",
    dummyObjectAnswer: "dummyIt",
    complementAnswer: "adjectiveComplement",
    realObjectAnswer: "toInfinitive",
    rule: "find + it 뒤에는 목적격보어가 필요하므로 부사가 아니라 형용사 easy가 온다. 실제 목적어는 뒤의 to-V다.",
    errorCode: "U10_USED_ADVERB_AS_OBJECT_COMPLEMENT"
  },
  {
    id: "u10-q3-think-that-clause",
    prompt: "The reviewer thought ___ unusual that the figures had changed overnight.",
    choices: ["it", "that"],
    answer: "it",
    targetVerb: "think",
    dummyObjectAnswer: "dummyIt",
    complementAnswer: "adjectiveComplement",
    realObjectAnswer: "thatClause",
    rule: "think가 5형식에서 that절을 실제 목적어로 취하면 that절을 뒤로 보내고 목적어 자리에 it을 둔다. unusual은 목적격보어다.",
    errorCode: "U10_PLACED_THAT_CLAUSE_IN_OBJECT_SLOT"
  },
  {
    id: "u10-q4-believe-dummy-it",
    prompt: "The committee believes ___ impossible to finish the audit by noon without extra staff.",
    choices: ["it", "them"],
    answer: "it",
    targetVerb: "believe",
    dummyObjectAnswer: "dummyIt",
    complementAnswer: "adjectiveComplement",
    realObjectAnswer: "toInfinitive",
    rule: "believe + it + 형용사 + to-V 구조에서 it은 가목적어이고 to-V가 진목적어다. 긴 목적어를 목적격보어 뒤로 보낸다.",
    errorCode: "U10_MISREAD_BELIEVE_IT_PATTERN"
  },
  {
    id: "u10-q5-consider-complement",
    prompt: "We consider it ___ to verify every external link before publication.",
    choices: ["important", "importantly"],
    answer: "important",
    targetVerb: "consider",
    dummyObjectAnswer: "dummyIt",
    complementAnswer: "adjectiveComplement",
    realObjectAnswer: "toInfinitive",
    rule: "consider + it 다음 자리는 목적격보어이므로 형용사 important가 온다. 뒤의 to-V가 실제 목적어 역할을 한다.",
    errorCode: "U10_MISREAD_CONSIDER_COMPLEMENT"
  }
];
