import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient'; 
import axios from 'axios';
import sendTestEmail from '../utils/email-verification';

enum Role {
    ADMIN = 'ADMIN',
    CHEF = 'CHEF',
    WAITER = 'WAITER',
    USER = 'USER'
}


async function createNewUser(email: string, password: string, name: string, role: Role){
    try {
        const newUser = await prisma.user.create({
        data: {
            email,
            password,
            name,
            role
        },
        });

        console.log('Created user:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function register(req: Request, res: Response){
    try {
        const { email, username, password } = req.body;
        console.log(username+" "+password);
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            console.log('User exists');
            res.json({message: 'User already exists'});
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await createNewUser(email, hashedPassword, username, Role.USER);
            res.status(201).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
}

export async function login(req: Request, res: Response){
    try {
    const { email, password } = req.body;
    // const user = await User.findOne({ username });
    const user = await prisma.user.findUnique({
        where: { email: email },
    });
    if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign(user, 'my-secret-key', {
    expiresIn: '3h',
    });
    res.status(200).json({ token });
    } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    }
}

const clientId = process.env.CLIENT_ID;
const clientSecretKey = process.env.CLIENT_SECRET_KEY;

export function github(req: Request, res: Response){
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
}

// let access_token: any = '';

export function githubCallback(req: Request, res: Response){
    const requestToken = req.query.code
    try{
        axios({
            method: 'post',
            url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecretKey}&code=${requestToken}`,
            headers: {
                accept: 'application/json'
            }
        }).then((response) => {
            const access_token = response.data.access_token
            // res.redirect('/');
            axios({
                method: 'get',
                url: `https://api.github.com/user`,
                headers: {
                Authorization: 'token ' + access_token
                }
            }).then((response) => {
                console.log(response.data);
                res.json(response.data);
            })
        })
    }
    catch(error){
        res.json({message: 'Github OAuth error'});
        throw error;
    }
    
}

export async function forgotPassword (req: Request, res: Response){
    console.log(req.body.email);
    const user = await prisma.user.findUnique({
        where: { email: req.body.email },
    });
    if(!user) res.json({message: 'user not registered'});
    else{
        sendTestEmail(req.body.email, user.password)
        .then((response) => {
            console.log(response);
            res.json({message: 'success'});
        })
        .catch((err) => {
            console.log('-----------error--------------');
            console.log(err);
            res.json({message: 'error'});
        })
    }
}