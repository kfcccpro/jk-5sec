const stages = [
  "answer",
  "verbs",
  "connectors",
  "slot",
  "rule",
  "retry"
];

const demoItem = {
  id: "demo-finite-count-01",
  prompt: "A careful reader ___ the number of finite verbs before choosing the answer.",
  choices: ["checks", "checking"],
  answer: "checks",
  finiteVerbTokens: ["checks"],
  connectorTokens: [],
  slotType: "finite",
  rule: "접속사·관계사가 없으면 기본적으로 본동사 1개가 필요하다.",
  note: "이 문장은 교재 원문이 아닌 UI 검증용 데모 문장입니다."
};

const state = {
  stageIndex: 0,
  selectedAnswer: null,
  selectedTokens: new Set(),
  selectedSlot: null,
  firstAnswerCorrect: null
};

const taskContent = document.querySelector("#taskContent");
const primaryAction = document.querySelector("#primaryAction");
const stageLabel = document.querySelector("#stageLabel");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");

const labels = {
  answer: "문제 풀기",
  verbs: "본동사 찾기",
  connectors: "연결어 확인",
  slot: "자리 판단",
  rule: "5초 Rule",
  retry: "원문 재도전"
};

function currentStage() {
  return stages[state.stageIndex];
}

function updateProgress() {
  const step = state.stageIndex + 1;
  stageLabel.textContent = labels[currentStage()];
  progressText.textContent = `${Math.min(step, 5)} / 5`;
  progressBar.style.width = `${Math.min(step, 5) * 20}%`;
}

function setPrimary(enabled, label = "다음") {
  primaryAction.disabled = !enabled;
  primaryAction.textContent = label;
}

function renderAnswer(isRetry = false) {
  state.selectedAnswer = null;
  setPrimary(false, isRetry ? "결과 보기" : "근거 확인");
  taskContent.innerHTML = `
    <p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p>
    <h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2>
    <p class="question">${demoItem.prompt}</p>
    <div class="choice-grid" id="choices"></div>
    ${!isRetry ? `<p class="task-copy">${demoItem.note}</p>` : ""}
  `;

  const choiceWrap = document.querySelector("#choices");
  demoItem.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      state.selectedAnswer = choice;
      [...choiceWrap.children].forEach(el => el.classList.toggle("selected", el === button));
      setPrimary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    choiceWrap.appendChild(button);
  });
}

function renderTokenStage(kind) {
  state.selectedTokens.clear();
  const isVerb = kind === "verbs";
  const tokens = ["A", "careful", "reader", "checks", "the", "number", "of", "finite", "verbs", "before", "choosing", "the", "answer"];
  setPrimary(true, "판단 완료");
  taskContent.innerHTML = `
    <p class="task-kicker">${isVerb ? "STEP 2" : "STEP 3"}</p>
    <h2 class="task-title">${isVerb ? "본동사만 탭하세요." : "절을 추가하는 접속사·관계사만 탭하세요."}</h2>
    <p class="task-copy">모르면 선택하지 않아도 됩니다. 억지로 고르는 것보다 정확한 판단이 우선입니다.</p>
    <div class="token-grid" id="tokenGrid"></div>
  `;

  const wrap = document.querySelector("#tokenGrid");
  tokens.forEach((token, idx) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "token-btn";
    button.textContent = token;
    button.dataset.key = `${token}-${idx}`;
    button.addEventListener("click", () => {
      const key = button.dataset.key;
      if (state.selectedTokens.has(key)) {
        state.selectedTokens.delete(key);
        button.classList.remove("selected");
      } else {
        state.selectedTokens.add(key);
        button.classList.add("selected");
      }
    });
    wrap.appendChild(button);
  });
}

function renderSlot() {
  state.selectedSlot = null;
  setPrimary(false, "5초 Rule 보기");
  taskContent.innerHTML = `
    <p class="task-kicker">STEP 4</p>
    <h2 class="task-title">빈칸은 어떤 자리입니까?</h2>
    <p class="task-copy">동사 수와 연결어 수를 비교한 뒤 결정하세요.</p>
    <div class="choice-grid" id="slotChoices">
      <button class="evidence-choice" type="button" data-slot="finite">본동사 자리</button>
      <button class="evidence-choice" type="button" data-slot="nonfinite">준동사 자리</button>
    </div>
  `;

  document.querySelectorAll("[data-slot]").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedSlot = button.dataset.slot;
      document.querySelectorAll("[data-slot]").forEach(el => el.classList.toggle("selected", el === button));
      setPrimary(true, "5초 Rule 보기");
    });
  });
}

function renderRule() {
  const initialCorrect = state.firstAnswerCorrect;
  const slotCorrect = state.selectedSlot === demoItem.slotType;
  taskContent.innerHTML = `
    <p class="task-kicker">5초 Rule</p>
    <h2 class="task-title">동사부터 센다.</h2>
    <div class="rule-box">
      <strong>UNIT 1 핵심</strong>
      <p>${demoItem.rule}</p>
    </div>
    <p class="feedback ${initialCorrect && slotCorrect ? "ok" : "warn"}">
      ${initialCorrect && slotCorrect ? "정답과 자리 판단이 모두 안정적입니다." : "정답 또는 근거가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}
    </p>
  `;
  setPrimary(true, "원문 재도전");
}

function renderResult() {
  const retryCorrect = state.selectedAnswer === demoItem.answer;
  const status = retryCorrect ? (state.firstAnswerCorrect ? "MASTERED_NOW" : "REPAIRED") : "UNRESOLVED";
  taskContent.innerHTML = `
    <p class="task-kicker">학습 결과</p>
    <h2 class="task-title">${retryCorrect ? "판단을 회복했습니다." : "한 번 더 교정이 필요합니다."}</h2>
    <div class="rule-box">
      <strong>상태</strong>
      <p>${status}</p>
    </div>
    <p class="task-copy">실제 교재 문제에서는 이 기록이 다음 회상 시점과 관리자 진단에 연결됩니다.</p>
  `;
  setPrimary(true, "처음부터 다시 보기");
}

function render() {
  updateProgress();
  const stage = currentStage();
  if (stage === "answer") return renderAnswer(false);
  if (stage === "verbs") return renderTokenStage("verbs");
  if (stage === "connectors") return renderTokenStage("connectors");
  if (stage === "slot") return renderSlot();
  if (stage === "rule") return renderRule();
  if (stage === "retry") return renderAnswer(true);
}

primaryAction.addEventListener("click", () => {
  const stage = currentStage();

  if (stage === "answer") {
    state.firstAnswerCorrect = state.selectedAnswer === demoItem.answer;
    state.stageIndex += 1;
    return render();
  }

  if (stage === "verbs" || stage === "connectors" || stage === "slot") {
    state.stageIndex += 1;
    return render();
  }

  if (stage === "rule") {
    state.stageIndex += 1;
    return render();
  }

  if (stage === "retry") {
    if (primaryAction.textContent === "결과 보기") {
      return renderResult();
    }
    state.stageIndex = 0;
    state.firstAnswerCorrect = null;
    return render();
  }
});

render();
