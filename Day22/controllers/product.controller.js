import { Product } from "../models/product.model.js";

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        if (!name || !price || !quantity) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }
        const product = new Product({ name, price, quantity });
        await product.save();
        return res.status(201).json({ status: true, message: "Product created successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Read all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ status: true, message: "Product List fetch successfully", data: products });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const id = req.query.id;
        const updatedData = req.body;
        if (!id) return res.status(400).json({ status: false, message: "id is required" });
        if (!updatedData) return res.status(400).json({ status: false, message: "body is required" });
        await Product.updateOne({ _id: id }, updatedData);
        return res.status(201).json({ status: true, message: "Product updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ status: false, message: "id is required" });
        await Product.findByIdAndDelete(id);
        return res.status(201).json({ status: true, message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { createProduct, getAllProducts, updateProduct, deleteProduct };