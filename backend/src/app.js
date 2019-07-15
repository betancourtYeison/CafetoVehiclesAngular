// Load modules express and body-parser
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');
var cors = require('cors');

// Initialize express app
var app = express();

// Initialize cors
app.use(cors());

// Configure body parser to convert request in JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Import routes
var routes = require('./api/routes'); 

// load routes
routes(app);

app.listen(config.PORT, function () {
    console.log(`Server is running in ${config.LOCAL_HOST}:${config.PORT}/`);
});