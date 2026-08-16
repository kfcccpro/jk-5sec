JK_createDecisionUnit({runtimeId:22,itemsGlobal:'JK_UNIT22_ITEMS',badge:'PART 2 · CH 1 · UNIT 6',shortLabel:'PART 2 · CH 1 · UNIT 6',answerTitle:'to부정사를 부정하는 부정어의 위치를 고르세요.',ruleHeadline:'부정어 확인 → to 앞에 놓기 → not/never + to-V',stableText:'부정어를 to 앞에 두어 to부정사 전체를 안정적으로 부정했습니다.',repairText:'동사만 보지 말고 to-V를 하나의 덩어리로 보고, 그 덩어리 앞에 not/never를 놓습니다.',steps:[
{key:'negator',label:'부정어 확인',title:'이 문장에서 필요한 부정어는 무엇입니까?',targetField:'negator',options:i=>i.negatorOptions},
{key:'placement',label:'위치 판단',title:'to부정사 전체를 부정하려면 부정어를 어디에 둡니까?',targetField:'placementAnswer',options:[{value:'before-to',label:'to 앞'},{value:'after-to',label:'to 뒤'}]},
{key:'form',label:'형태 완성',title:'교재의 판단 순서에 맞는 부정형을 고르세요.',targetField:'formAnswer',last:true,options:i=>i.choices.map(v=>({value:v,label:v}))}
]});