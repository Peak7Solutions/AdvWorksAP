// Load SQL Server Module
let sqlServer = require('mssql');

// Load the config module
const config = require('config');

// Get connection string from config file
let connectString = config.get('connectString');

// SQL Server Helper
let db = {};

/***
 * Submit SQL query with/without parameters
 * SELECT * FROM Product
 * [WHERE ProductID = @ProductID]
 * OPTIONAL: Pass array of parameter objects
 * { "name": 'ProductID',
 *   "type": sqlServer.Int,
 *   "value": 706 }
 */
db.submit = async function (sql, params, resolve, reject) {
    try {
        // Connect to SQL Server
        await sqlServer.connect(connectString);
        // Create Request object
        let request = new sqlServer.Request();
        // Are there parameters to submit? 
        if (params) {
            // Create parameters
            params.forEach( param => {
                request.input(param.name, param.type, param.value);
            });
        }

        // Submit SQL query
        const result = await request.query(sql);
        // SUCCESS: Invoke reject() callback
        // Return recordset(s)
        resolve(result);
    } catch (err) {
        // ERROR: Invoke reject() callback
        reject(err);
    }
}

module.exports = db;