---
title: 'Domain-Driven Design'
description: 'Notas sobre design estratégico e tático, bounded contexts, context mapping, aggregates, domain events e arquitetura hexagonal.'
date: '2026-10-11'
slug: '/notes/domain-driven-design/'
category: 'Architecture'
language: 'pt-BR'
status: 'study-note'
updatedAt: '2026-10-11'
order: 2
tags:
  - ddd
  - architecture
  - backend
related:
  - fundamentos-arquitetura-software
  - microsservicos-arquitetura-eventos
  - system-design-design-docs
published: true
source: 'Obsidian'
---

# DDD com Vernon Vaughn

### O que é e para que serve o Domain-Driven Design (DDD)?

Em essência, o DDD é uma abordagem para desenvolver software focado em **problemas de negócio complexos**. O objetivo principal é criar um software que seja um reflexo fiel da realidade da empresa, usando a mesma linguagem e os mesmos conceitos que os especialistas da área de negócio utilizam.

- **Problema que resolve:** Evita que o software, mesmo tecnicamente perfeito, seja conceitualmente desalinhado com as operações e regras reais da empresa.
- **Quando usar:** É mais valioso quando a complexidade do negócio é alta e suas regras mudam com frequência. Para problemas simples e óbvios, o esforço pode não valer a pena.
- **Quem se beneficia:** Desenvolvedores, arquitetos, líderes técnicos e também gestores, pois o DDD melhora a comunicação, o alinhamento e a tomada de decisão em todos os níveis.

### Pilares Fundamentais do DDD

O DDD se baseia em alguns conceitos essenciais que são a base para todo o resto.

| Conceito                                   | Descrição                                                                                                                                                                                                                                                                    |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Linguagem Ubíqua (Ubiquitous Language)** | É uma linguagem compartilhada e sem ambiguidades, criada em conjunto por desenvolvedores e especialistas de negócio. Essa linguagem é usada em **todas as conversas, diagramas e, principalmente, no código**.                                                               |
| **Contexto Delimitado (Bounded Context)**  | É a fronteira onde um modelo de software e sua Linguagem Ubíqua são válidos e consistentes. Uma mesma palavra (ex: "Cliente") pode ter significados diferentes em contextos diferentes (um "Cliente" para o faturamento é diferente de um "Cliente" para o suporte técnico). |
| **Knowledge Crunching**                    | É o processo contínuo de colaboração intensa entre a equipe técnica e os especialistas de domínio para refinar o conhecimento do negócio e traduzi-lo em um modelo de software útil.                                                                                         |

### Por que usar o DDD? Os Problemas Organizacionais

O texto destaca que muitos problemas de software são, na verdade, sintomas de problemas de comunicação na empresa.

- **Lei de Conway:** O software tende a espelhar a estrutura de comunicação da organização. Se a comunicação é falha e fragmentada, o software também será.
- **"Telefone sem Fio":** Em hierarquias longas, a intenção do negócio se perde e se distorce ao passar por várias camadas até chegar aos desenvolvedores.
- **Big Ball of Mud (Grande Bola de Lama):** Um código emaranhado e confuso muitas vezes é o resultado direto de uma comunicação ruim e de um entendimento fragmentado do negócio.
- **Solução do DDD:** Promover a **colaboração direta e contínua** entre especialistas de negócio e técnicos, idealmente em times multifuncionais (cross-functional), para que o entendimento seja claro e o modelo de software, coeso.

### O Design Estratégico: A Visão Macro

O Design Estratégico é a primeira etapa do DDD, focada em entender o cenário geral e definir as fronteiras dos modelos.

1. **Definir os Contornos:** Antes de mergulhar nos detalhes de implementação (Design Tático), o Design Estratégico mapeia as diferentes áreas do negócio e como elas se relacionam.
2. **Identificar os Contextos Delimitados:** A principal tarefa é identificar os `Bounded Contexts`. Cada contexto terá seu próprio modelo, sua própria linguagem e, idealmente, seu próprio time.
3. **Mapear as Relações:** Os contextos se relacionam, mas devem ser **fracamente acoplados**, ou seja, interagem de forma controlada sem depender dos detalhes internos uns dos outros. Isso evita que uma mudança em um contexto quebre outro.

### Domínios e Subdomínios: Onde Focar a Energia

O Design Estratégico ajuda a classificar as diferentes partes do negócio (subdomínios) para direcionar o investimento de forma inteligente.

| Tipo de Subdomínio                  | Descrição                                                                                                                               | Estratégia Recomendada                                                                                                                                            |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core Domain (Domínio Principal)** | É a área que representa o **diferencial competitivo** da sua empresa. Geralmente é a mais complexa e a que mais gera valor.             | **Investimento máximo**. Use toda a força do DDD, com modelagem profunda, colaboração intensa e desenvolvimento interno.                                          |
| **Supporting (Domínio de Suporte)** | São áreas necessárias para o Core Domain funcionar, mas que não são o seu diferencial. A complexidade é moderada.                       | **Desenvolvimento interno seletivo**. Construa uma solução, mas evite complexidade desnecessária. Não deve competir por atenção com o Core.                       |
| **Generic (Domínio Genérico)**      | São áreas importantes, mas que já são resolvidas por soluções de mercado (commodities). Ex: sistemas de faturamento, autenticação, etc. | **Comprar ou usar uma solução pronta**. A estratégia é integrar uma solução existente (open source, SaaS) com o mínimo de atrito possível, não construir do zero. |

Esse mapeamento é crucial para que a arquitetura do software e o esforço do time estejam alinhados com a estratégia do negócio, evitando desperdiçar energia em áreas que não geram vantagem competitiva.

### O que é o Mapeamento de Contextos (Context Mapping)?

Depois de identificar os diferentes `Bounded Contexts` (as fronteiras onde os modelos são consistentes), o Mapeamento de Contextos serve como um **mapa que descreve como esses contextos se relacionam e se integram**.

O foco não é apenas técnico (como conectar APIs), mas principalmente **organizacional e estratégico**: como os times colaboram, quem influencia quem e como a informação é trocada sem que um contexto "contamine" o outro com sua linguagem.

### Padrões de Relacionamento entre Contextos

O Mapeamento de Contextos define um catálogo de padrões para descrever essas relações. Cada padrão tem implicações tanto técnicas quanto sociais (na dinâmica dos times).

| Padrão                                                 | Descrição da Relação (Técnica e Social)                                                                                                                                                                                       | Quando Usar                                                                                                                                  |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Partnership (Parceria)**                             | Dois times têm destinos interligados e colaboram intensamente. O sucesso de um depende do outro. Exige planejamento e sincronização constantes.                                                                               | Quando a integração entre dois contextos é crítica e ambos estão em desenvolvimento. É um modelo caro e de alta coordenação.                 |
| **Shared Kernel (Núcleo Compartilhado)**               | Dois times concordam em compartilhar uma pequena parte do modelo (e do código). Qualquer mudança nesse núcleo precisa ser acordada entre ambos.                                                                               | Quando há uma sobreposição conceitual clara e pequena entre dois contextos e os times conseguem manter uma boa comunicação sobre ela.        |
| **Customer-Supplier (Cliente-Fornecedor)**             | Relação assimétrica. O time **Upstream** (fornecedor) define a agenda e fornece uma API/serviço. O time **Downstream** (cliente) consome e precisa se adaptar. O cliente pode negociar, mas o fornecedor tem a palavra final. | É o padrão mais comum em empresas, onde um time depende do trabalho de outro.                                                                |
| **Conformist (Conformista)**                           | O time Downstream (cliente) decide adotar o modelo do time Upstream (fornecedor) **sem tradução**. Ele se conforma com a linguagem e a estrutura do fornecedor.                                                               | Quando o modelo Upstream é bom, estável, ou quando o custo de criar uma tradução (ACL) é muito alto. Simplifica a integração.                |
| **Anti-Corruption Layer (ACL) (Camada Anticorrupção)** | O time Downstream (cliente) cria uma camada de "tradução" para proteger seu próprio modelo interno. A ACL converte o modelo do fornecedor para o modelo do cliente, isolando-o de linguagens confusas, legadas ou instáveis.  | Quando o modelo Upstream é um "Big Ball of Mud", legado, ou simplesmente inconsistente. Garante a autonomia e a pureza do modelo do cliente. |
| **Open Host Service (OHS) (Serviço de Host Aberto)**   | O time Upstream desenvolve e publica uma API bem documentada e padronizada, com a intenção de servir a múltiplos times Downstream. O foco é criar um serviço reutilizável e fácil de consumir.                                | Quando um contexto tem uma capacidade que é útil para várias outras partes da organização.                                                   |
| **Published Language (Linguagem Publicada)**           | Ligado ao OHS, é a linguagem explícita (esquemas de eventos, formatos de dados) que um contexto publica para o mundo exterior. Essa linguagem deve ser estável e fácil de entender.                                           | Sempre que um contexto precisa se comunicar com o exterior de forma controlada, sem expor todos os seus detalhes internos.                   |

O Mapeamento de Contextos é uma ferramenta poderosa para tornar as dependências entre as áreas do software **explícitas e deliberadas**. Ao escolher um padrão, você não está apenas definindo uma integração técnica, mas também estabelecendo um contrato social sobre como os times irão interagir.

### O que é o Design Tático (Tactical Design)?

Enquanto o **Design Estratégico** define o mapa geral (as "pinceladas largas"), o **Design Tático** foca nos detalhes de implementação **dentro de um único `Bounded Context`** (as "pinceladas finas").

Seu objetivo é estruturar o código de forma que ele reflita o modelo de negócio de maneira rica e expressiva, utilizando um conjunto de padrões de construção (building blocks).

### O Fluxo de Trabalho Interno: Como a Lógica Acontece

O texto descreve um fluxo comum para executar uma ação de negócio dentro de um contexto:

1. **Command (Comando):**
   - É uma **ordem** para que o sistema execute uma ação específica (ex: `AssessRiskCommand` - "Avalie este Risco"). Representa a intenção do usuário ou de outro sistema.
2. **Domain Service (Serviço de Domínio):**
   - Recebe o comando e **orquestra a lógica de negócio**. É usado quando uma regra de negócio é complexa e não pertence a uma única entidade. Ele executa a ação solicitada.
3. **Domain Event (Evento de Domínio):**
   - Após a conclusão da ação, o sistema dispara um **evento** para notificar o resto da aplicação que algo relevante aconteceu (ex: `RiskAssessedEvent` - "O Risco foi Avaliado").
   - Isso **desacopla os processos**: a parte do sistema que processou o evento não precisa saber quem vai reagir a ele. Outros componentes podem "ouvir" esse evento e continuar o fluxo de trabalho.

O fluxo é: **Comando → Serviço de Domínio executa a lógica → Evento de Domínio é disparado.**

### Componentes (Building Blocks) do Design Tático

Estes são os "tijolos" que você usa para construir seu modelo.

| Componente                              | Descrição                                                                                                                                                                                                                                                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Command (Comando)**                   | Um objeto que encapsula um pedido para executar uma ação. É imperativo e descreve _o que_ deve ser feito.                                                                                                                                                                                                        |
| **Domain Service (Serviço de Domínio)** | Um componente sem estado que contém lógica de domínio que não se encaixa naturalmente em nenhuma outra entidade. Ex: calculadoras complexas, coordenadores de processos.                                                                                                                                         |
| **Domain Event (Evento de Domínio)**    | Um objeto que representa um fato que ocorreu no passado. É usado para notificar outras partes do sistema de forma desacoplada.                                                                                                                                                                                   |
| **Policy (Política)**                   | Representa um conjunto de regras de negócio, restrições ou até mesmo algoritmos complexos (como um modelo de Machine Learning) que são parte central da lógica de domínio.                                                                                                                                       |
| **Module (Módulo)**                     | Um mecanismo para **organizar o código internamente** dentro de um `Bounded Context`. São como pastas ou pacotes que agrupam classes e funcionalidades relacionadas (ex: um módulo de `intake`, outro de `processing`). Ajudam a manter o código limpo e a evitar que o contexto vire uma "grande bola de lama". |

O Design Tático fornece as ferramentas e os padrões para traduzir o conhecimento de negócio, obtido através do Design Estratégico, em um código bem estruturado, organizado e, o mais importante, que fala a **Linguagem Ubíqua** do domínio.

### Aprofundando no Design Tático: O Aggregate e Seus Componentes

Esta seção detalha como os "blocos de construção" (building blocks) do Design Tático funcionam juntos para garantir que as regras de negócio sejam respeitadas. O conceito central que amarra tudo é o **Aggregate**.

### O que é um Aggregate? O Guardião da Consistência

O **Aggregate** é o padrão mais importante do Design Tático. Pense nele como uma **cápsula de consistência**.

- **Definição:** É um conjunto de objetos de domínio (Entidades e Objetos de Valor) que é tratado como **uma única unidade para modificações de dados**.
- **Propósito:** Seu principal trabalho é garantir que as **regras de negócio (invariantes)** sejam sempre satisfeitas dentro de uma transação. Nenhuma parte interna de um Aggregate pode ser modificada diretamente por um agente externo; toda alteração deve passar pelo "portão de entrada" do Aggregate, conhecido como **Aggregate Root**.
- **Exemplo:** Uma `Aplicação de Apólice` pode ser um Aggregate. Ela contém informações do cliente, itens, progresso, etc. Para submeter a aplicação, você envia um comando para o Aggregate `Aplicação`, e ele garante que todas as regras internas sejam validadas antes de mudar seu estado para "submetida".

### Os Blocos de Construção em Ação

O texto revisita os componentes do Design Tático, adicionando mais detalhes sobre como eles operam em conjunto com o Aggregate.

| Componente                              | Detalhes Adicionais e Papel                                                                                                                                                                                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Value Object (Objeto de Valor)**      | É um objeto definido por seus atributos, não por uma identidade. É imutável. Serve para dar nome a conceitos do domínio. Ex: um objeto `Progresso` (`Submitted`, `RiskAssessed`) é melhor do que usar um conjunto de flags booleanas soltas.                        |
| **Domain Service (Serviço de Domínio)** | O texto reforça que ele é **stateless (sem estado)**. Ele executa uma lógica de negócio que não pertence a um Aggregate específico, mas não guarda nenhuma informação entre as chamadas. Ele recebe dados, calcula e devolve um resultado.                          |
| **Policy (Política)**                   | São as regras de negócio que governam o comportamento do modelo. Elas não são apenas validações simples, mas podem ser cálculos complexos que determinam se uma transição de estado é válida.                                                                       |
| **Domain Event (Evento de Domínio)**    | É confirmado como um **fato que já aconteceu**, sempre no passado (ex: `ApplicationSubmitted`). O evento carrega dados ricos sobre o que ocorreu (ex: o valor do prêmio em um evento `RateCalculated`), permitindo que outros sistemas reajam de forma desacoplada. |

### De Onde Nascem os Eventos?

Eventos não surgem apenas de ações diretas do usuário. O texto destaca duas fontes principais:

1. **Ações do Usuário/Sistema (Commands):**
   - O fluxo é claro: a interface do usuário gera uma intenção, que vira um `Command`. O `Aggregate` processa o `Command`. Se for válido, o estado muda e um `Domain Event` é disparado para anunciar o fato.
   - **A interface solicita, o domínio decide, o evento registra.**
2. **A Passagem do Tempo:**
   - A simples passagem do tempo pode ser um gatilho para um evento de negócio. Por exemplo, o fim do dia pode disparar um evento `MonthEnded`.
   - **O mesmo momento no tempo pode gerar eventos diferentes em contextos diferentes**. Para o contexto de Vendas, o fim do mês é `MonthEnded`; para o contexto de Contabilidade, pode ser `LedgerPeriodClosed`. Isso reforça de forma brilhante como o **significado** de um fato depende do `Bounded Context`.

Juntando tudo, esses padrões do Design Tático permitem construir um modelo de domínio que não é apenas um repositório de dados, mas um sistema vivo, com comportamento rico e que protege ativamente suas próprias regras de negócio.

### O que é a Arquitetura Ports and Adapters (ou Arquitetura Hexagonal)?

É um padrão de arquitetura que tem um objetivo principal: **proteger o seu Modelo de Domínio da contaminação por detalhes de tecnologia**.

A ideia é criar uma separação clara entre o **núcleo da sua aplicação** (onde vive a lógica de negócio pura) e o **mundo exterior** (banco de dados, interfaces de usuário, APIs externas, sistemas de mensageria, etc.).

- **O Núcleo (O Hexágono):** Contém a lógica de negócio e o modelo de domínio. Ele não sabe nada sobre HTTP, SQL ou qualquer outra tecnologia. Ele é puro.
- **As Portas (Ports):** São as interfaces definidas **pelo núcleo**. Elas são os "portões de entrada e saída" do hexágono e definem como o núcleo quer interagir com o mundo, sempre em termos da linguagem de domínio.
- **Os Adaptadores (Adapters):** São os "plugs" que se conectam às portas. Eles vivem **fora do núcleo** e seu único trabalho é **traduzir** a comunicação entre o mundo tecnológico externo e o mundo puro do domínio.

Essa arquitetura impede que a escolha de um banco de dados ou de uma API de pagamentos dite como seu modelo de negócio deve ser estruturado.

### Os Dois Lados da Arquitetura

A interação acontece em duas direções:

#### 1. O Lado de Entrada (Driving Side)

É como as solicitações **entram** na sua aplicação.

- Uma requisição externa (ex: um clique no botão, uma chamada de API) chega a um **Adaptador de Entrada** (ex: um Controller REST, um consumidor de fila).
- Esse adaptador traduz a requisição tecnológica (ex: um JSON de um POST) em um **Comando** ou uma chamada que a **Porta de Entrada** do núcleo entende.
- O núcleo recebe a chamada em sua própria linguagem e executa a lógica de negócio, sem nunca saber de onde a solicitação veio.

#### 2. O Lado de Saída (Driven Side)

É como a sua aplicação **interage com o mundo exterior**.

- Quando o núcleo precisa fazer algo externamente (ex: salvar dados, enviar um pagamento), ele chama uma **Porta de Saída** (que é apenas uma interface, como `IRepositorioDeApelidos` ou `IGatewayDePagamento`).
- Um **Adaptador de Saída** implementa essa interface, traduzindo a necessidade do domínio para a tecnologia específica.
- Exemplos de Adaptadores de Saída mencionados no texto:
  - **Data Storage Adapter:** Implementa a porta de persistência, traduzindo os objetos do domínio para comandos SQL ou documentos NoSQL.
  - **Payments Adapter:** Implementa a porta de pagamento, traduzindo a intenção de cobrar um valor para a chamada de API específica de um gateway de pagamento (Stripe, PayPal, etc.).
  - **RPC Adapter:** Traduz uma chamada de negócio para um protocolo de chamada remota.
  - **Event Publisher Adapter:** Pega um Evento de Domínio e o publica em um sistema de mensageria (Kafka, RabbitMQ), lidando com a serialização e o transporte.

Em resumo, **Ports and Adapters** torna a infraestrutura um detalhe plugável. O modelo de domínio fica isolado e focado no que realmente importa (as regras de negócio), enquanto os adaptadores lidam com a "sujeira" da tecnologia. Isso resulta em um sistema mais flexível, testável e fácil de manter e evoluir.

### O que é o Event Sourcing?

Event Sourcing é um padrão de **persistência** que muda radicalmente a forma como salvamos os dados de um `Aggregate`.

Em vez de salvar apenas o **estado atual** do objeto (como em um banco de dados tradicional), o Event Sourcing salva a **sequência completa e ordenada de eventos (fatos) que ocorreram com esse objeto ao longo do tempo**.

A fonte da verdade não é mais uma "foto" do estado final, mas sim o "filme" completo de sua história.

### Como Funciona?

| Conceito                            | Descrição                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Event Stream (Fluxo de Eventos)** | É a lista ordenada de todos os `Domain Events` que aconteceram com uma instância específica de um `Aggregate`. Por exemplo, o histórico de uma `Cotação de Apólice` seria uma sequência como: `1. CotaçãoIniciada`, `2. LinhaDeItemAdicionada`, `3. OutraLinhaAdicionada`, `4. CotaçãoGerada`. Este fluxo _é_ o estado do aggregate. |
| **Replay (Reconstituição)**         | Para obter o estado atual de um aggregate, o sistema não faz um `SELECT` no estado final. Em vez disso, ele **lê o `Event Stream` do início ao fim e reaplica cada evento** a uma nova instância do objeto em memória. Ao final da leitura, o objeto está em seu estado mais recente.                                                |
| **Interpretação pelo Modelo**       | Um evento salvo no banco é apenas um dado. É o próprio `Aggregate` quem tem a lógica para **interpretar cada evento** durante o replay e saber como alterar seu estado. Isso garante que a lógica de negócio permaneça dentro do domínio.                                                                                            |

### Por que usar o Event Sourcing? Principais Vantagens

1. **Trilha de Auditoria Completa e Confiável (Audit Trail)**
   - Como cada mudança é um evento imutável, você tem um registro perfeito de tudo o que aconteceu com um objeto, desde sua criação. Isso é extremamente valioso para cenários de **compliance, auditoria e depuração**. Você pode responder não apenas "qual é o estado agora?", mas também "como chegamos até aqui?".
2. **Capacidade de "Viajar no Tempo"**
   - É possível reconstruir o estado de um aggregate em **qualquer ponto do passado**, bastando fazer o replay dos eventos até a data desejada.
3. **Riqueza de Informações para o Negócio**
   - O log de eventos é uma mina de ouro para análise de dados e Business Intelligence, pois captura o comportamento do usuário e do sistema em detalhes.
4. **Alinhamento com o Comportamento do Domínio**
   - A persistência reflete diretamente o comportamento (os eventos) do domínio, em vez de apenas sua estrutura de dados.

Em resumo, o Event Sourcing é uma abordagem poderosa que trata a **história de um objeto como um cidadão de primeira classe**. Em vez de apagar o passado ao salvar um novo estado, ele o preserva como uma sequência de fatos, oferecendo uma trilha de auditoria robusta e uma nova gama de possibilidades analíticas.

### DDD em um Monólito Modular (Monolithic Architecture)

Muitos associam DDD a microservices, mas o texto mostra que isso **não é uma regra**. É perfeitamente possível aplicar os princípios do DDD em uma aplicação monolítica (um único sistema implantado de uma vez).

A abordagem é chamada de **Monólito Modular**.

| Conceito                                | Descrição                                                                                                                                                                                                                                                                     |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bounded Contexts como Módulos**       | Cada `Bounded Context` se torna um **módulo** (um pacote, namespace) logicamente separado dentro do monólito. A separação é conceitual e de código, não física (em servidores diferentes).                                                                                    |
| **Isolamento com Ports and Adapters**   | Cada módulo pode (e deve) usar a arquitetura **Ports and Adapters** internamente para proteger seu próprio núcleo de domínio. Isso evita que os módulos criem dependências diretas e confusas entre si.                                                                       |
| **Comunicação via Message Bus Interno** | Para que os módulos conversem sem acoplamento forte, eles usam um **barramento de mensagens interno** (in-memory message bus). Em vez de um módulo chamar o outro diretamente, ele publica um `Evento` no barramento. Os módulos interessados assinam esses eventos e reagem. |
| **Baixo Acoplamento**                   | O módulo que emite um evento não sabe quem irá consumi-lo. Isso mantém os módulos independentes e facilita a evolução do sistema sem que uma mudança em um módulo quebre os outros.                                                                                           |

**Conclusão Principal:** Você pode ter os benefícios de limites de domínio claros e baixo acoplamento do DDD **sem a complexidade operacional** (deployment, monitoramento, rede) de uma arquitetura de microservices.

### Orquestração vs. Coreografia (Process Manager / Saga)

Este tema aborda como coordenar processos de negócio que duram várias etapas e passam por diferentes `Bounded Contexts`. Existem duas abordagens principais para isso:

#### 1. Coreografia (Choreography) - A Abordagem Descentralizada

- **Como funciona:** Cada `Bounded Context` reage a eventos de outros contextos e decide por conta própria o que fazer a seguir. Não há um "maestro" central. O fluxo de trabalho "emerge" das interações locais.
- **Exemplo:** O contexto de `Risk` ouve o evento `ApplicationSubmitted`, faz seu trabalho e publica `RiskAssessed`. O contexto de `Rate`, por sua vez, ouve o `RiskAssessed` e inicia seu próprio processo.
- **Pró:** Mais resiliente (sem ponto único de falha).
- **Contra:** O fluxo geral do processo fica espalhado e difícil de visualizar. Cada contexto precisa de um "adaptador" para traduzir eventos externos para sua linguagem interna.

#### 2. Orquestração (Orchestration) - A Abordagem Centralizada

- **Como funciona:** Um novo componente chamado **Process Manager** (ou **Saga** ou **Orquestrador**) é introduzido. Sua única responsabilidade é **coordenar o fluxo**.
- Ele ouve os eventos e, em vez de deixar os outros contextos decidirem o que fazer, ele envia **Comandos** diretos para o próximo `Bounded Context` na sequência.
- **Exemplo:** O `Process Manager` ouve o evento `ApplicationSubmitted` e envia o **comando** `AssessRisk` para o contexto de `Risk`. Depois, ele ouve o evento `RiskAssessed` e envia o **comando** `CalculateRate` para o contexto de `Rate`.
- **Pró:** O fluxo do processo de negócio fica explícito e centralizado em um único lugar, tornando-o mais fácil de entender, monitorar e modificar.
- **Contra:** Introduz um ponto de coordenação central.

**Conclusão Principal:** Enquanto a Coreografia distribui a lógica do fluxo, a Orquestração a centraliza em um `Process Manager`, que atua como um maestro, simplificando a lógica de integração dentro de cada `Bounded Context` participante.

# Core Domain e Design Estratégico

## Relação do DDD com System Design

O **Domain-Driven Design (DDD)** é uma abordagem que prioriza a profunda compreensão do negócio antes da implementação do software. Sua principal função não é ditar estruturas de código, mas sim melhorar a comunicação e criar um alinhamento entre os especialistas de negócio e as equipes de desenvolvimento.

### Principais Pilares do DDD

| Pilar                       | Descrição                                                                                                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Linguagem Ubíqua**        | Cria um vocabulário comum e sem ambiguidades para todos os envolvidos (negócio, desenvolvimento, documentos e código), garantindo que os termos tenham o mesmo significado para todos. |
| **Foco no Domínio**         | O ponto de partida é entender o "domínio do problema" (o que o software precisa resolver) e não a "solução técnica" (quais tecnologias usar).                                          |
| **Especialista do Domínio** | O conhecimento mais valioso sobre as regras de negócio vem do _domain expert_, que deve ser a fonte primária para a modelagem do sistema, e não dos desenvolvedores.                   |
| **Core Domain**             | Identifica a área mais crítica e valiosa do negócio, que diferencia a empresa no mercado. Essa área deve receber o máximo de atenção e os melhores recursos da equipe.                 |

### Relação com o System Design

O DDD e o System Design são complementares:

1. **DDD define o "quê"**: Mapeia as áreas do negócio (subdomínios), seus limites e como se relacionam.
2. **System Design define o "como"**: Usa o entendimento do DDD para tomar decisões de arquitetura, como bancos de dados, comunicação entre serviços e integrações.

O DDD não é uma fase isolada, mas um princípio que "contamina" todo o ciclo de desenvolvimento, garantindo que o software, do planejamento ao código, seja um reflexo fiel e coerente da realidade do negócio. Ele é especialmente valioso em cenários de alta complexidade, onde um modelo de negócio bem definido é crucial para o sucesso do projeto.

Claro! Aqui vai uma explicação direta:

## Value Object (Objeto de Valor)

- **Imutável**, sem identidade própria. Dois VOs são iguais se **todos seus atributos** forem iguais.
- Ex: `Endereco`, `Dinheiro`, `CPF`, `IntervaloDeData`.
- Serve para descrever/medir/quantificar algo no domínio.

## Aggregate (Agregado)

- **Cluster de objetos** tratados como uma unidade. Tem uma **raiz (Aggregate Root)** com identidade global.
- A raiz é a única porta de entrada; fora dela, ninguém mexe nos filhos.
- Ex: `Pedido` (raiz) contém `ItemPedido` (VOs/entidades internas). Só o `Pedido` manipula os itens.
- Garante **consistência** e **invariantes** do domínio.

## Repository (Repositório)

- Abstração de **persistência** para **Aggregate Roots** apenas.
- Parece uma coleção em memória: `buscarPorId()`, `salvar()`, `remover()`.
- Esconde detalhes de banco, ORM, etc. O domínio não sabe como os dados são armazenados.

### Como se relacionam

```
Repository ──persiste──> Aggregate Root
                            │
                    ┌───────┴───────┐
                    │               │
              Entities          Value Objects
              (identidade)      (imutáveis, sem ID)
```

- **Repository** só trabalha com **Aggregate Roots**. VOs nunca são persistidos diretamente — eles vivem **dentro** de uma entidade ou aggregate.
- **VO** vive dentro do Aggregate, descrevendo suas propriedades.
- **Aggregate Root** é a fronteira transacional: ao carregar/salvar via Repository, tudo dentro do aggregate é consistido junto.

Resumo prático:

- **VO** = o _quê_ (valor, descrição)
- **Entity** = _quem_ (identidade)
- **Aggregate** = fronteira de consistência
- **Repository** = como você busca/salva aggregates\

## Design Patterns e Padrões de Arquitetura

### Factory

- **Factory Method** → método nomeado na própria classe (ex: `Pedido.novoPagamento()`) quando a criação é simples.
- **Factory Class** → classe separada quando a construção exige dependências externas, coordenação ou muita lógica.
- **Objetivo**: encapsular complexidade de criação, evitar `new` espalhado, expressar intenção.

### Specification

- Regra verificável, **combinável** com `and`/`or`.
- Usos:
  - **Validação de formato** (ex: `NaoVazio`, `InteiroPositivo`)
  - **Regras de negócio variáveis** (ex: política de aposentadoria que muda)
- Vantagem: regras pequenas, reutilizáveis, fáceis de trocar — sem poluir o agregado.

### Mediator

- Desacopla **quem publica** um evento de **quem reage** a ele.
- O mediator localiza e aciona os handlers. Reduz dependências diretas.
- Útil quando um evento dispara **múltiplas reações**.

### Arquitetura Hexagonal (Ports & Adapters)

- **Núcleo** (domínio + aplicação) não depende de tecnologia externa.
- **Portas**: contratos de entrada (casos de uso) e saída (repositórios, envio de e-mail etc.)
- **Adaptadores**: implementam as portas (controllers, ORM, filas).
- Resultado: domínio **blindado** contra framework, banco, HTTP.

### Arquitetura em Camadas

- Separa: **Apresentação** → **Aplicação** → **Domínio** → **Infraestrutura**.
- Impede que ORM/framework molde o modelo de negócio (invasão do domínio).

### Decisão Prática

| Pattern       | Use quando...                            |
| ------------- | ---------------------------------------- |
| Factory       | Criação é complexa ou varia por contexto |
| Specification | Regras precisam ser combinadas/trocadas  |
| Mediator      | Eventos disparam várias reações          |
| Hexagonal     | Precisa blindar o domínio da tecnologia  |

**Regra de ouro**: pattern só vale se resolve um problema real no seu contexto.

## Eventos de Domínio e Eventos de Integração

### Evento de Domínio

- **Fato de negócio já consumado** → nome no passado: `ReservaFeita`, `ClienteRegistrado`
- Carrega: timestamp, ID do agregado, dados do ocorrido
- Não é hook técnico (ORM, persistência) — é decisão do domínio
- Propaga **reações internas** sem acoplar agregados

### Evento de Integração

- Atravessa **fronteira entre contextos** (ex: domínio de reserva → contexto de e-mail)
- Payload pode ser diferente do evento interno (adaptado pro consumidor)
- Separa o que é reação interna do que é comunicação externa

### Event Sourcing

- Eventos viram **fonte de histórico**, não só notificações
- Sistema persiste a **sequência de fatos**, não só o estado final
- Benefícios: auditoria, projeções, rastreabilidade

### Mensageria

- **Opcional** — evento de integração existe independente dela
- Quando usada: processamento **assíncrono**, reduz acoplamento temporal
- Quem produziu não espera a reação do consumidor

### Impacto no Design

| Aspecto          | Benefício                                             |
| ---------------- | ----------------------------------------------------- |
| Acoplamento      | Agregados não se chamam diretamente                   |
| Testes           | Valida o fato emitido, testa handlers isoladamente    |
| Responsabilidade | Cada reação vira uma preocupação separada             |
| Fluxo            | Decisão → Publicação → Reações (3 momentos distintos) |

### Resumo do Fluxo (ex: reserva)

```
Decisão de negócio (reservar)
    → Evento de domínio: ReservaFeita
        → Reação interna: atualizar contagem de spots
        → Evento de integração: ReservaConfirmada
            → Contexto de e-mail: enviar confirmação
```

## Event Storming

**Workshop colaborativo** para descobrir o domínio visualmente com post-its em ordem cronológica.

### Elementos (cores)

| Elemento               | Significado                                              |
| ---------------------- | -------------------------------------------------------- |
| **Evento** (laranja)   | Fato já ocorrido (`ReservaRealizada`) — ponto de partida |
| **Comando** (azul)     | Ação que dispara um evento                               |
| **Actor** (amarelo)    | Quem inicia a ação                                       |
| **Policy** (roxo)      | Regra reativa automática (`se evento X, então faz Y`)    |
| **Agregado**           | Fronteira de consistência que emerge dos eventos         |
| **Hotspot** (vermelho) | Dúvida, risco, pendência                                 |

### Fluxo do workshop

1. Eventos são organizados em **linha do tempo** (causa e efeito)
2. Comandos são colocados ao lado dos eventos que produzem
3. Policies revelam **automatismos** do sistema
4. Agregados **emergem** do mapa — não são inventados antes
5. Hotspots marcam o que precisa ser investigado depois

### O que se descobre

- **Operações** necessárias (comandos)
- **Fronteiras** de consistência (agregados)
- **Limites** entre contextos (bounded contexts)
- **Lacunas** e ambiguidades no fluxo
- **Linguagem ubíqua** com suporte visual compartilhado

### Participantes

Domain experts + produto + desenvolvimento — **todos juntos**, em pé.

### Resultado prático

Reduz modelagem prematura, torna o fluxo explícito e acelera o alinhamento. Os contextos descobertos podem virar módulos ou microsserviços — a separação é de **responsabilidade**, não de deploy.

## Active Record vs Data Mapper

Ambos são padrões de ORM (Object-Relational Mapping), mas diferem fundamentalmente em **quem controla a persistência** e **como as entidades se relacionam com o banco**.

### Active Record

Cada **objeto de domínio é também responsável pela própria persistência**. A entidade contém métodos como `save()`, `update()`, `delete()`.

**Características:**

- O objeto de domínio estende ou é uma instância de uma classe base que fornece os métodos de persistência
- Cada instância corresponde a uma linha no banco
- Acoplamento forte entre lógica de negócio e camada de dados
- Menos código boilerplate para casos simples

**Exemplo (Ruby on Rails / Laravel Eloquent):**

```ruby
user = User.new(name: "Ana", email: "ana@exemplo.com")
user.save               # persiste no banco
user.update(name: "Ana Silva")  # atualiza
user.destroy            # deleta
```

**Exemplo (TypeORM com Active Record):**

```typescript
@Entity()
class User extends BaseEntity {
  @Column() name: string;
  @Column() email: string;
}

const user = User.create({ name: 'Ana', email: 'ana@exemplo.com' });
await user.save();
```

### Data Mapper

A entidade de domínio é **ignorante sobre persistência** — ela é um **POCO/POJO simples**. Um mapper separado (repositório) é responsável por sincronizar o objeto com o banco.

**Características:**

- Objetos de domínio são "puros" (sem dependência de infraestrutura)
- Separação clara entre lógica de negócio e persistência
- Mais adequado para domínios complexos (DDD)
- Requer mais código boilerplate (repositórios explícitos)

**Exemplo (TypeORM com Data Mapper / Doctrine / Hibernate):**

```typescript
@Entity()
class User {
  @Column() name: string;
  @Column() email: string;
}

// Repositório explícito
const userRepo = dataSource.getRepository(User);

const user = new User();
user.name = 'Ana';
user.email = 'ana@exemplo.com';
await userRepo.save(user);

const found = await userRepo.findOneBy({ name: 'Ana' });
```

### Comparação Direta

| Aspecto                             | Active Record                                                                 | Data Mapper                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Onde fica a lógica de persistência? | No próprio objeto                                                             | Em um repositório separado                                                  |
| Acoplamento                         | Alto (entidade conhece o banco)                                               | Baixo (entidade é "inocente")                                               |
| Complexidade do domínio             | Simples a médio                                                               | Médio a complexo                                                            |
| Testabilidade                       | Menos isolada                                                                 | Mais isolada (fácil mockar repositório)                                     |
| Código                              | Menos boilerplate                                                             | Mais boilerplate                                                            |
| Frameworks famosos                  | Rails ActiveRecord, Laravel Eloquent, Sequelize, TypeORM (modo active record) | Doctrine, Hibernate, SQLAlchemy (modo clássico), TypeORM (modo data mapper) |

### Quando usar cada um?

**Active Record** — ideal para:

- CRUDs simples
- Prototipação rápida
- Aplicações pequenas/médias
- Equipes menores
- Frameworks full-stack monolíticos (Rails, Laravel)

**Data Mapper** — ideal para:

- Domínios complexos com muitas regras de negócio
- Aplicações que seguem DDD (Domain-Driven Design)
- Testes unitários mais isolados
- Sistemas com múltiplas fontes de dados
- Quando você quer que a camada de domínio seja independente de framework

> ⚠️ **Nota importante:** Muitos ORMs modernos suportam ambos os padrões. TypeORM, por exemplo, permite que você use `extends BaseEntity` (active record) ou `dataSource.getRepository(Entity)` (data mapper) com as mesmas entidades.
