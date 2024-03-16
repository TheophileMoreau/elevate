// UI FUNCTIONS

// Function to open elevator doors
function openElevatorDoors(callback) {
    // Animate the left door to move to the center
    document.getElementById('left-door').style.left = '-50%';
    // Animate the right door to move to the center
    document.getElementById('right-door').style.right = '-50%';

    var buttons = document.querySelectorAll('button');

    setTimeout(function () {
        // Enable all buttons after the animation is complete
        buttons.forEach(function (button) {
            button.disabled = false;
        });
        // Call the callback function
        callback();
    }, 500); // Adjust the time delay as needed
}

// Function to close elevator doors
function closeElevatorDoors(callback) {
    // Animate the left door to move back to the original position
    document.getElementById('left-door').style.left = '0%';
    // Animate the right door to move back to the original position
    document.getElementById('right-door').style.right = '0%';

    // Invoke the callback function after the animation is complete
    setTimeout(callback, 1500); // Adjust the time delay as needed
}

// Function to add current floor in the html
function showCurrentFloor(playerFloor) {
    var floorDiv = document.getElementById('current-stage');
    floorDiv.textContent = playerFloor;
}

showCurrentFloor(playerFloor);

// Function to add top score floor in the html
function showTopFloor(topFloor) {
    var topFloorDiv = document.getElementById('best-score');
    if (parseInt(topFloorDiv.innerHTML) < topFloor) {
        topFloorDiv.textContent = topFloor;
    }
}

showTopFloor(topFloor);


// Function to populate elevator divs with elevator ID and value
function populateElevatorDivs(elevators) {
    elevators.forEach(function (elevator) {
        var elevatorDiv = document.getElementById('elevator' + elevator.id + '-position');
        elevatorDiv.textContent = elevator.currentPosition;
    });
}

// Update the elevators divs in html
populateElevatorDivs(currentViewElevators);


// Function to reset inputs to zero
function resetInputs(elevators) {
    elevators.forEach(function(elevator) {
        var inputElement = document.getElementById('elevator' + elevator.id + '-input');
        inputElement.value = 0;
    })
}

resetInputs(currentViewElevators);