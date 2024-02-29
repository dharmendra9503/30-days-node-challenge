/*

**Problem 29: Error Handling Middleware**

**Problem Statement:**
You are developing a complex web application with multiple routes and middleware in Node.js and Express. You want to implement a centralized error handling mechanism to catch and handle errors gracefully without crashing the server. Design a middleware function that intercepts errors thrown by route handlers or other middleware and sends an appropriate error response to the client.

**Function Signature:**
function errorHandler(err, req, res, next) {
    // Your implementation here
}

*/


// Solution
const express = require('express');
const { ApiError } = require('./ApiError');
const app = express();

app.get('/:id', (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(400).send(new ApiError(400, "Invalid ID"));
    }
    return res.status(200).json({ message: "Hello Developer" });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});