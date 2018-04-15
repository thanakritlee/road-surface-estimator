const express = require('express');
const app = express();

// Serve only the static files from the dist directory.
// The dist directory is where Angular builds the Angular project files to.
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port.
app.listen(process.env.PORT || 8080);