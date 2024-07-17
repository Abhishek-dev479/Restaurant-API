import { Request, Response } from 'express';;
import prisma from '../utils/prismaClient'; 

export interface CustomRequest extends Request {
    user?: any;
}

export const getTeams = async (req: CustomRequest, res: Response) => {
    const name = req.body.name;
    if(req.user.role == 'ADMIN'){
        try {
            const teams = await prisma.team.findMany({include: {
                members: true,
                tasks: true,
            }}); // Retrieves all users
            console.log(teams); // Return the array of users
            res.json(teams);
        } catch (error) {
            console.error('Error retrieving teams:', error);
            throw error; // Throw the error to handle it further up the call stack
        }
    }
    else res.send({message: 'not an admin'});
};

export const createTeam = async (req: CustomRequest, res: Response) => {
    const name = req.body.name;
    if(req.user.role == 'ADMIN'){
        try {
            const newTeam = await prisma.team.create({
                data: {
                    name,
                },
            });
    
            console.log('Created team:', newTeam);
            res.json(newTeam);
        } catch (error) {
            console.error('Error creating team:', error);
            throw error;
        }
    }
    else res.send({message: 'not an admin'});
};

export const addUserToTeam = async (req: CustomRequest, res: Response) => {
    const email = req.body.email;
    const id = parseInt(req.params.teamId);
    console.log(email+' '+id);
    if(req.user.role == 'ADMIN'){
        try {
            const user = await prisma.user.findUnique({
                where: { email: email },
            });
    
            if (!user) {
                res.json({message: 'user not found'})
                return;
            }
    
            const team = await prisma.team.findUnique({
                where: { id: id},
                include: { members: true }, 
            });
    
            if (!team) {
                console.log('Team not found');
                res.json({message: 'team not found'});
                return;
            }
    
            if (team.members.some(member => member.id === user.id)) {
                console.log('User is already a member of the team');
                res.json({message: 'user is already a member'});
                return;
            }
    
            const updatedTeam = await prisma.team.update({
                where: { id: id},
                data: {
                    members: {
                        connect: { id: user.id },
                    },
                },
                include: { members: {select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                }} }, 
            });
    
            console.log('User added to team successfully');
            res.json(updatedTeam);
        } catch (error) {
            console.error('Error adding user to team:', error);
        }
    }
    else res.send({message: 'not an admin'});
};
