let ws;

export function addConnectPage(element) {
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
            var clientId = currentCookies.clientId; // Assuming you have the clientId in the cookies
            // Establish WebSocket connection when the button is clicked
            ws = new WebSocket('ws://localhost:3000/clientId=' + encodeURIComponent(clientId)); // wss://www.api-elevate-game.xyz/
            console.log('Clicked url :', ws.url);

            // Set up event listeners for the WebSocket connection
            ws.addEventListener('open', function () {
                console.log('Opened WebSocket connection !');
            });

            // Handle messages received from the server
            ws.addEventListener('message', function (event) {
                const message = JSON.parse(event.data);
                if (message.type === 'clientId') {
                    // Store the clientId in cookies
                    document.cookie = `{"clientId":"${message.clientId}"}`;
                    console.log('Received clientId from server:', message.clientId);
                } else {
                    console.log('Received message from server:', JSON.stringify(message));
                }
            });
        });

    });
}

export { ws } ;