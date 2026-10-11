# Engineering Notes Curation

This is the first publishing map for Analice's Obsidian MBA notes. The goal is to keep publishing simple: write in Obsidian, add `publicar: true`, run the sync script, and let the portfolio build the notes.

## Publish First

These notes already have enough technical depth and are aligned with the portfolio positioning around architecture, backend, DevOps, cloud, and systems design.

| Obsidian note                                                      | Suggested public title                      | Why publish                                                                                                                                                                            |
| ------------------------------------------------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Disciplinas/📖 Fundamentos de Arquitetura de Software.md`         | Software Architecture Fundamentals          | Strong base note about architecture vs design, coupling, modernization, structures, and fitness functions.                                                                             |
| `Disciplinas/📖 Fundamentos de Arquitetura de Solução.md`          | Solution Architecture Fundamentals          | Strong positioning for enterprise architecture, solution design, quality attributes, APIs, gateways, BFF, and cloud thinking. Needs removal of course/private links before publishing. |
| `Disciplinas/📖 Domain Driven Design.md`                           | Domain-Driven Design Notes                  | Valuable for backend/architecture positioning: strategic design, bounded contexts, context mapping, aggregates, ports/adapters, event sourcing.                                        |
| `Disciplinas/📖 SOLID e Design Patterns.md`                        | SOLID and Design Patterns                   | Long and practical with examples. Good for showing foundations and teaching ability.                                                                                                   |
| `Disciplinas/📖 System Design e Design Docs.md`                    | System Design and Design Docs               | Strong note for architecture interviews and real-world documentation practices. Remove/replace Obsidian diagram embeds before publishing.                                              |
| `Disciplinas/📖 Microsserviços e Arquitetura Baseada a Eventos.md` | Microservices and Event-Driven Architecture | Very aligned with backend/cloud/devops positioning. Good diagrams in Mermaid and practical concepts. Remove “resumo para prova” tone before publishing.                                |
| `Bônus/✨ Prompt Engineering para Devs.md`                         | Prompt Engineering for Developers           | Good bridge between AI and software engineering. Publish as a practical engineering note, not as course summary.                                                                       |

## Publish Later

These are currently empty or too early, but they are strategically valuable once you add notes.

| Obsidian note                                                  | Why wait                                                                                 |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `Disciplinas/📖 Docker & Kubernetes.md`                        | Empty right now, but high value for your DevOps/GCP positioning.                         |
| `Disciplinas/📖 Fundamentos de DevOps e SRE.md`                | Empty right now, high value after you add practical notes from work/study.               |
| `Disciplinas/📖 Infra as Code.md`                              | Empty right now, very valuable once Terraform content is added.                          |
| `Disciplinas/📖 Observabilidade.md`                            | Empty right now, valuable for cloud-native architecture.                                 |
| `Disciplinas/📖 Cloud Computing e Serverless.md`               | Empty right now, useful once you add GCP/Cloud Run/serverless notes.                     |
| `Disciplinas/📖 Apache Kafka.md`                               | Empty right now, good future distributed systems topic.                                  |
| `Disciplinas/📖 Banco de Dados.md`                             | Empty right now, valuable if focused on PostgreSQL, indexing, modeling, and performance. |
| `Disciplinas/📖 Arquitetura Hexagonal & Clean Architecture.md` | Good topic, but currently short. Expand with examples before publishing.                 |

## Do Not Publish

Keep these private unless rewritten into an original public article.

| Area                                  | Reason                                                                                 |
| ------------------------------------- | -------------------------------------------------------------------------------------- |
| `Avaliações/`                         | Contains course assessment material and grades. Do not publish.                        |
| `Outros/`                             | Calendar, holidays, deadlines, and course admin notes. Not useful publicly.            |
| `MBA Arquitetura Full Cycle.md`       | Contains private course links and work/project links. Do not publish.                  |
| Notes with platform links             | Remove Full Cycle platform URLs before publishing.                                     |
| Notes with company/project references | Remove private work context, Azure DevOps links, and internal names before publishing. |
| Raw pasted images / Excalidraw embeds | Convert to Mermaid, public images, or text explanations first.                         |

## Publishing Rules

Before setting `publicar: true`, check:

- No private company links or internal project names.
- No course platform URLs.
- No assessment/prova/gabarito content.
- No copied transcript style; add your own explanation and takeaway.
- Obsidian embeds `![[...]]` are either removed, converted to Mermaid, or acceptable as omitted placeholders.
- Title and description are clear for external readers.

## Recommended Public Categories

- `Architecture`
- `Backend`
- `System Design`
- `DevOps`
- `Cloud`
- `AI Engineering`
- `Databases`

## Simple Frontmatter

Use this in Obsidian when a note is ready:

```md
---
title: Domain-Driven Design Notes
descricao: Strategic and tactical DDD notes for backend and architecture work.
date: 2026-10-11
categoria: Architecture
tags:
  - ddd
  - architecture
  - backend
publicar: true
portfolioSlug: domain-driven-design
---
```

Then run:

```bash
npm run sync:notes
```
