const unit14Items = Array.isArray(window.JK_UNIT14_ITEMS) ? window.JK_UNIT14_ITEMS : [];
let unit14Session = null;

function freshUnit14Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "pair", "transitivity", "meaning", "forms", "rule", "retry"],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedPair: null,
    selectedTransitivity: null,
    selectedMeaning: null,
    selectedForms: null,
    evidence: { pair: null, transitivity: null, meaning: null, forms: null },
    itemResults: [],
    pendingNext: false,
    finished: false,
    startAt: Date.now()
  };
}

function currentUnit14Item() { return unit14Items[unit14Session.itemIndex]; }
function currentUnit14Stage() { return unit14Session.stages[unit14Session.stageIndex]; }

function startUnit14() {
  if (!unit14Items.length) return alert("CHAPTER 4 · UNIT 1 문항 데이터를 불러오지 못했습니다.");
  store.currentUnit = 14;
  saveStore();
  unit14Session = freshUnit14Session();
  renderUnit14Shell();
  renderUnit14Stage();
}

function renderUnit14Shell() {
  app.innerHTML = `<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div><div class="header-actions"><div class="unit-badge">PART 1 · CH 4 · UNIT 1</div><button id="homeBtn" class="header-button" type="button">홈</button></div></header><main class="learning-wrap"><section class="progress-wrap" aria-label="학습 진행률"><div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div><div class="progress-track"><div id="progressBar" class="progress-bar"></div></div></section><section class="task-card" aria-live="polite"><div id="taskContent"></div></section><div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div></main></div>`;
  document.querySelector("#homeBtn").addEventListener("click", renderStudentHome);
  document.querySelector("#primaryAction").addEventListener("click", handleUnit14Primary);
}

const unit14Labels = { answer: "문제 풀기", pair: "혼동 동사쌍", transitivity: "자동사·타동사", meaning: "의미 확인", forms: "변화형", rule: "5초 Rule", retry: "원문 재도전" };

function setUnit14Primary(enabled, label = "다음") {
  const button = document.querySelector("#primaryAction");
  if (!button) return;
  button.disabled = !enabled;
  button.textContent = label;
}

function updateUnit14Progress() {
  const itemNo = unit14Session.itemIndex + 1;
  const stageNo = unit14Session.stageIndex + 1;
  const stepCount = unit14Session.stages.length;
  document.querySelector("#stageLabel").textContent = `${unit14Labels[currentUnit14Stage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unit14Items.length}`;
  document.querySelector("#progressBar").style.width = `${((unit14Session.itemIndex * stepCount + stageNo) / (unit14Items.length * stepCount)) * 100}%`;
}

function unit14ContextHtml() {
  const item = currentUnit14Item();
  return `<div class="question-context"><span class="context-label">문제 ${unit14Session.itemIndex + 1}</span><p class="context-sentence">${item.prompt}</p>${unit14Session.initialAnswer ? `<p class="context-choice">처음 선택 <strong>${unit14Session.initialAnswer}</strong></p>` : ""}</div>`;
}

function renderUnit14Stage() {
  updateUnit14Progress();
  const stage = currentUnit14Stage();
  if (stage === "answer") return renderUnit14Answer(false);
  if (stage === "pair") return renderUnit14Pair();
  if (stage === "transitivity") return renderUnit14Transitivity();
  if (stage === "meaning") return renderUnit14Meaning();
  if (stage === "forms") return renderUnit14Forms();
  if (stage === "rule") return renderUnit14Rule();
  if (stage === "retry") return renderUnit14Answer(true);
}

function renderUnit14Answer(isRetry) {
  const item = currentUnit14Item();
  unit14Session.selectedAnswer = null;
  setUnit14Primary(false, isRetry ? "결과 보기" : "근거 확인");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p><h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2><p class="question">${item.prompt}</p><div class="choice-grid" id="unit14Choices"></div>`;
  const wrap = document.querySelector("#unit14Choices");
  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      unit14Session.selectedAnswer = choice;
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit14Primary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(button);
  });
}

function renderUnit14Pair() {
  unit14Session.selectedPair = null;
  setUnit14Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 2</p><h2 class="task-title">어느 혼동 동사 묶음을 판정하고 있습니까?</h2>${unit14ContextHtml()}<div class="choice-grid" id="u14pair"><button class="evidence-choice" type="button" data-value="riseRaise">rise / raise</button><button class="evidence-choice" type="button" data-value="lieLay">lie / lay</button><button class="evidence-choice" type="button" data-value="lieMeanings">lie의 두 의미</button><button class="evidence-choice" type="button" data-value="sitSeat">sit / seat</button><button class="evidence-choice" type="button" data-value="ariseArouse">arise / arouse</button></div>`;
  bindU14("u14pair", value => { unit14Session.selectedPair = value; });
}

function renderUnit14Transitivity() {
  unit14Session.selectedTransitivity = null;
  setUnit14Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 3</p><h2 class="task-title">정답 동사는 자동사입니까, 타동사입니까?</h2>${unit14ContextHtml()}<p class="task-copy">UNIT 1에서는 동사쌍 자체의 자동사·타동사 성격을 함께 기억합니다.</p><div class="choice-grid" id="u14trans"><button class="evidence-choice" type="button" data-value="intransitive">자동사</button><button class="evidence-choice" type="button" data-value="transitive">타동사</button></div>`;
  bindU14("u14trans", value => { unit14Session.selectedTransitivity = value; });
}

function renderUnit14Meaning() {
  const item = currentUnit14Item();
  unit14Session.selectedMeaning = null;
  setUnit14Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 4</p><h2 class="task-title">정답 동사의 핵심 의미는 무엇입니까?</h2>${unit14ContextHtml()}<div class="choice-grid" id="u14meaning"></div>`;
  const wrap = document.querySelector("#u14meaning");
  item.meaningOptions.forEach(option => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "evidence-choice";
    button.dataset.value = option.value;
    button.textContent = option.label;
    wrap.appendChild(button);
  });
  bindU14("u14meaning", value => { unit14Session.selectedMeaning = value; });
}

function renderUnit14Forms() {
  const item = currentUnit14Item();
  unit14Session.selectedForms = null;
  setUnit14Primary(false, "5초 Rule 보기");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 5</p><h2 class="task-title">정답 동사의 변화형을 고르세요.</h2>${unit14ContextHtml()}<div class="choice-grid" id="u14forms"></div>`;
  const wrap = document.querySelector("#u14forms");
  item.formOptions.forEach(form => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "evidence-choice";
    button.dataset.value = form;
    button.textContent = form;
    wrap.appendChild(button);
  });
  bindU14("u14forms", value => { unit14Session.selectedForms = value; }, "5초 Rule 보기");
}

function bindU14(id, setter, label = "다음") {
  const wrap = document.querySelector(`#${id}`);
  [...wrap.children].forEach(button => button.addEventListener("click", () => {
    setter(button.dataset.value);
    [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
    setUnit14Primary(true, label);
  }));
}

function renderUnit14Rule() {
  const item = currentUnit14Item();
  const stable = unit14Session.evidence.pair && unit14Session.evidence.transitivity && unit14Session.evidence.meaning && unit14Session.evidence.forms;
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">5초 Rule</p><h2 class="task-title">동사쌍 → 자동사·타동사 → 의미 → 변화형</h2>${unit14ContextHtml()}<div class="rule-box"><strong>CH 4 · UNIT 1 핵심</strong><p>${item.rule}</p></div><p class="feedback ${unit14Session.firstAnswerCorrect && stable ? "ok" : "warn"}">${unit14Session.firstAnswerCorrect && stable ? "혼동 동사의 성격·의미·변화형을 안정적으로 연결했습니다." : "동사쌍·자동사/타동사·의미·변화형 중 한 단계가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>`;
  setUnit14Primary(true, "원문 재도전");
}

function recordUnit14Item() {
  const item = currentUnit14Item();
  const retryCorrect = unit14Session.selectedAnswer === item.answer;
  const stable = unit14Session.evidence.pair && unit14Session.evidence.transitivity && unit14Session.evidence.meaning && unit14Session.evidence.forms;
  let status;
  if (unit14Session.firstAnswerCorrect && stable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";
  unit14Session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (unit14Session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `CH 4 · UNIT 1 · ${unit14Session.itemIndex + 1}번 ${status}`;
  saveStore();
  return status;
}

function nextUnit14OrFinish(status) {
  if (unit14Session.itemIndex < unit14Items.length - 1) {
    unit14Session.pendingNext = true;
    document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">문제 ${unit14Session.itemIndex + 1} 완료</p><h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2><div class="rule-box"><strong>상태</strong><p>${status}</p></div>`;
    setUnit14Primary(true, "다음 문제");
    return;
  }
  finishUnit14();
}

function advanceUnit14Item() {
  unit14Session.itemIndex += 1;
  unit14Session.stageIndex = 0;
  unit14Session.selectedAnswer = null;
  unit14Session.initialAnswer = null;
  unit14Session.firstAnswerCorrect = null;
  unit14Session.selectedPair = null;
  unit14Session.selectedTransitivity = null;
  unit14Session.selectedMeaning = null;
  unit14Session.selectedForms = null;
  unit14Session.evidence = { pair: null, transitivity: null, meaning: null, forms: null };
  unit14Session.pendingNext = false;
  renderUnit14Stage();
}

function finishUnit14() {
  const mastered = unit14Session.itemResults.filter(result => result.status === "MASTERED_NOW").length;
  const repaired = unit14Session.itemResults.filter(result => result.status === "REPAIRED").length;
  const unresolved = unit14Session.itemResults.filter(result => result.status === "UNRESOLVED").length;
  unit14Session.finished = true;
  store.unit14Runs = (store.unit14Runs || 0) + 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - unit14Session.startAt) / 60000));
  store.lastStatus = `CH 4 · UNIT 1 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...(store.completedUnits || []), 14])];
  saveStore();
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">CH 4 · UNIT 1 완료</p><h2 class="task-title">${unit14Items.length}문항 판단 결과</h2><div class="metric-grid"><div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div></div>`;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unit14Items.length} / ${unit14Items.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setUnit14Primary(true, "학생 홈으로");
}

function handleUnit14Primary() {
  if (unit14Session.finished) return renderStudentHome();
  if (unit14Session.pendingNext) return advanceUnit14Item();
  const item = currentUnit14Item();
  const stage = currentUnit14Stage();
  if (stage === "answer") {
    unit14Session.initialAnswer = unit14Session.selectedAnswer;
    unit14Session.firstAnswerCorrect = unit14Session.selectedAnswer === item.answer;
  }
  if (stage === "pair") unit14Session.evidence.pair = unit14Session.selectedPair === item.pairAnswer;
  if (stage === "transitivity") unit14Session.evidence.transitivity = unit14Session.selectedTransitivity === item.transitivityAnswer;
  if (stage === "meaning") unit14Session.evidence.meaning = unit14Session.selectedMeaning === item.meaningAnswer;
  if (stage === "forms") unit14Session.evidence.forms = unit14Session.selectedForms === item.formSeriesAnswer;
  if (stage === "retry") {
    const status = recordUnit14Item();
    return nextUnit14OrFinish(status);
  }
  unit14Session.stageIndex += 1;
  renderUnit14Stage();
}
