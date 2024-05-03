import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    stockCode: {
        type: String,
        required: true
    },
    stockBrand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "out_of_stock", "on_hold"],
        required: true
    }
});

const Stock =
  mongoose.models.stocks || mongoose.model("stocks", stockSchema);

export default Stock;
