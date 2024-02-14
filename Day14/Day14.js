/*

**14. Problem: Express Caching Middleware**

**Problem Statement:**
Implement a caching middleware for an Express application. The middleware should cache responses based on the request URL and return cached responses for subsequent identical requests. Allow cache expiration after a specified time.

**Function Signature:**
function cachingMiddleware(req, res, next) {
    // Your implementation here
  }

  
  **Expected Output:**
  - Cached responses should be returned for identical requests within the cache expiration time.
  - Subsequent requests after cache expiration should trigger a new response.
  
  **Test Cases:**
  1. Make a request, cache the response, and make the same request again within the cache expiration time.
  2. Make a request, cache the response, wait for cache expiration, and make the same request again.

*/


//solution
const express = require('express');
const app = express();

const cache = {};

const cachingMiddleware = (req, res, next) => {
    const key = req.url;
    console.log(key);

    if (cache[key]) {
        const { data, timestamp } = cache[key];
        console.table([data, timestamp]);
        const expirationTime = 5000; // Cache expiration time in milliseconds (e.g., 1 minute)

        if (Date.now() - timestamp < expirationTime) {
            console.log(`Cached response found for ${key}`);
            return res.send(data);
        } else {
            console.log(`Cached response for ${key} expired`);
            delete cache[key]; // Remove expired cached response
        }
    }

    res.sendResponse = res.send;
    res.send = (body) => {
        cache[key] = { data: body, timestamp: Date.now() };
        res.sendResponse(body);
    };

    next();
};

app.use(cachingMiddleware);

app.get('/data', (req, res) => {
    const data = { message: 'This is cached data' };
    res.json(data);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});