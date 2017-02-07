## Simple server skeleton
Aka Simple stupid server (whatever you say)

## How to use it

```node migrate

npm install
npm start

in vagrant run
```nodemon app.js -L


##install knex
```npm install -g knex
```knex init
```edit knexfile.js
```knex migrate:make setup
###change environment
```knex migrate:latest --env production

###run
```knex migrate:latest

###rollback change
```knex migrate:rollback
