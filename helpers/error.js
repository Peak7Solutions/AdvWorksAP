// Load the log to file module
let logToFileHelper = require('../helpers/logTofile');

// Error Helper
let errorHelper = {};

// Build error object for internal logging
errorHelper.buildError = function (err, req) {
  return {
    "status": 500,
    "statusText": 'Internal Server Error',
    "message": err.message,
    "stack": err.stack ?? 'n/a',
    "originalError": err,
    "requestInfo": {
      "hostname": req.hostname ?? 'Unknown',
      "path": req.path ?? 'Unknown'
    }
  };
}

// Log error information to console
errorHelper.errorToConsole =
  function (err, req, res, next) {
      // Build error object for logging
      let errObject = errorHelper.buildError(err, req);
      // Log error information to the console
      console.error(`Log Entry:${JSON.stringify(errObject)}`);
      console.error("*".repeat(80));
      // Pass error along to 'next' middleware
      next(err);
  }

// Last function in error middleware chain.
// Sends out the error object appropriate for
// consumers of Web API calls.
errorHelper.errorFinal = function (err, req, res, next) {
    res.status(500).send({
        "status": 500,
        "statusText": 'Internal Server Error',
        "message": `An error occured; please contact the system administrator.`
    });
}

// Log error information to a file
errorHelper.errorToFile = function (err, req, res, next) {
    // Build error object for logging
    let errorObject = errorHelper.buildError(err, req);
    // Write error information to a file
    logToFileHelper.error(errorObject, function (data) {
        // SUCCESS: Information was written
        console.log(data);
    }, function (err) {
        // ERROR: Write error to console
        console.error(err);
    });
    // ERROR: pass error along to the 'next' middleware
    next(err);
}


module.exports = errorHelper;

