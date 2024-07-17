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
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CLIENT_ID = process.env.CLIENT_ID_EMAIL;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const MY_EMAIL = process.env.MY_EMAIL;
// console.log('CLIENT_ID:', CLIENT_ID);
// console.log('CLIENT_SECRET:', CLIENT_SECRET);
// console.log('REDIRECT_URI:', REDIRECT_URI);
// console.log('REFRESH_TOKEN:', REFRESH_TOKEN);
// console.log('MY_EMAIL:', MY_EMAIL);
// console.log('---=========================================----');
const oAuth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const sendTestEmail = (to, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('password: ' + password);
        const accessToken = yield oAuth2Client.getAccessToken();
        const transport = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: MY_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
            tls: {
                rejectUnauthorized: true,
            },
        });
        const from = MY_EMAIL;
        let code = 823545; // Example code, you should generate this dynamically
        const subject = 'Email Verification By Incognito';
        const html = `
            <p>Hey ${to},</p>
            <p>Your account password is <b>${password}</b></p>
            <a>Click here to verify</a> 
            <p>Thank you</p>
        `;
        const mailOptions = {
            from,
            to,
            subject,
            html,
        };
        return yield transport.sendMail(mailOptions);
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
});
exports.default = sendTestEmail;
