"use strict";

const ex = {
  removePrivateVariables: removePrivateVariables,
  returnErrorJSON: returnErrorJSON,
  checkNonNullURLParameters: checkNonNullURLParameters,
};

function removePrivateVariables(obj) {
  for (let key in obj) {
    if (key.startsWith("_")) {
      delete obj[key];
    }
  }
  return obj;
}

function returnErrorJSON(res) {
  res.status(400).json({}).end();
}

function checkNonNullURLParameters(req, array) {
  let ret = {};
  for (let elem of array) {
    let retElem = req.query[elem];
    if (retElem == null) {
      return {};
    }
    ret[elem] = retElem;
  }
  return ret;
}

module.exports = ex;
