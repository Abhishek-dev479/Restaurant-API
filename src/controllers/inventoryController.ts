import { Request, Response } from 'express';;
import prisma from '../utils/prismaClient'; 

export interface CustomRequest extends Request {
    user?: any;
}

export const getInventory = async (req: CustomRequest, res: Response) => {
    try {
        const items = await prisma.inventory.findMany();
        console.log('inventory items: '+items)
        res.json(items);
    } catch (error) {
        res.json({message: 'unable to get inventory items'});
        throw error;
    }
}

export const addInventory = async (req: CustomRequest, res: Response) => {
    if(req.user.role == 'ADMIN'){
        let name = req.body.name;
        let quantity = parseInt(req.body.quantity) 
        try {
            const newInventoryItem = await prisma.inventory.create({
                data: {
                    name,
                    quantity
                },
            });
    
            console.log('Created inventory item:', newInventoryItem);
            res.json({newInventoryItem});
        } catch (error) {
            console.error('Error creating inventory item:', error);
            throw error;
        }
    }
    else res.send({message: 'not an admin'});
}

export const updateInventory = async (req: Request, res: Response) => {
    const inventoryId = parseInt(req.params.itemId);
    const quantity = parseInt(req.body.quantity);

    if (isNaN(inventoryId) || typeof quantity !== 'number') {
        return res.status(400).json({ message: 'Invalid inventory ID or quantity' });
    }

    try {
        const inventoryItem = await prisma.inventory.findUnique({
            where: { id: inventoryId },
        });

        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        const updatedInventoryItem = await prisma.inventory.update({
            where: { id: inventoryId },
            data: { quantity },
        });

        res.json(updatedInventoryItem);
    } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteInventory = async (req: CustomRequest, res: Response) => {
    if(req.user.role != 'ADMIN') res.json({message: 'Only admin can delete'});
    else{
        const inventoryId = parseInt(req.params.itemId);
        if (isNaN(inventoryId)) {
            return res.status(400).json({ message: 'Invalid inventory ID' });
        }
        try {
            const inventoryItem = await prisma.inventory.findUnique({
                where: { id: inventoryId },
            });

            if (!inventoryItem) {
                return res.status(404).json({ message: 'Inventory item not found' });
            }

            await prisma.inventory.delete({
                where: { id: inventoryId },
            });

            res.json({ message: 'Inventory item deleted successfully' });
            } catch (error) {
                console.error('Error deleting inventory:', error);
                res.json({ message: 'Internal server error' });
        }
    }
};