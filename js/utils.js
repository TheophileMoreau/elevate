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