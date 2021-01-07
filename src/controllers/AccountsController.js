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
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = __importDefault(require("../db/connection"));
class AccountsController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, mainProfileName, birthday, } = req.body;
            console.log(req.body);
            if (email && password && mainProfileName && birthday) {
                try {
                    const sameEmailAccounts = yield connection_1.default('accounts')
                        .where('email', email)
                        .count('* as countSame');
                    const { countSame } = sameEmailAccounts[0];
                    if (countSame > 0)
                        return res.json({ message: 'Já existe uma conta com este email!' });
                    const trx = yield connection_1.default.transaction();
                    const hashed = yield bcrypt_1.default.hash(password, 10);
                    const account = {
                        email,
                        password: hashed,
                    };
                    const insertedAccountIds = yield trx('accounts').insert(account, ['id']);
                    const mainProfile = {
                        name: mainProfileName,
                        main: true,
                        birthday,
                    };
                    const insertedProfileIds = yield trx('profiles').insert(mainProfile, ['id']);
                    const accountId = insertedAccountIds[0].id;
                    const mainProfileId = insertedProfileIds[0].id;
                    yield trx('account_profile').insert({
                        account_id: accountId,
                        profile_id: mainProfileId,
                    });
                    trx.commit();
                    return res.json({
                        id: accountId,
                        email
                    });
                }
                catch (err) {
                    // return res.json({ message: err });
                }
            }
            return res.json({ message: 'Preencha todos os campos!' });
        });
    }
}
exports.default = AccountsController;
