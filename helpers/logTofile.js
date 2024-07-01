// Bring in node file system module
let fs = require('fs');

// Setup path/file name to store log info
const ERROR_FILE = './logs/error-log.txt';

// Log information to a file
let logToFileHelper = {};

// Write error information to log file
logToFileHelper.error = function (data, resolve, reject) {
    let toWrite = `
        ${"*".repeat(80)}
        Date/Time: ${new Date().toJSON()}
        Exception Info: ${JSON.stringify(data)}
        ${"*".repeat(80)} `;

  // Write error to log file
  fs.appendFile(ERROR_FILE, toWrite,
      function (err) {
          if (err) {
              // ERROR: Invoke reject() callback
              reject(err);
          }
          else {
              // SUCCESS: Invoke resolve() callback
              resolve(true);
          }
      });
}

module.exports = logToFileHelper;
