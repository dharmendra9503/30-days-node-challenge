/*

**15. Problem: Express Logging Middleware**

**Problem Statement:**
Create a logging middleware for an Express application. The middleware should log detailed information about each incoming request, including the timestamp, HTTP method, URL, request headers, and request body.

**Function Signature:**
function loggingMiddleware(req, res, next) {
    // Your implementation here
  }
  
  **Expected Output:**
  - Each incoming request should be logged with detailed information.
  
  **Test Cases:**
  1. Make multiple requests and check the server logs for detailed information.
  
  **Hint**
  To create a logging middleware for Express, you'll need to define a function that takes req, res, and next as parameters. Inside this function, use console.log to print the timestamp, HTTP method, URL, headers, and body of the incoming request. Finally, call next() to pass control to the next middleware.
  
*/

const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

function loggingMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const headers = req.headers;
    const body = req.body;

    console.table([ timestamp, method, url, JSON.stringify(headers), JSON.stringify(body) ]);

    next();
}

app.post('/data', loggingMiddleware, (req, res) => {
    res.json("Loggin middleware implenmeted");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});