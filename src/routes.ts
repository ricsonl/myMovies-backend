import express from 'express';

import AccountsController from './controllers/AccountsController';
import LoginController from './controllers/LoginController';
import ProfilesController from './controllers/ProfilesController';
import WatchListController from './controllers/WatchListController';

const routes = express.Router();
const accountsController = new AccountsController();
const loginController = new LoginController();
const profilesController = new ProfilesController();
const watchListController = new WatchListController();

routes.post('/accounts', accountsController.create);

routes.post('/login', loginController.create);

routes.get('/profiles', profilesController.index);
routes.get('/profiles/:id', profilesController.show);
routes.post('/profiles', profilesController.create);
routes.delete('/profiles/:targetId', profilesController.delete);

routes.get('/watchlist', watchListController.index);
routes.post('/watchlist/:tmdbId', watchListController.create);
routes.delete('/watchlist/:targetId', watchListController.delete);

export default routes;