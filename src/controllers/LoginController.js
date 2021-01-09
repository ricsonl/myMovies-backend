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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (email && password) {
                try {
                    const accounts = yield connection_1.default('accounts')
                        .where('email', email)
                        .select('*');
                    if (accounts.length == 0)
                        return res.json({ message: 'Não existe uma conta vinculada a este email' });
                    const acc = accounts[0];
                    yield bcrypt_1.default.compare(password, accounts[0].password).then((result) => {
                        if (result) {
                            const tokenData = { id: acc.id };
                            const secret = process.env.JWT_SECRET || 'ssecreEt';
                            const token = jsonwebtoken_1.default.sign(tokenData, secret, {
                                expiresIn: '50m'
                            });
                            return res.json({
                                id: acc.id,
                                email,
                                token
                            });
                        }
                        return res.json({ message: 'Senha incorreta' });
                    });
                }
                catch (err) {
                    // return res.json({ message: err });
                }
            }
            else
                return res.json({ message: 'Preencha todos os campos!' });
        });
    }
}
exports.default = LoginController;
