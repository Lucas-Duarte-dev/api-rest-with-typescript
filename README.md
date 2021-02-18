# Criando uma Api Rest com TypeScript e TypeORM

## Passos para rodar esse projeto:

1. Rode o comando `npm i` ou `yarn install` 
2. Crie um arquivo `ormconfig.json` na raiz do seu projeto
com as seguintes informações:
```
{
   "type": "o banco que está usando",
   "host": "localhost",
   "port": 1234 // porta padrão do seu banco,
   "username": "test",
   "password": "test",
   "database": "**nome do banco de dados que vai salvar suas tabelas**",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/model/**/*.ts"
   ],
   "migrations": [
      "src/database/migration/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/database/migration"
   }
}
```
3. Coloque seus dados do banco no arquivo `ormconfig.json`
4. Rode o comando `npm start`


<h2 style="color: green">Dependências usadas</h2>
<ul>
    <li>TypeScript</li>
    <li>Express</li>
    <li>BcryptJS</li>
    <li>JsonWebToken</li>
    <li>TypeORM</li>
    <li>Postgres</li>
</ul>

## O que tem nesse projeto

Neste projeto eu criei uma api rest para um blog simples usando typescript, express e typeorm

<h3>Nesta aplicação contem</h3>

<ul>
   <li>Criação de usuário e alteração de email e podendo deletar o mesmo</li>
   <li>Muddleware de autenticação e geração de um token de autenticação</li>
   <li>Cada usuário poderá criar post contendo titulo e descrição</li>
   <li>Poderá criar, listar, atualizar e deletar os posts</li>
</ul>
