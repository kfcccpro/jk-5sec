const unit9Items = Array.isArray(window.JK_UNIT9_ITEMS) ? window.JK_UNIT9_ITEMS : [];
let unit9Session = null;

function freshUnit9Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "subject", "be", "meaning", "form", "rule", "retry"],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedSubject: null,
    selectedBe: null,
    selectedMeaning: null,
    selectedForm: null,
    evidence: { subject: null, be: null, meaning: null, form: null },
    itemResults: [],
    pendingNext: false,
    finished: false,
    startAt: Date.now()
  };
}

function currentUnit9Item() { return unit9Items[unit9Session.itemIndex]; }
function currentUnit9Stage() { return unit9Session.stages[unit9Session.stageIndex]; }

function startUnit9() {
  if (!unit9Items.length) return alert("CHAPTER 2 · UNIT 2 문항 데이터를 불러오지 못했습니다.");
  store.currentUnit = 9;
  saveStore();
  unit9Session = freshUnit9Session();
  renderUnit9Shell();
  renderUnit9Stage();
}

function renderUnit9Shell() {
  app.innerHTML = `<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div><div class="header-actions"><div class="unit-badge">PART 1 · CH 2 · UNIT 2</div><button id="homeBtn" class="header-button" type="button">홈</button></div></header><main class="learning-wrap"><section class="progress-wrap" aria-label="학습 진행률"><div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div><div class="progress-track"><div id="progressBar" class="progress-bar"></div></div></section><section class="task-card" aria-live="polite"><div id="taskContent"></div></section><div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div></main></div>`;
  document.querySelector("#homeBtn").addEventListener("click", renderStudentHome);
  document.querySelector("#primaryAction").addEventListener("click", handleUnit9Primary);
}

const unit9Labels = { answer: "문제 풀기", subject: "주어 확인", be: "be 유무", meaning: "use 의미", form: "뒤 형태", rule: "5초 Rule", retry: "원문 재도전" };

function setUnit9Primary(enabled, label = "다음") {
  const button = document.querySelector("#primaryAction");
  if (!button) return;
  button.disabled = !enabled;
  button.textContent = label;
}

function updateUnit9Progress() {
  const itemNo = unit9Session.itemIndex + 1;
  const stageNo = unit9Session.stageIndex + 1;
  const stepCount = unit9Session.stages.length;
  document.querySelector("#stageLabel").textContent = `${unit9Labels[currentUnit9Stage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unit9Items.length}`;
  document.querySelector("#progressBar").style.width = `${((unit9Session.itemIndex * stepCount + stageNo) / (unit9Items.length * stepCount)) * 100}%`;
}

function unit9ContextHtml() {
  const item = currentUnit9Item();
  return `<div class="question-context"><span class="context-label">문제 ${unit9Session.itemIndex + 1}</span><p class="context-sentence">${item.prompt}</p>${unit9Session.initialAnswer ? `<p class="context-choice">처음 선택 <strong>${unit9Session.initialAnswer}</strong></p>` : ""}</div>`;
}

function renderUnit9Stage() {
  updateUnit9Progress();
  const stage = currentUnit9Stage();
  if (stage === "answer") return renderUnit9Answer(false);
  if (stage === "subject") return renderUnit9Subject();
  if (stage === "be") return renderUnit9Be();
  if (stage === "meaning") return renderUnit9Meaning();
  if (stage === "form") return renderUnit9Form();
  if (stage === "rule") return renderUnit9Rule();
  if (stage === "retry") return renderUnit9Answer(true);
}

function renderUnit9Answer(isRetry) {
  const item = currentUnit9Item();
  unit9Session.selectedAnswer = null;
  setUnit9Primary(false, isRetry ? "결과 보기" : "근거 확인");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p><h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2><p class="question">${item.prompt}</p><div class="choice-grid" id="unit9Choices"></div>`;
  const wrap = document.querySelector("#unit9Choices");
  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      unit9Session.selectedAnswer = choice;
      [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
      setUnit9Primary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(button);
  });
}

function renderUnit9Subject() {
  unit9Session.selectedSubject = null;
  setUnit9Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 2</p><h2 class="task-title">used 구조의 주어는 사람입니까, 사물·방법입니까?</h2>${unit9ContextHtml()}<p class="task-copy">be used to가 보이면 먼저 주어 성격을 확인합니다. 사물주어는 사용 목적, 사람주어는 익숙함일 가능성이 높습니다.</p><div class="choice-grid" id="u9subject"><button class="evidence-choice" type="button" data-value="thingSubject">사물·방법 주어</button><button class="evidence-choice" type="button" data-value="personSubject">사람·사람집단 주어</button></div>`;
  bindU9("u9subject", value => { unit9Session.selectedSubject = value; });
}

function renderUnit9Be() {
  unit9Session.selectedBe = null;
  setUnit9Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 3</p><h2 class="task-title">used 앞에 be동사가 결합되어 있습니까?</h2>${unit9ContextHtml()}<p class="task-copy">be가 없으면 used to + 동사원형의 과거 습관 구조를 우선 확인합니다.</p><div class="choice-grid" id="u9be"><button class="evidence-choice" type="button" data-value="bePresent">be + used to</button><button class="evidence-choice" type="button" data-value="beAbsent">used to · be 없음</button></div>`;
  bindU9("u9be", value => { unit9Session.selectedBe = value; });
}

function renderUnit9Meaning() {
  unit9Session.selectedMeaning = null;
  setUnit9Primary(false);
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 4</p><h2 class="task-title">문맥에서 used 구조의 의미는 무엇입니까?</h2>${unit9ContextHtml()}<div class="choice-grid" id="u9meaning"><button class="evidence-choice" type="button" data-value="purposeUse">~하는 데 사용되다</button><button class="evidence-choice" type="button" data-value="accustomed">~하는 데 익숙하다</button><button class="evidence-choice" type="button" data-value="pastHabit">~하곤 했다 · 과거 습관</button></div>`;
  bindU9("u9meaning", value => { unit9Session.selectedMeaning = value; });
}

function renderUnit9Form() {
  unit9Session.selectedForm = null;
  setUnit9Primary(false, "5초 Rule 보기");
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">STEP 5</p><h2 class="task-title">to 뒤에 필요한 형태는 무엇입니까?</h2>${unit9ContextHtml()}<p class="task-copy">사용 목적과 과거 습관은 동사원형, 익숙함의 be used to는 전치사 to 뒤 V-ing입니다.</p><div class="choice-grid" id="u9form"><button class="evidence-choice" type="button" data-value="baseVerb">동사원형</button><button class="evidence-choice" type="button" data-value="gerundIng">V-ing</button></div>`;
  bindU9("u9form", value => { unit9Session.selectedForm = value; }, "5초 Rule 보기");
}

function bindU9(id, setter, label = "다음") {
  const wrap = document.querySelector(`#${id}`);
  [...wrap.children].forEach(button => button.addEventListener("click", () => {
    setter(button.dataset.value);
    [...wrap.children].forEach(element => element.classList.toggle("selected", element === button));
    setUnit9Primary(true, label);
  }));
}

function renderUnit9Rule() {
  const item = currentUnit9Item();
  const stable = unit9Session.evidence.subject && unit9Session.evidence.be && unit9Session.evidence.meaning && unit9Session.evidence.form;
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">5초 Rule</p><h2 class="task-title">주어 → be 유무 → 의미 → 동사원형/V-ing</h2>${unit9ContextHtml()}<div class="rule-box"><strong>CH 2 · UNIT 2 핵심</strong><p>${item.rule}</p></div><p class="feedback ${unit9Session.firstAnswerCorrect && stable ? "ok" : "warn"}">${unit9Session.firstAnswerCorrect && stable ? "use의 세 형태를 안정적으로 구분했습니다." : "주어·be·의미 중 한 단계가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>`;
  setUnit9Primary(true, "원문 재도전");
}

function recordUnit9Item() {
  const item = currentUnit9Item();
  const retryCorrect = unit9Session.selectedAnswer === item.answer;
  const stable = unit9Session.evidence.subject && unit9Session.evidence.be && unit9Session.evidence.meaning && unit9Session.evidence.form;
  let status;
  if (unit9Session.firstAnswerCorrect && stable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";
  unit9Session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (unit9Session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `CH 2 · UNIT 2 · ${unit9Session.itemIndex + 1}번 ${status}`;
  saveStore();
  return status;
}

function nextUnit9OrFinish(status) {
  if (unit9Session.itemIndex < unit9Items.length - 1) {
    unit9Session.pendingNext = true;
    document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">문제 ${unit9Session.itemIndex + 1} 완료</p><h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2><div class="rule-box"><strong>상태</strong><p>${status}</p></div>`;
    setUnit9Primary(true, "다음 문제");
    return;
  }
  finishUnit9();
}

function advanceUnit9Item() {
  unit9Session.itemIndex += 1;
  unit9Session.stageIndex = 0;
  unit9Session.selectedAnswer = null;
  unit9Session.initialAnswer = null;
  unit9Session.firstAnswerCorrect = null;
  unit9Session.selectedSubject = null;
  unit9Session.selectedBe = null;
  unit9Session.selectedMeaning = null;
  unit9Session.selectedForm = null;
  unit9Session.evidence = { subject: null, be: null, meaning: null, form: null };
  unit9Session.pendingNext = false;
  renderUnit9Stage();
}

function finishUnit9() {
  const mastered = unit9Session.itemResults.filter(result => result.status === "MASTERED_NOW").length;
  const repaired = unit9Session.itemResults.filter(result => result.status === "REPAIRED").length;
  const unresolved = unit9Session.itemResults.filter(result => result.status === "UNRESOLVED").length;
  unit9Session.finished = true;
  store.unit9Runs = (store.unit9Runs || 0) + 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - unit9Session.startAt) / 60000));
  store.lastStatus = `CH 2 · UNIT 2 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...(store.completedUnits || []), 9])];
  saveStore();
  document.querySelector("#taskContent").innerHTML = `<p class="task-kicker">CH 2 · UNIT 2 완료</p><h2 class="task-title">${unit9Items.length}문항 판단 결과</h2><div class="metric-grid"><div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div></div>`;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unit9Items.length} / ${unit9Items.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setUnit9Primary(true, "학생 홈으로");
}

function handleUnit9Primary() {
  if (unit9Session.finished) return renderStudentHome();
  if (unit9Session.pendingNext) return advanceUnit9Item();
  const item = currentUnit9Item();
  const stage = currentUnit9Stage();
  if (stage === "answer") {
    unit9Session.initialAnswer = unit9Session.selectedAnswer;
    unit9Session.firstAnswerCorrect = unit9Session.selectedAnswer === item.answer;
  }
  if (stage === "subject") unit9Session.evidence.subject = unit9Session.selectedSubject === item.subjectTypeAnswer;
  if (stage === "be") unit9Session.evidence.be = unit9Session.selectedBe === item.beAnswer;
  if (stage === "meaning") unit9Session.evidence.meaning = unit9Session.selectedMeaning === item.meaningAnswer;
  if (stage === "form") unit9Session.evidence.form = unit9Session.selectedForm === item.formAnswer;
  if (stage === "retry") {
    const status = recordUnit9Item();
    return nextUnit9OrFinish(status);
  }
  unit9Session.stageIndex += 1;
  renderUnit9Stage();
}
