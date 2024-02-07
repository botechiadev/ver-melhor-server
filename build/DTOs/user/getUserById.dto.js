"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.GetUserByIdSchema = zod_1.default.object({
    token: zod_1.default.string().min(1),
}).transform(data => data);
//# sourceMappingURL=getUserById.dto.js.map