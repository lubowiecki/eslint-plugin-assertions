import { Rule } from 'eslint';

import { AssertionTypes } from '../config/assertionTypes';

export const assertionCondition: Rule.RuleModule = {
	meta: {
		type: 'problem',
		fixable: 'code',
		docs: {
			category: 'Assertions',
			description:
				'Disallowing passing explicit boolean true or false to the assert() method reduces the amount of false-positives.',
		},
		messages: {
			assertionNoCondition: "Assertion condition can't be empty",
			assertionBooleanType: "Assertion condition can't be boolean",
		},
	},
	create: (context) => {
		return {
			CallExpression(node) {
				if (AssertionTypes.includes((node.callee as any)?.name)) {
					const [conditionArgument, codeArgument] = node.arguments;

					if (conditionArgument == null) {
						context.report({
							node: node,
							messageId: 'assertionNoCondition',
						});
					} else if (conditionArgument.type === 'Literal') {
						context.report({
							node: node,
							messageId: 'assertionBooleanType',
						});
					}
				}
			},
		};
	},
};
