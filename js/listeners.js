// LISTENERS FUNCTIONS

// Attach click event listeners to elevator inputs
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
            var elevatorRestToTop = maxValue - fetchCurrentElevatorsData(elevator.id, currentViewElevators).currentPosition;
            console.log('on est la deux');
            console.log(elevatorRestToTop);

            // If the new value exceeds the maximum allowed value, set it to the maximum
            if (newValue > elevatorRestToTop) {
                event.target.value = elevatorRestToTop;
            }

            // If the new value is negative, set it to 0
            if (newValue < 0) {
                event.target.value = 0;
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
            console.log('current input value :', currentValue);

            console.log('lets remove');
            currentValue--; // Remove to input value

            // If the decremented value is negative, set it to 0
            if (currentValue < 0) {
                currentValue = 0;
            }

            // Update the input value
            inputElement.value = currentValue;
            console.log('downgraded input value : ', inputElement.value);
        });

        // Add event listener to the plus button
        plusButton.addEventListener('click', function () {

            // Get the current input
            var inputElement = document.getElementById('elevator' + elevator.id + '-input');
            var currentValue = inputElement.value;
            console.log('current input value :', currentValue);

            console.log('lets add');
            currentValue++; // Add to input value

            var elevatorRestToTop = maxValue - fetchCurrentElevatorsData(elevator.id, currentViewElevators).currentPosition;

            // If the new value exceeds the maximum allowed value, set it to the maximum
            if (currentValue > elevatorRestToTop) {
                currentValue = elevatorRestToTop;
            }

            // Update the input value
            inputElement.value = currentValue;
            console.log('increased input value : ', inputElement.value);
            console.log(inputElement);
        });
    });
}

attachPlusMinusButtons(currentViewElevators);


// Attach click event listeners to go to button
function attachGotoButtons(elevators) {
    console.log('Attaching Go To listeners');

    elevators.forEach(function (elevator) {

        // Get the buttons
        var gotoButton = document.getElementById('elevator' + elevator.id + '-gotobutton');

        // Add event listener to the minus button
        gotoButton.addEventListener('click', function () {

            // Get the current input
            var inputElement = document.getElementById('elevator' + elevator.id + '-input');
            var currentValue = inputElement.value;

            var buttons = document.querySelectorAll('button');
            // Disable all buttons
            buttons.forEach(function (button) {
                button.disabled = true;
            });

            // Show overlay with fade effect and update data while the screen is black
            closeElevatorDoors(function () {
                var elevatorData = fetchCurrentElevatorsData(elevator.id, currentViewElevators); // See what interaction it does
                if (elevatorData) {
                    elevatorInteractions(elevatorData, currentValue);
                } else {
                    // Handle the case when elevator data is not found
                    console.log("Elevator data not found for id:", elevator.id);
                }
                resetInputs(currentViewElevators);
                openElevatorDoors(); // Hide overlay with fade effect after data update
                console.log('______________');

            });
        });
    });
}

attachGotoButtons(currentViewElevators);