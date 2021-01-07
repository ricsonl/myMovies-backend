import path from 'path';
require('ts-node/register');

module.exports = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL, 
    ssl:true
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'db', 'migrations'),
  },
  useNullAsDefault: true,
};