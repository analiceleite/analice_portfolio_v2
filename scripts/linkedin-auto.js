/* eslint-disable no-console */
/**
 * LinkedIn automation (Playwright).
 * WARNING: Automating LinkedIn profile edits violates LinkedIn's Terms of Use
 * and can lead to account restriction/suspension. Use at your own risk.
 *
 * First run: a browser opens. Log in to LinkedIn manually. The session is
 * saved in .linkedin-profile/, so later runs reuse it without logging in again.
 *
 * Usage:
 *   node scripts/linkedin-auto.js                 # updates headline + about-pt
 *   node scripts/linkedin-auto.js --section about-pt
 *   node scripts/linkedin-auto.js --section about-pt --dry
 */
const fs = require('fs');
const path = require('path');

const { chromium } = require('playwright');

const LINKEDIN = 'https://www.linkedin.com';
const PROFILE_URL = `${LINKEDIN}/in/analice-leite`;
const USER_DATA_DIR = path.join(__dirname, '..', '.linkedin-profile');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'linkedin');
const HEADLESS = false; // keep visible so LinkedIn's checks are less triggered

// ---------- content loading ----------
function parseFrontmatter(content) {
  if (!content.startsWith('---')) {
    return { data: {}, body: content };
  }
  const end = content.indexOf('\n---', 3);
  if (end === -1) {
    return { data: {}, body: content };
  }
  const raw = content.slice(3, end).trim();
  const body = content.slice(end + 4).trim();
  const data = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) {
      data[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
    }
  }
  return { data, body };
}

function loadSections() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.md'))
    .sort()
    .map(file => {
      const { data, body } = parseFrontmatter(
        fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'),
      );
      return {
        file,
        section: data.section || path.basename(file, '.md'),
        title: data.title || '',
        url: data.url || '',
        body,
      };
    });
}

// ---------- helpers ----------
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

async function gotoWithRetry(page, url, options = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await page.goto(url, options);
      return;
    } catch (error) {
      lastError = error;
      console.warn(`Falha ao abrir ${url} (tentativa ${attempt}/${attempts}): ${error.message}`);
      await sleep(3000 * attempt);
    }
  }
  throw lastError;
}

async function pasteText(page, text) {
  // Put text on the system clipboard then use keyboard paste (robust for rich editors)
  const { execSync } = require('child_process');
  const b64 = Buffer.from(text, 'utf16le').toString('base64');
  execSync(
    `powershell -NoProfile -Command "[Text.Encoding]::Unicode.GetString([Convert]::FromBase64String('${b64}')) | Set-Clipboard"`,
  );
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');
}

async function replaceProseMirrorText(page, text) {
  const editor = page.locator('div[contenteditable="true"].ProseMirror').first();
  await editor.waitFor({ state: 'visible', timeout: 15000 });
  await editor.click();
  await sleep(rnd(400, 800));
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await sleep(rnd(200, 400));
  await pasteText(page, text);
}

async function isLoggedIn(page) {
  const cookies = await page.context().cookies(LINKEDIN);
  if (cookies.some(cookie => cookie.name === 'li_at')) {
    return true;
  }

  await gotoWithRetry(page, PROFILE_URL, { waitUntil: 'domcontentloaded' });
  await sleep(rnd(1500, 2500));
  const url = page.url();
  if (url.includes('/login') || url.includes('/checkpoint') || url.includes('/uas/login')) {
    return false;
  }
  // logged-in users see the global nav "feed" or a profile avatar
  const hasNav = await page.$('header.global-nav, #global-nav, .global-nav__me');
  return !!hasNav;
}

async function ensureLogin(context) {
  const page = await context.newPage();
  const ok = await isLoggedIn(page);
  if (ok) {
    await page.close();
    return true;
  }
  console.log(
    '\n>>> Faça login no LinkedIn na janela aberta. O script vai detectar automaticamente.',
  );
  console.log('>>> Não precisa pressionar Enter. Aguarde até 3 minutos.');

  const deadline = Date.now() + 180000;
  let again = false;
  while (Date.now() < deadline && !again) {
    await sleep(3000);
    again = await isLoggedIn(page);
  }

  await page.close();
  if (!again) {
    throw new Error('Login não detectado após 3 minutos. Rode novamente quando estiver logada.');
  }
  return true;
}

// ---------- section handlers ----------
async function editHeadline(page, text, dry) {
  await gotoWithRetry(page, `${PROFILE_URL}/`, { waitUntil: 'domcontentloaded' });
  await sleep(rnd(2500, 4000));
  // Current LinkedIn UI exposes the intro edit button as an unlabeled pencil icon.
  // With the fixed viewport above, this is the visible pencil in the profile header.
  await page.mouse.click(826, 314);
  await sleep(rnd(2500, 4000));
  if (dry) {
    const current = await page
      .locator('div[contenteditable="true"].ProseMirror')
      .first()
      .innerText();
    console.log('[dry] Headline atual:', current);
    console.log('[dry] Headline nova:', text);
    return;
  }
  await replaceProseMirrorText(page, text);
  await sleep(rnd(800, 1200));
  await saveIfPresent(page);
}

async function editAbout(page, text, dry) {
  await gotoWithRetry(page, `${PROFILE_URL}/`, { waitUntil: 'domcontentloaded' });
  await sleep(rnd(2500, 4000));
  // Current LinkedIn UI exposes the About edit button as an unlabeled pencil icon.
  // With the fixed viewport above, this is the visible pencil in the About card.
  await page.mouse.click(826, 861);
  await sleep(rnd(2500, 4000));
  if (dry) {
    const current = await page
      .locator('div[contenteditable="true"].ProseMirror')
      .first()
      .innerText();
    console.log('[dry] About atual:', current.slice(0, 220));
    console.log('[dry] About novo:', text.slice(0, 220));
    return;
  }
  await replaceProseMirrorText(page, text);
  await sleep(rnd(800, 1200));
  await saveIfPresent(page);
}

async function saveIfPresent(page) {
  const save = page.getByRole('button', { name: /salvar|save/i }).first();
  if ((await save.count()) && (await save.isVisible())) {
    await save.click();
    await sleep(rnd(1500, 2500));
    console.log('  ✔ Salvo.');
  } else {
    console.log('  (não achei botão Salvar automático — confira e salve manualmente)');
  }
}

// ---------- main ----------
(async () => {
  const sections = loadSections();
  const args = process.argv.slice(2);
  const dry = args.includes('--dry');
  const sectionArg = args.includes('--section') ? args[args.indexOf('--section') + 1] : null;

  const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: HEADLESS,
    viewport: { width: 1280, height: 900 },
    locale: 'pt-BR',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  await ensureLogin(context);

  const page = await context.newPage();

  const runSection = async key => {
    const s = sections.find(x => x.section === key || x.file === key || x.file === `${key}.md`);
    if (!s) {
      console.error(`Seção não encontrada: ${key}`);
      return;
    }
    console.log(`\n=== ${s.title} (${s.section}) ===`);
    if (s.section.startsWith('headline')) {
      await editHeadline(page, s.body, dry);
    } else if (s.section.startsWith('about')) {
      await editAbout(page, s.body, dry);
    } else {
      console.log(
        'Seção complexa (experiência/skills/featured): abrindo a página para edição manual.',
      );
      await gotoWithRetry(page, s.url || `${PROFILE_URL}/edit/`, {
        waitUntil: 'domcontentloaded',
      });
      await sleep(rnd(1500, 2500));
      const { execSync } = require('child_process');
      const b64 = Buffer.from(s.body, 'utf16le').toString('base64');
      execSync(
        `powershell -NoProfile -Command "[Text.Encoding]::Unicode.GetString([Convert]::FromBase64String('${b64}')) | Set-Clipboard"`,
      );
      console.log('  Conteúdo copiado para o clipboard (Ctrl+V).');
    }
  };

  if (sectionArg) {
    await runSection(sectionArg);
  } else {
    // Default: only update the public PT profile essentials.
    // about-en stays available via --section about-en, but is not run automatically.
    const auto = sections.filter(s => ['headline', 'about-pt'].includes(s.section));
    for (const s of auto) {
      await runSection(s.section);
      await sleep(rnd(3000, 6000)); // pause between actions to look human
    }
  }

  await page.close();
  await context.close();
  console.log('\nConcluído. Fechando navegador.');
})();
