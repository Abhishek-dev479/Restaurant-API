"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    // console.log(token);
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, 'my-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log('decoded: ' + decoded);
        // @ts-ignore
        req.user = decoded;
        next();
    });
}
