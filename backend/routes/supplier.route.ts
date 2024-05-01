import express from 'express';
import suppliersController from '../controllers/supplier.controller'; // Import the supplier controller

// Create a router
const router = express.Router();

// Define routes

// Create a supplier
router.post('/', suppliersController.createSupplier);

// Get all suppliers
router.get('/', suppliersController.getAllSupplier);

// Get supplier by ID
router.get('/:id', suppliersController.getSupplierById);

// Update supplier by ID
router.put('/:id', suppliersController.updateSupplierById);

// Delete supplier by ID
router.delete('/:id', suppliersController.deleteSupplierById);

export default router;
