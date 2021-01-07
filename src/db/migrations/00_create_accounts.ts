import Knex from 'knex';

// cria a tabela de contas

export async function up(knex: Knex){
  return knex.schema.createTable('accounts', table => {

    table.increments('id').primary();

    table.string('email').notNullable();
    table.string('password').notNullable();

  })
}

export async function down(knex: Knex){
  return knex.schema.dropTable('accounts');
}