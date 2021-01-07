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
class ProfilesController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { logged_acc } = req.headers;
            const accountProfiles = yield connection_1.default('accounts')
                .join('account_profile', 'accounts.id', '=', 'account_profile.account_id')
                .where('accounts.id', logged_acc)
                .join('profiles', 'account_profile.profile_id', '=', 'profiles.id')
                .select('profile_id as id', 'name', 'main', 'birthday');
            return res.json(accountProfiles);
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const profiles = yield connection_1.default('profiles')
                .where('id', id)
                .select('id', 'name', 'main', 'birthday');
            const profile = profiles[0];
            return res.json(profile);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { logged_acc } = req.headers;
            const profiles = yield connection_1.default('accounts')
                .join('account_profile', 'accounts.id', '=', 'account_profile.account_id')
                .where('accounts.id', logged_acc)
                .join('profiles', 'account_profile.profile_id', '=', 'profiles.id')
                .select('name');
            if (profiles.length >= 4)
                return res.json({ message: 'Limite máximo de perfis atingido' });
            if (profiles.length == 0)
                return res.json({ message: 'Conta inexistente' });
            const profileNames = profiles.map(profile => {
                return profile.name;
            });
            const { name } = req.body;
            if (name === '')
                return res.json({ message: 'Preencha todos os campos!' });
            if (profileNames.includes(name))
                return res.json({ message: 'Já existe um perfil com este nome na conta' });
            const newProfile = {
                name,
                main: false,
            };
            const trx = yield connection_1.default.transaction();
            const insertedProfileIds = yield trx('profiles').insert(newProfile);
            const newProfileId = insertedProfileIds[0];
            yield trx('account_profile').insert({
                account_id: logged_acc,
                profile_id: newProfileId,
            });
            trx.commit();
            return res.status(201).json(Object.assign({ id: newProfileId }, newProfile));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { logged_acc } = req.headers;
            const accounts = yield connection_1.default('accounts')
                .where('accounts.id', logged_acc);
            if (accounts.length == 0)
                return res.json({ message: 'Conta inexistente' });
            const { targetId } = req.params;
            const owner = yield connection_1.default('account_profile')
                .where('profile_id', targetId)
                .where('account_id', logged_acc);
            if (owner.length == 0)
                return res.json({ message: 'Você não tem permissão para deletar este perfil' });
            const profiles = yield connection_1.default('profiles')
                .where('profiles.id', targetId)
                .select('main');
            if (profiles[0].main)
                return res.json({ message: 'Você não pode deletar o perfil principal da sua conta' });
            const trx = yield connection_1.default.transaction();
            yield trx('account_profile')
                .where('profile_id', targetId)
                .delete();
            yield trx('profiles')
                .where('id', targetId)
                .delete();
            trx.commit();
            return res.status(204).json({ deleted: targetId });
        });
    }
}
exports.default = ProfilesController;
