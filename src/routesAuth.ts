import express from 'express';
import { auth, authAndContinue } from './auth';

import ProfilesController from './controllers/ProfilesController';
import WatchListController from './controllers/WatchListController';

const routes = express.Router();
const profilesController = new ProfilesController();
const watchListController = new WatchListController();

routes.get('/', auth);

routes.get('/profiles', authAndContinue, profilesController.index);
routes.post('/profiles', authAndContinue, profilesController.create);
routes.delete('/profiles/:targetId', authAndContinue, profilesController.delete);

routes.get('/watchlist', authAndContinue, watchListController.index);
routes.post('/watchlist/:tmdbId', authAndContinue, watchListController.create);
routes.delete('/watchlist/:targetId', authAndContinue, watchListController.delete);

export default routes;