'use strict';

module.exports = {
	extends: [
		'@deloitte-digital-au/stylelint-config'
	],
	rules: {
		'selector-type-no-unknown': [true, {
			ignoreTypes: [
				'dk-offscreen',
				'dk-offscreen-toggle'
			]
		}],
	},
};
