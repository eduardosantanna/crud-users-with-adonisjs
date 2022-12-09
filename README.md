Este projeto é uma API construída em NodeJs e TypeScript, desenvolvi ela visando o aprendizado do framework AdonisJs.

# Sobre o projeto

- Banco de dados SQL
- CRUD de usuários
- Autenticação e autorização de usuários registrados
- Filtro de consultas para buscas no banco de dados

# Como rodar

Clone o repositório:
```
git clone https://github.com/eduardosantanna/crud-users-with-adonisjs.git
```

Instale as dependências
```
npm install
```

Nessa etapa será necessário que você possua instalado o Docker em sua máquina para que seja possível rodar o banco de dados. Caso já possua o Docker instalado, basta prosseguir. Se você desejar utilizar o banco de dados Postgres rodando localmente em sua maquina, basta editar as variáveis de ambiente no arquivo .env

```
docker-compose up -d
```

Rode o projeto
```
npm run first-start
```

## Endpoints

#### /Users
endpoint | Método | Descrição
---|---|---
/users | GET | Busca todos os usuários
/users/:id | GET | Busca usuário por ID
/users | POST | Registra usuário
/users/:id | PUT | Editar usuário
/users/:id | DELETE | Deleta usuário

### /login - /logout
endpoint | Método | Descrição
---|---|---
/login | POST | Busca todos os usuários
/logout | GET | Busca usuário por ID
