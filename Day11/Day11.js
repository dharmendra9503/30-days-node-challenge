/*

**11. Problem: Express Authentication Middleware**

**Problem Statement:**
Implement an authentication middleware for an Express application. The middleware should check for the presence of a valid JWT (JSON Web Token) in the request headers. If a valid token is present, allow the request to proceed; otherwise, return a 401 Unauthorized status.

Function Signature:
function authenticationMiddleware(req, res, next) {
    // Your implementation here
  }

  
  **Expected Output:**
  - If a valid JWT is present, allow the request to proceed.
  - If no JWT is present or it's invalid, return a 401 Unauthorized status.
  
  **Test Cases:**
  1. Request with a valid JWT should proceed.
  2. Request without a JWT or with an invalid JWT should return a 401 Unauthorized status.

*/


//Solution
const express = require('express');
const isAuthorized = require('./middlewares/isAuthorized.middleware');
const jwt = require('./helpers/jwt');

const app = express();

app.post('/login', async (req, res) => {
    const token = await jwt.generateToken(1, 'sample@gmail.com', 'user');
    if (!token) {
        return responseHelper.serverError(res, e);
    }
    return res.status(200).json({ token });
});

app.get('/', [isAuthorized], (req, res) => {
    return res.status(200).json({ message: 'Welcome to the protected route' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});