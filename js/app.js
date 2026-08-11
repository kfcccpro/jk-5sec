const STUDENT_PIN = "8081";
const ADMIN_PIN = "2007";
const STORAGE_KEY = "jk5sec_state_v1";

const demoItem = {
  id: "demo-finite-count-01",
  prompt: "A careful reader ___ the number of finite verbs before choosing the answer.",
  choices: ["checks", "checking"],
  answer: "checks",
  tokens: ["A", "careful", "reader", "checks", "the", "number", "of", "finite", "verbs", "before", "choosing", "the", "answer"],
  finiteVerbTokens: ["checks"],
  connectorTokens: [],
  slotType: "finite",
  rule: "접속사·관계사가 없으면 기본적으로 본동사 1개가 필요하다.",
  note: "이 문장은 교재 원문이 아닌 UI 검증용 데모 문장입니다."
};

const defaultStore = {
  currentUnit: 1,
  completedUnits: [],
  attempts: 0,
  correctFirst: 0,
  repaired: 0,
  unresolved: 0,
  lastStatus: "아직 학습 기록 없음",
  lastStudyAt: null,
  minutesToday: 0
};

let store = loadStore();
let role = null;
let learningState = freshLearningState();
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

function freshLearningState() {
  return {
    stages: ["answer", "verbs", "connectors", "slot", "rule", "retry"],
    stageIndex: 0,
    selectedAnswer: null,
    initialAnswer: null,
    selectedTokens: new Set(),
    selectedSlot: null,
    firstAnswerCorrect: null,
    startAt: Date.now()
  };
}

function shellHeader(title, badge) {
  return `
    <header class="topbar">
      <div><p class="eyebrow">JK English</p><h1>${title}</h1></div>
      <div class="header-actions">
        <span class="role-badge">${badge}</span>
        <button id="logoutBtn" class="header-button" type="button">나가기</button>
      </div>
    </header>`;
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
    </main>`;

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
  pin.addEventListener("keydown", e => { if (e.key === "Enter") attempt("student"); });
  setTimeout(() => pin.focus(), 50);
}

function renderStudentHome() {
  const accuracy = store.attempts ? Math.round((store.correctFirst / store.attempts) * 100) : 0;
  app.innerHTML = `
    <div class="screen">
      ${shellHeader("오늘 학습", "학생")}
      <main class="dashboard-grid">
        <section class="panel">
          <p class="eyebrow">CONTINUE</p><h2>PART 1 · 동사의 활용</h2>
          <p class="panel-copy">저자식 판단 순서대로 짧게 풀고, 틀린 근거만 바로 교정합니다.</p>
          <div class="unit-list">
            <button id="unit1Btn" class="unit-row active" type="button">
              <div><strong>CH 1 · UNIT 1</strong><br><span>접속사·관계사 + 1 = 동사 개수</span></div>
              <span class="status-pill ready">학습 가능</span>
            </button>
            <div class="unit-row"><div><strong>UNIT 2 이후</strong><br><span>교재 분석 후 순차 추가</span></div><span class="status-pill">준비 중</span></div>
          </div>
        </section>
        <aside class="panel">
          <p class="eyebrow">TODAY</p><h2>학습 상태</h2>
          <div class="metric-grid">
            <div class="metric"><span class="metric-label">최초 정답률</span><strong>${accuracy}%</strong></div>
            <div class="metric"><span class="metric-label">교정 성공</span><strong>${store.repaired}</strong></div>
            <div class="metric"><span class="metric-label">시도</span><strong>${store.attempts}</strong></div>
          </div>
          <div class="rule-box"><strong>최근 상태</strong><p>${store.lastStatus}</p></div>
        </aside>
      </main>
    </div>`;
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
          <p class="eyebrow">OVERVIEW</p><h2>학생 학습 현황</h2>
          <div class="metric-grid">
            <div class="metric"><span class="metric-label">전체 시도</span><strong>${store.attempts}</strong></div>
            <div class="metric"><span class="metric-label">최초 정답률</span><strong>${accuracy}%</strong></div>
            <div class="metric"><span class="metric-label">미해결</span><strong>${store.unresolved}</strong></div>
          </div>
          <div class="admin-list">
            <div class="admin-row"><strong>현재 진도</strong><span>PART 1 · CH 1 · UNIT ${store.currentUnit}</span></div>
            <div class="admin-row"><strong>최근 판정</strong><span>${store.lastStatus}</span></div>
            <div class="admin-row"><strong>교정 성공 횟수</strong><span>${store.repaired}</span></div>
            <div class="admin-row"><strong>오늘 기록 시간</strong><span>${store.minutesToday}분</span></div>
          </div>
        </section>
        <aside class="panel"><p class="eyebrow">SIMPLE ADMIN</p><h2>운영 원칙</h2><p class="panel-copy">관리자 화면은 진도·정확도·교정 상태 확인에 집중합니다. 복잡한 LMS 기능은 넣지 않습니다.</p><div class="rule-box"><strong>현재 콘텐츠</strong><p>UNIT 1 파일럿</p></div></aside>
      </main>
    </div>`;
  bindLogout();
}

function startLearning() {
  learningState = freshLearningState();
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
    </div>`;
  document.querySelector("#homeBtn").addEventListener("click", renderStudentHome);
  document.querySelector("#primaryAction").addEventListener("click", handlePrimary);
}

const labels = { answer: "문제 풀기", verbs: "본동사 찾기", connectors: "연결어 확인", slot: "자리 판단", rule: "5초 Rule", retry: "원문 재도전" };
const taskContent = () => document.querySelector("#taskContent");
const primaryAction = () => document.querySelector("#primaryAction");

function currentStage() { return learningState.stages[learningState.stageIndex]; }
function setPrimary(enabled, label = "다음") { primaryAction().disabled = !enabled; primaryAction().textContent = label; }
function updateProgress() {
  const step = learningState.stageIndex + 1;
  document.querySelector("#stageLabel").textContent = labels[currentStage()];
  document.querySelector("#progressText").textContent = `${step} / 6`;
  document.querySelector("#progressBar").style.width = `${(step / 6) * 100}%`;
}

function questionContext(showInitialChoice = true) {
  const choiceText = learningState.initialAnswer ? learningState.initialAnswer : "아직 선택하지 않음";
  return `
    <div class="question-context">
      <span class="context-label">문제 문장</span>
      <p class="context-sentence">${demoItem.prompt}</p>
      ${showInitialChoice ? `<p class="context-choice">처음 선택 <strong>${choiceText}</strong></p>` : ""}
    </div>`;
}

function renderLearningStage() {
  updateProgress();
  const stage = currentStage();
  if (stage === "answer") return renderAnswer(false);
  if (stage === "verbs") return renderTokenStage("verbs");
  if (stage === "connectors") return renderTokenStage("connectors");
  if (stage === "slot") return renderSlot();
  if (stage === "rule") return renderRule();
  if (stage === "retry") return renderAnswer(true);
}

function renderAnswer(isRetry) {
  learningState.selectedAnswer = null;
  setPrimary(false, isRetry ? "결과 보기" : "근거 확인");
  taskContent().innerHTML = `
    <p class="task-kicker">${isRetry ? "원문 재도전" : "Cold Attempt"}</p>
    <h2 class="task-title">${isRetry ? "같은 문장을 다시 판단하세요." : "설명 없이 먼저 답을 고르세요."}</h2>
    <p class="question">${demoItem.prompt}</p>
    <div class="choice-grid" id="choices"></div>
    ${isRetry ? "" : `<p class="task-copy">${demoItem.note}</p>`}`;
  const wrap = document.querySelector("#choices");
  demoItem.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.type = "button";
    btn.textContent = choice;
    btn.addEventListener("click", () => {
      learningState.selectedAnswer = choice;
      [...wrap.children].forEach(el => el.classList.toggle("selected", el === btn));
      setPrimary(true, isRetry ? "결과 보기" : "근거 확인");
    });
    wrap.appendChild(btn);
  });
}

function renderTokenStage(kind) {
  learningState.selectedTokens.clear();
  const isVerb = kind === "verbs";
  setPrimary(true, "판단 완료");
  taskContent().innerHTML = `
    <p class="task-kicker">${isVerb ? "STEP 2" : "STEP 3"}</p>
    <h2 class="task-title">${isVerb ? "본동사만 탭하세요." : "절을 추가하는 접속사·관계사만 탭하세요."}</h2>
    ${questionContext(true)}
    <p class="task-copy">없다고 판단하면 아무것도 누르지 않고 넘어갈 수 있습니다.</p>
    <div class="token-grid" id="tokenGrid"></div>`;
  const wrap = document.querySelector("#tokenGrid");
  demoItem.tokens.forEach((token, idx) => {
    const btn = document.createElement("button");
    btn.className = "token-btn";
    btn.type = "button";
    btn.textContent = token;
    btn.dataset.key = `${token}-${idx}`;
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      if (learningState.selectedTokens.has(key)) {
        learningState.selectedTokens.delete(key);
        btn.classList.remove("selected");
      } else {
        learningState.selectedTokens.add(key);
        btn.classList.add("selected");
      }
    });
    wrap.appendChild(btn);
  });
}

function renderSlot() {
  learningState.selectedSlot = null;
  setPrimary(false, "5초 Rule 보기");
  taskContent().innerHTML = `
    <p class="task-kicker">STEP 4</p>
    <h2 class="task-title">빈칸은 어떤 자리입니까?</h2>
    ${questionContext(true)}
    <p class="task-copy">동사 수와 연결어 수를 비교한 뒤 결정하세요.</p>
    <div class="choice-grid">
      <button class="evidence-choice" data-slot="finite" type="button">본동사 자리</button>
      <button class="evidence-choice" data-slot="nonfinite" type="button">준동사 자리</button>
    </div>`;
  document.querySelectorAll("[data-slot]").forEach(btn => btn.addEventListener("click", () => {
    learningState.selectedSlot = btn.dataset.slot;
    document.querySelectorAll("[data-slot]").forEach(el => el.classList.toggle("selected", el === btn));
    setPrimary(true, "5초 Rule 보기");
  }));
}

function renderRule() {
  const slotCorrect = learningState.selectedSlot === demoItem.slotType;
  taskContent().innerHTML = `
    <p class="task-kicker">5초 Rule</p>
    <h2 class="task-title">동사부터 센다.</h2>
    ${questionContext(true)}
    <div class="rule-box"><strong>UNIT 1 핵심</strong><p>${demoItem.rule}</p></div>
    <p class="feedback ${learningState.firstAnswerCorrect && slotCorrect ? "ok" : "warn"}">${learningState.firstAnswerCorrect && slotCorrect ? "정답과 자리 판단이 모두 안정적입니다." : "정답 또는 근거가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다."}</p>`;
  setPrimary(true, "원문 재도전");
}

function finishLearning() {
  const retryCorrect = learningState.selectedAnswer === demoItem.answer;
  const slotCorrect = learningState.selectedSlot === demoItem.slotType;
  let status;
  if (learningState.firstAnswerCorrect && slotCorrect && retryCorrect) status = "MASTERED_NOW";
  else if (retryCorrect) status = "REPAIRED";
  else status = "UNRESOLVED";

  store.attempts += 1;
  if (learningState.firstAnswerCorrect) store.correctFirst += 1;
  if (status === "REPAIRED") store.repaired += 1;
  if (status === "UNRESOLVED") store.unresolved += 1;
  store.lastStatus = status;
  store.lastStudyAt = new Date().toISOString();
  store.minutesToday += Math.max(1, Math.round((Date.now() - learningState.startAt) / 60000));
  if (status === "MASTERED_NOW" || status === "REPAIRED") store.completedUnits = [...new Set([...store.completedUnits, 1])];
  saveStore();

  taskContent().innerHTML = `
    <p class="task-kicker">학습 결과</p>
    <h2 class="task-title">${status === "UNRESOLVED" ? "한 번 더 교정이 필요합니다." : "오늘 판단을 정리했습니다."}</h2>
    <div class="rule-box"><strong>상태</strong><p>${status}</p></div>
    <p class="task-copy">기록은 이 기기의 관리자 화면에도 즉시 반영됩니다.</p>`;
  document.querySelector("#stageLabel").textContent = "완료";
  document.querySelector("#progressText").textContent = "6 / 6";
  document.querySelector("#progressBar").style.width = "100%";
  setPrimary(true, "학생 홈으로");
  primaryAction().onclick = renderStudentHome;
}

function handlePrimary() {
  const stage = currentStage();
  if (stage === "answer") {
    learningState.initialAnswer = learningState.selectedAnswer;
    learningState.firstAnswerCorrect = learningState.selectedAnswer === demoItem.answer;
  }
  if (stage === "retry") return finishLearning();
  learningState.stageIndex += 1;
  renderLearningStage();
}

renderLogin();
