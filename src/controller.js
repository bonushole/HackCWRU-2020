"use strict";

const mongodb = require('mongodb');
const fs = require('fs');

const globals = require('./globals.js');
const common = require('./common.js');
const zips = require('./zipToCoords.js');

//var zipToCoords = zips;

//console.log(zipToCoords.getCoordsFromZip(44107));

let controller = {
  getDonations: function(req, res) {
    getDonations(req, res);
  },
  hello: function(req, res) {
    res.send("Hello World!");
  },
}

function getDonations(req, res) {
  const query = {
    "Date": new Date(req.query.dateString),
    "Candidate ID": req.query.candidateID,
    "Donation Type": "IND",
  }
  const client = new mongodb.MongoClient(globals.dbURL, {useNewUrlParser: true});
  client.connect(err => {
    const collection = client.db("Campaign_Finance").collection("RunningTotals");
    collection.find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      let ret = {};
      for (let i = 0; i < result.length; i++) {
        let r = result[i];
        ret[r["zip"]] = r["Amount"];
      }
      res.send(ret);
      client.close()
    });
  });
}

module.exports = controller;
