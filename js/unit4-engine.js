const unit4Items = Array.isArray(window.JK_UNIT4_ITEMS) ? window.JK_UNIT4_ITEMS : [];
let unit4Session = null;

function freshUnit4Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "slot", "object", "form", "rule", "retry"],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedSlot: null,
    selectedObject: null,
    selectedForm: null,
    evidence: { slot: null, object: null, form: null },
    itemResults: [],
    startAt: Date.now()
  };
}

function currentUnit4Item() { return unit4Items[unit4Session.itemIndex]; }
function currentUnit4Stage() { return unit4Session.stages[unit4Session.stageIndex]; }

function startUnit4() {
  if (!unit4Items.length) return alert("UNIT 4 문항 데이터를 불러오지 못했습니다.");
  store.currentUnit = 4;
  saveStore();
  unit4Session = freshUnit4Session();
  renderUnit4Shell();
  renderUnit4Stage();
}

function renderUnit4Shell() {
  app.innerHTML = `
    <div class="screen">
      <header class="topbar">
        <div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div>
        <div class="header-actions"><div class="unit-badge">PART 1 · CH 1 · UNIT 4</div><button id="homeBtn" class="header-button" type="button">홈</button></div>
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
  document.querySelector("#primaryAction").addEventListener("click", handleUnit4Primary);
}

const unit4Labels = {
  answer: "문제 풀기",
  slot: "축약 자리",
  object: "목적어 확인",
  form: "V-ing · p.p. 판단",
  rule: "5초 Rule",
  retry: "원문 재도전"
};

function setUnit4Primary(enabled, label = "다음") {
  const button = document.querySelector("#primaryAction");
  if (!button) return;
  button.disabled = !enabled;
  button.textContent = label;
}

function updateUnit4Progress() {
  const itemNo = unit4Session.itemIndex + 1;
  const stageNo = unit4Session.stageIndex + 1;
  const stepCount = unit4Session.stages.length;
  document.querySelector("#stageLabel").textContent = `${unit4Labels[currentUnit4Stage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unit4Items.length}`;
  document.querySelector("#progressBar").style.width = `${((unit4Session.itemIndex * stepCount + stageNo) / (unit4Items.length * stepCount)) * 100}%`;
}

function unit4ContextHtml() {
  const item = currentUnit4Item();
  return `<div class="question-context"><span class="context-label">문제 ${unit4Session.itemIndex + 1}</span><p class="context-sentence">${item.prompt}</p>${unit4Session.initialAnswer ? `<p class="context-choice">처음 선택 <strong>${unit4Session.initialAnswer}</strong></p>` : ""}</div>`;
}

function renderUnit4Stage() {
  updateUnit4Progress();
  const stage = currentUnit4Stage();
  if (stage === "answer") return renderUnit4Answer(false);
  if (stage === "slot") return renderUnit4Slot();
  if (stage === "object") return renderUnit4Object();
  if (stage === "form") return renderUnit4Form();
  if (stage === "rule") return renderUnit4Rule();
  if (stage === "retry") return renderUnit4Answer(true);
}

function renderUnit4Answer(isRetry) {
  const item = currentUnit4Item();
  unit4Session.selectedAnswer = null;
  setUnit4Primary(false, isRetry ? "결과 보기" : "근거 확인");
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p>
    <h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2>
    <p class="question">${item.prompt}</p>
    <div class="choice-grid" id="unit4Choices"></div>`;
  const wrap = document.querySelector("#unit4Choices");
  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      unit4Session.selectedAnswer = choice;
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit4Primary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(button);
  });
}

function renderUnit4Slot() {
  unit4Session.selectedSlot = null;
  setUnit4Primary(false, "다음");
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">STEP 2</p>
    <h2 class="task-title">접속사 뒤 이 빈칸은 어떤 자리입니까?</h2>
    ${unit4ContextHtml()}
    <p class="task-copy">주어·be동사가 생략된 축약구문이면 본동사를 다시 만들지 않습니다.</p>
    <div class="choice-grid" id="u4slot">
      <button class="evidence-choice" type="button" data-value="reducedNonfinite">축약된 준동사 자리</button>
      <button class="evidence-choice" type="button" data-value="finite">새 본동사 자리</button>
    </div>`;
  bindU4("u4slot", value => { unit4Session.selectedSlot = value; });
}

function renderUnit4Object() {
  const item = currentUnit4Item();
  unit4Session.selectedObject = null;
  setUnit4Primary(false, "다음");
  const prompt = item.fallbackRequired
    ? "이 동사는 목적어 유무만으로 능동·수동을 판정할 수 있습니까?"
    : "분사 바로 뒤에 목적어가 있습니까?";
  const options = item.fallbackRequired
    ? `<button class="evidence-choice" type="button" data-value="na">자동사·전치사 구조라 목적어 공식만으로 판정 불가</button><button class="evidence-choice" type="button" data-value="yes">바로 뒤 목적어 있음</button>`
    : `<button class="evidence-choice" type="button" data-value="yes">목적어 있음</button><button class="evidence-choice" type="button" data-value="no">목적어 없음</button>`;
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">STEP 3</p>
    <h2 class="task-title">${prompt}</h2>
    ${unit4ContextHtml()}
    <p class="task-copy">타동사는 바로 뒤 목적어가 있으면 능동, 없으면 수동을 우선합니다. 전치사 뒤 명사는 동사의 목적어로 세지 않습니다.</p>
    <div class="choice-grid" id="u4object">${options}</div>`;
  bindU4("u4object", value => { unit4Session.selectedObject = value; });
}

function renderUnit4Form() {
  const item = currentUnit4Item();
  unit4Session.selectedForm = null;
  setUnit4Primary(false, "5초 Rule 보기");
  const title = item.fallbackRequired
    ? "주절 주어를 분사 앞에 놓으면 능동입니까, 수동입니까?"
    : "목적어 신호로 어떤 형태를 고릅니까?";
  const helper = item.fallbackRequired
    ? "목적어 공식이 안 통하면 원래 주어와 동사의 관계로 돌아갑니다."
    : "목적어 있음 → 능동 V-ing / 목적어 없음 → 수동 p.p.를 먼저 적용합니다.";
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">STEP 4</p>
    <h2 class="task-title">${title}</h2>
    ${unit4ContextHtml()}
    <p class="task-copy">${helper}</p>
    <div class="choice-grid" id="u4form">
      <button class="evidence-choice" type="button" data-value="activeIng">능동 → V-ing</button>
      <button class="evidence-choice" type="button" data-value="passivePp">수동 → p.p.</button>
    </div>`;
  bindU4("u4form", value => { unit4Session.selectedForm = value; }, "5초 Rule 보기");
}

function bindU4(id, setter, label = "다음") {
  const wrap = document.querySelector(`#${id}`);
  [...wrap.children].forEach(button => {
    button.addEventListener("click", () => {
      setter(button.dataset.value);
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit4Primary(true, label);
    });
  });
}

function renderUnit4Rule() {
  const item = currentUnit4Item();
  const stable = unit4Session.evidence.slot && unit4Session.evidence.object && unit4Session.evidence.form;
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">5초 Rule</p>
    <h2 class="task-title">접속사 뒤 축약 → 목적어 → V-ing / p.p.</h2>
    ${unit4ContextHtml()}
    <div class="rule-box"><strong>UNIT 4 핵심</strong><p>${item.rule}</p></div>
    <p class="feedback ${unit4Session.firstAnswerCorrect && stable ? "ok" : "warn"}">${unit4Session.firstAnswerCorrect && stable ? "정답과 판단 근거가 모두 안정적입니다." : "정답 또는 근거가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>`;
  setUnit4Primary(true, "원문 재도전");
}

function recordUnit4Item() {
  const item = currentUnit4Item();
  const retryCorrect = unit4Session.selectedAnswer === item.answer;
  const stable = unit4Session.evidence.slot && unit4Session.evidence.object && unit4Session.evidence.form;
  let status;
  if (unit4Session.firstAnswerCorrect && stable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";

  unit4Session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (unit4Session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `UNIT 4 · ${unit4Session.itemIndex + 1}번 ${status}`;
  saveStore();
  return status;
}

function nextUnit4OrFinish(status) {
  if (unit4Session.itemIndex < unit4Items.length - 1) {
    document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">문제 ${unit4Session.itemIndex + 1} 완료</p><h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2><div class="rule-box"><strong>상태</strong><p>${status}</p></div>`;
    setUnit4Primary(true, "다음 문제");
    document.querySelector("#primaryAction").onclick = () => {
      unit4Session.itemIndex += 1;
      unit4Session.stageIndex = 0;
      unit4Session.selectedAnswer = null;
      unit4Session.initialAnswer = null;
      unit4Session.firstAnswerCorrect = null;
      unit4Session.selectedSlot = null;
      unit4Session.selectedObject = null;
      unit4Session.selectedForm = null;
      unit4Session.evidence = { slot: null, object: null, form: null };
      document.querySelector("#primaryAction").onclick = handleUnit4Primary;
      renderUnit4Stage();
    };
    return;
  }
  finishUnit4();
}

function finishUnit4() {
  const mastered = unit4Session.itemResults.filter(result => result.status === "MASTERED_NOW").length;
  const repaired = unit4Session.itemResults.filter(result => result.status === "REPAIRED").length;
  const unresolved = unit4Session.itemResults.filter(result => result.status === "UNRESOLVED").length;
  store.unit4Runs = (store.unit4Runs || 0) + 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - unit4Session.startAt) / 60000));
  store.lastStatus = `UNIT 4 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...(store.completedUnits || []), 4])];
  saveStore();
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">UNIT 4 완료</p><h2 class="task-title">${unit4Items.length}문항 판단 결과</h2><div class="metric-grid"><div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div></div>`;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unit4Items.length} / ${unit4Items.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setUnit4Primary(true, "학생 홈으로");
  document.querySelector("#primaryAction").onclick = renderStudentHome;
}

function handleUnit4Primary() {
  const item = currentUnit4Item();
  const stage = currentUnit4Stage();
  if (stage === "answer") {
    unit4Session.initialAnswer = unit4Session.selectedAnswer;
    unit4Session.firstAnswerCorrect = unit4Session.selectedAnswer === item.answer;
  }
  if (stage === "slot") unit4Session.evidence.slot = unit4Session.selectedSlot === item.slotAnswer;
  if (stage === "object") unit4Session.evidence.object = unit4Session.selectedObject === item.objectAnswer;
  if (stage === "form") unit4Session.evidence.form = unit4Session.selectedForm === item.formAnswer;
  if (stage === "retry") {
    const status = recordUnit4Item();
    return nextUnit4OrFinish(status);
  }
  unit4Session.stageIndex += 1;
  renderUnit4Stage();
}
