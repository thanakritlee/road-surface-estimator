const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware for CORS.
app.use(cors());

// Middleware for bodyparsing using both json and urlencoding.