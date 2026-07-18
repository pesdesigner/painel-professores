# Painel de Cadastro de Professores

Projeto inicial com arquitetura separada em frontend, backend e infraestrutura.

## Estrutura

- `frontend/`: React + Vite com dados mockados para iniciar o fluxo do admin.
- `backend/`: Java 21 + Spring Boot + JPA para API REST.
- `infra/`: Docker Compose para PostgreSQL.

## Requisitos

- Node.js 20+
- Java 21
- Maven 3.9+
- Docker (opcional, para subir o PostgreSQL)

## Frontend (mockado)

```bash
cd frontend
npm install
npm run dev
```

## Banco de dados

```bash
cd infra
docker compose up -d
```

## Backend

O backend foi implementado utilizando Java 21, Spring Boot e JPA para fornecer uma API REST conectada ao PostgreSQL.

### Configuração do Banco de Dados

Certifique-se de que o banco de dados PostgreSQL está em execução. Você pode usar o Docker Compose para subir o banco:

```bash
cd infra
docker compose up -d
```

## Escopo atual implementado no frontend

- Listagem de professores como tela principal
- Formulario de cadastro/edicao exibido sob demanda (botao "Cadastrar professor")
- Cadastro de professor com ID numerico gerado automaticamente no mock
- Atualizacao de cadastro
- Exclusao logica (status numerico)
	- Ativo = 1
	- Inativo = 0
	- Excluido/Desligado = 2
- Ativar/Desativar professor
- Pesquisa de cadastro por unidade ou inscricao
- Modo de busca por inscricao (11 digitos):
	- oculta botoes de status
	- lista apenas o cadastro correspondente
	- mensagem "Cadastro nao encontrado." quando nao houver resultado
- Filtros de status: todos, ativos, inativos e desligados
	- Desligados aparece apenas quando ha busca preenchida
	- Todos/Ativos/Inativos nao exibem registros com status 2
