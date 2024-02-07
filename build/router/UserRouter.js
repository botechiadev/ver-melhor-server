"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const UserBusiness_1 = require("../business/UserBusiness");
const UserDatabase_1 = require("../database/UserDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
const HashManager_1 = require("../services/HashManager");
exports.userRouter = express_1.default.Router();
const userController = new UserController_1.UserController(new UserBusiness_1.UserBusiness(new UserDatabase_1.UserDatabase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager(), new HashManager_1.HashManager()));
exports.userRouter.post('/signup', userController.signup1);
exports.userRouter.get('/data', userController.getUserById);
exports.userRouter.post('/login', userController.login);
//# sourceMappingURL=UserRouter.js.map