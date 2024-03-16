// UTILS FUNCTIONS

// Function to generate a random number between 0 and 1 with uniform distribution
function randomUniform() {
    return Math.random();
}

// Function to generate a random number following a normal distribution with mean mu and standard deviation sigma
function randomNormal(mu, sigma, minValue, maxValue) {
    var u1 = randomUniform();
    var u2 = randomUniform();

    var z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

    // Scale and shift the result to match the desired mean and standard deviation
    var randomNumber = z0 * sigma + mu;

    // Ensure the generated value is within the range [0, 1000]
    randomNumber = Math.min(Math.max(randomNumber, minValue), maxValue);

    return Math.round(randomNumber); // Round the value to the nearest integer
}

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// GAME FUNCTIONS

// Elevators distribution infos :
var mean = 500; // Mean of the normal distribution
var standardDeviation = 100; // Standard deviation of the normal distribution
var minValue = 0; // Minimum allowed value
var maxValue = 1000; // Maximum allowed value

// Function to create n elevators with normally distributed breaking point and current floor :
function generateElevators(numberOfElevators) {
    var elevators = [];
    for (var i = 0; i < numberOfElevators; i++) {
        var breakingPoint = randomNormal(mean, standardDeviation, minValue, maxValue); // Random breaking point
        var currentPosition = Math.floor(Math.random() * (breakingPoint + 1)); // Random position between 0 and breakingPoint
        var totalFloors = currentPosition // Total of floors done by the elevator so far --> ups and downs count as different
        elevators.push({ id: i + 1, currentPosition: currentPosition, totalFloors: totalFloors, breakingPoint: breakingPoint });
    }
    return elevators;
}

// Number of elevators we want :
var numberOfElevators = 1000; // Total number of elevators created
var numberAvailableElevators = 4; // Number of elevators the player can see

// Generate our elevators array
elevatorsState = generateElevators(numberOfElevators);
console.log(elevatorsState);

// Player's stats :
var playerFloor = 0; // Current floor
var topFloor = 0; // Best floor reached

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

// Find closest elevators to player's current  floor
function findCloseElevators(playerFloor, elevatorsState, numberAvailableElevators) {
    // Calculate the distance of each elevator from the player floor
    elevatorsState.forEach(function (elevator) {
        elevator.originalId = elevator.id; // Reanming the id from all elevators table
        delete elevator.id; // Remove the former id property
        elevator.distanceToPlayer = Math.abs(elevator.currentPosition - playerFloor);
    });

    // Sort the elevators based on their distance from the player floor
    elevatorsState.sort((a, b) => a.distanceToPlayer - b.distanceToPlayer);

    // Slice the array to get the closest elevators
    const closestElevators = elevatorsState.slice(0, numberAvailableElevators);

    // Reorder the columns of the array
    const reorderedElevators = closestElevators.map(({ currentPosition, totalFloors, breakingPoint, distanceToPlayer }, index) => ({
        id: index + 1,
        currentPosition,
        totalFloors,
        breakingPoint,
        distanceToPlayer
    }));

    // Return the first n elevators (closest to the player floor)
    return reorderedElevators;
}

var currentViewElevators = findCloseElevators(playerFloor, elevatorsState, numberAvailableElevators);
console.log('current view is :');
console.log(currentViewElevators);


// Function to populate elevator divs with elevator ID and value
function populateElevatorDivs(elevators) {
    elevators.forEach(function (elevator) {
        var elevatorDiv = document.getElementById('elevator' + elevator.id + '-position');
        elevatorDiv.textContent = elevator.currentPosition;
    });
}

// Update the elevators divs in html
populateElevatorDivs(currentViewElevators);

function fetchCurrentElevatorsData(id, currentViewElevators) {

    // Iterate through the elevatorsArray
    for (let i = 0; i < currentViewElevators.length; i++) {
        // Check if the current elevator's id matches the specified id
        if (currentViewElevators[i].id === id) {
            // Run the function for the specified id
            console.log('fetching data : ');
            console.log(currentViewElevators[i]);
            elevatorInteractions(currentViewElevators[i], 100);
        }
    }
}

// Function to go to next floors
function elevatorInteractions(elevator, floorsToMove) {

    console.log('in interactions, I find : ');
    console.log(elevator);

    console.log('id : ' + elevator.id + ', totalFloors : ' + elevator.totalFloors);
    console.log('player floor : ' + playerFloor);
    console.log('floors to move : ' + floorsToMove);
    console.log('expected floor : ' + (parseInt(elevator.totalFloors) + parseInt(floorsToMove)));
    console.log('breaks at : ' + parseInt(elevator.breakingPoint));
    console.log('logic is : ' + (parseInt(elevator.totalFloors) + parseInt(floorsToMove) < parseInt(elevator.breakingPoint)))

    // If there is enough room to move
    if (parseInt(elevator.totalFloors) + parseInt(floorsToMove) < parseInt(elevator.breakingPoint)) {
        playerFloor += floorsToMove; // Add the number of floors
        console.log('success, new floor : ' + playerFloor);
    } else {
        topFloor = playerFloor;
        playerFloor = 0;
        console.log('you lose');

        showTopFloor(topFloor); // Update best score
        console.log('top score is updated');
    }

    currentViewElevators = findCloseElevators(playerFloor, elevatorsState, numberAvailableElevators); // Find closest elevators
    console.log('new elevators found');
    console.log(currentViewElevators);
    populateElevatorDivs(currentViewElevators); // Populate divs with new elevators
    console.log('data is updated');

    showCurrentFloor(playerFloor); // Update current floor
    console.log('current floor is updated');

}

// Attach click event listeners to elevator buttons
function attachEventListeners(elevators) {
    console.log('Attaching event listeners');
    elevators.forEach(function (elevator) {
        var addButton = document.getElementById('elevator' + elevator.id + '-button');
        addButton.addEventListener('click', function () {
            // Show overlay with fade effect and update data while the screen is black
            closeElevatorDoors(function () {
                fetchCurrentElevatorsData(elevator.id, currentViewElevators); // See what interaction it does
                openElevatorDoors(); // Hide overlay with fade effect after data update
                console.log('______________');
            });
        });
    });
}

// Call the attachEventListeners function after elevators are populated
attachEventListeners(currentViewElevators);


// UI FUNCTIONS

// Function to open elevator doors
function openElevatorDoors(callback) {
    // Animate the left door to move to the center
    document.getElementById('left-door').style.left = '-50%';
    // Animate the right door to move to the center
    document.getElementById('right-door').style.right = '-50%';

    // Invoke the callback function after the animation is complete
    setTimeout(callback, 1000); // Adjust the time delay as needed
}

// Function to close elevator doors
function closeElevatorDoors(callback) {
    // Animate the left door to move back to the original position
    document.getElementById('left-door').style.left = '0%';
    // Animate the right door to move back to the original position
    document.getElementById('right-door').style.right = '0%';

    // Invoke the callback function after the animation is complete
    setTimeout(callback, 1000); // Adjust the time delay as needed
}