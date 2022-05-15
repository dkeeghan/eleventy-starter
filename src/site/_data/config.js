module.exports = {
	env: process.env.ELEVENTY_ENV,
	siteTitle: 'Eleventy Starter',
	header: {
		backTo: 'Back to Home',
	},
	banner: {
		subTitle: 'Eleventy Starter Site',
		homeTitle: 'Hello Starter Site Users!',
		hideText: true,
	},
	sideNav: {
		title: 'About this site',
		description: 'This starter site has all you need for a very simple site!',
	},
	footer: {
		copyright: '&copy; 2022 Damian Keeghan',
		links: [
			{
				title: 'Home',
				href: '/',
			},
			{
				title: 'Author Github',
				href: 'https://github.com/dkeeghan/',
				external: true,
			},
			{
				title: 'Project Github',
				href: 'https://github.com/dkeeghan/eleventy-starter',
				external: true,
			},
		],
	},
};
