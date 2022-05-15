const slugify = require('slugify');

module.exports = value => {
	const options = {
		replacement: '-',
		remove: /[&,+()$~%.'":*?<>{}]/g,
		lower: true,
	};

	return slugify(value, options);
};
