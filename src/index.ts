import express, {Express, Response, Request, NextFunction} from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import {register, login, github, githubCallback, forgotPassword} from './controllers/authController';
import { verifyToken } from './middleware/authMiddleware';
import { updateRole } from './controllers/userController';
import {getTeams, createTeam, addUserToTeam} from './controllers/teamController';
import {createTask, updateTask, getTasks, deleteTask} from './controllers/TaskController';
import {getInventory, addInventory, updateInventory, deleteInventory} from './controllers/inventoryController';

dotenv.config();
const port = '3000';

const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/github', github);
app.get('/github', githubCallback);
app.post('/auth/forgot-password', forgotPassword);

app.post('/users/role', verifyToken, updateRole)

app.get('/teams', verifyToken, getTeams);
app.post('/teams', verifyToken, createTeam);
app.post('/teams/:teamId/users', verifyToken, addUserToTeam);

app.post('/tasks', verifyToken, createTask);
app.get('/teams/:teamId/tasks', getTasks);
app.put('/tasks/:taskId', updateTask);
app.delete('/tasks/:taskId', verifyToken, deleteTask);

app.get('/inventory', getInventory);
app.post('/inventory', verifyToken, addInventory);
app.put('/inventory/:itemId', updateInventory);
app.delete('/inventory/:itemId', verifyToken, deleteInventory);


app.listen(port, () => {
    console.log('server running on '+port+'...');
})