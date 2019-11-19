"use strict";

const convict = require("convict");

const config = convict({
  pontoonConfig: {
    doc: "Path to config file. NOTE: Sample config can be generated using the `--init` arg.",
    format: String,
    default: undefined,
    env: "PONTOON_CONFIG",
    arg: "pontoonConfig"
  },
  init: {
    doc: "Pipe sample config file to STDOUT.",
    format: Boolean,
    default: false,
    arg: "init"
  },
  pontoon: {
    project: {
      doc: "Name of the project on Pontoon.",
      format: String,
      default: "",
      env: "PONTOON_PROJECT",
      arg: "pontoonProject"
    },
    minPct: {
      doc: "Minimum Pontoon translation percentage to be considered for enabling on production.",
      format: "int",
      default: 80,
      env: "PONTOON_MIN_PCT",
      arg: "pontoonMinPct"
    }
  },
  productionLocales: {
    doc: "An array of locales currently supported on production.",
    format: Array,
    default: [],
    env: "PRODUCTION_LOCALES",
    arg: "productionLocales"
  },
  extraLocales: {
    doc: "An array of locales supported on production, but not in Pontoon.",
    format: Array,
    default: [],
    env: "EXTRA_LOCALES",
    arg: "extraLocales"
  }
});

// If specified, load the specified config file.
const pontoonConfig = config.get("pontoonConfig");
if (pontoonConfig) {
  config.loadFile(pontoonConfig);
}

config.set("pontoonConfig", undefined);
config.validate({ allowed: "strict" });

const schema = config.getProperties();

module.exports = schema;
