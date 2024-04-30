import { Request, Response } from "express";
import Supplier from "../models/SupplierSchema";

const createSupplier = async (req: Request, res: Response) => {
    try {
        const { supplierID, name, phoneNumber, email, address, category } = req.body;
        // console.log(req.body)

        const foundSupplier = await Supplier.findOne({ supplierId: supplierID, email: email });

        if(foundSupplier){
            return res.status(409).json({message : "Supplier already exisits!"});
        }

        const newSuppliers = new Supplier({
            supplierId: supplierID,
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            address: address,
            category: category,
        });

        newSuppliers.save();

        return res.status(201).json({message:"Supplier Created successfully!"})

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export {
    createSupplier,
}
