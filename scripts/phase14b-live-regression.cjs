const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const baseURL = process.env.JK_BASE_URL || 'http://127.0.0.1:4173';
const outDir = path.resolve('artifacts/phase14b');
fs.mkdirSync(outDir, { recursive: true });

const result = {
  phase: '14B',
  target: baseURL,
  startedAt: new Date().toISOString(),
  status: 'RUNNING',
  checks: [],
  pageErrors: [],
  consoleErrors: []
};

function ok(name, detail = '') {
  result.checks.push({ name, status: 'PASS', detail });
  console.log(`PASS: ${name}${detail ? ` — ${detail}` : ''}`);
}
function fail(name, detail = '') {
  result.checks.push({ name, status: 'FAIL', detail });
  console.error(`FAIL: ${name}${detail ? ` — ${detail}` : ''}`);
}
async function clickChoice(page, answer) {
  const choices = page.locator('.choice');
  const count = await choices.count();
  assert.ok(count >= 2, 'choice buttons missing');
  for (let i = 0; i < count; i++) {
    const text = (await choices.nth(i).innerText()).trim();
    if (text === answer) {
      await choices.nth(i).click();
      return;
    }
  }
  throw new Error(`answer choice not found: ${answer}`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  page.on('pageerror', e => result.pageErrors.push(String(e.message || e)));
  page.on('console', msg => { if (msg.type() === 'error') result.consoleErrors.push(msg.text()); });

  try {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.locator('#pinInput').waitFor({ state: 'visible', timeout: 15000 });
    ok('login screen loads');

    await page.locator('#pinInput').fill('1111');
    await page.locator('#studentLogin').click();
    await page.locator('#loginError').filter({ hasText: 'PIN이 맞지 않습니다.' }).waitFor({ timeout: 5000 });
    ok('wrong student PIN is rejected');

    await page.locator('#pinInput').fill('8081');
    await page.locator('#studentLogin').click();
    await page.waitForFunction(() => window.JK_PHASE92_READY_DONE === true, null, { timeout: 30000 });
    await page.locator('#unit79Btn').waitFor({ state: 'visible', timeout: 15000 });
    const unitCount = await page.locator('button[id^="unit"][id$="Btn"]').count();
    assert.equal(unitCount, 79, `expected 79 runtime buttons, got ${unitCount}`);
    ok('student PIN login and full runtime registry', `${unitCount} runtimes`);
    await page.screenshot({ path: path.join(outDir, '01-student-home.png'), fullPage: true });

    await page.locator('#unit1Btn').click();
    await page.locator('.task-kicker').filter({ hasText: 'Cold Attempt' }).waitFor({ timeout: 10000 });
    ok('legacy runtime 1 opens');
    await page.locator('#homeBtn').click();
    await page.locator('#unit20Btn').waitFor({ state: 'visible' });

    await page.locator('#unit20Btn').click();
    await page.locator('.task-kicker').filter({ hasText: 'Cold Attempt' }).waitFor({ timeout: 10000 });
    ok('legacy runtime 20 opens');
    await page.locator('#homeBtn').click();
    await page.locator('#unit21Btn').waitFor({ state: 'visible' });

    await page.locator('#unit21Btn').click();
    for (let itemNo = 0; itemNo < 5; itemNo++) {
      await page.locator('.task-kicker').filter({ hasText: 'Cold Attempt' }).waitFor({ timeout: 10000 });
      const answer = await page.evaluate(() => window.unit21Items[window.unit21Session.itemIndex].answer);
      await clickChoice(page, answer);
      await page.locator('#primaryAction').click();

      for (let step = 0; step < 4; step++) {
        const ev = page.locator('.evidence-choice');
        await ev.first().waitFor({ state: 'visible', timeout: 10000 });
        await ev.first().click();
        await page.locator('#primaryAction').click();
      }

      await page.locator('.task-kicker').filter({ hasText: '5초 Rule' }).waitFor({ timeout: 10000 });
      await page.locator('#primaryAction').click();
      await page.locator('.task-kicker').filter({ hasText: '원문 재도전' }).waitFor({ timeout: 10000 });
      await clickChoice(page, answer);
      await page.locator('#primaryAction').click();
      if (itemNo < 4) {
        await page.locator('#primaryAction').filter({ hasText: '다음 문제' }).waitFor({ timeout: 10000 });
        await page.locator('#primaryAction').click();
      }
    }
    await page.locator('.task-title').filter({ hasText: '5문항 판단 결과' }).waitFor({ timeout: 10000 });
    ok('new runtime 21 completes full 5-item interaction loop');
    await page.screenshot({ path: path.join(outDir, '02-runtime21-complete.png'), fullPage: true });

    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('jk5sec_state_v2') || '{}'));
    assert.ok((saved.unit21Runs || 0) >= 1, 'unit21Runs was not persisted');
    assert.ok(Array.isArray(saved.completedUnits) && saved.completedUnits.includes(21), 'completedUnits missing 21');
    ok('runtime 21 learning state persists', `unit21Runs=${saved.unit21Runs}`);

    await page.locator('#primaryAction').click();
    await page.locator('#unit79Btn').waitFor({ state: 'visible', timeout: 10000 });

    for (const n of [78, 79]) {
      await page.locator(`#unit${n}Btn`).click();
      await page.locator('.task-kicker').filter({ hasText: 'Cold Attempt' }).waitFor({ timeout: 10000 });
      const choiceCount = await page.locator('.choice').count();
      assert.ok(choiceCount >= 2, `runtime ${n} choices missing`);
      ok(`final mixed runtime ${n} opens`, `${choiceCount} choices`);
      await page.locator('#homeBtn').click();
      await page.locator('#unit79Btn').waitFor({ state: 'visible', timeout: 10000 });
    }

    await page.locator('#logoutBtn').click();
    await page.locator('#pinInput').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('#pinInput').fill('2007');
    await page.locator('#adminLogin').click();
    await page.locator('h1').filter({ hasText: '학습 관리' }).waitFor({ timeout: 10000 });
    ok('admin PIN login works');
    await page.screenshot({ path: path.join(outDir, '03-admin.png'), fullPage: true });

    const review = await context.newPage();
    review.on('pageerror', e => result.pageErrors.push(`review: ${String(e.message || e)}`));
    review.on('console', msg => { if (msg.type() === 'error') result.consoleErrors.push(`review: ${msg.text()}`); });
    await review.goto(`${baseURL}/?review=1`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await review.locator('h1').filter({ hasText: '검수 모드' }).waitFor({ timeout: 10000 });
    ok('review mode loads');
    await review.screenshot({ path: path.join(outDir, '04-review-mode.png'), fullPage: true });

    const criticalConsoleErrors = result.consoleErrors.filter(x => !x.includes('favicon'));
    assert.deepEqual(result.pageErrors, [], `page errors: ${result.pageErrors.join(' | ')}`);
    assert.deepEqual(criticalConsoleErrors, [], `console errors: ${criticalConsoleErrors.join(' | ')}`);
    ok('no browser page/console errors');

    result.status = 'PASS';
  } catch (e) {
    result.status = 'FAIL';
    result.failure = String(e.stack || e);
    fail('live interaction regression', String(e.message || e));
    try { await page.screenshot({ path: path.join(outDir, '99-failure.png'), fullPage: true }); } catch {}
    process.exitCode = 1;
  } finally {
    result.finishedAt = new Date().toISOString();
    fs.writeFileSync(path.join(outDir, 'result.json'), JSON.stringify(result, null, 2));
    await browser.close();
  }
})();
