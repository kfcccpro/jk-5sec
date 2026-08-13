const unit11Items = Array.isArray(window.JK_UNIT11_ITEMS) ? window.JK_UNIT11_ITEMS : [];
let unit11Session = null;

function freshUnit11Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "verb", "pattern", "complement", "form", "rule", "retry"],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedVerb: null,
    selectedPattern: null,
    selectedComplement: null,
    selectedForm: null,
    evidence: { verb: null, pattern: null, complement: null, form: null },
    itemResults: [],
    pendingNext: false,
    finished: false,
    startAt: Date.now()
  };
}

function currentUnit11Item() { return unit11Items[unit11Session.itemIndex]; }
function currentUnit11Stage() { return unit11Session.stages[unit11Session.stageIndex]; }

function startUnit11() {
  if (!unit11Items.length) return alert("CHAPTER 2 · UNIT 4 문항 데이터를 불러오지 못했습니다.");
  store.currentUnit = 11;
  saveStore();
  unit11Session = freshUnit11Session();
  renderUnit11Shell();
  renderUnit11Stage();
}

function renderUnit11Shell() {
  app.innerHTML = `<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div><div class="header-actions"><div class="unit-badge">PART 1 · CH 2 · UNIT 4</div><button id="homeBtn" class="header-button" type="button">홈</button></div></header><main class="learning-wrap"><section class="progress-wrap" aria-label="학습 진행률"><div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div><div class="progress-track"><div id="progressBar" class="progress-bar"></div></div></section><section class="task-card" aria-live="polite"><div id="taskContent"></div></section><div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div></main></div>`;
  document.querySelector("#homeBtn").addEventListener("click", renderStudentHome);
  document.querySelector("#primaryAction").addEventListener("click", handleUnit11Primary);
}

const unit11Labels = { answer: "문제 풀기", verb: "감각동사 확인", pattern: "2형식 판정", complement: "보어 자리", form: "형용사 판정", rule: "5초 Rule", retry: "원문 재도전" };

function setUnit11Primary(enabled, label = "다음") {
  const button = document.querySelector("#primaryAction");
  if (!button) return;
  button.disabled = !enabled;
  button.textContent = label;
}

function updateUnit11Progress() {
  const itemNo = unit11Session.itemIndex + 1;
  const stageNo = unit11Session.stageIndex + 1;
  const stepCount = unit11Session.stages.length;
  document.querySelector("#stageLabel").textContent = `${unit11Labels[currentUnit11Stage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unit11Items.length}`;
  document.querySelector("#progressBar").style.width = `${((unit11Session.itemIndex * stepCount + stageNo) / (unit11Items.length * stepCount)) * 100}%`;
}

function unit11ContextHtml() {
  const item = currentUnit11Item();
  return `<div class="question-context"><span class="context-label">문제 ${unit11Session.itemIndex + 1}</span><p class="context-sentence">${item.prompt}</p>${unit11Session.initialAnswer ? `<p class="context-choice">처음 선택 <strong>${unit11Session.initialAnswer}</strong></p>` : ""}</div>`;
}

function renderUnit11Stage() {
  updateUnit11Progress();
  const stage = currentUnit11Stage();
  if (stage === "answer") return renderUnit11Answer(false);
  if (stage === "verb") return renderUnit11Verb();
  if (stage === "pattern") return renderUnit11Pattern();
  if (stage === "complement") return renderUnit11Complement();
  if (stage === "form") return renderUnit11Form();
  if (stage === "rule") return renderUnit11Rule();
  if (stage === "retry") return renderUnit11Answer(true);
}

function renderUnit11Answer(isRetry) {
  const item = currentUnit11Item();
  unit11Session.selectedAnswer = null;
  setUnit11Primary(false, isRetry ? "결과 보기" : "근거 확인");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p><h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2><p class="question">${item.prompt}</p><div class="choice-grid" id="unit11Choices"></div>`;
  const wrap = document.querySelector("#unit11Choices");
  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      unit11Session.selectedAnswer = choice;
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit11Primary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(button);
  });
}

function renderUnit11Verb() {
  unit11Session.selectedVerb = null;
  setUnit11Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 2</p><h2 class="task-title">문장의 감각동사는 무엇입니까?</h2>${unit11ContextHtml()}<p class="task-copy">feel · look · smell · sound · taste 중 해당 동사를 먼저 잡습니다.</p><div class="choice-grid" id="u11verb"><button class="evidence-choice" type="button" data-value="feel">feel</button><button class="evidence-choice" type="button" data-value="look">look</button><button class="evidence-choice" type="button" data-value="smell">smell</button><button class="evidence-choice" type="button" data-value="sound">sound</button><button class="evidence-choice" type="button" data-value="taste">taste</button></div>`;
  bindU11("u11verb", value => { unit11Session.selectedVerb = value; });
}

function renderUnit11Pattern() {
  unit11Session.selectedPattern = null;
  setUnit11Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 3</p><h2 class="task-title">이 감각동사는 어떤 구조로 쓰였습니까?</h2>${unit11ContextHtml()}<p class="task-copy">주어의 상태·인상을 이어 주면 2형식 연결동사입니다.</p><div class="choice-grid" id="u11pattern"><button class="evidence-choice" type="button" data-value="linkingSecondPattern">2형식 연결동사</button><button class="evidence-choice" type="button" data-value="actionAdverbPattern">행동동사 + 부사</button></div>`;
  bindU11("u11pattern", value => { unit11Session.selectedPattern = value; });
}

function renderUnit11Complement() {
  unit11Session.selectedComplement = null;
  setUnit11Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 4</p><h2 class="task-title">감각동사 뒤 빈칸은 무슨 자리입니까?</h2>${unit11ContextHtml()}<div class="choice-grid" id="u11complement"><button class="evidence-choice" type="button" data-value="subjectComplement">주격보어</button><button class="evidence-choice" type="button" data-value="adverbialModifier">부사 수식어</button></div>`;
  bindU11("u11complement", value => { unit11Session.selectedComplement = value; });
}

function renderUnit11Form() {
  unit11Session.selectedForm = null;
  setUnit11Primary(false, "5초 Rule 보기");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 5</p><h2 class="task-title">주격보어 자리에는 어떤 품사가 필요합니까?</h2>${unit11ContextHtml()}<p class="task-copy">감각동사 뒤에서 주어의 상태를 설명하면 형용사를 선택합니다.</p><div class="choice-grid" id="u11form"><button class="evidence-choice" type="button" data-value="adjective">형용사</button><button class="evidence-choice" type="button" data-value="adverb">부사</button></div>`;
  bindU11("u11form", value => { unit11Session.selectedForm = value; }, "5초 Rule 보기");
}

function bindU11(id, setter, label = "다음") {
  const wrap = document.querySelector(`#${id}`);
  [...wrap.children].forEach(button => button.addEventListener("click", () => {
    setter(button.dataset.value);
    [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
    setUnit11Primary(true, label);
  }));
}

function renderUnit11Rule() {
  const item = currentUnit11Item();
  const stable = unit11Session.evidence.verb && unit11Session.evidence.pattern && unit11Session.evidence.complement && unit11Session.evidence.form;
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">5초 Rule</p><h2 class="task-title">감각동사 → 2형식 → 주격보어 → 형용사</h2>${unit11ContextHtml()}<div class="rule-box"><strong>CH 2 · UNIT 4 핵심</strong><p>${item.rule}</p></div><p class="feedback ${unit11Session.firstAnswerCorrect && stable ? "ok" : "warn"}">${unit11Session.firstAnswerCorrect && stable ? "감각동사 뒤 형용사 보어를 안정적으로 판정했습니다." : "감각동사·문형·보어·품사 중 한 단계가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>`;
  setUnit11Primary(true, "원문 재도전");
}

function recordUnit11Item() {
  const item = currentUnit11Item();
  const retryCorrect = unit11Session.selectedAnswer === item.answer;
  const stable = unit11Session.evidence.verb && unit11Session.evidence.pattern && unit11Session.evidence.complement && unit11Session.evidence.form;
  let status;
  if (unit11Session.firstAnswerCorrect && stable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";
  unit11Session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (unit11Session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `CH 2 · UNIT 4 · ${unit11Session.itemIndex + 1}번 ${status}`;
  saveStore();
  return status;
}

function nextUnit11OrFinish(status) {
  if (unit11Session.itemIndex < unit11Items.length - 1) {
    unit11Session.pendingNext = true;
    document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">문제 ${unit11Session.itemIndex + 1} 완료</p><h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2><div class="rule-box"><strong>상태</strong><p>${status}</p></div>`;
    setUnit11Primary(true, "다음 문제");
    return;
  }
  finishUnit11();
}

function advanceUnit11Item() {
  unit11Session.itemIndex += 1;
  unit11Session.stageIndex = 0;
  unit11Session.selectedAnswer = null;
  unit11Session.initialAnswer = null;
  unit11Session.firstAnswerCorrect = null;
  unit11Session.selectedVerb = null;
  unit11Session.selectedPattern = null;
  unit11Session.selectedComplement = null;
  unit11Session.selectedForm = null;
  unit11Session.evidence = { verb: null, pattern: null, complement: null, form: null };
  unit11Session.pendingNext = false;
  renderUnit11Stage();
}

function finishUnit11() {
  const mastered = unit11Session.itemResults.filter(result => result.status === "MASTERED_NOW").length;
  const repaired = unit11Session.itemResults.filter(result => result.status === "REPAIRED").length;
  const unresolved = unit11Session.itemResults.filter(result => result.status === "UNRESOLVED").length;
  unit11Session.finished = true;
  store.unit11Runs = (store.unit11Runs || 0) + 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - unit11Session.startAt) / 60000));
  store.lastStatus = `CH 2 · UNIT 4 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...(store.completedUnits || []), 11])];
  saveStore();
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">CH 2 · UNIT 4 완료</p><h2 class="task-title">${unit11Items.length}문항 판단 결과</h2><div class="metric-grid"><div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div></div>`;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unit11Items.length} / ${unit11Items.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setUnit11Primary(true, "학생 홈으로");
}

function handleUnit11Primary() {
  if (unit11Session.finished) return renderStudentHome();
  if (unit11Session.pendingNext) return advanceUnit11Item();
  const item = currentUnit11Item();
  const stage = currentUnit11Stage();
  if (stage === "answer") {
    unit11Session.initialAnswer = unit11Session.selectedAnswer;
    unit11Session.firstAnswerCorrect = unit11Session.selectedAnswer === item.answer;
  }
  if (stage === "verb") unit11Session.evidence.verb = unit11Session.selectedVerb === item.sensoryVerb;
  if (stage === "pattern") unit11Session.evidence.pattern = unit11Session.selectedPattern === item.linkingAnswer;
  if (stage === "complement") unit11Session.evidence.complement = unit11Session.selectedComplement === item.complementRoleAnswer;
  if (stage === "form") unit11Session.evidence.form = unit11Session.selectedForm === item.formAnswer;
  if (stage === "retry") {
    const status = recordUnit11Item();
    return nextUnit11OrFinish(status);
  }
  unit11Session.stageIndex += 1;
  renderUnit11Stage();
}
