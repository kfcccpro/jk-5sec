import {spawn,execFileSync} from 'node:child_process';
const BASE=process.env.LOCAL_URL||'http://127.0.0.1:4173/index.html';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function getJson(url,options){const r=await fetch(url,options);if(!r.ok)throw new Error(`${url} ${r.status}`);return r.json();}
function chromeBin(){
  if(process.env.CHROME_BIN)return process.env.CHROME_BIN;
  return execFileSync('bash',['-lc','command -v google-chrome || command -v chromium || command -v chromium-browser'],{encoding:'utf8'}).trim();
}
async function launch(){
  const bin=chromeBin();if(!bin)throw new Error('Chrome/Chromium not available');
  const proc=spawn(bin,['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9222','--user-data-dir=/tmp/jk-wrongbook-chrome','about:blank'],{stdio:'ignore'});
  let version=null;for(let i=0;i<60;i++){if(proc.exitCode!==null)throw new Error(`Chrome exited ${proc.exitCode}`);try{version=await getJson('http://127.0.0.1:9222/json/version');break;}catch{await sleep(100);}}
  if(!version)throw new Error('DevTools unavailable');return proc;
}
class CDP{
  constructor(ws){this.ws=new WebSocket(ws);this.id=0;this.pending=new Map();this.events=[];this.ready=new Promise((res,rej)=>{this.ws.onopen=res;this.ws.onerror=rej;});this.ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&this.pending.has(m.id)){const {res,rej}=this.pending.get(m.id);this.pending.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result);return;}if(m.method)this.events.push(m);};}
  async call(method,params={}){await this.ready;const id=++this.id;return new Promise((res,rej)=>{this.pending.set(id,{res,rej});this.ws.send(JSON.stringify({id,method,params}));});}
  close(){this.ws.close();}
}
let chrome,cdp;
async function ev(expression){const r=await cdp.call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text||'evaluate failed');return r.result?.value;}
async function wait(expression,label,ms=16000){const end=Date.now()+ms;while(Date.now()<end){try{if(await ev(expression))return;}catch{}await sleep(100);}const diag=await diagnostic().catch(e=>({diagnosticError:String(e)}));throw new Error(`wait ${label}\nDIAGNOSTIC ${JSON.stringify(diag)}`);}
async function diagnostic(){return ev(`(()=>({href:location.href,ready:document.readyState,title:document.title,body:(document.body?.innerText||'').slice(0,500),pin:Boolean(document.querySelector('#pinInput')),course:typeof window.JK_COURSE_MAP,sourceMap:typeof window.JK_SOURCE_MAP,contract:typeof window.JK_CONTENT_CONTRACT,shell:typeof window.JKCommonShell,shellCount:window.JKCommonShell?.units?.length??null,wrongbook:typeof window.JK_WRONGBOOK,wrongbookReady:window.JK_WRONGBOOK_READY??null,scripts:[...document.scripts].slice(-8).map(s=>s.src)}))()`);}
try{
  chrome=await launch();
  const targets=await getJson('http://127.0.0.1:9222/json');const target=targets.find(x=>x.type==='page');if(!target)throw new Error('No page target');
  cdp=new CDP(target.webSocketDebuggerUrl);await cdp.call('Page.enable');await cdp.call('Runtime.enable');await cdp.call('Log.enable');await cdp.call('Page.navigate',{url:BASE});
  await sleep(1500);const pre=await diagnostic();console.log('PRECHECK '+JSON.stringify(pre));
  await wait("document.querySelector('#pinInput') && window.JK_WRONGBOOK_READY===true && window.JKCommonShell?.units?.length===26",'JK ready');
  const baseline=await ev(`(()=>({title:JK_COURSE_MAP.title,sources:Object.keys(JK_SOURCE_MAP).length,foreign:/3800|PSS|PRACTICE/i.test(JSON.stringify(JK_SOURCE_MAP)),version:document.title}))()`);
  if(baseline.title!=='답이 보이는 5초 영어어법'||baseline.sources!==26||baseline.foreign)throw new Error('JK source identity failed '+JSON.stringify(baseline));
  await ev(`(()=>{localStorage.removeItem('jk5sec_wrongbook_v1');document.querySelector('#pinInput').value='8081';document.querySelector('#studentLogin').click();return true})()`);
  await wait("document.querySelector('#unit1Btn')",'student home');
  const captured=await ev(`(()=>{session=freshSession();session.firstAnswerCorrect=false;session.itemResults=[{id:JK_UNIT1_ITEMS[0].id,status:'REPAIRED'}];saveStore();const b=JK_WRONGBOOK.read();return Object.values(b.items)[0]||null})()`);
  if(!captured||captured.runtimeId!==1||captured.page!=='18'||captured.status!=='review_due')throw new Error('automatic wrong capture failed '+JSON.stringify(captured));
  await ev("JKCommonShell.units.find(x=>x.id===2).start();true");
  await wait("window.unit2Session && !document.body.innerText.includes('이전 오답 복구')",'same chapter bypass');
  await ev("JKCommonShell.units.find(x=>x.id===8).start();true");
  await wait("document.body.innerText.includes('이전 오답 복구') && document.querySelector('#jkWrongSubmit')",'later chapter gate');
  const gate=await ev(`(()=>({text:document.body.innerText,choices:[...document.querySelectorAll('#jkWrongChoices .choice')].map(x=>x.innerText)}))()`);
  await ev(`(()=>{const a=JK_UNIT1_ITEMS[0].answer;const b=[...document.querySelectorAll('#jkWrongChoices .choice')].find(x=>x.innerText!==a);b.click();document.querySelector('#jkWrongSubmit').click();return true})()`);
  await wait("document.querySelector('#jkBookRetry')",'book required');
  const book=await ev(`(()=>({text:document.body.innerText,hasRule:document.body.innerText.includes(JK_UNIT1_ITEMS[0].rule),has3800:/3800|PSS|PRACTICE/.test(document.body.innerText)}))()`);
  if(!book.text.includes('JK 교재 p.18')||!book.text.includes('PART 1 · CH 1 · UNIT 1')||book.hasRule||book.has3800)throw new Error('book-return policy failed '+JSON.stringify(book));
  await ev("document.querySelector('#jkBookRetry').click();true");await wait("document.querySelector('#jkWrongSubmit')",'retry question');
  await ev(`(()=>{const a=JK_UNIT1_ITEMS[0].answer;const b=[...document.querySelectorAll('#jkWrongChoices .choice')].find(x=>x.innerText===a);b.click();document.querySelector('#jkWrongSubmit').click();return true})()`);
  await wait("document.querySelector('#jkWrongNext')",'recovered');
  await ev("document.querySelector('#jkWrongNext').click();true");await wait("window.unit8Session && document.body.innerText.includes('PART 1 · CH 2 · UNIT 1')",'target starts');
  const recovered=await ev(`(()=>Object.values(JK_WRONGBOOK.read().items)[0])()`);
  if(recovered.status!=='recovered'||recovered.reviewWrongCount<1||recovered.reviewCorrectCount<1)throw new Error('recovery state failed '+JSON.stringify(recovered));
  console.log(JSON.stringify({pass:true,baseline,captured,gate:{choiceCount:gate.choices.length},book,recovered:{runtimeId:recovered.runtimeId,page:recovered.page,status:recovered.status,reviewWrongCount:recovered.reviewWrongCount,reviewCorrectCount:recovered.reviewCorrectCount}},null,2));
}catch(e){console.error(e.stack||e);if(cdp){const relevant=cdp.events.filter(x=>['Runtime.exceptionThrown','Log.entryAdded','Runtime.consoleAPICalled'].includes(x.method));if(relevant.length)console.error('CDP_EVENTS '+JSON.stringify(relevant.slice(-10)));}process.exitCode=1;}finally{try{cdp?.close();}catch{}try{chrome?.kill('SIGTERM');}catch{}}
