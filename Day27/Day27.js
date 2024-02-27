/*

**Problem 27: Authentication Middleware**

**Problem Statement:**
You are developing a web application with Node.js and Express, and you need to implement an authentication middleware to protect certain routes. The authentication should be token-based and support user roles (e.g., admin, regular user). Design a middleware function that verifies the authenticity of incoming requests and checks if the user has the required role to access certain routes.

**Function Signature:**
function authenticateAndAuthorize(req, res, next) {
    // Your implementation here
}

*/

//Solution
const express = require('express');
const authenticateAndAuthorize = require('./authenticateAndAuthorize.js');

const app = express();

// Example route that requires admin role
app.get('/admin', authenticateAndAuthorize('admin'), (req, res) => {
    res.json({ message: 'Admin route' });
});

// Example route that requires regular user role
app.get('/user', authenticateAndAuthorize('user'), (req, res) => {
    res.json({ message: 'User route' });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});