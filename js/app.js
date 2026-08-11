const STUDENT_PIN = "8081";
const ADMIN_PIN = "2007";
const STORAGE_KEY = "jk5sec_state_v2";
const unitItems = Array.isArray(window.JK_UNIT1_ITEMS) ? window.JK_UNIT1_ITEMS : [];

const defaultStore = {
  currentUnit: 1,
  completedUnits: [],
  attempts: 0,
  correctFirst: 0,
  repaired: 0,
  unresolved: 0,
  lastStatus: "아직 학습 기록 없음",
  lastStudyAt: null,
  minutesToday: 0,
  unit1Runs: 0
};

let store = loadStore();
let role = null;
let session = freshSession();
const app = document.querySelector("#app");

function loadStore() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultStore, ...(parsed || {}) };
  } catch {
    return { ...defaultStore };
  }
}

function saveStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function freshSession() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ["answer", "verbs", "connectors", "slot", "rule", "retry"],
    selectedAnswer: null,
    selectedTokens: new Set(),
    selectedSlot: null,
    firstAnswerCorrect: null,
    evidence: { verbs: null, connectors: null, slot: null },
    itemResults: [],
    startAt: Date.now()
  };
}

function currentItem() {
  return unitItems[session.itemIndex];
}

function currentStage() {
  return session.stages[session.stageIndex];
}

function shellHeader(title, badge) {
  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">JK English</p>
        <h1>${title}</h1>
      </div>
      <div class="header-actions">
        <span class="role-badge">${badge}</span>
        <button id="logoutBtn" class="header-button" type="button">나가기</button>
      </div>
    </header>
  `;
}

function bindLogout() {
  document.querySelector("#logoutBtn")?.addEventListener("click", renderLogin);
}

function renderLogin() {
  role = null;
  app.innerHTML = `
    <main class="screen login-wrap">
      <section class="login-card">
        <p class="eyebrow">JK English</p>
        <h1>5초 영어어법</h1>
        <p class="login-copy">PIN만 입력하면 됩니다. 별도의 회원가입이나 계정 설정은 없습니다.</p>
        <input id="pinInput" class="pin-input" type="password" inputmode="numeric" maxlength="4" autocomplete="off" aria-label="PIN 입력" placeholder="PIN">
        <div class="login-actions">
          <button id="studentLogin" class="secondary-action" type="button">학생으로 시작</button>
          <button id="adminLogin" class="ghost-action" type="button">관리자</button>
        </div>
        <p id="loginError" class="login-error" aria-live="polite"></p>
      </section>
    </main>
  `;

  const pin = document.querySelector("#pinInput");
  const error = document.querySelector("#loginError");
  const attempt = nextRole => {
    const expected = nextRole === "student" ? STUDENT_PIN : ADMIN_PIN;
    if (pin.value !== expected) {
      error.textContent = "PIN이 맞지 않습니다.";
      pin.select();
      return;
    }
    role = nextRole;
    nextRole === "student" ? renderStudentHome() : renderAdminHome();
  };

  document.querySelector("#studentLogin").addEventListener("click", () => attempt("student"));
  document.querySelector("#adminLogin").addEventListener("click", () => attempt("admin"));
  pin.addEventListener("keydown", event => { if (event.key === "Enter") attempt("student"); });
  setTimeout(() => pin.focus(), 50);
}

function renderStudentHome() {
  const accuracy = store.attempts ? Math.round((store.correctFirst / store.attempts) * 100) : 0;
  app.innerHTML = `
    <div class="screen">
      ${shellHeader("오늘 학습", "학생")}
      <main class="dashboard-grid">
        <section class="panel">
          <p class="eyebrow">CONTINUE</p>
          <h2>PART 1 · 동사의 활용</h2>
          <p class="panel-copy">저자식 판단 순서대로 짧게 풀고, 틀린 근거만 바로 교정합니다.</p>
          <div class="unit-list">
            <button id="unit1Btn" class="unit-row active" type="button">
              <div><strong>CH 1 · UNIT 1</strong><br><span>접속사·관계사 + 1 = 동사 개수</span></div>
              <span class="status-pill ready">5문항</span>
            </button>
            <div class="unit-row">
              <div><strong>UNIT 2 이후</strong><br><span>교재 분석 후 순차 추가</span></div>
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
}

function renderAdminHome() {
  const accuracy = store.attempts ? Math.round((store.correctFirst / store.attempts) * 100) : 0;
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
            <div class="admin-row"><strong>현재 진도</strong><span>PART 1 · CH 1 · UNIT ${store.currentUnit}</span></div>
            <div class="admin-row"><strong>최근 판정</strong><span>${store.lastStatus}</span></div>
            <div class="admin-row"><strong>UNIT 1 완료 횟수</strong><span>${store.unit1Runs}</span></div>
            <div class="admin-row"><strong>오늘 기록 시간</strong><span>${store.minutesToday}분</span></div>
          </div>
        </section>
        <aside class="panel">
          <p class="eyebrow">SIMPLE ADMIN</p>
          <h2>운영 원칙</h2>
          <p class="panel-copy">진도·정확도·교정 상태만 확인합니다. 복잡한 LMS 기능은 넣지 않습니다.</p>
          <div class="rule-box"><strong>현재 콘텐츠</strong><p>UNIT 1 · 5문항 파일럿</p></div>
        </aside>
      </main>
    </div>
  `;
  bindLogout();
}

function startLearning() {
  if (!unitItems.length) {
    alert("UNIT 1 문항 데이터를 불러오지 못했습니다.");
    return;
  }
  session = freshSession();
  renderLearningShell();
  renderLearningStage();
}

function renderLearningShell() {
  app.innerHTML = `
    <div class="screen">
      <header class="topbar">
        <div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div>
        <div class="header-actions"><div class="unit-badge">PART 1 · CH 1 · UNIT 1</div><button id="homeBtn" class="header-button" type="button">홈</button></div>
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
  document.querySelector("#primaryAction").addEventListener("click", handlePrimary);
}

const labels = { answer: "문제 풀기", verbs: "본동사 찾기", connectors: "연결어 확인", slot: "자리 판단", rule: "5초 Rule", retry: "원문 재도전" };
const taskContent = () => document.querySelector("#taskContent");
const primaryAction = () => document.querySelector("#primaryAction");

function setPrimary(enabled, label = "다음") {
  primaryAction().disabled = !enabled;
  primaryAction().textContent = label;
}

function updateProgress() {
  const itemNo = session.itemIndex + 1;
  const stageNo = session.stageIndex + 1;
  document.querySelector("#stageLabel").textContent = `${labels[currentStage()]} · ${itemNo}번`;
  document.querySelector("#progressText").textContent = `${itemNo} / ${unitItems.length}`;
  const totalSteps = unitItems.length * 6;
  const completedSteps = session.itemIndex * 6 + stageNo;
  document.querySelector("#progressBar").style.width = `${(completedSteps / totalSteps) * 100}%`;
}

function contextHtml({ includeChoice = true } = {}) {
  const item = currentItem();
  return `
    <div class="question-context">
      <span class="context-label">문제 ${session.itemIndex + 1}</span>
      <p class="context-sentence">${item.prompt}</p>
      ${includeChoice && session.firstAnswerCorrect !== null ? `<p class="context-choice">처음 선택 <strong>${session.initialAnswer}</strong></p>` : ""}
    </div>
  `;
}

function renderLearningStage() {
  updateProgress();
  const stage = currentStage();
  if (stage === "answer") return renderAnswer(false);
  if (stage === "verbs") return renderTokenStage("verbs");
  if (stage === "connectors") return renderTokenStage("connectors");
  if (stage === "slot") return renderDecision();
  if (stage === "rule") return renderRule();
  if (stage === "retry") return renderAnswer(true);
}

function renderAnswer(isRetry) {
  const item = currentItem();
  session.selectedAnswer = null;
  setPrimary(false, isRetry ? "결과 보기" : "근거 확인");
  taskContent().innerHTML = `
    <p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p>
    <h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2>
    <p class="question">${item.prompt}</p>
    <div class="choice-grid" id="choices"></div>
  `;
  const wrap = document.querySelector("#choices");
  item.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.type = "button";
    btn.textContent = choice;
    btn.addEventListener("click", () => {
      session.selectedAnswer = choice;
      [...wrap.children].forEach(el => el.classList.toggle("selected", el === btn));
      setPrimary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(btn);
  });
}

function renderTokenStage(kind) {
  const item = currentItem();
  session.selectedTokens.clear();
  const isVerb = kind === "verbs";
  setPrimary(true, "판단 완료");
  taskContent().innerHTML = `
    <p class="task-kicker">${isVerb ? "STEP 2" : "STEP 3"}</p>
    <h2 class="task-title">${isVerb ? "본동사만 탭하세요." : "절을 추가하는 접속사·관계사만 탭하세요."}</h2>
    ${contextHtml()}
    <p class="task-copy">${!isVerb && item.omittedConnector ? "이 문장에는 생략된 관계사가 있을 수도 있습니다. 보이는 연결어만 확인한 뒤 넘어가세요." : "없다고 판단하면 아무것도 누르지 않고 넘어갈 수 있습니다."}</p>
    <div class="token-grid" id="tokenGrid"></div>
  `;
  const wrap = document.querySelector("#tokenGrid");
  item.tokens.forEach((token, idx) => {
    const btn = document.createElement("button");
    btn.className = "token-btn";
    btn.type = "button";
    btn.textContent = token;
    btn.dataset.index = String(idx);
    btn.addEventListener("click", () => {
      const key = Number(btn.dataset.index);
      if (session.selectedTokens.has(key)) {
        session.selectedTokens.delete(key);
        btn.classList.remove("selected");
      } else {
        session.selectedTokens.add(key);
        btn.classList.add("selected");
      }
    });
    wrap.appendChild(btn);
  });
}

function sameIndexSet(selected, expected) {
  const a = [...selected].sort((x, y) => x - y);
  const b = [...expected].sort((x, y) => x - y);
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function renderDecision() {
  const item = currentItem();
  session.selectedSlot = null;
  setPrimary(false, "5초 Rule 보기");
  taskContent().innerHTML = `
    <p class="task-kicker">STEP 4</p>
    <h2 class="task-title">빈칸의 역할을 결정하세요.</h2>
    ${contextHtml()}
    <p class="task-copy">앞에서 확인한 동사 수와 연결 구조를 근거로 판단합니다.</p>
    <div class="choice-grid" id="decisionChoices"></div>
  `;
  const wrap = document.querySelector("#decisionChoices");
  item.decisionOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "evidence-choice";
    btn.type = "button";
    btn.textContent = option.label;
    btn.dataset.value = option.value;
    btn.addEventListener("click", () => {
      session.selectedSlot = option.value;
      [...wrap.children].forEach(el => el.classList.toggle("selected", el === btn));
      setPrimary(true, "5초 Rule 보기");
    });
    wrap.appendChild(btn);
  });
}

function renderRule() {
  const item = currentItem();
  const evidenceStable = session.evidence.verbs && session.evidence.connectors && session.evidence.slot;
  taskContent().innerHTML = `
    <p class="task-kicker">5초 Rule</p>
    <h2 class="task-title">동사 수와 연결 구조부터 본다.</h2>
    ${contextHtml()}
    <div class="rule-box"><strong>UNIT 1 핵심</strong><p>${item.rule}</p></div>
    <p class="feedback ${session.firstAnswerCorrect && evidenceStable ? "ok" : "warn"}">
      ${session.firstAnswerCorrect && evidenceStable ? "정답과 근거 판단이 모두 안정적입니다." : "정답 또는 근거가 흔들렸습니다. 표시 없이 같은 문제를 다시 풉니다."}
    </p>
  `;
  setPrimary(true, "원문 재도전");
}

function recordCurrentItem() {
  const item = currentItem();
  const retryCorrect = session.selectedAnswer === item.answer;
  const evidenceStable = session.evidence.verbs && session.evidence.connectors && session.evidence.slot;
  let status;
  if (session.firstAnswerCorrect && evidenceStable && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";

  session.itemResults.push({ id: item.id, status, errorCode: item.errorCode });
  store.attempts += 1;
  if (session.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = `${session.itemIndex + 1}번 ${status}`;
  store.lastStudyAt = new Date().toISOString();
  saveStore();
  return status;
}

function nextItemOrFinish(status) {
  if (session.itemIndex < unitItems.length - 1) {
    taskContent().innerHTML = `
      <p class="task-kicker">문제 ${session.itemIndex + 1} 완료</p>
      <h2 class="task-title">${status === "UNRESOLVED" ? "복습 대상으로 저장했습니다." : "판단을 정리했습니다."}</h2>
      <div class="rule-box"><strong>상태</strong><p>${status}</p></div>
      <p class="task-copy">다음 문제에서도 같은 방식으로 먼저 답을 고른 뒤 근거를 확인합니다.</p>
    `;
    setPrimary(true, "다음 문제");
    primaryAction().onclick = () => {
      session.itemIndex += 1;
      session.stageIndex = 0;
      session.selectedAnswer = null;
      session.selectedTokens.clear();
      session.selectedSlot = null;
      session.firstAnswerCorrect = null;
      session.initialAnswer = null;
      session.evidence = { verbs: null, connectors: null, slot: null };
      primaryAction().onclick = handlePrimary;
      renderLearningStage();
    };
    return;
  }
  finishUnit();
}

function finishUnit() {
  const mastered = session.itemResults.filter(r => r.status === "MASTERED_NOW").length;
  const repaired = session.itemResults.filter(r => r.status === "REPAIRED").length;
  const unresolved = session.itemResults.filter(r => r.status === "UNRESOLVED").length;
  store.unit1Runs += 1;
  store.minutesToday += Math.max(1, Math.round((Date.now() - session.startAt) / 60000));
  store.lastStatus = `UNIT 1 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;
  if (!unresolved) store.completedUnits = [...new Set([...store.completedUnits, 1])];
  saveStore();

  taskContent().innerHTML = `
    <p class="task-kicker">UNIT 1 완료</p>
    <h2 class="task-title">5문항 판단 결과</h2>
    <div class="metric-grid">
      <div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div>
      <div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div>
      <div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div>
    </div>
    <div class="rule-box"><strong>다음 학습</strong><p>${unresolved ? "미해결 문항은 이후 예약 복습 대상으로 넘깁니다." : "UNIT 1의 핵심 판단은 현재 안정적입니다."}</p></div>
  `;
  document.querySelector("#stageLabel").textContent = "UNIT 완료";
  document.querySelector("#progressText").textContent = `${unitItems.length} / ${unitItems.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  setPrimary(true, "학생 홈으로");
  primaryAction().onclick = renderStudentHome;
}

function handlePrimary() {
  const item = currentItem();
  const stage = currentStage();

  if (stage === "answer") {
    session.initialAnswer = session.selectedAnswer;
    session.firstAnswerCorrect = session.selectedAnswer === item.answer;
  }

  if (stage === "verbs") {
    session.evidence.verbs = sameIndexSet(session.selectedTokens, item.finiteVerbIndices);
  }

  if (stage === "connectors") {
    session.evidence.connectors = sameIndexSet(session.selectedTokens, item.connectorIndices);
  }

  if (stage === "slot") {
    session.evidence.slot = session.selectedSlot === item.decisionAnswer;
  }

  if (stage === "retry") {
    const status = recordCurrentItem();
    return nextItemOrFinish(status);
  }

  session.stageIndex += 1;
  renderLearningStage();
}

renderLogin();
