import { chromium } from 'playwright';
const BASE = 'http://localhost:3100';
const browser = await chromium.launch();

/* Menu mobile ouvert */
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await m.goto(BASE, { waitUntil: 'networkidle' });
await m.waitForTimeout(800);
await m.click('button[aria-controls="menu-mobile"]');
await m.waitForTimeout(900);
await m.screenshot({ path: 'shots/mob-menu.png' });
await m.close();

/* Hover services + validation formulaire (desktop) */
const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(BASE, { waitUntil: 'networkidle' });
await p.waitForTimeout(800);
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.locator('#services').scrollIntoViewIfNeeded();
await p.waitForTimeout(800);
await p.locator('#services li').nth(1).hover();
await p.waitForTimeout(900);
await p.screenshot({ path: 'shots/desk-services-hover.png' });

/* Formulaire : soumission vide -> erreur */
await p.locator('#demande').scrollIntoViewIfNeeded();
await p.waitForTimeout(500);
await p.click('button[type="submit"]');
await p.waitForTimeout(400);
const err = await p.locator('#demande [aria-live="polite"]').innerText();
console.log('validation vide =>', JSON.stringify(err));

/* Formulaire rempli : placeholders -> message config */
await p.fill('#depart', 'Hôtel Lutetia, 45 bd Raspail');
await p.fill('#destination', 'Aéroport Paris-CDG, terminal 2E');
await p.fill('#date', '2026-10-02');
await p.fill('#heure', '06:30');
await p.selectOption('#passagers', '2');
await p.click('button[type="submit"]');
await p.waitForTimeout(500);
const msg = await p.locator('#demande [aria-live="polite"]').innerText();
console.log('submission placeholders =>', JSON.stringify(msg));
await p.screenshot({ path: 'shots/desk-booking-filled.png' });

/* Liens placeholders : aucun href mort */
const deadLinks = await p.evaluate(() =>
  Array.from(document.querySelectorAll('a')).filter((a) => !a.getAttribute('href')).length
);
console.log('liens sans href (spans attendus = 0 ici, ce sont des <span>) :', deadLinks);
await p.close();
await browser.close();
console.log('interactions done');
