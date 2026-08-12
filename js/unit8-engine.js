const unit8Items = Array.isArray(window.JK_UNIT8_ITEMS) ? window.JK_UNIT8_ITEMS : [];
let unit8Session = null;

function freshUnit8Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "pattern", "bridge", "form", "rule", "retry"],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedPattern: null,
    selectedBridge: null,
    selectedForm: null,
    evidence: { pattern: null, bridge: null, form: null },
    itemResults: [],
    pendingNext: false,
    finished: false,
    startAt: Date.now()
  };
}

function currentUnit8Item() { return unit8Items[unit8Session.itemIndex]; }
function currentUnit8Stage() { return unit8Session.stages[unit8Session.stageIndex]; }

function startUnit8() {
  if (!unit8Items.length) return alert("CHAPTER 2 · UNIT 1 문항 데이터를 불러오지 못했습니다.");
  store.currentUnit = 8;
  saveStore();
  unit8Session = freshUnit8Session();
  renderUnit8Shell();
  renderUnit8Stage();
}

function renderUnit8Shell() {
  app.innerHTML = `<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div><div class="header-actions"><div class="unit-badge">PART 1 · CH 2 · UNIT 1</div><button id="homeBtn" class="header-button" type="button">홈</button></div></header><main class="learning-wrap"><section class="progress-wrap" aria-label="학습 진행률"><div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div><div class="progress-track"><div id="progressBar" class="progress-bar"></div></div></section><section class="task-card" aria-live="polite"><div id="taskContent"></div></section><div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div></main></div>`;
  document.querySelector("#homeBtn").addEventListener("click", renderStudentHome);
  document.querySelector("#primaryAction").addEventListener("click", handleUnit8Primary);
}

const unit8Labels = { answer: "문제 풀기", pattern: "앞 표현 식별", bridge: "중간 표현 확인", form: "to-V · ~ing 결정", rule: "5초 Rule", retry: "원문 재도전" };

function setUnit8Primary(enabled, label = "다음") {
  const button = document.querySelector("#primaryAction");
  if (!button) return;
  button.disabled = !enabled;
  button.textContent = label;
}

function updateUnit8Progress() {
  const itemNo = unit8Session.itemIndex + 1;
  const stageNo = unit8Session.stageIndex + 1;
  const stepCount = unit8Session.stages.length;
  document.querySelector("#stageLabel").textContent = `${unit8Labels[currentUnit8Stage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unit8Items.length}`;
  document.querySelector("#progressBar").style.width = `${((unit8Session.itemIndex * stepCount + stageNo) / (unit8Items.length * stepCount)) * 100}%`;
}

function unit8ContextHtml() {
  const item = currentUnit8Item();
  return `<div class="question-context"><span class="context-label">문제 ${unit8Session.itemIndex + 1}</span><p class="context-sentence">${item.prompt}</p>${unit8Session.initialAnswer ? `<p class="context-choice">처음 선택 <strong>${unit8Session.initialAnswer}</strong></p>` : ""}</div>`;
}

function renderUnit8Stage() {
  updateUnit8Progress();
  const stage = currentUnit8Stage();
  if (stage === "answer") return renderUnit8Answer(false);
  if (stage === "pattern") return renderUnit8Pattern();
  if (stage === "bridge") return renderUnit8Bridge();
  if (stage === "form") return renderUnit8Form();
  if (stage === "rule") return renderUnit8Rule();
  if (stage === "retry") return renderUnit8Answer(true);
}

function renderUnit8Answer(isRetry) {
  const item = currentUnit8Item();
  unit8Session.selectedAnswer = null;
  setUnit8Primary(false, isRetry ? "결과 보기" : "근거 확인");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p><h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2><p class="question">${item.prompt}</p><div class="choice-grid" id="unit8Choices"></div>`;
  const wrap = document.querySelector("#unit8Choices");
  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      unit8Session.selectedAnswer = choice;
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit8Primary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(button);
  });
}

function renderUnit8Pattern() {
  const item = currentUnit8Item();
  unit8Session.selectedPattern = null;
  setUnit8Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 2</p><h2 class="task-title">빈칸 앞의 핵심 표현은 어느 패턴입니까?</h2>${unit8ContextHtml()}<p class="task-copy">뒤 형태부터 보지 말고 spend/waste, take, difficulty 계열 중 무엇인지 먼저 찾습니다.</p><div class="choice-grid" id="u8pattern"><button class="evidence-choice" type="button" data-value="spendWaste">spend / waste 계열</button><button class="evidence-choice" type="button" data-value="takeTime">take + 시간 계열</button><button class="evidence-choice" type="button" data-value="difficultyFamily">have difficulty / problem / hard time 계열</button></div>`;
  bindU8("u8pattern", value => { unit8Session.selectedPattern = value; });
}

function renderUnit8Bridge() {
  unit8Session.selectedBridge = null;
  setUnit8Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 3</p><h2 class="task-title">본동사와 빈칸 사이에는 어떤 표현이 놓여 있습니까?</h2>${unit8ContextHtml()}<div class="choice-grid" id="u8bridge"><button class="evidence-choice" type="button" data-value="timeMoneyResource">spend/waste 뒤 시간·돈</button><button class="evidence-choice" type="button" data-value="elapsedTime">take 뒤 걸린 시간</button><button class="evidence-choice" type="button" data-value="difficultyExpression">difficulty / problem / hard time 표현</button></div>`;
  bindU8("u8bridge", value => { unit8Session.selectedBridge = value; });
}

function renderUnit8Form() {
  unit8Session.selectedForm = null;
  setUnit8Primary(false, "5초 Rule 보기");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 4</p><h2 class="task-title">이 패턴이 요구하는 뒤 형태는 무엇입니까?</h2>${unit8ContextHtml()}<p class="task-copy">spend/waste와 difficulty 계열은 V-ing, take + 시간은 to-V로 바로 연결합니다.</p><div class="choice-grid" id="u8form"><button class="evidence-choice" type="button" data-value="gerundIng">V-ing</button><button class="evidence-choice" type="button" data-value="toInfinitive">to-V</button></div>`;
  bindU8("u8form", value => { unit8Session.selectedForm = value; }, "5초 Rule 보기");
}

function bindU8(id, setter, label = "다음") {
  const wrap = document.querySelector(`#${id}`);
  [...wrap.children].forEach(button => button.addEventListener("click", () => {
    setter(button.dataset.value);
    [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
    setUnit8Primary(true, label);
  }));
}

function renderUnit8Rule() {
  const item = currentUnit8Item();
  const stable = unit8Session.evidence.pattern && unit8Session.evidence.bridge && unit8Session.evidence.form;
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">5초 Rule</p><h2 class="task-title">앞 표현 → 중간 명사 → to-V / V-ing</h2>${unit8ContextHtml()}<div class="rule-box"><strong>CH 2 · UNIT 1 핵심</strong><p>${item.rule}</p></div><p class="feedback ${unit8Session.firstAnswerCorrect && stable ? "ok" : "warn"}">${unit8Session.firstAnswerCorrect && stable ? "표현과 뒤 형태 연결이 안정적입니다." : "앞 표현 또는 뒤 형태 판단이 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>`;
  setUnit8Primary(true, "원문 재도전");
}

function recordUnit8Item() {
  const item = currentUnit8Item();
  const retryCorrect = unit8Session.selectedAnswer === item.answer;
  const stable = unit8Session.evidence.pattern && unit8Session.evidence.bridge && unit8Session.evidence.form;
  let status;
  if (unit8Session.firstAnswerCorrect && stable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";
  unit8Session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (unit8Session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `CH 2 · UNIT 1 · ${unit8Session.itemIndex + 1}번 ${status}`;
  saveStore();
  return status;
}

function nextUnit8OrFinish(status) {
  if (unit8Session.itemIndex < unit8Items.length - 1) {
    unit8Session.pendingNext = true;
    document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">문제 ${unit8Session.itemIndex + 1} 완료</p><h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2><div class="rule-box"><strong>상태</strong><p>${status}</p></div>`;
    setUnit8Primary(true, "다음 문제");
    return;
  }
  finishUnit8();
}

function advanceUnit8Item() {
  unit8Session.itemIndex += 1;
  unit8Session.stageIndex = 0;
  unit8Session.selectedAnswer = null;
  unit8Session.initialAnswer = null;
  unit8Session.firstAnswerCorrect = null;
  unit8Session.selectedPattern = null;
  unit8Session.selectedBridge = null;
  unit8Session.selectedForm = null;
  unit8Session.evidence = { pattern: null, bridge: null, form: null };
  unit8Session.pendingNext = false;
  renderUnit8Stage();
}

function finishUnit8() {
  const mastered = unit8Session.itemResults.filter(result => result.status === "MASTERED_NOW").length;
  const repaired = unit8Session.itemResults.filter(result => result.status === "REPAIRED").length;
  const unresolved = unit8Session.itemResults.filter(result => result.status === "UNRESOLVED").length;
  unit8Session.finished = true;
  store.unit8Runs = (store.unit8Runs || 0) + 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - unit8Session.startAt) / 60000));
  store.lastStatus = `CH 2 · UNIT 1 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...(store.completedUnits || []), 8])];
  saveStore();
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">CH 2 · UNIT 1 완료</p><h2 class="task-title">${unit8Items.length}문항 판단 결과</h2><div class="metric-grid"><div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div></div>`;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unit8Items.length} / ${unit8Items.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setUnit8Primary(true, "학생 홈으로");
}

function handleUnit8Primary() {
  if (unit8Session.finished) return renderStudentHome();
  if (unit8Session.pendingNext) return advanceUnit8Item();
  const item = currentUnit8Item();
  const stage = currentUnit8Stage();
  if (stage === "answer") {
    unit8Session.initialAnswer = unit8Session.selectedAnswer;
    unit8Session.firstAnswerCorrect = unit8Session.selectedAnswer === item.answer;
  }
  if (stage === "pattern") unit8Session.evidence.pattern = unit8Session.selectedPattern === item.patternAnswer;
  if (stage === "bridge") unit8Session.evidence.bridge = unit8Session.selectedBridge === item.bridgeAnswer;
  if (stage === "form") unit8Session.evidence.form = unit8Session.selectedForm === item.formAnswer;
  if (stage === "retry") {
    const status = recordUnit8Item();
    return nextUnit8OrFinish(status);
  }
  unit8Session.stageIndex += 1;
  renderUnit8Stage();
}
