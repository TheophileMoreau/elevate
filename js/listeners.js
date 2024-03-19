// LISTENERS FUNCTIONS

// Attach event listeners to elevator inputs
function attachInputElements(elevators) {
    console.log('Attaching Inputs listeners');

    elevators.forEach(function (elevator) {

        // Get the input element
        var inputElement = document.getElementById('elevator' + elevator.id + '-input');

        // Add event listener to the input field
        inputElement.addEventListener('input', function (event) {
            // Get the new value entered by the user
            const newValue = parseInt(event.target.value);

            var elevatorRestToTop = maxValue - fetchCurrentElevatorsData(elevator.id, currentViewElevators).currentPosition;

            // If the new value exceeds the maximum allowed value, set it to the maximum
            if (newValue > elevatorRestToTop) {
                event.target.value = elevatorRestToTop;
            }

            // If the new value is negative, set it to 0
            if (newValue < 0) {
                event.target.value = 0;
            }

            // If the new value is empty, set it to 0
            if (event.target.value === '') {
                event.target.value = 0;
            }

            // Remove leftmost zeros except if value is 0
            if (event.target.value == 0) {
                event.target.value = 0;
            } else {
                event.target.value = event.target.value.replace(/^0+/, '');
            }

            // Now the input value is within the desired range (0 to 1000 minus the elevator's current level)
            inputElement.value = event.target.value;
            console.log('new manual input value : ', inputElement.value);
        });
    });
}

attachInputElements(currentViewElevators);


// Attach click event listeners to plus and minus buttons
function attachPlusMinusButtons(elevators) {
    console.log('Attaching Plus Minus listeners');

    elevators.forEach(function (elevator) {

        // Get the buttons
        var minusButton = document.getElementById('elevator' + elevator.id + '-minus');
        var plusButton = document.getElementById('elevator' + elevator.id + '-plus');

        // Add event listener to the minus button
        minusButton.addEventListener('click', function () {

            // Get the current input
            var inputElement = document.getElementById('elevator' + elevator.id + '-input');
            var currentValue = inputElement.value;

            currentValue--; // Remove to input value

            // If the decremented value is negative, set it to 0
            if (currentValue < 0) {
                currentValue = 0;
            }

            // Update the input value
            inputElement.value = currentValue;
            console.log('new input value :', currentValue);
        });

        // Add event listener to the plus button
        plusButton.addEventListener('click', function () {

            // Get the current input
            var inputElement = document.getElementById('elevator' + elevator.id + '-input');
            var currentValue = inputElement.value;

            currentValue++; // Add to input value

            var elevatorRestToTop = maxValue - fetchCurrentElevatorsData(elevator.id, currentViewElevators).currentPosition;

            // If the new value exceeds the maximum allowed value, set it to the maximum
            if (currentValue > elevatorRestToTop) {
                currentValue = elevatorRestToTop;
            }

            // Update the input value
            inputElement.value = currentValue;
            console.log('new input value :', currentValue);
        });
    });
}

attachPlusMinusButtons(currentViewElevators);


// Flag to track whether event listener to send data has been launched
var eventListenerAdded = false;


// Attach click event listeners to go to button
function attachGotoButtons(elevators) {
    console.log('Attaching Go To listeners');

    elevators.forEach(function (elevator) {

        // Get the buttons
        var gotoButton = document.getElementById('elevator' + elevator.id + '-gotobutton');

        // Add event listener to the minus button
        gotoButton.addEventListener('click', function () {
            console.log('button ', elevator.id, ' pressed');
            if (eventListenerAdded == false) {

                // Get the current input
                var inputElement = document.getElementById('elevator' + elevator.id + '-input');
                var currentValue = inputElement.value;

                // Do not send if value is 0
                if (currentValue > 0) {

                    // Set the value to true
                    eventListenerAdded = true;

                    // Fetch current data for this elevator
                    var elevatorData = fetchCurrentElevatorsData(elevator.id, currentViewElevators);

                    console.log('will it breaks on the way :', parseInt(elevatorData.totalFloors) + parseInt(elevatorData.distanceToPlayer)
                        >= parseInt(elevatorData.breakingPoint));

                    // If the elevator brokes on the way
                    if (parseInt(elevatorData.totalFloors) + parseInt(elevatorData.distanceToPlayer)
                        >= parseInt(elevatorData.breakingPoint)) {

                        console.log('there seems to be an issue with this elevator');
                        var thisElevator = [{
                            id: elevator.id,
                            breakingPoint: elevator.breakingPoint,
                            currentPosition: '___',
                            totalFloors: elevator.breakingPoint,
                            distanceToPlayer: elevator.breakingPoint
                        }
                        ]

                        console.log('thisElevator : ', thisElevator);

                        populateElevatorDivs(thisElevator); // Change the design for this elevator
                        disableButtonsAndInputs(thisElevator); // Disable this elevator's button
                        eventListenerAdded = false; // Reset the value to false and allow key pressed

                    } else {

                        // Disable all buttons
                        disableButtonsAndInputs(currentViewElevators);

                        elevatorInteractions(elevatorData, currentValue);

                        // Show overlay with fade effect and update data while the screen is black
                        closeElevatorDoors(function () {
                            populateElevatorDivs(currentViewElevators); // Populate divs with new elevators
                            console.log('data is updated');

                            showTopFloor(topFloor); // Update best score
                            console.log('top score is updated');

                            showCurrentFloor(playerFloor); // Update current floor
                            console.log('current floor is updated');
                            resetInputs(currentViewElevators);
                            openElevatorDoors(() => {
                                // Reset the value to false and allow key pressed
                                eventListenerAdded = false;
                            }); // Hide overlay with fade effect after data updat
                            console.log('______________');

                        }, messageContent);
                    }
                }
            } else {
                // Reset the value to false and allow key pressed
                eventListenerAdded = false;
            }
        });
    });
}

attachGotoButtons(currentViewElevators);


// Attach key event listeners to enter key
function attachEnterKey(elevators) {
    console.log('Attaching Enter Key listeners');

    elevators.forEach(function (elevator) {

        // Get the input element
        var inputElement = document.getElementById('elevator' + elevator.id + '-input');

        // Add event listener to the minus button
        inputElement.addEventListener('keydown', function (event) {
            console.log(event.key, ' on ', elevator.id, ' pressed');

            // Get the current input
            var currentValue = inputElement.value;

            if (eventListenerAdded == false && currentValue > 0) {

                // Set the value to true
                eventListenerAdded = true;

                if (event.key == 'Enter') {
                    console.log('enter is pressed');
                    console.log(event);
                    console.log('event is for id : ', elevator.id);

                    // Prevent double triggering of the event
                    event.stopPropagation();

                    // Fetch current data for this elevator
                    var elevatorData = fetchCurrentElevatorsData(elevator.id, currentViewElevators);
                    console.log(elevatorData.totalFloors);

                    // If the elevator brokes on the way
                    if (parseInt(elevatorData.totalFloors) + parseInt(elevatorData.distanceToPlayer)
                        >= parseInt(elevatorData.breakingPoint)) {

                        console.log('there seems to be an issue with this elevator');
                        var thisElevator = [{
                            id: elevator.id,
                            breakingPoint: elevator.breakingPoint,
                            currentPosition: '___',
                            totalFloors: elevator.breakingPoint,
                            distanceToPlayer: elevator.breakingPoint
                        }
                        ]

                        console.log('thisElevator : ', thisElevator);

                        populateElevatorDivs(thisElevator); // Change the design for this elevator
                        disableButtonsAndInputs(thisElevator); // Disable this elevator's button
                        eventListenerAdded = false; // Reset the value to false and allow key pressed

                    } else {

                        console.log("everything looks good");

                        // Disable all buttons
                        disableButtonsAndInputs(currentViewElevators);

                        elevatorInteractions(elevatorData, currentValue);

                        // Show overlay with fade effect and update data while the screen is black
                        closeElevatorDoors(function () {
                            populateElevatorDivs(currentViewElevators); // Populate divs with new elevators
                            console.log('data is updated');

                            showTopFloor(topFloor); // Update best score
                            console.log('top score is updated');

                            showCurrentFloor(playerFloor); // Update current floor
                            console.log('current floor is updated');
                            resetInputs(currentViewElevators);
                            openElevatorDoors(() => {
                                // Reset the value to false and allow key pressed
                                eventListenerAdded = false;
                            }); // Hide overlay with fade effect after data update
                            console.log('______________');

                            // Unselect the current input
                            inputElement.blur();
                        }, messageContent);

                        // Prevent default key behavior
                        event.preventDefault();
                    }
                } else {
                    // If key is not enter
                    // Reset the value to false and allow key pressed
                    eventListenerAdded = false;
                }
            } else {
                // Reset the value to false and allow key pressed
                eventListenerAdded = false;
            }
        });
    });
}

attachEnterKey(currentViewElevators);