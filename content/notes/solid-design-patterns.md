---
title: 'SOLID e Design Patterns'
description: 'Notas práticas sobre princípios SOLID, padrões de projeto, camadas, repository pattern e problemas comuns de design.'
date: '2026-10-11'
slug: '/notes/solid-design-patterns/'
category: 'Software Design'
language: 'pt-BR'
status: 'study-note'
updatedAt: '2026-10-11'
order: 5
tags:
  - solid
  - design-patterns
  - clean-code
related:
  - fundamentos-arquitetura-software
  - domain-driven-design
published: true
source: 'Obsidian'
---

# SOLID com Robert C. Martin

O SOLID é um conjunto de princípios para criar software mais fácil de:
- manter
- evoluir
- testar
- reutilizar
- entender

O principal objetivo é evitar:
- alto acoplamento
- código confuso
- efeitos colaterais inesperados
- classes gigantes

## 1. SRP — Single Responsibility Principle

> “Uma classe deve ter apenas uma razão para mudar.”

Ou seja:  
Uma classe deve cuidar de apenas uma responsabilidade.

### Errado

```javascript
class UserService {
  createUser(user) {
    // cria usuário
  }

  sendEmail(user) {
    // envia email
  }

  generateReport() {
    // gera relatório
  }
}
```

Problema:  
Essa classe faz:

- cadastro
- email
- relatório

Ela pode mudar por vários motivos diferentes.

### Certo

```javascript
class UserService {
  createUser(user) {
    console.log("Usuário criado");
  }
}

class EmailService {
  sendEmail(user) {
    console.log("Email enviado");
  }
}

class ReportService {
  generateReport() {
    console.log("Relatório gerado");
  }
}
```

Agora:

- cada classe tem uma responsabilidade
- mudanças ficam isoladas
- manutenção fica simples

### Regra prática

Se você consegue descrever a classe usando:

> “Ela faz X, Y e Z”

Provavelmente ela viola SRP.

## 2. OCP — Open/Closed Principle

> “Aberto para extensão, fechado para modificação.”

Você deve conseguir adicionar comportamentos novos sem alterar código já estável.

### Errado

```javascript
class PaymentService {
  pay(type) {
    if (type === "pix") {
      console.log("Pagamento PIX");
    }

    if (type === "credit_card") {
      console.log("Pagamento cartão");
    }
  }
}
```

Problema:  
Toda vez que surgir um novo pagamento:

- boleto
- paypal
- crypto

Você precisa modificar a classe.

### Certo

```javascript
class PixPayment {
  pay() {
    console.log("Pagamento PIX");
  }
}

class CreditCardPayment {
  pay() {
    console.log("Pagamento cartão");
  }
}

class PaymentService {
  process(paymentMethod) {
    paymentMethod.pay();
  }
}
```

Uso:

```javascript
const service = new PaymentService();

service.process(new PixPayment());
service.process(new CreditCardPayment());
```

Agora:

- você adiciona novos pagamentos
- sem alterar código existente

### Regra prática

Evite:

- muitos `if`
- muitos `switch`
- lógica baseada em tipo

## 3. LSP — Liskov Substitution Principle

> “Subclasses devem poder substituir suas classes base sem quebrar o sistema.”

Se algo herda de outra coisa:
- deve se comportar corretamente como ela

### Errado

```javascript
class Bird {
  fly() {
    console.log("Voando");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Pinguim não voa");
  }
}
```

Problema:  
`Penguin` quebrou a expectativa da classe `Bird`.

### Certo

```javascript
class Bird {}

class FlyingBird extends Bird {
  fly() {
    console.log("Voando");
  }
}

class Penguin extends Bird {
  swim() {
    console.log("Nadando");
  }
}
```

Agora:

- apenas aves que voam têm `fly()`
- não existe comportamento inválido

### Regra prática

Se uma herança força:

- exceções
- métodos vazios
- comportamentos quebrados

Então a herança está errada.

## 4. ISP — Interface Segregation Principle

> “Não obrigue classes a depender de métodos que elas não usam.”

Interfaces devem ser pequenas e específicas.

### Errado

```javascript
class Worker {
  work() {}
  eat() {}
}

class Robot extends Worker {
  eat() {
    throw new Error("Robô não come");
  }
}
```

Problema:  
O robô foi obrigado a implementar algo inútil.

### Certo

```javascript
class Workable {
  work() {}
}

class Eatable {
  eat() {}
}

class HumanWorker extends Workable {
  work() {
    console.log("Trabalhando");
  }

  eat() {
    console.log("Comendo");
  }
}

class RobotWorker extends Workable {
  work() {
    console.log("Robô trabalhando");
  }
}
```

Agora:
- cada classe usa apenas o que precisa

### Regra prática

Se você vê:

- métodos vazios
- `throw new Error()`
- implementações inúteis

Pode haver violação de ISP.

## 5. DIP — Dependency Inversion Principle

> “Dependa de abstrações, não de implementações.”

Classes de alto nível não devem depender diretamente de classes concretas.

### Errado

```javascript
class MySQLDatabase {
  save() {
    console.log("Salvando no MySQL");
  }
}

class UserService {
  constructor() {
    this.database = new MySQLDatabase();
  }

  createUser() {
    this.database.save();
  }
}
```

Problema:  
`UserService` está acoplado ao MySQL.

Trocar banco = mudar código.

### Certo

```javascript
class MySQLDatabase {
  save() {
    console.log("Salvando no MySQL");
  }
}

class MongoDatabase {
  save() {
    console.log("Salvando no Mongo");
  }
}

class UserService {
  constructor(database) {
    this.database = database;
  }

  createUser() {
    this.database.save();
  }
}
```

Uso:

```javascript
const mysql = new MySQLDatabase();
const mongo = new MongoDatabase();

const userService = new UserService(mysql);

userService.createUser();
```

Agora:
- UserService não conhece implementação
- fica desacoplado
- fácil testar 
- fácil trocar dependências

## Como tudo se conecta

| Princípio | Objetivo                        |
| --------- | ------------------------------- |
| SRP       | reduzir responsabilidades       |
| OCP       | evitar modificar código estável |
| LSP       | heranças corretas               |
| ISP       | interfaces pequenas             |
| DIP       | reduzir acoplamento             |

## O que Uncle Bob mais tenta ensinar

O problema do software não é:
- linguagem
- framework
- banco

O problema é:
- dependência errada
- acoplamento
- falta de organização

SOLID existe para evitar:
- rigidez
- fragilidade
- efeito cascata
- código impossível de manter

## Regra prática para o dia a dia

Quando estiver programando, pergunte:

### SRP

> Essa classe faz mais de uma coisa?

### OCP

> Preciso alterar código existente para adicionar comportamento?

### LSP

> Essa herança faz sentido mesmo?

### ISP

> Estou obrigando alguém a implementar algo inútil?

### DIP

> Estou muito acoplado a uma implementação concreta?

# Arquitetura vs Design

### Arquitetura

Define decisões de alto nível: linguagem, frameworks, banco de dados, microsserviços ou monolito.

### Design

Define: organização de classes, responsabilidades, comunicação entre objetos, padrões de projeto.

👉 **Arquitetura** = estrutura geral  
👉 **Design** = implementação interna

# Design Patterns

## 1. Strategy Pattern

### Objetivo

Trocar algoritmos dinamicamente.

### Exemplo

Duas formas de gerar nota fiscal:

- regime de caixa
- regime de competência

Cada algoritmo fica em uma classe separada.

Benefícios:

- flexibilidade
- extensibilidade
- OCP

## 2. Adapter Pattern

### Objetivo

Adaptar interfaces incompatíveis.

### Exemplo

Transformar Express em uma interface genérica:

```ts
HttpServer
```

Benefícios:

- desacoplamento
- troca fácil de tecnologias
- reutilização

## 3. Decorator Pattern

### Objetivo

Adicionar funcionalidades sem alterar a classe original.

### Exemplo

Adicionar logs em um use case:

```ts
LoggerDecorator
```

Usado para:

- logs
- cache
- autenticação

## 4. Repository Pattern

### Objetivo

Separar acesso ao banco da regra de negócio.

### Exemplo

```ts
ContractRepository
```

Benefícios:

- testabilidade
- desacoplamento
- flexibilidade

## 5. Presenter Pattern

### Objetivo

Formatar saída dos dados.

### Exemplo

Saída:

- JSON
- CSV

Benefício:  
A regra de negócio não precisa saber como os dados serão exibidos.

## 6. Mediator Pattern

### Objetivo

Centralizar comunicação entre objetos.

Evita:

- dependências diretas
- acoplamento excessivo

No projeto:  
Usado como Event Bus simples.

## Simple Factory

### Objetivo

Centralizar criação de objetos.

Exemplo:

```ts
InvoiceGenerationFactory.create(type)
```

Retorna:

- CashBasisStrategy
- AccrualBasisStrategy

Benefício:  
Evita `new` espalhado pelo sistema.

## Organização em Camadas

### Domain

Contém:

- entidades
- regras de negócio

Exemplo:

- Contract
- Payment
- Invoice

### Application

Contém:

- use cases
- orquestração da aplicação

Exemplo:

- GenerateInvoices

### Infrastructure

Contém:

- banco
- frameworks
- APIs
- adapters

Exemplo:

- ExpressAdapter
- PgPromiseAdapter

### Controller

### Objetivo

Receber requisições externas e chamar os use cases.

Exemplo:  
API HTTP chama:

```ts
GenerateInvoices
```

## Composition Root

### Objetivo

Centralizar criação das dependências.

Normalmente:

```ts
main.ts
```

Responsável por:

- criar objetos
- conectar dependências
- iniciar aplicação

## DTO (Data Transfer Object)

### Objetivo

Transportar dados entre camadas.

DTO:

- não possui regra de negócio
- apenas dados

Exemplo:

```ts
{
  month,
  year,
  type
}
```

## Ideias MAIS IMPORTANTES para memorizar

### 1. Baixo acoplamento

Classes não devem depender diretamente umas das outras.

### 2. Alta coesão

Cada classe deve fazer apenas uma coisa.

### 3. Dependência em abstrações

Usar:

- interfaces
- contratos

### 4. Separação de responsabilidades

Cada camada possui uma função clara.

### 5. Patterns resolvem problemas reais

Não usar pattern “porque sim”.

Evitar:  
❌ complexidade desnecessária  
❌ “patternite” (usar pattern em tudo)

# Patterns of Enterprise Application Architecture

## Layer vs Tier

**Layer** (camada) é uma divisão **lógica** — organização do código (ex: domain, application, infrastructure).  

**Tier** (camada física) é uma divisão **física** — onde o código roda (ex: servidor web, banco de dados, cliente).

Ou seja: layers são sobre **separação de responsabilidades** no código; tiers são sobre **separação física** em processos/máquinas diferentes. É possível ter múltiplas layers em uma única tier (ex: monólito).

## 3 Layers Architecture



A **3 Layers Architecture** divide a aplicação em três camadas lógicas:

1. **Presentation Layer (UI / Controller)** — lida com a interação com o usuário ou sistemas externos (APIs, interfaces). Só recebe requisições e exibe respostas, sem regra de negócio.
2. **Business Layer (Domain / Application)** — contém as regras de negócio e orquestração dos use cases. É o centro do sistema.
3. **Data Layer (Persistence / Infrastructure)** — cuida do armazenamento e recuperação de dados (banco, arquivos, APIs externas).

**Regra fundamental**: cada camada se comunica **apenas com a camada imediatamente abaixo**. A Presentation chama a Business, que chama a Data. Nenhuma camada "pula" outra.

**Benefícios principais**: baixo acoplamento, testabilidade isolada (cada camada pode ser testada separadamente), e facilidade para trocar implementações (ex: trocar banco sem afetar regras de negócio).

## Transaction Script

Organiza a lógica como **procedimentos/scripts**, onde cada operação de negócio é uma função separada.

```
function createInvoice(contractId, month, year) {
  // 1. busca contrato no banco
  // 2. calcula valores
  // 3. insere invoice no banco
  // 4. retorna resultado
}
```

- ✅ Simples, rápido de implementar
- ✅ Ideal para regras de negócio simples
- ❌ Vira código duplicado quando a lógica cresce

## Domain Model

Organiza a lógica usando **classes que representam conceitos do negócio**, com dados **e** comportamento juntos (OO de verdade).

```ts
class Contract {
  payments: Payment[]
  
  getBalance(): number {
    // regra de negócio dentro da própria entidade
  }
  
  generateInvoice(type: string): Invoice {
    // comportamento rico
  }
}
```

- ✅ Reuso e manutenção melhores
- ✅ Ideal para regras complexas
- ❌ Curva de aprendizado maior

## Table Module

Uma **classe única** que encapsula toda a lógica de negócio para uma tabela do banco, mas **separada dos dados** — você passa os dados (DataSets/Records) para ela processar.

```ts
class ContractModule {
  getBalance(contractData: ContractRecord): number {
    // lógica opera sobre dados vindos do banco
  }
}
```

- ✅ Meio-termo entre os dois anteriores
- ✅ Funciona bem com Table Data Gateway
- ❌ Menos flexível que Domain Model

## Diferenças principais

| Característica | Transaction Script | Table Module | Domain Model |
|---|---|---|---|
| Organização | Funções/scripts | Uma classe por tabela | Classes ricas do domínio |
| Onde fica a regra | No script | Na classe módulo | Dentro das entidades |
| Dados + comportamento | Separados | Separados | Juntos |
| Complexidade ideal | Baixa | Média | Alta |
| Reuso | Baixo | Médio | Alto |

**Regra prática**: comece com Transaction Script. Se começar a repetir código, migre para Table Module. Se a complexidade crescer muito, vá para Domain Model.

## Service Layer

É uma **camada fina** que fica entre a Presentation e o Domain Model. Ela orquestra operações de negócio, gerencia transações, aplica segurança e coordena múltiplas entidades.

```ts
class InvoiceService {
  constructor(private contractRepo: ContractRepository) {}

  generateInvoices(input: GenerateInput): Invoice[] {
    // 1. busca dados (infra)
    const contract = this.contractRepo.findById(input.contractId)
    // 2. delega regra de negócio ao domínio
    const invoices = contract.generateInvoices(input.type)
    // 3. persiste (infra)
    return this.contractRepo.saveInvoices(invoices)
  }
}
```

Ela **coordena**, mas não contém regra de negócio — a regra fica no Domain Model.

## Por que Service Layer ≠ Domain Model

| Service Layer | Domain Model |
|---|---|
| Orquestra operações | Contém regras de negócio |
| Depende de serviços externos (repos, emails) | Não depende de infraestrutura |
| Lida com transações, segurança | Lida apenas com lógica do domínio |
| É "sem estado" (stateless) | Entidades têm estado |
| Chama o domínio | É chamado pela service |

**Resumo**: Service Layer é um **orquestrador** que coordena o fluxo; Domain Model é onde a **regra de negócio** de fato vive. O erro comum é colocar regra de negócio na Service Layer — isso vira Transaction Script com nome bonito e perde os benefícios do Domain Model (reuso, coesão, testabilidade).

## Service Layer vs Transaction Script 

Ambos organizam a lógica em **procedimentos**, mas a diferença é onde a **regra de negócio** vive:

- **Transaction Script**: as regras de negócio estão **dentro do próprio script**. Cada método contém tanto a orquestração quanto a lógica de negócio embutida.

- **Service Layer**: as regras de negócio estão **no Domain Model** (entidades ricas). A Service Layer **apenas orquestra** — chama o domínio, gerencia transações, infraestrutura.

| Transaction Script | Service Layer |
|---|---|
| Orquestração + regra de negócio **no mesmo lugar** | Orquestração **separada** da regra de negócio |
| Lógica procedural direta | Delega para entidades ricas |
| Sem Domain Model por baixo | Domain Model por baixo |
| Reuso baixo (regra duplicada fácil) | Reuso alto (regra centralizada no domínio) |

**Resumo**: Service Layer **é um Transaction Script** se você colocar a regra de negócio dentro dela. A diferença real não é o padrão em si, mas se existe um **Domain Model** para absorver as regras. Service Layer sem Domain Model é só Transaction Script com nome diferente.

## Gateway 

Objeto que encapsula e acessa sistemas ou recursos externos



## Row Data Gateway

Um objeto que **representa uma linha** de uma tabela do banco. Cada instância = um registro. Você manipula os dados como objeto e depois salva.

```ts
class ContractGateway {
  id: number
  amount: number
  period: number

  insert() { /* INSERT no banco */ }
  update() { /* UPDATE */ }
  delete() { /* DELETE */ }
}

const contract = new ContractGateway()
contract.amount = 5000
contract.insert()
```

## Table Data Gateway

Uma classe que encapsula **todas as operações SQL de uma tabela inteira**. Não representa uma linha específica — os dados são passados como parâmetros (DataSets, records, dicionários).

```ts
class ContractGateway {
  find(id: number): any { /* SELECT * FROM contract WHERE id = ? */ }
  findAll(): any[] { /* SELECT * FROM contract */ }
  insert(data: ContractData) { /* INSERT */ }
  update(id: number, data: ContractData) { /* UPDATE */ }
  delete(id: number) { /* DELETE */ }
}

const contract = ContractGateway.find(1)
```

## Diferença principal

| Row Data Gateway | Table Data Gateway |
|---|---|
| 1 instância = 1 linha | 1 instância = tabela inteira |
| Objeto com identidade própria | Métodos estáticos ou instância única |
| Dados + SQL no mesmo objeto | SQL centralizado, dados separados |
| Você chama `.insert()` na própria instância | Você chama `Gateway.insert(data)` passando os dados |

**Resumo**: Row Data Gateway trata cada registro como um **objeto** (similar a ORM). Table Data Gateway trata a **tabela** inteira como uma **interface** de operações SQL. Ambos são camadas de acesso a dados que mantêm a lógica de banco separada do resto.

## Active Record

**Active Record** é um padrão de arquitetura de software (descrito por Martin Fowler) onde um objeto encapsula tanto os **dados** quanto o **comportamento** de uma linha do banco de dados. Cada instância da classe representa uma linha na tabela, e a própria classe fornece métodos para consultar, criar, atualizar e deletar registros (CRUD).



É o padrão ORM (Object-Relational Mapping) mais conhecido, implementado pelo **Rails** (Ruby on Rails), mas também presente em frameworks de outras linguagens (Laravel/Eloquent no PHP, Entity Framework no .NET, etc.).

**Características principais:**
- Tabela → Classe, Linha → Objeto, Coluna → Atributo
- Herança de `ActiveRecord::Base` (no Rails) dá acesso automático a métodos como `.find()`, `.where()`, `.save()`, `.destroy()`
- Convenção sobre configuração: nome da tabela é o plural snake_case do nome da classe
- Inclui validações, associações (`belongs_to`, `has_many`), callbacks e migrações

**Evite Active Record quando:**

1. **Domínio complexo com lógica de negócio rica** — Active Record acopla lógica de negócio à persistência, criando God Objects difíceis de testar e manter. Prefira **Data Mapper** (ex: Hibernate/JPA, SQLAlchemy) que separa entidades da camada de acesso a dados.

2. **Banco de dados legado ou esquema não normalizado** — Active Record assume que a tabela reflete perfeitamente a estrutura da classe. Com esquemas mal feitos, você luta contra o framework em vez de deixá-lo ajudar.

3. **Testabilidade é prioridade** — Objetos Active Record são difíceis de mockar porque carregam o banco junto. Um Repository/Data Mapper permite injetar dependências falsas com facilidade.

4. **Múltiplas fontes de dados** — Se uma entidade precisa ser montada a partir de várias tabelas, APIs externas ou caches, Active Record força heranças ou joins artificiais. Um **Repository** abstrai isso melhor.

5. **Projetos com alta concorrência e regras de consistência complexas** — Active Record lida mal com transações longas e locking otimista/distribuído. Padrões como **CQRS** ou **Event Sourcing** são mais adequados.

6. **Domain-Driven Design (DDD) puro** — DDD prega que entidades e value objects devem ignorar persistência. Active Record quebra esse princípio.

Active Record é ótimo para CRUD simples, protótipos e MVPs. Para sistemas com lógica de negócio densa, múltiplas fontes de dados, ou que exigem testes unitários profundos, prefira **Repository + Data Mapper**.

## Data Mapper

**Data Mapper** é um padrão de arquitetura onde uma camada separada (o **Mapper**) é responsável por transferir dados entre **objetos em memória** e o **banco de dados**, sem que os objetos saibam que o banco existe. As entidades são classes Puras (POJOs/POCOs) — simples structs com atributos e métodos de negócio, sem herança de framework ou métodos de persistência.



**Diferença chave vs Active Record:**

| Característica                | Active Record                  | Data Mapper                          |
| ----------------------------- | ------------------------------ | ------------------------------------ |
| Objeto sabe que existe banco? | Sim                            | Não                                  |
| Método `save()` na entidade?  | Sim (herdado)                  | Não (fica no mapper)                 |
| Acoplamento                   | Alto (entidade → banco)        | Baixo (entidade ignora persistência) |
| Testabilidade                 | Difícil (precisa mockar banco) | Fácil (entidade é classe simples)    |

**Exemplos:** Hibernate/JPA (Java), SQLAlchemy core/ORM session (Python), Doctrine 2 (PHP), Entity Framework Core (com DbContext separado).

**Quando usar:** domínio complexo, DDD, testes unitários pesados, múltiplas fontes de dados, equipes grandes. O custo é mais boilerplate e configuração explícita.

## Unit of Work

**Atomicidade** é a propriedade **ACID** que garante que uma transação é **tudo ou nada**: se qualquer parte falha, todo o estado anterior é restaurado (rollback). Não existe estado intermediário.

**Unit of Work (UoW)** é um padrão que mantém uma lista de **mudanças pendentes** (inserts, updates, deletes) e as **persiste em lote** num único momento (commit), garantindo atomicidade.

```
UoW                  Banco
  │                     │
  │── add(entity1) ────│ (só registra)
  │── add(entity2) ────│ (só registra)
  │── remove(entity3) ─│ (só registra)
  │                     │
  │── commit() ────────│→ tudo numa transação só
  │                     │  se algo falha, nada persiste
```

**Relação entre os dois:**
- **UoW implementa atomicidade** — ele rastreia todas as operações e as executa dentro de uma única transação de banco.
- Exemplos: `DbContext.SaveChanges()` no EF Core, `Hibernate Session.flush()`, `SQLAlchemy session.commit()`.

**Em suma:** Atomicidade é o *o quê* (tudo ou nada), Unit of Work é o *como* (rastreia mudanças e as aplica em lote).

O Unit of Work gerencia um **conjunto de operações** sobre entidades rastreadas. As operações principais são:

1. **Register New** (`registerNew`/`add`) — marca uma entidade recém-criada para INSERT no próximo commit
2. **Register Dirty** (`registerDirty`/`markAsChanged`) — marca uma entidade existente que foi modificada para UPDATE
3. **Register Removed** (`registerRemoved`/`delete`) — marca uma entidade para DELETE
4. **Commit** (`commit`/`saveChanges`) — executa **todas** as operações pendentes numa única transação:
   - Abre transação
   - Executa INSERT/UPDATE/DELETE (em ordem para evitar violação de FK)
   - Se tudo ok → commit. Se falhar → rollback
5. **Rollback** — descarta todas as mudanças pendentes, revertendo o estado dos objetos ao último commit
6. **Get Dirty Objects** — retorna lista de objetos modificados (útil para logging ou auditoria)

Algumas implementações incluem também:
- **Register Clean** — marca entidade como "não modificada" (útil após carregar do banco)
- **Merge** — sincroniza uma entidade destacada de volta ao contexto de rastreamento

**Fluxo típico:**
```
uow = new UnitOfWork(dbConnection)
uow.registerNew(user1)
uow.registerDirty(user2)
uow.registerRemoved(user3)
uow.commit()  // tudo dentro de 1 transação ou nada persiste
```

## Identity Map

**Identity Map** garante que cada linha do banco seja carregada **uma única vez** por transação, retornando sempre a **mesma instância** do objeto em memória.

```
session.get(User, 1) → cria objeto #1
session.get(User, 1) → retorna objeto #1 (mesma referência!)
```

**Problema que resolve:**
```python
u1 = repo.find(1)    # User(id=1, name="João")
u1.name = "Maria"
u2 = repo.find(1)    # Active Record sem Identity Map → objeto NOVO (nome="João"!)
print(u1.name)        # "Maria"
print(u2.name)        # "João" ← inconsistência!
```

**Como funciona:**
- Mantém um `Map<id, object>` (cache de identidade) dentro do Unit of Work ou Sessão
- Antes de consultar o banco, verifica se o objeto já está no mapa
- Se sim, retorna a referência existente (pulando a query)
- Se não, carrega do banco, registra no mapa e retorna

**Relação com Unit of Work:**
- **UoW + Identity Map** andam juntos: UoW rastreia mudanças, Identity Map garante unicidade de instâncias
- Exemplos: `Hibernate Session`, `EF Core DbContext`, `SQLAlchemy session`

**Quando usar:** sempre que há acesso repetido à mesma entidade dentro de uma transação. **Quando evitar:** em sistemas distribuídos que exigem dados sempre frescos do banco (aí prefira não usar ou limpe o mapa).

## Lazy Load

**Lazy Load** adia o carregamento de dados associados até o momento em que são **efetivamente acessados**. Em vez de trazer tudo numa query gigante (JOIN), carrega apenas o objeto principal e busca os relacionamentos sob demanda.

```
pedido = db.find(1)       → só SELECT * FROM pedidos WHERE id=1
pedido.itens               → neste momento: SELECT * FROM itens WHERE pedido_id=1
```

**Implementações comuns:**

| Padrão | Descrição |
|---|---|
| **Proxy** | Cria um placeholder que intercepta acesso ao getter e dispara a query |
| **Ghost** | Carrega objeto com campos vazios; preenche ao primeiro acesso |
| **Virtual Proxy** | Objeto falso com mesma interface; ao usar, carrega o real |

**Vantagens:** performance (não carrega o que não usa), menos memória.

**Desvantagens:**
- **N+1 Queries** — acessar `pedido.cliente.nome` em loop dispara N queries
- Conexão precisa estar aberta no momento do acesso (fora de transação pode quebrar)
- Comportamento imprevisível (lazy exceptions)

**Solução para N+1:** **Eager Loading** explícito (`JOIN`/`Include`) quando você sabe que vai usar o relacionamento.

## Repository

**Repository** é um padrão que **abstrai o armazenamento** de entidades, criando uma interface de coleção em memória para acesso a dados. O cliente (ex: Service) nunca fala diretamente com banco, mapper, API ou cache — só conversa com o Repository.

```python
class UserRepository:
    def find_by_id(self, id: int) -> User: ...
    def find_all(self) -> list[User]: ...
    def save(self, user: User): ...
    def delete(self, user: User): ...
```

**Por que usar (benefícios + cenários ideais):**

1. **Desacoplamento total** — o domínio ignora se os dados vêm de SQL, NoSQL, API REST, arquivo ou cache. Trocar a implementação não afeta o resto do sistema.

2. **Testabilidade** — você cria um `InMemoryUserRepository` falso em vez de mockar ORM, banco ou HTTP. Testes rodam em milissegundos e sem dependência externa.

3. **Domínio rico / DDD** — Repository é o padrão oficial do DDD para acesso a agregados. Permite consultas complexas com especificações sem vazar detalhes de persistência.

4. **Múltiplas fontes** — um `find()` pode buscar no cache primeiro, cair no banco se não achar e escrever de volta — tudo encapsulado dentro do repository. O cliente não sabe nem se importa.

5. **Transações centralizadas** — combinado com Unit of Work, garante atomicidade sem espalhar lógica transacional pelos serviços.

**Quando você precisa de Repository:**
- Aplicações com lógica de negócio não trivial
- Você quer trocar de banco/ORM sem reescrever metade do código
- Domínio modelado com DDD (Agregados, Value Objects)
- Testes unitários são prioridade

**Quando Repository é exagero (prefira Active Record direto):**
- CRUD puro, protótipos, MVPs, ferramentas internas simples
- A fonte de dados nunca vai mudar
- A equipe é pequena e a complexidade extra não compensa

**Relação com Data Mapper:** Repository geralmente usa Data Mapper internamente. O Repository é a *interface pública* (abstração de coleção), o Mapper é o *mecanismo interno* que traduz objetos para SQL.
