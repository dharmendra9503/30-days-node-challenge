/*


**25. Problem: Mongoose Indexing**

**Problem Statement:**
Implement indexing on the "name" field of the "Product" collection to optimize query performance. Write a function to create the index.

**Function Signature:**
function createProductNameIndex() {
    // Your implementation here
  }
  
  **Expected Output:**
  - The function should create an index on the "name" field of the "Product" collection.
  
  **Test Cases:**
  1. Call the function and check the MongoDB database for the created index.
  
  **Hint:**
  
  
  Get access to your Mongoose Product model.
  
  Use the createIndex method on the name field of the Product collection.
  
  Provide a callback function to handle the result.

*/


//Solution

import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import { Product } from "./models/product.model.js";
dotenv.config({
    path: './.env'
})

const app = express();

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(` ⚙️  Server is running at port: ${process.env.PORT} `);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });

function createProductNameIndex() {
    Product.collection.createIndex({ name: 1 }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

createProductNameIndex();