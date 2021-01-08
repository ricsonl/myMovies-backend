import express from 'express';

import LoginController from './controllers/LoginController';
import AccountsController from './controllers/AccountsController';

const routes = express.Router();
const loginController = new LoginController();
const accountsController = new AccountsController();

routes.post('/login', loginController.create);
routes.post('/accounts', accountsController.create);

export default routes;