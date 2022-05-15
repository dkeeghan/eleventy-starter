module.exports = (obj, defaults) => {
	for (const key in defaults) {
		if (obj.hasOwnProperty(key)) {
			defaults[key] = obj[key];
		}
	}

	return defaults;
};
