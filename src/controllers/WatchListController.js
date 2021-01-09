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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
class WatchListController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { logged_prof } = req.headers;
            try {
                const profiles = yield connection_1.default('profiles')
                    .where('profiles.id', logged_prof);
                if (profiles.length == 0)
                    return res.json({ message: 'Perfil inexistente' });
                const profileWatchlist = yield connection_1.default('profiles')
                    .join('profile_watchlistItem', 'profiles.id', '=', 'profile_watchlistItem.profile_id')
                    .where('profiles.id', logged_prof)
                    .join('watchlistItems', 'profile_watchlistItem.watchlistItem_id', '=', 'watchlistItems.id')
                    .select('watchlistItems.id', 'TMDB_id', 'watched');
                return res.status(200).json(profileWatchlist);
            }
            catch (err) {
                // return res.json({ message: err });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { logged_prof } = req.headers;
            try {
                const profiles = yield connection_1.default('profiles')
                    .where('profiles.id', logged_prof);
                if (profiles.length == 0)
                    return res.json({ message: 'Perfil inexistente' });
                const TMDB_id = req.params.tmdbId;
                const countSameMovies = yield connection_1.default('profiles')
                    .join('profile_watchlistItem', 'profiles.id', '=', 'profile_watchlistItem.profile_id')
                    .where('profiles.id', logged_prof)
                    .join('watchlistItems', 'profile_watchlistItem.watchlistItem_id', '=', 'watchlistItems.id')
                    .where('TMDB_id', TMDB_id)
                    .count('* as countSame');
                const { countSame } = countSameMovies[0];
                if (countSame > 0)
                    return res.json({ message: 'Este filme já está na sua watchlist!' });
                const trx = yield connection_1.default.transaction();
                const newWatchlistItem = {
                    TMDB_id,
                    watched: false,
                };
                const insertedWatchlistItemIds = yield trx('watchlistItems').insert(newWatchlistItem, ['id']);
                const newWatchlistItemId = insertedWatchlistItemIds[0].id;
                yield trx('profile_watchlistItem').insert({
                    profile_id: logged_prof,
                    watchlistItem_id: newWatchlistItemId,
                });
                trx.commit();
                return res.status(201).json(Object.assign({ id: newWatchlistItemId }, newWatchlistItem));
            }
            catch (err) {
                // return res.json({ message: err });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { logged_prof } = req.headers;
            try {
                const profiles = yield connection_1.default('profiles')
                    .where('profiles.id', logged_prof);
                if (profiles.length == 0)
                    return res.json({ message: 'Perfil inexistente' });
                const { targetId } = req.params;
                const owner = yield connection_1.default('profile_watchlistItem')
                    .where('watchlistItem_id', targetId)
                    .where('profile_id', logged_prof);
                if (owner.length == 0)
                    return res.json({ message: 'Você não tem permissão para deletar este item' });
                const trx = yield connection_1.default.transaction();
                yield trx('profile_watchlistItem')
                    .where('watchlistItem_id', targetId)
                    .delete();
                yield trx('watchlistItems')
                    .where('id', targetId)
                    .delete();
                trx.commit();
                return res.status(204).json({ deleted: targetId });
            }
            catch (err) {
                // return res.json({ message: err });
            }
        });
    }
}
exports.default = WatchListController;
