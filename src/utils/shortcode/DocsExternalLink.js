module.exports = (title, href = '#') => {
	return `<a href="${href}" target="_blank" rel="nofollow" class="cta is-secondary is-small has-icon is-right">
		${title}
		<svg role="img">
			<use xlink:href="/assets/img/icons.svg#svg-link-external" href="/assets/img/icons.svg#svg-link-external"></use>
		</svg>
	</a>`;
};

