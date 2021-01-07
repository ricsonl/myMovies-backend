import path from 'path';
require('ts-node/register');

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'db', 'db.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'db', 'migrations'),
  },
  useNullAsDefault: true,
};