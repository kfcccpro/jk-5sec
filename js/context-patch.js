function jkContextMarkup(showChoice = true) {
  const choice = learningState.selectedAnswer || "선택 전";
  return `
    <div class="question-context" aria-label="현재 문제 문장">
      <span class="context-label">문제 문장</span>
      <p class="context-sentence">${demoItem.prompt}</p>
      ${showChoice ? `<p class="context-choice">내 선택 <strong>${choice}</strong></p>` : ""}
    </div>
  `;
}

function jkFilledSentence() {
  return demoItem.prompt.replace("___", learningState.selectedAnswer || "___");
}

renderTokenStage = function(kind) {
  learningState.selectedTokens.clear();
  const isVerb = kind === "verbs";
  const sentence = jkFilledSentence();
  const tokens = sentence.split(/\s+/).filter(Boolean);

  setPrimary(true, "판단 완료");
  taskContent().innerHTML = `
    <p class="task-kicker">${isVerb ? "STEP 2" : "STEP 3"}</p>
    <h2 class="task-title">${isVerb ? "본동사만 탭하세요." : "절을 추가하는 접속사·관계사만 탭하세요."}</h2>
    ${jkContextMarkup(true)}
    <p class="task-copy">아래 문장에서 직접 판단하세요. 없다고 생각하면 아무것도 누르지 않고 넘어갈 수 있습니다.</p>
    <div class="token-grid" id="tokenGrid"></div>
  `;

  const wrap = document.querySelector("#tokenGrid");
  tokens.forEach((token, idx) => {
    const btn = document.createElement("button");
    btn.className = "token-btn";
    btn.type = "button";
    btn.textContent = token;
    btn.dataset.key = `${token}-${idx}`;
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      if (learningState.selectedTokens.has(key)) {
        learningState.selectedTokens.delete(key);
        btn.classList.remove("selected");
      } else {
        learningState.selectedTokens.add(key);
        btn.classList.add("selected");
      }
    });
    wrap.appendChild(btn);
  });
};

renderSlot = function() {
  learningState.selectedSlot = null;
  setPrimary(false, "5초 Rule 보기");
  taskContent().innerHTML = `
    <p class="task-kicker">STEP 4</p>
    <h2 class="task-title">빈칸은 어떤 자리입니까?</h2>
    ${jkContextMarkup(true)}
    <p class="task-copy">문장을 보면서 동사 수와 연결어 수를 비교한 뒤 결정하세요.</p>
    <div class="choice-grid">
      <button class="evidence-choice" data-slot="finite" type="button">본동사 자리</button>
      <button class="evidence-choice" data-slot="nonfinite" type="button">준동사 자리</button>
    </div>
  `;

  document.querySelectorAll("[data-slot]").forEach(btn => btn.addEventListener("click", () => {
    learningState.selectedSlot = btn.dataset.slot;
    document.querySelectorAll("[data-slot]").forEach(el => el.classList.toggle("selected", el === btn));
    setPrimary(true, "5초 Rule 보기");
  }));
};

renderRule = function() {
  const slotCorrect = learningState.selectedSlot === demoItem.slotType;
  taskContent().innerHTML = `
    <p class="task-kicker">5초 Rule</p>
    <h2 class="task-title">동사부터 센다.</h2>
    ${jkContextMarkup(true)}
    <div class="rule-box"><strong>UNIT 1 핵심</strong><p>${demoItem.rule}</p></div>
    <p class="feedback ${learningState.firstAnswerCorrect && slotCorrect ? "ok" : "warn"}">${learningState.firstAnswerCorrect && slotCorrect ? "정답과 자리 판단이 모두 안정적입니다." : "정답 또는 근거가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>
  `;
  setPrimary(true, "원문 재도전");
};
