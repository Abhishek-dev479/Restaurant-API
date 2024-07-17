import { Request, Response } from 'express';;
import prisma from '../utils/prismaClient'; 

export interface CustomRequest extends Request {
    user?: any;
}

export const createTask = async (req: CustomRequest, res: Response) => {
    const taskName = req.body.task;
    const teamId = parseInt(req.body.id);
    if(req.user.role == 'ADMIN'){
        try {
            // Create a new task and link it to a team
            const newTask = await prisma.task.create({
              data: {
                name: taskName,
                team: {
                  connect: { id: teamId },
                },
              },
            });
        
            console.log('Task created and added to team:', newTask);
            res.json(newTask);
        } catch (error) {
            console.error('Error creating task and adding to team:', error);
            res.json({message: 'error'});
        }
    }
}

export const getTasks = async (req: CustomRequest, res: Response) => {
    const teamId = parseInt(req.params.teamId); 
    try {
        const tasks = await prisma.task.findMany({
            where: {
                teamId: teamId,
            },
        });
        console.log(tasks); 
        res.json(tasks);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.json({message:'error'});
        throw error;
    }
};

export const updateTask = async (req: CustomRequest, res: Response) => {
    const taskId = parseInt(req.params.taskId); 
    const { name, status } = req.body; 
    try {
        const updatedTask = await prisma.task.update({
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
    } catch (error) {
        console.error('Error updating task:', error);
        res.json({message: 'error'});
        throw error; 
    }
};

export const deleteTask = async (req: CustomRequest, res: Response) => {
    const taskId = parseInt(req.params.taskId); // Extract taskId from request parameters
    if(req.user.role == 'ADMIN'){
        try {
            // Delete the task with the specified taskId
            const deletedTask = await prisma.task.delete({
                where: {
                    id: taskId,
                },
            });

            console.log('Deleted task:', deletedTask); // Log the deleted task
            res.json({message: 'successfully deleted the task'});
        } catch (error) {
            console.error('Error deleting task:', error);
            res.json({message: 'error'});
            throw error; // Throw the error to handle it further up the call stack
        }
    }
    else res.json({message: 'Only admin can delete'});
};