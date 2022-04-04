import { RuleTester } from 'eslint';

import { assertionCode } from './assertion-code';

const ruleTester = new RuleTester({});

ruleTester.run(
	'@lubowiecki/assertions/assertions-code',
	assertionCode,
	{
		valid: [
			{
				code: "always(1 === 1, '1a')",
				options: ['^[a-z0-9]{2}$'],
			},
			{
				code: "never(1 === 1, '1a')",
				options: ['^[a-z0-9]{2}$'],
			},
		],

		invalid: [
			{
				code: "always(1 === 1, '')",
				options: ['^test$'],
				errors: [{ messageId: 'codeEmpty' }],
				output: "always(1 === 1, 'test')",
			},
			{
				code: "never(1 === 1, '')",
				options: ['^test$'],
				errors: [{ messageId: 'codeEmpty' }],
				output: "never(1 === 1, 'test')",
			},
			{
				code: "always(1 === 1, '123a')",
				options: ['^test$'],
				errors: [{ messageId: 'codePatternMismatch' }],
				output: "always(1 === 1, 'test')",
			},
			{
				code: "never(1 === 1, '123a')",
				options: ['^test$'],
				errors: [{ messageId: 'codePatternMismatch' }],
				output: "never(1 === 1, 'test')",
			},
		],
	}
);
