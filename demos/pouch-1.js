#!/usr/bin/env node

var PouchDB = require('pouchdb');
var db = new PouchDB('mydb', { db: require('memdown') });

function test() {
  db.post({'hello': 'world'}, function(err, result) {
    if (err) {
      console.error(err);
    } else {
      db.get(result.id, function(err, doc) {
        if (err) {
          console.error(err);
        } else {
          console.log(doc);
          db.remove(doc, function(err, deleted) {
            if (err) {
              console.error(err);
            } else {
              console.log("Deletion OK?", deleted.ok);
            }
          });
        }
      });
    }
  });
}

console.log("--- Start");
test();
console.log("--- End");
