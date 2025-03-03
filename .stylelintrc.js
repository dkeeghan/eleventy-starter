'use strict';

module.exports = {
	extends: [
		'@deloitte-digital-au/stylelint-config'
	],
	rules: {
		'selector-type-no-unknown': [true, {
			ignoreTypes: [
				'dd-expandable',
				'dd-expandable-toggle',
				'dd-component-container',
				'dd-offscreen',
				'dd-offscreen-toggle'
			]
		}],
	},
};
