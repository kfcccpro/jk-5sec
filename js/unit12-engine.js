const unit12Items = Array.isArray(window.JK_UNIT12_ITEMS) ? window.JK_UNIT12_ITEMS : [];
let unit12Session = null;

function freshUnit12Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "verb", "family", "relation", "complement", "rule", "retry"],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedVerb: null,
    selectedFamily: null,
    selectedRelation: null,
    selectedComplement: null,
    evidence: { verb: null, family: null, relation: null, complement: null },
    itemResults: [],
    pendingNext: false,
    finished: false,
    startAt: Date.now()
  };
}

function currentUnit12Item() { return unit12Items[unit12Session.itemIndex]; }
function currentUnit12Stage() { return unit12Session.stages[unit12Session.stageIndex]; }

function startUnit12() {
  if (!unit12Items.length) return alert("CHAPTER 3 · UNIT 1 문항 데이터를 불러오지 못했습니다.");
  store.currentUnit = 12;
  saveStore();
  unit12Session = freshUnit12Session();
  renderUnit12Shell();
  renderUnit12Stage();
}

function renderUnit12Shell() {
  app.innerHTML = `<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div><div class="header-actions"><div class="unit-badge">PART 1 · CH 3 · UNIT 1</div><button id="homeBtn" class="header-button" type="button">홈</button></div></header><main class="learning-wrap"><section class="progress-wrap" aria-label="학습 진행률"><div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div><div class="progress-track"><div id="progressBar" class="progress-bar"></div></div></section><section class="task-card" aria-live="polite"><div id="taskContent"></div></section><div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div></main></div>`;
  document.querySelector("#homeBtn").addEventListener("click", renderStudentHome);
  document.querySelector("#primaryAction").addEventListener("click", handleUnit12Primary);
}

const unit12Labels = { answer: "문제 풀기", verb: "핵심 동사", family: "동사 종류", relation: "O-O.C 관계", complement: "목적격보어 형태", rule: "5초 Rule", retry: "원문 재도전" };

function setUnit12Primary(enabled, label = "다음") {
  const button = document.querySelector("#primaryAction");
  if (!button) return;
  button.disabled = !enabled;
  button.textContent = label;
}

function updateUnit12Progress() {
  const itemNo = unit12Session.itemIndex + 1;
  const stageNo = unit12Session.stageIndex + 1;
  const stepCount = unit12Session.stages.length;
  document.querySelector("#stageLabel").textContent = `${unit12Labels[currentUnit12Stage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unit12Items.length}`;
  document.querySelector("#progressBar").style.width = `${((unit12Session.itemIndex * stepCount + stageNo) / (unit12Items.length * stepCount)) * 100}%`;
}

function unit12ContextHtml() {
  const item = currentUnit12Item();
  return `<div class="question-context"><span class="context-label">문제 ${unit12Session.itemIndex + 1}</span><p class="context-sentence">${item.prompt}</p>${unit12Session.initialAnswer ? `<p class="context-choice">처음 선택 <strong>${unit12Session.initialAnswer}</strong></p>` : ""}</div>`;
}

function renderUnit12Stage() {
  updateUnit12Progress();
  const stage = currentUnit12Stage();
  if (stage === "answer") return renderUnit12Answer(false);
  if (stage === "verb") return renderUnit12Verb();
  if (stage === "family") return renderUnit12Family();
  if (stage === "relation") return renderUnit12Relation();
  if (stage === "complement") return renderUnit12Complement();
  if (stage === "rule") return renderUnit12Rule();
  if (stage === "retry") return renderUnit12Answer(true);
}

function renderUnit12Answer(isRetry) {
  const item = currentUnit12Item();
  unit12Session.selectedAnswer = null;
  setUnit12Primary(false, isRetry ? "결과 보기" : "근거 확인");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p><h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2><p class="question">${item.prompt}</p><div class="choice-grid" id="unit12Choices"></div>`;
  const wrap = document.querySelector("#unit12Choices");
  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      unit12Session.selectedAnswer = choice;
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit12Primary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(button);
  });
}

function renderUnit12Verb() {
  unit12Session.selectedVerb = null;
  setUnit12Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 2</p><h2 class="task-title">목적격보어 형태를 결정하는 핵심 동사는 무엇입니까?</h2>${unit12ContextHtml()}<div class="choice-grid" id="u12verb"><button class="evidence-choice" type="button" data-value="make">make</button><button class="evidence-choice" type="button" data-value="get">get</button><button class="evidence-choice" type="button" data-value="help">help</button><button class="evidence-choice" type="button" data-value="hear">hear</button><button class="evidence-choice" type="button" data-value="see">see</button></div>`;
  bindU12("u12verb", value => { unit12Session.selectedVerb = value; });
}

function renderUnit12Family() {
  unit12Session.selectedFamily = null;
  setUnit12Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 3</p><h2 class="task-title">이 동사는 어느 분류입니까?</h2>${unit12ContextHtml()}<p class="task-copy">make·have·let은 사역, get·help는 준사역, see·watch·hear 등은 지각동사입니다.</p><div class="choice-grid" id="u12family"><button class="evidence-choice" type="button" data-value="causative">사역동사</button><button class="evidence-choice" type="button" data-value="quasiCausative">준사역동사</button><button class="evidence-choice" type="button" data-value="perception">지각동사</button></div>`;
  bindU12("u12family", value => { unit12Session.selectedFamily = value; });
}

function renderUnit12Relation() {
  unit12Session.selectedRelation = null;
  setUnit12Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 4</p><h2 class="task-title">목적어와 목적격보어의 의미 관계는 무엇입니까?</h2>${unit12ContextHtml()}<p class="task-copy">목적어가 그 행동을 직접 하면 능동, 목적어가 그 행동을 당하면 수동입니다.</p><div class="choice-grid" id="u12relation"><button class="evidence-choice" type="button" data-value="active">능동관계</button><button class="evidence-choice" type="button" data-value="passive">수동관계</button></div>`;
  bindU12("u12relation", value => { unit12Session.selectedRelation = value; });
}

function renderUnit12Complement() {
  unit12Session.selectedComplement = null;
  setUnit12Primary(false, "5초 Rule 보기");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 5</p><h2 class="task-title">이 분기에서 허용되는 목적격보어 형태는 무엇입니까?</h2>${unit12ContextHtml()}<div class="choice-grid" id="u12complement"><button class="evidence-choice" type="button" data-value="baseVerb">동사원형</button><button class="evidence-choice" type="button" data-value="toInfinitive">to-V</button><button class="evidence-choice" type="button" data-value="baseOrTo">동사원형 / to-V</button><button class="evidence-choice" type="button" data-value="baseOrIng">동사원형 / V-ing</button><button class="evidence-choice" type="button" data-value="pastParticiple">p.p.</button></div>`;
  bindU12("u12complement", value => { unit12Session.selectedComplement = value; }, "5초 Rule 보기");
}

function bindU12(id, setter, label = "다음") {
  const wrap = document.querySelector(`#${id}`);
  [...wrap.children].forEach(button => button.addEventListener("click", () => {
    setter(button.dataset.value);
    [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
    setUnit12Primary(true, label);
  }));
}

function renderUnit12Rule() {
  const item = currentUnit12Item();
  const stable = unit12Session.evidence.verb && unit12Session.evidence.family && unit12Session.evidence.relation && unit12Session.evidence.complement;
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">5초 Rule</p><h2 class="task-title">동사 종류 → O-O.C 관계 → 목적격보어 형태</h2>${unit12ContextHtml()}<div class="rule-box"><strong>CH 3 · UNIT 1 핵심</strong><p>${item.rule}</p></div><p class="feedback ${unit12Session.firstAnswerCorrect && stable ? "ok" : "warn"}">${unit12Session.firstAnswerCorrect && stable ? "사역·준사역·지각동사의 목적격보어 분기를 안정적으로 판정했습니다." : "동사 종류·능수동 관계·목적격보어 형태 중 한 단계가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>`;
  setUnit12Primary(true, "원문 재도전");
}

function recordUnit12Item() {
  const item = currentUnit12Item();
  const retryCorrect = unit12Session.selectedAnswer === item.answer;
  const stable = unit12Session.evidence.verb && unit12Session.evidence.family && unit12Session.evidence.relation && unit12Session.evidence.complement;
  let status;
  if (unit12Session.firstAnswerCorrect && stable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";
  unit12Session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (unit12Session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `CH 3 · UNIT 1 · ${unit12Session.itemIndex + 1}번 ${status}`;
  saveStore();
  return status;
}

function nextUnit12OrFinish(status) {
  if (unit12Session.itemIndex < unit12Items.length - 1) {
    unit12Session.pendingNext = true;
    document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">문제 ${unit12Session.itemIndex + 1} 완료</p><h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2><div class="rule-box"><strong>상태</strong><p>${status}</p></div>`;
    setUnit12Primary(true, "다음 문제");
    return;
  }
  finishUnit12();
}

function advanceUnit12Item() {
  unit12Session.itemIndex += 1;
  unit12Session.stageIndex = 0;
  unit12Session.selectedAnswer = null;
  unit12Session.initialAnswer = null;
  unit12Session.firstAnswerCorrect = null;
  unit12Session.selectedVerb = null;
  unit12Session.selectedFamily = null;
  unit12Session.selectedRelation = null;
  unit12Session.selectedComplement = null;
  unit12Session.evidence = { verb: null, family: null, relation: null, complement: null };
  unit12Session.pendingNext = false;
  renderUnit12Stage();
}

function finishUnit12() {
  const mastered = unit12Session.itemResults.filter(result => result.status === "MASTERED_NOW").length;
  const repaired = unit12Session.itemResults.filter(result => result.status === "REPAIRED").length;
  const unresolved = unit12Session.itemResults.filter(result => result.status === "UNRESOLVED").length;
  unit12Session.finished = true;
  store.unit12Runs = (store.unit12Runs || 0) + 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - unit12Session.startAt) / 60000));
  store.lastStatus = `CH 3 · UNIT 1 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...(store.completedUnits || []), 12])];
  saveStore();
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">CH 3 · UNIT 1 완료</p><h2 class="task-title">${unit12Items.length}문항 판단 결과</h2><div class="metric-grid"><div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div></div>`;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unit12Items.length} / ${unit12Items.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setUnit12Primary(true, "학생 홈으로");
}

function handleUnit12Primary() {
  if (unit12Session.finished) return renderStudentHome();
  if (unit12Session.pendingNext) return advanceUnit12Item();
  const item = currentUnit12Item();
  const stage = currentUnit12Stage();
  if (stage === "answer") {
    unit12Session.initialAnswer = unit12Session.selectedAnswer;
    unit12Session.firstAnswerCorrect = unit12Session.selectedAnswer === item.answer;
  }
  if (stage === "verb") unit12Session.evidence.verb = unit12Session.selectedVerb === item.targetVerb;
  if (stage === "family") unit12Session.evidence.family = unit12Session.selectedFamily === item.familyAnswer;
  if (stage === "relation") unit12Session.evidence.relation = unit12Session.selectedRelation === item.relationAnswer;
  if (stage === "complement") unit12Session.evidence.complement = unit12Session.selectedComplement === item.complementFormAnswer;
  if (stage === "retry") {
    const status = recordUnit12Item();
    return nextUnit12OrFinish(status);
  }
  unit12Session.stageIndex += 1;
  renderUnit12Stage();
}
