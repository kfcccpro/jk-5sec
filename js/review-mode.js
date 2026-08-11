(() => {
  const params = new URLSearchParams(location.search);
  const shouldReview = params.get("review") === "1" || location.hash === "#review";

  function reviewHeader() {
    return `
      <div class="review-header">
        <div>
          <p class="eyebrow">JK 5SEC · UI REVIEW</p>
          <h1>검수 모드</h1>
          <p class="review-lead">진도·채점·정답 여부와 무관하게 전체 콘텐츠 구조와 화면 형태를 빠르게 검수합니다.</p>
        </div>
        <button id="reviewExit" class="review-exit" type="button">일반 화면</button>
      </div>
    `;
  }

  const samples = {
    login: () => `
      <div class="review-screen-note">로그인 화면 · PIN 입력과 진입 버튼의 비율, 카드 폭, 여백, 태블릿/PC 시인성을 확인합니다.</div>
      <main class="login-wrap" style="min-height:610px;">
        <section class="login-card">
          <p class="eyebrow">JK English</p>
          <h1>5초 영어어법</h1>
          <p class="login-copy">PIN만 입력하면 됩니다. 별도의 회원가입이나 계정 설정은 없습니다.</p>
          <input class="pin-input" value="8081" aria-label="검수용 PIN" readonly>
          <div class="login-actions">
            <button class="secondary-action" type="button">학생으로 시작</button>
            <button class="ghost-action" type="button">관리자</button>
          </div>
        </section>
      </main>
    `,
    home: () => `
      <div class="review-screen-note">학생 홈 · 실제 진도 데이터 대신 전체 콘텐츠 구조와 탐색 계층만 표시합니다.</div>
      <div class="review-preview-topbar">
        <div><p class="eyebrow">JK English</p><h1>오늘 학습</h1></div>
        <span class="role-badge">학생</span>
      </div>
      <main class="dashboard-grid">
        <section class="panel">
          <p class="eyebrow">CONTENT MAP</p>
          <h2>교재 학습 구조</h2>
          <p class="panel-copy">PART → CHAPTER → UNIT 순서와 각 UNIT의 저자식 판단법이 한눈에 보이도록 구성합니다.</p>
          <div class="review-content-map">
            <div class="review-part-card">
              <strong>PART 1 · 동사의 활용</strong>
              <div class="review-chapter-card">
                <strong>CHAPTER 1 · 본동사 & 준동사</strong>
                <div class="review-unit-grid">
                  <div class="review-unit-card"><b>UNIT 1</b><span>접속사·관계사 + 1 = 동사 개수</span></div>
                  <div class="review-unit-card"><b>UNIT 2</b><span>~ing / ~ed · 목적어로 능동·수동 판단</span></div>
                  <div class="review-unit-card"><b>UNIT 3</b><span>p.p. / be + p.p. · 자리와 수동 형태 판단</span></div>
                </div>
              </div>
              <div class="review-chapter-card">
                <strong>다음 CHAPTER / UNIT</strong>
                <div class="review-placeholder-line mid"></div>
                <div class="review-placeholder-line short"></div>
              </div>
            </div>
          </div>
        </section>
        <aside class="panel">
          <p class="eyebrow">OVERVIEW</p>
          <h2>검수 포인트</h2>
          <div class="rule-box"><strong>구조</strong><p>교재의 저자식 판단 순서가 UNIT별로 분명한가?</p></div>
          <div class="rule-box"><strong>시인성</strong><p>패드·태블릿·PC에서 문장과 선택지가 충분히 큰가?</p></div>
          <div class="rule-box"><strong>단순성</strong><p>한 화면 한 과제 원칙이 유지되는가?</p></div>
        </aside>
      </main>
    `,
    question: () => `
      <div class="review-screen-note">문제 화면 · 실제 채점과 무관한 대표 문장으로 문제/선택지/하단 버튼 배치를 검수합니다.</div>
      <div class="review-preview-topbar">
        <div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div>
        <div class="unit-badge">PART 1 · CH 1 · UNIT 2</div>
      </div>
      <main class="learning-wrap">
        <section class="progress-wrap">
          <div class="progress-meta"><span>문제 풀기 · 대표 화면</span><span>UI 검수</span></div>
          <div class="progress-track"><div class="progress-bar" style="width:35%"></div></div>
        </section>
        <section class="task-card">
          <div id="taskContent">
            <p class="task-kicker">Cold Attempt</p>
            <h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2>
            <p class="question">The report ___ by the committee contains several important recommendations.</p>
            <div class="choice-grid">
              <button class="choice selected" type="button">prepared</button>
              <button class="choice" type="button">preparing</button>
            </div>
          </div>
        </section>
        <div class="action-zone"><button class="primary-action" type="button">근거 확인</button></div>
      </main>
    `,
    evidence: () => `
      <div class="review-screen-note">근거 판단 화면 · 원문이 사라지지 않고 현재 판단 과제가 명확한지 검수합니다.</div>
      <div class="review-preview-topbar">
        <div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div>
        <div class="unit-badge">PART 1 · CH 1 · UNIT 2</div>
      </div>
      <main class="learning-wrap">
        <section class="progress-wrap">
          <div class="progress-meta"><span>목적어 확인 · 대표 화면</span><span>UI 검수</span></div>
          <div class="progress-track"><div class="progress-bar" style="width:58%"></div></div>
        </section>
        <section class="task-card">
          <div id="taskContent">
            <p class="task-kicker">STEP 3</p>
            <h2 class="task-title">빈칸 뒤에 목적어가 있습니까?</h2>
            <div class="question-context">
              <span class="context-label">문제 원문</span>
              <p class="context-sentence">The new device saves energy, ___ operating costs for small businesses.</p>
              <p class="context-choice">처음 선택 <strong>reducing</strong></p>
            </div>
            <p class="task-copy">저자식 자·타 판단의 핵심입니다. 전치사구나 부사는 목적어로 세지 않습니다.</p>
            <div class="choice-grid">
              <button class="evidence-choice selected" type="button">목적어 있음</button>
              <button class="evidence-choice" type="button">목적어 없음</button>
            </div>
          </div>
        </section>
        <div class="action-zone"><button class="primary-action" type="button">다음</button></div>
      </main>
    `,
    rule: () => `
      <div class="review-screen-note">5초 Rule 화면 · 설명은 짧고 직접적이어야 하며 원문과 규칙이 동시에 보이는지 확인합니다.</div>
      <div class="review-preview-topbar">
        <div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div>
        <div class="unit-badge">PART 1 · CH 1 · UNIT 3</div>
      </div>
      <main class="learning-wrap">
        <section class="task-card">
          <div id="taskContent">
            <p class="task-kicker">5초 Rule</p>
            <h2 class="task-title">자리 → 목적어 → 형태</h2>
            <div class="question-context">
              <span class="context-label">문제 원문</span>
              <p class="context-sentence">The documents ___ by the research team contain the final results.</p>
              <p class="context-choice">처음 선택 <strong>prepared</strong></p>
            </div>
            <div class="rule-box"><strong>UNIT 핵심</strong><p>이미 본동사가 있으면 빈칸은 준동사 자리다. 수동 의미의 준동사는 p.p.만 사용한다.</p></div>
            <p class="feedback ok">정답과 판단 근거가 모두 안정적입니다.</p>
          </div>
        </section>
        <div class="action-zone"><button class="primary-action" type="button">원문 재도전</button></div>
      </main>
    `,
    admin: () => `
      <div class="review-screen-note">관리자 화면 · 실제 점수 대신 정보 구조와 카드 밀도만 검수합니다.</div>
      <div class="review-preview-topbar">
        <div><p class="eyebrow">JK English</p><h1>학습 관리</h1></div>
        <span class="role-badge">관리자</span>
      </div>
      <main class="dashboard-grid">
        <section class="panel">
          <p class="eyebrow">OVERVIEW</p>
          <h2>학습 현황 구조</h2>
          <div class="metric-grid">
            <div class="metric"><span class="metric-label">진행 단위</span><strong>UNIT</strong></div>
            <div class="metric"><span class="metric-label">판단 축</span><strong>6</strong></div>
            <div class="metric"><span class="metric-label">복습</span><strong>D+1</strong></div>
          </div>
          <div class="review-admin-card-grid">
            <div class="review-admin-card"><strong>진도 영역</strong><div class="review-placeholder-line"></div><div class="review-placeholder-line mid"></div></div>
            <div class="review-admin-card"><strong>취약 판단 Rule</strong><div class="review-placeholder-line"></div><div class="review-placeholder-line short"></div></div>
            <div class="review-admin-card"><strong>복습 예약</strong><div class="review-placeholder-line mid"></div><div class="review-placeholder-line"></div></div>
            <div class="review-admin-card"><strong>기기/학습 상태</strong><div class="review-placeholder-line"></div><div class="review-placeholder-line mid"></div></div>
          </div>
        </section>
        <aside class="panel">
          <p class="eyebrow">SIMPLE ADMIN</p>
          <h2>최소 정보만</h2>
          <p class="panel-copy">관리자는 진도, 반복 오류, 복습 예정, 학습 시간 정도만 빠르게 확인하는 구조를 유지합니다.</p>
          <div class="rule-box"><strong>원칙</strong><p>복잡한 LMS가 아니라 1인 학습자 관리용 화면입니다.</p></div>
        </aside>
      </main>
    `
  };

  let currentView = "home";
  let currentWidth = "1024";

  function renderReviewMode() {
    document.body.classList.add("review-mode");
    app.className = "review-app-shell";
    app.innerHTML = `
      <main class="review-shell">
        ${reviewHeader()}
        <section class="review-toolbar">
          <div class="review-control-row" id="viewControls">
            <span class="review-control-label">화면</span>
            ${[
              ["login","로그인"], ["home","학생 홈"], ["question","문제"], ["evidence","근거 판단"], ["rule","5초 Rule"], ["admin","관리자"]
            ].map(([value,label]) => `<button class="review-chip ${value===currentView?"active":""}" data-view="${value}" type="button">${label}</button>`).join("")}
          </div>
          <div class="review-control-row" id="widthControls">
            <span class="review-control-label">기기 폭</span>
            ${[["768","iPad 세로"],["1024","태블릿"],["1366","노트북"],["1440","PC"]].map(([value,label]) => `<button class="review-chip ${value===currentWidth?"active":""}" data-width="${value}" type="button">${label}</button>`).join("")}
          </div>
        </section>
        <section class="review-stage">
          <div id="reviewViewport" class="review-viewport" style="max-width:${currentWidth}px">
            <div id="reviewViewportInner" class="review-viewport-inner"></div>
          </div>
        </section>
      </main>
    `;

    document.querySelector("#reviewExit").addEventListener("click", () => {
      history.replaceState(null, "", location.pathname);
      location.reload();
    });

    document.querySelectorAll("[data-view]").forEach(btn => btn.addEventListener("click", () => {
      currentView = btn.dataset.view;
      renderReviewMode();
    }));

    document.querySelectorAll("[data-width]").forEach(btn => btn.addEventListener("click", () => {
      currentWidth = btn.dataset.width;
      document.querySelectorAll("[data-width]").forEach(el => el.classList.toggle("active", el === btn));
      document.querySelector("#reviewViewport").style.maxWidth = `${currentWidth}px`;
    }));

    document.querySelector("#reviewViewportInner").innerHTML = samples[currentView]();
  }

  function addReviewEntryToLogin() {
    const loginCard = document.querySelector(".login-card");
    if (!loginCard || document.querySelector("#reviewEntry")) return;
    const btn = document.createElement("button");
    btn.id = "reviewEntry";
    btn.className = "review-entry-button";
    btn.type = "button";
    btn.textContent = "UI 검수 모드";
    btn.addEventListener("click", () => {
      history.replaceState(null, "", `${location.pathname}?review=1`);
      renderReviewMode();
    });
    loginCard.appendChild(btn);
  }

  if (shouldReview) {
    setTimeout(renderReviewMode, 0);
  } else {
    setTimeout(addReviewEntryToLogin, 120);
  }
})();
