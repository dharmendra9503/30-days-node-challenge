/*
**24. Problem: Express Route for Product CRUD Operations**

**Problem Statement:**
Create Express routes for handling CRUD operations on products using MongoDB and Mongoose. Implement routes for creating, reading, updating, and deleting products.

**Function Signature:**
function createProductRoute(req, res) {
  // Your implementation here
}

function getAllProductsRoute(req, res) {
  // Your implementation here
}

function updateProductRoute(req, res) {
  // Your implementation here
}

function deleteProductRoute(req, res) {
  // Your implementation here
}

**Expected Output:**
- The routes should perform the respective CRUD operations on the "Product" collection in MongoDB.

**Test Cases:**
1. Use tools like Postman to send HTTP requests to each route and check the MongoDB database for the expected changes.

**Hint:**
Schema Definition: Use the mongoose.Schema constructor to define a schema with fields like name, description, price, etc. Use appropriate data types and validation as needed.

Model Creation: Use the mongoose.model method to create a model for the products collection based on the schema defined in step 1.

Route Handlers: Implement route handlers that use the Mongoose model to perform CRUD operations on the products collection. For example, the handler for creating a product would create a new instance of the model with the request body and then save it to the database.

MongoDB Connection: Use the mongoose.connect method to connect to your MongoDB database. You can specify the connection URI as a parameter to this method.

Express Routes: Use the app.post, app.get, app.put, and app.delete methods of the Express app object to define routes for creating, reading, updating, and deleting products, respectively. Map these routes to the appropriate route handlers.

Testing: Use Postman or a similar tool to send HTTP requests to your Express routes and verify that they perform the expected CRUD operations on the MongoDB database.
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
  1. Access the route `/ average - age` and check if the response contains the expected average age.
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
            console.log(` ⚙️  Server is running at port: ${ process.env.PORT } `);
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