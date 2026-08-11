const unit2Items = Array.isArray(window.JK_UNIT2_ITEMS) ? window.JK_UNIT2_ITEMS : [];
let unit2Session = null;

const originalRenderStudentHome = renderStudentHome;
const originalRenderAdminHome = renderAdminHome;

renderStudentHome = function () {
  const accuracy = store.attempts ? Math.round((store.correctFirst / store.attempts) * 100) : 0;
  app.innerHTML = `
    <div class="screen">
      ${shellHeader("오늘 학습", "학생")}
      <main class="dashboard-grid">
        <section class="panel">
          <p class="eyebrow">CONTINUE</p>
          <h2>PART 1 · 동사의 활용</h2>
          <p class="panel-copy">교재의 저자식 판단 순서를 짧은 클릭 행동으로 반복합니다.</p>
          <div class="unit-list">
            <button id="unit1Btn" class="unit-row active" type="button">
              <div><strong>CH 1 · UNIT 1</strong><br><span>접속사·관계사 + 1 = 동사 개수</span></div>
              <span class="status-pill ready">5문항</span>
            </button>
            <button id="unit2Btn" class="unit-row active" type="button">
              <div><strong>CH 1 · UNIT 2</strong><br><span>~ing / ~ed · 목적어로 능동·수동 판단</span></div>
              <span class="status-pill ready">5문항</span>
            </button>
            <div class="unit-row">
              <div><strong>UNIT 3 이후</strong><br><span>교재 순서대로 단계별 추가</span></div>
              <span class="status-pill">준비 중</span>
            </div>
          </div>
        </section>
        <aside class="panel">
          <p class="eyebrow">TODAY</p>
          <h2>학습 상태</h2>
          <div class="metric-grid">
            <div class="metric"><span class="metric-label">최초 정답률</span><strong>${accuracy}%</strong></div>
            <div class="metric"><span class="metric-label">교정 성공</span><strong>${store.repaired}</strong></div>
            <div class="metric"><span class="metric-label">시도</span><strong>${store.attempts}</strong></div>
          </div>
          <div class="rule-box"><strong>최근 상태</strong><p>${store.lastStatus}</p></div>
        </aside>
      </main>
    </div>
  `;
  bindLogout();
  document.querySelector("#unit1Btn").addEventListener("click", startLearning);
  document.querySelector("#unit2Btn").addEventListener("click", startUnit2);
};

renderAdminHome = function () {
  const accuracy = store.attempts ? Math.round((store.correctFirst / store.attempts) * 100) : 0;
  const unit2Runs = store.unit2Runs || 0;
  app.innerHTML = `
    <div class="screen">
      ${shellHeader("학습 관리", "관리자")}
      <main class="dashboard-grid">
        <section class="panel">
          <p class="eyebrow">OVERVIEW</p>
          <h2>학생 학습 현황</h2>
          <div class="metric-grid">
            <div class="metric"><span class="metric-label">전체 문항 시도</span><strong>${store.attempts}</strong></div>
            <div class="metric"><span class="metric-label">최초 정답률</span><strong>${accuracy}%</strong></div>
            <div class="metric"><span class="metric-label">미해결</span><strong>${store.unresolved}</strong></div>
          </div>
          <div class="admin-list">
            <div class="admin-row"><strong>최근 판정</strong><span>${store.lastStatus}</span></div>
            <div class="admin-row"><strong>UNIT 1 완료 횟수</strong><span>${store.unit1Runs || 0}</span></div>
            <div class="admin-row"><strong>UNIT 2 완료 횟수</strong><span>${unit2Runs}</span></div>
            <div class="admin-row"><strong>오늘 기록 시간</strong><span>${store.minutesToday}분</span></div>
          </div>
        </section>
        <aside class="panel">
          <p class="eyebrow">SIMPLE ADMIN</p>
          <h2>현재 콘텐츠</h2>
          <p class="panel-copy">PART 1 · CHAPTER 1의 UNIT 1~2 파일럿을 사용할 수 있습니다.</p>
          <div class="rule-box"><strong>운영 원칙</strong><p>진도·정확도·교정 상태만 간단히 확인합니다.</p></div>
        </aside>
      </main>
    </div>
  `;
  bindLogout();
};

function freshUnit2Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "position", "object", "voice", "rule", "retry"],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedPosition: null,
    selectedObject: null,
    selectedVoice: null,
    evidence: { position: null, object: null, voice: null },
    itemResults: [],
    startAt: Date.now()
  };
}

function currentUnit2Item() {
  return unit2Items[unit2Session.itemIndex];
}

function currentUnit2Stage() {
  return unit2Session.stages[unit2Session.stageIndex];
}

function startUnit2() {
  if (!unit2Items.length) {
    alert("UNIT 2 문항 데이터를 불러오지 못했습니다.");
    return;
  }
  store.currentUnit = 2;
  saveStore();
  unit2Session = freshUnit2Session();
  renderUnit2Shell();
  renderUnit2Stage();
}

function renderUnit2Shell() {
  app.innerHTML = `
    <div class="screen">
      <header class="topbar">
        <div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div>
        <div class="header-actions"><div class="unit-badge">PART 1 · CH 1 · UNIT 2</div><button id="homeBtn" class="header-button" type="button">홈</button></div>
      </header>
      <main class="learning-wrap">
        <section class="progress-wrap" aria-label="학습 진행률">
          <div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div>
          <div class="progress-track"><div id="progressBar" class="progress-bar"></div></div>
        </section>
        <section class="task-card" aria-live="polite"><div id="taskContent"></div></section>
        <div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div>
      </main>
    </div>
  `;
  document.querySelector("#homeBtn").addEventListener("click", renderStudentHome);
  document.querySelector("#primaryAction").addEventListener("click", handleUnit2Primary);
}

const unit2Labels = {
  answer: "문제 풀기",
  position: "자리 판단",
  object: "목적어 확인",
  voice: "능동·수동 판단",
  rule: "5초 Rule",
  retry: "원문 재도전"
};

function setUnit2Primary(enabled, label = "다음") {
  const btn = document.querySelector("#primaryAction");
  btn.disabled = !enabled;
  btn.textContent = label;
}

function updateUnit2Progress() {
  const itemNo = unit2Session.itemIndex + 1;
  const stageNo = unit2Session.stageIndex + 1;
  document.querySelector("#stageLabel").textContent = `${unit2Labels[currentUnit2Stage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unit2Items.length}`;
  const totalSteps = unit2Items.length * 6;
  const completedSteps = unit2Session.itemIndex * 6 + stageNo;
  document.querySelector("#progressBar").style.width = `${(completedSteps / totalSteps) * 100}%`;
}

function unit2ContextHtml() {
  const item = currentUnit2Item();
  return `
    <div class="question-context">
      <span class="context-label">문제 ${unit2Session.itemIndex + 1}</span>
      <p class="context-sentence">${item.prompt}</p>
      ${unit2Session.initialAnswer ? `<p class="context-choice">처음 선택 <strong>${unit2Session.initialAnswer}</strong></p>` : ""}
    </div>
  `;
}

function renderUnit2Stage() {
  updateUnit2Progress();
  const stage = currentUnit2Stage();
  if (stage === "answer") return renderUnit2Answer(false);
  if (stage === "position") return renderUnit2Position();
  if (stage === "object") return renderUnit2Object();
  if (stage === "voice") return renderUnit2Voice();
  if (stage === "rule") return renderUnit2Rule();
  if (stage === "retry") return renderUnit2Answer(true);
}

function renderUnit2Answer(isRetry) {
  const item = currentUnit2Item();
  unit2Session.selectedAnswer = null;
  setUnit2Primary(false, isRetry ? "결과 보기" : "근거 확인");
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p>
    <h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2>
    <p class="question">${item.prompt}</p>
    <div class="choice-grid" id="unit2Choices"></div>
  `;
  const wrap = document.querySelector("#unit2Choices");
  item.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice";
    btn.textContent = choice;
    btn.addEventListener("click", () => {
      unit2Session.selectedAnswer = choice;
      [...wrap.children].forEach(el => el.classList.toggle("selected", el === btn));
      setUnit2Primary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(btn);
  });
}

function renderUnit2Position() {
  unit2Session.selectedPosition = null;
  setUnit2Primary(false, "다음");
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">STEP 2</p>
    <h2 class="task-title">먼저 자리부터 판단하세요.</h2>
    ${unit2ContextHtml()}
    <div class="choice-grid" id="positionChoices">
      <button class="evidence-choice" type="button" data-value="finite">본동사 자리</button>
      <button class="evidence-choice" type="button" data-value="nonfinite">준동사 자리</button>
    </div>
  `;
  bindUnit2EvidenceChoice("positionChoices", value => { unit2Session.selectedPosition = value; });
}

function renderUnit2Object() {
  unit2Session.selectedObject = null;
  setUnit2Primary(false, "다음");
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">STEP 3</p>
    <h2 class="task-title">빈칸 뒤에 목적어가 있습니까?</h2>
    ${unit2ContextHtml()}
    <p class="task-copy">저자식 자·타 판단의 핵심입니다. 전치사구나 부사는 목적어로 세지 않습니다.</p>
    <div class="choice-grid" id="objectChoices">
      <button class="evidence-choice" type="button" data-value="yes">목적어 있음</button>
      <button class="evidence-choice" type="button" data-value="no">목적어 없음</button>
    </div>
  `;
  bindUnit2EvidenceChoice("objectChoices", value => { unit2Session.selectedObject = value; });
}

function renderUnit2Voice() {
  unit2Session.selectedVoice = null;
  setUnit2Primary(false, "5초 Rule 보기");
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">STEP 4</p>
    <h2 class="task-title">능동입니까, 수동입니까?</h2>
    ${unit2ContextHtml()}
    <div class="choice-grid" id="voiceChoices">
      <button class="evidence-choice" type="button" data-value="active">능동 → V-ing</button>
      <button class="evidence-choice" type="button" data-value="passive">수동 → p.p.</button>
    </div>
  `;
  bindUnit2EvidenceChoice("voiceChoices", value => { unit2Session.selectedVoice = value; }, "5초 Rule 보기");
}

function bindUnit2EvidenceChoice(containerId, setter, nextLabel = "다음") {
  const wrap = document.querySelector(`#${containerId}`);
  [...wrap.children].forEach(btn => {
    btn.addEventListener("click", () => {
      setter(btn.dataset.value);
      [...wrap.children].forEach(el => el.classList.toggle("selected", el === btn));
      setUnit2Primary(true, nextLabel);
    });
  });
}

function renderUnit2Rule() {
  const item = currentUnit2Item();
  const stable = unit2Session.evidence.position && unit2Session.evidence.object && unit2Session.evidence.voice;
  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">5초 Rule</p>
    <h2 class="task-title">자리 → 목적어 → 능동·수동</h2>
    ${unit2ContextHtml()}
    <div class="rule-box"><strong>UNIT 2 핵심</strong><p>${item.rule}</p></div>
    <p class="feedback ${unit2Session.firstAnswerCorrect && stable ? "ok" : "warn"}">
      ${unit2Session.firstAnswerCorrect && stable ? "정답과 판단 근거가 모두 안정적입니다." : "정답 또는 근거가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}
    </p>
  `;
  setUnit2Primary(true, "원문 재도전");
}

function recordUnit2Item() {
  const item = currentUnit2Item();
  const retryCorrect = unit2Session.selectedAnswer === item.answer;
  const stable = unit2Session.evidence.position && unit2Session.evidence.object && unit2Session.evidence.voice;
  let status;
  if (unit2Session.firstAnswerCorrect && stable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";

  unit2Session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (unit2Session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `UNIT 2 · ${unit2Session.itemIndex + 1}번 ${status}`;
  store.lastStudyAt = new Date().toISOString();
  saveStore();
  return status;
}

function nextUnit2ItemOrFinish(status) {
  if (unit2Session.itemIndex < unit2Items.length - 1) {
    document.querySelector("#taskContent").innerHTML = `
      <p class="task-kicker">문제 ${unit2Session.itemIndex + 1} 완료</p>
      <h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2>
      <div class="rule-box"><strong>상태</strong><p>${status}</p></div>
    `;
    setUnit2Primary(true, "다음 문제");
    document.querySelector("#primaryAction").onclick = () => {
      unit2Session.itemIndex += 1;
      unit2Session.stageIndex = 0;
      unit2Session.selectedAnswer = null;
      unit2Session.initialAnswer = null;
      unit2Session.firstAnswerCorrect = null;
      unit2Session.selectedPosition = null;
      unit2Session.selectedObject = null;
      unit2Session.selectedVoice = null;
      unit2Session.evidence = { position: null, object: null, voice: null };
      document.querySelector("#primaryAction").onclick = handleUnit2Primary;
      renderUnit2Stage();
    };
    return;
  }
  finishUnit2();
}

function finishUnit2() {
  const mastered = unit2Session.itemResults.filter(r => r.status === "MASTERED_NOW").length;
  const repaired = unit2Session.itemResults.filter(r => r.status === "REPAIRED").length;
  const unresolved = unit2Session.itemResults.filter(r => r.status === "UNRESOLVED").length;
  store.unit2Runs = (store.unit2Runs || 0) + 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - unit2Session.startAt) / 60000));
  store.lastStatus = `UNIT 2 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...(store.completedUnits || []), 2])];
  saveStore();

  document.querySelector("#taskContent").innerHTML = `
    <p class="task-kicker">UNIT 2 완료</p>
    <h2 class="task-title">5문항 판단 결과</h2>
    <div class="metric-grid">
      <div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div>
      <div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div>
      <div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div>
    </div>
    <div class="rule-box"><strong>UNIT 2 판단식</strong><p>준동사 자리 확인 → 목적어 유무 → 능동 V-ing / 수동 p.p.</p></div>
  `;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unit2Items.length} / ${unit2Items.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setUnit2Primary(true, "학생 홈으로");
  document.querySelector("#primaryAction").onclick = renderStudentHome;
}

function handleUnit2Primary() {
  const item = currentUnit2Item();
  const stage = currentUnit2Stage();

  if (stage === "answer") {
    unit2Session.initialAnswer = unit2Session.selectedAnswer;
    unit2Session.firstAnswerCorrect = unit2Session.selectedAnswer === item.answer;
  }
  if (stage === "position") unit2Session.evidence.position = unit2Session.selectedPosition === item.positionAnswer;
  if (stage === "object") unit2Session.evidence.object = unit2Session.selectedObject === item.objectAnswer;
  if (stage === "voice") unit2Session.evidence.voice = unit2Session.selectedVoice === item.voiceAnswer;
  if (stage === "retry") {
    const status = recordUnit2Item();
    return nextUnit2ItemOrFinish(status);
  }

  unit2Session.stageIndex += 1;
  renderUnit2Stage();
}
