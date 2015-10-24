#!/usr/bin/env babel-node

var bluebird = require('bluebird');
var express = require('express');
var fs = require('./slow-fs');
var morgan = require('morgan');
var path = require('path');

// Helpers
var FILE_PATH = path.join(__dirname, "static", "alice.txt");

var readFilePromise = bluebird.promisify(fs.readFile);

function logged(handler) {
  return function(req, res) {
    console.log("--- Entered handler for", req.path);
    handler(req, res);
    console.log("--- Exited handler for", req.path);
  }
}

// Setup
var app = express();
app.use(morgan('dev'));
app.use("/static", express.static(__dirname + "/static"));

// Routes
app.get('/', function (req, res) {
  res.send('Hello, world!');
});

app.get('/foo', logged(function (req, res) {
  var data = fs.readFileSync(FILE_PATH, 'utf-8');
  res.send('Read ' + data.length + ' bytes');
}));

app.get('/bar', logged(function (req, res) {
  fs.readFile(FILE_PATH, 'utf-8', function(err, data) {
    res.send('Read ' + data.length + ' bytes');
  });
}));

app.get('/baz', logged(function (req, res) {
  readFilePromise(FILE_PATH, 'utf-8')
    .then(data => res.send('Read ' + data.length + ' bytes'))
}));

app.get('/qux', logged(async function (req, res) {
  var data = await readFilePromise(FILE_PATH, 'utf-8');
  res.send('Read ' + data.length + ' bytes');
}));

app.get('/:filename.json', function(req, res) {
  var doc = { 'file': req.params.filename };
  setTimeout(() => res.json(doc), Math.random() * 1000);
});

// Run
app.listen(3000);
console.log("Listening on port 3000");
