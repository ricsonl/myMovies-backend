"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AccountsController_1 = __importDefault(require("./controllers/AccountsController"));
const LoginController_1 = __importDefault(require("./controllers/LoginController"));
const ProfilesController_1 = __importDefault(require("./controllers/ProfilesController"));
const WatchListController_1 = __importDefault(require("./controllers/WatchListController"));
const routes = express_1.default.Router();
const accountsController = new AccountsController_1.default();
const loginController = new LoginController_1.default();
const profilesController = new ProfilesController_1.default();
const watchListController = new WatchListController_1.default();
routes.post('/accounts', accountsController.create);
routes.post('/login', loginController.create);
routes.get('/profiles', profilesController.index);
routes.get('/profiles/:id', profilesController.show);
routes.post('/profiles', profilesController.create);
routes.delete('/profiles/:targetId', profilesController.delete);
routes.get('/watchlist', watchListController.index);
routes.post('/watchlist/:tmdbId', watchListController.create);
routes.delete('/watchlist/:targetId', watchListController.delete);
exports.default = routes;