const unit10Items = Array.isArray(window.JK_UNIT10_ITEMS) ? window.JK_UNIT10_ITEMS : [];
let unit10Session = null;

function freshUnit10Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "verb", "dummy", "complement", "realObject", "rule", "retry"],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedVerb: null,
    selectedDummy: null,
    selectedComplement: null,
    selectedRealObject: null,
    evidence: { verb: null, dummy: null, complement: null, realObject: null },
    itemResults: [],
    pendingNext: false,
    finished: false,
    startAt: Date.now()
  };
}

function currentUnit10Item() { return unit10Items[unit10Session.itemIndex]; }
function currentUnit10Stage() { return unit10Session.stages[unit10Session.stageIndex]; }

function startUnit10() {
  if (!unit10Items.length) return alert("CHAPTER 2 · UNIT 3 문항 데이터를 불러오지 못했습니다.");
  store.currentUnit = 10;
  saveStore();
  unit10Session = freshUnit10Session();
  renderUnit10Shell();
  renderUnit10Stage();
}

function renderUnit10Shell() {
  app.innerHTML = `<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div><div class="header-actions"><div class="unit-badge">PART 1 · CH 2 · UNIT 3</div><button id="homeBtn" class="header-button" type="button">홈</button></div></header><main class="learning-wrap"><section class="progress-wrap" aria-label="학습 진행률"><div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div><div class="progress-track"><div id="progressBar" class="progress-bar"></div></div></section><section class="task-card" aria-live="polite"><div id="taskContent"></div></section><div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div></main></div>`;
  document.querySelector("#homeBtn").addEventListener("click", renderStudentHome);
  document.querySelector("#primaryAction").addEventListener("click", handleUnit10Primary);
}

const unit10Labels = { answer: "문제 풀기", verb: "M·T·B·F·C 확인", dummy: "가목적어", complement: "목적격보어", realObject: "진목적어", rule: "5초 Rule", retry: "원문 재도전" };

function setUnit10Primary(enabled, label = "다음") {
  const button = document.querySelector("#primaryAction");
  if (!button) return;
  button.disabled = !enabled;
  button.textContent = label;
}

function updateUnit10Progress() {
  const itemNo = unit10Session.itemIndex + 1;
  const stageNo = unit10Session.stageIndex + 1;
  const stepCount = unit10Session.stages.length;
  document.querySelector("#stageLabel").textContent = `${unit10Labels[currentUnit10Stage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unit10Items.length}`;
  document.querySelector("#progressBar").style.width = `${((unit10Session.itemIndex * stepCount + stageNo) / (unit10Items.length * stepCount)) * 100}%`;
}

function unit10ContextHtml() {
  const item = currentUnit10Item();
  return `<div class="question-context"><span class="context-label">문제 ${unit10Session.itemIndex + 1}</span><p class="context-sentence">${item.prompt}</p>${unit10Session.initialAnswer ? `<p class="context-choice">처음 선택 <strong>${unit10Session.initialAnswer}</strong></p>` : ""}</div>`;
}

function renderUnit10Stage() {
  updateUnit10Progress();
  const stage = currentUnit10Stage();
  if (stage === "answer") return renderUnit10Answer(false);
  if (stage === "verb") return renderUnit10Verb();
  if (stage === "dummy") return renderUnit10Dummy();
  if (stage === "complement") return renderUnit10Complement();
  if (stage === "realObject") return renderUnit10RealObject();
  if (stage === "rule") return renderUnit10Rule();
  if (stage === "retry") return renderUnit10Answer(true);
}

function renderUnit10Answer(isRetry) {
  const item = currentUnit10Item();
  unit10Session.selectedAnswer = null;
  setUnit10Primary(false, isRetry ? "결과 보기" : "근거 확인");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p><h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2><p class="question">${item.prompt}</p><div class="choice-grid" id="unit10Choices"></div>`;
  const wrap = document.querySelector("#unit10Choices");
  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      unit10Session.selectedAnswer = choice;
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit10Primary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(button);
  });
}

function renderUnit10Verb() {
  unit10Session.selectedVerb = null;
  setUnit10Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 2</p><h2 class="task-title">가목적어 패턴을 만드는 핵심 동사는 무엇입니까?</h2>${unit10ContextHtml()}<p class="task-copy">make · think · believe · find · consider 중 문장에 쓰인 동사를 먼저 잡습니다.</p><div class="choice-grid" id="u10verb"><button class="evidence-choice" type="button" data-value="make">make</button><button class="evidence-choice" type="button" data-value="think">think</button><button class="evidence-choice" type="button" data-value="believe">believe</button><button class="evidence-choice" type="button" data-value="find">find</button><button class="evidence-choice" type="button" data-value="consider">consider</button></div>`;
  bindU10("u10verb", value => { unit10Session.selectedVerb = value; });
}

function renderUnit10Dummy() {
  unit10Session.selectedDummy = null;
  setUnit10Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 3</p><h2 class="task-title">긴 진목적어를 뒤로 보낼 때 목적어 자리는 무엇으로 채웁니까?</h2>${unit10ContextHtml()}<div class="choice-grid" id="u10dummy"><button class="evidence-choice" type="button" data-value="dummyIt">가목적어 it</button><button class="evidence-choice" type="button" data-value="ordinaryObject">일반 명사 목적어</button></div>`;
  bindU10("u10dummy", value => { unit10Session.selectedDummy = value; });
}

function renderUnit10Complement() {
  unit10Session.selectedComplement = null;
  setUnit10Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 4</p><h2 class="task-title">it 바로 뒤의 easy·strange·important 같은 말은 무슨 역할입니까?</h2>${unit10ContextHtml()}<p class="task-copy">M/T/B/F/C의 5형식에서는 it 뒤에 목적격보어가 오며, 대표적으로 형용사가 쓰입니다.</p><div class="choice-grid" id="u10complement"><button class="evidence-choice" type="button" data-value="adjectiveComplement">형용사 목적격보어</button><button class="evidence-choice" type="button" data-value="adverbial">부사 수식어</button></div>`;
  bindU10("u10complement", value => { unit10Session.selectedComplement = value; });
}

function renderUnit10RealObject() {
  unit10Session.selectedRealObject = null;
  setUnit10Primary(false, "5초 Rule 보기");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 5</p><h2 class="task-title">목적격보어 뒤로 이동한 진목적어의 형태는 무엇입니까?</h2>${unit10ContextHtml()}<div class="choice-grid" id="u10real"><button class="evidence-choice" type="button" data-value="toInfinitive">to-V</button><button class="evidence-choice" type="button" data-value="thatClause">that절</button></div>`;
  bindU10("u10real", value => { unit10Session.selectedRealObject = value; }, "5초 Rule 보기");
}

function bindU10(id, setter, label = "다음") {
  const wrap = document.querySelector(`#${id}`);
  [...wrap.children].forEach(button => button.addEventListener("click", () => {
    setter(button.dataset.value);
    [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
    setUnit10Primary(true, label);
  }));
}

function renderUnit10Rule() {
  const item = currentUnit10Item();
  const stable = unit10Session.evidence.verb && unit10Session.evidence.dummy && unit10Session.evidence.complement && unit10Session.evidence.realObject;
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">5초 Rule</p><h2 class="task-title">M·T·B·F·C → it → 형용사 보어 → to-V / that</h2>${unit10ContextHtml()}<div class="rule-box"><strong>CH 2 · UNIT 3 핵심</strong><p>${item.rule}</p></div><p class="feedback ${unit10Session.firstAnswerCorrect && stable ? "ok" : "warn"}">${unit10Session.firstAnswerCorrect && stable ? "가목적어와 진목적어 위치를 안정적으로 판정했습니다." : "동사·it·보어·진목적어 중 한 단계가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>`;
  setUnit10Primary(true, "원문 재도전");
}

function recordUnit10Item() {
  const item = currentUnit10Item();
  const retryCorrect = unit10Session.selectedAnswer === item.answer;
  const stable = unit10Session.evidence.verb && unit10Session.evidence.dummy && unit10Session.evidence.complement && unit10Session.evidence.realObject;
  let status;
  if (unit10Session.firstAnswerCorrect && stable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";
  unit10Session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (unit10Session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `CH 2 · UNIT 3 · ${unit10Session.itemIndex + 1}번 ${status}`;
  saveStore();
  return status;
}

function nextUnit10OrFinish(status) {
  if (unit10Session.itemIndex < unit10Items.length - 1) {
    unit10Session.pendingNext = true;
    document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">문제 ${unit10Session.itemIndex + 1} 완료</p><h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2><div class="rule-box"><strong>상태</strong><p>${status}</p></div>`;
    setUnit10Primary(true, "다음 문제");
    return;
  }
  finishUnit10();
}

function advanceUnit10Item() {
  unit10Session.itemIndex += 1;
  unit10Session.stageIndex = 0;
  unit10Session.selectedAnswer = null;
  unit10Session.initialAnswer = null;
  unit10Session.firstAnswerCorrect = null;
  unit10Session.selectedVerb = null;
  unit10Session.selectedDummy = null;
  unit10Session.selectedComplement = null;
  unit10Session.selectedRealObject = null;
  unit10Session.evidence = { verb: null, dummy: null, complement: null, realObject: null };
  unit10Session.pendingNext = false;
  renderUnit10Stage();
}

function finishUnit10() {
  const mastered = unit10Session.itemResults.filter(result => result.status === "MASTERED_NOW").length;
  const repaired = unit10Session.itemResults.filter(result => result.status === "REPAIRED").length;
  const unresolved = unit10Session.itemResults.filter(result => result.status === "UNRESOLVED").length;
  unit10Session.finished = true;
  store.unit10Runs = (store.unit10Runs || 0) + 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - unit10Session.startAt) / 60000));
  store.lastStatus = `CH 2 · UNIT 3 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...(store.completedUnits || []), 10])];
  saveStore();
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">CH 2 · UNIT 3 완료</p><h2 class="task-title">${unit10Items.length}문항 판단 결과</h2><div class="metric-grid"><div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div></div>`;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unit10Items.length} / ${unit10Items.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setUnit10Primary(true, "학생 홈으로");
}

function handleUnit10Primary() {
  if (unit10Session.finished) return renderStudentHome();
  if (unit10Session.pendingNext) return advanceUnit10Item();
  const item = currentUnit10Item();
  const stage = currentUnit10Stage();
  if (stage === "answer") {
    unit10Session.initialAnswer = unit10Session.selectedAnswer;
    unit10Session.firstAnswerCorrect = unit10Session.selectedAnswer === item.answer;
  }
  if (stage === "verb") unit10Session.evidence.verb = unit10Session.selectedVerb === item.targetVerb;
  if (stage === "dummy") unit10Session.evidence.dummy = unit10Session.selectedDummy === item.dummyObjectAnswer;
  if (stage === "complement") unit10Session.evidence.complement = unit10Session.selectedComplement === item.complementAnswer;
  if (stage === "realObject") unit10Session.evidence.realObject = unit10Session.selectedRealObject === item.realObjectAnswer;
  if (stage === "retry") {
    const status = recordUnit10Item();
    return nextUnit10OrFinish(status);
  }
  unit10Session.stageIndex += 1;
  renderUnit10Stage();
}
