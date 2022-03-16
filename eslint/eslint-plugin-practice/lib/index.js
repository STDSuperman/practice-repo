/**
 * @fileoverview none
 * @author eslint-practice
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
const rules = requireIndex(__dirname + "/rules");

module.exports = {
  rules,
  configs: {
    customConfig: {
      plugins: ["custom-collection"],
      rules: {
        "custom-collection/no-console": 2
      }
    }
  }
}