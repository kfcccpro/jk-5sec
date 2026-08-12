const unit6Items = Array.isArray(window.JK_UNIT6_ITEMS) ? window.JK_UNIT6_ITEMS : [];
let unit6Session = null;

function freshUnit6Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "pattern", "remaining", "passive", "rule", "retry"],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedPattern: null,
    selectedRemaining: null,
    selectedPassive: null,
    evidence: { pattern: null, remaining: null, passive: null },
    itemResults: [],
    pendingNext: false,
    finished: false,
    startAt: Date.now()
  };
}

function currentUnit6Item() { return unit6Items[unit6Session.itemIndex]; }
function currentUnit6Stage() { return unit6Session.stages[unit6Session.stageIndex]; }

function startUnit6() {
  if (!unit6Items.length) return alert("UNIT 6 문항 데이터를 불러오지 못했습니다.");
  store.currentUnit = 6;
  saveStore();
  unit6Session = freshUnit6Session();
  renderUnit6Shell();
  renderUnit6Stage();
}

function renderUnit6Shell() {
  app.innerHTML = `<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div><div class="header-actions"><div class="unit-badge">PART 1 · CH 1 · UNIT 6</div><button id="homeBtn" class="header-button" type="button">홈</button></div></header><main class="learning-wrap"><section class="progress-wrap" aria-label="학습 진행률"><div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div><div class="progress-track"><div id="progressBar" class="progress-bar"></div></div></section><section class="task-card" aria-live="polite"><div id="taskContent"></div></section><div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div></main></div>`;
  document.querySelector("#homeBtn").addEventListener("click", renderStudentHome);
  document.querySelector("#primaryAction").addEventListener("click", handleUnit6Primary);
}

const unit6Labels = { answer: "문제 풀기", pattern: "4·5형식 구분", remaining: "남은 명사 역할", passive: "수동태 판정", rule: "5초 Rule", retry: "원문 재도전" };

function setUnit6Primary(enabled, label = "다음") {
  const button = document.querySelector("#primaryAction");
  if (!button) return;
  button.disabled = !enabled;
  button.textContent = label;
}

function updateUnit6Progress() {
  const itemNo = unit6Session.itemIndex + 1;
  const stageNo = unit6Session.stageIndex + 1;
  const stepCount = unit6Session.stages.length;
  document.querySelector("#stageLabel").textContent = `${unit6Labels[currentUnit6Stage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unit6Items.length}`;
  document.querySelector("#progressBar").style.width = `${((unit6Session.itemIndex * stepCount + stageNo) / (unit6Items.length * stepCount)) * 100}%`;
}

function unit6ContextHtml() {
  const item = currentUnit6Item();
  return `<div class="question-context"><span class="context-label">문제 ${unit6Session.itemIndex + 1}</span><p class="context-sentence">${item.prompt}</p>${unit6Session.initialAnswer ? `<p class="context-choice">처음 선택 <strong>${unit6Session.initialAnswer}</strong></p>` : ""}</div>`;
}

function renderUnit6Stage() {
  updateUnit6Progress();
  const stage = currentUnit6Stage();
  if (stage === "answer") return renderUnit6Answer(false);
  if (stage === "pattern") return renderUnit6Pattern();
  if (stage === "remaining") return renderUnit6Remaining();
  if (stage === "passive") return renderUnit6Passive();
  if (stage === "rule") return renderUnit6Rule();
  if (stage === "retry") return renderUnit6Answer(true);
}

function renderUnit6Answer(isRetry) {
  const item = currentUnit6Item();
  unit6Session.selectedAnswer = null;
  setUnit6Primary(false, isRetry ? "결과 보기" : "근거 확인");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p><h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2><p class="question">${item.prompt}</p><div class="choice-grid" id="unit6Choices"></div>`;
  const wrap = document.querySelector("#unit6Choices");
  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      unit6Session.selectedAnswer = choice;
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit6Primary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(button);
  });
}

function renderUnit6Pattern() {
  const item = currentUnit6Item();
  unit6Session.selectedPattern = null;
  setUnit6Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 2</p><h2 class="task-title">${item.targetVerb}는 이 문장에서 어떤 원래 구조를 만듭니까?</h2>${unit6ContextHtml()}<p class="task-copy">수동태를 능동태로 되돌렸을 때 목적어 두 개인 4형식인지, 목적어+목적격보어인 5형식인지 먼저 구분합니다.</p><div class="choice-grid" id="u6pattern"><button class="evidence-choice" type="button" data-value="ditransitive4">4형식 · 간접목적어 + 직접목적어</button><button class="evidence-choice" type="button" data-value="objectComplement5">5형식 · 목적어 + 목적격보어</button></div>`;
  bindU6("u6pattern", value => { unit6Session.selectedPattern = value; });
}

function renderUnit6Remaining() {
  unit6Session.selectedRemaining = null;
  setUnit6Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 3</p><h2 class="task-title">p.p. 뒤에 남은 명사의 역할은 무엇입니까?</h2>${unit6ContextHtml()}<p class="task-copy">4형식이면 다른 목적어가 남고, 5형식이면 원래 목적격보어가 주어를 설명하는 보어로 남습니다.</p><div class="choice-grid" id="u6remaining"><button class="evidence-choice" type="button" data-value="directObject">남은 직접목적어</button><button class="evidence-choice" type="button" data-value="subjectComplement">주어를 설명하는 보어</button></div>`;
  bindU6("u6remaining", value => { unit6Session.selectedRemaining = value; });
}

function renderUnit6Passive() {
  unit6Session.selectedPassive = null;
  setUnit6Primary(false, "5초 Rule 보기");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 4</p><h2 class="task-title">뒤에 명사가 남아 있어도 이 수동태는 성립합니까?</h2>${unit6ContextHtml()}<div class="choice-grid" id="u6passive"><button class="evidence-choice" type="button" data-value="passiveValid">성립한다 · 수동태 유지</button><button class="evidence-choice" type="button" data-value="passiveInvalid">성립하지 않는다 · 능동태 필요</button></div>`;
  bindU6("u6passive", value => { unit6Session.selectedPassive = value; }, "5초 Rule 보기");
}

function bindU6(id, setter, label = "다음") {
  const wrap = document.querySelector(`#${id}`);
  [...wrap.children].forEach(button => button.addEventListener("click", () => {
    setter(button.dataset.value);
    [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
    setUnit6Primary(true, label);
  }));
}

function renderUnit6Rule() {
  const item = currentUnit6Item();
  const stable = unit6Session.evidence.pattern && unit6Session.evidence.remaining && unit6Session.evidence.passive;
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">5초 Rule</p><h2 class="task-title">4·5형식 확인 → 남은 명사 역할 → 수동태 유지</h2>${unit6ContextHtml()}<div class="rule-box"><strong>UNIT 6 핵심</strong><p>${item.rule}</p></div><p class="feedback ${unit6Session.firstAnswerCorrect && stable ? "ok" : "warn"}">${unit6Session.firstAnswerCorrect && stable ? "정답과 판단 근거가 모두 안정적입니다." : "정답 또는 명사 역할 판단이 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>`;
  setUnit6Primary(true, "원문 재도전");
}

function recordUnit6Item() {
  const item = currentUnit6Item();
  const retryCorrect = unit6Session.selectedAnswer === item.answer;
  const stable = unit6Session.evidence.pattern && unit6Session.evidence.remaining && unit6Session.evidence.passive;
  let status;
  if (unit6Session.firstAnswerCorrect && stable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";
  unit6Session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (unit6Session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `UNIT 6 · ${unit6Session.itemIndex + 1}번 ${status}`;
  saveStore();
  return status;
}

function nextUnit6OrFinish(status) {
  if (unit6Session.itemIndex < unit6Items.length - 1) {
    unit6Session.pendingNext = true;
    document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">문제 ${unit6Session.itemIndex + 1} 완료</p><h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2><div class="rule-box"><strong>상태</strong><p>${status}</p></div>`;
    setUnit6Primary(true, "다음 문제");
    return;
  }
  finishUnit6();
}

function advanceUnit6Item() {
  unit6Session.itemIndex += 1;
  unit6Session.stageIndex = 0;
  unit6Session.selectedAnswer = null;
  unit6Session.initialAnswer = null;
  unit6Session.firstAnswerCorrect = null;
  unit6Session.selectedPattern = null;
  unit6Session.selectedRemaining = null;
  unit6Session.selectedPassive = null;
  unit6Session.evidence = { pattern: null, remaining: null, passive: null };
  unit6Session.pendingNext = false;
  renderUnit6Stage();
}

function finishUnit6() {
  const mastered = unit6Session.itemResults.filter(result => result.status === "MASTERED_NOW").length;
  const repaired = unit6Session.itemResults.filter(result => result.status === "REPAIRED").length;
  const unresolved = unit6Session.itemResults.filter(result => result.status === "UNRESOLVED").length;
  unit6Session.finished = true;
  store.unit6Runs = (store.unit6Runs || 0) + 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - unit6Session.startAt) / 60000));
  store.lastStatus = `UNIT 6 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...(store.completedUnits || []), 6])];
  saveStore();
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">UNIT 6 완료</p><h2 class="task-title">${unit6Items.length}문항 판단 결과</h2><div class="metric-grid"><div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div></div>`;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unit6Items.length} / ${unit6Items.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setUnit6Primary(true, "학생 홈으로");
}

function handleUnit6Primary() {
  if (unit6Session.finished) return renderStudentHome();
  if (unit6Session.pendingNext) return advanceUnit6Item();
  const item = currentUnit6Item();
  const stage = currentUnit6Stage();
  if (stage === "answer") {
    unit6Session.initialAnswer = unit6Session.selectedAnswer;
    unit6Session.firstAnswerCorrect = unit6Session.selectedAnswer === item.answer;
  }
  if (stage === "pattern") unit6Session.evidence.pattern = unit6Session.selectedPattern === item.patternAnswer;
  if (stage === "remaining") unit6Session.evidence.remaining = unit6Session.selectedRemaining === item.remainingRoleAnswer;
  if (stage === "passive") unit6Session.evidence.passive = unit6Session.selectedPassive === item.passiveAnswer;
  if (stage === "retry") {
    const status = recordUnit6Item();
    return nextUnit6OrFinish(status);
  }
  unit6Session.stageIndex += 1;
  renderUnit6Stage();
}
