const fs = require('fs');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

// Custom Filters
const GetRandomInt = require('./src/utils/filters/GetRandomInt');
const GuidIfFalse = require('./src/utils/filters/GuidIfFalse');
const IsFileType = require('./src/utils/filters/IsFileType');
const MergeArrayWith = require('./src/utils/filters/MergeArrayWith');
const SetProp = require('./src/utils/filters/SetProp');
const SetOptions = require('./src/utils/filters/SetOptions');
const Slugify = require('./src/utils/filters/Slugify');

module.exports = function(eleventyConfig) {
	/**
	 * Opts in to a full deep merge when combining the Data Cascade.
	 *
	 * @link https://www.11ty.dev/docs/data-deep-merge/#data-deep-merge
	 */
	eleventyConfig.setDataDeepMerge(true);

	/**
	 * Add custom watch targets
	 *
	 * @link https://www.11ty.dev/docs/config/#add-your-own-watch-targets
	 */
	eleventyConfig.addWatchTarget('./src/assets/img');

	/**
	 * Passthrough file copy
	 *
	 * @link https://www.11ty.io/docs/copy/
	 */
	eleventyConfig.addPassthroughCopy({
		'./src/assets/img': 'assets/img',
		'./src/site/manifest.json': 'manifest.json',
		'./src/site/robots.txt': 'robots.txt',
	});

	/**
	 * Ignore files (files in .gitignore and node_modules are ignored by default)
	 *
	 * @link https://www.11ty.dev/docs/ignores/
	 */
	//eleventyConfig.ignores.add('./src/site/_theme-builder.njk');

	/**
	 * Add plugins
	 *
	 * @link https://www.11ty.dev/docs/plugins/
	 */
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	/**
	 * Add filters
	 *
	 * @link https://www.11ty.io/docs/filters/
	 */
	eleventyConfig.addFilter('GetRandomInt', GetRandomInt);
	eleventyConfig.addFilter('GuidIfFalse', GuidIfFalse);
	eleventyConfig.addFilter('IsFileType', IsFileType);
	eleventyConfig.addFilter('MergeArrayWith', MergeArrayWith);
	eleventyConfig.addFilter('SetProp', SetProp);
	eleventyConfig.addFilter('SetOptions', SetOptions);
	eleventyConfig.addFilter('Slugify', Slugify);

	/**
	 * Add Transforms
	 *
	 * @link https://www.11ty.io/docs/config/#transforms
	 */
	if (process.env.ELEVENTY_ENV === 'production') {
		eleventyConfig.addTransform('htmlmin', require('./src/utils/htmlmin.js'));
	}

	/**
	 * Add Paired Shortcodes
	 *
	 * @link https://www.11ty.dev/docs/shortcodes/
	 */
	/* eleventyConfig.addPairedShortcode('CodePreview', CodePreview); */

	/**
	 * Override BrowserSync Server options
	 *
	 * @link https://www.11ty.dev/docs/config/#override-browsersync-server-options
	 */
	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		snippetOptions: {
			rule: {
				match: /<\/head>/i,
				fn: function(snippet, match) {
					return snippet + match
				},
			},
		},
		// Set local server 404 fallback
		callbacks: {
			ready: function(err, browserSync) {
				const content_404 = fs.readFileSync('dist/404.html');

				browserSync.addMiddleware('*', (req, res) => {
					// Provides the 404 content without redirect.
					res.write(content_404);
					res.end();
				})
			},
		},
	});
	
	return {
		dir: {
			includes: '_includes',
			input: 'src/site',
			output: 'dist',
		},
		passthroughFileCopy: true,
		templateFormats: ['njk', 'md'],
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
	}
}
