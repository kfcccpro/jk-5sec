const unit13Items = Array.isArray(window.JK_UNIT13_ITEMS) ? window.JK_UNIT13_ITEMS : [];
let unit13Session = null;

function freshUnit13Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "verb", "pattern", "voice", "form", "rule", "retry"],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedVerb: null,
    selectedPattern: null,
    selectedVoice: null,
    selectedForm: null,
    evidence: { verb: null, pattern: null, voice: null, form: null },
    itemResults: [],
    pendingNext: false,
    finished: false,
    startAt: Date.now()
  };
}

function currentUnit13Item() { return unit13Items[unit13Session.itemIndex]; }
function currentUnit13Stage() { return unit13Session.stages[unit13Session.stageIndex]; }

function startUnit13() {
  if (!unit13Items.length) return alert("CHAPTER 3 · UNIT 2 문항 데이터를 불러오지 못했습니다.");
  store.currentUnit = 13;
  saveStore();
  unit13Session = freshUnit13Session();
  renderUnit13Shell();
  renderUnit13Stage();
}

function renderUnit13Shell() {
  app.innerHTML = `<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div><div class="header-actions"><div class="unit-badge">PART 1 · CH 3 · UNIT 2</div><button id="homeBtn" class="header-button" type="button">홈</button></div></header><main class="learning-wrap"><section class="progress-wrap" aria-label="학습 진행률"><div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div><div class="progress-track"><div id="progressBar" class="progress-bar"></div></div></section><section class="task-card" aria-live="polite"><div id="taskContent"></div></section><div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div></main></div>`;
  document.querySelector("#homeBtn").addEventListener("click", renderStudentHome);
  document.querySelector("#primaryAction").addEventListener("click", handleUnit13Primary);
}

const unit13Labels = { answer: "문제 풀기", verb: "핵심 동사", pattern: "make 출제 유형", voice: "능동 · 수동", form: "최종 형태", rule: "5초 Rule", retry: "원문 재도전" };

function setUnit13Primary(enabled, label = "다음") {
  const button = document.querySelector("#primaryAction");
  if (!button) return;
  button.disabled = !enabled;
  button.textContent = label;
}

function updateUnit13Progress() {
  const itemNo = unit13Session.itemIndex + 1;
  const stageNo = unit13Session.stageIndex + 1;
  const stepCount = unit13Session.stages.length;
  document.querySelector("#stageLabel").textContent = `${unit13Labels[currentUnit13Stage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unit13Items.length}`;
  document.querySelector("#progressBar").style.width = `${((unit13Session.itemIndex * stepCount + stageNo) / (unit13Items.length * stepCount)) * 100}%`;
}

function unit13ContextHtml() {
  const item = currentUnit13Item();
  return `<div class="question-context"><span class="context-label">문제 ${unit13Session.itemIndex + 1}</span><p class="context-sentence">${item.prompt}</p>${unit13Session.initialAnswer ? `<p class="context-choice">처음 선택 <strong>${unit13Session.initialAnswer}</strong></p>` : ""}</div>`;
}

function renderUnit13Stage() {
  updateUnit13Progress();
  const stage = currentUnit13Stage();
  if (stage === "answer") return renderUnit13Answer(false);
  if (stage === "verb") return renderUnit13Verb();
  if (stage === "pattern") return renderUnit13Pattern();
  if (stage === "voice") return renderUnit13Voice();
  if (stage === "form") return renderUnit13Form();
  if (stage === "rule") return renderUnit13Rule();
  if (stage === "retry") return renderUnit13Answer(true);
}

function renderUnit13Answer(isRetry) {
  const item = currentUnit13Item();
  unit13Session.selectedAnswer = null;
  setUnit13Primary(false, isRetry ? "결과 보기" : "근거 확인");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p><h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2><p class="question">${item.prompt}</p><div class="choice-grid" id="unit13Choices"></div>`;
  const wrap = document.querySelector("#unit13Choices");
  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      unit13Session.selectedAnswer = choice;
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit13Primary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(button);
  });
}

function renderUnit13Verb() {
  unit13Session.selectedVerb = null;
  setUnit13Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 2</p><h2 class="task-title">이 출제 유형을 만드는 핵심 동사는 무엇입니까?</h2>${unit13ContextHtml()}<div class="choice-grid" id="u13verb"><button class="evidence-choice" type="button" data-value="make">make</button><button class="evidence-choice" type="button" data-value="see">see · 지각동사</button></div>`;
  bindU13("u13verb", value => { unit13Session.selectedVerb = value; });
}

function renderUnit13Pattern() {
  unit13Session.selectedPattern = null;
  setUnit13Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 3</p><h2 class="task-title">교재의 어느 출제 유형입니까?</h2>${unit13ContextHtml()}<div class="choice-grid" id="u13pattern"><button class="evidence-choice" type="button" data-value="dummyItToInf">make + it + O.C + to-V</button><button class="evidence-choice" type="button" data-value="activeCausativeBare">make + O + 동사원형</button><button class="evidence-choice" type="button" data-value="adjectiveComplement">make + O + 형용사</button><button class="evidence-choice" type="button" data-value="passiveBareToTo">수동태 · 동사원형 → to-V</button></div>`;
  bindU13("u13pattern", value => { unit13Session.selectedPattern = value; });
}

function renderUnit13Voice() {
  unit13Session.selectedVoice = null;
  setUnit13Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 4</p><h2 class="task-title">현재 문장은 능동태입니까, 수동태입니까?</h2>${unit13ContextHtml()}<p class="task-copy">be + p.p.가 보이면 수동태이며, 사역·지각동사의 원형부정사 규칙이 달라집니다.</p><div class="choice-grid" id="u13voice"><button class="evidence-choice" type="button" data-value="active">능동태</button><button class="evidence-choice" type="button" data-value="passive">수동태</button></div>`;
  bindU13("u13voice", value => { unit13Session.selectedVoice = value; });
}

function renderUnit13Form() {
  unit13Session.selectedForm = null;
  setUnit13Primary(false, "5초 Rule 보기");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 5</p><h2 class="task-title">이 유형에서 최종적으로 필요한 형태는 무엇입니까?</h2>${unit13ContextHtml()}<div class="choice-grid" id="u13form"><button class="evidence-choice" type="button" data-value="dummyIt">가목적어 it</button><button class="evidence-choice" type="button" data-value="baseVerb">동사원형</button><button class="evidence-choice" type="button" data-value="adjective">형용사</button><button class="evidence-choice" type="button" data-value="toInfinitive">to-V</button></div>`;
  bindU13("u13form", value => { unit13Session.selectedForm = value; }, "5초 Rule 보기");
}

function bindU13(id, setter, label = "다음") {
  const wrap = document.querySelector(`#${id}`);
  [...wrap.children].forEach(button => button.addEventListener("click", () => {
    setter(button.dataset.value);
    [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
    setUnit13Primary(true, label);
  }));
}

function renderUnit13Rule() {
  const item = currentUnit13Item();
  const stable = unit13Session.evidence.verb && unit13Session.evidence.pattern && unit13Session.evidence.voice && unit13Session.evidence.form;
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">5초 Rule</p><h2 class="task-title">유형 확인 → 능동·수동 → 최종 형태</h2>${unit13ContextHtml()}<div class="rule-box"><strong>CH 3 · UNIT 2 핵심</strong><p>${item.rule}</p></div><p class="feedback ${unit13Session.firstAnswerCorrect && stable ? "ok" : "warn"}">${unit13Session.firstAnswerCorrect && stable ? "make 출제 유형과 수동태의 to 복원을 안정적으로 판정했습니다." : "유형·태·최종 형태 중 한 단계가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>`;
  setUnit13Primary(true, "원문 재도전");
}

function recordUnit13Item() {
  const item = currentUnit13Item();
  const retryCorrect = unit13Session.selectedAnswer === item.answer;
  const stable = unit13Session.evidence.verb && unit13Session.evidence.pattern && unit13Session.evidence.voice && unit13Session.evidence.form;
  let status;
  if (unit13Session.firstAnswerCorrect && stable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";
  unit13Session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (unit13Session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `CH 3 · UNIT 2 · ${unit13Session.itemIndex + 1}번 ${status}`;
  saveStore();
  return status;
}

function nextUnit13OrFinish(status) {
  if (unit13Session.itemIndex < unit13Items.length - 1) {
    unit13Session.pendingNext = true;
    document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">문제 ${unit13Session.itemIndex + 1} 완료</p><h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2><div class="rule-box"><strong>상태</strong><p>${status}</p></div>`;
    setUnit13Primary(true, "다음 문제");
    return;
  }
  finishUnit13();
}

function advanceUnit13Item() {
  unit13Session.itemIndex += 1;
  unit13Session.stageIndex = 0;
  unit13Session.selectedAnswer = null;
  unit13Session.initialAnswer = null;
  unit13Session.firstAnswerCorrect = null;
  unit13Session.selectedVerb = null;
  unit13Session.selectedPattern = null;
  unit13Session.selectedVoice = null;
  unit13Session.selectedForm = null;
  unit13Session.evidence = { verb: null, pattern: null, voice: null, form: null };
  unit13Session.pendingNext = false;
  renderUnit13Stage();
}

function finishUnit13() {
  const mastered = unit13Session.itemResults.filter(result => result.status === "MASTERED_NOW").length;
  const repaired = unit13Session.itemResults.filter(result => result.status === "REPAIRED").length;
  const unresolved = unit13Session.itemResults.filter(result => result.status === "UNRESOLVED").length;
  unit13Session.finished = true;
  store.unit13Runs = (store.unit13Runs || 0) + 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - unit13Session.startAt) / 60000));
  store.lastStatus = `CH 3 · UNIT 2 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...(store.completedUnits || []), 13])];
  saveStore();
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">CH 3 · UNIT 2 완료</p><h2 class="task-title">${unit13Items.length}문항 판단 결과</h2><div class="metric-grid"><div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div></div>`;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unit13Items.length} / ${unit13Items.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setUnit13Primary(true, "학생 홈으로");
}

function handleUnit13Primary() {
  if (unit13Session.finished) return renderStudentHome();
  if (unit13Session.pendingNext) return advanceUnit13Item();
  const item = currentUnit13Item();
  const stage = currentUnit13Stage();
  if (stage === "answer") {
    unit13Session.initialAnswer = unit13Session.selectedAnswer;
    unit13Session.firstAnswerCorrect = unit13Session.selectedAnswer === item.answer;
  }
  if (stage === "verb") unit13Session.evidence.verb = unit13Session.selectedVerb === item.targetVerb;
  if (stage === "pattern") unit13Session.evidence.pattern = unit13Session.selectedPattern === item.patternAnswer;
  if (stage === "voice") unit13Session.evidence.voice = unit13Session.selectedVoice === item.voiceAnswer;
  if (stage === "form") unit13Session.evidence.form = unit13Session.selectedForm === item.formAnswer;
  if (stage === "retry") {
    const status = recordUnit13Item();
    return nextUnit13OrFinish(status);
  }
  unit13Session.stageIndex += 1;
  renderUnit13Stage();
}
