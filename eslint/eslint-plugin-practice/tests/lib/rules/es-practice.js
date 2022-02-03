/**
 * @fileoverview none
 * @author eslint-practice
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/es-practice"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("es-practice", rule, {
  valid: [
    {
      code: 'console.info("哈哈")',
      options: [['info']]
    }
  ],

  invalid: [
    {
      code: 'console.log("哈哈哈")',
      errors: [{ message: "error: should remove console"}],
    },
  ],
});
