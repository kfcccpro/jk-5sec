(() => {
  const params = new URLSearchParams(location.search);
  const shouldReview = params.get("review") === "1" || location.hash === "#review";
  const courseMap = window.JK_COURSE_MAP || { parts: [] };

  let currentView = "overview";
  let currentWidth = "1024";

  const widthPresets = [
    ["768", "iPad 세로"],
    ["1024", "태블릿"],
    ["1180", "태블릿 가로"],
    ["1366", "노트북"],
    ["1440", "PC"]
  ];

  const viewPresets = [
    ["overview", "전체 구조"],
    ["journey", "학습 흐름"],
    ["home", "학생 홈"],
    ["question", "문제"],
    ["evidence", "근거 판단"],
    ["rule", "5초 Rule"],
    ["result", "학습 결과"],
    ["admin", "관리자"],
    ["maintenance", "유지보수"]
  ];

  function reviewHeader() {
    return `
      <div class="review-header">
        <div>
          <p class="eyebrow">JK 5SEC · PRODUCT REVIEW</p>
          <h1>검수 모드</h1>
          <p class="review-lead">문제 정답·점수·진도와 분리해 교재 구조, 학습 흐름, 화면 밀도, 관리자 구조, 유지보수 방식을 한 번에 검수합니다.</p>
        </div>
        <button id="reviewExit" class="review-exit" type="button">일반 화면</button>
      </div>
    `;
  }

  function partSummary(part) {
    const chapterCount = Array.isArray(part.chapters) ? part.chapters.length : 0;
    const explicitUnits = Array.isArray(part.chapters)
      ? part.chapters.reduce((sum, ch) => sum + (Array.isArray(ch.units) ? ch.units.length : (ch.unitCount || 0)), 0)
      : (part.unitCount || 0);
    return `${chapterCount ? `${chapterCount}개 CHAPTER · ` : ""}${explicitUnits ? `${explicitUnits}개 UNIT` : "교재 구조 반영"}`;
  }

  function overviewScreen() {
    const parts = courseMap.parts || [];
    return `
      <div class="review-screen-note"><strong>전체 구조 검수.</strong> 교재의 PART → CHAPTER → UNIT 계층과 저자식 판단 주제가 앱 탐색 구조에 자연스럽게 연결되는지 봅니다.</div>
      <div class="review-preview-topbar">
        <div><p class="eyebrow">JK English</p><h1>${courseMap.appTitle || "5초 영어어법"}</h1></div>
        <span class="role-badge">전체 콘텐츠</span>
      </div>
      <section class="review-hero panel">
        <p class="eyebrow">TEXTBOOK PHILOSOPHY</p>
        <h2>설명보다 판단 순서가 먼저 보이는 앱</h2>
        <p class="panel-copy">${courseMap.philosophy || "교재의 판단법을 짧고 직접적인 상호작용으로 옮깁니다."}</p>
        <div class="review-hero-flow">
          <span>문제</span><b>→</b><span>자리</span><b>→</b><span>핵심 근거</span><b>→</b><span>5초 Rule</span><b>→</b><span>재도전</span>
        </div>
      </section>
      <section class="review-part-list">
        ${parts.map(part => `
          <article class="review-part-summary">
            <div class="review-part-number">PART ${part.no}</div>
            <div class="review-part-main">
              <strong>${part.title}</strong>
              <span>${part.focus || part.tag || partSummary(part)}</span>
            </div>
            <div class="review-part-meta">${partSummary(part)}</div>
          </article>
        `).join("")}
      </section>
      <div class="review-supplement">부록 · ${courseMap.supplement || "핵심 어법 요약"}</div>
    `;
  }

  function journeyScreen() {
    const steps = [
      ["01", "Cold Attempt", "설명 없이 먼저 답을 고른다."],
      ["02", "저자식 판단", "UNIT마다 필요한 핵심 질문 1~3개만 확인한다."],
      ["03", "5초 Rule", "길게 설명하지 않고 바로 적용할 규칙만 보여준다."],
      ["04", "원문 재도전", "표시와 힌트를 제거하고 같은 문장을 다시 푼다."],
      ["05", "짧은 전이", "같은 규칙을 다른 표현에서 한 번 더 확인한다."],
      ["06", "예약 복습", "미해결·불안정 항목만 D+1/D+3/D+7로 보낸다."]
    ];
    return `
      <div class="review-screen-note"><strong>학습 흐름 검수.</strong> 학생이 한 번의 학습에서 무엇을 하고 왜 하는지가 직관적인지 확인합니다.</div>
      <div class="review-preview-topbar"><div><p class="eyebrow">LEARNING JOURNEY</p><h1>한 문제를 짧게, 깊게</h1></div><div class="unit-badge">저자식 루프</div></div>
      <div class="review-journey-grid">
        ${steps.map(([no,title,copy], i) => `
          <article class="review-journey-card ${i === 0 ? "focus" : ""}">
            <span>${no}</span><strong>${title}</strong><p>${copy}</p>
          </article>
        `).join("")}
      </div>
      <section class="panel review-principle-panel">
        <p class="eyebrow">SIMPLE RULE</p>
        <h2>한 화면에는 한 가지 판단만</h2>
        <p class="panel-copy">학생이 동시에 문법명칭·해설·채점·분석을 모두 처리하지 않도록, 현재 필요한 행동만 크게 보여줍니다.</p>
      </section>
    `;
  }

  function homeScreen() {
    return `
      <div class="review-screen-note"><strong>학생 홈 검수.</strong> 실제 진도 수치 대신 콘텐츠 탐색과 오늘 할 일의 우선순위를 봅니다.</div>
      <div class="review-preview-topbar"><div><p class="eyebrow">JK English</p><h1>오늘 학습</h1></div><span class="role-badge">학생</span></div>
      <main class="dashboard-grid">
        <section class="panel">
          <p class="eyebrow">TODAY</p>
          <h2>이어하기</h2>
          <div class="review-today-card">
            <span>PART 1 · 동사의 활용</span>
            <strong>CH 1 · UNIT 3</strong>
            <p>~ed / be + ~ed · 자리와 수동 형태 판단</p>
            <button class="primary-action" type="button">오늘 학습 시작</button>
          </div>
          <div class="review-section-title"><strong>교재 전체</strong><span>PART별 탐색</span></div>
          <div class="review-home-parts">
            ${(courseMap.parts || []).slice(0,6).map(part => `<div class="review-home-part"><b>PART ${part.no}</b><span>${part.title}</span></div>`).join("")}
          </div>
        </section>
        <aside class="panel">
          <p class="eyebrow">REVIEW</p>
          <h2>복습 대기</h2>
          <div class="review-queue"><strong>3</strong><span>짧은 복습 문항</span></div>
          <div class="rule-box"><strong>오늘 원칙</strong><p>새 학습보다 틀린 판단 1~2개를 먼저 회복합니다.</p></div>
        </aside>
      </main>
    `;
  }

  function questionScreen() {
    return `
      <div class="review-screen-note"><strong>문제 화면 검수.</strong> 문장 크기, 선택지 간격, 하단 주요 행동의 위치만 봅니다.</div>
      ${learningTop("PART 1 · CH 1 · UNIT 2", "문제 풀기 · 대표 화면", "1 / 5", 18)}
      <section class="task-card"><div id="taskContent">
        <p class="task-kicker">Cold Attempt</p>
        <h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2>
        <p class="question">The report ___ by the committee contains several important recommendations.</p>
        <div class="choice-grid"><button class="choice selected" type="button">prepared</button><button class="choice" type="button">preparing</button></div>
      </div></section>
      <div class="action-zone"><button class="primary-action" type="button">근거 확인</button></div>
    `;
  }

  function evidenceScreen() {
    return `
      <div class="review-screen-note"><strong>근거 판단 검수.</strong> 원문이 유지되고 현재 질문이 한눈에 들어오는지 확인합니다.</div>
      ${learningTop("PART 1 · CH 1 · UNIT 2", "목적어 확인 · 대표 화면", "1 / 5", 52)}
      <section class="task-card"><div id="taskContent">
        <p class="task-kicker">STEP 3</p><h2 class="task-title">빈칸 뒤에 목적어가 있습니까?</h2>
        ${contextBlock("The new device saves energy, ___ operating costs for small businesses.", "reducing")}
        <p class="task-copy">전치사구나 부사는 목적어로 세지 않습니다.</p>
        <div class="choice-grid"><button class="evidence-choice selected" type="button">목적어 있음</button><button class="evidence-choice" type="button">목적어 없음</button></div>
      </div></section>
      <div class="action-zone"><button class="primary-action" type="button">다음</button></div>
    `;
  }

  function ruleScreen() {
    return `
      <div class="review-screen-note"><strong>5초 Rule 검수.</strong> 해설이 교재의 직설적 성격을 유지하면서 과하지 않은지 봅니다.</div>
      ${learningTop("PART 1 · CH 1 · UNIT 3", "5초 Rule", "대표 화면", 78)}
      <section class="task-card"><div id="taskContent">
        <p class="task-kicker">5초 Rule</p><h2 class="task-title">자리 → 목적어 → 형태</h2>
        ${contextBlock("The documents ___ by the research team contain the final results.", "prepared")}
        <div class="rule-box"><strong>딱 이것만</strong><p>이미 본동사가 있으면 빈칸은 준동사 자리다. 수동 의미의 준동사는 p.p.만 쓴다.</p></div>
        <p class="feedback ok">이제 표시 없이 다시 푼다.</p>
      </div></section>
      <div class="action-zone"><button class="primary-action" type="button">원문 재도전</button></div>
    `;
  }

  function resultScreen() {
    return `
      <div class="review-screen-note"><strong>결과 화면 검수.</strong> 점수보다 어떤 판단이 안정적이고 무엇을 다시 볼지 보이게 합니다.</div>
      <div class="review-preview-topbar"><div><p class="eyebrow">UNIT COMPLETE</p><h1>오늘 판단 정리</h1></div><div class="unit-badge">UNIT 2</div></div>
      <section class="panel">
        <div class="review-result-hero"><span>오늘의 핵심</span><strong>자리 판단은 안정적, 목적어 판단 1개 복습</strong></div>
        <div class="metric-grid">
          <div class="metric"><span class="metric-label">바로 해결</span><strong>3</strong></div>
          <div class="metric"><span class="metric-label">교정 후 해결</span><strong>1</strong></div>
          <div class="metric"><span class="metric-label">다시 볼 것</span><strong>1</strong></div>
        </div>
        <div class="review-result-list">
          <div><b>✓</b><span>준동사 자리 판별</span><strong>안정</strong></div>
          <div><b>↻</b><span>목적어 유무</span><strong>복습</strong></div>
          <div><b>✓</b><span>능동 / 수동</span><strong>안정</strong></div>
        </div>
        <button class="primary-action" type="button">홈으로</button>
      </section>
    `;
  }

  function adminScreen() {
    return `
      <div class="review-screen-note"><strong>관리자 화면 검수.</strong> 1인 학습자이므로 표와 메뉴를 늘리지 않고 판단 상태와 복습만 봅니다.</div>
      <div class="review-preview-topbar"><div><p class="eyebrow">JK English</p><h1>학습 관리</h1></div><span class="role-badge">관리자</span></div>
      <main class="dashboard-grid">
        <section class="panel">
          <p class="eyebrow">OVERVIEW</p><h2>오늘 상태</h2>
          <div class="metric-grid"><div class="metric"><span class="metric-label">학습 UNIT</span><strong>2</strong></div><div class="metric"><span class="metric-label">복습 대기</span><strong>3</strong></div><div class="metric"><span class="metric-label">학습시간</span><strong>34m</strong></div></div>
          <div class="review-admin-focus">
            <div><span>가장 안정적</span><strong>자리 판별</strong></div>
            <div><span>지금 볼 것</span><strong>목적어 유무</strong></div>
          </div>
          <div class="review-admin-card-grid"><div class="review-admin-card"><strong>최근 반복 오류</strong><p>준동사 뒤 전치사구를 목적어로 착각</p></div><div class="review-admin-card"><strong>예약 복습</strong><p>D+1 2문항 · D+3 1문항</p></div></div>
        </section>
        <aside class="panel"><p class="eyebrow">6 AXES</p><h2>판단 능력</h2><div class="review-axis-list">${["규칙 인출력","자리 판별력","동사 구조 감지력","자·타 판단력","근거 판단력","유형 전이력"].map((x,i)=>`<div><span>${x}</span><i><b style="width:${[72,84,66,58,75,62][i]}%"></b></i></div>`).join("")}</div></aside>
      </main>
    `;
  }

  function maintenanceScreen() {
    return `
      <div class="review-screen-note"><strong>유지보수 구조 검수.</strong> 다른 교재 프로젝트에도 그대로 재사용할 수 있는 단순한 편집·배포 구조를 확인합니다.</div>
      <div class="review-preview-topbar"><div><p class="eyebrow">MAINTENANCE</p><h1>수정은 데이터 중심으로</h1></div><span class="role-badge">GitHub main</span></div>
      <div class="review-maintenance-grid">
        <section class="panel"><p class="eyebrow">CONTENT</p><h2>교재 데이터</h2><div class="review-code-tree"><b>data/</b><span>course-map.js</span><b>js/</b><span>unit1-data.js</span><span>unit2-data.js</span><span>unit3-data.js</span></div><p class="panel-copy">문항·규칙·UNIT 정보를 코드 로직과 분리해 교체하기 쉽게 유지합니다.</p></section>
        <section class="panel"><p class="eyebrow">FLOW</p><h2>운영 방식</h2><div class="review-maintenance-flow"><span>요청</span><b>→</b><span>main 수정</span><b>→</b><span>자동배포</span><b>→</b><span>검수</span></div><p class="panel-copy">집/회사 PC 구분 없이 GitHub 원격 main을 유일한 기준본으로 사용합니다.</p></section>
        <section class="panel"><p class="eyebrow">REUSE</p><h2>다른 교재에도 재사용</h2><p class="panel-copy">로그인, 학생 홈, 단원 카드, 문제 화면, 근거 판단, Rule, 결과, 관리자 골격은 유지하고 교재별 판단 엔진과 데이터만 교체합니다.</p><div class="rule-box"><strong>재사용 핵심</strong><p>Shell은 고정, Subject Adapter만 교체</p></div></section>
      </div>
    `;
  }

  function learningTop(unit, stage, count, percent) {
    return `<div class="review-preview-topbar"><div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div><div class="unit-badge">${unit}</div></div><main class="learning-wrap"><section class="progress-wrap"><div class="progress-meta"><span>${stage}</span><span>${count}</span></div><div class="progress-track"><div class="progress-bar" style="width:${percent}%"></div></div></section>`;
  }

  function contextBlock(sentence, choice) {
    return `<div class="question-context"><span class="context-label">문제 원문</span><p class="context-sentence">${sentence}</p><p class="context-choice">처음 선택 <strong>${choice}</strong></p></div>`;
  }

  const screens = {
    overview: overviewScreen,
    journey: journeyScreen,
    home: homeScreen,
    question: questionScreen,
    evidence: evidenceScreen,
    rule: ruleScreen,
    result: resultScreen,
    admin: adminScreen,
    maintenance: maintenanceScreen
  };

  function renderReviewMode() {
    document.body.classList.add("review-mode");
    app.className = "review-app-shell";
    app.innerHTML = `
      <main class="review-shell">
        ${reviewHeader()}
        <section class="review-toolbar">
          <div class="review-control-row" id="viewControls"><span class="review-control-label">화면</span>${viewPresets.map(([value,label]) => `<button class="review-chip ${value === currentView ? "active" : ""}" data-view="${value}" type="button">${label}</button>`).join("")}</div>
          <div class="review-control-row" id="widthControls"><span class="review-control-label">기기 폭</span>${widthPresets.map(([value,label]) => `<button class="review-chip ${value === currentWidth ? "active" : ""}" data-width="${value}" type="button">${label}</button>`).join("")}</div>
        </section>
        <section class="review-stage"><div id="reviewViewport" class="review-viewport" style="max-width:${currentWidth}px"><div id="reviewViewportInner" class="review-viewport-inner"></div></div></section>
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

    document.querySelector("#reviewViewportInner").innerHTML = (screens[currentView] || overviewScreen)();
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

  if (shouldReview) setTimeout(renderReviewMode, 0);
  else setTimeout(addReviewEntryToLogin, 120);
})();
