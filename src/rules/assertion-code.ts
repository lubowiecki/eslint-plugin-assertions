import { Rule } from 'eslint';
import RandExp from 'randexp';

import { AssertionTypes } from '../config/assertionTypes';

export const assertionCode: Rule.RuleModule = {
	meta: {
		type: 'problem',
		fixable: 'code',
		docs: {
			category: 'Assertions',
			description: 'Checks if always() and never() code match a pattern.',
		},
		messages: {
			codeEmpty: 'Assertion code is empty',
			codePatternMismatch: 'Assertion code do not match pattern',
		},
		schema: {
			type: 'array',
			items: {
				oneOf: [
					{
						type: 'string',
					},
				],
			},
		},
	},
	create: (context) => {
		return {
			CallExpression(node) {
				if (AssertionTypes.includes((node.callee as any)?.name)) {
					const [conditionArgument, codeArgument] = node.arguments;
					const [codePattern] = context.options;

					const code: unknown = (codeArgument as any)?.value;

					if (typeof code === 'string') {
						if (code.length < 1) {
							context.report({
								node: node,
								messageId: 'codeEmpty',
								fix(fixer) {
									return fixCode(
										fixer,
										codePattern,
										codeArgument.range
									);
								},
							});
						} else if (
							codePattern != null &&
							!code.match(codePattern)
						) {
							context.report({
								node: node,
								messageId: 'codePatternMismatch',
								fix(fixer) {
									return fixCode(
										fixer,
										codePattern,
										codeArgument.range
									);
								},
							});
						}
					}
				}
			},
		};
	},
};

function fixCode(
	fixer: Rule.RuleFixer,
	pattern: string,
	range: [number, number] = [0, 0]
): Rule.Fix {
	return fixer.replaceTextRange(range, `'${new RandExp(pattern).gen()}'`);
}
