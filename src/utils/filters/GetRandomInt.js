module.exports = (obj = null, min = 0, max = 10) => {
	return Math.floor(Math.random() * (max - min)) + min;
};
