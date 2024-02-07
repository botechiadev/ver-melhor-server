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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const User_1 = require("../models/User");
const NotFoundError_1 = require("../errors/NotFoundError");
const BadRequestError_1 = require("../errors/BadRequestError");
class UserBusiness {
    constructor(userDatabase, idGenerator, tokenManager, hashManager) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.hashManager = hashManager;
        this.signup1 = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role } = input;
            const id = this.idGenerator.generate();
            const avatar = "https://i.postimg.cc/RFwFy79H/logo-Avatar.webp";
            const hashedPassword = yield this.hashManager.hash(password);
            const user = new User_1.User(id, name, email, hashedPassword, role, avatar, new Date().toISOString());
            const userDB = yield user.toIDBModel();
            yield this.userDatabase.insertUser(userDB);
            const payload = {
                id: user.getId(),
                name: user.getName(),
                role: user.getRole(),
                avatar: user.getAvatar()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token,
            };
            return output;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const id = this.idGenerator.generate();
            const userDB = yield this.userDatabase.findUserByEmail(email);
            const firstUser = userDB[0];
            if (!firstUser) {
                throw new NotFoundError_1.NotFoundError('Email nao cadastrado');
            }
            const user = new User_1.User(firstUser.id, firstUser.name, firstUser.email, firstUser.password, firstUser.role, firstUser.avatar, firstUser.created_at);
            const hashedPassword = user.getPassword();
            const isPasswordCorrect = yield this.hashManager.
                compare(password, hashedPassword);
            if (!isPasswordCorrect) {
                throw new BadRequestError_1.BadRequestError('Usuario nao autorizado');
            }
            const payload = {
                id: user.getId(),
                name: user.getName(),
                role: user.getRole(),
                avatar: user.getAvatar()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token
            };
            return output;
        });
        this.getUserById = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            try {
                const payload = this.tokenManager.getPayload(token);
                if (!payload) {
                    throw new Error("Payload não encontrado no token.");
                }
                const id = payload.id;
                const firstUser = yield this.userDatabase.findUserById(id);
                const user = {
                    id: firstUser.id,
                    name: firstUser.name,
                    email: firstUser.email,
                    role: firstUser.role,
                    created_at: firstUser.created_at,
                    avatar: firstUser.avatar,
                };
                return user;
            }
            catch (error) {
                throw new Error(`Erro ao obter usuário por ID`);
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map