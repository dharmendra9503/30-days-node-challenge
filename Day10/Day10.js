/*

**Problem: Express Static Files**

**Problem Statement:**
Create an Express application that serves static files (e.g., HTML, CSS, images) from a "public" directory. Ensure that accessing the root ("/") returns the "index.html" file from the "public" directory.

Function Signature:
function staticFileServer(req, res) {
    // Your implementation here
  }
  
  
  **Expected Output:**
  Accessing the root ("/") should return the content of "public/index.html".
  
  **Test Cases:**
  1. Request to `/` should return the content of "public/index.html".
  2. Request to `/styles/style.css` should return the content of "public/styles/style.css".

*/

//Solution
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/styles/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles', 'style.css'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});