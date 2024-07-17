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
exports.updateRole = updateRole;
;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["CHEF"] = "CHEF";
    Role["WAITER"] = "WAITER";
    Role["USER"] = "USER";
})(Role || (Role = {}));
function updateRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.user.role == 'ADMIN') {
            const { email, role } = req.body;
            console.log(email + ' ' + role);
            const user = yield prismaClient_1.default.user.findUnique({
                where: { email: email },
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const updatedUser = yield prismaClient_1.default.user.update({
                where: { email: email },
                data: { role: role },
            });
            console.log(updatedUser);
            res.send({ message: 'updated role' });
        }
        else
            res.send({ message: 'not an admin' });
    });
}
;
