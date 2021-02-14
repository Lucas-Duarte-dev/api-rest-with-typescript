# Criando uma Api Rest com TypeScript e TypeORM

##Passos para rodar esse projeto:

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


<h2 style="color: #75FDA3">Dependências usadas</h2>
<ul>
    <li>TypeScript</li>
    <li>Express</li>
    <li>BcryptJS</li>
    <li>JsonWebToken</li>
    <li>TypeORM</li>
    <li>Postgres</li>
</ul>

<h3 style="color: #75FDA3">Conforme vou estudando e melhorando o código irei postando as alterações</h3>