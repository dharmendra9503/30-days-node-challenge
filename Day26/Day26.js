/*

**26. Problem: Aggregation Pipeline for Product Stats**

**Problem Statement:**
Create an aggregation pipeline to calculate statistics for products in MongoDB. Implement a function to execute the pipeline and return aggregated results like the total number of products, the average price, and the highest quantity.

**Function Signature:**
function getProductStatistics() {
    // Your implementation here
}
  
  **Expected Output:**
  - The function should return an object with aggregated product statistics.
  
  **Test Cases:**
  1. Call the function and check the results for the expected product statistics.
  
  **Hint:**
  To calculate statistics for products in MongoDB using an aggregation pipeline, you can use the $group stage to calculate the total number of products (totalProducts), the average price (averagePrice), and the highest quantity (highestQuantity). Use $sum, $avg, and $max operators respectively for these calculations.

*/


//solution
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
            calculateProductStatistics().then((result) => {
                console.log(result);
            }).catch((error) => {
                console.error(error);
            });
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });

async function calculateProductStatistics() {
    return await Product.aggregate([
        {
            $group: {
                _id: null,
                totalProducts: { $sum: 1 },
                averagePrice: { $avg: "$price" },
                highestQuantity: { $max: "$quantity" }
            }
        }
    ]);
}