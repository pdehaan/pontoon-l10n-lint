"use strict";

const pontoonql = require("pontoonql");
const diff = require("simple-array-diff");

module.exports = {
  lint,
  listToArray
};

async function lint(project, pct = 80, prodLocales = [], extraLocales = []) {
  if (!Array.isArray(prodLocales)) {
    prodLocales = listToArray(prodLocales);
  }
  if (!Array.isArray(extraLocales)) {
    extraLocales = listToArray(extraLocales);
  }
  if (typeof pct === "string") {
    pct = parseInt(pct, 10);
  }

  try {
    const currentSupportedLocales = await pontoonql(project, pct)
      .then(res => res.map(item => item.locale.code).concat(extraLocales).sort());
    const res = diff(currentSupportedLocales, prodLocales);
    res.common = res.common.join(",");
    return res;
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  }
}

function listToArray(list) {
  return list
    .split(",")
    .map(item => item.trim())
    .sort();
}
