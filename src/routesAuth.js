"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const ProfilesController_1 = __importDefault(require("./controllers/ProfilesController"));
const WatchListController_1 = __importDefault(require("./controllers/WatchListController"));
const routes = express_1.default.Router();
const profilesController = new ProfilesController_1.default();
const watchListController = new WatchListController_1.default();
routes.get('/profiles', auth_1.default, profilesController.index);
routes.post('/profiles', auth_1.default, profilesController.create);
routes.delete('/profiles/:targetId', auth_1.default, profilesController.delete);
routes.get('/watchlist', auth_1.default, watchListController.index);
routes.post('/watchlist/:tmdbId', auth_1.default, watchListController.create);
routes.delete('/watchlist/:targetId', auth_1.default, watchListController.delete);
exports.default = routes;
