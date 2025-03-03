import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from '@11ty/eleventy';
import { feedPlugin } from '@11ty/eleventy-plugin-rss';
import eleventySyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import eleventyNavigation from '@11ty/eleventy-navigation';

// custom filters for Eleventy
import eleventyCustomFilters from './src/_utils/filters.js';

// metadata from data folder to be used by the feed plugin
import metadata from './src/site/_data/metadata.js';

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor('drafts', '*', (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === 'build') {
			return false;
		}
	});

	// default is YAML
	eleventyConfig.setFrontMatterParsingOptions({
		language: 'js',
	})

	// Copy the contents of the `assets` folder to the output folder
	// For example, `./src/assets/css/` ends up in `_site/css/`
	eleventyConfig
		.addPassthroughCopy({
			'./src/assets/css': '/assets/css',
			'./src/assets/img': '/assets/img',
			'./src/assets/fonts': '/assets/fonts',
			'./src/assets/video': '/assets/video',
			'./src/assets/js': '/assets/js',
			'./src/feed/': '/feed',
			'./src/site/manifest.json': '/manifest.json',
		})

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch SCSS files
	eleventyConfig.addWatchTarget('./src/assets/scss/**/*.scss');

	// Watch images for the image pipeline.
	eleventyConfig.addWatchTarget('./src/assets/**/*.{svg,webp,png,jpg,jpeg,gif}');

	// Official plugins
	eleventyConfig.addPlugin(eleventySyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(eleventyNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.addPlugin(feedPlugin, {
		type: 'atom', // or 'rss', 'json'
		outputPath: '/feed/feed.xml',
		stylesheet: 'pretty-atom-feed.xsl',
		collection: {
			name: 'posts',
			limit: 10,
		},
		metadata: metadata,
	});

	// Filters
	eleventyConfig.addPlugin(eleventyCustomFilters);

	eleventyConfig.addPlugin(IdAttributePlugin, {
		// by default we use Eleventy’s built-in `slugify` filter:
		// slugify: eleventyConfig.getFilter('slugify'),
		// selector: 'h1,h2,h3,h4,h5,h6', // default
	});

	eleventyConfig.addShortcode('currentBuildDate', () => {
		return (new Date()).toISOString();
	});

	// Blog post collections
	eleventyConfig.addCollection('postsByYear', collection => {
		const posts = collection.getAllSorted().reverse().filter(item => 'tags' in item.data && item.data.tags.includes('posts'));
		const sortedPosts = Object.entries(Object.groupBy(posts, post => post.date.getFullYear()));

		return sortedPosts;
	});

	eleventyConfig.addCollection('postsByYearMonth', collection => {
		const posts = collection.getAllSorted().reverse().filter(item => 'tags' in item.data && item.data.tags.includes('posts'));
		const sortedPosts = Object.entries(Object.groupBy(posts, post => {
			const year = post.date.getFullYear();
			const month = String(post.date.getMonth() + 1).padStart(2, '0');
			return `${year}/${month}`;
		}));

		return sortedPosts;
	});


	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior('passthrough');
};

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html
	templateFormats: [
		'md',
		'njk',
		'html',
		'11ty.js',
	],

	// Pre-process *.md and *.html files with: (default: `liquid`)
	markdownTemplateEngine: 'njk',
	htmlTemplateEngine: 'njk',

	// default directories
	dir: {
		input: 'src/site',      // default: '.'
		includes: '_includes',  // default: '_includes' (`input` relative)
		data: '_data',          // default: '_data' (`input` relative)
		output: '_dist'
	},
	pathPrefix: '/', // output path - change this if the site deploys to a sub directory
};
