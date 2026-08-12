window.JK_UNIT7_ITEMS = [
  {
    id: "u7-q1-progressive-passive",
    prompt: "The east wing ___ this week while the offices remain open.",
    choices: ["is being renovated", "is renovating"],
    answer: "is being renovated",
    passiveFamilyAnswer: "progressivePassive",
    auxiliaryChainAnswer: "beBeingPp",
    objectAfterPpAnswer: "noDirectObject",
    voiceAnswer: "passiveValid",
    rule: "진행 중인 수동은 be being p.p.로 읽는다. 주어가 공사를 하는 것이 아니라 공사를 받고 있으므로 being 뒤에는 p.p.가 온다.",
    errorCode: "U7_MISSED_PROGRESSIVE_PASSIVE_CHAIN"
  },
  {
    id: "u7-q2-perfect-passive-unit6-bridge",
    prompt: "The interns ___ new security badges before entering the lab.",
    choices: ["have been given", "have given"],
    answer: "have been given",
    passiveFamilyAnswer: "perfectPassive",
    auxiliaryChainAnswer: "haveBeenPp",
    objectAfterPpAnswer: "unit6Exception",
    voiceAnswer: "passiveValid",
    rule: "완료 수동은 have been p.p.다. give는 UNIT 6의 4형식 예외이므로 p.p. 뒤에 다른 목적어가 남아도 수동태가 성립한다.",
    errorCode: "U7_REJECTED_PERFECT_PASSIVE_4TH_EXCEPTION"
  },
  {
    id: "u7-q3-modal-passive",
    prompt: "The damaged files ___ from the backup server.",
    choices: ["can be restored", "can restore"],
    answer: "can be restored",
    passiveFamilyAnswer: "modalPassive",
    auxiliaryChainAnswer: "modalBePp",
    objectAfterPpAnswer: "noDirectObject",
    voiceAnswer: "passiveValid",
    rule: "조동사가 있는 수동은 조동사 + be + p.p.다. can 뒤에 바로 동사원형 restore를 두면 주어가 복구하는 능동이 된다.",
    errorCode: "U7_DROPPED_BE_AFTER_MODAL"
  },
  {
    id: "u7-q4-modal-perfect-passive",
    prompt: "The package ___ at the wrong address before the error was noticed.",
    choices: ["might have been delivered", "might have delivered"],
    answer: "might have been delivered",
    passiveFamilyAnswer: "modalPerfectPassive",
    auxiliaryChainAnswer: "modalHaveBeenPp",
    objectAfterPpAnswer: "noDirectObject",
    voiceAnswer: "passiveValid",
    rule: "조동사 완료 수동은 조동사 + have been + p.p.로 읽는다. might have 뒤에서도 수동 신호인 been을 빼지 않는다.",
    errorCode: "U7_MISSED_MODAL_PERFECT_PASSIVE"
  },
  {
    id: "u7-q5-simple-passive-no-object",
    prompt: "The lobby ___ with seasonal flowers for the ceremony.",
    choices: ["was decorated", "decorated"],
    answer: "was decorated",
    passiveFamilyAnswer: "simplePassive",
    auxiliaryChainAnswer: "simpleBePp",
    objectAfterPpAnswer: "noDirectObject",
    voiceAnswer: "passiveValid",
    rule: "일반 수동은 be + p.p.다. p.p. 뒤의 with seasonal flowers는 전치사구이지 직접목적어가 아니므로 수동태와 충돌하지 않는다.",
    errorCode: "U7_MISREAD_PREPOSITIONAL_PHRASE_AS_OBJECT"
  }
];
