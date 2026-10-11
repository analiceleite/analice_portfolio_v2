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
 *   node scripts/linkedin-auto.js                 # menu interativo
 *   node scripts/linkedin-auto.js --section about-pt
 *   node scripts/linkedin-auto.js --section about-pt --dry
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

async function humanType(page, selector, text) {
  const el = await page.waitForSelector(selector, { timeout: 15000 });
  await el.click();
  await sleep(rnd(200, 500));
  await el.fill(''); // clear
  await sleep(rnd(200, 400));
  // type in small chunks with variable delay to mimic a person
  const chunks = text.match(/.{1,8}/gs) || [text];
  for (const chunk of chunks) {
    await el.type(chunk, { delay: rnd(25, 90) });
    await sleep(rnd(10, 60));
  }
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

async function isLoggedIn(page) {
  await page.goto(LINKEDIN, { waitUntil: 'domcontentloaded' });
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
    '\n>>> Faça login no LinkedIn na janela aberta. O script espera até detectar o login.',
  );
  console.log('>>> Depois de logar, volte aqui e pressione Enter.');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  await new Promise(resolve =>
    rl.question('', () => {
      rl.close();
      resolve();
    }),
  );
  // re-check
  const again = await isLoggedIn(page);
  await page.close();
  if (!again) {
    console.warn('Ainda não detectei login. Vamos tentar seguir de qualquer forma.');
  }
  return true;
}

// ---------- section handlers ----------
async function editHeadline(page, text, dry) {
  // Headline lives inside the "Edit intro" modal (top card -> pencil -> Headline field)
  await page.goto(`${PROFILE_URL}/edit/`, { waitUntil: 'domcontentloaded' });
  await sleep(rnd(2000, 3000));
  // LinkedIn may redirect to the profile page; open the intro edit modal
  const pencil = await page.$('button[aria-label*="Edit intro" i], button[aria-label*="Editar" i]');
  if (!pencil) {
    // Fallback: go straight to the edit URL
    await page.goto(`${PROFILE_URL}/edit/`, { waitUntil: 'domcontentloaded' });
    await sleep(rnd(1500, 2500));
  } else {
    await pencil.click();
    await sleep(rnd(1500, 2500));
  }
  const headlineSel = 'input[name*="headline" i], textarea[name*="headline" i], #headline';
  if (dry) {
    console.log('[dry] Selecionaria headline:', headlineSel);
    return;
  }
  await humanType(page, headlineSel, text);
  await sleep(rnd(800, 1200));
  await saveIfPresent(page);
}

async function editAbout(page, text, dry) {
  await page.goto(`${PROFILE_URL}/edit/summary/`, { waitUntil: 'domcontentloaded' });
  await sleep(rnd(2000, 3000));
  // The about editor is a rich text area; paste is most reliable
  const sel =
    'textarea[name*="summary" i], div[contenteditable="true"][data-testid*="about" i], #about-edit-intro';
  if (dry) {
    console.log('[dry] Selecionaria about:', sel);
    return;
  }
  const el = await page.$(sel);
  if (el) {
    await el.click();
  } else {
    // try the first contenteditable on the page
    const ce = await page.$('div[contenteditable="true"]');
    if (ce) {
      await ce.click();
    }
  }
  await sleep(rnd(500, 900));
  await page.keyboard.press('Control+A');
  await sleep(rnd(200, 400));
  await pasteText(page, text);
  await sleep(rnd(800, 1200));
  await saveIfPresent(page);
}

async function saveIfPresent(page) {
  const save = await page.$(
    'button[aria-label*="Save" i], button[aria-label*="Salvar" i], button[data-control-name="save"] button',
  );
  if (save) {
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
      await page.goto(s.url || `${PROFILE_URL}/edit/`, { waitUntil: 'domcontentloaded' });
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
    // interactive: only the auto-editable ones in sequence
    const auto = sections.filter(
      s => s.section.startsWith('headline') || s.section.startsWith('about'),
    );
    for (const s of auto) {
      await runSection(s.section);
      await sleep(rnd(3000, 6000)); // pause between actions to look human
    }
  }

  await page.close();
  await context.close();
  console.log('\nConcluído. Fechando navegador.');
})();
