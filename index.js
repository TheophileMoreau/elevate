// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to open elevator doors
function openElevatorDoors(callback) {
    // Animate the left door to move to the center
    document.getElementById('left-door').style.left = '-50%';
    // Animate the right door to move to the center
    document.getElementById('right-door').style.right = '-50%';
    console.log('this is open');

    setTimeout(callback, 1000); // Adjust the time delay as needed
}

// Function to close elevator doors
function closeElevatorDoors(callback) {
    // Animate the left door to move back to the original position
    document.getElementById('left-door').style.left = '0%';
    // Animate the right door to move back to the original position
    document.getElementById('right-door').style.right = '0%';
    console.log('this is closed');

    // Invoke the callback function after the animation is complete
    setTimeout(callback, 1000); // Adjust the time delay as needed
}

// Function to create an array of elevator objects with IDs, values, and breaking points
function createElevators() {
    var elevators = [];

    // Get current title value
    var titleDiv = document.getElementById('current-stage');
    var titleDivValue = parseInt(titleDiv.getAttribute('value'));

    for (var i = 0; i < 4; i++) {
        var elevator = {};
        elevator.id = i + 1; // Elevator ID
        elevator.value = getRandomNumber(Math.max(0, titleDivValue - 15), Math.min(1000, titleDivValue + 15)); // Elevator value
        elevator.breakingPoint = getRandomNumber(elevator.value, 1000); // Breaking point
        elevator.hasFallen = false; // Has the elevator already fallen
        elevators.push(elevator);
    }
    return elevators;
}

// Function to populate elevator divs with elevator ID and value
function populateElevatorDivs(elevators) {
    elevators.forEach(function (elevator) {
        var elevatorDiv = document.getElementById('elevator' + elevator.id + '-position');
        console.log('elevator' + elevator.id + '-position');
        elevatorDiv.textContent = elevator.value;
    });
}

// Create elevators array
var elevators = createElevators();

// Populate elevator divs
populateElevatorDivs(elevators);
console.log(elevators);

// Function to update elevators data
function updateElevatorsData(elevator) {

    var elevatorDiv = document.getElementById('elevator' + elevator.id + '-position');

    // Get current title value
    var titleDiv = document.getElementById('current-stage');
    var titleDivValue = parseInt(titleDiv.getAttribute('value'));

    // Check if elevator has already fallen
    if (elevator.hasFallen) {
        // If elevator has fallen, do nothing
        return;
    }

    // Increment elevator value by 10
    elevator.value += 10;

    // If elevator value exceeds breaking point, reset it to 0
    if (elevator.value > elevator.breakingPoint) {
        elevator.value = 0;
        elevator.hasFallen = true;

        titleDivValue = 0;
        titleDiv.setAttribute('value', titleDivValue);
        titleDiv.innerHTML = titleDivValue;
    } else {
        titleDivValue += 10
    }

    // Update the content of the elevator div
    elevatorDiv.textContent = elevator.value === 0 ? '___' : elevator.value;

    titleDiv.setAttribute('value', titleDivValue);
    titleDiv.innerHTML = titleDivValue;

    console.log('data is updated');

}

// Attach click event listeners to elevator buttons
function attachEventListeners(elevators) {
    elevators.forEach(function (elevator) {
        var addButton = document.getElementById('elevator' + elevator.id + '-button');
        addButton.addEventListener('click', function () {
            // Show overlay with fade effect and update data while the screen is black
            closeElevatorDoors(function () {
                updateElevatorsData(elevator); // Pass the current elevator object
                openElevatorDoors(); // Hide overlay with fade effect after data update
            });
        });
    });
}


// Call the attachEventListeners function after elevators are populated
attachEventListeners(elevators);