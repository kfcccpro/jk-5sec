JK_createDecisionUnit({runtimeId:18,itemsGlobal:'JK_UNIT18_ITEMS',badge:'PART 2 · CH 1 · UNIT 2',shortLabel:'PART 2 · CH 1 · UNIT 2',answerTitle:'본동사 뒤 목적어 형태를 보고 답을 고르세요.',ruleHeadline:'본동사 → 목록 확인 → 목적어 역할 → to-V',stableText:'to-V 목적어 동사와 형태를 안정적으로 연결했습니다.',repairText:'동사 뒤 행동 내용이 목적어라면 먼저 교재의 to-V 목적어 동사 목록인지 확인합니다.',steps:[
{key:'verb',label:'본동사',title:'to-V 목적어 여부를 결정하는 본동사는 무엇입니까?',targetField:'targetVerb',options:i=>i.verbOptions},
{key:'member',label:'목록 확인',title:'이 동사는 교재의 「목적으로 to부정사만을 취하는 타동사」 목록에 해당합니까?',targetField:'listMemberAnswer',options:[{value:'yes',label:'해당한다'},{value:'no',label:'해당하지 않는다'}]},
{key:'role',label:'문장 역할',title:'빈칸의 동사형은 본동사의 무엇 역할입니까?',targetField:'roleAnswer',options:[{value:'directObject',label:'목적어'},{value:'objectComplement',label:'목적격 보어'}]},
{key:'form',label:'최종 형태',title:'교재 기준으로 최종 형태를 고르세요.',targetField:'formAnswer',last:true,options:[{value:'toInfinitive',label:'to-V'},{value:'gerund',label:'V-ing'}]}
]});