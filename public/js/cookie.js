// Check cookies
var cookies = document.cookie;
console.log('cookies: ',cookies);

if (!cookies) { // If empty
    cookies = '{}'; // Empty JSON
}
var parsedCookies = JSON.parse(cookies);

if (!parsedCookies.clientId) {
    parsedCookies.clientId = '';
}

cookies = JSON.stringify(parsedCookies);
document.cookie = cookies;