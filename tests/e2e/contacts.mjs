import { chromium } from 'playwright';
const BASE = 'http://localhost:3100';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

/* tel: */
const tels = await page.$$eval('a[href^="tel:"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
console.log('tel hrefs =>', tels);

/* WhatsApp : encodage du message */
const was = await page.$$eval('a[href^="https://wa.me/"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
was.forEach((w) => console.log('wa href =>', w.slice(0, 90), '…'));
console.log('message générique décodé =>', JSON.stringify(decodeURIComponent((was[0] || '').split('?text=')[1] || '')));

/* mailto */
const mails = await page.$$eval('a[href^="mailto:"]', (as) => [...new Set(as.map((a) => a.getAttribute('href').split('?')[0]))]);
console.log('mailto hrefs =>', mails);

/* Formulaire -> popup WhatsApp */
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await page.locator('#demande').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.fill('#depart', 'Hôtel Lutetia, 45 bd Raspail, Paris');
await page.fill('#destination', 'Aéroport Paris-CDG, terminal 2E');
await page.fill('#date', '2026-10-02');
await page.fill('#heure', '06:30');
await page.selectOption('#passagers', '2');
await page.fill('#nom', 'Camille Durand');
await page.fill('#telephone', '06 98 76 54 32');
await page.fill('#informations', '2 valises, siège enfant');
const [popup] = await Promise.all([page.waitForEvent('popup'), page.click('button[type="submit"]')]);
const url = popup.url();
console.log('popup host =>', new URL(url).host + new URL(url).pathname);
console.log('--- message WhatsApp du formulaire ---');
console.log(decodeURIComponent(new URL(url).searchParams.get('text') || ''));
const status = await page.locator('#demande [aria-live="polite"]').innerText();
console.log('statut =>', status.slice(0, 90));
await browser.close();
