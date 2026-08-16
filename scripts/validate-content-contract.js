const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');global.window=global;
function load(p){vm.runInThisContext(fs.readFileSync(path.join(root,p),'utf8'),{filename:p});}
load('data/content-contract.js');
const c=global.JK_CONTENT_CONTRACT,errors=[],ids=new Set(),banned=new Set(['sourceText','fullText','verbatimText','textbookText']);
const implemented=Object.entries(c?.collections||{}).filter(([,x])=>x.status==='implemented').sort((a,b)=>Number(a[0])-Number(b[0]));
for(const [r] of implemented){const n=Number(r),p=`js/unit${n}-data.js`;if(!fs.existsSync(path.join(root,p)))errors.push(`unit ${n}: data file missing`);else load(p);}
const index=fs.readFileSync(path.join(root,'index.html'),'utf8'),shell=fs.readFileSync(path.join(root,'js/phase14-common-shell.js'),'utf8');
function match(v,t){if(t==='array')return Array.isArray(v);if(t==='boolean')return typeof v==='boolean';if(t==='string')return typeof v==='string'&&v.length>0;return typeof v===t;}
function scan(v,p){if(!v||typeof v!=='object')return;for(const[k,x]of Object.entries(v)){if(banned.has(k))errors.push(`${p}: banned ${k}`);scan(x,`${p}.${k}`);}}
if(!c||!/^[0-9]+\.[0-9]+\.[0-9]+$/.test(c.version||''))errors.push('contract version must be semver');
if(c?.repositoryPolicy?.sourceTextStorage!=='reference-only'||c?.repositoryPolicy?.fullTextAllowed!==false)errors.push('source boundary invalid');
scan(c,'contract');
for(const[r,col]of implemented){const n=Number(r),items=global[col.globalName],scope=`P${col.part} CH${col.chapter} U${col.unit}`;if(!Array.isArray(items)||!items.length){errors.push(`${scope}: data missing`);continue;}for(const item of items){for(const[f,t]of Object.entries(c.sharedItemSchema))if(!match(item[f],t))errors.push(`${scope}: ${f}`);for(const[f,t]of Object.entries(col.decisionSchema||{}))if(!match(item[f],t))errors.push(`${scope}: ${f}`);if(!item.id?.startsWith(`u${n}-`))errors.push(`${scope}: id prefix`);if(ids.has(item.id))errors.push(`${scope}: duplicate id`);ids.add(item.id);if(!item.choices?.includes(item.answer))errors.push(`${scope}: answer`);scan(item,scope);}if(!shell.includes(`{ id: ${n},`))errors.push(`${scope}: registry`);if(n===1){if(!shell.includes('start:startLearning')&&!shell.includes('start: startLearning'))errors.push(`${scope}: start`);}else{if(!shell.includes(`start:startUnit${n}`)&&!shell.includes(`start: startUnit${n}`))errors.push(`${scope}: start`);if(!shell.includes(`attach(${n},`))errors.push(`${scope}: adapter`);if(!index.includes(`./js/unit${n}-data.js`)||!index.includes(`./js/unit${n}-engine.js`))errors.push(`${scope}: index`);}}
if(!index.includes('./js/generic-decision-engine.js'))errors.push('generic decision engine not loaded');
if(errors.length){console.error('CONTENT CONTRACT CHECK FAILED');errors.forEach(e=>console.error('- '+e));process.exit(1);}
console.log(`CONTENT CONTRACT CHECK PASS: ${ids.size} items across ${implemented.length} implemented lessons; contract ${c.version}; Shell/index integration verified`);
