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
exports.deleteInventory = exports.updateInventory = exports.addInventory = exports.getInventory = void 0;
;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const getInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield prismaClient_1.default.inventory.findMany();
        console.log('inventory items: ' + items);
        res.json(items);
    }
    catch (error) {
        res.json({ message: 'unable to get inventory items' });
        throw error;
    }
});
exports.getInventory = getInventory;
const addInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role == 'ADMIN') {
        let name = req.body.name;
        let quantity = parseInt(req.body.quantity);
        try {
            const newInventoryItem = yield prismaClient_1.default.inventory.create({
                data: {
                    name,
                    quantity
                },
            });
            console.log('Created inventory item:', newInventoryItem);
            res.json({ newInventoryItem });
        }
        catch (error) {
            console.error('Error creating inventory item:', error);
            throw error;
        }
    }
    else
        res.send({ message: 'not an admin' });
});
exports.addInventory = addInventory;
const updateInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inventoryId = parseInt(req.params.itemId);
    const quantity = parseInt(req.body.quantity);
    if (isNaN(inventoryId) || typeof quantity !== 'number') {
        return res.status(400).json({ message: 'Invalid inventory ID or quantity' });
    }
    try {
        const inventoryItem = yield prismaClient_1.default.inventory.findUnique({
            where: { id: inventoryId },
        });
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        const updatedInventoryItem = yield prismaClient_1.default.inventory.update({
            where: { id: inventoryId },
            data: { quantity },
        });
        res.json(updatedInventoryItem);
    }
    catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateInventory = updateInventory;
const deleteInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role != 'ADMIN')
        res.json({ message: 'Only admin can delete' });
    else {
        const inventoryId = parseInt(req.params.itemId);
        if (isNaN(inventoryId)) {
            return res.status(400).json({ message: 'Invalid inventory ID' });
        }
        try {
            const inventoryItem = yield prismaClient_1.default.inventory.findUnique({
                where: { id: inventoryId },
            });
            if (!inventoryItem) {
                return res.status(404).json({ message: 'Inventory item not found' });
            }
            yield prismaClient_1.default.inventory.delete({
                where: { id: inventoryId },
            });
            res.json({ message: 'Inventory item deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting inventory:', error);
            res.json({ message: 'Internal server error' });
        }
    }
});
exports.deleteInventory = deleteInventory;
