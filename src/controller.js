"use strict";

const mongodb = require('mongodb');
const path = require('path');
const fs = require('fs');

const globals = require('./globals.js');
const common = require('./common.js');

const RANGE_CANDIDATE_MONTH_CACHE = './public/cache/donationsRangeCandidateMonth.json';
const RANGE_CANDIDATE_CACHE = './public/cache/donationsRangeCandidate';
const RANGE_MONTH_CACHE = './public/cache/donationsRangeMonth';
const SINGLE_INSTANCE_CACHE = './public/cache/donationsSingleInstance';

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
  console.log("Checking if file exists...")
  if (fs.existsSync(RANGE_CANDIDATE_MONTH_CACHE)) {
    console.log("Exists!");
    res.sendFile(path.resolve(RANGE_CANDIDATE_MONTH_CACHE));
    return;
  }
  console.log("Does not exist.");
  const query = {
    "Date": {"$in": globals.monthListMongoDB},
    "Candidate ID": {"$in": globals.mainCandidates},
    "Donation Type": "IND",
  }
  console.log("Creating Mongo client...");
  const client = new mongodb.MongoClient(globals.dbURL, {useNewUrlParser: true});
  client.connect(err => {
    console.log("Connected!")
    const collection = client.db("Campaign_Finance").collection("MonthlyRunningTotalsFlat");
    console.log("Searching for query...");
    collection.find(query).toArray(function(err, result) {
      console.log("Search complete!");
      if (err) throw err;
      let ret = {};
      console.log("Building return structure");
      for (let i = 0; i < globals.monthListMongoDB.length; i++) {
        let month = globals.monthListMongoDB[i];
        console.log("Processing date " + month);
        ret[month] = {};
        for (let j = 0; j < globals.mainCandidates.length; j++) {
          let candidate = globals.mainCandidates[j];
          ret[month][candidate] = {} ;
        }
      }
      for (let k = 0; k < result.length; k++) {
        let r = result[k];
        ret[r["Date"]][r["Candidate ID"]][r["zip"]] = r["Amount"];
      }
      console.log("Finishing building structure. Writing to file...");
      fs.writeFile(RANGE_CANDIDATE_MONTH_CACHE, JSON.stringify(ret), function(err) {
        if (err) throw err;
        console.log("Wrote to file!");
        res.sendFile(path.resolve(RANGE_CANDIDATE_MONTH_CACHE));
        client.close();
      });
    });
  });
}

function getDonationsRangeCandidate(req, res) {
  let filepath = RANGE_CANDIDATE_CACHE + "_" + req.query.dateString + ".json";
  console.log("Checking if file exists...");
  if (fs.existsSync(filepath)) {
    console.log("Exists!");
    res.sendFile(path.resolve(filepath));
    return;
  }
  const query = {
    "Date": new Date(req.query.dateString),
    "Candidate ID": {"$in": globals.mainCandidates},
    "Donation Type": "IND",
  }
  const client = new mongodb.MongoClient(globals.dbURL, {useNewUrlParser: true});
  client.connect(err => {
    const collection = client.db("Campaign_Finance").collection("MonthlyRunningTotalsFlat");
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
      console.log("Finishing building structure. Writing to file...");
      fs.writeFile(filepath, JSON.stringify(ret), function(err) {
        if (err) throw err;
        console.log("Wrote to file!");
        res.sendFile(path.resolve(filepath));
        client.close();
      });
    });
  });
}

function getDonationsRangeMonth(req, res) {
  let filepath = RANGE_MONTH_CACHE + "_" + req.query.candidateID + ".json";
  console.log("Checking if file exists...");
  if (fs.existsSync(filepath)) {
    console.log("Exists!");
    res.sendFile(path.resolve(filepath));
    return;
  }
  const query = {
    "Date": {"$in": globals.monthListMongoDB},
    "Candidate ID": req.query.candidateID,
    "Donation Type": "IND",
  }
  const client = new mongodb.MongoClient(globals.dbURL, {useNewUrlParser: true});
  client.connect(err => {
    const collection = client.db("Campaign_Finance").collection("MonthlyRunningTotalsFlat");
    collection.find(query).toArray(function(err, result) {
      if (err) throw err;
      let ret = {};
      for (let i = 0; i < globals.monthListMongoDB.length; i++) {
        let month = globals.monthListMongoDB[i];
        ret [month] = {};
        for (let j = 0; j < result.length; j++) {
          let r = result[j];
          ret[month][r["zip"]] = r["Amount"];
        }
      }
      fs.writeFile(filepath, JSON.stringify(ret), function(err) {
        if (err) throw err;
        console.log("Wrote to file!");
        res.sendFile(path.resolve(filepath));
        client.close();
      });
    });
  });
}

function getDonationsSingleInstance(req, res) {
  let filepath = SINGLE_INSTANCE_CACHE + "_" + req.query.dateString + "_" + req.query.candidateID + ".json";
  console.log("Checking if file exists...");
  if (fs.existsSync(filepath)) {
    console.log("Exists!");
    res.sendFile(path.resolve(filepath));
    return;
  }
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
      fs.writeFile(filepath, JSON.stringify(ret), function(err) {
        if (err) throw err;
        console.log("Wrote to file!");
        res.sendFile(path.resolve(filepath));
        client.close();
      });
    });
  });
}

module.exports = controller;
