// Load the node file system module
const fs = require('fs');

// Path/file name to the product data
const DATA_FILE = './db/product.json';

// Product repository object
let repo = exports = module.exports = {};

// Retrieve an array of product objects
repo.get = function (resolve, reject) {
    // Read from the file
    fs.readFile(DATA_FILE, function (err, data) {
        if (err) {
            // ERROR: invoke reject() callback
            reject(err);
        }
        else {
           // SUCCESS: Convert data to JSON
           let prodcuts = JSON.parse(data);
           // Invoke resolve() callback
           resolve(prodcuts); 
        }
    });
}

repo.getById = function (id, resolve, reject) {
    fs.readFile(DATA_FILE, function (err, data) {
        if (err) {
            // ERROR: invoke reject() callback
            reject(err);
        }
        else {
            // SUCCESS: Convert data to JSON
            let products = JSON.parse(data);
            // Find the row by productID
            let product = products.find(
                row => row.productID == id);
            // Invoke resolve() callback
            // product is 'undefined' if not found
            resolve(product);
        }
    });
}

repo.search = function (search, resolve, reject) {
    if (search) {
        fs.readFile(DATA_FILE, function (err, data) {
            if (err) {
                // ERROR: invoke reject() callback
                reject(err);
            }
            else {
                // SUCCESS: Convert data to JSON
                let products = JSON.parse(data);
                // Perform the search
                products = products.filter(
                    row => (search.name ? row.name.toLowerCase().indexOf (
                        search.name.toLowerCase())
                        >= 0 : true) &&
                        (search.listPrice ? parseFloat(row.listPrice) > parseFloat(search.listPrice) : true));
                // Invoke resolve() callback
                // Empty array if no records match
                resolve(products);    
            }
        });
    }
}

// Insert a new product object
repo.insert = function (newData, resolve, reject) {
    fs.readFile(DATA_FILE, function (err, data) {
        if (err) {
            // ERROR: Invoke reject() callback
            reject(err);
        }
        else {
            // SUCCESS: convert data to JSON
            let products = JSON.parse(data);
            // Add new product to array
            products.push(newData);
            // Stringify the product array
            // Save array to the file
            fs.writeFile(DATA_FILE, 
                JSON.stringify(products),
                function (err) {
                    if (err) {
                        // ERROR: Invoke reject() callback
                        reject(err);
                    }
                    else {
                        // SUCCESS: Invoke resolve() callback
                        resolve(newData);
                    }
                }
            );
        }
    });
}

// Update an existing product object
repo.update = function (changedData, id, resolve, reject) {
    fs.readFile(DATA_FILE, function (err, data) {
        if (err) {
            // ERROR: Invoke reject() callback
            reject(err);
        }
        else {
            // SUCCESS: Convert to JSON
            let products = JSON.parse(data);
            // Find the product to update
            let product = products.find(row => row.productID == id);
            if (product) {
                // Move changed data into corresponding properties of the existing object
                Object.assign(product, changedData);
                // Stringify the product array
                // Save array to the file
                fs.writeFile(DATA_FILE, JSON.stringify(products), function (err) {
                    if (err) {
                        // ERROR: Invoke reject() callback
                        reject(err);
                    }
                    else {
                       // SUCCESS: Invoke resolve() callback
                       resolve(product); 
                    }
                });
            }
        }
    });
}

repo.delete = function (id, resolve, reject) {
    fs.readFile(DATA_FILE, function (err, data) {
        if (err) {
            // ERROR: Invoke reject() callback
            reject(err);
        }
        else {
            // SUCCESS: Convert data to JSON
            let products = JSON.parse(data); 
            // Find product to delete
            let index = products.findIndex(
                row => row.productID == id);
            if (index != -1) {
                // Remove row from array
                products.splice(index, 1);
                fs.writeFile(
                    DATA_FILE
                    , JSON.stringify(products)
                    , function (err) {
                        if (err) {
                            // ERROR: Invoke reject() callback
                            reject(err);
                        }
                        else {
                            // SUCCESS: Invoke resolve() callback
                            resolve(index);
                        }
                    }
                );
            }
        }
    });
}