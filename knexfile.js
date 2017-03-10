// Update with your config settings.

module.exports = {

  development: {
    // client: 'sqlite3',
    // connection: {
    //   filename: './dev.sqlite3'
    // }
    // client: 'mysql',
    // connection: {
    //   host: '10.0.2.2',
    //   user: 'root',
    //   password: '',
    //   database: 'test_densss',
    //   charset: 'utf8'
    // }
    client: 'sqlite3',
    connection: {
      filename: './test_dev.db', // WARNING buggy switch to ./../cprac_dev.db for seeding
      charset: 'utf8'
    },
    useNullAsDefault: true, //sqlite only
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
