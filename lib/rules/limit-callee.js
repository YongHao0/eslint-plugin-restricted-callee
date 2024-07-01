/**
 * @fileoverview Provides rule configurations to organize specific method executions within designated directories
 * @author eslint-plugin-restricted-callee
 */
"use strict";

const path = require('path')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Provides rule configurations to organize specific method executions within designated directories",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            limitCallee: {
              type: 'string',
            },
            limitDir: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
          additionalProperties: false,
        }
      }
    ], // Add a schema if the rule has options
    messages: {
      limitCallee: 'The use of `{{callee}}` is not allowed in this directory.',
    }, // Add messageId and message
  },

  create(context) {
    const options = context.options?.[0] || []

    // 取所有配置, 并将其中路径转化为绝对路径
    const absoluteLimitDirs = options.map(opt => ({
      limitCallee: opt.limitCallee,
      absoluteDirs: opt.limitDir?.map(dir => path.resolve(process.cwd(), dir)),
    }))

    // 判断所在目录, 是否符合配置规则
    function isInLimitDir(filename, limitDirs) {
      return limitDirs?.some(dir => filename.startsWith(dir))
    }

    return {
      CallExpression(node) {
        const calleeName = node.callee.name
        const filename = context.getFilename()

        for (const dirOption of absoluteLimitDirs) {
          const { limitCallee, absoluteDirs } = dirOption
          // 先比较是否为配置的调用名, 减少计算量
          if (calleeName === limitCallee && isInLimitDir(filename, absoluteDirs)) {
            context.report({
              node,
              messageId: 'limitCallee',
              data: {
                callee: limitCallee,
              }
            })
          }
        }
      }
    };
  },
};
