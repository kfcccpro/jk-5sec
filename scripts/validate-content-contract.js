const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
global.window = global;

function load(relativePath) {
  const filename = path.join(root, relativePath);
  vm.runInThisContext(fs.readFileSync(filename, "utf8"), { filename });
}

load("data/content-contract.js");
load("js/unit1-data.js");
load("js/unit2-data.js");
load("js/unit3-data.js");
load("js/unit4-data.js");
load("js/unit5-data.js");
load("js/unit6-data.js");
load("js/unit7-data.js");
load("js/unit8-data.js");
load("js/unit9-data.js");
load("js/unit10-data.js");
load("js/unit11-data.js");
load("js/unit12-data.js");

const contract = global.JK_CONTENT_CONTRACT;
const errors = [];
const ids = new Set();
const bannedSourceKeys = new Set(["sourceText", "fullText", "verbatimText", "textbookText"]);

function typeMatches(value, expected) {
  if (expected === "array") return Array.isArray(value);
  if (expected === "boolean") return typeof value === "boolean";
  if (expected === "string") return typeof value === "string" && value.length > 0;
  return typeof value === expected;
}

function scanBannedKeys(value, pathLabel) {
  if (!value || typeof value !== "object") return;
  Object.entries(value).forEach(([key, child]) => {
    if (bannedSourceKeys.has(key)) errors.push(`${pathLabel}: banned public-source key ${key}`);
    scanBannedKeys(child, `${pathLabel}.${key}`);
  });
}

if (!contract || contract.version !== "1.9.0") errors.push("content contract version 1.9.0 is required");
if (contract?.repositoryPolicy?.sourceTextStorage !== "reference-only") errors.push("sourceTextStorage must stay reference-only");
if (contract?.repositoryPolicy?.fullTextAllowed !== false) errors.push("fullTextAllowed must stay false in the public repository");
scanBannedKeys(contract, "contract");

Object.entries(contract.collections).filter(([, collection]) => collection.status === "implemented").forEach(([runtimeKey, collection]) => {
  const runtimeUnit = Number(runtimeKey);
  const items = global[collection.globalName];
  const scope = `P${collection.part} CH${collection.chapter} U${collection.unit}`;
  if (!Array.isArray(items) || items.length === 0) {
    errors.push(`${scope}: ${collection.globalName} must be a non-empty array`);
    return;
  }
  if (collection.source?.publicStorage !== "reference-only" || collection.source?.fullTextStored !== false) errors.push(`${scope}: source boundary must be reference-only with fullTextStored=false`);
  items.forEach((item, index) => {
    const label = `${scope} item ${index + 1}`;
    Object.entries(contract.sharedItemSchema).forEach(([field, expected]) => {
      if (!typeMatches(item[field], expected)) errors.push(`${label}: invalid or missing shared field ${field}`);
    });
    Object.entries(collection.decisionSchema || {}).forEach(([field, expected]) => {
      if (!typeMatches(item[field], expected)) errors.push(`${label}: invalid or missing UNIT-specific field ${field}`);
    });
    if (typeof item.id === "string") {
      if (!item.id.startsWith(`u${runtimeUnit}-`)) errors.push(`${label}: id must start with runtime prefix u${runtimeUnit}-`);
      if (ids.has(item.id)) errors.push(`${label}: duplicate id ${item.id}`);
      ids.add(item.id);
    }
    if (Array.isArray(item.choices) && !item.choices.includes(item.answer)) errors.push(`${label}: answer must be one of choices`);
    scanBannedKeys(item, label);
  });
});

if (errors.length) {
  console.error("CONTENT CONTRACT CHECK FAILED");
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

const implementedCount = Object.values(contract.collections).filter(collection => collection.status === "implemented").length;
console.log(`CONTENT CONTRACT CHECK PASS: ${ids.size} items across ${implementedCount} implemented lessons`);
