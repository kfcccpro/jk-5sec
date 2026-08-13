window.JK_UNIT11_ITEMS = [
  {
    id: "u11-q1-feel-adjective",
    prompt: "This blanket feels ___ against the skin after washing.",
    choices: ["soft", "softly"],
    answer: "soft",
    sensoryVerb: "feel",
    linkingAnswer: "linkingSecondPattern",
    complementRoleAnswer: "subjectComplement",
    formAnswer: "adjective",
    rule: "감각동사 feel이 2형식으로 쓰이면 뒤는 주어의 상태를 설명하는 주격보어 자리다. 따라서 부사 softly가 아니라 형용사 soft를 쓴다.",
    errorCode: "U11_USED_ADVERB_AFTER_FEEL"
  },
  {
    id: "u11-q2-look-adjective",
    prompt: "The streets look ___ after the overnight snowfall.",
    choices: ["quiet", "quietly"],
    answer: "quiet",
    sensoryVerb: "look",
    linkingAnswer: "linkingSecondPattern",
    complementRoleAnswer: "subjectComplement",
    formAnswer: "adjective",
    rule: "look이 '~해 보이다'의 감각동사이면 2형식 연결동사다. 뒤의 말은 주어 streets를 설명하므로 형용사 quiet가 온다.",
    errorCode: "U11_MISREAD_LOOK_AS_ACTION_VERB"
  },
  {
    id: "u11-q3-smell-adjective",
    prompt: "The herbs smell ___ when they are crushed by hand.",
    choices: ["fresh", "freshly"],
    answer: "fresh",
    sensoryVerb: "smell",
    linkingAnswer: "linkingSecondPattern",
    complementRoleAnswer: "subjectComplement",
    formAnswer: "adjective",
    rule: "smell이 주어의 냄새 상태를 나타내는 2형식 감각동사이면 주격보어가 필요하다. 보어에는 형용사 fresh를 쓴다.",
    errorCode: "U11_USED_ADVERB_AFTER_SMELL"
  },
  {
    id: "u11-q4-sound-adjective",
    prompt: "The revised schedule sounds ___ for both teams.",
    choices: ["reasonable", "reasonably"],
    answer: "reasonable",
    sensoryVerb: "sound",
    linkingAnswer: "linkingSecondPattern",
    complementRoleAnswer: "subjectComplement",
    formAnswer: "adjective",
    rule: "sound가 '~하게 들리다'의 2형식 감각동사이면 뒤는 주격보어다. 동사를 꾸미는 부사가 아니라 주어를 설명하는 형용사 reasonable을 고른다.",
    errorCode: "U11_USED_ADVERB_AFTER_SOUND"
  },
  {
    id: "u11-q5-taste-adjective",
    prompt: "The sauce tastes ___ even without extra salt.",
    choices: ["mild", "mildly"],
    answer: "mild",
    sensoryVerb: "taste",
    linkingAnswer: "linkingSecondPattern",
    complementRoleAnswer: "subjectComplement",
    formAnswer: "adjective",
    rule: "taste가 맛의 상태를 나타내는 감각동사이면 2형식이다. 뒤 자리는 주격보어이므로 형용사 mild가 정답이다.",
    errorCode: "U11_USED_ADVERB_AFTER_TASTE"
  }
];
