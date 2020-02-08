"use strict";

const mongodb = require('mongodb');
const path = require('path');

const globals = require('./globals.js');
const common = require('./common.js');


let controller = {
  getDonations: function(req, res) {
    getDonations(req, res);
  },
  home: function(req, res) {
    res.sendFile(path.resolve('public/pages/index.html'));
  },
  hello: function(req, res) {
    res.send("Hello World!");
  },
}

function getDonations(req, res) {
  if (req.query.monthRange && req.query.candidateRange) {
    getDonationsRangeCandidateMonth(req, res);
  } else if (req.query.monthRange) {
    getDonationsRangeMonth(req, res);
  } else if (req.query.candidateRange) {
    getDonationsRangeCandidate(req, res);
  } else {
    getDonationsSingleInstance(req, res);
  }
}

function getDonationsRangeCandidateMonth(req, res) {
  const query = {
    "Date": {"$in": globals.monthList},
    "Candidate ID": {"$in": globals.mainCandidates},
    "Donation Type": "IND",
  }
  const client = new mongodb.MongoClient(globals.dbURL, {useNewUrlParser: true});
  client.connect(err => {
    const collection = client.db("Campaign_Finance").collection("RunningTotals");
    collection.find(query).toArray(function(err, result) {
      if (err) throw err;
      let ret = {};
      for (let i = 0; i < globals.monthList.length; i++) {
        let month = globals.monthList[i];
        ret[month] = {};
        for (let j = 0; j < globals.mainCandidates.length; j++) {
          let candidate = globals.mainCandidates[j];
          ret[month][candidate] = {};
          for (let k = 0; k < result.length; k++) {
            let r = result[k];
            ret[month][candidate][r["zip"]] = r["Amount"];
          }
        }
      }
      res.send(ret);
      client.close();
    });
  });
}

function getDonationsRangeCandidate(req, res) {
  const query = {
    "Date": new Date(req.query.dateString),
    "Candidate ID": {"$in": globals.mainCandidates},
    "Donation Type": "IND",
  }
  const client = new mongodb.MongoClient(globals.dbURL, {useNewUrlParser: true});
  client.connect(err => {
    const collection = client.db("Campaign_Finance").collection("RunningTotals");
    collection.find(query).toArray(function(err, result) {
      if (err) throw err;
      let ret = {};
      for (let i = 0; i < globals.mainCandidates.length; i++) {
        let candidate = globals.mainCandidates[i];
        ret [candidate] = {};
        for (let j = 0; j < result.length; j++) {
          let r = result[j];
          ret[candidate][r["zip"]] = r["Amount"];
        }
      }
      res.send(ret);
      client.close();
    })
  });
}

function getDonationsRangeMonth(req, res) {
  const query = {
    "Date": {"$in": globals.monthList},
    "Candidate ID": req.query.candidateID,
    "Donation Type": "IND",
  }
  const client = new mongodb.MongoClient(globals.dbURL, {useNewUrlParser: true});
  client.connect(err => {
    const collection = client.db("Campaign_Finance").collection("RunningTotals");
    collection.find(query).toArray(function(err, result) {
      if (err) throw err;
      let ret = {};
      for (let i = 0; i < globals.monthList.length; i++) {
        let month = globals.monthList[i];
        ret [month] = {};
        for (let j = 0; j < result.length; j++) {
          let r = result[j];
          ret[month][r["zip"]] = r["Amount"];
        }
      }
      res.json(ret);
      client.close();
    })
  });
}

function getDonationsSingleInstance(req, res) {
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
