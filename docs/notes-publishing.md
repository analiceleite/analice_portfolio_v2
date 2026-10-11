# Publishing Obsidian Notes

## Daily Workflow

1. Write normally in Obsidian.
2. When a note is ready for the portfolio, add `publicar: true` to the frontmatter.
3. Run `npm run sync:notes` in the portfolio project.
4. Run `npm run build` to validate.
5. Commit and deploy the portfolio.

## Minimal Frontmatter

```md
---
title: System Design and Design Docs
descricao: Practical notes on system design, trade-offs, capacity planning, and design documentation.
date: 2026-10-11
atualizadoEm: 2026-10-20
categoria: System Design
estado: evergreen
ordem: 3
tags:
  - system-design
  - architecture
  - design-docs
publicar: true
idioma: pt-BR
portfolioSlug: system-design-design-docs
relacionadas:
  - fundamentos-arquitetura-software
  - microsservicos-arquitetura-eventos
---
```

## Supported Fields

The sync script accepts Portuguese or English fields:

- `publicar: true` or `published: true`
- `descricao` or `description`
- `categoria` or `category`
- `portfolioSlug` or `slug`
- `idioma` or `language`
- `estado` or `status`
- `atualizadoEm` or `updatedAt`
- `ordem` or `order`
- `relacionadas` or `related`
- `tags`
- `date`

## Recommended Status Values

- `study-note`: default for notes copied from study practice.
- `evergreen`: stable reference notes worth keeping updated over time.
- `needs-review`: useful note that still needs cleanup.
- `draft`: keep private; do not set `publicar: true` yet.

## Notes Page Features

- Category filters are generated from `categoria` / `category`.
- Search checks title, description, category, and tags.
- Language badges come from `idioma` / `language`.
- Status badges come from `estado` / `status`.
- Related notes come from `relacionadas` / `related` and use `portfolioSlug` values.

## What The Sync Script Does

- Reads Markdown files from the MBA Obsidian folder.
- Publishes only notes marked with `publicar: true` or `published: true`.
- Copies them into `content/notes`.
- Converts Obsidian links like `[[Note]]` into plain text.
- Replaces Obsidian embeds like `![[image.png]]` with an omitted-asset note.
- Generates portfolio-compatible frontmatter.

## What You Should Not Publish

- Assessment notes.
- Course platform URLs.
- Internal company/project links.
- Raw copied course transcripts.
- Private diagrams or screenshots.
