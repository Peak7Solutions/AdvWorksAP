// Load the express module
const express = require('express');

// Create an instance of express
const app = express();

// Create an instance of a Router
const router = express.Router();

// Configure JSON parsing in body of request object
app.use(express.json());

// Set 'production' modev
//process.env["NODE_ENV"] = "production";

// load the config module
const config = require('config');

// Get host server address
const host = config.get('host');
// Get prefix fro all API calls
const prefix = config.get('prefix');
// Specify the port to use for this server
const port = config.get('port');

// Load error helper module
const errorHelper = require('./helpers/error');

// Configure CORS
const corsHelper = require('./helpers/cors');
corsHelper.configure(app);

// Mount routes from modules
router.use('/product', require('./routes/product'));

// Configure router so all routes are prefixed with /api
app.use(prefix, router);

// Configure exception logger to console
app.use(errorHelper.errorToConsole);

// Configure exception logger to file
app.use(errorHelper.errorToFile);

// Configure final exception middleware
app.use(errorHelper.errorFinal);



// Create web server to listen on the specified port
let server = app.listen(port, function(){
    console.log(`AdvWorksAPI server is running on ${host}: ${port}.`);
});
