"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const { NETWORK } = require(path.join(basePath, "constants/network.js"));
const fs = require("fs");

// console.log(path.join(basePath, "/src/config.js"));
const {
  baseUri,
  description,
  namePrefix,
  network,
  solanaMetadata,
} = require(path.join(basePath, "/src/config.js"));

// read json data
for (let index = 0; index < 10; index++) {
  let rawdata = fs.readFileSync(`${basePath}/build/json/${index}`);
  let item = JSON.parse(rawdata);

  if (network != NETWORK.sol) {
    item.image = `${baseUri}/${index}.png`;
  }
  fs.writeFileSync(
    `${basePath}/build/json/${index}`,
    JSON.stringify(item, null, 2)
  );
}

if (network != NETWORK.sol) {
  console.log(`Updated baseUri for images to ===> ${baseUri}`);
}
