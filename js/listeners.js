// LISTENERS FUNCTIONS

// Attach click event listeners to elevator buttons
function attachEventListeners(elevators) {
    console.log('Attaching event listeners');
    elevators.forEach(function (elevator) {
        var addButton = document.getElementById('elevator' + elevator.id + '-button');
        addButton.addEventListener('click', function () {

            var buttons = document.querySelectorAll('button');
            // Disable all buttons
            buttons.forEach(function (button) {
                button.disabled = true;
            });

            // Show overlay with fade effect and update data while the screen is black
            closeElevatorDoors(function () {
                var elevatorData = fetchCurrentElevatorsData(elevator.id, currentViewElevators); // See what interaction it does
                if (elevatorData) {
                    elevatorInteractions(elevatorData, 100);
                } else {
                    // Handle the case when elevator data is not found
                    console.log("Elevator data not found for id:", elevator.id);
                }
                openElevatorDoors(); // Hide overlay with fade effect after data update
                console.log('______________');
            });
        });
    });
}

// Call the attachEventListeners function after elevators are populated
attachEventListeners(currentViewElevators);


// Attach click event listeners to elevator buttons
function attachInputElements(elevators) {
    console.log('Attaching Inputs listeners');

    elevators.forEach(function (elevator) {

        // Get the input element
        var inputElement = document.getElementById('elevator' + elevator.id + '-input');

        // Add event listener to the input field
        inputElement.addEventListener('input', function (event) {
            // Get the new value entered by the user
            const newValue = parseInt(event.target.value);

            console.log('on est la hein');
            var elevatorRestToTop = fetchCurrentElevatorsData(elevator.id, currentViewElevators);
            console.log('on est la deux');
            console.log(elevatorRestToTop);

            // If the new value exceeds the maximum allowed value, set it to the maximum
            if (newValue > maxValue - elevatorRestToTop) {
                event.target.value = maxValue - elevatorRestToTop;
            }

            // If the new value is negative, set it to 0
            if (newValue < 0) {
                event.target.value = 0;
            }

            // Now the input value is within the desired range (0 to 1000 minus the elevator's current level)
        });
    });
}

attachInputElements(currentViewElevators);