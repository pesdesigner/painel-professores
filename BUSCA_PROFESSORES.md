# Análise de busca e filtros de professores

## Contexto

O frontend atual já implementa a lógica de busca e filtros para a lista de professores, mas toda essa regra está sendo aplicada no lado do cliente após carregar a lista completa da API.

## Como funciona hoje

### 1. Carregamento inicial

Ao abrir a tela, o frontend chama o endpoint:

- GET /api/professores

A resposta retorna todos os professores e a interface armazena essa lista localmente em estado.

### 2. Regras de busca

A busca é feita a partir do texto digitado no campo de pesquisa.

#### Regras atuais

- O texto é normalizado removendo espaços e convertendo para minúsculas.
- Se a entrada tiver exatamente 11 dígitos, a busca é tratada como uma busca exata de `inscricao`.
- Para outros casos, a busca faz uma correspondência parcial em:
  - `unidade`
  - `inscricao`

### 3. Regras de filtro

Os filtros aplicados atualmente são:

- `todos`: mostra todos os professores, exceto os com `ativo = 2`
- `ativos`: mostra apenas professores com `ativo = 1`
- `inativos`: mostra apenas professores com `ativo = 0`
- `desligados`: mostra apenas professores com `ativo = 2`

### 4. Comportamento especial

- O filtro `desligados` só aparece quando há alguma busca digitada.
- O estado atual usa uma lógica local baseada em `useMemo`, recalculando a lista sempre que a busca, o filtro ou a coleção de professores muda.

## Valores de status

- `1` = ativo
- `0` = inativo
- `2` = desligado

## Observação sobre a implementação atual

A lógica de filtro e busca está concentrada no frontend, o que funciona bem para o cenário atual, mas tem limitações:

- mais dados trafegam para o cliente
- a regra fica espalhada na camada de apresentação
- a performance pode piorar conforme a quantidade de professores crescer
- fica mais difícil manter consistência entre telas e integrações

## Proposta de migração para o backend

Para deixar essa lógica no backend, o endpoint de listagem pode aceitar parâmetros de busca e filtro, reduzindo a responsabilidade do frontend.

## Contrato de API proposto

### Endpoint

GET /api/professores

### Parâmetros de query

#### `search`
- tipo: string
- opcional
- descrição: texto livre para buscar por `unidade` ou `inscricao`

#### `filter`
- tipo: string
- opcional
- valores aceitos:
  - `todos`
  - `ativos`
  - `inativos`
  - `desligados`

### Regras esperadas do backend

- Se `search` for informado:
  - buscar por `unidade` ou `inscricao`
  - se a entrada tiver exatamente 11 dígitos, tratar como busca exata de `inscricao`

- Se `filter` for informado:
  - `todos`: retornar todos, exceto `ativo = 2`
  - `ativos`: retornar apenas `ativo = 1`
  - `inativos`: retornar apenas `ativo = 0`
  - `desligados`: retornar apenas `ativo = 2`

### Exemplo de requisições

- GET /api/professores
- GET /api/professores?search=12
- GET /api/professores?filter=ativos
- GET /api/professores?search=20261001001
- GET /api/professores?search=12&filter=ativos

### Resposta esperada

Retorno em formato JSON com a lista de professores no mesmo formato já utilizado pela API atual.

Exemplo:

```json
[
  {
    "id": 1,
    "nome": "Ana Costa",
    "inscricao": "20261001001",
    "foto": "https://example.com/foto.jpg",
    "unidade": "12",
    "entrada": "07:30",
    "saida": "16:30",
    "almocoInicio": "11:30",
    "almocoFim": "12:30",
    "ativo": 1
  }
]
```

## Conclusão

A lógica atual está bem definida e pode ser migrada para o backend sem grandes mudanças no contrato de domínio. A proposta acima mantém a API simples e deixa espaço para evoluções futuras, como paginação e ordenação.
