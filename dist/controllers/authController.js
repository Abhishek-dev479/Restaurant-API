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
exports.register = register;
exports.login = login;
exports.github = github;
exports.githubCallback = githubCallback;
exports.forgotPassword = forgotPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const axios_1 = __importDefault(require("axios"));
const email_verification_1 = __importDefault(require("../utils/email-verification"));
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["CHEF"] = "CHEF";
    Role["WAITER"] = "WAITER";
    Role["USER"] = "USER";
})(Role || (Role = {}));
function createNewUser(email, password, name, role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield prismaClient_1.default.user.create({
                data: {
                    email,
                    password,
                    name,
                    role
                },
            });
            console.log('Created user:', newUser);
            return newUser;
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    });
}
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, username, password } = req.body;
            console.log(username + " " + password);
            const existingUser = yield prismaClient_1.default.user.findUnique({
                where: { email: email },
            });
            if (existingUser) {
                console.log('User exists');
                res.json({ message: 'User already exists' });
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const user = yield createNewUser(email, hashedPassword, username, Role.USER);
                res.status(201).json(user);
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Registration failed' });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // const user = await User.findOne({ username });
            const user = yield prismaClient_1.default.user.findUnique({
                where: { email: email },
            });
            if (!user) {
                return res.status(401).json({ error: 'Authentication failed' });
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Authentication failed' });
            }
            const token = jsonwebtoken_1.default.sign(user, 'my-secret-key', {
                expiresIn: '3h',
            });
            res.status(200).json({ token });
        }
        catch (error) {
            res.status(500).json({ error: 'Login failed' });
        }
    });
}
const clientId = process.env.CLIENT_ID;
const clientSecretKey = process.env.CLIENT_SECRET_KEY;
function github(req, res) {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
}
// let access_token: any = '';
function githubCallback(req, res) {
    const requestToken = req.query.code;
    try {
        (0, axios_1.default)({
            method: 'post',
            url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecretKey}&code=${requestToken}`,
            headers: {
                accept: 'application/json'
            }
        }).then((response) => {
            const access_token = response.data.access_token;
            // res.redirect('/');
            (0, axios_1.default)({
                method: 'get',
                url: `https://api.github.com/user`,
                headers: {
                    Authorization: 'token ' + access_token
                }
            }).then((response) => {
                console.log(response.data);
                res.json(response.data);
            });
        });
    }
    catch (error) {
        res.json({ message: 'Github OAuth error' });
        throw error;
    }
}
function forgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body.email);
        const user = yield prismaClient_1.default.user.findUnique({
            where: { email: req.body.email },
        });
        if (!user)
            res.json({ message: 'user not registered' });
        else {
            (0, email_verification_1.default)(req.body.email, user.password)
                .then((response) => {
                console.log(response);
                res.json({ message: 'success' });
            })
                .catch((err) => {
                console.log('-----------error--------------');
                console.log(err);
                res.json({ message: 'error' });
            });
        }
    });
}
