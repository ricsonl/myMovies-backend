import knex from 'knex';
import path from 'path';

const conn = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL, 
    ssl: { rejectUnauthorized: false }
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
  },
  useNullAsDefault: true,
});

export default conn;