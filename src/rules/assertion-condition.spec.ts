import { RuleTester } from 'eslint';

import { assertionCondition } from './assertion-condition';

const ruleTester = new RuleTester();

ruleTester.run(
	'@frontend/assertions/assertions-condition',
	assertionCondition,
	{
		valid: [
			{
				code: 'always(1 === 1)',
			},
			{
				code: 'never(1 === 1)',
			},
		],

		invalid: [
			{
				code: 'always()',
				errors: [{ messageId: 'assertionNoCondition' }],
			},
			{
				code: 'never()',
				errors: [{ messageId: 'assertionNoCondition' }],
			},
			{
				code: 'always(true)',
				errors: [{ messageId: 'assertionBooleanType' }],
			},
			{
				code: 'never(true)',
				errors: [{ messageId: 'assertionBooleanType' }],
			},
		],
	}
);
