/*

**22. Problem: MongoDB CRUD Operations**

**Problem Statement:**
Implement a set of CRUD (Create, Read, Update, Delete) operations for a "Product" entity using MongoDB and Mongoose. Define a Mongoose schema for the product with properties like "name," "price," and "quantity." Implement functions to create, read, update, and delete products.

**Function Signature:**
function createProduct(product) {
    // Your implementation here
  }
  
  function getAllProducts() {
    // Your implementation here
  }
  
  function updateProduct(productId, updatedProduct) {
    // Your implementation here
  }
  
  function deleteProduct(productId) {
    // Your implementation here
  }
  
  **Expected Output:**
  - The functions should perform the respective CRUD operations on the "Product" collection in MongoDB.
  
  **Test Cases:**
  1. Create a product, retrieve all products, update a product, and then delete the product.
  
  **hint:**
  To solve this problem, you can follow these steps:
  
  1. Define a Mongoose schema for the "Product" entity with properties like "name," "price," and "quantity."
  2. Create a Mongoose model using the schema.
  3. Implement the createProduct function to create a new product in MongoDB.
  4. Implement the getAllProducts function to retrieve all products from MongoDB.
  6. Implement the updateProduct function to update a product in MongoDB.
  7. Implement the deleteProduct function to delete a product from MongoDB.
  8. You can use Mongoose methods like save, find, findByIdAndUpdate, and findByIdAndDelete to perform the CRUD operations.

*/



/*
**20. Problem: Express Route with MongoDB Aggregation**

**Problem Statement:**
Create an Express route that uses MongoDB aggregation to calculate and return the average age of all users in the database.

**Function Signature:**
function averageAgeOfUsers(req, res) {
    // Your implementation here
  }
  
  **Expected Output:**
  - Return a JSON response with the calculated average age.
  
  **Test Cases:**
  1. Access the route `/average-age` and check if the response contains the expected average age.
*/

import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
} from "./controllers/product.controller.js";
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

// Create a product
app.post("/product", createProduct);

// Get all products
app.get("/products", getAllProducts);

// Update a product
app.put("/product", updateProduct);

// Delete a product
app.delete("/product", deleteProduct);