// Load CORS module
const cors = require('cors');

/**
 * CORS Configuration Helper
 * @reference
 * https://expressjs.com/en/resources/middleware/cors.html
 */
let corsHelper = {};

/**
* Configure CORS usage
*/
corsHelper.configure = function (app) {
    // Enable CORS for all requests
    // app.use(cors());

    // Enable CORS for only one domain
    let options = {
        "origin": "http://localhost:3010"
    };

    // Enable CORS for only one domain
    // and only certain verbs
    // let options = {
    //     "origin": "http://localhost:3010", "methods": "GET,POST"
    // };

    // Pass options to cors() method
    app.use(cors(options));
}

module.exports = corsHelper;
