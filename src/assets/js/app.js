//import 'core-js/stable';
import '@dkwd/dk-offscreen/dk-offscreen.js';

const ELEVENTY_STARTER = {};

(NS => {
	const CLASSES = {
		PAGE_IS_LOADING: 'page-is-loading',
		IS_LOADING: 'is-loading',
		DEFAULT_THEME: 'use-theme-dark',
		THEMES: [
			'use-theme-device',
			'use-theme-dark',
			'use-theme-light',
		],
	};

	const SELECTORS = {
		LAZY: '.js-lazy',
		THEME_TOGGLE: '.js-toggle-theme input',
	};

	// If you want to visually show if a page has loaded or not (i.e. all blocking assets have completed)
	// remove this class when the JS (last thing on the page) has loaded
	NS.initPageClasses = () => {
		setTimeout(() => {
			document.documentElement.classList.remove(CLASSES.PAGE_IS_LOADING);
		}, 1);
	};

	// lazy load images
	NS.initLazyLoad = () => {
		const loadImage = img => {
			const url = img.dataset.src;

			if (url !== '') {
				let preloader = document.createElement(SELECTORS.IMG);
				preloader.src = url;

				preloader.addEventListener('load', () => {
					img.style.backgroundImage = `url(${url})`;
					img.classList.remove(CLASSES.IS_LOADING);
					preloader = null;
				});
			} else {
				img.classList.remove(CLASSES.IS_LOADING);
			}
		};

		const lazyImages = document.querySelectorAll(SELECTORS.LAZY);
		const observer = new IntersectionObserver(
			(entries, self) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						loadImage(entry.target);
						self.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: '0px 0px 20px 0px',
				threshold: 0,
			},
		);

		lazyImages.forEach(image => {
			observer.observe(image);
		});
	};

	// Toggle Theme Colours for page to show dark/light or device set mode
	NS.toggleTheme = () => {
		const radioButtons = document.querySelectorAll(SELECTORS.THEME_TOGGLE);

		let currentTheme = window.sessionStorage.getItem('theme') || CLASSES.DEFAULT_THEME;

		const _setThemeClass = () => {
			if (currentTheme) {
				CLASSES.THEMES.forEach(className => {
					if (className === currentTheme) {
						document.documentElement.classList.add(className);
					} else {
						document.documentElement.classList.remove(className);
					}
				});

				document.documentElement.classList.add(currentTheme);
			}

			radioButtons.forEach(button => {
				if (button.value === currentTheme) {
					button.checked = true;
				}
			});
		};

		const _onRadioToggle = event => {
			radioButtons.forEach(radioButton => {
				if (event.target === radioButton && radioButton.checked) {
					currentTheme = radioButton.value;
				}
			});

			window.sessionStorage.setItem('theme', currentTheme);
			_setThemeClass();
		};

		radioButtons.forEach(radioButton => {
			radioButton.addEventListener('click', _onRadioToggle);
		});

		_setThemeClass();
	};

	// Easter Eggs once you press the Konami Code
	NS.ee = () => {
		const pattern = [
			'ArrowUp',
			'ArrowUp',
			'ArrowDown',
			'ArrowDown',
			'ArrowLeft',
			'ArrowRight',
			'ArrowLeft',
			'ArrowRight',
			'b',
			'a',
		];

		let current = 0;

		const firstTime = () => {
			if (document.querySelectorAll('.konami-raptor').length) {
				return;
			}

			let div = document.createElement('div');
			div.className = 'konami-raptor';

			let img = document.createElement('img');
			img.src = '/assets/img/raptor.png';

			div.appendChild(img);
			document.body.appendChild(div);

			const animEnd = () => {
				div.removeEventListener('animationend', animEnd);
				document.body.removeChild(div);
				div = img = null;
			};

			setTimeout(() => {
				div.classList.add('is-animating');
				div.addEventListener('animationend', animEnd);
			}, 10);
		};

		const onKeyDown = event => {
			if (
				pattern.indexOf(event.key) < 0 ||
				event.key !== pattern[current]
			) {
				current = 0;
				return;
			}

			current += 1;

			if (pattern.length === current) {
				if (document.documentElement.classList.contains('konami')) {
					document.documentElement.classList.remove('konami');
					window.sessionStorage.removeItem('konami');
					current = 0;
				} else {
					document.documentElement.classList.add('konami');
					window.sessionStorage.setItem('konami', true);
					firstTime();

					current = 0;
				}
			}
		};

		// Listen for keydown events
		document.addEventListener('keydown', onKeyDown, false);

		if (window.sessionStorage.getItem('konami')) {
			document.documentElement.classList.add('konami');
		}

		console.log(
			'🟢 Hello, thanks for checking out the console! Welcome to all the new Grads (and team) that see this.',
		);
		console.log(
			'While you\'re here, go on a treasure hunt by getting a 404.',
		);
	};

	document.addEventListener('DOMContentLoaded', () => {
		NS.initPageClasses();
		NS.initLazyLoad();
		NS.toggleTheme();
		NS.ee();
	});
})(ELEVENTY_STARTER);

// ACCESSIBILITY - If the user is navigating by keyboard, enable the outlines - if they are using the mouse, disable them
(function(document) {
	const styleText = `
		::-moz-focus-inner {
			border:0 !important;
		}
		:focus {
			outline: none !important;
		}
	`;

	const unfocusStyleElement = document.createElement('STYLE');

	document.getElementsByTagName('HEAD')[0].appendChild(unfocusStyleElement);

	document.addEventListener('mousedown', () => {
		unfocusStyleElement.innerHTML = styleText;
	});

	document.addEventListener('keydown', () => {
		unfocusStyleElement.innerHTML = '';
	});
})(document);
