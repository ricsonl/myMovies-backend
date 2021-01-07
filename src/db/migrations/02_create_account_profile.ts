import Knex from 'knex';

// cria a tabela de relacionamento entre uma conta e um perfil

export async function up(knex: Knex){
  return knex.schema.createTable('account_profile', table => {

    table.increments('id').primary();

    table.integer('account_id')
      .notNullable()
      .references('id')
      .inTable('accounts');

    table.integer('profile_id')
      .notNullable()
      .references('id')
      .inTable('profiles');

  })
}

export async function down(knex: Knex){
  return knex.schema.dropTable('account_profile');
}