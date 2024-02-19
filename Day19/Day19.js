/*

**19. Problem: Mongoose Validation**

**Problem Statement:**
Enhance the user schema from the previous question to include validation for the "email" property (must be a valid email address). Implement a function to add a new user to the MongoDB database with validation.

**Function Signature:**
function addUserWithValidation(user) {
    // Your implementation here
  }
  
  **Expected Output:**
  - If the user is successfully added, log a success message. If validation fails, log an error message.
  
  **Test Cases:**
  1. Call `addUserWithValidation({ username: 'john_doe', email: 'invalid-email' })` and check the server logs for a validation error message.
  
  **Hint:**
  
  1. Define a Mongoose schema for the user with validation rules for the "email" property. Use the `validate` option to specify a custom validator function for the email format.
  
  2. Create a Mongoose model using the schema.
  
  3. Write a function `addUserWithValidation` that takes a user object, creates a new user instance using the Mongoose model, and attempts to save it to the database. Handle the validation errors and success cases appropriately.
  
  Hints:
  
  - Use the `mongoose.Schema` constructor to define the schema with validation rules. Use the `validate` option to specify a custom validator function for the "email" property.
  - Use the `mongoose.model` method to create a model from the schema.
  - In the `addUserWithValidation` function, create a new user instance using the model constructor and the provided user object.
  - Use the `save` method on the user instance to save it to the database. Use a callback function to handle the result of the save operation. If there is an error, log the error message. If the user is saved successfully, log a success message.

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