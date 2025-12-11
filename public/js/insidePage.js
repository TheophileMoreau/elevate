import { navigateTo, container } from '../app.js';
import { addStylsheet } from './addStylesheet.js';
import { ws, elevators } from './connectPage.js';

export function addInsidePage(elevator) {

    console.log(elevator);

    if (!ws) {
        console.log('No socket found !');
        navigateTo('connect');
        return
    } else if (!elevators) {
        console.log('No elevators found !');
        navigateTo('connect');
        return
    }

    addStylsheet('inside');

    console.log('Adding inside page !');
    container.innerHTML = `
        <div class="inside-container" id="inside-container">
            <div class="button-container" id="outside-button-container">
                <div class="button-container" id="inside-button-container">
                    <button class="button-action" id="leave-button">Leave</button>
                </div>
            </div>
            <div class="inside-container" id="panel-view">
                <div class="panel-part" id="top-panel-part">
                    <p id="floor-text">Current Floor : </p>
                    <div id="current-floor-content">
                        <div id="current-floor"><p id="floor">...<p></div>
                    </div>
                </div>
                <div class="panel-part" id="bottom-panel-part">
                    <div id="floors-container"></div>
                </div>
            </div>
        </div>`;

    var currentFloor = container.querySelector('#floor');
    currentFloor.innerText = elevator.currentPosition;

    var panelView = container.querySelector('#panel-view');
    panelView.style.setProperty('--elevator-hue', elevator.hue);
    panelView.style.setProperty('--elevator-saturation', elevator.saturation);

    var floorsContainer = container.querySelector('#floors-container');
    floorsContainer.innerHTML = '';

    for (let i = 1; i <= 9; i++) {
        var floorContent = '.';
        if (Math.random() >= 0.1) {
            floorContent = elevator.currentPosition + 1 + Math.floor(Math.random() * 10);
        }
        floorsContainer.innerHTML +=
            `<div class="floor-buttons" id="floor-button-${i}">
                ${floorContent}
            </div>`;
    }

    var leaveButton = container.querySelector('#leave-button');
    leaveButton.addEventListener('click', () => {
        console.log('click');
        navigateTo('game');
    });
}