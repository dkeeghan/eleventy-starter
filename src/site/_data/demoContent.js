module.exports = {
	social: {
		platforms: {
			facebook: {
				title: 'Facebook',
				share: 'https://www.facebook.com/sharer/sharer.php?u=http://www.deloittedigital.com.au',
				page: 'https://www.facebook.com/DeloitteDigital/',
				verb: 'Like',
				icon: 'social-facebook',
			},
			twitter: {
				title: 'Twitter',
				share: 'https://twitter.com/intent/tweet?url=http://www.deloittedigital.com.au',
				page: 'https://twitter.com/DeloitteDIGI_AU',
				verb: 'Tweet',
				icon: 'social-twitter',
			},
			linkedin: {
				title: 'LinkedIn',
				share: 'https://www.linkedin.com/shareArticle?mini=true&url=http://www.deloittedigital.com.au',
				page: 'https://www.linkedin.com/company/deloitte-digital',
				verb: 'Follow',
				icon: 'social-linkedin',
			},
			instagram: {
				title: 'Instagram',
				page: 'https://www.instagram.com/deloittedigitalau/',
				verb: 'Follow',
				icon: 'social-instagram',
			},
			github: {
				title: 'Github',
				page: 'https://github.com/DeloitteDigitalAPAC',
				verb: 'Star',
				icon: 'social-github',
			},
			youtube: {
				title: 'YouTube',
				page: 'https://www.youtube.com/channel/UCgf6eWjLkp8yQ_tu9R0xoSQ',
				verb: 'Follow',
				icon: 'social-youtube',
			},
			vimeo: {
				title: 'Vimeo',
				page: 'https://vimeo.com/deloittedigital',
				verb: 'Follow',
				icon: 'social-vimeo',
			},
		},
		default: [
			'facebook',
			'twitter',
			'linkedin',
		],
	},
	footer: {
		nav: [
			{
				text: 'About Us',
				href: '#',
				children: [
					{
						text: 'Our team',
						href: '#',
					},
					{
						text: 'News',
						href: '#',
					},
					{
						text: 'Contact Us',
						href: '#',
					},
					{
						text: 'Careers',
						href: '#',
					},
				],
			},
			{
				text: 'Nav Item 2',
				href: '#',
				children: [
					{
						text: 'Subheading',
						href: '#',
					},
					{
						text: 'Subheading',
						href: '#',
					},
				],
			},
			{
				text: 'Nav Item 3',
				href: '#',
				children: [
					{
						text: 'Subheading',
						href: '#',
					},
					{
						text: 'Subheading',
						href: '#',
					},
					{
						text: 'Subheading',
						href: '#',
					},
					{
						text: 'Subheading',
						href: '#',
					},
					{
						text: 'Subheading',
						href: '#',
					},
				],
			},
			{
				text: 'Nav Item 3',
				href: '#',
				children: [
					{
						text: 'Subheading',
						href: '#',
					},
					{
						text: 'Subheading',
						href: '#',
					},
					{
						text: 'Subheading',
						href: '#',
					},
				],
			},
		],
		social: [
			'linkedin',
			'facebook',
			'instagram',
			'twitter',
			'youtube',
			'github',
		],
		legal: [
			{
				text: 'Privacy policy',
				href: '#',
			},
			{
				text: 'Terms of use',
				href: '#',
			},
			{
				text: 'Sitemap',
				href: '#',
			},
		],
		copyright: '&copy; 2020 - Deloitte Digital',
	},
};
