import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
    supplierId: {
        type: String,
        required: [true, "Please provide the supplier id"],
        unique: true,
    },
    
    name: {
        type: String,
        required: [true, "Please provide the Supplier name"],
        unique: false,
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide the Phone number"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide the email"],
        unique: true,
    },
    address:{
        type: String,
        required: [true, "Please provide the Address"],
        unique: false,
    },
    category: {
        type: String,
        required: [true, "Please provide catagory"],
        unique: false,
    },
});

const Supplier = mongoose.models.suppliers || mongoose.model("suppliers", SupplierSchema);
export default Supplier;