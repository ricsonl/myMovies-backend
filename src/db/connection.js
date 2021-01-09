"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile = require('../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const conn = knex_1.default(knexfile[environment]);
exports.default = conn;
