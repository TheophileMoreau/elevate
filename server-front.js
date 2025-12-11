var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

// Middleware to handle non-static file requests
app.use((req, res, next) => {
    // Redirect all requests to index.html/?redirect=error
    res.redirect('/?redirect=error');
});

app.listen(8080, function () {
    console.log("Server is running on port 8080 !");
});