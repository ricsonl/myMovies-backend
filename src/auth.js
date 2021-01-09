"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                res.json({
                    authFailed: true,
                    message: 'Token inválida'
                });
            else
                next();
        });
    }
    else {
        res.json({
            authFailed: true,
            message: 'Nenhuma token fornecida'
        });
    }
};
exports.default = auth;
