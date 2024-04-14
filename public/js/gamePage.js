import { navigateTo, container } from '../app.js';
import { addStylsheet } from './addStylesheet.js';
import { ws, elevators } from './connectPage.js';

export function addGamePage() {

    if (!ws) {
        console.log('No socket found !');
        navigateTo('connect');
        return
    }

    addStylsheet('game');

    console.log('Adding game page !');
    container.innerHTML = `<div class="game-container" id="gameContainer"></div>`;

    var gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    for (let i = 1; i <= 4; i++) {

        gameContainer.innerHTML +=
            `
        <!-- Elevator ${i} -->
			<div class="elevator" id="elevator${i}">
				<div class="elevator-title" id="title${i}">
                    Elevator ${i}
				</div>
                <div class="elevator-doors" id="doors${i}">
                    <div class="elevator-door" id="left-door">
                        <div class="elevator-inside-door"></div>
                    </div>
                    <div class="elevator-door" id="right-door">
                        <div class="elevator-inside-door"></div>
                    </div>
				</div>
                <div class="button-container" id="outside-button-container">
                    <div class="button-container" id="inside-button-container">
                        <button class="button-action" id="elevator${i}-selectbutton">Select e${i}</button>
                    </div>
                </div>
			</div>
        `;
    }

    var elevatorIndex = 1;

    console.log("Let's put some colors !");

    elevators.forEach(elevator => {
        // Find the correct elevator
        var elevatorElement = document.getElementById(`elevator${elevatorIndex}`);

        var elevatorTitle = elevatorElement.querySelector(`#title${elevatorIndex}`);
        elevatorTitle.innerText = elevator.currentPosition;

        var outsideDoors = elevatorElement.getElementsByClassName('elevator-door');
        Array.from(outsideDoors).forEach(door => {
            door.style.setProperty('--elevator-hue', elevator.hue);
            door.style.setProperty('--elevator-saturation', elevator.saturation);
        })

        elevatorIndex += 1;
    });

    var buttons = document.getElementsByClassName('button-action');
    Array.from(buttons).forEach(function (button) {
        button.addEventListener('click', () => {
            console.log('click');

            ws.send(JSON.stringify({ type: "getElevators" }));
            console.log('I have this :');
        });
    });
}