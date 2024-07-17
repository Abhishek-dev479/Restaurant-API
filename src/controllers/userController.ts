import { Request, Response } from 'express';;
import prisma from '../utils/prismaClient'; 

export interface CustomRequest extends Request {
    user?: any;
}
enum Role {
    ADMIN = 'ADMIN',
    CHEF = 'CHEF',
    WAITER = 'WAITER',
    USER = 'USER'
}

export async function updateRole(req: CustomRequest, res: Response){
    if(req.user.role == 'ADMIN'){
        const {email, role} = req.body;
        console.log(email+' '+role);
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await prisma.user.update({
            where: { email: email },
            data: { role: role },
        });
        console.log(updatedUser);
        res.send({message: 'updated role'})
    }
    else res.send({message: 'not an admin'});
};