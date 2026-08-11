const unit3Items = Array.isArray(window.JK_UNIT3_ITEMS) ? window.JK_UNIT3_ITEMS : [];
let unit3Session = null;

const unit3BaseRenderStudentHome = renderStudentHome;
const unit3BaseRenderAdminHome = renderAdminHome;

renderStudentHome = function () {
  unit3BaseRenderStudentHome();
  const unitList = document.querySelector('.unit-list');
  const placeholder = [...document.querySelectorAll('.unit-row')].find(el => el.textContent.includes('UNIT 3 이후'));
  const btn = document.createElement('button');
  btn.id = 'unit3Btn';
  btn.className = 'unit-row active';
  btn.type = 'button';
  btn.innerHTML = `
    <div><strong>CH 1 · UNIT 3</strong><br><span>~ed / be + ~ed · 자리로 p.p.와 수동태 구분</span></div>
    <span class="status-pill ready">5문항</span>
  `;
  if (placeholder && unitList) unitList.insertBefore(btn, placeholder);
  else unitList?.appendChild(btn);
  btn.addEventListener('click', startUnit3);
};

renderAdminHome = function () {
  unit3BaseRenderAdminHome();
  const rows = document.querySelector('.admin-list');
  if (rows) {
    const row = document.createElement('div');
    row.className = 'admin-row';
    row.innerHTML = `<strong>UNIT 3 완료 횟수</strong><span>${store.unit3Runs || 0}</span>`;
    rows.appendChild(row);
  }
};

function freshUnit3Session() {
  return {
    itemIndex: 0,
    stageIndex: 0,
    stages: ['answer', 'position', 'object', 'form', 'rule', 'retry'],
    selectedAnswer: null,
    initialAnswer: null,
    firstAnswerCorrect: null,
    selectedPosition: null,
    selectedObject: null,
    selectedForm: null,
    evidence: { position: null, object: null, form: null },
    itemResults: [],
    startAt: Date.now()
  };
}

function currentUnit3Item() { return unit3Items[unit3Session.itemIndex]; }
function currentUnit3Stage() { return unit3Session.stages[unit3Session.stageIndex]; }

function startUnit3() {
  if (!unit3Items.length) return alert('UNIT 3 문항 데이터를 불러오지 못했습니다.');
  store.currentUnit = 3;
  saveStore();
  unit3Session = freshUnit3Session();
  renderUnit3Shell();
  renderUnit3Stage();
}

function renderUnit3Shell() {
  app.innerHTML = `
    <div class="screen">
      <header class="topbar">
        <div><p class="eyebrow">JK English</p><h1>5초 영어어법</h1></div>
        <div class="header-actions"><div class="unit-badge">PART 1 · CH 1 · UNIT 3</div><button id="homeBtn" class="header-button" type="button">홈</button></div>
      </header>
      <main class="learning-wrap">
        <section class="progress-wrap">
          <div class="progress-meta"><span id="stageLabel"></span><span id="progressText"></span></div>
          <div class="progress-track"><div id="progressBar" class="progress-bar"></div></div>
        </section>
        <section class="task-card" aria-live="polite"><div id="taskContent"></div></section>
        <div class="action-zone"><button id="primaryAction" class="primary-action" type="button" disabled>다음</button></div>
      </main>
    </div>`;
  document.querySelector('#homeBtn').addEventListener('click', renderStudentHome);
  document.querySelector('#primaryAction').addEventListener('click', handleUnit3Primary);
}

const unit3Labels = { answer:'문제 풀기', position:'자리 판단', object:'목적어 확인', form:'형태 판단', rule:'5초 Rule', retry:'원문 재도전' };
function setUnit3Primary(enabled, label='다음') { const b=document.querySelector('#primaryAction'); b.disabled=!enabled; b.textContent=label; }
function updateUnit3Progress() {
  const itemNo=unit3Session.itemIndex+1, stageNo=unit3Session.stageIndex+1;
  document.querySelector('#stageLabel').textContent=`${unit3Labels[currentUnit3Stage()]} · ${itemNo}번`;
  document.querySelector('#progressText').textContent=`${itemNo} / ${unit3Items.length}`;
  document.querySelector('#progressBar').style.width=`${((unit3Session.itemIndex*6+stageNo)/(unit3Items.length*6))*100}%`;
}
function unit3ContextHtml() {
  const item=currentUnit3Item();
  return `<div class="question-context"><span class="context-label">문제 ${unit3Session.itemIndex+1}</span><p class="context-sentence">${item.prompt}</p>${unit3Session.initialAnswer?`<p class="context-choice">처음 선택 <strong>${unit3Session.initialAnswer}</strong></p>`:''}</div>`;
}
function renderUnit3Stage() {
  updateUnit3Progress();
  const s=currentUnit3Stage();
  if(s==='answer') return renderUnit3Answer(false);
  if(s==='position') return renderUnit3Position();
  if(s==='object') return renderUnit3Object();
  if(s==='form') return renderUnit3Form();
  if(s==='rule') return renderUnit3Rule();
  if(s==='retry') return renderUnit3Answer(true);
}
function renderUnit3Answer(isRetry) {
  const item=currentUnit3Item(); unit3Session.selectedAnswer=null; setUnit3Primary(false,isRetry?'결과 보기':'근거 확인');
  document.querySelector('#taskContent').innerHTML=`<p class="task-kicker">${isRetry?'원문 재도전':'Cold Attempt'}</p><h2 class="task-title">설명 없이 먼저 답을 고르세요.</h2><p class="question">${item.prompt}</p><div class="choice-grid" id="unit3Choices"></div>`;
  const wrap=document.querySelector('#unit3Choices');
  item.choices.forEach(choice=>{const btn=document.createElement('button');btn.className='choice';btn.type='button';btn.textContent=choice;btn.onclick=()=>{unit3Session.selectedAnswer=choice;[...wrap.children].forEach(el=>el.classList.toggle('selected',el===btn));setUnit3Primary(true,isRetry?'결과 보기':'근거 확인');};wrap.appendChild(btn);});
}
function renderUnit3Position() {
  unit3Session.selectedPosition=null; setUnit3Primary(false,'다음');
  document.querySelector('#taskContent').innerHTML=`<p class="task-kicker">STEP 2</p><h2 class="task-title">먼저 자리부터 판단하세요.</h2>${unit3ContextHtml()}<div class="choice-grid" id="u3pos"><button class="evidence-choice" data-value="finite">본동사 자리</button><button class="evidence-choice" data-value="nonfinite">준동사 자리</button></div>`;
  bindU3('u3pos',v=>unit3Session.selectedPosition=v);
}
function renderUnit3Object() {
  unit3Session.selectedObject=null; setUnit3Primary(false,'다음'); const item=currentUnit3Item();
  const na=item.objectAnswer==='na';
  document.querySelector('#taskContent').innerHTML=`<p class="task-kicker">STEP 3</p><h2 class="task-title">${na?'목적어 판단이 필요한 자리입니까?':'해당 동사 뒤에 목적어가 있습니까?'}</h2>${unit3ContextHtml()}<div class="choice-grid" id="u3obj">${na?'<button class="evidence-choice" data-value="na">준동사 자리라 목적어보다 자리 판단이 우선</button>':'<button class="evidence-choice" data-value="yes">목적어 있음</button><button class="evidence-choice" data-value="no">목적어 없음</button>'}</div>`;
  bindU3('u3obj',v=>unit3Session.selectedObject=v);
}
function renderUnit3Form() {
  unit3Session.selectedForm=null; setUnit3Primary(false,'5초 Rule 보기'); const item=currentUnit3Item();
  let opts='';
  if(item.positionAnswer==='nonfinite') opts='<button class="evidence-choice" data-value="participle">p.p.만 사용</button><button class="evidence-choice" data-value="passiveFinite">be + p.p.</button>';
  else if(item.formAnswer==='activePast') opts='<button class="evidence-choice" data-value="activePast">능동 과거형 ~ed</button><button class="evidence-choice" data-value="passiveFinite">be + p.p.</button>';
  else opts='<button class="evidence-choice" data-value="passiveFinite">be + p.p.</button><button class="evidence-choice" data-value="participle">p.p.만 사용</button>';
  document.querySelector('#taskContent').innerHTML=`<p class="task-kicker">STEP 4</p><h2 class="task-title">어떤 형태가 와야 합니까?</h2>${unit3ContextHtml()}<div class="choice-grid" id="u3form">${opts}</div>`;
  bindU3('u3form',v=>unit3Session.selectedForm=v,'5초 Rule 보기');
}
function bindU3(id,setter,label='다음'){const wrap=document.querySelector('#'+id);[...wrap.children].forEach(btn=>btn.onclick=()=>{setter(btn.dataset.value);[...wrap.children].forEach(el=>el.classList.toggle('selected',el===btn));setUnit3Primary(true,label);});}
function renderUnit3Rule(){const item=currentUnit3Item();const stable=unit3Session.evidence.position&&unit3Session.evidence.object&&unit3Session.evidence.form;document.querySelector('#taskContent').innerHTML=`<p class="task-kicker">5초 Rule</p><h2 class="task-title">자리 → 목적어 → 형태</h2>${unit3ContextHtml()}<div class="rule-box"><strong>UNIT 3 핵심</strong><p>${item.rule}</p></div><p class="feedback ${unit3Session.firstAnswerCorrect&&stable?'ok':'warn'}">${unit3Session.firstAnswerCorrect&&stable?'정답과 근거 판단이 모두 안정적입니다.':'정답 또는 근거가 흔들렸습니다. 같은 문제를 표시 없이 다시 풉니다.'}</p>`;setUnit3Primary(true,'원문 재도전');}
function recordUnit3Item(){const item=currentUnit3Item();const retry=unit3Session.selectedAnswer===item.answer;const stable=unit3Session.evidence.position&&unit3Session.evidence.object&&unit3Session.evidence.form;let status;if(unit3Session.firstAnswerCorrect&&stable&&retry)status='MASTERED_NOW';else if(retry)status='REPAIRED';else status='UNRESOLVED';unit3Session.itemResults.push({id:item.id,status,errorCode:item.errorCode});store.attempts+=1;if(unit3Session.firstAnswerCorrect)store.correctFirst+=1;if(status==='REPAIRED')store.repaired+=1;if(status==='UNRESOLVED')store.unresolved+=1;store.lastStatus=`UNIT 3 · ${unit3Session.itemIndex+1}번 ${status}`;saveStore();return status;}
function nextUnit3OrFinish(status){if(unit3Session.itemIndex<unit3Items.length-1){document.querySelector('#taskContent').innerHTML=`<p class="task-kicker">문제 ${unit3Session.itemIndex+1} 완료</p><h2 class="task-title">${status==='UNRESOLVED'?'복습 대상으로 저장했습니다.':'판단을 정리했습니다.'}</h2><div class="rule-box"><strong>상태</strong><p>${status}</p></div>`;setUnit3Primary(true,'다음 문제');document.querySelector('#primaryAction').onclick=()=>{unit3Session.itemIndex++;unit3Session.stageIndex=0;unit3Session.selectedAnswer=null;unit3Session.initialAnswer=null;unit3Session.firstAnswerCorrect=null;unit3Session.selectedPosition=null;unit3Session.selectedObject=null;unit3Session.selectedForm=null;unit3Session.evidence={position:null,object:null,form:null};document.querySelector('#primaryAction').onclick=handleUnit3Primary;renderUnit3Stage();};return;}finishUnit3();}
function finishUnit3(){const mastered=unit3Session.itemResults.filter(r=>r.status==='MASTERED_NOW').length,repaired=unit3Session.itemResults.filter(r=>r.status==='REPAIRED').length,unresolved=unit3Session.itemResults.filter(r=>r.status==='UNRESOLVED').length;store.unit3Runs=(store.unit3Runs||0)+1;store.minutesToday+=Math.max(1,Math.round((Date.now()-unit3Session.startAt)/60000));store.lastStatus=`UNIT 3 완료 · 안정 ${mastered} · 교정 ${repaired} · 미해결 ${unresolved}`;if(!unresolved)store.completedUnits=[...new Set([...(store.completedUnits||[]),3])];saveStore();document.querySelector('#taskContent').innerHTML=`<p class="task-kicker">UNIT 3 완료</p><h2 class="task-title">5문항 판단 결과</h2><div class="metric-grid"><div class="metric"><span class="metric-label">안정 정답</span><strong>${mastered}</strong></div><div class="metric"><span class="metric-label">교정 성공</span><strong>${repaired}</strong></div><div class="metric"><span class="metric-label">미해결</span><strong>${unresolved}</strong></div></div>`;document.querySelector('#stageLabel').textContent='UNIT 완료';document.querySelector('#progressText').textContent=`${unit3Items.length} / ${unit3Items.length}`;document.querySelector('#progressBar').style.width='100%';setUnit3Primary(true,'학생 홈으로');document.querySelector('#primaryAction').onclick=renderStudentHome;}
function handleUnit3Primary(){const item=currentUnit3Item();const s=currentUnit3Stage();if(s==='answer'){unit3Session.initialAnswer=unit3Session.selectedAnswer;unit3Session.firstAnswerCorrect=unit3Session.selectedAnswer===item.answer;}if(s==='position')unit3Session.evidence.position=unit3Session.selectedPosition===item.positionAnswer;if(s==='object')unit3Session.evidence.object=unit3Session.selectedObject===item.objectAnswer;if(s==='form')unit3Session.evidence.form=unit3Session.selectedForm===item.formAnswer;if(s==='retry'){const status=recordUnit3Item();return nextUnit3OrFinish(status);}unit3Session.stageIndex++;renderUnit3Stage();}
