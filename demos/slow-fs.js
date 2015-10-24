// Adds a 3 second delay to fs.readFile and fs.readFileSync

var fs = require('fs');
var sleep = require('sleep');

exports.readFile = function(fname, encoding, callback) {
  setTimeout(fs.readFile.bind(fs, fname, encoding, callback), 3000);
}

exports.readFileSync = function(fname, encoding) {
  sleep.sleep(3);
  return fs.readFileSync(fname, encoding);
}
