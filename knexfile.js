module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/ls-books',
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};