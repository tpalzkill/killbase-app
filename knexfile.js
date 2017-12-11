// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'killbase_app',
      user:     '',
      password: '',
      host: '127.0.0.1'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'killbase_app',
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
      database: 'killbase_app',
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
