# Painel de Cadastro de Professores

Projeto com arquitetura separada em frontend, backend e infraestrutura, com o frontend já consumindo a API REST do backend.

## Estrutura

- `frontend/`: React + Vite + integração com a API backend
- `backend/`: Java 21 + Spring Boot + JPA para API REST
- `infra/`: Docker Compose para PostgreSQL

## Requisitos

- Node.js 20+
- Java 21
- Maven 3.9+
- Docker (opcional, para subir o PostgreSQL)

## Como executar

### 1. Backend

O backend expõe os endpoints da API em `/api/professores`.

```bash
cd backend
mvn spring-boot:run
```

### 2. Banco de dados

Se necessário, suba o PostgreSQL com o Docker Compose:

```bash
cd infra
docker compose up -d
```

### 3. Frontend

O frontend agora faz chamadas para o backend via proxy do Vite, apontando para `http://localhost:8080`.

```bash
cd frontend
npm install
npm run dev
```

## Funcionalidades atuais do frontend

O frontend já está conectado à API backend e suporta:

- listagem de professores vindos da API
- cadastro de novo professor via `POST /api/professores`
- edição de professor via `PUT /api/professores/:id`
- exclusão de professor via `DELETE /api/professores/:id`
- feedback visual com toasts para sucesso, erro e cancelamento
- confirmação visual antes de excluir um professor
- pesquisa e filtros aplicados na interface com base nos dados carregados da API

## Regras de status atualmente utilizadas

- `1` = ativo
- `0` = inativo
- `2` = desligado

## Pesquisa e filtros

A tela principal ainda realiza a lógica de busca e filtros no frontend, com as seguintes regras:

- busca por unidade ou inscrição
- modo especial para inscrição com 11 dígitos
- filtros de status: todos, ativos, inativos e desligados
- mensagem de resultado vazio quando não houver correspondência

## Observação

A integração com o backend já está implementada para o fluxo principal de CRUD. A lógica de busca e filtros pode, futuramente, ser movida para o backend para melhorar performance e centralizar a regra.
