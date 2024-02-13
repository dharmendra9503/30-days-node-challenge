/*

**13. Problem: Express WebSocket Integration**

**Problem Statement:**
Extend an existing Express application to include WebSocket support. Create a WebSocket server that echoes back any message it receives from a client. Implement an endpoint "/websocket" that serves an HTML page with JavaScript to establish a WebSocket connection.

Function Signature:
function setupWebSocket(server) {
    // Your implementation here
}
```

**Expected Output:**
- Clients should be able to establish a WebSocket connection to "/websocket".
  - Messages sent by clients should be echoed back by the server.
  
  **Test Cases:**
  1. Establish a WebSocket connection and send a message; it should be echoed back.
  
  */

// Solution:
const express = require('express');
const WebSocket = require('ws');
const app = express();
const wss = new WebSocket.Server({ noServer: true });
app.get('/websocket', (req, res) => {
    // Serve an HTML page with JavaScript to establish WebSocket connection
    res.sendFile(__dirname + '/websocket.html');
});
const server = app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log('Received message:', message.toString());
        ws.send(message.toString());
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
