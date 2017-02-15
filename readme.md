## Simple server skeleton
Aka Simple stupid server (whatever you say) (BETA)

base on
  - https://github.com/qawemlilo/node-mysql
  - https://blog.ragingflame.co.za/2014/12/16/building-a-simple-api-with-express-and-bookshelfjs

## How to use it

not use anymore but you can try it

``node migrate``

##install knex
```npm install -g knex```
```knex init```
```edit knexfile.js```
```knex migrate:make setup```

###change environment
```knex migrate:latest --env production```

###run
```knex migrate:latest```

###rollback change
```knex migrate:rollback```

###seed database
```cd ./seed```

```node user.js``` user password default is "secret"
```node post.js```
```node categories.js```
```node tags.js```

###run system
```sh
npm install
npm start
```

in vagrant run
```nodemon app.js -L

###vagrant clue
install it from [https://www.vagrantup.com/](https://www.vagrantup.com/)
```vagrant init hashicorp/precise64```
```vagrant up```
```vagrant ssh```

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
