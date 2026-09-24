import { chromium } from 'playwright';

const BASE = 'http://localhost:3100';
const browser = await chromium.launch();

async function prep(page) {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 350) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 45));
    }
    await new Promise((r) => setTimeout(r, 500));
  });
}

/* Desktop */
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await prep(page);

const sections = [
  ['services', '#services'],
  ['coverage', '#destinations'],
  ['transferts', '#transferts'],
  ['story', '#a-propos'],
  ['contact', '#contact'],
];
for (const [name, sel] of sections) {
  await page.locator(sel).scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.locator(sel).screenshot({ path: `shots/sec-${name}.png` });
}

/* Header après scroll */
await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(700);
await page.screenshot({ path: 'shots/sec-header-scrolled.png', clip: { x: 0, y: 0, width: 1440, height: 220 } });

/* Bas de page : CTA final + footer */
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(900);
await page.screenshot({ path: 'shots/sec-bottom.png' });
await ctx.close();

/* Mobile */
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mpage = await mctx.newPage();
await prep(mpage);
await mpage.evaluate(() => window.scrollTo(0, 0));
await mpage.waitForTimeout(600);
await mpage.screenshot({ path: 'shots/mob-hero.png' });
await mpage.locator('#demande').scrollIntoViewIfNeeded();
await mpage.waitForTimeout(600);
await mpage.screenshot({ path: 'shots/mob-booking.png' });
await mpage.locator('#contact').scrollIntoViewIfNeeded();
await mpage.waitForTimeout(600);
await mpage.screenshot({ path: 'shots/mob-contact.png' });
await mctx.close();

await browser.close();
console.log('sections done');
