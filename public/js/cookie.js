// Check cookies
var cookies = document.cookie;

if (!cookies) { // If empty
    cookies = '{}'; // Empty JSON
}
var parsedCookies = JSON.parse(cookies);

if (!parsedCookies.clientId) {
    parsedCookies.clientId = '';
}

cookies = JSON.stringify(parsedCookies);
document.cookie = cookies;

console.log('Current cookie is ', document.cookie);