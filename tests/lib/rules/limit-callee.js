/**
 * @fileoverview Provides rule configurations to organize specific method executions within designated directories
 * @author eslint-plugin-restricted-callee
 */
"use strict";

const rule = require("../../../lib/rules/limit-callee"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester()

ruleTester.run("limit-callee", rule, {
  valid: [
    {
      code: 'test()',
    },
    {
      code: 'const a = 1;',
    },
    {
      code: 'provide("houseInfo")',
      filename: '/src/views/house-list',
      options: [
        [
          {
            limitCallee: 'provide',
            limitDir: [
              '/src/views/house-detail'
            ]
          }
        ]
      ]
    },
    {
      code: 'inject("houseInfo")',
      filename: '/src/views/house-list',
      options: [
        [
          {
            limitCallee: 'provide',
            limitDir: [
              '/src/views/house-list'
            ]
          },
        ]
      ]
    },
  ],

  invalid: [
    {
      code: 'provide()',
      filename: '/src/views/house-list',
      options: [
        [
          {
            limitCallee: 'provide',
            limitDir: [
              '/src/views/house-list'
            ]
          }
        ]
      ],
      errors: [{ message: 'The use of `provide` is not allowed in this directory.' }]
    },

    {
      code: 'inject("test")',
      filename: '/src/views/house-list',
      options: [
        [
          {
            limitCallee: 'inject',
            limitDir: [
              '/src/views/house-list'
            ]
          },
        ]
      ],
      errors: [{ message: 'The use of `inject` is not allowed in this directory.' }]
    },

    {
      code: 'provide("test");',
      filename: '/src/views/house-list',
      options: [
        [
          {
            limitCallee: 'inject',
            limitDir: [
              '/src/views/house-list'
            ]
          },
          {
            limitCallee: 'provide',
            limitDir: [
              '/src/views/house-list'
            ]
          },
        ]
      ],
      errors: [{ message: 'The use of `provide` is not allowed in this directory.' }]
    }
  ],
});
