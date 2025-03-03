module.exports = (content, options = {}) => {
	const classes = ['cc', 'cc-rich-text'];

	if (options.hasBorderTop) {
		classes.push('has-border-top');
	}

	if (options.hasBgShaded) {
		classes.push('has-bg-shaded');
		classes.push('has-padding');
	}

	if (options.hasBgInverted) {
		classes.push('has-bg-inverted');
		classes.push('has-padding');
	}

	return `<div class="${classes.join(' ')}">
		<div class="_content">
			${content}
		</div>
	</div>`;
};

