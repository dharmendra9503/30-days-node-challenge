import mongoose, { Schema } from "mongoose";

// Define the product schema
const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

export const Product = mongoose.model("Product", productSchema);