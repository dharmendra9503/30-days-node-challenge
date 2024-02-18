/*


**18. Problem: Express Route with MongoDB Query**

**Problem Statement:**
Create an Express route that retrieves all users from the MongoDB database and returns them as a JSON response.

**Function Signature:**
function getAllUsers(req, res) {
    // Your implementation here
  }
  
  **Expected Output:**
  - Return a JSON response with an array of user objects.
  
  **Test Cases:**
  1. Access the route `/users` and check if the response contains the expected user data.
  
  
  **Hint:**
  
  Import Required Modules: Import the necessary modules, such as express, mongoose, and any other modules required for your application.
  
  Define User Model: If you haven't already, define a User schema and create a User model using Mongoose.
  
  Connect to MongoDB: Use Mongoose to connect to your MongoDB database. Ensure that the connection is established before defining your route.
  
  Create Express Route: Define an Express route using app.get() that listens for requests to /users.
  
  Implement Route Handler: In the route handler function (getAllUsers), use the User.find() method to retrieve all users from the database. Handle any errors that occur during the query.
  
  Return JSON Response: If the query is successful, send a JSON response containing the array of user objects. If there is an error, send an appropriate error response.
  
  Start Express Server: Finally, start your Express server and listen on a specific port (e.g., 3000).

*/

//Solution

import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import { User } from "./models/user.model.js";
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

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});
