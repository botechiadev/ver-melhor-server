"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.USER_ROLES = void 0;
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["PADRINHO"] = "PADRINHO";
    USER_ROLES["MEDICO"] = "MEDICO";
    USER_ROLES["OTICA"] = "OTICA";
    USER_ROLES["APADRINHADO"] = "APADRINHADO";
})(USER_ROLES || (exports.USER_ROLES = USER_ROLES = {}));
class User {
    constructor(id, name, email, password, role, avatar, createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.avatar = avatar;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getAvatar() {
        return this.avatar;
    }
    setAvatar(value) {
        this.avatar = value;
    }
    setEmail(value) {
        this.email = value;
    }
    setPassword(value) {
        this.password = value;
    }
    setRole(value) {
        this.role = value;
    }
    toIDBModel() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            avatar: this.avatar,
            created_at: this.createdAt
        };
    }
    toIUserModel() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            avatar: this.avatar,
            createdAt: this.createdAt
        };
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map