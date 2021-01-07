"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
require('ts-node/register');
module.exports = {
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    },
    migrations: {
        directory: path_1.default.resolve(__dirname, 'src', 'db', 'migrations'),
    },
    useNullAsDefault: true,
};
