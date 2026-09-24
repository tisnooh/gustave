import { chromium } from 'playwright';
const BASE = 'http://localhost:3100';
const browser = await chromium.launch();

/* 320 px — hero */
let p = await browser.newPage({ viewport: { width: 320, height: 700 } });
await p.goto(BASE, { waitUntil: 'networkidle' });
await p.waitForTimeout(1200);
await p.screenshot({ path: 'shots/final-320-hero.png' });
await p.close();

/* Desktop — formulaire enrichi + 404 */
p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(BASE, { waitUntil: 'networkidle' });
await p.waitForTimeout(900);
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.locator('#demande').scrollIntoViewIfNeeded();
await p.waitForTimeout(800);
await p.locator('#demande').screenshot({ path: 'shots/final-booking.png' });
await p.goto(BASE + '/page-inconnue', { waitUntil: 'networkidle' });
await p.waitForTimeout(700);
await p.screenshot({ path: 'shots/final-404.png' });
await p.close();
await browser.close();
console.log('final shots ok');
