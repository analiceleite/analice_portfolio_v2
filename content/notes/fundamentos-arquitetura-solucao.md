---
title: 'Fundamentos de Arquitetura de Solução'
description: 'Notas sobre arquitetura de solução, software enterprise, atributos de qualidade, APIs, gateways, BFF e documentação arquitetural.'
date: '2026-10-11'
slug: '/notes/fundamentos-arquitetura-solucao/'
category: 'Solution Architecture'
language: 'pt-BR'
status: 'study-note'
updatedAt: '2026-10-11'
order: 6
tags:
  - solution-architecture
  - enterprise
  - architecture
related:
  - system-design-design-docs
  - microsservicos-arquitetura-eventos
  - fundamentos-arquitetura-software
published: true
source: 'Obsidian'
---

> 📖 Descrição
> Explore o universo da arquitetura de soluções, mergulhando nos principais padrões de design e frameworks. Este módulo fornece uma base sólida em boas práticas e estratégias eficientes para estruturar soluções de TI.

# Software Enterprise

São grandes sistemas projetados para grandes corporações, essas corporações podem abranger:

- Grande empresa ou uma unidade de negócios de uma grande empresa
- Agência de governo ou uma unidade de uma agência governamental
- Multinacional que engloba diferentes tipos de negócio (por exemplo, uma multinacional)
- Pequenas e médias empresas que operam de forma global

## Ecossistema Enterprise

Para um software nascer ele precisa fazer parte de um ciclo ou uma estrutura, a governança garante que as pessoas, processos e tecnologia estejam alinhadas para então, conceber os softwares enterprise com contexto.

## Características de um Software Enterprise

Um Arquiteto de Soluções não pensa apenas na empresa, mas sim no todo, em como manter uma solução que realmente traga valor para a empresa.

Um Software Enterprise tem as seguintes características:

- **Escalabilidade**: capacidade do software de se manter operando independente da quantidade de pessoas usando, ou seja, se tenho uma taxa de resposta de 100ms com uma pessoa acessando, preciso dessa mesma taxa com 1000
- **Disponibilidade**: disponibilidade envolve custo, estratégia e força da solução para se manter operante em momentos de stress
- **Segurança**: corresponde a dados, operação, autenticação, rede e compartilhamento de informação
- **Customização e Modularizarão**: por muito tempo foi preciso se adaptar a como os sistemas funcionavam, as a customização de sistema hoje é um grande diferencial competitivo, quanto mais customizado, mais caro
- **Integração**: quando se trabalha em pequenos softwares dificilmente haverá necessidade de integração, mas em ambiente enterprise é fundamental, meu sistema precisa conversar com sistemas de terceiros e vise e versa
- **Observabilidade**: garantir que meu sistema está funcionando e que os sistemas de terceiros estão também, se não consigo rastrear o meu sistema em tempo real para ter logs assertivos estou falhando na observabilidade

> As iniciativas Low Code/ No Code tem grande vantagem porque viabilizam a criação de pequenos softwares rapidamente

# Solution Architecture

- Processo de definição da estrutura, componentes, módulos, interfaces de uma solução de software para satisfazer requisitos funcionais e não funcionais bem como seu comportamento
- Define / sugere a stack de tecnologia, plataformas, ferramentas, infraestrutura que serão utilizadas para implementar a solução
- Provê um **blueprint** do desenho e caminhos do desenvolvimento, integração de uma solução para sua melhor eficiência
- Normalmente é praticada em sistemas de Software Enterprise

> Blueprint
> No contexto da arquitetura de soluções, um "blueprint" é um plano detalhado ou um projeto que serve como um guia para o desenvolvimento e a integração de uma solução de software. Ele provê o desenho e os caminhos para garantir a melhor eficiência da solução.

## Pessoa Arquiteta de Solução

- Diversos domínios, especialmente entendimento do negócio
- Conhecimento de diversas tecnologias de acordo com experiências anteriores
- Consegue levar em consideração contexto, restrições de negócios, aspectos operacionais, custos e técnicos
- Preparado para entregar soluções complexas para ambientes enterprise

## Soft Skills de um Arquiteto

- Saber se adaptar em diversos tipos de projetos e contextos
- Comunicação
- Liderança
- Pensamento estratégico
- Criatividade
- Inteligência emocional
- Trabalho em equipe
- Saber ouvir

## Princípios para Levar em Consideração

- Alinhamento com objetivos do negócio
- Flexibilidade
- Reusabilidade
- Interoperabilidade (como meu sistema vai se comunicar com outros)
- Mantenabilidade
- Compliance com normas regulatórias
- Portabilidade

> O que é uma boa arquitetura
> "Uma boa arquitetura de solução abrange os casos de uso de negócio, a solução técnica e os serviços de infraestrutura subjacentes como componentes separados. Ele também pode ser usado para calcular o custo total de propriedade (TCO) do sistema, para que os gestores da empresa possam entender o impacto financeiro da solução."

## TCO (Total Cost of Ownership)

**Total Cost of Ownership (TCO)**, ou Custo Total de Propriedade, é uma análise financeira que calcula o custo total de um produto ou sistema ao longo de seu ciclo de vida. Para uma aplicação, o TCO inclui não apenas o custo inicial de aquisição ou desenvolvimento, mas também todos os custos diretos e indiretos associados à sua operação, manutenção e desativação.

### Formatos de custos

- Aquisição
- Implementação
- Operação
- Manutenção
- Inativação

## Diferença entre Enterprise Architecture e Solution Architecture

- EA possui uma visão da corporação como um todo, já a SA tem um foco normalmente em uma solução específica
- EA: planejamento, implementação da estrutura organizacional de uma corporação, incluindo: pessoas, processos e tecnologia.
- SA: define a estrutura, características, comportamentos e relações entre um sistema específico

## 3 Níveis da Arquitetura de Solução

- **Arquitetura focada no negócio (Nível 0)**: entender os requisitos, pensar no negócio, contempla _visão e escopo_
- **Arquitetura focada na área técnica (Nível 1)**: quais tecnologias utilizar, quantos desenvolvedores
- **Arquitetura focada no deployment (Nível 2)**: desenhar uma solução cloud para a aplicação rodar na nuvem

### Nível 0 - Visão

- A visão deixa claro os objetivos da solução de forma mais empírica, lógica e que deixe claro sua razão de existir
- Define os principais objetivos que vão guiar a solução
- Apresenta uma visão de alto nível do que a solução vai realizar, suas necessidades, bem como os envolvidos

### Nível 0 - Escopo

- Define os limites da solução
- Problema que será resolvido, requisitos funcionais e não funcionais
- Componentes, sistemas e tecnologias
- Considera restrições e pressupostos que podem influenciar no design da solução

## Domínio e Contextos

- Entendimento aprofundado do negócio
- Ver o negócio pelo ponto de vista dos seus participantes (vendedor, parceiro, diferentes departamentos, etc)
- Como esses contextos se comunicam e por qual "linguagem"

## Lei de Conway

A Lei de Conway, em termos simples, afirma que **as organizações que projetam sistemas são limitadas a produzir designs que são cópias das estruturas de comunicação dessas organizações.**

Isso significa que a forma como uma equipe ou empresa é organizada e como seus membros se comunicam (ou não se comunicam) terá um impacto direto na arquitetura e no design do produto ou sistema que eles criam. O sistema que emerge espelha as relações sociais e de comunicação da equipe que o construiu.

A Lei de Conway nos lembra que, ao projetar um software ou qualquer sistema complexo, a estrutura da equipe é tão importante quanto a tecnologia ou os requisitos técnicos. Se você quer um sistema modular e bem integrado, suas equipes precisam ser capazes de se comunicar e colaborar de forma modular e integrada.

## View e Viewpoints

Uma visão (view) é uma **representação de um ou mais aspectos estruturais de uma arquitetura** que ilustra como a arquitetura aborda uma ou mais questões mantidas por um ou mais de seus stakeholders.

Um ponto de vista (viewpoint) é uma **coleção de padrões, modelos e convenções para construir um tipo de visão**. Ele define as partes interessadas cujas preocupações são refletidas no ponto de vista das diretrizes, princípios e templates para a construção de seus pontos de vista.

## 4+1 View Model Architecture

O "4+1 View Model of Architecture" é uma forma de descrever a arquitetura de um software olhando para ele de diferentes ângulos ou perspectivas. Pense nele como um mapa complexo que precisa de várias camadas para ser totalmente compreendido.

Ele é chamado de "4+1" porque consiste em quatro visões principais, que são validadas e ilustradas por uma quinta visão (o "+1").

As quatro visões principais são:

1.  **Visão Lógica (Logical View):**

    - **O que é:** Descreve a funcionalidade do sistema, ou seja, o que o software _faz_ para o usuário final. Pense nos principais componentes do sistema, suas responsabilidades e como eles se relacionam, mas sem se preocupar com a tecnologia específica ou onde eles vão rodar.
    - **Exemplo:** No design orientado a objetos, seriam as classes, objetos e suas interações. É como o "cérebro" do sistema, definindo as capacidades.

2.  **Visão de Processos (Process View):**

    - **O que é:** Foca nos aspectos de concorrência e sincronização. Como as diferentes partes do sistema _interagem_ e se comunicam enquanto estão em execução. Se há várias tarefas acontecendo ao mesmo tempo, como elas são coordenadas para funcionar sem problemas.
    - **Exemplo:** Como diferentes módulos de um aplicativo se comunicam em tempo real, ou como várias requisições de usuários são processadas simultaneamente. É como o "sistema circulatório" do software.

3.  **Visão Física (Physical View):**

    - **O que é:** Descreve o mapeamento do software para o hardware, ou seja, _onde_ o software realmente roda. Isso inclui servidores, redes, máquinas virtuais e como o sistema é distribuído fisicamente.
    - **Exemplo:** Onde os bancos de dados estão localizados, quais servidores hospedam o frontend e o backend, como eles se conectam através da rede. É como o "corpo" físico do sistema.

4.  **Visão de Desenvolvimento (Development View):**
    - **O que é:** Mostra a organização estática do software no ambiente de desenvolvimento. Como o código é estruturado para os desenvolvedores. Isso inclui módulos, pacotes, bibliotecas e como eles são organizados para facilitar o trabalho da equipe.
    - **Exemplo:** A estrutura de pastas do projeto, as dependências entre os diferentes componentes de código. É como o "projeto de engenharia" ou o "manual de montagem" para quem está construindo o software.

E a quinta visão, o **'+1'**:

- **Visão de Cenários (Scenarios/Use Cases):**
  - **O que é:** São casos de uso ou histórias que ilustram como o sistema será utilizado na prática. Eles servem para validar as outras quatro visões, mostrando como elas funcionam juntas para atender aos requisitos funcionais e não funcionais.
  - **Exemplo:** "Um usuário faz login, pesquisa um produto e adiciona ao carrinho." Este cenário atravessa as visões lógica (funcionalidades de login, busca, carrinho), de processo (como as interações acontecem), física (onde os dados e serviços estão) e de desenvolvimento (quais módulos de código são envolvidos). É como a "história" que dá vida ao mapa.

Em resumo, o 4+1 View Model ajuda arquitetos a criar uma descrição completa e compreensível da arquitetura de um software, permitindo que diferentes partes interessadas (desenvolvedores, gerentes, usuários) entendam o sistema de sua própria perspectiva.

| Nome correto     | Também aparece como         | Foco                       |
| ---------------- | --------------------------- | -------------------------- |
| Logical View     | ---                         | Funcionalidade             |
| Process VIew     | Runtime View                | Concorrência / comunicação |
| Development View | Implementation / Module     | Organização do código      |
| Physical View    | Deployment / Infrastructure | Onde roda                  |
| Scenarios        | Use Cases                   | Validação                  |

# Design Patterns

São soluções comuns para diversos tipos de problemas

## N-tier / N-layer

A arquitetura N-layer (ou N-tier) é um padrão de design que organiza um sistema em camadas lógicas e, muitas vezes, fisicamente separadas, cada uma com responsabilidades específicas.

**Principais pontos:**

- **Definição**: Divide a aplicação em camadas (ex: Apresentação, Aplicação/Negócio, Dados, Banco de Dados).
- **Responsabilidades**: Cada camada tem um papel distinto (ex: interface do usuário, lógica de negócio, acesso a dados, armazenamento).
- **Independência**: As camadas são independentes e se comunicam de forma controlada, geralmente com a camada adjacente.
- **Benefícios**: Promove modularidade, manutenibilidade, escalabilidade e reusabilidade.
- **Bypass**: Acessar uma camada não adjacente (bypass) é possível, mas geralmente desaconselhado, pois viola os princípios da arquitetura e pode gerar problemas de manutenção e segurança.

## Multi-tenant

Em software, um **Tenant** (inquilino) representa um grupo isolado de usuários, tipicamente uma organização ou cliente, que compartilha a mesma instância de uma aplicação. Seus dados e configurações são logicamente separados dos outros tenants, permitindo que uma única aplicação atenda a múltiplas entidades de forma independente e segura.

## Stateless vs Stateful

**Aplicação Stateful**: Armazena o estado (dados) em si mesma. Se a instância da aplicação falhar, os dados associados a essa instância são perdidos, o que dificulta a escalabilidade horizontal.

**Aplicação Stateless**: Não armazena o estado em si mesma. Ela utiliza abordagens externas para armazenamento de dados (como logs na nuvem, bancos de dados na nuvem, etc.), o que facilita a escalabilidade horizontal, pois novas instâncias podem ser adicionadas ou removidas sem perda de dados de sessão ou transação.

## Serverless

> A aplicação (frontend estático no S3) envia requisições para o API Gateway, que as roteia para uma função Lambda. Esta função processa a requisição, interage com serviços como S3 (para dados adicionais) e DynamoDB (para persistência), e envia logs de execução para o CloudWatch Logs (e eventos de auditoria para o CloudTrail). Todos esses serviços operam sob um modelo de pagamento por uso, escalando automaticamente e ativando-se apenas quando há demanda, apesar da possibilidade de cold starts na Lambda.

**Não é apenas Lambda:** Funções como AWS Lambda são um exemplo popular de computação serverless, mas o conceito se estende a outros serviços como bancos de dados (DynamoDB, Aurora Serverless), filas de mensagens (SQS), APIs (API Gateway), armazenamento (S3), etc.

**Conceito geral de serviço na nuvem:** É uma abstração que permite aos desenvolvedores focar no código e na lógica de negócio, delegando a gestão da infraestrutura ao provedor de nuvem.

**Sem preocupação com servidores, dimensionamento ou deployment de infraestrutura:** O provedor de nuvem gerencia automaticamente a alocação de recursos, o escalonamento (para cima ou para baixo) e a manutenção dos servidores subjacentes.

**Modelo de pagamento on-demand:** Você paga apenas pelo tempo de execução do seu código ou pelos recursos consumidos, sem custos fixos por servidores ociosos.

## Microsserviços

> No desenho, o "broker" (ou **broker de mensagens**) atua como o **intermediário central para a dinâmica de mensageria assíncrona** entre os microsserviços.

Microsserviços são pequenas aplicações independentes, cada uma com uma responsabilidade específica e seu próprio banco de dados. Eles promovem a autonomia das equipes, permitem o uso de diferentes tecnologias e facilitam a escalabilidade e o baixo acoplamento. A comunicação ideal entre eles é **assíncrona, via eventos**, o que aumenta a resiliência do sistema: se um serviço falhar, os outros continuam operando e as mensagens pendentes são processadas quando o serviço se recupera. No entanto, essa arquitetura adiciona complexidade em áreas como deployment, observabilidade e troubleshooting, exigindo maturidade da organização e dos times.

## CQRS (Command Query Responsibility Segregation)

- **Separação de Responsabilidades**: O cerne do CQRS é a segregação das operações de escrita (Comandos) e leitura (Consultas) na camada da aplicação.
- **Bancos de Dados Separados (Geralmente)**: É muito comum, e frequentemente uma das maiores vantagens, ter modelos de dados otimizados e, por vezes, bancos de dados físicos separados para escrita e leitura. Isso permite escalar e otimizar cada lado independentemente.
- **Comandos "Fire and Forget"**: A ideia de que uma requisição de escrita (Comando) retorna apenas um status (sucesso/falha/aceito) e não o objeto completo ou um ID gerado é uma característica importante. Isso reflete a natureza assíncrona e transacional dos comandos, onde o cliente não precisa esperar o processamento completo para continuar.

## Entendendo Cache

O cache ajuda a economizar tempo e otimizar o uso de uma aplicação, se eu faço uma requisição uma vez e demora 900ms para retornar, ao fazer a segunda e for a mesma requisição, se ela estiver salva no cache vai ser muito mais rápido de retornar, evitando processamento pesado.

### Estratégias de Invalidação de Cache

- Os dados do cache podem ficar ultrapassados porque se dado for atualizado o cache fica inconsistente.

* Time based invalidation: Daqui 10 horas quero que esse cache desapareça, por exemplo
* Least Recently Used (LRU)
* Most Recently Used (MRU)
* Least Frequently Used (LFU)
* TTL-based invalidation
* Write-through invalidation
* Write-back invalidation

## Distributed Locking

O Distributed Locking (Bloqueio Distribuído) é um mecanismo usado em sistemas distribuídos para gerenciar o acesso a recursos compartilhados e evitar problemas de concorrência.

Em resumo, ele:

- **Evita problemas de concorrência**: Garante que apenas um processo ou serviço acesse um recurso crítico por vez.
- **Assegura a consistência de dados**: Previne que múltiplas operações simultâneas corrompam os dados.
- **Reduz a contenção de recursos**: Ajuda a coordenar o acesso, otimizando o uso dos recursos.
- **Evita deadlocks**: Impede situações onde processos ficam esperando uns pelos outros indefinidamente.
- **Aumenta a eficiência**: Garante que os recursos sejam utilizados de forma controlada e eficaz.

Ferramentas comuns para implementar Distributed Locking incluem Apache Zookeeper, ETCD, Redis e Consul.

## Configuration

O padrão **Configuration** (ou Gerenciamento de Configuração Dinâmica) é uma abordagem para permitir que as configurações de uma aplicação sejam alteradas e aplicadas **em tempo real**, sem a necessidade de reiniciar a aplicação ou realizar um novo deploy.

### O Problema que Resolve

Em sistemas tradicionais, configurações como senhas de banco de dados, chaves de API, credenciais de e-mail, ou até mesmo flags para ativar/desativar funcionalidades, são muitas vezes lidas apenas no momento em que a aplicação é iniciada. Se você precisar mudar uma dessas configurações, a única forma de a aplicação "ver" a mudança é reiniciando-a ou fazendo um novo deploy com a configuração atualizada.

Isso é problemático em ambientes modernos, especialmente com microsserviços e alta disponibilidade, porque:

- **Causa downtime:** Mesmo que breve, reiniciar uma aplicação significa que ela ficará indisponível por um período.
- **Reduz agilidade:** Mudanças simples exigem um processo de deploy completo, que pode ser demorado e propenso a erros.
- **Dificulta a escalabilidade:** Em um ambiente com muitas instâncias da mesma aplicação, coordenar o reinício de todas elas para uma simples mudança de configuração é complexo.

### Como Funciona (A Essência do Padrão)

A ideia central do padrão Configuration é **externalizar** as configurações da aplicação e permitir que ela as **recarregue dinamicamente**.

1.  **Configurações Externalizadas:** Em vez de ter as configurações "hardcoded" no código ou em arquivos locais que são empacotados com a aplicação, elas são armazenadas em um serviço externo e centralizado. Exemplos de onde essas configurações podem viver:

    - Um servidor de configuração dedicado (como Spring Cloud Config).
    - Um serviço de chave-valor distribuído (como Consul, etcd, Apache Zookeeper).
    - Um serviço de gerenciamento de segredos (como HashiCorp Vault, AWS Secrets Manager, Azure Key Vault).
    - Até mesmo um banco de dados simples.

2.  **Mecanismo de Recarregamento Dinâmico:** A aplicação é projetada para não apenas ler as configurações na inicialização, mas também para ter um mecanismo que permite buscar e aplicar novas configurações enquanto está em execução. Existem algumas formas de fazer isso:
    - **Polling:** A aplicação periodicamente (a cada X minutos, por exemplo) consulta o serviço de configuração externo para verificar se há atualizações. Se houver, ela as carrega.
    - **Push/Event-driven:** O serviço de configuração externo notifica a aplicação (por exemplo, via um webhook ou uma fila de mensagens) quando uma configuração é alterada. A aplicação então reage a esse evento e recarrega as configurações.
    - **Endpoint Dedicado (o que você mencionou):** A aplicação expõe um endpoint HTTP (uma API interna) que, quando chamado, instrui a aplicação a recarregar suas configurações do serviço externo. Isso pode ser acionado manualmente por um administrador ou por um script automatizado.

## Secret Management

- Credenciais não podem ficar voando na empresa
- Processos para rotacionar credenciais são importantes
- Serviços gerenciados e soluções ajudam nessa tarefa
  - Hashicorp Vault
  - AWS Secret Manager
    - Armazenamento de secrets
    - Rotacionamento automático de secrets nos serviços como RDS
    - SDK para recuperação dos secrets em tempo de execução

## Circuit Breaker

O padrão **Circuit Breaker** (Disjuntor) em software funciona exatamente como um disjuntor elétrico, mas para serviços.

Em resumo:

- **Propósito:** Protege sua aplicação de tentar repetidamente acessar um serviço externo (ou componente interno) que está falhando, evitando que a falha desse serviço cause uma falha em cascata em todo o seu sistema.
- **Como funciona:**
  1.  **Fechado (Closed):** O estado normal. As requisições para o serviço externo fluem normalmente.
  2.  **Aberto (Open):** Se o serviço externo começar a falhar repetidamente (ex: muitas requisições com erro), o Circuit Breaker "dispara" e vai para o estado "Aberto". A partir desse momento, todas as novas requisições para o serviço falho são **imediatamente rejeitadas** pela sua aplicação, sem sequer tentar contatar o serviço externo. Isso dá um tempo para o serviço falho se recuperar e evita sobrecarregá-lo ainda mais.
  3.  **Meio-Aberto (Half-Open):** Após um tempo configurável (timeout), o Circuit Breaker passa para o estado "Meio-Aberto". Ele permite que um número limitado de requisições de teste passe para o serviço externo. Se essas requisições forem bem-sucedidas, ele volta para o estado "Fechado". Se falharem novamente, ele retorna ao estado "Aberto".
- **Benefícios:** Aumenta a resiliência do sistema, detecta falhas mais rapidamente e evita que um problema em um serviço se espalhe e derrube outros serviços.

## Sequencing

Em sistemas distribuídos, onde múltiplos microsserviços operam de forma independente, a geração de identificadores únicos pode ser um desafio. O padrão **Sequencing** (ou Serviço de Sequenciamento) aborda isso ao:

- **Centralizar a Geração de IDs:** Em vez de cada microsserviço tentar gerar seus próprios IDs (o que poderia levar a colisões ou exigir lógicas complexas de coordenação), um serviço dedicado é responsável por essa tarefa.
- **Garantir Unicidade:** A principal função desse serviço é assegurar que cada ID gerado seja único, evitando que diferentes partes do sistema usem o mesmo identificador para entidades distintas.
- **Gerenciar Concorrência:** Ele é projetado para lidar com múltiplas requisições simultâneas de IDs de forma segura, garantindo que a unicidade seja mantida mesmo sob alta carga.
- **Otimizar Performance (Característica Desejada):** Embora o objetivo principal seja a unicidade e a consistência, um bom serviço de sequencing também é construído para ser performático, entregando IDs rapidamente para não se tornar um gargalo para os

## API Gateway

Um API Gateway atua como a "porta de entrada" para sua arquitetura de microsserviços, centralizando e gerenciando as requisições dos clientes antes de encaminhá-las aos serviços internos.

Responsabilidades comuns e importantes de um API Gateway:

- **Centralizador de requisições**: Ele serve como um único ponto de entrada para todas as requisições externas, simplificando a forma como os clientes interagem com o sistema.
- **Roteamento**: É a sua função principal, direcionar cada requisição para o microsserviço apropriado com base em regras definidas (como URL, método HTTP, etc.).
- **Autenticação**: Pode lidar com a autenticação e autorização de usuários, validando credenciais ou tokens antes de permitir que a requisição chegue aos microsserviços. Isso descarrega essa responsabilidade dos serviços individuais.
- **Conversão de dados**: Pode transformar formatos de dados (ex: de XML para JSON), adaptar APIs para diferentes versões de clientes, ou agregar respostas de múltiplos serviços.
- **Cabeçalhos**: Permite manipular cabeçalhos HTTP, adicionando informações de rastreamento, removendo dados sensíveis ou modificando-os conforme necessário.
- **Throttling (Limitação de Requisições)**: Controla o volume de requisições que um cliente pode fazer em um determinado período, protegendo os microsserviços de sobrecarga.
- **Rate Limit (Limite de Taxa)**: É uma forma específica de throttling, definindo um número máximo de requisições permitidas por unidade de tempo para um cliente ou recurso.

## Event Driven Architecture

- Eventos acontecem no passado (ex.: usuário foi criado, requisição foi feita)
  - **Event Notification**: eventos pequenos que comunicam mudança de estado
  - **Event Carried State Transfer**: traz mudança completa de mudança no sistema
  - **Event Sourcing**: grava tudo que acontece, todas as mudanças de estado no database
- Quando acontece um evento, um message broker capta isso, envia uma mensagem para outro microsserviço, ele processa esse evento e toma uma ação
- Um evento emitido pode ser o gatilho de entrada para um outro sistema
- Coreografia vs Orquestração

## Publish-Subscribe

O padrão **Publish/Subscribe (Pub/Sub)** é um modelo de comunicação assíncrona onde os emissores de mensagens (Publishers) não precisam conhecer os receptores (Subscribers), e vice-versa. Ele promove um alto nível de desacoplamento entre os componentes de um sistema.

Aqui estão os elementos principais:

- **Publishers (Produtores):** São os sistemas que **criam e enviam mensagens** (ou eventos) para um canal específico, sem se preocupar com quem irá recebê-las. Eles simplesmente "publicam" um fato.
- **Subscribers (Consumidores):** São os sistemas que **se inscrevem** em um ou mais canais (tópicos) para **receber e processar as mensagens** que lhes interessam. Eles "assinam" para serem notificados sobre certos tipos de eventos.
- **Tópico (Topic/Channel):** É o **canal intermediário** através do qual Publishers e Subscribers se comunicam. Pense nele como uma categoria ou um fluxo de mensagens. Os Publishers enviam mensagens para um Tópico, e os Subscribers recebem mensagens *desse Tópico*.

**Como funciona:**

1. Um **Publisher** (seu "sistema producer") detecta que um evento ocorreu (ex: "usuário foi criado", "requisição foi feita").
2. Ele **publica** uma mensagem descrevendo esse evento para um **Tópico** específico no Message Broker (o "message broker" que você mencionou).
3. O **Message Broker** (que gerencia o Pub/Sub) é responsável por receber essa mensagem e garantir que ela seja entregue a **todos os Subscribers** (seus "sistemas consumers") que estão inscritos naquele Tópico.
4. Cada **Subscriber** que recebe a mensagem pode então processá-la e tomar uma ação independente, sem que o Publisher original precise saber da sua existência ou do que ele fará.

## BFF - Backend for Frontend

O padrão **Backend for Frontend (BFF)** é uma camada de backend que é construída **especificamente para atender às necessidades de um tipo particular de frontend** (por exemplo, um aplicativo web, um aplicativo móvel iOS, um aplicativo móvel Android, ou até mesmo um aplicativo para smart TV).

**A ideia central é:**  
Em vez de ter um backend genérico que tenta servir a todos os clientes (o que geralmente resulta em APIs que retornam dados demais ou de menos, exigindo que o frontend faça várias requisições e manipule muitos dados), o BFF cria uma API customizada para cada frontend.

**Principais características e benefícios:**

- **APIs sob medida:** O BFF retorna **apenas as informações que o frontend precisa, única e exclusivamente**, no formato exato que ele espera. Isso evita o "over-fetching" (receber dados desnecessários) e o "under-fetching" (precisar fazer múltiplas requisições para obter todos os dados).
- **Simplifica o desenvolvimento do frontend:** Desenvolvedores de frontend podem trabalhar com uma API que é otimizada para sua interface de usuário, sem se preocupar com a complexidade dos microsserviços de backend subjacentes.
- **Desacoplamento:** O frontend fica desacoplado da complexidade dos microsserviços de backend. Se a arquitetura interna do backend mudar, o BFF pode ser adaptado para continuar fornecendo a mesma interface para o frontend, minimizando o impacto.
- **Lógica específica do cliente:** O BFF pode conter lógica de negócio ou agregações de dados que são específicas para aquele cliente, como transformações de dados, formatação ou até mesmo orquestração de chamadas a múltiplos microsserviços para compor uma única resposta.
- **Otimização de performance:** Ao reduzir a quantidade de dados transferidos e o número de requisições, o BFF pode melhorar a performance e a experiência do usuário no frontend.

## Sidecars Applications

Imagine sua aplicação principal como um motorista em um carro. Uma aplicação Sidecar é como um **passageiro que está sempre ao lado do motorista**, ajudando com tarefas auxiliares para que o motorista possa se concentrar em dirigir.

- **O que é:** É um contêiner (ou processo) auxiliar que roda **ao lado** do contêiner principal da sua aplicação, compartilhando o mesmo ciclo de vida e rede.
- **Propósito:** Descarregar responsabilidades comuns e não relacionadas à lógica de negócio da aplicação principal. Isso permite que a aplicação principal se concentre no que ela faz de melhor (sua funcionalidade de negócio).
- **Como funciona:** O Sidecar intercepta ou processa dados que entram ou saem da aplicação principal.
- **Exemplos:**
  - **Coleta de logs:** O Sidecar pode coletar os logs da aplicação principal e enviá-los para um sistema de log centralizado.
  - **mTLS (mutual TLS):** Gerencia a criptografia e autenticação mútua entre serviços, sem que a aplicação precise implementar essa lógica.
  - **Controle de tráfego:** Intercepta o tráfego de rede para aplicar regras de roteamento, retries, circuit breaking, etc.
- **Benefícios:** Desacoplamento, reusabilidade (o mesmo Sidecar pode ser usado com diferentes aplicações), independência de linguagem (o Sidecar pode ser escrito em uma linguagem diferente da aplicação principal).

## Service Mesh

Se as Sidecars são passageiros individuais, o Service Mesh é como uma **agência de trânsito inteligente que coloca um passageiro Sidecar em *cada carro* (aplicação) e os coordena todos juntos** para gerenciar o tráfego da cidade inteira.

- **O que é:** É uma **camada de infraestrutura dedicada** que você adiciona às suas aplicações (geralmente microsserviços) para gerenciar a comunicação entre elas.
- **Propósito:** Adicionar recursos de forma **transparente** (sem alterar o código da sua aplicação) para lidar com desafios de comunicação em microsserviços, como:
  - **Observabilidade:** Coletar métricas, logs e rastreamentos de todas as interações.
  - **Gerenciamento de tráfego:** Controlar como as requisições fluem entre os serviços (roteamento, balanceamento de carga, retries, circuit breakers).
  - **Segurança:** Implementar autenticação, autorização e criptografia (como mTLS) para a comunicação serviço-a-serviço.
- **Como funciona:** Geralmente, um Service Mesh injeta um **proxy Sidecar** (como o Envoy) ao lado de cada instância de serviço. Esses proxies interceptam todo o tráfego de entrada e saída do serviço, aplicando as políticas e coletando os dados definidos pelo plano de controle do Service Mesh.
- **Benefícios:** Desacopla preocupações de infraestrutura do código da aplicação, garante consistência nas políticas de comunicação, melhora a confiabilidade e a segurança da rede de serviços.

### Istio

**Istio** é uma das implementações mais populares e robustas de um Service Mesh.

- **O que é:** É uma **plataforma de Service Mesh de código aberto** que fornece uma maneira de conectar, proteger, controlar e observar serviços.
- **Propósito:** Oferecer uma solução completa para os desafios de operar uma arquitetura de microsserviços em produção, especialmente em Kubernetes.
- **Funcionalidades (como você mencionou):**
  - **Gerenciamento de tráfego:** Permite configurar regras de roteamento avançadas (ex: 5% do tráfego para uma nova versão), retries automáticos, circuit breaking (disjuntores), injeção de falhas para testes.
  - **Segurança:** Implementa mTLS automaticamente entre serviços, oferece políticas de autorização granulares para controlar quem pode acessar o quê.
  - **Policy enforcement (Aplicação de Políticas):** Permite definir e aplicar políticas de acesso, cotas de uso e outras regras de negócio na camada de rede.
  - **Observabilidade:** Coleta automaticamente telemetria (métricas, logs, traces) de todas as interações de serviço, integrando-se com ferramentas como Prometheus, Grafana e Jaeger.
  - **Extensibilidade:** É projetado para ser extensível, permitindo a integração com outros sistemas e a criação de políticas personalizadas.

Em resumo, o Istio usa a ideia de Sidecars (proxies Envoy) para construir uma malha de serviço poderosa que adiciona recursos críticos de forma transparente aos seus microsserviços.

# AWS Well-Architected Framework

## Arquitetura de Solução para Cloud

[AWS Well-Architected – Crie aplicações para a nuvem seguras e eficientes](https://aws.amazon.com/pt/architecture/well-architected/)

O **AWS Well-Architected Framework** estabelece um conjunto de diretrizes essenciais para a criação de infraestruturas em nuvem sólidas e eficientes. A metodologia fundamenta-se em seis pilares principais: **excelência operacional**, **segurança**, **confiabilidade**, **eficiência de performance**, **otimização de custos** e **sustentabilidade**. Cada pilar oferece princípios práticos, como a automação de processos e a antecipação de falhas, visando mitigar riscos e maximizar o valor entregue ao negócio. Além das práticas da Amazon, o material sintetiza **estratégias de design para o Azure**, reforçando a importância de sistemas resilientes e escaláveis. No geral, as fontes servem como um guia técnico para que arquitetos de soluções tomem decisões baseadas em **dados e boas práticas de mercado**.

Os seis pilares do **AWS Well-Architected Framework** são fundamentais para ajudar arquitetos de nuvem a criar infraestruturas seguras, resilientes, eficientes e de alta performance. São eles:

1. **Excelência Operacional**: Foca na capacidade de **executar e monitorar sistemas** para agregar valor aos negócios e na melhoria contínua de processos e procedimentos. Entre seus princípios estão a _execução de operações como código (IaC)_ e o aprendizado com todas as falhas operacionais.
2. **Segurança**: Concentra-se na **proteção de informações, sistemas e ativos**, aproveitando tecnologias de nuvem para melhorar a postura de segurança. Os tópicos principais incluem a _confidencialidade e integridade dos dados_, além do gerenciamento de permissões de usuário.
3. **Confiabilidade**: Garante que uma carga de trabalho execute sua **função pretendida de forma correta e consistente**, incluindo a capacidade de se recuperar rapidamente de falhas. Envolve o projeto de sistemas distribuídos e o planejamento de recuperação.
4. **Eficiência de Performance**: Refere-se à **alocação estruturada e simplificada de recursos** de TI e computação para atender aos requisitos do sistema, mantendo a eficiência mesmo com mudanças na demanda. Inclui a seleção dos tipos e tamanhos certos de recursos otimizados para as cargas de trabalho.
5. **Otimização de Custos**: Foca em **evitar custos desnecessários** e executar sistemas ao preço mais baixo possível. Isso envolve a compreensão dos gastos ao longo do tempo e a escalabilidade para atender às necessidades de negócios sem excessos.
6. **Sustentabilidade**: Concentra-se em **minimizar os impactos ambientais** da execução de cargas de trabalho na nuvem. Os principais tópicos incluem a _compreensão do impacto ambiental_ e a maximização da utilização dos recursos para reduzir os impactos posteriores (downstream).

## 10 Princípios de Design da Azure

Os **10 princípios de design para aplicações no Azure** visam criar arquiteturas robustas, escaláveis e eficientes na nuvem da Microsoft. De acordo com as fontes, esses princípios são:

1. **Design for self healing (Projetar para autorrecuperação):** Garantir que a aplicação consiga se recuperar sozinha de falhas.
2. **Deixar as coisas redundantes:** Evitar pontos únicos de falha duplicando componentes críticos.
3. **Minimizar a coordenação:** Reduzir a dependência entre os componentes do sistema para aumentar a agilidade e escalabilidade.
4. **Desenhar para escalar (Design to scale):** Garantir que a aplicação consiga lidar com o aumento de carga adicionando ou removendo recursos conforme necessário.
5. **Particionamento:** Dividir os dados ou processos para melhorar a escalabilidade e o desempenho.
6. **Design for operations (Projetar para operações):** Facilitar o monitoramento, a implantação e a manutenção da aplicação.
7. **Use serviços gerenciados:** Aproveitar os serviços da plataforma (PaaS) para reduzir a complexidade operacional.
8. **Use a melhor data storage para o melhor trabalho:** Escolher o tipo de armazenamento de dados mais adequado para cada necessidade específica, em vez de uma solução única para tudo.
9. **Design for evolution (Projetar para evolução):** Criar sistemas que possam ser alterados e atualizados facilmente ao longo do tempo.
10. **Construa para as necessidades do negócio:** Garantir que todas as decisões de design estejam alinhadas com os objetivos e requisitos comerciais.

# Observabilidade

Na teoria de controle, a observabilidade é definida como uma medida de quão bem os estados internos de um sistema podem ser inferidos a partir do conhecimento das saídas externas desse sistema. Simplificando, _observabilidade é quão bem você pode entender seu sistema complexo_.

## Observabilidade vs Monitoramento

- Monitoramento nos mostra que algo está errado
- Monitoramento se baseia em saber com antecedência quais sinais você deseja monitorar
- Observabilidade nos permite perguntar o porquê, entendendo a razão

## Pilares

## Ferramentas Populares Opensources

A maioria das ferramentas conversam com a aplicação via endpoint para coletar métricas e exibir.

- Elastic Stack: é opensource coberto pelo Kibana que é um dashboard, tem alguns plugins que são pagos
- Datadog
- New Relic
- Splunk
- Dynatrace
- Prometheus / Grafana
- Jaeger
- Zipkin
- Kiali

## OTEL (Open Telemetry)

O Open Telemetry (OTEL) é um projeto da Cloud Native Computing Foundation (CNCF) que surgiu da fusão dos projetos Open Tracing e Open Census. Sua ideia central é padronizar a forma como você coleta dados de **telemetria** (observabilidade) das suas aplicações, independentemente da linguagem, framework ou provedor de nuvem que você esteja usando.

Em resumo, o Open Telemetry oferece:

- **Especificações**: Define padrões para a coleta de métricas, logs e traces (rastreamentos distribuídos). Isso garante que os dados de observabilidade sejam consistentes e interoperáveis.
- **Protocolos**: Estabelece como esses dados devem ser transmitidos, permitindo que diferentes ferramentas e sistemas se comuniquem de forma eficaz.
- **SDKs (Software Development Kits)**: Fornece bibliotecas para diversas linguagens de programação (Java, Python, Go, Node.js, .NET, etc.) que permitem instrumentar seu código. Com os SDKs, você pode adicionar facilmente a coleta de telemetria à sua aplicação, gerando traces, métricas e logs de forma padronizada.
- **Ferramentas de Integração**: Oferece componentes como o OpenTelemetry Collector, que pode receber, processar e exportar dados de telemetria para uma variedade de backends de observabilidade (como Prometheus, Grafana, Jaeger, Zipkin, Datadog, New Relic, etc.).

**Coisas importantes para saber resumidamente:**

- **Padronização**: OTEL é a tentativa da indústria de criar um padrão universal para a coleta de dados de observabilidade, eliminando a dependência de fornecedores específicos.
- **Três Pilares da Observabilidade**: Ele abrange os três pilares essenciais:
  - **Metrics**: Dados numéricos agregados sobre o comportamento do sistema (ex: CPU usage, request rate).
  - **Logging**: Registros de eventos discretos que ocorrem na aplicação (ex: erro, login de usuário).
  - **Tracing**: Rastreamento de uma requisição através de múltiplos serviços, mostrando o fluxo e o tempo gasto em cada etapa.
- **Vendor-agnostic**: Você instrumenta sua aplicação uma vez com OTEL e pode mudar o backend de observabilidade (para onde os dados são enviados) sem precisar alterar o código da sua aplicação.
- **Facilita a Correlação**: Ao padronizar a coleta, o OTEL facilita a correlação de logs, métricas e traces, o que é crucial para entender e depurar sistemas distribuídos complexos.
- **Evolução**: É um projeto ativo e em constante evolução, com forte apoio da comunidade e da indústria.

# On-Premise vs Cloud vs Modelo Híbrido

Uma infraestrutura On-Premise significa _"dentro de casa"_ semelhante a ter um datacenter próprio, indicando que a empresa tem sua propria infra interna e o modelo híbrido corresponde a empresas que tem uma parte da aplicação rodando on-premise e outra parte na nuvem.

## Modelo On-Premise

**Prós:**

- Alto controle sobre software, hardware, protocolos de segurança
- Altamente customizável
- Acesso físico por profissionais da empresa
- Hardware normalmente é mais barato e poderoso do que máquinas padrão que rodam na cloud
- Controle de dados
- Integração com sistemas legados
- Compliance e regulações (armazenamento, PCI DSS, HIPPA (Health Care))
- Custos previsíveis
- Sem lock-in
- Se bem dimensionado, o custo inicial se paga ao longo dos anos
- A longo prazo, se bem dimensionado, o custo pode ser menor do que soluções Cloud

**Contras:**

- Softwares são instalados localmente na empresa ou um datacenter
- Custo inicial é alto
- Hardware possui depreciação
- Hardware exige manutenção
- Precisa de profissionais qualificados com conhecimentos em hardware, rede, software, virtualização, etc
- Escalabilidade complexa
- Alta disponibilidade complexa (rodar em mais datacenter fisicamente distantes ao mesmo tempo)

> Lock In
> "Lock-in" (ou aprisionamento tecnológico/de fornecedor) refere-se à situação em que um cliente (seja uma pessoa ou uma empresa) se torna dependente de um fornecedor, produto ou tecnologia específica, tornando muito difícil e/ou caro mudar para uma alternativa.

## Modelo Could Computing

**Prós:**

- Baixo custo inicial
- Escalabilidade de forma simplificada
- Acessibilidade (máquinas, serviços gerenciados, políticas de segurança)
- Alta disponibilidade (Regions e AZs)
- Custo com profissionais especializados em datacenter, rede, hardware, etc
- "Pay-as-you-go": Pague conforme o uso
- Backups automatizados
- Serviços gerenciados
- Recuperação rápida em casos de desastres
- Amplitude de serviços

**Contras:**

- Custo alto ao longo do tempo para determinados serviços
- Alto custo para transferência de dados
- Previsibilidade de custos mais complexa
- Vendor lock-in
- Riscos adicionais de segurança
- Controle limitado para fazer upgrades
- Compliance
- Integração com sistemas legados é mais complexa

## Modelo Cloud Híbrido

- Pode ser considerado um modelo de transição
- Modelo alternativo para ter mais controle de dados e serviços específicos, porém com as vantagens da nuvem
- Redução de custos para grande utilização sazonal (exemplo: Black Friday)
- Integração de serviços pode ser complexa
- Latência pode ser um grande desafio
- Profissionais especializados em diversas áreas

**Multicloud:** É quando empresa usa diversas clouds de providers diferentes ao mesmo tempo para gerar resultados

# Soluções Cloud Native

- Soluções desenhadas para rodar em ambientes Cloud Computing
- São desenhadas para tirar vantagens desses ambientes
- Modulares
- Prontas para rodar de forma distribuída
- Ex:
  - Docker
  - Kubernetes, Helm, Istio, Linkerd, Envoy
  - Apache Kafka (sistema de streaming de dados)
  - Prometheus
  - OpenTelemetry
  - AWS Lambda
  - ArgoCD
  - Produtos HashiCorp (Vault, Consul, Terraform)

## CNCF (Cloud Native Computing Foundation)

> "We bring together the world's top developers, end users, and vendors and run the largest open source developer conferences. CNCF is part of the nonprofit Linux foundation"

- Organização sem fins lucrativos
- 153 projetos e contando
- Criada em 2015
- Faz parte da Linux Foundation
- Responsável por projetos famosos:
  - Kubernetes, Prometheus, OTEL, Envoy, Jaeger
- Programas de certificação

### Tipos de Projetos

- **Graduated**: projetos que estão maduros e rodando a um bom tempo como Kubernetes, amplamente testados, adotados por conservadores
- **Incubating**: projetos novos que já podem ser usados em prod mas estão em constante desenvolvimento e ainda não amplamente testados, adotados por pragmáticos
- **Sandbox**: projetos novos, que são promissores, adotados por visionários

# SAD (Solution Architecture Document)

- Documento que descreve a arquitetura de uma solução
- Trata-se normalmente de:
  - Componentes
  - Módulos
  - Interfaces de comunicação entre um sistema e outro
  - Fluxo de Dados
- Leva em consideração o contexto do projeto
- É gerado na fase de planejamento do projeto depois que já houve acordos comerciais sobre o projeto
- O cliente final fica mais confortável se tiver um documento como esse mesmo na fase de PoC do projeto
- Da clareza aos envolvidos sobre a solução como um todo
- Nem todo SAD possui a mesma estrutura
- _Documentamos o que realmente importa_

## Tópicos Normalmente Tratados

- **Introdução**
  - Propósito do documento
  - Escopo da solução
  - Restrições
  - Pressupostos
- **Visão geral da arquitetura**
  - Descritivo com principais pontos
  - Diagramas de alto nível (diagrama c4, UML)
  - Principais componentes
  - Diagramas de fluxo
- \*\*Requisitos
  - **Funcionais**
    - Recursos, funcionalidades, features que agregam valor ao negócio
  - **Não funcionais**
    - Ex: Performance, escalabilidade, segurança, disponibilidade + cross-cutting
- **Design da arquitetura**
  - Diagramas detalhados bem como a sua descrição
  - Tecnologias a serem utilizadas
  - Integração entre sistemas
- **Implementação**
  - Metodologias de desenvolvimento e ferramentas
  - Processos de deployment e infraestrutura
  - Processos de teste e qualidade
- **Operação e manutenção**
  - Monitoramento
  - Processos de manutenção
  - Disaster Recovery
- **Riscos e estratégias de mitigação**
  - Ricos potenciais
  - Riscos de grande impacto
  - Planos de contingência
- **Tecnologias, custos e pessoal**
  - Estimativas de custos para implementação
  - Recomendação de equipes e pessoal
- **Próximos passos**
  - Sugestão de ordem de execução
  - Observações gerais
