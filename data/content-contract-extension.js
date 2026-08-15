(function(root){
const c=root.JK_CONTENT_CONTRACT;if(!c)throw new Error('base content contract missing');
const R={keyFrom:'errorCode',mode:'derived-practice-family'},D={keyFrom:'errorCode',status:'contract-defined-not-scheduled'},S=(ref)=>({ref,publicStorage:'reference-only',fullTextStored:false});
for(const m of root.JK_RUNTIME_META_21_79||[]){c.collections[m.id]={status:'implemented',part:m.part,chapter:m.chapter,unit:m.unit,globalName:`JK_UNIT${m.id}_ITEMS`,authorRuleRef:`rule:runtime-${m.id}`,source:S(m.sourceRef),decisionSchema:Object.fromEntries(m.schema.map(k=>[k,k.endsWith('Options')?'array':'string'])),review:R,delayedReview:D};}
c.version='9.0.0';c.integration={phase:92,contentComplete:true,totalRuntimeLessons:79,totalDerivedItems:405,deferredRuntimeRange:'21-79',bundleFormat:'gzip-base64-9-chunks'};
})(typeof window!=='undefined'?window:globalThis);
