# PI II — Sistema de Gerenciamento de Entrada e Saída de Acervos

Projeto Integrador II / Banco de Dados I — **FATEC Itu** (2º semestre 2026).

## 📋 Backlog (metodologia ágil — épicos e histórias de usuário)

### Estrutura do quadro (GitHub Projects — Kanban)

| Coluna | Função |
|---|---|
| **Backlog** | Funcionalidades planejadas (não priorizadas) |
| **To Do** | Priorizadas para a sprint atual |
| **In Progress** | Em desenvolvimento |
| **Code Review / Testes** | Validação do banco de dados e regras de negócio |
| **Done** | Concluídas e validadas |

### Épicos (do documento oficial)

| Épico | Escopo | Issues |
|---|---|---|
| **E1** Modelagem do banco | 6 tabelas + PKs/FKs + tipos do dicionário | #8–#13 |
| **E2** Cadastros base | CRUD Categoria, Item_Acervo, Responsavel, Destino | #14–#17 |
| **E3** Movimentações | abrir exposição → vincular itens c/ laudo → registrar retorno | #18–#20 |
| **E4** Consultas/relatórios | histórico, itens fora, atrasadas, laudo saída×retorno | #21–#24 |
| **E5** Integridade | constraints, CHECKs, política de FKs | #25–#26 |
| **E6** Documentação | DER, dicionário, scripts SQL | #27–#29 |

**Entidades:** Destino · Exposicao · Responsavel · Item_Acervo · Categoria · Item_Exposicao (associativa)

**Board:** https://github.com/users/Bcramattos/projects/2

## Convenções
- **Histórias de usuário:** `Como <papel>, quero <ação>, para <benefício>`
- **Tarefas técnicas:** prefixo `[DB]`, `[SQL]`, `[DOC]`
- **Issue labels:** `epic:E1..E6`, `priority:P0..P3`, `sprint:S1..`

## 👥 Equipe
Grupo 3 — FATEC Itu · 2º semestre 2026.


---

## 🗂️ GitHub Project (Kanban)

> O Project V2 ("PI II — Backlog Acervos") é criado/ativado via interface (1 clique):
> **Repos → pi2-sistema-acervos → Projects → New project → Import/Board** com as colunas:
> `Backlog` · `To Do` · `In Progress` · `Code Review / Testes` · `Done`
> *(API de Projects exige token com permissão `projects:rw` — o token atual não a tem.)*

## 🏷️ Labels criadas
`epic:E1..E6` · `priority:P0..P3` · `sprint:S1..S3`

## 📥 Issues
As histórias de usuário são gerenciadas como **Issues** (uma por história), com labels de épico/prioridade/sprint. A issue **#1** é o modelo de formatação.
