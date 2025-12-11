// UTILS FUNCTIONS

const fs = require('fs');
const path = require('path');

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

// Elevators distribution infos :
var mean = 50; // Mean of the normal distribution
var standardDeviation = 13; // Standard deviation of the normal distribution
var minValue = 0; // Minimum allowed value
var maxValue = 100; // Maximum allowed value

// Number of elevators we want :
var numberOfElevators = 250; // Total number of elevators created

// Function to create n elevators with normally distributed breaking point and current floor :
function generateElevators(numberOfElevators = 250) {
    var elevators = [];
    for (var i = 0; i < numberOfElevators; i++) {
        var breakingPoint = randomNormal(mean, standardDeviation, minValue, maxValue); // Random breaking point
        var currentPosition = minValue; // On start, all elevators are on the lowest floor
        var totalFloors = currentPosition; // Total of floors done by the elevator so far --> ups and downs count as different
        var isInUse = false; // Is the elevator currently in use
        var hue = Math.floor(Math.random() * 360); // Random hue (0-360)
        var saturation = Math.floor(Math.random() * 101); // Random saturation (0-100)
        elevators.push({
            id: i + 1,
            currentPosition: currentPosition,
            totalFloors: totalFloors,
            breakingPoint: breakingPoint,
            isInUse: isInUse,
            hue: hue,
            saturation: saturation });
    }
    return elevators;
}

// Load the base file
const jsonFilePath = path.join(__dirname, 'data', 'base-elevators.json');

// Check if the file exists
if (fs.existsSync(jsonFilePath)) {
    console.log('File exists.');
} else {
    console.log('File does not exist. Generating...');
    // Generate our elevators array
    elevatorsState = generateElevators(numberOfElevators);

    // Convert JavaScript object to JSON string
    const jsonData = JSON.stringify(elevatorsState, null, 2); // The null and 2 are for formatting the JSON with indentation

    // Write JSON string to a file
    fs.writeFile('data/base-elevators.json', jsonData, (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
            return;
        }
        console.log('JSON file has been saved.');
    });
}