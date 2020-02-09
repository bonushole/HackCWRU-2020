"use strict";

const MONTH_LIST = [
  new Date("2018-10-01 01:00:00.00"),
  new Date("2018-11-01 01:00:00.00"),
  new Date("2018-12-01 01:00:00.00"),
  new Date("2019-01-01 01:00:00.00"),
  new Date("2019-02-01 01:00:00.00"),
  new Date("2019-03-01 01:00:00.00"),
  new Date("2019-04-01 01:00:00.00"),
  new Date("2019-05-01 01:00:00.00"),
  new Date("2019-06-01 01:00:00.00"),
  new Date("2019-07-01 01:00:00.00"),
  new Date("2019-08-01 01:00:00.00"),
  new Date("2019-09-01 01:00:00.00"),
];

const MAIN_CANDIDATES = [
  "P60007168",
  "P00009621",
  "P80006117",
  "P00010298", 
  "P80000722",
]

const ex = {
  dbURL: "mongodb+srv://admin:admin@n-a-m-e-asvgv.mongodb.net/test?retryWrites=true&w=majority",
  monthList: MONTH_LIST,
  mainCandidates: MAIN_CANDIDATES,
};

module.exports = ex;
