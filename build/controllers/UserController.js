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
exports.UserController = void 0;
const BaseError_1 = require("../errors/BaseError");
const zod_1 = require("zod");
const signup_dto_1 = require("../DTOs/user/signup.dto");
const login_dto_1 = require("../DTOs/user/login.dto");
const getUserById_dto_1 = require("../DTOs/user/getUserById.dto");
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.signup1 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = signup_dto_1.SignUpSchema.parse({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role
                });
                const output = yield this.userBusiness.signup1(input);
                res.status(201).send(output);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    console.log(error);
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send('Error Inesperado');
                    console.log(error);
                }
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = login_dto_1.LoginSchema.parse({
                    email: req.body.email,
                    password: req.body.password,
                });
                const output = yield this.userBusiness.login(input);
                res.status(200).send(output);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    console.log(error);
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send('Error Inesperado');
                }
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = getUserById_dto_1.GetUserByIdSchema.parse({
                    token: req.headers.authorization
                });
                const output = yield this.userBusiness.getUserById(input);
                res.status(200).json(output);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    console.log(error);
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    console.log(error);
                    res.status(500).json('Error Inesperado');
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map