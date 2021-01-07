import Knex from 'knex';

// cria a tabela de items da watchlist

export async function up(knex: Knex){
  return knex.schema.createTable('watchlistItems', table => {

    table.increments('id').primary();
    table.integer('TMDB_id').notNullable();
    table.boolean('watched').notNullable();

  })
}

export async function down(knex: Knex){
  return knex.schema.dropTable('watchlistItems');
}