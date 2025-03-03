import { DateTime } from "luxon";

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Helper filter to format month names
	eleventyConfig.addFilter('monthName', (monthNum) => {
		const date = new Date(2000, parseInt(monthNum) - 1, 1);
		return date.toLocaleString('en-AU', { month: 'long' });
	});
	
	// Helper filters for parsing date parts
	eleventyConfig.addFilter('getYear', (dateStr) => dateStr.split('/')[0]);
	eleventyConfig.addFilter('getMonth', (dateStr) => dateStr.split('/')[1]);
	eleventyConfig.addFilter('getDay', (dateStr) => dateStr.split('/')[2]);

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", (tags) => {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	// get random int between a min and max number
	eleventyConfig.addFilter('GetRandomInt', (obj = null, min = 0, max = 10) => {
		return Math.floor(Math.random() * (max - min)) + min;
	});

	// if the value is false, create a unique guid (useful for setting unique IDs)
	eleventyConfig.addFilter('GuidIfFalse', (value) => {
		if (value === false || value === 'false') {
			const s4 = () => {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			};
		
			//return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
			return `${s4()}${s4()}`;
		}

		return value;
	});

	// get file type from url
	eleventyConfig.addFilter('IsFileType', (url, type = '') => {
		return (url.split('.').pop() === type);
	});

	// merge multiple arrays together with optional removal of duplicates
	eleventyConfig.addFilter('MergeArrayWith', (array, array2, removeDuplicates = true) => {
		if (removeDuplicates) {
			return [...new Set([...array, ...array2])];
		}
	
		array.push(...array2);
		return array;
	});
	
	// given provided default options - merge set options and defaults together 
	eleventyConfig.addFilter('SetOptions', (obj, defaults) => {
		for (const key in defaults) {
			if (obj.hasOwnProperty(key)) {
				defaults[key] = obj[key];
			}
		}
	
		return defaults;
	});

	// set a prop in an object
	eleventyConfig.addFilter('SetProp', (obj, key, value) => {
		obj[key] = value;
		return obj;
	});
};
