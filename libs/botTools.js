const fs = require('fs');
const types = require('../src/json/types.json');

function addToLogs(message) {
    fs.appendFile('./logs/logs.txt', message + "\n", err => {
        if (err) {
            console.log(err);
        }
    });
}

function getTypes(code) {
    return types[code];
}

module.exports = { addToLogs, getTypes };