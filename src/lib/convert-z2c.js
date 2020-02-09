"use strict";

const fs = require('fs');
const path = require('path');

// console.log(__dirname);
let oldStruct = JSON.parse(fs.readFileSync(path.resolve('../../public/js/zips-to-coords.json'), 'utf-8'));
// console.log(oldStruct);
let newStruct = {};
for (let i = 0; i < oldStruct.length; i++) {
  let instance = oldStruct[i];
  console.log(instance["loc"]);
  newStruct[instance["zip_code"]] = instance["loc"];
}
console.log(newStruct);
fs.writeFileSync("z2c.json", JSON.stringify(newStruct));