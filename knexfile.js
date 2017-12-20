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
    client: 'pg',
    connection: {
      host: 'ec2-54-83-60-13.compute-1.amazonaws.com',
      database: 'd8qkp65pctkim8',
      user:     'mmdjombhttgvrw',
      password: '9ae3a5ddc5805f2373a21197d02cbfcda474e92a4ff85ea3e484ff33dfc1069d'
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
