"use strict";

const globals = require('./globals.js');
const common = require('./common.js');
const zips = require('./zipToCoords.js');

//var zipToCoords = zips;

//console.log(zipToCoords.getCoordsFromZip(44107));

const mongodb = require('mongodb');

let controller = {
  getAllDonations: function(req, res) {
    getAllDonations(req, res);
  },
  hello: function(req, res) {
    res.send("Hello World!");
  },
}

function getAllDonations(req, res) {
  const client = new mongodb.MongoClient(globals.dbURL, {useNewUrlParser: true});
  client.connect(err => {
    const collection = client.db("Campaign_Finance").collection("RunningTotals");
    const query = {
      "Date": new Date ("2019-09-29"), 
      "Candidate ID": {"$regex": "P.*"},
    }
    collection.find(query).toArray(function(err, result) {
      if (err) throw err;
      let r = result.map(function(s) {
        s = common.removePrivateVariables(s);
        return s;
      });
      res.send(r);
      client.close();
    });
  });
}

function getAllZipCodes(req, res) {

  
  
}
module.exports = controller;
