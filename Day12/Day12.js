/*

**12. Problem: Express Rate Limiting**

**Problem Statement:**
Implement a rate-limiting middleware for an Express application. The middleware should limit the number of requests from a single IP address to a specified rate, and return a 429 Too Many Requests status if the limit is exceeded.

Function Signature:
function rateLimitMiddleware(req, res, next) {
    // Your implementation here
  }

  
  **Expected Output:**
  - If the number of requests from a single IP is below the limit, allow the request to proceed.
  - If the limit is exceeded, return a 429 Too Many Requests status.
  
  **Test Cases:**
  1. Send requests within the limit; all should proceed.
  2. Send requests exceeding the limit; some should return a 429 status.

*/


//Solution
const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

app.use(rateLimiter);

app.get('/', (req, res) => {
    res.status(200).json("Welcome");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
