/**
 * @fileoverview none
 * @author eslint-practice
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "disable console",
      category: "Fill me in",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [{
      type: "array",
      items: { type: "string" }
    }], // Add a schema if the rule has options
  },

  create(context) {
    const logMethods = [
      'log',
      'info',
      'warn',
      'error'
    ]

    return {
      CallExpression(node) {
        const options = context.options[0];
        const disabledMethods = Array.isArray(options)
          ? logMethods.filter(opt => !options.includes(opt))
          : logMethods;
        const methodObjName = node.callee.object.name;
        if (methodObjName !== 'console') return true;
        const methodName = node.callee.property.name;
        if (disabledMethods.includes(methodName)) {
          return context.report({
            node,
            message: "error: should remove console"
          });
        }
      }
    };
  },
};
