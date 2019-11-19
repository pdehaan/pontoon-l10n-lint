#!/usr/bin/env node

"use strict";

const cfg = require("./cfg");
const lib = require("./lib");

// If `--init` flag was specified, write out the current schema (minus some goofy props) to STDOUT,
// which is helpful for re-piping to a config file. For example: `npm conviction --init > ./config.json`.
// NOTE: This flag will immediately exit with a zero status code.
if (cfg.init) {
  const schema = {...cfg};
  delete schema.init;
  console.log(JSON.stringify(schema, null, 2));
  process.exit(0);
}

main();

async function main() {
  const res = await lib.lint(cfg.pontoon.project, cfg.pontoon.minPct, cfg.productionLocales, cfg.extraLocales);
  console.log(res);
}
