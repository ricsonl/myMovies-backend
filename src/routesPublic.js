"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LoginController_1 = __importDefault(require("./controllers/LoginController"));
const AccountsController_1 = __importDefault(require("./controllers/AccountsController"));
const routes = express_1.default.Router();
const loginController = new LoginController_1.default();
const accountsController = new AccountsController_1.default();
routes.post('/login', loginController.create);
routes.post('/accounts', accountsController.create);
exports.default = routes;
