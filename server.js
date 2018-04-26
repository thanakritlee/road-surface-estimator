const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const area_calculation = require('./controllers/area_calculation');
const cors = require('cors');


// Serve only the static files from the dist directory.
// The dist directory is where Angular builds the Angular project files to.
app.use(express.static(__dirname + '/dist'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode.
    res.sendFile('index.html', { root: __dirname });
});

// Middleware for CORS.
/**
 * Cross-Origin Resource Sharing
 * Is a machanism that allows restricted resources (e.g. fonts) on
 * a web page to be requested from another domain outside the domain
 * from which the first resource was served.
 * 
 * Use cors for serving styles and html from the server.
 */
app.use(cors());

// Middleware for bodyparsing using both json and urlencoding.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Using 8080 as the port to listen to in development mode.
const port = 8080;

app.get('/', (req, res) => {
    /**
     * The root directory of the server.
     * Send back 'Root' because the directory shouldn't be available for use.
     */
    res.send('Root');
});

// Route the calculation api to the calculation route controller.
app.use('/api/area_calculation', area_calculation);

// Start the app by listening on the default Heroku port.
app.listen(process.env.PORT || port, () => {
    console.log(`Starting Express.js server at port ${[port]}`);
});