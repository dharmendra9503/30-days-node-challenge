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


app.get('/average-age', async (req, res) => {
  try {
    const averageAge = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" }
        }
      }
    ]);
    res.json({ averageAge: averageAge[0].averageAge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});






app.post('/addUser', async (req, res) => {
    try {
        const { username, email, age } = req.body;
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
            email, 
            age
        };
        await User.create(userData);
        return res.status(201).send("User added successfully");
    } catch (error) {
        return res.status(400).send(error);
    }
});