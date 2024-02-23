/*

**23. Problem: Mongoose Population**

**Problem Statement:**
Extend the previous "Product" schema to include a reference to a "Category" entity. Implement a Mongoose population query to retrieve all products with their corresponding category details.

**Function Signature:**
function getProductsPopulatedWithCategory() {
    // Your implementation here
  }
  
  **Expected Output:**
  - The function should return an array of product objects with populated category details.
  
  **Test Cases:**
  1. Create products with associated categories, then call the function to retrieve products with populated category details.
  
  **Hint:**
  
  To solve this problem, you'll need to:
  
  - Define a Category schema.
  - Update the Product schema to include a reference to Category.
  - Create a ProductWithCategory model using the updated schema.
  - Implement the getProductsPopulatedWithCategory function using Mongoose's populate method to retrieve all products with their corresponding category details.
  - Hint: Use Mongoose's populate method on the category field of the ProductWithCategory model to populate the category details.

*/

import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import { Product } from "./models/product.model.js";
import { Category } from "./models/category.model.js";
dotenv.config({
    path: './.env'
})

const app = express();

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(` ⚙️  Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });

app.use(express.json());

// Function to retrieve all products with their corresponding category details
app.get("/products", async function getProductsPopulatedWithCategory(req, res) {
    try {
        const productsWithCategory = await Product.find().populate('category').exec();
        return res.status(200).json({ status: true, message: "Product list fetch successfully", data: productsWithCategory });
    } catch (error) {
        console.error('Error fetching products with category:', error);
        throw error; // Rethrow or handle as needed
    }
});




//Ths is used to create sample data for testing
// async function createSampleData() {
//     const electronicsCategory = new Category({ name: 'Electronics', description: 'Electronic gadgets' });
//     await electronicsCategory.save();

//     const smartphoneProduct = new Product({ name: 'Laptop', price: 49999, quantity: 8, category: electronicsCategory._id });
//     await smartphoneProduct.save();
// }

// createSampleData();
