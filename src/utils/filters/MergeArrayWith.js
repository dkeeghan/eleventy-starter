module.exports = (array, array2, removeDuplicates = true) => {
	if (removeDuplicates) {
		return [...new Set([...array, ...array2])];
	}

	array.push(...array2);
	return array;
};
