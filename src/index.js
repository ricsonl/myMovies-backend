"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routesPublic_1 = __importDefault(require("./routesPublic"));
const routesAuth_1 = __importDefault(require("./routesAuth"));
const app = express_1.default();
app.use(cors_1.default({
    origin: 'https://mymovies-frontend.herokuapp.com',
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
app.use(routesPublic_1.default);
app.use('/auth', routesAuth_1.default);
app.listen(process.env.PORT || 3100);
