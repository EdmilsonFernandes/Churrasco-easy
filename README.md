# Churrasquinho App

Aplicação composta por um backend em Node.js/Express com TypeORM, um frontend em React + Vite e um esqueleto de aplicativo Flutter em `lib/`. O objetivo é gerenciar pedidos de espetinhos, produtos e lojas.

## Visão geral da estrutura
- `backend/`: API Express em TypeScript e integrações com PostgreSQL.
- `frontend/`: SPA em React/Vite que consome a API.
- `lib/`: protótipo Flutter (não integrado no fluxo descrito abaixo).
- `docker-compose.yml`: orquestração opcional para subir banco, API e frontend via Docker.

## Pré-requisitos
Para execução local:
- Node.js 20+ e npm
- PostgreSQL 15+ (com extensão `pgcrypto` disponível)

Para execução com contêineres:
- Docker e Docker Compose

## Configuração do banco de dados
1. Crie o banco e habilite a extensão de UUID (apenas na primeira vez):
   ```bash
   createdb churrasco
   psql -d churrasco -c 'CREATE EXTENSION IF NOT EXISTS "pgcrypto";'
   ```
2. Aplique o esquema presente em `backend/schema.sql`:
   ```bash
   psql -d churrasco -f backend/schema.sql
   ```
3. Ajuste as credenciais conforme necessário e reflita a URL na variável `DATABASE_URL` do backend (padrão: `postgres://postgres:postgres@localhost:5432/churrasco`).

Para atualizar tabelas/índices futuramente, edite `backend/schema.sql` e reaplique o arquivo com o comando acima.

## Executando o backend localmente
1. Dentro de `backend/`, instale dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` (opcional) para sobrepor valores padrão:
   ```bash
   DATABASE_URL=postgres://<usuario>:<senha>@localhost:5432/churrasco
   PORT=3000
   ```
3. Suba a API:
   ```bash
   npm run start
   ```
4. A API ficará disponível em `http://localhost:3000`.

## Executando o frontend localmente
1. Dentro de `frontend/`, instale dependências:
   ```bash
   npm install
   ```
2. Caso deseje apontar para uma URL diferente da API, crie `.env` com `REACT_APP_API=http://localhost:3000`.
3. Inicie o servidor de desenvolvimento Vite:
   ```bash
   npm run start
   ```
4. Acesse `http://localhost:5173` no navegador.

## Execução completa via Docker Compose
O arquivo `docker-compose.yml` sobe banco, backend e frontend em contêineres.

1. Suba os serviços:
   ```bash
   docker compose up
   ```
2. Endereços padrão:
   - API: `http://localhost:3000`
   - Frontend: `http://localhost:5173`
   - Banco: porta 5432 (credenciais padrão `postgres`/`postgres`).

O schema do banco é aplicado automaticamente na primeira inicialização (montagem de `backend/schema.sql` em `/docker-entrypoint-initdb.d`). Caso altere o schema, derrube os contêineres e remova o volume `db_data` para reaplicar:
```bash
docker compose down -v
docker compose up
```

## Ajustando credenciais e URLs
- Backend: variáveis `DATABASE_URL` e `PORT` (arquivo `.env` ou variáveis de ambiente). O TypeORM busca a URL em `backend/src/config/env.ts`.
- Frontend: variável `REACT_APP_API` define a URL base consumida em `frontend/src/services/api.ts`.
- Docker Compose: atualize as variáveis do serviço `db` e refita `DATABASE_URL` no serviço `backend` e `REACT_APP_API` no `frontend` se mudar usuário/senha/host.

## Dicas rápidas
- As entidades TypeORM estão em `backend/src/entities/*` e compartilham o mesmo schema descrito em `backend/schema.sql`.
- Não há migrações automáticas; use sempre o arquivo de schema para criar/atualizar tabelas.
- O Flutter em `lib/` é apenas um esqueleto e não depende do backend/DB para ser executado.
