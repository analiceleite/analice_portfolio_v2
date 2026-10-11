const fs = require('fs');
const path = require('path');

const defaultSource = path.join(
  process.env.USERPROFILE || '',
  'OneDrive',
  'Documents',
  'Obsidian',
  'Notas',
  'Estudos',
  'MBA Arquitetura Full Cycle',
);

const sourceDir = process.env.OBSIDIAN_NOTES_DIR || defaultSource;
const targetDir = path.join(__dirname, '..', 'content', 'notes');

function walk(dir) {
  if (!fs.existsSync(dir)) {return [];}

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {return walk(fullPath);}
    if (entry.isFile() && entry.name.endsWith('.md')) {return [fullPath];}
    return [];
  });
}

function resetTargetDir() {
  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of fs.readdirSync(targetDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      fs.unlinkSync(path.join(targetDir, entry.name));
    }
  }
}

function parseFrontmatter(content) {
  if (!content.startsWith('---')) {return { data: {}, body: content };}

  const end = content.indexOf('\n---', 3);
  if (end === -1) {return { data: {}, body: content };}

  const raw = content.slice(3, end).trim();
  const body = content.slice(end + 4).trimStart();
  const data = {};
  const lines = raw.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {continue;}

    const key = match[1];
    const value = match[2].trim();

    if (!value && lines[i + 1]?.trim().startsWith('- ')) {
      const values = [];
      while (lines[i + 1]?.trim().startsWith('- ')) {
        i += 1;
        values.push(lines[i].trim().slice(2).trim());
      }
      data[key] = values;
      continue;
    }

    data[key] = value.replace(/^['"]|['"]$/g, '');
  }

  return { data, body };
}

function isPublished(value) {
  return value === true || String(value).toLowerCase() === 'true';
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function yamlString(value) {
  return String(value || '').replace(/'/g, '\'\'');
}

function parseList(value) {
  if (Array.isArray(value)) {return value;}
  if (!value) {return [];}
  return String(value)
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
}

function cleanBody(body) {
  return body
    .replace(/\n##\s*\d+\.\s*Resumo para prova[\s\S]*$/i, '')
    .split(/\r?\n/)
    .filter(line => {
      const normalized = line.toLowerCase();
      return !normalized.includes('plataforma.fullcycle.com.br')
        && !normalized.includes('devfullcycle.notion.site')
        && !normalized.includes('dev.azure.com')
        && !normalized.includes('opm-dsa-la@dev.azure.com')
        && !normalized.includes('calendário acadêmico oficial')
        && !normalized.includes('plataforma de ensino')
        && !normalized.includes('assistir vídeo');
    })
    .join('\n')
    .replace(/\(Bosch por exemplo\)/g, '(por exemplo, uma multinacional)')
    .replace(/!\[\[([^\]]+)\]\]/g, '')
    .replace(/^# Desenho Guia\s*\n+(?=# )/gm, '')
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/^> \[!([A-Z]+)\]\s*/gm, '> ')
    .trim();
}

function writeNote(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, body } = parseFrontmatter(content);
  if (!isPublished(data.published) && !isPublished(data.publicar)) {return false;}

  const rawTitle = data.title || path.basename(filePath, '.md').replace(/^[^A-Za-z0-9]+\s*/, '');
  const slug = data.portfolioSlug || data.slug || slugify(rawTitle);
  const date = data.date || data.Start || new Date().toISOString().slice(0, 10);
  const category = data.category || data.categoria || (Array.isArray(data.Tipo) ? data.Tipo[0] : data.Tipo) || 'Engineering';
  const language = data.language || data.idioma || 'pt-BR';
  const tags = Array.isArray(data.tags) ? data.tags : ['architecture'];
  const description = data.description || data.descricao || `Curated notes about ${rawTitle}.`;
  const status = data.status || data.estado || 'study-note';
  const updatedAt = data.updatedAt || data.atualizadoEm || data.date || data.Start || '';
  const order = data.order || data.ordem || '';
  const related = parseList(data.related || data.relacionadas);

  const output = [
    '---',
    `title: '${yamlString(rawTitle)}'`,
    `description: '${yamlString(description)}'`,
    `date: '${date}'`,
    `slug: '/notes/${slug}/'`,
    `category: '${yamlString(category)}'`,
    `language: '${yamlString(language)}'`,
    `status: '${yamlString(status)}'`,
    ...(updatedAt ? [`updatedAt: '${updatedAt}'`] : []),
    ...(order ? [`order: ${order}`] : []),
    'tags:',
    ...tags.map(tag => `  - ${tag}`),
    ...(related.length ? ['related:', ...related.map(item => `  - ${item}`)] : []),
    'published: true',
    'source: \'Obsidian\'',
    '---',
    '',
    cleanBody(body),
    '',
  ].join('\n');

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, `${slug}.md`), output, 'utf8');
  return true;
}

if (!fs.existsSync(sourceDir)) {
  console.error(`Obsidian notes directory not found: ${sourceDir}`);
  process.exit(1);
}

resetTargetDir();

const files = walk(sourceDir);
let written = 0;

for (const file of files) {
  if (writeNote(file)) {written += 1;}
}

process.stdout.write(`Scanned ${files.length} markdown files from ${sourceDir}\n`);
process.stdout.write(`Synced ${written} published notes to ${targetDir}\n`);
