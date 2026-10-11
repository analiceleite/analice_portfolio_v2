---
title: 'Fundamentos de Arquitetura de Software'
description: 'Notas sobre arquitetura vs design, estruturas, acoplamento, fitness functions e modernização de sistemas.'
date: '2026-10-11'
slug: '/notes/fundamentos-arquitetura-software/'
category: 'Architecture'
language: 'pt-BR'
status: 'study-note'
updatedAt: '2026-10-11'
order: 1
tags:
  - architecture
  - software-design
  - modernization
related:
  - domain-driven-design
  - system-design-design-docs
published: true
source: 'Obsidian'
---

# Sobre Arquitetura de Software
### Tipos de Arquitetura e o Papel do Arquiteto
A arquitetura de software é uma disciplina fundamental da engenharia de software, intrinsecamente ligada ao processo de desenvolvimento e com impacto direto na estrutura organizacional de uma empresa (conforme a Lei de Conway). Ela se define como a relação entre os objetivos de negócio, suas restrições e os componentes de software a serem criados, visando a evolução e sustentabilidade do sistema.

Existem diferentes **tipos de arquitetura**:
-   **Software**: Focada na proximidade com o código.
-   **Solução**: Desenha a estrutura para agregar valor ao cliente, considerando o ecossistema.
-   **Tecnológica**: Específica para tecnologias particulares.
-   **Corporativa**: Envolve governança e gestão em nível organizacional.

O **papel do arquiteto de software** é crucial. Ele transforma requisitos de negócio em padrões arquiteturais, orquestra equipes de desenvolvimento e especialistas de domínio, e possui um profundo entendimento de conceitos e modelos arquiteturais. Além disso, auxilia na tomada de decisões em momentos de crise, reforça boas práticas e, mesmo sem um cargo formal, essa função é frequentemente exercida por profissionais experientes como desenvolvedores sêniores e tech leads.

**Aprender arquitetura** permite navegar entre a visão macro e micro de um software, escolher a melhor solução para um determinado contexto, pensar a longo prazo na sustentabilidade do projeto, tomar decisões calculadas (evitando "hypes" de mercado) e aprofundar-se em padrões de projeto e desenvolvimento.

### Arquitetura vs. Design
A distinção entre arquitetura e design é fundamental:

*   **Arquitetura**: Refere-se ao **escopo global ou de alto nível** de um sistema. Ela define a estrutura fundamental, os componentes principais, suas relações e os princípios que guiam seu desenvolvimento e evolução. Pense na arquitetura como o projeto da fundação, da estrutura principal e dos grandes blocos de um edifício. Ela estabelece as diretrizes e restrições para o sistema como um todo.
*   **Design**: Refere-se ao **escopo local ou de baixo nível**. Ele detalha como os componentes individuais ou módulos específicos serão implementados, suas classes, métodos, interfaces e algoritmos. No exemplo do edifício, o design seria o detalhamento de como cada cômodo será decorado, a escolha dos materiais para uma parede específica ou o layout de uma cozinha.

Em resumo, a frase "Arquitetura é Design, mas Design não é arquitetura" captura bem essa relação. A arquitetura é uma forma de design, mas em um nível mais abstrato e abrangente. O design, por sua vez, pode ser aplicado em diversos níveis, incluindo o arquitetural, mas também em níveis muito mais granulares que não impactam a estrutura fundamental do sistema.

# Estruturas
-   **Estrutura Component Conector**: Descreve como os diferentes elementos de um sistema interagem entre si para garantir seu funcionamento.
-   **Estrutura de Módulos**: Refere-se às unidades de software, como pacotes, e suas responsabilidades funcionais dentro do sistema.
-   **Estrutura de Alocação**: Estabelece a relação entre as estruturas de componentes-conectores e módulos com elementos "não software", como ambientes, testes, processos de build e deployment.
-   **Efeito Ivory Tower**: Alerta para o risco de arquitetos ou equipes de arquitetura se isolarem do dia a dia do time de desenvolvimento, tornando-se teóricos e descolados da realidade dos problemas que precisam resolver. É crucial que arquitetos trabalhem em conjunto com a equipe de desenvolvimento.

# Middle-Out
A metodologia **Middle-Out** favorece a escalabilidade, pois ao focar inicialmente nos componentes **core** e mais críticos do sistema, garante-se que a base seja sólida e bem projetada. Isso facilita:

- **Adaptação a novas demandas**: Como o núcleo é robusto, é mais fácil integrar novos módulos ou tecnologias sem comprometer a estrutura principal.
- **Crescimento incremental**: A abordagem permite expandir o sistema de forma controlada, adicionando funcionalidades ou escalando partes específicas conforme necessário.
- **Redução de retrabalho**: Ao priorizar o núcleo, evita-se a necessidade de grandes reestruturações futuras, já que o core foi pensado para suportar o crescimento. 

**Importante:**

* O coração do software / regras de negócio sempre terão que possuir a melhor arquitetura possível.
* Partes periféricas e de suporte não necessariamente terão que ter o mesmo peso.
* Isso é válido para componentes-conectores, módulos e alocações

# Dimensões e Fitness Functions
## Arquitetura Multidimensional
A **Arquitetura Multidimensional** é uma abordagem que considera diferentes perspectivas ou dimensões ao projetar e organizar um sistema de software. Em vez de focar apenas em um único aspecto, como funcionalidade ou tecnologia, ela busca equilibrar múltiplos fatores que influenciam o sucesso do sistema. Essas dimensões podem incluir:

- **Dimensão Técnica**: Refere-se às escolhas tecnológicas, como frameworks, linguagens de programação e padrões arquiteturais.
- **Dimensão de Negócio**: Foca nos objetivos e restrições do negócio, garantindo que o sistema entregue valor e atenda às necessidades estratégicas da organização.
- **Dimensão Organizacional**: Considera como a arquitetura se alinha à estrutura da equipe e aos processos internos, respeitando a **Lei de Conway** (a estrutura do sistema reflete a estrutura da organização).
- **Dimensão de Sustentabilidade**: Avalia a capacidade do sistema de evoluir e se adaptar ao longo do tempo, garantindo manutenibilidade e escalabilidade.
- **Dimensão de Experiência do Usuário (UX)**: Leva em conta como os usuários interagem com o sistema, priorizando usabilidade e eficiência.

Essa abordagem multidimensional é essencial para criar sistemas equilibrados, que não apenas atendam às necessidades técnicas, mas também sejam sustentáveis, escaláveis e alinhados aos objetivos do negócio e da organização.

## Fitness Functions
**Fitness Functions** são métricas ou critérios utilizados para avaliar continuamente a qualidade e a adequação de uma arquitetura de software em relação aos objetivos do sistema. O conceito é inspirado pela biologia evolutiva, onde "fitness" mede a capacidade de um organismo de sobreviver e se reproduzir em um ambiente específico. No contexto de software, essas funções ajudam a garantir que a arquitetura permaneça alinhada com os requisitos técnicos e de negócio ao longo do tempo.

### Características principais:
- **Automatização**: Fitness Functions geralmente são implementadas como verificações automatizadas, integradas ao pipeline de desenvolvimento e entrega contínua.
- **Foco em Qualidade**: Elas monitoram aspectos como desempenho, segurança, escalabilidade, manutenibilidade e outros atributos arquiteturais importantes.
- **Feedback Contínuo**: Fornecem feedback constante sobre o estado do sistema, permitindo ajustes rápidos e informados.

### Exemplos de Fitness Functions:
- **Tempo de resposta**: Garantir que uma API responda em menos de 200ms.
- **Taxa de erro**: Monitorar que a taxa de erros em produção não ultrapasse 0,1%.
- **Cobertura de testes**: Assegurar que pelo menos 80% do código esteja coberto por testes automatizados.
- **Uso de recursos**: Verificar que o consumo de memória ou CPU não exceda limites definidos.

### Benefícios:
- **Alinhamento com objetivos**: Mantém o sistema em conformidade com os requisitos de negócio e técnicos.
- **Evolução controlada**: Permite que a arquitetura evolua sem comprometer sua qualidade.
- **Detecção precoce de problemas**: Identifica desvios ou degradações antes que se tornem críticos.

Em resumo, Fitness Functions são ferramentas poderosas para garantir que a arquitetura de software continue saudável e alinhada com os objetivos ao longo de seu ciclo de vida.

# Modernização de Sistemas
## Definição de Sistemas Legados
- **O que são?**: Sistemas antigos que ainda funcionam, mas têm limitações significativas, como experiência do usuário ultrapassada, lentidão e dificuldade de adaptação a novas demandas (ex.: segurança).
- **Características comuns**: Geralmente são monolíticos, com módulos altamente acoplados, milhões de linhas de código e manutenção complicada.

## Plano de Modernização
Para modernizar sistemas legados, é essencial seguir um plano estruturado:

1. **Definir Objetivos**:
   - Identificar problemas a resolver e metas a alcançar.
   - Levantar o que já se sabe e o que pode ser inferido.

2. **Mapear Stakeholders**:
   - Identificar os principais interessados no sistema.
   - Garantir que estejam confortáveis com as mudanças, pois podem influenciar o sucesso ou fracasso do plano.

3. **Definir Contextos**:
   - Mapear os contextos e suas dependências.
   - Delimitar fronteiras claras entre os contextos.

4. **Definir Arquitetura Alvo**:
   - Planejar o desenho final da arquitetura.
   - Avaliar benefícios e pontos fracos dessa nova estrutura.

5. **Definir Arquitetura de Transição**:
   - Planejar entregas de valor incremental ao longo do processo.

6. **Stack como Aliada**:
   - Escolher tecnologias que resolvam problemas reais.
   - Considerar o nível de conhecimento da equipe e a maturidade da stack.
## Arquitetura
1. **Desacoplamento**:
   - Reduzir dependências entre módulos para aumentar a flexibilidade e a velocidade de entrega.
   - Questionar práticas antigas e "necessidades" que geram acoplamento.

2. **Autonomia**:
   - Garantir que os contextos sejam independentes para evitar gargalos.
   - Respeitar a **Lei de Conway** (a estrutura do sistema reflete a estrutura da organização).

3. **Resiliência**:
   - Planejar para cenários adversos ("e se?").
   - Aprender com sistemas existentes e priorizar funções críticas (Lei do Freitas: tratar o sistema como o corpo humano, priorizando funções vitais).

## Arquitetura de Transição
- **O que é?**: Um plano para modernizar o sistema de forma gradual, entregando valor progressivamente.
- **Desafios**:
  - Aceitar que haverá desperdício (algumas soluções serão descartadas).
  - Alinhar expectativas sobre quais funções de negócio e sistêmicas serão priorizadas.
  - **Dados**: A parte mais complexa, pois envolve migração e integração.

## Resumo Geral
A modernização de sistemas legados é um processo complexo que exige planejamento cuidadoso. É necessário:
- Definir objetivos claros e alinhar stakeholders.
- Planejar uma arquitetura alvo e uma transição incremental.
- Reduzir acoplamento, garantir autonomia e priorizar resiliência.
- Aceitar que nem tudo será perfeito e que haverá desperdícios controlados.

Essa abordagem permite evoluir sistemas antigos sem comprometer a entrega de valor ao longo do caminho.

# Acoplamento

O conceito de **acoplamento** refere-se ao grau de dependência entre diferentes partes de um sistema. Quanto maior o acoplamento, mais difícil é fazer alterações em uma parte sem impactar as outras. Michael Nygard descreve diferentes tipos de acoplamento, cada um com suas características e desafios. Vamos detalhá-los:

## Tipos de Acoplamento
### Acoplamento Operacional
- **O que é?**: Ocorre quando sistemas ou componentes dependem diretamente do funcionamento uns dos outros em tempo de execução.
- **Exemplo**: Um serviço que depende de outro estar disponível para funcionar (ex.: um sistema de pagamento que precisa consultar um serviço externo para autorizar transações).
- **Desafios**:
  - Se um sistema falhar, o outro também pode falhar.
  - Dificuldade em garantir resiliência e disponibilidade.

### Acoplamento de Desenvolvimento
- **O que é?**: Surge quando equipes ou desenvolvedores precisam trabalhar juntos para fazer alterações em diferentes partes do sistema.
- **Exemplo**: Dois módulos que compartilham o mesmo código ou biblioteca, exigindo coordenação entre equipes para realizar mudanças.
- **Desafios**:
  - Reduz a autonomia das equipes.
  - Aumenta o tempo necessário para implementar mudanças.

### Acoplamento Semântico
- **O que é?**: Relaciona-se ao significado dos dados ou mensagens trocadas entre sistemas. Ocorre quando um sistema depende de um formato ou estrutura específica de dados de outro sistema.
- **Exemplo**: Um sistema que espera receber um campo "data" em um formato específico (ex.: "YYYY-MM-DD"). Se o formato mudar, o sistema quebra.
- **Desafios**:
  - Alterações no significado ou estrutura dos dados podem causar falhas.
  - Dificuldade em evoluir os sistemas de forma independente.

### Acoplamento Funcional
- **O que é?**: Ocorre quando um sistema depende diretamente da lógica ou comportamento de outro sistema.
- **Exemplo**: Um sistema que chama diretamente uma função de outro sistema e espera um comportamento específico.
- **Desafios**:
  - Mudanças na lógica ou comportamento do sistema dependido podem causar problemas.
  - Dificuldade em isolar funcionalidades.

### Acoplamento Incidental
- **O que é?**: É um tipo de acoplamento não intencional, que ocorre devido a decisões de design ou implementação mal planejadas.
- **Exemplo**: Um sistema que depende de detalhes internos de outro sistema, como nomes de variáveis ou caminhos de arquivos.
- **Desafios**:
  - Torna o sistema frágil e difícil de manter.
  - Pode ser difícil de identificar e corrigir.

## Resumo

| Tipo de Acoplamento | Descrição | Exemplos | Desafios |
|---------------------|-----------|----------|----------|
| **Operacional** | Dependência em tempo de execução. | Serviço de pagamento que depende de outro serviço. | Falhas em cascata, baixa resiliência. |
| **Desenvolvimento** | Dependência entre equipes ou código compartilhado. | Módulos que usam a mesma biblioteca. | Reduz autonomia, aumenta tempo de mudanças. |
| **Semântico** | Dependência no significado ou formato dos dados. | Campo "data" com formato fixo. | Falhas com mudanças no formato ou significado. |
| **Funcional** | Dependência na lógica ou comportamento de outro sistema. | Chamadas diretas a funções específicas. | Impacto de mudanças na lógica. |
| **Incidental** | Dependência não intencional, causada por design ruim. | Dependência de detalhes internos, como nomes de variáveis. | Fragilidade e dificuldade de manutenção. |

## Como lidar com o acoplamento?
- **Operacional**: Implementar mecanismos de resiliência, como retries, timeouts e circuit breakers.
- **Desenvolvimento**: Modularizar o código e promover autonomia entre equipes.
- **Semântico**: Usar contratos bem definidos (ex.: APIs versionadas) e evitar dependências rígidas.
- **Funcional**: Adotar padrões como interfaces ou abstrações para reduzir dependências diretas.
- **Incidental**: Melhorar o design e refatorar o código para eliminar dependências desnecessárias.

# Acoplamento Aferente vs Eferente

Os conceitos de **acoplamento eferente** e **acoplamento aferente** estão relacionados à interação entre módulos ou componentes de um sistema, especialmente no contexto de design modular e arquitetura de software. Esses termos são frequentemente usados para analisar a qualidade do design de um sistema, ajudando a identificar dependências e responsabilidades.



## Acoplamento Eferente
- **Definição**: Refere-se ao número de módulos externos que um módulo **chama ou depende diretamente**. Em outras palavras, é a quantidade de dependências que um módulo tem para funcionar.
- **Foco**: Saídas do módulo (dependências externas).
- **Exemplo**:
  - Um módulo que consome APIs externas ou bibliotecas de terceiros.
  - Um serviço que chama outros serviços para obter dados ou realizar operações.
- **Desafios**:
  - Quanto maior o acoplamento eferente, mais difícil é mudar ou testar o módulo, pois ele depende de muitos outros componentes.
  - Aumenta o risco de falhas em cascata, já que o módulo depende do funcionamento correto de outros.

> Mede o quanto um módulo depende de outros. Deve ser controlado para evitar dependências excessivas.
## Acoplamento Aferente
- **Definição**: Refere-se ao número de módulos que **dependem diretamente** de um módulo. Ou seja, é a quantidade de outros módulos que utilizam ou chamam o módulo em questão.
- **Foco**: Entradas do módulo (quem depende dele).
- **Exemplo**:
  - Um módulo central ou uma biblioteca compartilhada que é usada por vários outros módulos.
  - Um serviço que fornece dados ou funcionalidades para outros serviços.
- **Desafios**:
  - Quanto maior o acoplamento aferente, mais crítico o módulo se torna, pois mudanças nele podem impactar muitos outros módulos.
  - Aumenta a complexidade de manutenção, já que qualquer alteração precisa ser cuidadosamente avaliada para evitar quebrar os módulos dependentes.

>  Mede o quanto outros módulos dependem de um módulo. Deve ser gerenciado para evitar que o módulo se torne um gargalo ou ponto crítico.
## Diferenças e Relação

| Aspecto | Acoplamento Eferente | Acoplamento Aferente |
|---------|-----------------------|-----------------------|
| **O que mede?** | Dependências externas do módulo. | Dependências internas de outros módulos no módulo. |
| **Foco** | Saídas (quem o módulo chama). | Entradas (quem chama o módulo). |
| **Impacto** | Afeta a flexibilidade do módulo (dificuldade de mudar ou testar). | Afeta a estabilidade do módulo (dificuldade de alterar sem quebrar outros). |
| **Exemplo** | Um módulo que consome várias APIs externas. | Um módulo central usado por muitos outros módulos. |

## Como lidar com esses acoplamentos?
1. **Acoplamento Eferente**:
   - Reduzir o número de dependências externas, sempre que possível.
   - Usar abstrações, como interfaces, para desacoplar o módulo de implementações específicas.
   - Garantir que as dependências externas sejam bem definidas e estáveis.

2. **Acoplamento Aferente**:
   - Evitar que um único módulo se torne um "ponto único de falha" (single point of failure).
   - Modularizar o sistema para distribuir responsabilidades.
   - Usar contratos bem definidos (ex.: APIs versionadas) para minimizar o impacto de mudanças.

## Lei de Postel (Princípio da Robustez)

- **Definição**: "Seja conservador no que você faz e liberal no que você aceita dos outros."
- **Significado**:
    - Ao desenvolver sistemas, seja rigoroso ao gerar saídas (produza dados ou comportamentos bem definidos e consistentes).
    - Seja flexível ao interpretar entradas (aceite variações ou pequenos erros, sempre que possível).
- **Exemplo**: Um servidor HTTP deve aceitar requisições com pequenas variações no formato, mas sempre responder com mensagens bem formatadas.
- **Objetivo**: Promover interoperabilidade e resiliência em sistemas.

## Lei de Lehman (Evolução de Software)

- **Definição**: "Sistemas de software em uso ativo devem evoluir continuamente, ou se tornarão progressivamente menos úteis."
- **Significado**:
    - Sistemas precisam ser adaptados para atender às mudanças nos requisitos de negócio, tecnologia e ambiente.
    - A falta de evolução leva à obsolescência e perda de relevância.
- **Exemplo**: Um sistema legado que não é atualizado para novas demandas de segurança ou experiência do usuário se torna inviável com o tempo.
- **Objetivo**: Garantir que o software continue útil e alinhado às necessidades.
