JK_createDecisionUnit({runtimeId:19,itemsGlobal:'JK_UNIT19_ITEMS',badge:'PART 2 · CH 1 · UNIT 3',shortLabel:'PART 2 · CH 1 · UNIT 3',answerTitle:'숙어 의미와 결합 형태를 함께 보고 답을 고르세요.',ruleHeadline:'표현 확인 → 숙어 의미 → 결합 패턴 → to-V',stableText:'to부정사 숙어 표현의 의미와 형태를 안정적으로 연결했습니다.',repairText:'단어 뜻만 보지 말고 교재에 제시된 「동사 + to-V」 숙어 단위로 기억합니다.',steps:[
{key:'expression',label:'숙어 표현',title:'어느 숙어 표현을 판정하고 있습니까?',targetField:'targetExpression',options:i=>i.expressionOptions},
{key:'meaning',label:'숙어 의미',title:'교재에서 이 표현의 핵심 의미는 무엇입니까?',targetField:'meaningAnswer',options:i=>i.meaningOptions},
{key:'pattern',label:'결합 패턴',title:'이 숙어의 고정 결합 형태는 무엇입니까?',targetField:'patternAnswer',options:[{value:'expressionToInfinitive',label:'동사 + to-V'},{value:'expressionGerund',label:'동사 + V-ing'}]},
{key:'form',label:'최종 형태',title:'빈칸의 최종 형태를 고르세요.',targetField:'formAnswer',last:true,options:[{value:'toInfinitive',label:'to-V'},{value:'gerund',label:'V-ing'}]}
]});