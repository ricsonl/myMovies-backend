import path from 'path';
require('ts-node/register');

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'db', 'migrations'),
  },
  useNullAsDefault: true,
};