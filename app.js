const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware for CORS.
app.use(cors());

// Middleware for bodyparsing using both json and urlencoding.
app.use(bodyParser.urlencoded({  extended: true }));
app.use(bodyParser.json());

// Using 3000 as the port to listen to.
const port = 3000;

app.get('/', (req, res) => {
    /**
     * The root directory of the server.
     * Send back 'Root' because the directory shouldn't be available for use.
     */
    res.send('Root');
});

// Listen on port = 3000.
app.listen(port, () => {
   console.log(`Starting the server at port ${port}`);
});