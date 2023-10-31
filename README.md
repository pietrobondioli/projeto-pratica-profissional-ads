# Projeto Prática Profissional ADS

Este projeto é uma aplicação dividida em front-end e back-end e foi estruturada seguindo o modelo monorepo gerenciado pelo Turbo. O backend foi desenvolvido com NestJS e o frontend utiliza Vite.

## 🚀 Tecnologias e Serviços

- **Backend**: NestJS, TypeORM, AWS SDK (para integração com serviços como S3 e SES).
- **Frontend**: Vite, TailwindCSS, React.
- **Monorepo**: Gerenciado pelo Turbo.
- **Banco de Dados**: MySQL rodando via Docker.

## 📂 Estrutura do Projeto

O projeto segue uma estrutura de monorepo contendo duas principais pastas: `backend` e `frontend` dentro de `apps`.

### Backend

- `migrations`: Contém todas as migrações do banco de dados.
- `src`:
  - `config`: Configurações diversas como database, rotas e variáveis de ambiente.
  - `lib`: Bibliotecas e utilidades.
  - `modules`: Os principais módulos da aplicação como autenticação, chat, pagamentos, entre outros.
- `scripts`: Scripts auxiliares como geração de migrations e comandos personalizados.

### Frontend

- `src`:
  - `config`: Configurações para rotas e notificações toast.
  - `pages`: Componentes principais de cada página.
  - `router`: Lógica de roteamento da aplicação.
  - `shared`: Componentes compartilhados, hooks, estilos e outros utilitários.

## 🚀 Como executar o projeto

### Pré-requisitos

- **Docker e Docker Compose**
  - [Docker](https://docs.docker.com/engine/install/)
  - [Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js**
  - [Node.js](https://nodejs.org/en/download/)
- **Yarn**
  - [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

## Instruções Docker

1. **Inicialização do Banco de Dados**:
   ```bash
   docker-compose up -d
   ```

2. **Execução de Migrations**:
   ```bash
   # Go to backend folder
    cd apps/backend

    # Run migrations
    yarn typeorm migration:run

    # Lembre-se de que a env database__uri deve estar configurada corretamente, leia mais em "Instruções Backend"
    ```

3. Pronto! Agora para checar você pode usar ferramentas como o [MySQL Workbench](https://www.mysql.com/products/workbench/) ou o [DBeaver](https://dbeaver.io/) para acessar uma visualização do banco de dados.

### Instruções Backend

1. **Instalação das Dependências**:
   ```bash
   yarn install
   ```

2. **Configuração de Ambiente**:
   Navegue até a pasta `backend` e crie um arquivo `.env` usando o `.env.example` como exemplo:
   ```bash
   cd apps/backend && cp .env.example .env
   ```

3. **Inicialização do Banco de Dados**:
   ```bash
   docker-compose up -d
   ```

4. **Execução de Migrations**:
   ```bash
   yarn typeorm migration:run
   ```

5. **Inicie o Backend em Modo Debug**:
   ```bash
   yarn run backend:debug
   ```

### Instruções Frontend

Para rodar o frontend, você pode seguir os scripts disponíveis no `package.json` principal.

1. Configuração de Ambiente:
   Navegue até a pasta `frontend` e crie um arquivo `.env` usando o `.env.example` como exemplo:
   ```bash
   cd apps/frontend && cp .env.example .env.local
   ```

2. Inicie o Frontend em Modo de Desenvolvimento:
   ```bash
   yarn run frontend:dev
   ```

### Alternativa: Execução de Backend e Frontend em Modo de Desenvolvimento

Você pode executar o backend e o frontend em modo de desenvolvimento simultaneamente usando o script `start:dev` do `package.json` principal:

```bash
yarn start:dev
```

Mas não se esqueça de configurar o arquivo `.env` do backend e o `.env.local` do frontend.

## 🔐 Serviços AWS

Este projeto utiliza serviços da AWS, como o S3 para armazenamento de mídias e o SES para envio de emails. Certifique-se de que você possui as credenciais corretas configuradas no arquivo `.env` do backend.

## 🚀 Turbo

O projeto utiliza Turbo para gerenciar o monorepo. Ele permite a execução de scripts em paralelo e otimiza as builds, tornando o processo de desenvolvimento mais eficiente. Os scripts relacionados ao Turbo podem ser encontrados no `package.json` principal.
