#!/usr/bin/env babel-node

var PouchDB = require('pouchdb');
var db = new PouchDB('mydb', { db: require('memdown') });

async function test() {
  try {
    var result = await db.post({'hello': 'world'});
    var doc = await db.get(result.id);
    console.log(doc);
    var deleted = await db.remove(doc);
    console.log("Deletion OK?", deleted.ok);
  } catch (err) {
    console.error(err);
  }
}

console.log("--- Start");
test();
console.log("--- End");
