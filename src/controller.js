"use strict";

const globals = require('./globals.js');
const common = require('./common.js');
const zips = require('./zipToCoords.js');

//var zipToCoords = zips;

//console.log(zipToCoords.getCoordsFromZip(44107));

let controller = {
  getAllDonations: function(req, res) {
    getAllDonations(req, res);
  },
  hello: function(req, res) {
    res.send("Hello World!");
  },
}

function getAllDonations(req, res) {
  mongodb.MongoClient.connect(globals.dbURL, function(err, db) {
    if (err) throw err;
    let dbo = db.db("OUR-DB-NAME-HERE");
    let samurai = dbo.collection("OUR-COLLECTION-NAME-HERE");
    samurai.find({}).toArray(function(err, result) {
      db.close();
      if (err) throw err;
      let r = result.map(function (s) {
        s = common.removePrivateVariables(s);
        return s;
      });
      res.send(r);
    });
  })
}

function getAllZipCodes(req, res) {

  
  
}

module.exports = controller;
