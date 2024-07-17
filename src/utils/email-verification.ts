import nodemailer, { SentMessageInfo } from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID_EMAIL!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN!;
const MY_EMAIL = process.env.MY_EMAIL!;

// console.log('CLIENT_ID:', CLIENT_ID);
// console.log('CLIENT_SECRET:', CLIENT_SECRET);
// console.log('REDIRECT_URI:', REDIRECT_URI);
// console.log('REFRESH_TOKEN:', REFRESH_TOKEN);
// console.log('MY_EMAIL:', MY_EMAIL);
// console.log('---=========================================----');

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendTestEmail = async (to: string, password: string): Promise<SentMessageInfo> => {
    try {
        console.log('password: ' + password);
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: MY_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token!,
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

        return await transport.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

export default sendTestEmail;
