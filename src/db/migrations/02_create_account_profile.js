"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// cria a tabela de relacionamento entre uma conta e um perfil
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
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
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable('account_profile');
    });
}
exports.down = down;
