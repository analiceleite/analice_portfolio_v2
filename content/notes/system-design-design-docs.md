---
title: 'System Design e Design Docs'
description: 'Notas sobre requisitos, trade-offs, CAP theorem, capacidade, documentação técnica, design docs e ADRs.'
date: '2026-10-11'
slug: '/notes/system-design-design-docs/'
category: 'System Design'
language: 'pt-BR'
status: 'study-note'
updatedAt: '2026-10-11'
order: 3
tags:
  - system-design
  - architecture
  - design-docs
related:
  - fundamentos-arquitetura-software
  - fundamentos-arquitetura-solucao
  - microsservicos-arquitetura-eventos
published: true
source: 'Obsidian'
---

> O que é o System Design
> "System Design é o processo de definição de arquitetura, componentes, módulos e interfaces e dados para atender os requisitos específicos de uma aplicação"
> 
> Um Design Doc bem feito começa simples (visão geral), explica o problema (contexto) e só depois apresenta a solução — de forma clara e colaborativa.



> **Throughput** é a **quantidade de trabalho que um sistema consegue processar por unidade de tempo**.
# System Design

## Entendendo Principais Conceitos 

* System Design é o processo de definição de arquitetura, componentes, módulos e interfaces e dados para atender os requisitos específicos de uma aplicação
* É importante para pensar na arquitetura de forma intencional
* Racionaliza as definições que realmente importam 
* Explorar possíveis soluções
* Nos ajuda a ter uma visão de presente e futuro do software
* Exercita a forma de pensar e planejar diferentes tipos de solução de software

## System Design vs Big Techs

* Normalmente faz parte da maioria dos processos seletivos de Big Techs
* Forma do candidato pensar
* Repertório e o nível de profundidade nas tecnologias
* Capacidade de dedução (aproximação de um resultado rapidamente)
* Capacidade de comunicação
* Capacidade de ser confrontado

## System Design No Mundo Real

* É uma ferramenta na mão do arquiteto de soluções 
* É uma forma do arquiteto se expressar
* Gerar convicções
* Vender
* Especificar e documentar

## Os 6 Elementos

* Requisitos
* Estimativa de capacidade 
* Modelagem de dados
* API Design
* **System Design (desenho)**
* Exploração 

## Requisitos 

* **Core Features e domínio (razão do sistema existir)**
	* Entendimento do domínio da aplicação e principais funcionalidades
* **Support Features**
	* Funcionalidades auxiliares que farão com que as funcionalidades principais sejam atendidas

## Teorema CAP

O Teorema CAP demonstra três pilares essenciais para sistemas distribuídos:

* **Consistência (C)**: Todos os clientes veem os mesmos dados ao mesmo tempo, independentemente do nó ao qual se conectam
* **Disponibilidade (A)**: Cada solicitação recebe uma resposta (sucesso ou falha) sem garantia de que a resposta contenha os dados mais recentes
* **Tolerância a Partições (P)**: O sistema continua operando mesmo que haja falhas de comunicação entre os nós (partições)

O teorema afirma que é impossível para um sistema distribuído garantir simultaneamente os três pilares. É sempre necessário fazer um _trade-off_ entre eles. Por exemplo, em sistemas como os de hotelaria ou bancos, a consistência dos dados é crucial. Se você tentar sacar R$100 da mesma conta em dois dispositivos diferentes, o sistema pode ficar indisponível momentaneamente para garantir que a consistência seja mantida e evitar que R$200 sejam sacados.

Escolher **Consistência (C)** em um sistema distribuído significa que, se houver uma **Partição (P)** na rede (ou seja, uma falha de comunicação entre os nós/microsserviços), o sistema **precisa sacrificar a Disponibilidade (A)** para garantir que todos os dados que são acessados sejam os mais recentes e corretos.

**Por que isso acontece?**

1.  **Garantia de Dados Atuais:** Para ser consistente, um nó precisa ter certeza de que possui a versão mais atualizada dos dados. Se houver uma partição, ele pode não conseguir se comunicar com outros nós que poderiam ter uma versão mais recente ou que precisam ser atualizados antes que a operação seja confirmada.
2.  **Evitar Inconsistências:** Se o nó permitisse a operação sem essa confirmação, ele correria o risco de criar dados inconsistentes (por exemplo, duas transações diferentes tentando modificar o mesmo recurso ao mesmo tempo em lados diferentes da partição, resultando em um estado final incorreto).
3.  **Bloqueio de Operações:** Para evitar essa inconsistência, o nó que não consegue se comunicar com os outros nós necessários para garantir a consistência **irá bloquear ou recusar as solicitações** que poderiam levar a um estado inconsistente.

**Exemplo:**

Imagine um sistema de reserva de passagens aéreas. Se você tem dois servidores (nós) e eles perdem a comunicação entre si (partição):

*   **Priorizando Consistência:** Se um cliente tenta reservar o último assento de um voo em um servidor, e esse servidor não consegue se comunicar com o outro para garantir que o assento não foi reservado simultaneamente, o sistema **pode recusar a reserva ou mantê-la pendente** até que a comunicação seja restabelecida. Isso significa que o serviço de reserva ficou **indisponível** para aquele cliente naquele momento, mas a integridade dos dados (o assento não será duplamente reservado) é garantida.

> Para manter a consistência em face de uma partição, o sistema prefere *"não responder"* ou "responder com erro" a *"responder com dados potencialmente incorretos ou inconsistentes"*.

# System Design na Google Parte 01

## Princípios Fundamentais e Mentalidade

-   **System Design é Intencional:** É o processo de definir arquitetura, componentes, módulos, interfaces e dados para atender requisitos específicos de uma aplicação.
-   **Visão de Presente e Futuro:** Ajuda a planejar e exercitar a forma de pensar para diferentes soluções de software, antecipando necessidades futuras.
-   **Falha é Inevitável:** Em grande escala, tudo vai falhar, e a frequência de falhas aumenta com a escala. É crucial projetar sistemas que esperem e gerenciem falhas.
-   **Dividir Responsabilidades:** Evitar o acúmulo de responsabilidades para gerenciar a complexidade e promover a modularidade.
-   **Armazenar Apenas o Essencial:** Não armazenar dados desnecessários para otimizar recursos e desempenho.
-   **Software é um Filme:** Entender o software como um processo dinâmico e contínuo, não uma entidade estática.
-   **Estimativa Não Precisa Ser Perfeita:** A capacidade de estimar rapidamente é valiosa, mesmo que não seja 100% precisa. "100% de estática é uma falha."

## Requisitos e Restrições

-   **Requisitos Essenciais:**
    -   **Core Features e Domínio:** Entendimento profundo das funcionalidades principais e da razão de ser do sistema.
    -   **Support Features:** Funcionalidades auxiliares que garantem o funcionamento das core features.
-   **Variáveis de Qualidade da Experiência do Usuário:**
    -   Tipo do Software
    -   Workload (carga de trabalho)
    -   Ambiente (On-Premise, Cloud, Multi-Cloud, Híbridos)
-   **Restrições Cruciais:**
    -   Custo de downtime e possibilidade de suportá-lo.
    -   Custo de perder dados.
    -   Volume de dados armazenados.
    -   Frequência de leitura e escrita (Ratio).
    -   Número de usuários.
    -   Tempo de resposta.
-   **Jornadas Críticas do Usuário (CUJ):** Focar nas poucas jornadas que são mais críticas para a experiência do usuário.
-   **Recursos de Requerimento:** Nunca isolar recursos como tempo, dinheiro e pessoas do processo de requerimento.

## Considerações Técnicas Chave

-   **Teorema CAP:**
    -   É impossível para um sistema distribuído garantir Consistência (C), Disponibilidade (D), Tolerância a Partições (P) simultaneamente. É sempre necessário fazer um *trade-off*.
    -   **Consistência (C):** Todos os clientes veem os mesmos dados ao mesmo tempo.
        -   **Forte/Consistente:** Garante que todos os dados acessados são os mais recentes e corretos, geralmente via consenso distribuído (e.g., Paxos, Multi-Paxos, Raft). Em caso de partição, sacrifica a Disponibilidade.
        -   **Eventual:** Os dados eventualmente se tornam consistentes em todos os nós.
    -   **Disponibilidade (A):** Cada solicitação recebe uma resposta (sucesso ou falha), sem garantia de que a resposta contenha os dados mais recentes.
    -   **Tolerância a Partições (P):** O sistema continua operando mesmo com falhas de comunicação entre os nós.
    -   **Implicação:** Se a rede falhar (partição), um sistema que prioriza Consistência (C) sacrificará Disponibilidade (A). Equilibrar alta consistência e alta disponibilidade em sistemas distribuídos (dada a tolerância a partições) geralmente exige maior investimento.
-   **Armazenamento:**
    -   Armazenar é barato, consultar é caro.
    -   Considerar o *ratio* de leitura/escrita.
    -   A evolução do hardware (HDDs vs. SSDs) impacta diretamente a performance de consulta, com SSDs sendo ideais para leitura intensa.
-   **Memória (RAM):** RAM é lento (em comparação com caches de CPU); acessar a memória de forma previsível é crucial para o desempenho.
-   **Rede (Network):**
    -   Cuidado com a latência (round-trip, especialmente entre regiões distintas).
    -   Comprimir dados para otimizar o tráfego.
-   **Hardware:**
    -   Naturalmente perde performance e quebra devido a fatores como aquecimento, eletricidade, vibração e cabeamento.
    -   Sistemas devem ser projetados para lidar com a degradação e falha do hardware.

## Escalabilidade e Resiliência

-   **Escalonamento:**
    -   Como o serviço e as requisições crescerão?
    -   Como gerenciar recursos deteriorados (degradados)?
-   **Questionar o Inevitável:**
    -   O que deve acontecer quando o sistema falhar?
    -   Que tipos de falhas são aceitáveis e relevantes para o negócio?
-   **Consulta:**
    -   Resultados degradados podem causar atrasos.
    -   É melhor falhar rápido do que esperar muito por um resultado ruim.

# Design Docs

## O que é um Design Doc

Design Doc é um documento relativamente informal criado antes da implementação para descrever:

- O problema
- A solução em alto nível
- As decisões técnicas
- Os trade-offs

Seu principal objetivo é comunicação e alinhamento entre pessoas do time.

## Por que usar Design Docs

- Preservar o contexto das decisões
- Alinhar o time antes de implementar
- Evitar interpretações erradas do código
- Melhorar a qualidade das decisões
- Reduzir retrabalho

> Código sem contexto é difícil de entender; o Design Doc resolve isso.

## Conceito central: trade-offs

Toda decisão técnica envolve escolhas.

O Design Doc deve deixar claro:

- Quais opções foram consideradas
- Por que uma foi escolhida
- Por que as outras foram descartadas

## Estrutura (flexível, não obrigatória)

### Cabeçalho

- Autores, revisores
- Status (rascunho, aprovado, etc.)
- Datas
- Tags

### Visão geral

- Resumo curto do documento
- 1 parágrafo
- Sem detalhes

### Escopo e contexto

- Cenário atual
- Problema
- Limitações e dívidas técnicas
- Sem solução ainda

### Solução proposta

- Descrição em alto nível
- Fluxo e arquitetura

### Alternativas

- Outras soluções consideradas
- Por que não foram escolhidas

### Trade-offs

- Vantagens e desvantagens

### Impactos

- Segurança
- Performance
- Escalabilidade
- Times impactados

### Testes e métricas
- Como validar a solução
- Como medir sucesso
### Plano de rollout

- Como será implantado (gradual, A/B, etc.)

### Perguntas em aberto

- Dúvidas que ainda não têm resposta

## Boas práticas

- Escrever de forma simples e direta
- Não assumir conhecimento prévio
- Focar em alto nível (evitar código)
- Usar diagramas quando útil
- Compartilhar cedo (mesmo como rascunho)
- Envolver stakeholders
- Usar dados sempre que possível

## Design Doc como narrativa

O documento deve seguir uma lógica de história:

1. Visão geral
2. Contexto e problema
3. Solução
4. Decisões e impactos

Sem contexto, a solução perde sentido.

## Tamanho e nível de detalhe

- Normalmente entre 1 e 3 páginas
- Cresce conforme a complexidade
- Foco em alto nível, não em implementação detalhada

## Relação com outros documentos

### Design Doc

- Visão geral + contexto + solução
- Foco em comunicação

### ADR (Architecture Decision Record)

- Registra decisões arquiteturais
- Mais direto e curto

### RFC (Request for Comments)

- Mais técnico
- Detalha implementação

### SAD

- Mais formal e arquitetural

Esses documentos são complementares e podem coexistir.

## Ferramentas

- **Confluence**: melhor para colaboração e organização
- **Google Docs**: simples e acessível
- **GitHub/GitLab**: útil, mas menos acessível para não técnicos
- **Notion**: alternativa viável
- **Ferramentas de diagrama**: PlantUML, Structurizr

## Ciclo de vida do Design Doc

1. Escrever (rascunho)
2. Compartilhar com o time
3. Coletar feedback
4. Iterar e melhorar
5. Expandir para mais pessoas
6. Consolidar
7. Implementar

> Processo iterativo e colaborativo.

## Documentação viva

O Design Doc deve ser atualizado sempre que o sistema muda.

Documentação não é estática.

## Quando NÃO usar Design Doc

- Quando não há autonomia de decisão
- Quando vira apenas burocracia
- Quando o problema é simples e óbvio
- Quando não há trade-offs relevantes

## Benefícios práticos

- Reduz ruído de comunicação
- Melhora qualidade das decisões
- Diminui necessidade de reuniões longas
- Ajuda a estruturar pensamento
- Facilita colaboração entre times

## Ideia central final

Design Doc não é burocracia.

É uma ferramenta para:
- Pensar melhor antes de construir
- Comunicar decisões
- Alinhar pessoas

Quando bem usado, ele aumenta a qualidade do sistema e reduz problemas ao longo do desenvolvimento.

# Framework para System Design Interview

## Entendendo a Entrevista de System Design

- **O que é avaliado:** A entrevista testa sua capacidade de projetar sistemas complexos, variando de "High Level Design" (arquitetura e componentes) a "Low Level Design" (detalhes de implementação, algoritmos e estruturas de dados).
- **Fatores de influência:** O tipo de pergunta que você receberá depende da sua **senioridade**, do seu **cargo** (ex: Backend vs. Frontend) e da **empresa** (ex: a Netflix focará em streaming, a Amazon em e-commerce).

## Os 6 Passos para uma Resposta Estruturada

Esta é a parte mais prática para os seus estudos. Domine esta sequência:

1. **Engenharia de Requisitos:** Esclareça os requisitos funcionais, não funcionais e a escala do sistema.
2. **Estimativa de Capacidade:** Calcule throughput (pedidos/seg), largura de banda e armazenamento necessário (ex: para 5 anos).
3. **Modelo de Dados:** Defina o modelo de dados e escolha os bancos de dados apropriados (SQL vs. NoSQL).
4. **Design de API:** Defina os 2 ou 3 endpoints centrais, parâmetros de entrada/saída e URLs.
5. **Design do Sistema:** Desenhe o diagrama da arquitetura, focando primeiro na funcionalidade principal.
6. **Discussão do Design:** Aprofunde-se em detalhes, discuta alternativas, gargalos e otimizações.

## Estratégia de Preparação Sistemática

- **Agrupamento por Recursos (Clusters):** Estude sistemas por categorias (ex: sistemas de compartilhamento de arquivos, streaming, baseados em mapas) para entender os desafios técnicos comuns a cada grupo.
- **Priorização:** Foque em sistemas relacionados à empresa onde você fará a entrevista.
- **Repetição:** Pratique os 6 passos repetidamente para torná-los automáticos.

## Dicas de Comportamento Durante a Entrevista

- **Tipos de Entrevistador:** Identifique se o entrevistador é **"Warm"** (colaborativo) ou **"Cold"** (distante) e ajuste sua comunicação. Com entrevistadores frios, fale menos "em voz alta" e seja mais direto em suas afirmações.
- **Hungry Judge Effect:** Esteja ciente de que pessoas cansadas ou com fome tendem a ser menos propensas a tomar decisões favoráveis ou "ousadas"; isso pode afetar a percepção do entrevistador.
- **Em caso de "branco" ou estresse:** Faça perguntas de esclarecimento, pense em voz alta para que o entrevistador possa te guiar e foque em progressos incrementais.

## O Ciclo de Aprendizado Pós Entrevista

- Crie o hábito de **recapitular**: anote suas impressões logo após a entrevista, analise seu desempenho técnico e de comunicação, peça feedback e ajuste sua estratégia de estudo para a próxima vez.

# Design System na Google Parte 02

## Padrão de Composição 

É quando você constrói um sistema juntando vários serviços menores, cada um responsável por uma parte.

Em vez de ter um sistema grande fazendo de tudo (monolito), você tem serviço de pagamento, pedidos e clientes, sendo que um orquestrador junta tudo.

## Single Point of Failure (SPOF)

É qualquer parte do sistema que, **se cair, derruba tudo**. Por exemplo:

* Um único servidor 
* Um único banco de dados
* Um único broker MQTT

**Exemplo real:**

Se seu backend Node.js está em **um único servidor** e ele cai: 

* Ninguém compra
* Ninguém paga
* Tudo para

**Solução:**

* Redundância (vários servidores)
* Balanceamento de carga
* Replicação de banco

## Disaster Recovery 

É o plano de **como recuperar o sistema quando dá ruim de verdade**.

**Cenários:**

* Servidor morreu 
* Banco corrompeu
* Região cloud caiu 

> Como eu volto ao normal rápido?

**Estratégias:**

* Backups automáticos
* Replicação em outra região 
* Restore rápido

## RPO e RTO

Ambos são métricas de desastre:

### RPO (Recovery Point Objective)

Quanto de dado você pode perder?

* RPO = 0 -> não pode perder nada
* RPO = 1h -> pode perder até 1 hora de dados

Exemplo:

> Se seu sistema salva compras e você perde 30min de dados, os clientes vão ficar muito bravos!

### RTO (Recovery Time Objective)

Quanto tempo você pode ficar fora? 

* RTO = 5min -> sistema tem que voltar em até 5min
* RTO = 2h -> pode ficar fora por 2 horas

Exemplo:

Seu brechó em live:

* 2 horas offline = prejuízo direto

## Design Case

É basicamente um **estudo de arquitetura aplicado a um problema real**.

Você pega um cenário:

* "Sistema de vendas em live com PIX"

E define:

* Como escalar
* Como evitar falhas
* Como processar pagamentos 
* Como lidar com picos 

É onde tudo isso aqui se junta.

## Fan-Out Pattern 

Esse é MUITO importante em sistemas distribuídos.

Um evento gera **vários processos ao mesmo tempo**.

Exemplo clássico:

**Evento**: "Compra realizada"

**Fan-out**:

* Salva no banco 
* Gera PIX
* Envia notificação 
* Atualiza dashboard
* Manda evento para analytics

Tudo isso pode acontecer **em paralelo**, geralmente usando:

* Filas (RabbitMQ, Kafka, Pub/Sub)
* Eventos

## Ligando Tudo (Visão Prática)

Imagina seu sistema de vendas:

1. Cliente compra -> evento disparado 
2. Fan-out distribui tarefas
3. Serviços compostos executam cada parte 
4. Sistema evita SPOF com redundância 
5. Se der ruim -> entra Disaster Recovery 
6. RPO/RTO definem o quão rápido e seguro isso precisa ser

Resumidamente:

* **Composição** -> dividir sistemas em partes
* **SPOF** -> ponto único que pode quebrar tudo 
* **Disaster Recovery** -> plano para quando tudo quebra
* **RPO/RTO** -> quanto pode perder/ quanto pode ficar offline
* **Design Case** -> aplicar tudo num problema real 
* **Fan-Out** -> um evento -> várias ações paralelas
