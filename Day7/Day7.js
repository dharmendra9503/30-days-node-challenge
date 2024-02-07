/*

7. Problem: Express Middleware

Problem Statement:
Implement an Express middleware function that logs the timestamp and the HTTP method of every incoming request to the server.

Function Signature:
function requestLoggerMiddleware(req, res, next) {
    // Your implementation here
}

  
  Expected Output:
  Log entries in the server console should be in the format: `{ timestamp } - { HTTP method } request received`.
  
  Test Cases:
  1. Any incoming request should trigger the middleware and log the appropriate message.

*/


//Solution
const express = require('express');
const app = express();
const port = 3000;
const loggerMiddleware = require('./middleware/logger');

app.set('port', port);
app.listen(port, () => { console.log(`Server is running on port ${port}`); });

app.get('/greet', loggerMiddleware.requestLoggerMiddleware, (req, res) => {
    const name = req.query.name;
    if (name) {
        res.send(`Hello, ${name}!`);
    } else {
        res.send('Hello, Guest!');
    }
});