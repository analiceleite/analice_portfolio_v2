const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync, exec } = require('child_process');

const sourceDir = path.join(__dirname, '..', 'content', 'linkedin');

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
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) {
      data[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
    }
  }
  return { data, body };
}

function copyToClipboard(text) {
  // Windows command lines have a small size limit; use a temp file for long LinkedIn blocks.
  const tmp = path.join(os.tmpdir(), `linkedin-${Date.now()}.txt`);
  fs.writeFileSync(tmp, text, 'utf8');
  try {
    execSync(
      `powershell -NoProfile -Command "Get-Content -LiteralPath '${tmp.replace(
        /'/g,
        '\'\'',
      )}' -Raw | Set-Clipboard"`,
    );
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

function openBrowser(url) {
  // `start` opens the default browser; empty title arg required when URL is quoted
  exec(`start "" "${url}"`, { shell: 'cmd.exe' });
}

function listSections() {
  if (!fs.existsSync(sourceDir)) {
    process.stderr.write(`LinkedIn content directory not found: ${sourceDir}\n`);
    process.exit(1);
  }
  const files = fs
    .readdirSync(sourceDir)
    .filter(f => f.endsWith('.md'))
    .sort();
  const sections = files.map(file => {
    const { data, body } = parseFrontmatter(fs.readFileSync(path.join(sourceDir, file), 'utf8'));
    return {
      file,
      section: data.section || path.basename(file, '.md'),
      title: data.title || '',
      url: data.url || '',
      body,
    };
  });
  return sections;
}

function printMenu(sections) {
  process.stdout.write('Seções disponíveis no LinkedIn (fonte: content/linkedin):\n\n');
  sections.forEach((s, i) => {
    process.stdout.write(`  ${i + 1}. [${s.section}] ${s.title}\n     ${s.url}\n`);
  });
  process.stdout.write('\nUso:\n');
  process.stdout.write(
    '  node scripts/sync-linkedin.js           # menu interativo (seção por seção)\n',
  );
  process.stdout.write('  node scripts/sync-linkedin.js --list    # lista seções e URLs\n');
  process.stdout.write(
    '  node scripts/sync-linkedin.js --copy <section>   # copia o corpo p/ clipboard\n',
  );
  process.stdout.write(
    '  node scripts/sync-linkedin.js --open <section>   # copia e abre o browser\n',
  );
}

function copySection(sections, key) {
  const s = sections.find(x => x.section === key || x.file === key || x.file === `${key}.md`);
  if (!s) {
    process.stderr.write(
      `Seção não encontrada: ${key}\nSeções: ${sections.map(x => x.section).join(', ')}\n`,
    );
    process.exit(1);
  }
  copyToClipboard(s.body);
  process.stdout.write(`Copiado para o clipboard: ${s.title} (${s.section})\n`);
  process.stdout.write(`URL de edição: ${s.url}\n`);
  return s;
}

function interactive(sections) {
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  let i = 0;

  function next() {
    if (i >= sections.length) {
      process.stdout.write('\nTodas as seções processadas. Boa sorte na vaga Pleno!\n');
      rl.close();
      return;
    }
    const s = sections[i];
    process.stdout.write(`\n[${i + 1}/${sections.length}] ${s.title}\n  URL: ${s.url}\n`);
    copyToClipboard(s.body);
    process.stdout.write('  Copiado. Cole no LinkedIn (Ctrl+V). Abrir no navegador? (s/N): ');
    rl.question('', answer => {
      if (answer.trim().toLowerCase() === 's' || answer.trim().toLowerCase() === 'y') {
        openBrowser(s.url);
      }
      i += 1;
      next();
    });
  }
  next();
}

// --- main ---
const args = process.argv.slice(2);
const sections = listSections();

if (args.includes('--list') || (args.length === 0 && process.stdout.isTTY === false)) {
  printMenu(sections);
} else if (args[0] === '--copy' && args[1]) {
  copySection(sections, args[1]);
} else if (args[0] === '--open' && args[1]) {
  const s = copySection(sections, args[1]);
  openBrowser(s.url);
  process.stdout.write('Navegador aberto.\n');
} else if (args.length === 0) {
  interactive(sections);
} else {
  printMenu(sections);
}
