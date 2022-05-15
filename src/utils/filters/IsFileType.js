module.exports = (url, type = '') => {
	return (url.split('.').pop() === type);
};
