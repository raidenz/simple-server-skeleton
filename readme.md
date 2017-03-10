## Simple server skeleton
Aka Simple stupid server (whatever you say) (BETA)

base on
  - https://github.com/qawemlilo/node-mysql
  - https://blog.ragingflame.co.za/2014/12/16/building-a-simple-api-with-express-and-bookshelfjs

## How to use it

not use anymore but you can try it

``
node migrate # im not use it anymore
``

##install knex
```npm install -g knex
knex init
edit knexfile.js
knex migrate:make setup
```

###change environment
```knex migrate:latest --env production```

###run
```knex migrate:latest```

###rollback change
```knex migrate:rollback```

###seed database
```sh
$knex seed:make seedName #make migration
$knex seed:run # run migration
```

```sh
# Old Ways
# testing only, dont use it
cd ./seed
node user.js # user password default is "secret"
node post.js
node categories.js
node tags.js
```

###run system
```sh
npm install
npm data:reload # to reload database, now use sqlite3 for testing
npm run babel # run the app

npm run build # to transpile ES6
npm run serveEs6 # to run transpiled version

```

in vagrant run
```nodemon app.js -L```

###vagrant clue
install it from [https://www.vagrantup.com/](https://www.vagrantup.com/)
```
vagrant init hashicorp/precise64
vagrant up
vagrant ssh
```

###Route

get JWT
post to: ```localhost:port/auth/token```
param: ```email,password```

get user
post to: ```localhost:port/auth/user```
param header: ``` Authorization: JWT jwtpass ```

### Curl
```sh
$ curl -d "email=steffen70@hotmail.com&password=secret" http://yourip:4738
```
