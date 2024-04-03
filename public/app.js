console.log('The app.js file is loaded')

import { addTitlePage } from './js/loadingPage.js';
import { addMobilePage } from './js/mobilePage.js';
import { addConnectPage, ws } from './js/connectPage.js';

// Select the main game container
const container = document.getElementById('gameContainer');

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
    addMobilePage(container);
}
else if (displayLoadingPage) { // Skip the loading page 
    addTitlePage(container);
}
// Otherwise, go to connect page
else {
    addConnectPage(container);
}