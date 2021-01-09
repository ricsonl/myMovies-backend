import express from 'express';
import auth from './auth';

import ProfilesController from './controllers/ProfilesController';
import WatchListController from './controllers/WatchListController';

const routes = express.Router();
const profilesController = new ProfilesController();
const watchListController = new WatchListController();

routes.get('/profiles', auth, profilesController.index);
routes.post('/profiles', auth, profilesController.create);
routes.delete('/profiles/:targetId', auth, profilesController.delete);

routes.get('/watchlist', auth, watchListController.index);
routes.post('/watchlist/:tmdbId', auth, watchListController.create);
routes.delete('/watchlist/:targetId', auth, watchListController.delete);

export default routes;