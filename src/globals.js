"use strict";

const MONTH_LIST = [
  new Date("2018-09-30"),
  new Date("2018-10-31"),
  new Date("2018-11-30"),
  new Date("2018-12-31"),
  new Date("2019-01-31"),
  new Date("2019-02-28"),
  new Date("2019-03-31"),
  new Date("2019-04-30"),
  new Date("2019-05-31"),
  new Date("2019-06-30"),
  new Date("2019-07-31"),
  new Date("2019-08-31"),
  new Date("2019-09-30"),
];

const MAIN_CANDIDATES = [
  "P60007168",
  "P00009621",
  "P80006117",
  "P00010298", 
  "P80000722"
]

const ex = {
  dbURL: "mongodb+srv://admin:admin@n-a-m-e-asvgv.mongodb.net/test?retryWrites=true&w=majority",
  monthList: MONTH_LIST,
  mainCandidates: MAIN_CANDIDATES,
};

module.exports = ex;
