(function attachContentContract(root) {
  root.JK_CONTENT_CONTRACT = {
    version: "1.0.0",
    repositoryPolicy: {
      publicRepository: true,
      sourceTextStorage: "reference-only",
      fullTextAllowed: false,
      derivedPracticeAllowed: true
    },
    sharedItemSchema: {
      id: "string",
      prompt: "string",
      choices: "array",
      answer: "string",
      rule: "string",
      errorCode: "string"
    },
    linking: {
      sourceToAuthorRule: "collection.authorRuleRef",
      authorRuleToPractice: "collection.globalName",
      practiceToReview: "item.errorCode",
      reviewToDelayedReview: "item.errorCode",
      delayedReviewCadence: "policy-defined-later"
    },
    collections: {
      1: {
        status: "implemented",
        part: 1,
        chapter: 1,
        unit: 1,
        globalName: "JK_UNIT1_ITEMS",
        authorRuleRef: "rule:p1-c1-u1-finite-verb-count",
        source: { ref: "textbook:p1-c1-u1", publicStorage: "reference-only", fullTextStored: false },
        decisionSchema: {
          tokens: "array",
          finiteVerbIndices: "array",
          connectorIndices: "array",
          omittedConnector: "boolean",
          decisionOptions: "array",
          decisionAnswer: "string"
        },
        review: { keyFrom: "errorCode", mode: "derived-practice-family" },
        delayedReview: { keyFrom: "errorCode", status: "contract-defined-not-scheduled" }
      },
      2: {
        status: "implemented",
        part: 1,
        chapter: 1,
        unit: 2,
        globalName: "JK_UNIT2_ITEMS",
        authorRuleRef: "rule:p1-c1-u2-object-active-passive",
        source: { ref: "textbook:p1-c1-u2", publicStorage: "reference-only", fullTextStored: false },
        decisionSchema: {
          positionAnswer: "string",
          objectAnswer: "string",
          voiceAnswer: "string"
        },
        review: { keyFrom: "errorCode", mode: "derived-practice-family" },
        delayedReview: { keyFrom: "errorCode", status: "contract-defined-not-scheduled" }
      },
      3: {
        status: "implemented",
        part: 1,
        chapter: 1,
        unit: 3,
        globalName: "JK_UNIT3_ITEMS",
        authorRuleRef: "rule:p1-c1-u3-participle-vs-passive",
        source: { ref: "textbook:p1-c1-u3", publicStorage: "reference-only", fullTextStored: false },
        decisionSchema: {
          positionAnswer: "string",
          objectAnswer: "string",
          formAnswer: "string"
        },
        review: { keyFrom: "errorCode", mode: "derived-practice-family" },
        delayedReview: { keyFrom: "errorCode", status: "contract-defined-not-scheduled" }
      },
      4: {
        status: "planned",
        part: 1,
        chapter: 1,
        unit: 4,
        globalName: "JK_UNIT4_ITEMS",
        authorRuleRef: "define-with-unit4-analysis",
        source: { ref: "textbook:p1-c1-u4", publicStorage: "reference-only", fullTextStored: false },
        decisionSchema: null,
        review: { keyFrom: "errorCode", mode: "define-with-unit4-analysis" },
        delayedReview: { keyFrom: "errorCode", status: "define-with-unit4-analysis" }
      }
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
