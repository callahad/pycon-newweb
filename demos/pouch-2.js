#!/usr/bin/env node

var PouchDB = require('pouchdb');
var db = new PouchDB('mydb', { db: require('memdown') });

function test() {
  return db.post({'hello': 'world'})
           .then(function(result) { return db.get(result.id) })
           .then(function(doc) {
             console.log(doc);
             return db.remove(doc);
           })
           .then(function(deleted) {
             console.log("Deletion OK?", deleted.ok);
           })
           .catch(function (err) {
             console.error(err);
           });
}

console.log("--- Start");
test();
console.log("--- End");
