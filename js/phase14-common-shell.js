(() => {
  const unitRegistry = [
    { id: 1, part: 1, chapter: 1, unit: 1, chapterLabel: "CH 1 · UNIT 1", focus: "접속사·관계사 + 1 = 동사 개수", itemCount: unitItems.length || 5, start: startLearning, runKey: "unit1Runs" },
    { id: 2, part: 1, chapter: 1, unit: 2, chapterLabel: "CH 1 · UNIT 2", focus: "~ing / ~ed · 목적어로 능동·수동 판단", itemCount: unit2Items.length || 5, start: startUnit2, runKey: "unit2Runs" },
    { id: 3, part: 1, chapter: 1, unit: 3, chapterLabel: "CH 1 · UNIT 3", focus: "~ed / be + ~ed · 자리로 p.p.와 수동태 구분", itemCount: unit3Items.length || 5, start: startUnit3, runKey: "unit3Runs" },
    { id: 4, part: 1, chapter: 1, unit: 4, chapterLabel: "CH 1 · UNIT 4", focus: "접속사 + V-ing / p.p. · 목적어 우선 판정", itemCount: unit4Items.length || 5, start: startUnit4, runKey: "unit4Runs" },
    { id: 5, part: 1, chapter: 1, unit: 5, chapterLabel: "CH 1 · UNIT 5", focus: "수동태 불가 동사 · 금지 동사 먼저 확인", itemCount: unit5Items.length || 5, start: startUnit5, runKey: "unit5Runs" },
    { id: 6, part: 1, chapter: 1, unit: 6, chapterLabel: "CH 1 · UNIT 6", focus: "뒤에 두 명사 · 4형식 목적어 / 5형식 보어 판정", itemCount: unit6Items.length || 5, start: startUnit6, runKey: "unit6Runs" },
    { id: 7, part: 1, chapter: 1, unit: 7, chapterLabel: "CH 1 · UNIT 7", focus: "여러 수동태 · 보조동사 사슬부터 읽기", itemCount: unit7Items.length || 5, start: startUnit7, runKey: "unit7Runs" },
    { id: 8, part: 1, chapter: 2, unit: 1, chapterLabel: "CH 2 · UNIT 1", focus: "본동사 + 표현 + to-V / ~ing · 앞 표현부터 판정", itemCount: unit8Items.length || 5, start: startUnit8, runKey: "unit8Runs" },
    { id: 9, part: 1, chapter: 2, unit: 2, chapterLabel: "CH 2 · UNIT 2", focus: "use · 주어와 be 유무로 동사원형 / ~ing 판정", itemCount: unit9Items.length || 5, start: startUnit9, runKey: "unit9Runs" },
    { id: 10, part: 1, chapter: 2, unit: 3, chapterLabel: "CH 2 · UNIT 3", focus: "M·T·B·F·C · it + 형용사 + to-V/that 판정", itemCount: unit10Items.length || 5, start: startUnit10, runKey: "unit10Runs" },
    { id: 11, part: 1, chapter: 2, unit: 4, chapterLabel: "CH 2 · UNIT 4", focus: "감각동사 · 2형식 보어는 형용사", itemCount: unit11Items.length || 5, start: startUnit11, runKey: "unit11Runs" },
    { id: 12, part: 1, chapter: 3, unit: 1, chapterLabel: "CH 3 · UNIT 1", focus: "사역·준사역·지각 · O-O.C 관계로 보어 형태 판정", itemCount: unit12Items.length || 5, start: startUnit12, runKey: "unit12Runs" },
    { id: 13, part: 1, chapter: 3, unit: 2, chapterLabel: "CH 3 · UNIT 2", focus: "make 출제 유형 · it / 원형 / 형용사 / 수동 to-V", itemCount: unit13Items.length || 5, start: startUnit13, runKey: "unit13Runs" }
  ];

  function nextPendingLabel() {
    const last = unitRegistry[unitRegistry.length - 1];
    const part = (window.JK_COURSE_MAP?.parts || []).find(item => item.no === last.part);
    const chapter = (part?.chapters || []).find(item => item.no === last.chapter);
    if (chapter?.units?.length && last.unit < chapter.units.length) return `CH ${last.chapter} · UNIT ${last.unit + 1}`;
    const nextChapter = (part?.chapters || []).find(item => item.no === last.chapter + 1);
    if (nextChapter?.units?.length) return `CH ${nextChapter.no} · UNIT 1`;
    return "다음 학습";
  }

  function renderUnitRows() {
    const ready = unitRegistry.map(unit => `<button id="unit${unit.id}Btn" class="unit-row active" type="button"><div><strong>${unit.chapterLabel}</strong><br><span>${unit.focus}</span></div><span class="status-pill ready">${unit.itemCount}문항</span></button>`).join("");
    return `${ready}<div class="unit-row"><div><strong>${nextPendingLabel()}</strong><br><span>교재 순서대로 단계별 추가</span></div><span class="status-pill">준비 중</span></div>`;
  }

  function bindUnitLaunchers() { unitRegistry.forEach(unit => document.querySelector(`#unit${unit.id}Btn`)?.addEventListener("click", unit.start)); }
  function currentRegistryUnit() { return unitRegistry.find(unit => unit.id === Number(store.currentUnit)) || unitRegistry[0]; }

  function renderStudentHomeStable() {
    const accuracy = store.attempts ? Math.round((store.correctFirst / store.attempts) * 100) : 0;
    app.innerHTML = `<div class="screen">${shellHeader("오늘 학습", "학생")}<main class="dashboard-grid"><section class="panel"><p class="eyebrow">CONTINUE</p><h2>PART 1 · 동사의 활용</h2><p class="panel-copy">교재의 저자식 판단 순서를 짧은 클릭 행동으로 반복합니다.</p><div class="unit-list">${renderUnitRows()}</div></section><aside class="panel"><p class="eyebrow">TODAY</p><h2>학습 상태</h2><div class="metric-grid"><div class="metric"><span class="metric-label">최초 정답률</span><strong>${accuracy}%</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${store.repaired}</strong></div><div class="metric"><span class="metric-label">시도</span><strong>${store.attempts}</strong></div></div><div class="rule-box"><strong>최근 상태</strong><p>${store.lastStatus}</p></div></aside></main></div>`;
    bindLogout();
    bindUnitLaunchers();
  }

  function renderAdminHomeStable() {
    const accuracy = store.attempts ? Math.round((store.correctFirst / store.attempts) * 100) : 0;
    const current = currentRegistryUnit();
    const runRows = unitRegistry.map(unit => `<div class="admin-row"><strong>${unit.chapterLabel} 완료 횟수</strong><span>${store[unit.runKey] || 0}</span></div>`).join("");
    app.innerHTML = `<div class="screen">${shellHeader("학습 관리", "관리자")}<main class="dashboard-grid"><section class="panel"><p class="eyebrow">OVERVIEW</p><h2>학생 학습 현황</h2><div class="metric-grid"><div class="metric"><span class="metric-label">전체 문항 시도</span><strong>${store.attempts}</strong></div><div class="metric"><span class="metric-label">최초 정답률</span><strong>${accuracy}%</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${store.unresolved}</strong></div></div><div class="admin-list"><div class="admin-row"><strong>현재 진도</strong><span>PART ${current.part} · ${current.chapterLabel}</span></div><div class="admin-row"><strong>최근 판정</strong><span>${store.lastStatus}</span></div>${runRows}<div class="admin-row"><strong>오늘 기록 시간</strong><span>${store.minutesToday}분</span></div></div></section><aside class="panel"><p class="eyebrow">SIMPLE ADMIN</p><h2>현재 콘텐츠</h2><p class="panel-copy">PART 1 · CHAPTER 1 UNIT 1~7, CHAPTER 2 UNIT 1~4, CHAPTER 3 UNIT 1~2 학습 루프를 사용할 수 있습니다.</p><div class="rule-box"><strong>운영 원칙</strong><p>진도·정확도·교정 상태만 간단히 확인합니다.</p></div></aside></main></div>`;
    bindLogout();
  }

  function renderCommonLearningShell({ unitBadge, onPrimary }) {
    app.innerHTML = `<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div><div class="header-actions"><div class="unit-badge">${unitBadge}</div><button id="homeBtn" class="header-button" type="button">홈</button></div></header><main class="learning-wrap"><section class="progress-wrap" aria-label="학습 진행률"><div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div><div class="progress-track"><div id="progressBar" class="progress-bar"></div></div></section><section class="task-card" aria-live="polite"><div id="taskContent"></div></section><div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div></main></div>`;
    document.querySelector("#homeBtn").addEventListener("click", renderStudentHomeStable);
    document.querySelector("#primaryAction").addEventListener("click", onPrimary);
  }

  function setPrimaryAction(enabled, label = "다음") { const button = document.querySelector("#primaryAction"); if (!button) return; button.disabled = !enabled; button.textContent = label; }

  function updateLearningProgress({ sessionState, itemCount, labels, currentStageName }) {
    const itemNo = sessionState.itemIndex + 1;
    const stageNo = sessionState.stageIndex + 1;
    const stepCount = sessionState.stages.length;
    document.querySelector("#stageLabel").textContent = `${labels[currentStageName]} · ${itemNo}번`;
    document.querySelector("#progressText").textContent = `${itemNo} / ${itemCount}`;
    const totalSteps = itemCount * stepCount;
    const completedSteps = sessionState.itemIndex * stepCount + stageNo;
    document.querySelector("#progressBar").style.width = `${(completedSteps / totalSteps) * 100}%`;
  }

  function renderContextBlock({ prompt, itemIndex, initialAnswer, showChoice = true, label = "문제" }) { return `<div class="question-context"><span class="context-label">${label} ${itemIndex + 1}</span><p class="context-sentence">${prompt}</p>${showChoice && initialAnswer ? `<p class="context-choice">처음 선택 <strong>${initialAnswer}</strong></p>` : ""}</div>`; }

  renderStudentHome = renderStudentHomeStable;
  renderAdminHome = renderAdminHomeStable;

  renderLearningShell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 1 · UNIT 1", onPrimary: handlePrimary });
  setPrimary = setPrimaryAction;
  updateProgress = () => updateLearningProgress({ sessionState: session, itemCount: unitItems.length, labels, currentStageName: currentStage() });
  contextHtml = ({ includeChoice = true } = {}) => renderContextBlock({ prompt: currentItem().prompt, itemIndex: session.itemIndex, initialAnswer: session.initialAnswer, showChoice: includeChoice && session.firstAnswerCorrect !== null });

  renderUnit2Shell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 1 · UNIT 2", onPrimary: handleUnit2Primary });
  setUnit2Primary = setPrimaryAction;
  updateUnit2Progress = () => updateLearningProgress({ sessionState: unit2Session, itemCount: unit2Items.length, labels: unit2Labels, currentStageName: currentUnit2Stage() });
  unit2ContextHtml = () => renderContextBlock({ prompt: currentUnit2Item().prompt, itemIndex: unit2Session.itemIndex, initialAnswer: unit2Session.initialAnswer, showChoice: Boolean(unit2Session.initialAnswer) });

  renderUnit3Shell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 1 · UNIT 3", onPrimary: handleUnit3Primary });
  setUnit3Primary = setPrimaryAction;
  updateUnit3Progress = () => updateLearningProgress({ sessionState: unit3Session, itemCount: unit3Items.length, labels: unit3Labels, currentStageName: currentUnit3Stage() });
  unit3ContextHtml = () => renderContextBlock({ prompt: currentUnit3Item().prompt, itemIndex: unit3Session.itemIndex, initialAnswer: unit3Session.initialAnswer, showChoice: Boolean(unit3Session.initialAnswer) });

  renderUnit4Shell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 1 · UNIT 4", onPrimary: handleUnit4Primary });
  setUnit4Primary = setPrimaryAction;
  updateUnit4Progress = () => updateLearningProgress({ sessionState: unit4Session, itemCount: unit4Items.length, labels: unit4Labels, currentStageName: currentUnit4Stage() });
  unit4ContextHtml = () => renderContextBlock({ prompt: currentUnit4Item().prompt, itemIndex: unit4Session.itemIndex, initialAnswer: unit4Session.initialAnswer, showChoice: Boolean(unit4Session.initialAnswer) });

  renderUnit5Shell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 1 · UNIT 5", onPrimary: handleUnit5Primary });
  setUnit5Primary = setPrimaryAction;
  updateUnit5Progress = () => updateLearningProgress({ sessionState: unit5Session, itemCount: unit5Items.length, labels: unit5Labels, currentStageName: currentUnit5Stage() });
  unit5ContextHtml = () => renderContextBlock({ prompt: currentUnit5Item().prompt, itemIndex: unit5Session.itemIndex, initialAnswer: unit5Session.initialAnswer, showChoice: Boolean(unit5Session.initialAnswer) });

  renderUnit6Shell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 1 · UNIT 6", onPrimary: handleUnit6Primary });
  setUnit6Primary = setPrimaryAction;
  updateUnit6Progress = () => updateLearningProgress({ sessionState: unit6Session, itemCount: unit6Items.length, labels: unit6Labels, currentStageName: currentUnit6Stage() });
  unit6ContextHtml = () => renderContextBlock({ prompt: currentUnit6Item().prompt, itemIndex: unit6Session.itemIndex, initialAnswer: unit6Session.initialAnswer, showChoice: Boolean(unit6Session.initialAnswer) });

  renderUnit7Shell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 1 · UNIT 7", onPrimary: handleUnit7Primary });
  setUnit7Primary = setPrimaryAction;
  updateUnit7Progress = () => updateLearningProgress({ sessionState: unit7Session, itemCount: unit7Items.length, labels: unit7Labels, currentStageName: currentUnit7Stage() });
  unit7ContextHtml = () => renderContextBlock({ prompt: currentUnit7Item().prompt, itemIndex: unit7Session.itemIndex, initialAnswer: unit7Session.initialAnswer, showChoice: Boolean(unit7Session.initialAnswer) });

  renderUnit8Shell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 2 · UNIT 1", onPrimary: handleUnit8Primary });
  setUnit8Primary = setPrimaryAction;
  updateUnit8Progress = () => updateLearningProgress({ sessionState: unit8Session, itemCount: unit8Items.length, labels: unit8Labels, currentStageName: currentUnit8Stage() });
  unit8ContextHtml = () => renderContextBlock({ prompt: currentUnit8Item().prompt, itemIndex: unit8Session.itemIndex, initialAnswer: unit8Session.initialAnswer, showChoice: Boolean(unit8Session.initialAnswer) });

  renderUnit9Shell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 2 · UNIT 2", onPrimary: handleUnit9Primary });
  setUnit9Primary = setPrimaryAction;
  updateUnit9Progress = () => updateLearningProgress({ sessionState: unit9Session, itemCount: unit9Items.length, labels: unit9Labels, currentStageName: currentUnit9Stage() });
  unit9ContextHtml = () => renderContextBlock({ prompt: currentUnit9Item().prompt, itemIndex: unit9Session.itemIndex, initialAnswer: unit9Session.initialAnswer, showChoice: Boolean(unit9Session.initialAnswer) });

  renderUnit10Shell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 2 · UNIT 3", onPrimary: handleUnit10Primary });
  setUnit10Primary = setPrimaryAction;
  updateUnit10Progress = () => updateLearningProgress({ sessionState: unit10Session, itemCount: unit10Items.length, labels: unit10Labels, currentStageName: currentUnit10Stage() });
  unit10ContextHtml = () => renderContextBlock({ prompt: currentUnit10Item().prompt, itemIndex: unit10Session.itemIndex, initialAnswer: unit10Session.initialAnswer, showChoice: Boolean(unit10Session.initialAnswer) });

  renderUnit11Shell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 2 · UNIT 4", onPrimary: handleUnit11Primary });
  setUnit11Primary = setPrimaryAction;
  updateUnit11Progress = () => updateLearningProgress({ sessionState: unit11Session, itemCount: unit11Items.length, labels: unit11Labels, currentStageName: currentUnit11Stage() });
  unit11ContextHtml = () => renderContextBlock({ prompt: currentUnit11Item().prompt, itemIndex: unit11Session.itemIndex, initialAnswer: unit11Session.initialAnswer, showChoice: Boolean(unit11Session.initialAnswer) });

  renderUnit12Shell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 3 · UNIT 1", onPrimary: handleUnit12Primary });
  setUnit12Primary = setPrimaryAction;
  updateUnit12Progress = () => updateLearningProgress({ sessionState: unit12Session, itemCount: unit12Items.length, labels: unit12Labels, currentStageName: currentUnit12Stage() });
  unit12ContextHtml = () => renderContextBlock({ prompt: currentUnit12Item().prompt, itemIndex: unit12Session.itemIndex, initialAnswer: unit12Session.initialAnswer, showChoice: Boolean(unit12Session.initialAnswer) });

  renderUnit13Shell = () => renderCommonLearningShell({ unitBadge: "PART 1 · CH 3 · UNIT 2", onPrimary: handleUnit13Primary });
  setUnit13Primary = setPrimaryAction;
  updateUnit13Progress = () => updateLearningProgress({ sessionState: unit13Session, itemCount: unit13Items.length, labels: unit13Labels, currentStageName: currentUnit13Stage() });
  unit13ContextHtml = () => renderContextBlock({ prompt: currentUnit13Item().prompt, itemIndex: unit13Session.itemIndex, initialAnswer: unit13Session.initialAnswer, showChoice: Boolean(unit13Session.initialAnswer) });

  window.JKCommonShell = { units: unitRegistry.map(({ id, part, chapter, unit, chapterLabel, focus, itemCount, runKey }) => ({ id, part, chapter, unit, chapterLabel, focus, itemCount, runKey })), renderLearningShell: renderCommonLearningShell, setPrimaryAction, updateLearningProgress, renderContextBlock };
})();
