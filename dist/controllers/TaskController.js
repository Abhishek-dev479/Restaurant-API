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
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskName = req.body.task;
    const teamId = parseInt(req.body.id);
    if (req.user.role == 'ADMIN') {
        try {
            // Create a new task and link it to a team
            const newTask = yield prismaClient_1.default.task.create({
                data: {
                    name: taskName,
                    team: {
                        connect: { id: teamId },
                    },
                },
            });
            console.log('Task created and added to team:', newTask);
            res.json(newTask);
        }
        catch (error) {
            console.error('Error creating task and adding to team:', error);
            res.json({ message: 'error' });
        }
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teamId = parseInt(req.params.teamId);
    try {
        const tasks = yield prismaClient_1.default.task.findMany({
            where: {
                teamId: teamId,
            },
        });
        console.log(tasks);
        res.json(tasks);
    }
    catch (error) {
        console.error('Error retrieving tasks:', error);
        res.json({ message: 'error' });
        throw error;
    }
});
exports.getTasks = getTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = parseInt(req.params.taskId);
    const { name, status } = req.body;
    try {
        const updatedTask = yield prismaClient_1.default.task.update({
            where: {
                id: taskId,
            },
            data: {
                name: name,
                status: status,
            },
        });
        // console.log('Updated task:', updatedTask); 
        res.json(updatedTask);
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.json({ message: 'error' });
        throw error;
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = parseInt(req.params.taskId); // Extract taskId from request parameters
    if (req.user.role == 'ADMIN') {
        try {
            // Delete the task with the specified taskId
            const deletedTask = yield prismaClient_1.default.task.delete({
                where: {
                    id: taskId,
                },
            });
            console.log('Deleted task:', deletedTask); // Log the deleted task
            res.json({ message: 'successfully deleted the task' });
        }
        catch (error) {
            console.error('Error deleting task:', error);
            res.json({ message: 'error' });
            throw error; // Throw the error to handle it further up the call stack
        }
    }
    else
        res.json({ message: 'Only admin can delete' });
});
exports.deleteTask = deleteTask;
