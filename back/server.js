const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

require('./utils.js'); // Run this file in beginning

let elevatorsData = {};

// Load the base file
const jsonFilePath = path.join(__dirname, 'data', 'base-elevators.json');

fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        elevatorsData = JSON.parse(data);
        console.log('Loaded elevatorsData with ', elevatorsData.length, ' records !');
    } catch (error) {
        console.error('Error parsing JSON data..');
        console.log(error);
    }
});

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors); // Use CORS
app.use(cookieParser()); // Use cookie parser

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clientsMap = new Map(); // Map to store client connections by unique identifier
const clientsIds = [];

// Function to broadcast a message to all connected clients
function broadcast(message) {
    wss.clients.forEach(function each(client) {
        console.log(client);
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Check how many connections there are
function numberOfConnections() {
    var numberOfCo = 0
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            numberOfCo += 1
        }
    });
    console.log(numberOfCo, 'connections');
}

function generateUniqueId() {
    // Generate a unique identifier using a suitable method
    return crypto.randomBytes(16).toString('hex');
}

// WebSocket connection handler
wss.on('connection', (ws) => {
    // Send initial elevators state to the client
    console.log('user connected');
    ws.send('You got connected !');

    numberOfConnections();

    // Message handler
    ws.on('message', function incoming(message) {
        console.log('Received message from client');

        try {
            const data = JSON.parse(message);

            if (data.type == "playerState") {
                console.log('Received player state');
                if (data.playerState) {
                    console.log('Player ready to play');
                    ws.send(JSON.stringify({ type: "serverState", serverState: true }));
                } else {
                    ws.send('There seems to be an issue');
                }
            } else if (data.type == "getElevators") {
                console.log('Got asked data !');
                var selectedElevators = {};
                var selectedIds = [];

                while (selectedIds.length < 4) {
                    var randomId = Math.floor(Math.random() * elevatorsData.length)
                    if (!selectedIds.includes(randomId)) {
                        selectedIds.push(randomId);
                    }
                }

                selectedElevators = elevatorsData.filter(elevator => selectedIds.includes(elevator.id));

                ws.send(JSON.stringify({type: "elevators", selectedElevators: selectedElevators}));
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('User disconnected');
        numberOfConnections();

    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

/*
240413 VERSION

// WebSocket connection handler
wss.on('connection', (ws, req) => {
    console.log('current url is :', req.url);

    const queryParams = new URLSearchParams(req.url.substring(1)); // Remove beginning slash
    const clientId = queryParams.get('clientId');

    console.log('clientId is ', clientId);
    console.log(clientsIds);

    ws.on('close', () => {
        console.log('Connection closed');
    });

    if (!clientId || !clients.has(clientId)) {
        // No clientId cookie or no existing connection for this client
        // Generate a new clientId and associate it with this connection
        const newClientId = generateUniqueId();
        clients.set(newClientId, ws); // Store this id for this client
        clientsIds.push(newClientId);

        // Send initial elevators state to the client
        console.log('user connected');
        console.log(clientsIds);
        ws.send('You got connected !');

        // Send the newClientId back to the client
        ws.send(JSON.stringify({ type: 'clientId', clientId: newClientId }));

    } else {
        // Client already has an active connection
        // Reject the new connection attempt
        ws.send('User already connected !');
        ws.close();
        console.log('User already connected !');
        return;
    }

    // Message handler
    ws.on('message', function incoming(message) {
        console.log('Received message from client:', message);

        try {
            const data = JSON.parse(message);
            const amountToAdd = parseInt(data.amountToAdd); // Assuming the message is a JSON object with a property "amountToAdd"

            if (!isNaN(amountToAdd)) {
                // Update the elevatorsState with the amountToAdd
                elevatorsState.current_state += amountToAdd;

                // Broadcast the updated state to all clients
                broadcast(JSON.stringify(elevatorsState));
            } else {
                console.error('Invalid amount to add:', data.amountToAdd);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    })
});

*/