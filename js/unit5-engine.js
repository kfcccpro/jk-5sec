const unit5Items = Array.isArray(window.JK_UNIT5_ITEMS) ? window.JK_UNIT5_ITEMS : [];
let unit5Session = null;

function freshUnit5Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "group", "usage", "form", "rule", "retry"],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedGroup: null,
    selectedUsage: null,
    selectedForm: null,
    evidence: { group: null, usage: null, form: null },
    itemResults: [],
    pendingNext: false,
    finished: false,
    startAt: Date.now()
  };
}

function currentUnit5Item() { return unit5Items[unit5Session.itemIndex]; }
function currentUnit5Stage() { return unit5Session.stages[unit5Session.stageIndex]; }

function startUnit5() {
  if (!unit5Items.length) return alert("UNIT 5 문항 데이터를 불러오지 못했습니다.");
  store.currentUnit = 5;
  saveStore();
  unit5Session = freshUnit5Session();
  renderUnit5Shell();
  renderUnit5Stage();
}

function renderUnit5Shell() {
  app.innerHTML = `
    <div class="screen">
      <header class="topbar">
        <div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div>
        <div class="header-actions"><div class="unit-badge">PART 1 · CH 1 · UNIT 5</div><button id="homeBtn" class="header-button" type="button">홈</button></div>
      </header>
      <main class="learning-wrap">
        <section class="progress-wrap" aria-label="학습 진행률">
          <div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div>
          <div class="progress-track"><div id="progressBar" class="progress-bar"></div></div>
        </section>
        <section class="task-card" aria-live="polite"><div id="taskContent"></div></section>
        <div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div>
      </main>
    </div>`;
  document.querySelector("#homeBtn").addEventListener("click", renderStudentHome);
  document.querySelector("#primaryAction").addEventListener("click", handleUnit5Primary);
}

const unit5Labels = {
  answer: "문제 풀기",
  group: "동사 부류",
  usage: "자·타 용법",
  form: "수동태 가능 여부",
  rule: "5초 Rule",
  retry: "원문 재도전"
};

function setUnit5Primary(enabled, label = "다음") {
  const button = document.querySelector("#primaryAction");
  if (!button) return;
  button.disabled = !enabled;
  button.textContent = label;
}

function updateUnit5Progress() {
  const itemNo = unit5Session.itemIndex + 1;
  const stageNo = unit5Session.stageIndex + 1;
  const stepCount = unit5Session.stages.length;
  document.querySelector("#stageLabel").textContent = `${unit5Labels[currentUnit5Stage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unit5Items.length}`;
  document.querySelector("#progressBar").style.width = `${((unit5Session.itemIndex * stepCount + stageNo) / (unit5Items.length * stepCount)) * 100}%`;
}

function unit5ContextHtml() {
  const item = currentUnit5Item();
  return `<div class="question-context"><span class="context-label">문제 ${unit5Session.itemIndex + 1}</span><p class="context-sentence">${item.prompt}</p>${unit5Session.initialAnswer ? `<p class="context-choice">처음 선택 <strong>${unit5Session.initialAnswer}</strong></p>` : ""}</div>`;
}

function renderUnit5Stage() {
  updateUnit5Progress();
  const stage = currentUnit5Stage();
  if (stage === "answer") return renderUnit5Answer(false);
  if (stage === "group") return renderUnit5Group();
  if (stage === "usage") return renderUnit5Usage();
  if (stage === "form") return renderUnit5Form();
  if (stage === "rule") return renderUnit5Rule();
  if (stage === "retry") return renderUnit5Answer(true);
}

function renderUnit5Answer(isRetry) {
  const item = currentUnit5Item();
  unit5Session.selectedAnswer = null;
  setUnit5Primary(false, isRetry ? "결과 보기" : "근거 확인");
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p>
    <h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2>
    <p class="question">${item.prompt}</p>
    <div class="choice-grid" id="unit5Choices"></div>`;
  const wrap = document.querySelector("#unit5Choices");
  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      unit5Session.selectedAnswer = choice;
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit5Primary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(button);
  });
}

function renderUnit5Group() {
  const item = currentUnit5Item();
  unit5Session.selectedGroup = null;
  setUnit5Primary(false, "다음");
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">STEP 2</p>
    <h2 class="task-title">${item.targetVerb}는 어떤 부류로 판단해야 합니까?</h2>
    ${unit5ContextHtml()}
    <p class="task-copy">UNIT 5에서는 일반적인 능동·수동 공식보다 먼저 수동태 금지 동사인지 확인합니다.</p>
    <div class="choice-grid" id="u5group">
      <button class="evidence-choice" type="button" data-value="fixedIntransitiveNoPassive">자동사형 · 수동태 불가</button>
      <button class="evidence-choice" type="button" data-value="fixedTransitiveNoPassive">목적어를 취해도 수동태 불가</button>
      <button class="evidence-choice" type="button" data-value="contextDependent">문맥에 따라 자·타 용법 구별</button>
    </div>`;
  bindU5("u5group", value => { unit5Session.selectedGroup = value; });
}

function renderUnit5Usage() {
  unit5Session.selectedUsage = null;
  setUnit5Primary(false, "다음");
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">STEP 3</p>
    <h2 class="task-title">능동문 기준으로 이 용법은 목적어를 직접 취합니까?</h2>
    ${unit5ContextHtml()}
    <p class="task-copy">표면에 be+p.p.가 보이는지보다, 원래 동사가 이 문맥에서 자동사인지 타동사인지 먼저 봅니다.</p>
    <div class="choice-grid" id="u5usage">
      <button class="evidence-choice" type="button" data-value="intransitive">자동사 용법 · 목적어 없음</button>
      <button class="evidence-choice" type="button" data-value="transitive">타동사 용법 · 목적어 취함</button>
    </div>`;
  bindU5("u5usage", value => { unit5Session.selectedUsage = value; });
}

function renderUnit5Form() {
  unit5Session.selectedForm = null;
  setUnit5Primary(false, "5초 Rule 보기");
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">STEP 4</p>
    <h2 class="task-title">이 문맥에서 수동태를 만들 수 있습니까?</h2>
    ${unit5ContextHtml()}
    <div class="choice-grid" id="u5form">
      <button class="evidence-choice" type="button" data-value="activeOnly">수동태 X · 능동형 유지</button>
      <button class="evidence-choice" type="button" data-value="passiveAllowed">수동태 가능 · be + p.p.</button>
    </div>`;
  bindU5("u5form", value => { unit5Session.selectedForm = value; }, "5초 Rule 보기");
}

function bindU5(id, setter, label = "다음") {
  const wrap = document.querySelector(`#${id}`);
  [...wrap.children].forEach(button => {
    button.addEventListener("click", () => {
      setter(button.dataset.value);
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit5Primary(true, label);
    });
  });
}

function renderUnit5Rule() {
  const item = currentUnit5Item();
  const stable = unit5Session.evidence.group && unit5Session.evidence.usage && unit5Session.evidence.form;
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">5초 Rule</p>
    <h2 class="task-title">금지 동사 확인 → 자·타 용법 → 수동태 여부</h2>
    ${unit5ContextHtml()}
    <div class="rule-box"><strong>UNIT 5 핵심</strong><p>${item.rule}</p></div>
    <p class="feedback ${unit5Session.firstAnswerCorrect && stable ? "ok" : "warn"}">${unit5Session.firstAnswerCorrect && stable ? "정답과 판단 근거가 모두 안정적입니다." : "정답 또는 근거가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>`;
  setUnit5Primary(true, "원문 재도전");
}

function recordUnit5Item() {
  const item = currentUnit5Item();
  const retryCorrect = unit5Session.selectedAnswer === item.answer;
  const stable = unit5Session.evidence.group && unit5Session.evidence.usage && unit5Session.evidence.form;
  let status;
  if (unit5Session.firstAnswerCorrect && stable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";

  unit5Session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (unit5Session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `UNIT 5 · ${unit5Session.itemIndex + 1}번 ${status}`;
  saveStore();
  return status;
}

function nextUnit5OrFinish(status) {
  if (unit5Session.itemIndex < unit5Items.length - 1) {
    unit5Session.pendingNext = true;
    document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">문제 ${unit5Session.itemIndex + 1} 완료</p><h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2><div class="rule-box"><strong>상태</strong><p>${status}</p></div>`;
    setUnit5Primary(true, "다음 문제");
    return;
  }
  finishUnit5();
}

function advanceUnit5Item() {
  unit5Session.itemIndex += 1;
  unit5Session.stageIndex = 0;
  unit5Session.selectedAnswer = null;
  unit5Session.initialAnswer = null;
  unit5Session.firstAnswerCorrect = null;
  unit5Session.selectedGroup = null;
  unit5Session.selectedUsage = null;
  unit5Session.selectedForm = null;
  unit5Session.evidence = { group: null, usage: null, form: null };
  unit5Session.pendingNext = false;
  renderUnit5Stage();
}

function finishUnit5() {
  const mastered = unit5Session.itemResults.filter(result => result.status === "MASTERED_NOW").length;
  const repaired = unit5Session.itemResults.filter(result => result.status === "REPAIRED").length;
  const unresolved = unit5Session.itemResults.filter(result => result.status === "UNRESOLVED").length;
  unit5Session.finished = true;
  store.unit5Runs = (store.unit5Runs || 0) + 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - unit5Session.startAt) / 60000));
  store.lastStatus = `UNIT 5 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...(store.completedUnits || []), 5])];
  saveStore();
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">UNIT 5 완료</p><h2 class="task-title">${unit5Items.length}문항 판단 결과</h2><div class="metric-grid"><div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div></div>`;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unit5Items.length} / ${unit5Items.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setUnit5Primary(true, "학생 홈으로");
}

function handleUnit5Primary() {
  if (unit5Session.finished) return renderStudentHome();
  if (unit5Session.pendingNext) return advanceUnit5Item();

  const item = currentUnit5Item();
  const stage = currentUnit5Stage();
  if (stage === "answer") {
    unit5Session.initialAnswer = unit5Session.selectedAnswer;
    unit5Session.firstAnswerCorrect = unit5Session.selectedAnswer === item.answer;
  }
  if (stage === "group") unit5Session.evidence.group = unit5Session.selectedGroup === item.groupAnswer;
  if (stage === "usage") unit5Session.evidence.usage = unit5Session.selectedUsage === item.usageAnswer;
  if (stage === "form") unit5Session.evidence.form = unit5Session.selectedForm === item.formAnswer;
  if (stage === "retry") {
    const status = recordUnit5Item();
    return nextUnit5OrFinish(status);
  }
  unit5Session.stageIndex += 1;
  renderUnit5Stage();
}
