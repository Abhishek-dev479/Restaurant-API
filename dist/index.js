"use strict";
// import express, {Express, Response, Request, NextFunction} from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv'
// import crypto from 'crypto';
// import cookieParser from 'cookie-parser';
// import axios from 'axios';
// import path from 'path';
// import sendTestEmail from './utils/email-verification';
// import { send } from 'process';
// import { PrismaClient } from '@prisma/client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const prisma = new PrismaClient();
// interface CustomRequest extends Request {
//     user?: any;
// }
// enum Role {
//     ADMIN = 'ADMIN',
//     CHEF = 'CHEF',
//     WAITER = 'WAITER',
//     USER = 'USER'
// }
// async function createNewUser(email: string, password: string, name: string, role: Role){
//     try {
//         const newUser = await prisma.user.create({
//         data: {
//             email,
//             password,
//             name,
//             role
//         },
//         });
//         console.log('Created user:', newUser);
//         // console.log(newUser);
//         return newUser;
//     } catch (error) {
//         console.error('Error creating user:', error);
//         throw error;
//     }
// }
// async function createAdmin(){
//     const hash = await bcrypt.hash('adminpassword', 10)
//     createNewUser('admin@gmail.com', hash, 'admin', Role.ADMIN)
// }
// createAdmin();
// async function deleteUserByEmail(email: string) {
//     try {
//         const deletedUser = await prisma.user.delete({
//             where: { email: email },
//         });
//         console.log('Deleted user:', deletedUser);
//         return deletedUser;
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         throw error;
//     }
// }
// deleteUserByEmail('admin@gmail.com');
// async function getAllUsers() {
//     try {
//         const users = await prisma.user.findMany(); // Retrieves all users
//         console.log(users); // Return the array of users
//     } catch (error) {
//         console.error('Error retrieving users:', error);
//         throw error; // Throw the error to handle it further up the call stack
//     }
// }
// async function getAllTeams() {
//     try {
//         const teams = await prisma.team.findMany({include: { members: true, tasks: true }}); // Retrieves all users
//         console.log(teams); // Return the array of users
//     } catch (error) {
//         console.error('Error retrieving teams:', error);
//         throw error; // Throw the error to handle it further up the call stack
//     }
// }
// getAllTeams();
// getAllUsers();
// function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
//     const token = req.headers['authorization']?.split(' ')[1];
//     // console.log(token);
//     if (!token) {
//         return res.status(403).json({ message: 'No token provided' });
//     }
//     jwt.verify(token, 'my-secret-key', (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
//         console.log('decoded: ' + decoded);
//         // @ts-ignore
//         req.user = decoded as { [key: string]: any };
//         next();
//     });
// }
// dotenv.config();
// const port = '3000';
// const app: Express = express();
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.post('/auth/register', async (req, res) => {
//     try {
//     const { email, username, password } = req.body;
//     console.log(username+" "+password);
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await createNewUser(email, hashedPassword, username, Role.USER);
//     // const user = new User({ username, password: hashedPassword });
//     // await user.save();
//     res.status(201).json(user);
//     } catch (error) {
//     res.status(500).json({ error: 'Registration failed' });
//     }
// })
// app.post('/auth/login', async (req, res) => {
//     try {
//     const { email, password } = req.body;
//     // const user = await User.findOne({ username });
//     const user = await prisma.user.findUnique({
//         where: { email: email },
//     });
//     if (!user) {
//     return res.status(401).json({ error: 'Authentication failed' });
//     }
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//     return res.status(401).json({ error: 'Authentication failed' });
//     }
//     const token = jwt.sign(user, 'my-secret-key', {
//     expiresIn: '1h',
//     });
//     res.status(200).json({ token });
//     } catch (error) {
//     res.status(500).json({ error: 'Login failed' });
//     }
// });
// app.get('/', (req: Request, res: Response) => {
//     // res.send('Hello from express using typsecript');
//     res.send('Home');
// })
// const clientId = process.env.CLIENT_ID;
// const clientSecretKey = process.env.CLIENT_SECRET_KEY;
// app.get('/auth/github', (req: Request, res: Response) => {
//     res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
// })
// let access_token: any = '';
// app.get('/github', (req, res) => {
//     const requestToken = req.query.code
//   axios({
//     method: 'post',
//     url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecretKey}&code=${requestToken}`,
//     headers: {
//          accept: 'application/json'
//     }
//   }).then((response) => {
//     access_token = response.data.access_token
//     // res.redirect('/');
//     axios({
//         method: 'get',
//         url: `https://api.github.com/user`,
//         headers: {
//           Authorization: 'token ' + access_token
//         }
//       }).then((response) => {
//         console.log(response.data);
//         res.json(response.data);
//     })
//   })
// })
// app.post('/forgot-password', async (req, res) => {
//     console.log(req.body.email);
//     const user = await prisma.user.findUnique({
//         where: { email: req.body.email },
//     });
//     if(!user) res.json({message: 'user not registered'});
//     else{
//         sendTestEmail(req.body.email, user.password)
//         .then((response) => {
//             console.log(response);
//             res.json({message: 'success'});
//         })
//         .catch((err) => {
//             console.log('-----------error--------------');
//             console.log(err);
//             res.json({message: 'error'});
//         })
//     }
// })
// app.post('/users/role', verifyToken, async (req: CustomRequest, res: Response) => {
//     if(req.user.role == 'ADMIN'){
//         const {email, role} = req.body;
//         console.log(email+' '+role);
//         const user = await prisma.user.findUnique({
//             where: { email: email },
//         });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const updatedUser = await prisma.user.update({
//             where: { email: email },
//             data: { role: role },
//         });
//         console.log(updatedUser);
//         res.send({message: 'added role'})
//     }
//     else res.send({message: 'not an admin'});
// });
// app.get('/teams', verifyToken, async (req: CustomRequest, res: Response) => {
//     const name = req.body.name;
//     if(req.user.role == 'ADMIN'){
//         try {
//             const teams = await prisma.team.findMany({include: {
//                 members: true,
//                 tasks: true,
//             }}); // Retrieves all users
//             console.log(teams); // Return the array of users
//             res.json(teams);
//         } catch (error) {
//             console.error('Error retrieving teams:', error);
//             throw error; // Throw the error to handle it further up the call stack
//         }
//     }
//     else res.send({message: 'not an admin'});
// });
// app.post('/teams', verifyToken, async (req: CustomRequest, res: Response) => {
//     const name = req.body.name;
//     if(req.user.role == 'ADMIN'){
//         try {
//             const newTeam = await prisma.team.create({
//                 data: {
//                     name,
//                 },
//             });
//             console.log('Created team:', newTeam);
//             res.json(newTeam);
//         } catch (error) {
//             console.error('Error creating team:', error);
//             throw error;
//         }
//     }
//     else res.send({message: 'not an admin'});
// });
// app.post('/teams/:teamId/users', verifyToken, async (req: CustomRequest, res: Response) => {
//     const email = req.body.email;
//     const id = parseInt(req.params.teamId);
//     console.log(email+' '+id);
//     if(req.user.role == 'ADMIN'){
//         try {
//             const user = await prisma.user.findUnique({
//                 where: { email: email },
//             });
//             if (!user) {
//                 res.json({message: 'user not found'})
//                 return;
//             }
//             const team = await prisma.team.findUnique({
//                 where: { id: id},
//                 include: { members: true }, 
//             });
//             if (!team) {
//                 console.log('Team not found');
//                 res.json({message: 'team not found'});
//                 return;
//             }
//             if (team.members.some(member => member.id === user.id)) {
//                 console.log('User is already a member of the team');
//                 res.json({message: 'user is already a member'});
//                 return;
//             }
//             const updatedTeam = await prisma.team.update({
//                 where: { id: id},
//                 data: {
//                     members: {
//                         connect: { id: user.id },
//                     },
//                 },
//                 include: { members: {select: {
//                     id: true,
//                     email: true,
//                     name: true,
//                     role: true,
//                 }} }, 
//             });
//             console.log('User added to team successfully');
//             res.json(updatedTeam);
//         } catch (error) {
//             console.error('Error adding user to team:', error);
//         }
//     }
//     else res.send({message: 'not an admin'});
// });
// app.get('/inventory', async (req: CustomRequest, res: Response) => {
//     // const {name, quantity} = req.body;
//     try {
//         const items = await prisma.inventory.findMany();
//         console.log('inventory items: '+items)
//         res.json(items);
//     } catch (error) {
//         console.error('Error creating inventory item:', error);
//         res.json({message: 'unable to get inventory items'});
//         throw error;
//     }
// })
// app.post('/inventory', verifyToken, async (req: CustomRequest, res: Response) => {
//     if(req.user.role == 'ADMIN'){
//         let name = req.body.name;
//         let quantity = parseInt(req.body.quantity) 
//         try {
//             const newInventoryItem = await prisma.inventory.create({
//                 data: {
//                     name,
//                     quantity
//                 },
//             });
//             console.log('Created inventory item:', newInventoryItem);
//             res.json({newInventoryItem});
//         } catch (error) {
//             console.error('Error creating inventory item:', error);
//             throw error;
//         }
//     }
//     else res.send({message: 'not an admin'});
// })
// app.put('/inventory/:itemId', async (req: Request, res: Response) => {
//     const inventoryId = parseInt(req.params.itemId);
//     const quantity = parseInt(req.body.quantity);
//     if (isNaN(inventoryId) || typeof quantity !== 'number') {
//         return res.status(400).json({ message: 'Invalid inventory ID or quantity' });
//     }
//     try {
//         const inventoryItem = await prisma.inventory.findUnique({
//             where: { id: inventoryId },
//         });
//         if (!inventoryItem) {
//             return res.status(404).json({ message: 'Inventory item not found' });
//         }
//         const updatedInventoryItem = await prisma.inventory.update({
//             where: { id: inventoryId },
//             data: { quantity },
//         });
//         res.json(updatedInventoryItem);
//     } catch (error) {
//         console.error('Error updating inventory:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
// app.delete('/inventory/:itemId', verifyToken, async (req: CustomRequest, res: Response) => {
//     if(req.user.role != 'ADMIN') res.json({message: 'Only admin can delete'});
//     else{
//         const inventoryId = parseInt(req.params.itemId);
//         if (isNaN(inventoryId)) {
//             return res.status(400).json({ message: 'Invalid inventory ID' });
//         }
//         try {
//             const inventoryItem = await prisma.inventory.findUnique({
//                 where: { id: inventoryId },
//             });
//             if (!inventoryItem) {
//                 return res.status(404).json({ message: 'Inventory item not found' });
//             }
//             await prisma.inventory.delete({
//                 where: { id: inventoryId },
//             });
//             res.json({ message: 'Inventory item deleted successfully' });
//             } catch (error) {
//                 console.error('Error deleting inventory:', error);
//                 res.json({ message: 'Internal server error' });
//         }
//     }
// });
// async function getAllTasks(){
//     const tasks = await prisma.task.findMany();
//     console.log(tasks);
// }
// // getAllTasks();
// app.post('/tasks', verifyToken, async (req: CustomRequest, res: Response) => {
//     const taskName = req.body.task;
//     const teamId = parseInt(req.body.id);
//     if(req.user.role == 'ADMIN'){
//         try {
//             // Create a new task and link it to a team
//             const newTask = await prisma.task.create({
//               data: {
//                 name: taskName,
//                 team: {
//                   connect: { id: teamId },
//                 },
//               },
//             });
//             console.log('Task created and added to team:', newTask);
//             res.json(newTask);
//         } catch (error) {
//             console.error('Error creating task and adding to team:', error);
//             res.json({message: 'error'});
//         }
//     }
// })
// app.get('/teams/:teamId/tasks', async (req: CustomRequest, res: Response) => {
//     const teamId = parseInt(req.params.teamId); 
//     try {
//         const tasks = await prisma.task.findMany({
//             where: {
//                 teamId: teamId,
//             },
//         });
//         console.log(tasks); 
//         res.json(tasks);
//     } catch (error) {
//         console.error('Error retrieving tasks:', error);
//         res.json({message:'error'});
//         throw error;
//     }
// });
// app.put('/tasks/:taskId', async (req: CustomRequest, res: Response) => {
//     const taskId = parseInt(req.params.taskId); 
//     const { name, status } = req.body; 
//     try {
//         const updatedTask = await prisma.task.update({
//             where: {
//                 id: taskId,
//             },
//             data: {
//                 name: name,
//                 status: status,
//             },
//         });
//         console.log('Updated task:', updatedTask); 
//         res.json(updatedTask);
//     } catch (error) {
//         console.error('Error updating task:', error);
//         res.json({message: 'error'});
//         throw error; 
//     }
// });
// app.delete('/tasks/:taskId', verifyToken, async (req: CustomRequest, res: Response) => {
//     const taskId = parseInt(req.params.taskId); // Extract taskId from request parameters
//     if(req.user.role == 'ADMIN'){
//         try {
//             // Delete the task with the specified taskId
//             const deletedTask = await prisma.task.delete({
//                 where: {
//                     id: taskId,
//                 },
//             });
//             console.log('Deleted task:', deletedTask); // Log the deleted task
//             res.json({message: 'successfully deleted the task'});
//         } catch (error) {
//             console.error('Error deleting task:', error);
//             res.json({message: 'error'});
//             throw error; // Throw the error to handle it further up the call stack
//         }
//     }
//     else res.json({message: 'Only admin can delete'});
// });
// app.listen(port, () => {
//     console.log('server running on '+port+'...');
// })
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authController_1 = require("./controllers/authController");
const authMiddleware_1 = require("./middleware/authMiddleware");
const userController_1 = require("./controllers/userController");
const teamController_1 = require("./controllers/teamController");
const TaskController_1 = require("./controllers/TaskController");
const inventoryController_1 = require("./controllers/inventoryController");
// import { create } from 'domain';
dotenv_1.default.config();
const port = '3000';
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/auth/register', authController_1.register);
app.post('/auth/login', authController_1.login);
app.get('/auth/github', authController_1.github);
app.get('/github', authController_1.githubCallback);
app.post('/auth/forgot-password', authController_1.forgotPassword);
app.post('/users/role', authMiddleware_1.verifyToken, userController_1.updateRole);
app.get('/teams', authMiddleware_1.verifyToken, teamController_1.getTeams);
app.post('/teams', authMiddleware_1.verifyToken, teamController_1.createTeam);
app.post('/teams/:teamId/users', authMiddleware_1.verifyToken, teamController_1.addUserToTeam);
// app.post('/tasks', verifyToken, createTask);
// app.get('/teams/:teamId/tasks', getTasks);
// app.put('/tasks/:taskId', updateTask);
// app.delete('/tasks/:taskId', verifyToken, deleteTask);
app.post('/tasks', authMiddleware_1.verifyToken, TaskController_1.createTask);
app.get('/teams/:teamId/tasks', TaskController_1.getTasks);
app.put('/tasks/:taskId', TaskController_1.updateTask);
app.delete('/tasks/:taskId', authMiddleware_1.verifyToken, TaskController_1.deleteTask);
app.get('/inventory', inventoryController_1.getInventory);
app.post('/inventory', authMiddleware_1.verifyToken, inventoryController_1.addInventory);
app.put('/inventory/:itemId', inventoryController_1.updateInventory);
app.delete('/inventory/:itemId', authMiddleware_1.verifyToken, inventoryController_1.deleteInventory);
app.listen(port, () => {
    console.log('server running on ' + port + '...');
});
