export default {
	env: process.env.ELEVENTY_ENV,
	header: {
		backTo: 'Back to Home',
	},
	footer: {
		copyright: '&copy; 2025 Damian Keeghan',
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
