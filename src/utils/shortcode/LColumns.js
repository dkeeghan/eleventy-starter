module.exports = (content, numCols = 2, options = {}) => {
	const classes = ['l-cols'];

	classes.push(`has-${numCols}-cols`);

	if (options.feature && typeof(options.feature) === 'string' && (options.feature.toLowerCase() === 'left' || options.feature.toLowerCase() === 'right')) {
		classes.push(`has-feature-${options.feature}`);
	}

	if (options.equalHeights) {
		classes.push('has-equal-heights');
	}

	return `<div class="${classes.join(' ')}">
		${content}
	</div>`;
};

