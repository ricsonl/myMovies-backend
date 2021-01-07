import knex from 'knex';
import path from 'path';

const conn = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
  },
  useNullAsDefault: true,
});

export default conn;