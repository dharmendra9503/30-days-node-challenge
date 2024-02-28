/*

**Problem 28: WebSocket Integration**

**Problem Statement:**
You are developing a real-time collaborative editing tool using Node.js and Express. You need to integrate WebSocket functionality to allow users to see changes made by others in real-time. Design a solution to establish WebSocket connections, handle incoming messages, and broadcast changes to all connected clients efficiently.

**Function Signature:**
function setupWebSocketServer(server) {
    // Your implementation here
}

*/

//Solution
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('message', (message) => {
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        clients.delete(ws);
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server started on port 3000');
});

const socket = new WebSocket('ws://localhost:3000');

socket.onmessage = (event) => {
    const message = event.data;
    console.log(message.toString());
};

socket.onopen = () => {
    const changes = 'Changes in main.js file by John Martinez';
    socket.send("Broadcasting changes to all connected clients: " + changes);
};