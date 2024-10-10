import { Request, Response } from 'express';
import Supplier from '../models/SupplierSchema'; 
import mongoose from 'mongoose';

const supplierController = {
    // Create a suppliers
    createSupplier: async (req: Request, res: Response) => {
        try {
            const supplierData = req.body;
            const newSupplier = new Supplier(supplierData);
            const savedSupplier = await newSupplier.save();
            res.status(201).json(savedSupplier);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    },

    // Get all suppliers
    getAllSupplier: async (_req: Request, res: Response) => {
        try {
            const suppliers = await Supplier.find();
            res.status(200).json(suppliers);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    },

    // Get suppliers by ID
    getSupplierById: async (req: Request, res: Response) => {
        try {
            const supplierId = req.params.id; // MongoDB ObjectId
            const supplier = await Supplier.findById(supplierId);
            if (!supplier) {
                res.status(404).json({ message: 'Supplier not found' });
            } else {
                res.status(200).json(supplier);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    },

    // Update suppliers by ID
    updateSupplierById: async (req: Request, res: Response) => {
        console.log('Received request to update supplier:', req.params.id, req.body);

        try {
            const supplierId = req.params.id;
            const updatedData = req.body;

            const isValidObjectId = mongoose.Types.ObjectId.isValid(supplierId);
if (!isValidObjectId) {
    return res.status(400).json({ error: 'Invalid supplier ID format' });
}


            console.log(supplierId);
            
            const updatedSupplier = await Supplier.findByIdAndUpdate(supplierId, updatedData, { new: true });
            console.log('Updated supplier result:', updatedSupplier);

            console.log("hello");
            
            if (!updatedSupplier) {
                res.status(404).json({ message: 'Suppliar not found' });
            } else {
                res.status(200).json(updatedSupplier);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    },

    // Delete supplier by ID
    deleteSupplierById: async (req: Request, res: Response) => {
        try {
            const supplierId = req.params.id;
            const deletedSupplier = await Supplier.deleteOne({supplierId});
            console.log(deletedSupplier);
            if (!deletedSupplier) {
                res.status(404).json({ message: 'supplier not found' });
            } else {
                res.status(200).json({ message: 'supplier deleted successfully' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    },
};

export default supplierController;

