import 'core-js/stable';

import 'dd-expandable/dd-expandable.js';
import 'dd-offscreen/dd-offscreen.js';
import 'dd-component-container/dd-component-container.js';

document.addEventListener('DOMContentLoaded', () => {
	document.documentElement.classList.replace('supports-no-js', 'supports-js');

	setTimeout(() => {
		document.documentElement.classList.remove('page-is-loading');
	}, 1);
});

// If the user is navigating by keyboard, enable the outlines - if they are using the mouse, disable them
(function(document) {
	const styleText = `
		::-moz-focus-inner {
			border:0 !important;
		}
		:focus {
			outline: none !important;
		}
	`;

	const unfocusStyleElement = document.createElement('STYLE');

	document.getElementsByTagName('HEAD')[0].appendChild(unfocusStyleElement);

	document.addEventListener('mousedown', () => {
		unfocusStyleElement.innerHTML = styleText;
	});

	document.addEventListener('keydown', () => {
		unfocusStyleElement.innerHTML = '';
	});
})(document);
