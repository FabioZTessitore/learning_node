// Store data in file

// Usage:
// 
// $ node index.js add Learn Node
// -> Saved
//
// $ node index.js list
// -> Learn Node

const path = require('path');
const fs = require('fs');

const args = process.argv.splice(2);
const command = args.shift();
const task = args.join(' ');

const file = path.resolve(process.cwd(), './tasks');

const usage = "\n\nUsage:\n\
$ node index.js add Learn Node\n\
-> Saved\n\
\n\
$ node index.js list\n\
-> Learn Node\n\
";

switch (command) {
    case 'list':
        listItems(file);
        break;
    case 'add':
        addItem(file, task)
        break;
    default:
        console.log(usage);
}

function listItems(filename) {
    loadItems(filename, function (tasks) {
        tasks.forEach( function (task) {
            console.log('-> ', task);
        });
    });
}

function addItem(filename, task) {
    loadItems(filename, function (tasks) {
        tasks.push(task);
        writeItems(filename, tasks);
    });
}

function loadItems(filename, cb) {
    let tasks = [];

    fs.readFile(filename, 'utf8', function (err, data) {
        // If the file doesn't exist, don't raise an error
        // so addItem() can work properly.
        if (err) return cb([]);

        tasks = JSON.parse(data.toString() || '[]');
        cb(tasks);
    })
}

function writeItems(filename, tasks) {
    fs.writeFile(filename, JSON.stringify(tasks), 'utf8', function (err) {
        if (err) throw err;

        console.log('-> Saved');
    })
}