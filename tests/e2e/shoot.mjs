import { chromium } from 'playwright';

const BASE = 'http://localhost:3100';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 834, height: 1112 },
];

const browser = await chromium.launch();

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  // Hero (viewport)
  await page.screenshot({ path: `shots/${vp.name}-hero.png` });

  // Parcours lent pour déclencher les révélations
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, h);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });

  await page.screenshot({ path: `shots/${vp.name}-full.png`, fullPage: true });

  // Débordement horizontal ?
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );

  console.log(`${vp.name}: overflowX=${overflow}px consoleErrors=${errors.length}`);
  errors.slice(0, 6).forEach((e) => console.log('   !', e.slice(0, 200)));
  await context.close();
}

await browser.close();
console.log('done');
