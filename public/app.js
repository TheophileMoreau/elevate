console.log('The app.js file is loaded')

import { addTitlePage } from './js/titlePage.js';
import { addMobilePage } from './js/mobilePage.js';
import { addConnectPage } from './js/connectPage.js';
import { addGamePage } from './js/gamePage.js';

// Function to handle navigation
export function navigateTo(route) {
    // Update content based on the route
    if (route === 'title') {
        addTitlePage(true);
    } else if (route === 'connect') {
        addConnectPage();
    } else if (route === 'game') {
        addGamePage();
    } else if (route === 'mobile') {
        addMobilePage();
    } else {
        addTitlePage(false); // Default (only title)
    }
}

let container = null;

document.addEventListener("DOMContentLoaded", function () {
    // Select the main game container
    container = document.getElementById('gameContainer');

    // Used to check if Mobile user
    function isMobileDevice() {
        console.log(navigator.userAgent);

        // Check user agent for common mobile device strings
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Check screen width to determine if the device is a tablet
        const isTablet = window.innerWidth <= 512; // Adjust the width threshold as needed

        // Return true if either the user agent indicates a mobile device or the screen width is small
        return isMobile || isTablet;
    }

    var displayLoadingPage = false;

    // Check if the user is on a mobile device
    if (isMobileDevice()) {
        navigateTo('mobile');
    }
    else if (displayLoadingPage) { // Skip the loading page boolean 
        navigateTo('title')
    }
    // Otherwise, go to connect page
    else {
        navigateTo('connect')
    }
});

export { container };