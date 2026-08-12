const unit7Items = Array.isArray(window.JK_UNIT7_ITEMS) ? window.JK_UNIT7_ITEMS : [];
let unit7Session = null;

function freshUnit7Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "chain", "family", "object", "voice", "rule", "retry"],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedChain: null,
    selectedFamily: null,
    selectedObject: null,
    selectedVoice: null,
    evidence: { chain: null, family: null, object: null, voice: null },
    itemResults: [],
    pendingNext: false,
    finished: false,
    startAt: Date.now()
  };
}

function currentUnit7Item() { return unit7Items[unit7Session.itemIndex]; }
function currentUnit7Stage() { return unit7Session.stages[unit7Session.stageIndex]; }

function startUnit7() {
  if (!unit7Items.length) return alert("UNIT 7 문항 데이터를 불러오지 못했습니다.");
  store.currentUnit = 7;
  saveStore();
  unit7Session = freshUnit7Session();
  renderUnit7Shell();
  renderUnit7Stage();
}

function renderUnit7Shell() {
  app.innerHTML = `<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div><div class="header-actions"><div class="unit-badge">PART 1 · CH 1 · UNIT 7</div><button id="homeBtn" class="header-button" type="button">홈</button></div></header><main class="learning-wrap"><section class="progress-wrap" aria-label="학습 진행률"><div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div><div class="progress-track"><div id="progressBar" class="progress-bar"></div></div></section><section class="task-card" aria-live="polite"><div id="taskContent"></div></section><div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div></main></div>`;
  document.querySelector("#homeBtn").addEventListener("click", renderStudentHome);
  document.querySelector("#primaryAction").addEventListener("click", handleUnit7Primary);
}

const unit7Labels = { answer: "문제 풀기", chain: "보조동사 사슬", family: "수동 형태", object: "p.p. 뒤 확인", voice: "최종 판정", rule: "5초 Rule", retry: "원문 재도전" };

function setUnit7Primary(enabled, label = "다음") {
  const button = document.querySelector("#primaryAction");
  if (!button) return;
  button.disabled = !enabled;
  button.textContent = label;
}

function updateUnit7Progress() {
  const itemNo = unit7Session.itemIndex + 1;
  const stageNo = unit7Session.stageIndex + 1;
  const stepCount = unit7Session.stages.length;
  document.querySelector("#stageLabel").textContent = `${unit7Labels[currentUnit7Stage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unit7Items.length}`;
  document.querySelector("#progressBar").style.width = `${((unit7Session.itemIndex * stepCount + stageNo) / (unit7Items.length * stepCount)) * 100}%`;
}

function unit7ContextHtml() {
  const item = currentUnit7Item();
  return `<div class="question-context"><span class="context-label">문제 ${unit7Session.itemIndex + 1}</span><p class="context-sentence">${item.prompt}</p>${unit7Session.initialAnswer ? `<p class="context-choice">처음 선택 <strong>${unit7Session.initialAnswer}</strong></p>` : ""}</div>`;
}

function renderUnit7Stage() {
  updateUnit7Progress();
  const stage = currentUnit7Stage();
  if (stage === "answer") return renderUnit7Answer(false);
  if (stage === "chain") return renderUnit7Chain();
  if (stage === "family") return renderUnit7Family();
  if (stage === "object") return renderUnit7Object();
  if (stage === "voice") return renderUnit7Voice();
  if (stage === "rule") return renderUnit7Rule();
  if (stage === "retry") return renderUnit7Answer(true);
}

function renderUnit7Answer(isRetry) {
  const item = currentUnit7Item();
  unit7Session.selectedAnswer = null;
  setUnit7Primary(false, isRetry ? "결과 보기" : "근거 확인");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p><h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2><p class="question">${item.prompt}</p><div class="choice-grid" id="unit7Choices"></div>`;
  const wrap = document.querySelector("#unit7Choices");
  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      unit7Session.selectedAnswer = choice;
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit7Primary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(button);
  });
}

function renderUnit7Chain() {
  unit7Session.selectedChain = null;
  setUnit7Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 2</p><h2 class="task-title">수동태를 만드는 보조동사 사슬은 무엇입니까?</h2>${unit7ContextHtml()}<p class="task-copy">맨 뒤의 p.p.만 보지 말고 앞에서부터 조동사·have·be·being·been을 묶어 읽습니다.</p><div class="choice-grid" id="u7chain"><button class="evidence-choice" type="button" data-value="beBeingPp">be + being + p.p.</button><button class="evidence-choice" type="button" data-value="haveBeenPp">have/has/had + been + p.p.</button><button class="evidence-choice" type="button" data-value="modalBePp">조동사 + be + p.p.</button><button class="evidence-choice" type="button" data-value="modalHaveBeenPp">조동사 + have been + p.p.</button><button class="evidence-choice" type="button" data-value="simpleBePp">be + p.p.</button></div>`;
  bindU7("u7chain", value => { unit7Session.selectedChain = value; });
}

function renderUnit7Family() {
  unit7Session.selectedFamily = null;
  setUnit7Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 3</p><h2 class="task-title">이 보조동사 사슬은 어떤 수동 형태입니까?</h2>${unit7ContextHtml()}<div class="choice-grid" id="u7family"><button class="evidence-choice" type="button" data-value="progressivePassive">진행 수동</button><button class="evidence-choice" type="button" data-value="perfectPassive">완료 수동</button><button class="evidence-choice" type="button" data-value="modalPassive">조동사 수동</button><button class="evidence-choice" type="button" data-value="modalPerfectPassive">조동사 완료 수동</button><button class="evidence-choice" type="button" data-value="simplePassive">일반 수동</button></div>`;
  bindU7("u7family", value => { unit7Session.selectedFamily = value; });
}

function renderUnit7Object() {
  unit7Session.selectedObject = null;
  setUnit7Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 4</p><h2 class="task-title">p.p. 뒤에 직접목적어가 남아 있습니까?</h2>${unit7ContextHtml()}<p class="task-copy">일반적으로 수동태 뒤에는 직접목적어가 오지 않습니다. 다만 UNIT 6의 4·5형식 구조는 예외입니다. 전치사 뒤 명사는 직접목적어가 아닙니다.</p><div class="choice-grid" id="u7object"><button class="evidence-choice" type="button" data-value="noDirectObject">직접목적어 없음</button><button class="evidence-choice" type="button" data-value="unit6Exception">UNIT 6 구조라 명사가 남아도 가능</button><button class="evidence-choice" type="button" data-value="directObjectConflict">일반 수동 뒤 직접목적어가 와서 충돌</button></div>`;
  bindU7("u7object", value => { unit7Session.selectedObject = value; });
}

function renderUnit7Voice() {
  unit7Session.selectedVoice = null;
  setUnit7Primary(false, "5초 Rule 보기");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 5</p><h2 class="task-title">최종적으로 이 수동태 형태는 성립합니까?</h2>${unit7ContextHtml()}<div class="choice-grid" id="u7voice"><button class="evidence-choice" type="button" data-value="passiveValid">성립한다 · 수동태 유지</button><button class="evidence-choice" type="button" data-value="activeRequired">성립하지 않는다 · 능동형 필요</button></div>`;
  bindU7("u7voice", value => { unit7Session.selectedVoice = value; }, "5초 Rule 보기");
}

function bindU7(id, setter, label = "다음") {
  const wrap = document.querySelector(`#${id}`);
  [...wrap.children].forEach(button => button.addEventListener("click", () => {
    setter(button.dataset.value);
    [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
    setUnit7Primary(true, label);
  }));
}

function renderUnit7Rule() {
  const item = currentUnit7Item();
  const stable = unit7Session.evidence.chain && unit7Session.evidence.family && unit7Session.evidence.object && unit7Session.evidence.voice;
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">5초 Rule</p><h2 class="task-title">보조동사 사슬 → p.p. → 뒤 목적어 확인</h2>${unit7ContextHtml()}<div class="rule-box"><strong>UNIT 7 핵심</strong><p>${item.rule}</p></div><p class="feedback ${unit7Session.firstAnswerCorrect && stable ? "ok" : "warn"}">${unit7Session.firstAnswerCorrect && stable ? "수동태 형태와 보조동사 사슬이 모두 안정적입니다." : "수동태 형태 또는 뒤 목적어 판단이 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>`;
  setUnit7Primary(true, "원문 재도전");
}

function recordUnit7Item() {
  const item = currentUnit7Item();
  const retryCorrect = unit7Session.selectedAnswer === item.answer;
  const stable = unit7Session.evidence.chain && unit7Session.evidence.family && unit7Session.evidence.object && unit7Session.evidence.voice;
  let status;
  if (unit7Session.firstAnswerCorrect && stable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";
  unit7Session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (unit7Session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `UNIT 7 · ${unit7Session.itemIndex + 1}번 ${status}`;
  saveStore();
  return status;
}

function nextUnit7OrFinish(status) {
  if (unit7Session.itemIndex < unit7Items.length - 1) {
    unit7Session.pendingNext = true;
    document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">문제 ${unit7Session.itemIndex + 1} 완료</p><h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2><div class="rule-box"><strong>상태</strong><p>${status}</p></div>`;
    setUnit7Primary(true, "다음 문제");
    return;
  }
  finishUnit7();
}

function advanceUnit7Item() {
  unit7Session.itemIndex += 1;
  unit7Session.stageIndex = 0;
  unit7Session.selectedAnswer = null;
  unit7Session.initialAnswer = null;
  unit7Session.firstAnswerCorrect = null;
  unit7Session.selectedChain = null;
  unit7Session.selectedFamily = null;
  unit7Session.selectedObject = null;
  unit7Session.selectedVoice = null;
  unit7Session.evidence = { chain: null, family: null, object: null, voice: null };
  unit7Session.pendingNext = false;
  renderUnit7Stage();
}

function finishUnit7() {
  const mastered = unit7Session.itemResults.filter(result => result.status === "MASTERED_NOW").length;
  const repaired = unit7Session.itemResults.filter(result => result.status === "REPAIRED").length;
  const unresolved = unit7Session.itemResults.filter(result => result.status === "UNRESOLVED").length;
  unit7Session.finished = true;
  store.unit7Runs = (store.unit7Runs || 0) + 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - unit7Session.startAt) / 60000));
  store.lastStatus = `UNIT 7 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...(store.completedUnits || []), 7])];
  saveStore();
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">UNIT 7 완료</p><h2 class="task-title">${unit7Items.length}문항 판단 결과</h2><div class="metric-grid"><div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div></div>`;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unit7Items.length} / ${unit7Items.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setUnit7Primary(true, "학생 홈으로");
}

function handleUnit7Primary() {
  if (unit7Session.finished) return renderStudentHome();
  if (unit7Session.pendingNext) return advanceUnit7Item();
  const item = currentUnit7Item();
  const stage = currentUnit7Stage();
  if (stage === "answer") {
    unit7Session.initialAnswer = unit7Session.selectedAnswer;
    unit7Session.firstAnswerCorrect = unit7Session.selectedAnswer === item.answer;
  }
  if (stage === "chain") unit7Session.evidence.chain = unit7Session.selectedChain === item.auxiliaryChainAnswer;
  if (stage === "family") unit7Session.evidence.family = unit7Session.selectedFamily === item.passiveFamilyAnswer;
  if (stage === "object") unit7Session.evidence.object = unit7Session.selectedObject === item.objectAfterPpAnswer;
  if (stage === "voice") unit7Session.evidence.voice = unit7Session.selectedVoice === item.voiceAnswer;
  if (stage === "retry") {
    const status = recordUnit7Item();
    return nextUnit7OrFinish(status);
  }
  unit7Session.stageIndex += 1;
  renderUnit7Stage();
}
