import Knex from 'knex';

// cria a tabela de relacionamento entre um perfil e um item de watchlist

export async function up(knex: Knex){
  return knex.schema.createTable('profile_watchlistItem', table => {

    table.increments('id').primary();

    table.integer('profile_id')
      .notNullable()
      .references('id')
      .inTable('profiles');

    table.integer('watchlistItem_id')
      .notNullable()
      .references('id')
      .inTable('watchlistItems');

  })
}

export async function down(knex: Knex){
  return knex.schema.dropTable('profile_watchlistItem');
}