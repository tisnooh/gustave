import { chromium } from 'playwright';

const BASE = 'http://localhost:3100';
const widths = (process.argv[2] || "320,375,390,430,768,1024,1280,1440,1920").split(",").map(Number);

const browser = await chromium.launch();
let fail = 0;

for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);

  // parcours pour déclencher les révélations
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );

  // barre mobile : ne masque pas le dernier contenu (footer)
  const barCover =
    width < 768
      ? await page.evaluate(() => {
          const footer = document.querySelector('footer');
          const bar = document.querySelector('nav[aria-label="Actions de contact rapides"]');
          if (!footer || !bar) return 0;
          const b = bar.getBoundingClientRect();
          // le padding-bottom du footer doit compenser la hauteur de barre
          return Math.max(0, Math.round(b.height - parseFloat(getComputedStyle(footer).paddingBottom)));
        })
      : 0;

  const ok = overflow === 0 && errors.length === 0 && barCover === 0;
  if (!ok) fail++;
  console.log(
    `${String(width).padStart(4)}px  overflowX=${overflow}  barCover=${barCover}  consoleErrors=${errors.length}  ${ok ? 'OK' : 'À CORRIGER'}`,
  );
  errors.slice(0, 3).forEach((e) => console.log('     !', e.slice(0, 160)));
  await context.close();
}

/* Routes secondaires */
for (const route of ['/mentions-legales', '/confidentialite', '/route-inexistante']) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  const res = await page.goto(BASE + route, { waitUntil: 'networkidle' });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  const expected = route === '/route-inexistante' ? 404 : 200;
  const okCode = res.status() === expected;
  if (!okCode || overflow !== 0 || errors.length) fail++;
  console.log(
    `${route.padEnd(22)} status=${res.status()} (attendu ${expected})  overflowX=${overflow}  errors=${errors.length}  ${okCode && overflow === 0 && !errors.length ? 'OK' : 'À CORRIGER'}`,
  );
  await page.close();
}

await browser.close();
console.log(fail === 0 ? 'ALL WIDTHS & ROUTES OK' : `${fail} problème(s)`);
