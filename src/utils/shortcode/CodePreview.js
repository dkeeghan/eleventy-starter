const Prism = require('prismjs');
const Normalizer = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
require('prismjs/components/prism-twig');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-scss');

const beautifyHtml = require('js-beautify').html;
const guidIfFalse = require('../filters/GuidIfFalse');

const nw = new Normalizer({
	'remove-trailing': true,
	'remove-indent': true,
	'left-trim': true,
	'right-trim': true,
	'indent': 0,
	'spaces-to-tabs': 4,
});

module.exports = (code, type = 'twig', isExpanded = false, title = 'Code Preview') => {
	if (typeof(type) === 'string') {
		type = type.toLowerCase();
	} else {
		type = 'twig';
	}

	let previewTitle = '';

	// update format
	switch (type) {
		case 'html':
		case 'markup':
			type = 'markup';
			previewTitle = `<span>${title}</span><em>.html</em>`;
			break;
		case 'css':
		case 'sass':
		case 'scss':
			type = 'scss';
			previewTitle = `<span>${title}</span><em>.scss</em>`;
			break;
		case 'njk':
		case 'nunjucks':
		case 'twig':
		default:
			type = 'twig';
			previewTitle = `<span>${title}</span><em>.njk</em>`;
	}

	let prettyCode = nw.normalize(code);

	if (type === 'markup') {
		prettyCode = beautifyHtml(nw.normalize(code), {
			preserve_newlines: false,
			editorconfig: true,
		});
	}

	const guid = guidIfFalse(false);
	const codeBlock = `<pre class="language-${type}"><code class="language-${type}">${Prism.highlight(prettyCode, Prism.languages[type])}</code></pre>`;

	if (isExpanded === 'none') {
		let staticTitle = `<div class="_title">${previewTitle}</div>`;

		if (title === false) {
			staticTitle = '';
		}

		return `
			<section class="dev-code-preview">
				${staticTitle}
				${codeBlock}
			</section>
		`;
	}

	const attrExpanded = (isExpanded) ? ' expanded' : '';

	return `
		<section class="dev-code-preview">
			<dd-expandable-toggle for="code-preview-${guid}">
				<button class="_title">
					${previewTitle}
					<svg role="img"><use xlink:href="/assets/img/icons.svg#svg-caret-down" href="/assets/img/icons.svg#svg-caret-down"></use></svg>
				</button>
			</dd-expandable-toggle>
			<dd-expandable id="code-preview-${guid}"${attrExpanded}>
				${codeBlock}
			</dd-expandable>
		</section>
	`;
};

