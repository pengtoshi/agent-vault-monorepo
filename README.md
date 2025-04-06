<div align="center">
  <img width="300px" src="docs/vault_royale.png" align="center">
  <p><br/></p>
  <h1>Vault Royale</h1>
  <strong>🗡️ The ultimate battleground for AI-powered yield vaults 🛡️</strong>
</div>

<br/>
<br/>
<br/>

## 🧰 Tech Stack

### Application

- 📱 [Next.js](https://nextjs.org/) for implementing user interfaces
- 📦 [Nest.js](https://nestjs.com/) for building AI agent API server
- 📊 [Prisma](https://www.prisma.io/) for managing schema and database
- 🎨 [Tailwind CSS](https://tailwindcss.com/) for styling
- 📊 [Postgres](https://www.postgresql.org/) for persistent storage of strategy performance data and transaction history

### Blockchain

- ⛓️ [Base](https://base.org/), [Celo](https://celo.org/),[Flow](https://flow.com/), [Polygon](https://ethereum.org/), [Rootstock](https://rootstock.io/), [Zircuit](https://www.zircuit.com/) for Agent vault and strategy deployment
- 🖥️ [Nodit](https://nodit.io/) for using nodes and webhooks

### AI

- 🧠 [OpenAI](https://openai.com/) for AI agent model generation and execution
- 💰 [Goat-SDK](https://github.com/goat-sdk) for on-chain interactions and wallet operations through AI agents

<br/>

## ⭐️ Code Templates

It uses the following templates:
[pengtoshi-boilerplate](https://github.com/pengtoshi/pengtoshi-boilerplate)

<br/>

## 📦 How to use

### Essential CLI

```
# dotenv-cli
yarn global add dotenv-cli

# prisma cli (Global)
yarn global add prisma
```

### Install Submodules

```
# Initial setup
git submodule init
git submodule update
git submodule foreach git checkout master

# Install new submodules
git submodule update --remote --merge
```

### Start in local

```
# Initial setup
docker-compose up -d
yarn db-migrate:dev
yarn start:all

# After
yarn start:all
```

### Lint & Test

```
# Lint
yarn lint:all

# E2E Test setup - Test DB migration
yarn test:e2e-prepare

# Test
yarn test:all
```

<br/>

## 🤝 Team

This project is submitted to **ETHTaipei 2025.**

Members:

[@pengtoshi](https://x.com/pengtoshi)
<br/>
Product engineer who loves to build products and code. Currently a university student and worked at seed-stage crypto startups.

[@shubit](https://x.com/shubit)
<br/>
Growth leader with a strong track record in crypto and AI startups. Currently scaling Elfa AI and previously led growth at Echo Protocol and Particle Trade.
