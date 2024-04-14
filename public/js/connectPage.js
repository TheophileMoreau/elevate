import { navigateTo, container } from '../app.js'
import { addStylsheet } from './addStylesheet.js';

let ws;
let serverConnected = false;
let elevators = {};

export function addConnectPage() {
    addStylsheet('connect');

    console.log('I made it this far !');

    container.innerHTML =
        `<div class="title-bar">
            <p id="title-bar-text">Elevate</p>
        </div>
        <div id="screen">
            <div class="button-container" id="outside-button-container">
                <div class="button-container" id="inside-button-container">
                    <button class="button-action" id="connect-button">connect</button>
                </div>
            </div>
        </div>`;

    ws = new WebSocket('ws://localhost:3000');

    ws.addEventListener('open', function () {
        console.log('Opened WebSocket connection !');
    });

    ws.addEventListener('close', () => {
        console.log('Connection got closed...');
    });

    // Handle messages received from the server
    ws.addEventListener('message', function (event) {
        console.log('Received message from server !');

        try {
            const data = JSON.parse(event.data);
            console.log(data);

            if (data.type == "serverState") {
                console.log('Received server state');
                if (data.serverState) {
                    console.log('Server ready to provide data');
                    serverConnected = true;
                    container.innerHTML = '';
                    ws.send(JSON.stringify({ type: "getElevators" }));
                } else {
                    console.log('Server not ready');
                }
            } else if (data.type == "elevators") {
                elevators = data.selectedElevators;
                console.log('Got elevators :');
                console.log(elevators);
                navigateTo('game');
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    const connectButton = document.getElementById("connect-button");

    // Event listener for the "connect" button
    connectButton.addEventListener('click', () => {
        ws.send(JSON.stringify({ type: "playerState", playerState: true }));
    });
}

export { ws, serverConnected, elevators };