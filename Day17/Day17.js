/*

**17. Problem: Mongoose Schema and Model**

**Problem Statement:**
Define a Mongoose schema for a "User" with properties: "username" (string) and "email" (string). Create a Mongoose model for the User schema. Implement a function to add a new user to the MongoDB database.

**Function Signature:**
function addUserToDatabase(user) {
    // Your implementation here
  }
  
  **Expected Output:**
  - If the user is successfully added, log a success message.
  
  **Test Cases:**
  1. Call `addUserToDatabase({ username: 'john_doe', email: 'john@example.com' })` and check the server logs for a success message.
  
  **Hint:**
  
  To solve this problem, you need to follow these steps:
  
  Define a Mongoose schema for the "User" with properties "username" (string) and "email" (string).
  Create a Mongoose model for the User schema.
  Implement a function addUserToDatabase that takes a user object and adds it to the MongoDB database using the User model.
  Here are some hints to guide you through the process:
  
  Define the Mongoose schema:
  
  Use mongoose.Schema to define a schema for the User.
  The schema should have two fields: "username" (String) and "email" (String).
  Create the Mongoose model:
  
  Use mongoose.model to create a model for the User schema.
  Pass the model a name (e.g., 'User') and the schema you defined.
  Implement the addUserToDatabase function:
  
  Inside the function, create a new User object using the provided user data.
  Use the save method on the User object to save it to the database.
  Log a success message if the user is saved successfully, or an error message if there's an error.
  Remember to connect Mongoose to your MongoDB database using mongoose.connect.

*/

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

app.post('/addUser', async (req, res) => {
    try {
        const { username, email } = req.body;
        if (
            [username, email].some((field) => field?.trim() === "")
        ) {
            return res.status(400).send("All fields are required");
        }
        // check if user already exists: username, email
        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (existedUser) {
            return res.status(409).send("User with email or username already exists");
        }
        const userData = {
            username,
            email
        };
        await User.create(userData);
        return res.status(201).send("User added successfully");
    } catch (error) {
        return res.status(400).send(error);
    }
});
