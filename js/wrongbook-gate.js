(()=>{
  const KEY='jk5sec_wrongbook_v1';
  const sourceMap=window.JK_SOURCE_MAP||{};
  const shell=window.JKCommonShell;
  if(!shell||!Array.isArray(shell.units))return;

  function now(){return new Date().toISOString();}
  function read(){
    try{
      const v=JSON.parse(localStorage.getItem(KEY)||'null');
      if(v&&v.version===1&&v.items)return v;
    }catch{}
    return {version:1,items:{},updatedAt:null};
  }
  function write(book){book.updatedAt=now();localStorage.setItem(KEY,JSON.stringify(book));}
  function sourceFor(runtimeId){return sourceMap[Number(runtimeId)]||null;}
  function itemGlobal(runtimeId){return window[`JK_UNIT${runtimeId}_ITEMS`]||window[`unit${runtimeId}Items`]||[];}
  function itemKey(runtimeId,item){return `${runtimeId}:${item.id}`;}
  function chapterOrder(source){return Number(source?.part||0)*100+Number(source?.chapter||0);}
  function recordWrong(runtimeId,item){
    const source=sourceFor(runtimeId);if(!source||!item?.id)return;
    const book=read(),key=itemKey(runtimeId,item),rec=book.items[key]||{key,runtimeId:Number(runtimeId),itemId:item.id,firstWrongAt:now(),wrongCount:0,reviewWrongCount:0,reviewCorrectCount:0,status:'review_due'};
    rec.part=source.part;rec.chapter=source.chapter;rec.unit=source.unit;rec.page=source.page;rec.lastWrongAt=now();rec.wrongCount=(rec.wrongCount||0)+1;rec.status='review_due';
    book.items[key]=rec;write(book);
  }
  function markReviewWrong(rec){const book=read(),x=book.items[rec.key]||rec;x.reviewWrongCount=(x.reviewWrongCount||0)+1;x.lastWrongAt=now();x.status='book_required';book.items[x.key]=x;write(book);return x;}
  function markRecovered(rec){const book=read(),x=book.items[rec.key]||rec;x.reviewCorrectCount=(x.reviewCorrectCount||0)+1;x.lastReviewAt=now();x.status='recovered';book.items[x.key]=x;write(book);return x;}
  function resolve(rec){const list=itemGlobal(rec.runtimeId);const item=list.find(x=>x.id===rec.itemId);return item?{...rec,item}:null;}
  function queueBefore(runtimeId){
    const target=sourceFor(runtimeId),targetOrder=chapterOrder(target);
    if(!targetOrder)return [];
    return Object.values(read().items)
      .filter(r=>['review_due','book_required'].includes(r.status)&&chapterOrder(r)<targetOrder)
      .map(resolve).filter(Boolean)
      .sort((a,b)=>Number(b.status==='book_required')-Number(a.status==='book_required')||String(a.firstWrongAt).localeCompare(String(b.firstWrongAt)));
  }
  function ref(rec){const c=Number(rec.chapter)>0?` · CH ${rec.chapter}`:'';const u=rec.unit?` · UNIT ${rec.unit}`:'';return `JK 교재 p.${rec.page} · PART ${rec.part}${c}${u}`;}

  let gate=null;
  function renderQuestion(){
    const rec=gate.queue[gate.pos],item=rec.item;
    app.innerHTML=`<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>이전 오답 복구</h1></div><div class="header-actions"><div class="unit-badge">${gate.pos+1} / ${gate.queue.length}</div></div></header><main class="learning-wrap"><section class="task-card"><div id="taskContent"><p class="task-kicker">설명 없이 다시 풀기</p><h2 class="task-title">먼저 스스로 답을 고르세요.</h2><p class="question">${item.prompt}</p><div id="jkWrongChoices" class="choice-grid"></div></div></section><div class="action-zone"><button id="jkWrongSubmit" class="primary-action" type="button" disabled>확인</button></div></main></div>`;
    let selected=null;const wrap=document.querySelector('#jkWrongChoices'),submit=document.querySelector('#jkWrongSubmit');
    item.choices.forEach(choice=>{const b=document.createElement('button');b.type='button';b.className='choice';b.textContent=choice;b.onclick=()=>{selected=choice;[...wrap.children].forEach(x=>x.classList.toggle('selected',x===b));submit.disabled=false;};wrap.appendChild(b);});
    submit.onclick=()=>{
      if(selected===item.answer){gate.queue[gate.pos]={...rec,...markRecovered(rec)};return renderRecovered();}
      gate.queue[gate.pos]={...rec,...markReviewWrong(rec)};renderBookRequired();
    };
  }
  function renderBookRequired(){const rec=gate.queue[gate.pos];app.innerHTML=`<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>교재 확인 필요</h1></div></header><main class="learning-wrap"><section class="task-card"><div id="taskContent"><p class="task-kicker">정답·해설 비공개</p><h2 class="task-title">책에서 근거를 찾아 다시 답하세요.</h2><div class="rule-box"><strong>${ref(rec)}</strong><p>지금은 정답이나 해설을 보여주지 않습니다.</p></div></div></section><div class="action-zone"><button id="jkBookRetry" class="primary-action" type="button">책 확인 완료 · 다시 풀기</button></div></main></div>`;document.querySelector('#jkBookRetry').onclick=renderQuestion;}
  function renderRecovered(){const rec=gate.queue[gate.pos],last=gate.pos===gate.queue.length-1;app.innerHTML=`<div class="screen"><header class="topbar"><div><p class="eyebrow">JK English</p><h1>오답 회복</h1></div></header><main class="learning-wrap"><section class="task-card"><div id="taskContent"><p class="task-kicker">정답 확인</p><h2 class="task-title">책을 근거로 다시 맞혔습니다.</h2><div class="rule-box"><strong>${ref(rec)}</strong></div></div></section><div class="action-zone"><button id="jkWrongNext" class="primary-action" type="button">${last?'선택한 학습 시작':'다음 오답'}</button></div></main></div>`;document.querySelector('#jkWrongNext').onclick=()=>{gate.pos++;if(gate.pos<gate.queue.length)return renderQuestion();const proceed=gate.proceed;gate=null;proceed();};}
  function beforeStart(target,proceed){const q=queueBefore(target);if(!q.length)return proceed();gate={target,proceed,queue:q,pos:0};renderQuestion();}

  for(const unit of shell.units){const original=unit.start;unit.start=()=>beforeStart(unit.id,original);}

  const baseSave=saveStore;
  const seen=new Set();
  saveStore=function(){
    try{
      for(const unit of shell.units){
        const id=unit.id;const s=id===1?session:window[`unit${id}Session`];if(!s||s.firstAnswerCorrect!==false||!Array.isArray(s.itemResults)||!s.itemResults.length)continue;
        const item=id===1?currentItem():window[`currentUnit${id}Item`]?.();if(!item)continue;
        const marker=`${id}:${item.id}:${s.itemResults.length}`;if(seen.has(marker))continue;seen.add(marker);recordWrong(id,item);
      }
    }catch{}
    return baseSave();
  };
  window.JK_WRONGBOOK={read,queueBefore,recordWrong,sourceFor,formatRef:ref};
  window.JK_WRONGBOOK_READY=true;
})();
