# Projeto Prática Profissional ADS

## Como executar o projeto

### Pré-requisitos

- Docker e Docker Compose
  - [Docker](https://docs.docker.com/engine/install/)
  - [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js
  - [Node.js](https://nodejs.org/en/download/)
- Yarn
  - [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

### Backend para desenvolvimento

- Instalar as dependências do projeto
  - `yarn install`
- Criar o arquivo `.env` na raiz do projeto backend (apps/backend)
  - `cd apps/backend & cp .env.example .env`
- Rodar o banco de dados
  - `docker-compose up -d`
- Rodar as migrations
  - `yarn typeorm migration:run`
- Rodar o projeto
  - `yarn run backend:debug`
