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
exports.addUserToTeam = exports.createTeam = exports.getTeams = void 0;
;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    if (req.user.role == 'ADMIN') {
        try {
            const teams = yield prismaClient_1.default.team.findMany({ include: {
                    members: true,
                    tasks: true,
                } }); // Retrieves all users
            console.log(teams); // Return the array of users
            res.json(teams);
        }
        catch (error) {
            console.error('Error retrieving teams:', error);
            throw error; // Throw the error to handle it further up the call stack
        }
    }
    else
        res.send({ message: 'not an admin' });
});
exports.getTeams = getTeams;
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    if (req.user.role == 'ADMIN') {
        try {
            const newTeam = yield prismaClient_1.default.team.create({
                data: {
                    name,
                },
            });
            console.log('Created team:', newTeam);
            res.json(newTeam);
        }
        catch (error) {
            console.error('Error creating team:', error);
            throw error;
        }
    }
    else
        res.send({ message: 'not an admin' });
});
exports.createTeam = createTeam;
const addUserToTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const id = parseInt(req.params.teamId);
    console.log(email + ' ' + id);
    if (req.user.role == 'ADMIN') {
        try {
            const user = yield prismaClient_1.default.user.findUnique({
                where: { email: email },
            });
            if (!user) {
                res.json({ message: 'user not found' });
                return;
            }
            const team = yield prismaClient_1.default.team.findUnique({
                where: { id: id },
                include: { members: true },
            });
            if (!team) {
                console.log('Team not found');
                res.json({ message: 'team not found' });
                return;
            }
            if (team.members.some(member => member.id === user.id)) {
                console.log('User is already a member of the team');
                res.json({ message: 'user is already a member' });
                return;
            }
            const updatedTeam = yield prismaClient_1.default.team.update({
                where: { id: id },
                data: {
                    members: {
                        connect: { id: user.id },
                    },
                },
                include: { members: { select: {
                            id: true,
                            email: true,
                            name: true,
                            role: true,
                        } } },
            });
            console.log('User added to team successfully');
            res.json(updatedTeam);
        }
        catch (error) {
            console.error('Error adding user to team:', error);
        }
    }
    else
        res.send({ message: 'not an admin' });
});
exports.addUserToTeam = addUserToTeam;
