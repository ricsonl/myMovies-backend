import path from 'path';
require('ts-node/register');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'db', 'db.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'db', 'migrations'),
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL, 
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'db', 'migrations'),
    },
    useNullAsDefault: true,
  }
};