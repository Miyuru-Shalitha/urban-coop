import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemCode: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    itemBrand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
       required: true,
    }
});
const Item = mongoose.connection.models.Item || mongoose.model("Item", itemSchema);


export default Item;
