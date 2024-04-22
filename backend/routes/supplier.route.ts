import { Router } from "express";
import { createSupplier } from "../controllers/supplier.controller";
import Supplier from "../models/SupplierSchema";

const router = Router();

// Create a new supplier
router.post("/create", createSupplier);

// Retrieve all suppliers
router.get("/get", (req, res) => {
    Supplier.find()
        .then((suppliers) => {
            res.json(suppliers);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error retrieving suppliers", error: err.message });
        });
});

router.get("/get/:supplierId", (req, res) => {
    const id = req.params.supplierId;

    Supplier.findOne({ supplierId: id }) // Assuming 'supplierId' is the field in your schema
        .then((supplier) => {
            if (!supplier) {
                return res.status(404).send({ status: "Supplier not found" });
            }
            res.json(supplier);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error retrieving supplier", error: err.message });
        });
});


// Update supplier details
router.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { supplierId, name, phoneNumber, email, address, category } = req.body;

    const updateSupplierDetails = {
        supplierId,
        name,
        phoneNumber,
        email,
        address,
        category
    };

    Supplier.findByIdAndUpdate(id, updateSupplierDetails)
        .then(() => {
            res.status(200).send({ status: "Supplier Details Updated" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error updating supplier details", error: err.message });
        });
});

// Delete a supplier by ID
router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    Supplier.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send({ status: "Supplier Deleted Successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error deleting supplier", error: err.message });
        });
});

export default router;
