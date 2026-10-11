---
title: 'Prompt Engineering para Devs'
description: 'Notas práticas sobre prompts para documentação, ADRs, debugging, code review e desenvolvimento assistido por IA.'
date: '2026-10-11'
slug: '/notes/prompt-engineering-para-devs/'
category: 'AI Engineering'
language: 'pt-BR'
status: 'study-note'
updatedAt: '2026-10-11'
order: 7
tags:
  - ai
  - prompt-engineering
  - developer-tools
related:
  - system-design-design-docs
  - fundamentos-arquitetura-software
published: true
source: 'Obsidian'
---

# O que é Engenharia de Prompt?

É o processo de **orientar soluções de IA generativa** para gerar resultados de alta qualidade e relevância por meio de instruções detalhadas, escolha de formatos, frases e símbolos adequados. Para desenvolvedores, essa prática é fundamental para automatizar tarefas repetitivas, auxiliar em processos complexos e aprimorar a colaboração em design e implementação.

# ADR (Architectural Decision Record)

O **ADR** (Registro de Decisão Arquitetural) é um tipo de documento técnico focado em capturar as **decisões de design e arquitetura** de um projeto, juntamente com o raciocínio que levou a elas e o contexto do momento.

- **Por que é importante:** Serve para documentar o histórico de decisões técnicas (como a escolha de um banco de dados ou protocolo de comunicação), evitando que o time esqueça o "porquê" de certas escolhas meses depois.
- **Aplicação em Prompt:** O ADR é o caso de uso ideal para a técnica **Skeleton of Thought (SoT)**. Como um ADR exige seções fixas e obrigatórias (como "Status", "Contexto", "Decisão" e "Consequências"), você fornece esse "esqueleto" estrutural no prompt para garantir que a IA produza uma documentação organizada, completa e sem fugir do padrão desejado.

## Gerador de ADRs

Para gerar ADRs, a técnica mais indicada é o **Skeleton of Thought (SoT)**, pois ela garante que a IA siga uma estrutura lógica pré-definida e obrigatória para documentações técnicas.

**Exemplo de Prompt:**

> "Você é um Arquiteto de Software Sênior. Sua tarefa é gerar um **ADR** sobre a decisão de migrar a comunicação entre microserviços de REST para gRPC. **Estruture sua resposta obrigatoriamente com os seguintes tópicos**:
>
> - **Título:** (ID e nome da decisão)
> - **Status:** (Proposto, Aceito, Depreciado)
> - **Contexto:** (Explique o problema técnico e as limitações atuais)
> - **Decisão:** (A escolha técnica feita e a justificativa)
> - **Consequências:** (Impactos positivos e negativos na arquitetura e no time)
> - **Alternativas Consideradas:** (Liste outras opções avaliadas)"

# Context (Contexto ou Contextualização)

O **Contexto** refere-se ao conjunto de informações iniciais que você fornece ao modelo de linguagem para que ele "entenda o cenário" antes de executar uma tarefa. Na engenharia de prompt, a **contextualização** é considerada uma etapa essencial da fase de implementação.

- **O que inclui:** Geralmente abrange a definição da **Persona** (ex: "Você é um engenheiro sênior"), o **Projeto** (stack tecnológica, arquitetura atual) e as **Restrições** (regras que a IA não pode violar).
- **Aplicação em Prompt:** Fontes sugerem o uso de **delimitadores estruturais** (estilo XML, como `<context>...</context>`) para separar claramente o que é informação de fundo do que é a instrução principal. Isso ajuda a reduzir a ambiguidade e evita que o modelo se perca ou "alucine" fora dos limites do seu sistema.

Em resumo: enquanto o **ADR** é um **resultado final** (um documento estruturado), o **Contexto** é o **insumo inicial** (a moldura de informações) que você dá à IA para que ela consiga gerar esse ou qualquer outro resultado com precisão.

Gostaria que eu criasse um **conjunto de flashcards** para você praticar como estruturar um contexto e um ADR usando essas técnicas?

## Gerador de Contexto

A contextualização é uma das etapas fundamentais na fase de implementação. Para que o modelo entenda exatamente o cenário do projeto, recomenda-se o uso de **delimitadores estruturais** (estilo Anthropic) e a definição clara de **Persona e Objetivo**.

**Exemplo de Prompt:**

> "Utilize as informações abaixo para contextualizar sua próxima tarefa de desenvolvimento:
>
> - **Persona:** Desenvolvedor Sênior especializado em sistemas distribuídos e concorrência em Go.
> - **Projeto:** API de processamento de pagamentos em tempo real.
> - **Stack:** Go 1.21, PostgreSQL, Redis para cache e Kafka para mensageria.
> - **Restrição:** O sistema deve suportar 5.000 requisições por segundo com latência inferior a 100ms.
>
> Seu objetivo é analisar o trecho de código que enviarei a seguir e identificar possíveis gargalos de performance que violam a restrição de latência.
>
> **Pense passo a passo (Chain of Thought)** e justifique cada ponto com base nas práticas recomendadas de Go antes de fornecer a solução final."

## Diferença entre as Abordagens

- **No ADR Generator:** O foco é a **estrutura rígida** (SoT) para garantir que nenhum tópico essencial da documentação seja esquecido.
- **No Gerador de Contexto:** O foco é a **especificidade e delimitação** de informações para reduzir a ambiguidade e evitar que o modelo alucine fora das restrições do seu projeto.

Você gostaria que eu gerasse um **template completo de ADR** baseado nessas técnicas para você copiar e usar no seu dia a dia?

# Principais Técnicas de Prompting

O documento detalha diversas estratégias para otimizar a interação com modelos de linguagem:

- **Zero-Shot:** O modelo recebe apenas a descrição da tarefa, sem exemplos anteriores, testando sua capacidade base de generalização.
- **One-Shot / Few-Shot:** Fornece um ou poucos exemplos (1 a 5) para que o modelo aprenda padrões de estilo, formato ou nuances técnicas antes de gerar a resposta.
- **Chain of Thought (CoT):** Instruciona o modelo a externalizar seu **raciocínio passo a passo**, sendo ideal para diagnósticos de falhas, bugs e planejamentos lógicos.
- **Skeleton of Thought (SoT):** Guia o modelo a seguir uma estrutura lógica pré-definida (esqueleto) com tópicos fixos, garantindo organização e completude em documentações.
- **Tree of Thought (ToT):** Permite que o modelo explore múltiplos caminhos de raciocínio paralelos e avalie alternativas antes de uma decisão final, simulando um raciocínio deliberado.
- **Self-Consistency:** Executa a mesma tarefa múltiplas vezes e define a saída final por **votação majoritária**, o que aumenta a confiabilidade em cálculos ou estimativas.
- **Directional Stimulus:** Utiliza comandos específicos (como "Liste", "Compare", "Responda em JSON") para guiar o estilo e o foco da resposta.
- **ReAct (Reasoning + Action):** Combina o raciocínio passo a passo com a **execução de ações externas**, como consultas a APIs ou ferramentas (ex: Docker), permitindo interações em tempo real com o ambiente.

# Aplicações no Desenvolvimento

As técnicas podem ser aplicadas em diversas frentes:

- **Documentação:** Criação de Design Docs, ADRs e guias de engenharia.
- **Implementação:** Auxílio em refatoração, debugging, análise de performance e testes unitários.
- **Code Review:** Verificação de bugs, padrões de código e testabilidade.

# Exemplos Práticos

## Zero-Shot

Esta técnica consiste em dar uma instrução direta sem exemplos prévios.

- **Exemplo:** "Você é um especialista em Go. Escreva dois parágrafos explicando o que é uma **goroutine**, como ela é usada e quais são suas limitações. Seja claro, técnico e direto".

## One-Shot / Few-Shot

Fornece um ou mais exemplos para o modelo seguir um padrão de formatação ou estilo.

- **Exemplo (Geração de Testes):** "Gere testes unitários para funções em Go. Exemplo: Função: `func Soma(a, b int) int { return a + b }` Teste: `func TestSoma(t *testing.T) { r := Soma(2, 3); if r != 5 { t.Errorf(\"esperado 5, obteve %d\", r) } }`.

## Chain of Thought (CoT)

Induz o modelo a externalizar o **raciocínio passo a passo**, ideal para lógica e diagnósticos.

- **Exemplo (Debugging):** "Você é um desenvolvedor Go. Analise o seguinte código e explique, passo a passo, por que ele pode causar um erro: `var lista []string; fmt.Println(lista)`".

## Skeleton of Thought (SoT)

Utiliza uma **estrutura lógica pré-definida** (tópicos fixos) para garantir respostas organizadas.

- **Exemplo (Proposta Técnica):** "Sua tarefa é propor uma solução para um rate limiter. Estruture sua resposta com os seguintes tópicos: Contexto do problema; Requisitos funcionais e não funcionais; Estratégia de rate limiting; Stack tecnológica; Concorrência e escalabilidade; Conclusão técnica".

## Tree of Thought (ToT)

Explora **múltiplos caminhos de raciocínio paralelos** para avaliar alternativas antes de uma decisão.

- **Exemplo (Arquitetura):** "Gere múltiplas abordagens (caminhos de raciocínio) para limitar o acesso a uma API com 100 mil req/s. Para cada abordagem, exponha prós e contras. Ao final, selecione a mais adequada baseada em escalabilidade, confiabilidade e latência".

## Self-Consistency

Executa a tarefa várias vezes e usa a **votação majoritária** para definir a resposta mais confiável.

- **Exemplo (Dimensionamento):** "Qual o número ideal de shards para particionar uma base de dados com 80.000 clientes, considerando escalabilidade e performance? Pense passo a passo" (O desenvolvedor executa este prompt várias vezes e escolhe a resposta mais frequente).

## Directional Stimulus

Usa comandos ou verbetes específicos para guiar o **estilo e o foco** da resposta.

- **Exemplo (Comparação de Tech):** "Compare Kafka, RabbitMQ e Amazon SQS. Responda nos tópicos: características principais, throughput, confiabilidade, complexidade operacional e quando usar cada uma".

## ReAct (Reasoning + Action)

Combina raciocínio com a **execução de ações externas** (APIs, CLI) em um ciclo de Pensamento, Ação e Observação.

- **Exemplo (Infraestrutura):** "Utilize a ferramenta Docker para inspecionar os containers. Siga o padrão: Thought: (Pensamento sobre o que fazer) Action: (Comando ex: `docker ps`) Observation: (Resultado do comando) Final Answer: (Conclusão final)".

# Quadro Comparativo

| Técnica                       | Melhor Contexto / Quando Utilizar                                                                                     | Principal Benefício / Justificativa                                                                    |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| **Zero-Shot**                 | Tarefas simples, perguntas factuais e quando o custo de tokens precisa ser baixo.                                     | **Baixo custo** de preparação e alta escalabilidade para tarefas diretas.                              |
| **One-Shot / Few-Shot**       | Quando é necessário replicar um **padrão específico** (código, documentação) ou o modelo falha em Zero-Shot.          | Aumenta a **precisão e consistência** ao fornecer exemplos de entrada e saída.                         |
| **Chain of Thought (CoT)**    | Diagnóstico de falhas (**debugging**), planejamento lógico e tarefas que exigem múltiplas etapas de raciocínio.       | Oferece **transparência e auditabilidade**, permitindo ver o passo a passo lógico do modelo.           |
| **Skeleton of Thought (SoT)** | Criação de documentações técnicas, **ADRs**, templates ou resumos com seções fixas.                                   | Garante que o modelo não se perca na estrutura, mantendo a **organização por tópicos**.                |
| **Tree of Thought (ToT)**     | **Brainstorming estruturado**, decisão entre múltiplas estratégias arquiteturais e avaliação de _trade-offs_.         | Permite explorar **caminhos paralelos** e avaliar alternativas antes de uma conclusão final.           |
| **Self-Consistency**          | Cálculos matemáticos, **estimativas de custo/infraestrutura** e tarefas onde a confiabilidade é crítica.              | Reduz alucinações isoladas ao definir a resposta por **votação majoritária** entre várias execuções.   |
| **Directional Stimulus**      | Necessidade de saídas em formatos específicos (**JSON, YAML**) ou guiar o foco (ex: "como um arquiteto").             | **Reduz ambiguidade** e padroniza a resposta para consumo programático por outros sistemas.            |
| **ReAct**                     | Construção de **agentes interativos** que precisam consultar APIs, bancos de dados ou executar comandos (ex: Docker). | Combina raciocínio com **ação em tempo real**, permitindo interações dinâmicas com o ambiente externo. |

# Resumo de Escolha Rápida

- **Para Documentar:** Use **SoT** para garantir que todos os tópicos obrigatórios sejam preenchidos.
- **Para Resolver Bugs:** Use **CoT** para entender a causa raiz passo a passo.
- **Para Escolher Tecnologias:** Use **ToT** para comparar prós e contras de cada opção de forma deliberada.
- **Para Automação de Infra:** Use **ReAct** para que a IA possa "observar" o estado do sistema e "agir" conforme necessário.
