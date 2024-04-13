import { addStylsheet } from './addStylesheet.js';

let ws;

export function addConnectPage(element) {
    addStylsheet('connect');

    element.innerHTML =
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

    document.addEventListener("DOMContentLoaded", function () {

        const connectButton = document.getElementById("connect-button");

        // Event listener for the "connect" button
        connectButton.addEventListener('click', () => {
            var currentCookies = JSON.parse(document.cookie);
            var clientId = currentCookies.clientId; // Made sure with cookie.js

            // Establish WebSocket connection when the button is clicked
            ws = new WebSocket('ws://localhost:3000/clientId=' + encodeURIComponent(clientId)); // wss://www.api-elevate-game.xyz/
            console.log('Clicked url :', ws.url);

            // Set up event listeners for the WebSocket connection
            ws.addEventListener('open', function () {
                console.log('Opened WebSocket connection !');
            });

            // Handle messages received from the server
            ws.addEventListener('message', function (event) {

                console.log(event.data);

                try {
                    const message = JSON.parse(event.data); // Parse the content of the message

                    if (message.type === 'clientId') { // On first message
                        // Store the clientId in cookies
                        var currentCookies = JSON.parse(document.cookie);
                        currentCookies.clientId = message.clientId; // Replace with provided clientId
    
                        document.cookie = JSON.stringify(currentCookies); // Replace cookies
    
                        console.log('Received client Id : ', message.clientId);
                        console.log('New cookies are : ', document.cookie);
                    }
                } catch (error) {
                    // Handle the case where 'message' is not a valid JSON string
                    console.error('Error parsing JSON:', error);
                    console.log('Received message from server:', JSON.stringify(message));
                }
            });
        });


        ws.addEventListener('close', () => {
            console.log('Connection got closed...');
        })

    });
}

export { ws };