# [Eleventy Starter](https://github.com/dkeeghan/eleventy-starter/)

A simple static site starter project. 

Built using:

- [Eleventy](https://11ty.dev) for templates and site generation
- [Parcel JS](https://parceljs.org) for a simple asset build pipeline
- [DDBreakpoints](https://github.com/DeloitteDigitalAPAC/DDBreakpoints) for simplified media queries in SCSS

---

## Prerequisites

- [Node and NPM](https://nodejs.org/)

## Running locally

```bash
# install the project dependencies
npm install

# run the build and server locally
npm run start

# run the production build
npm run build
```

## Updating Styles

Styles are located in `/src/assets/css/style.scss` all the included files use an `_` at the start of the name and are referenced from the `style.scss` file.

## Adding pages

Add a new page to the `/src/site/` folder either to the root, or to a sub-folder that doesn't start with `_` - make sure to add the `frontmatter` as per the Eleventy and EventyNavigation documentation e.g. 

```
---js
{
	eleventyNavigation: {
 		key: Home,
	}
}
---

{% extends "layouts/one-column-sidenav.njk" %}
```

### OOTB layouts

There are two layouts OOTB, one with a side navigation `layouts/one-column-sidenav.njk`, the other without `layouts/one-column.njk`.


## Icon Map

### Adding icons
Add icons to be used in the `/src/assets/icons/svgs-src/` folder. Once added run:

```bash
npm run icons
```

The above command will optimise and save the icons into a single sprite sheet. 

### Use the icons
The custom NJK command `{{ svg.render('ICON_FILENAME') }}` will render the SVG asset into the page. Make sure to set the size of the icons using CSS or they'll likely be very large. Make sure to import the SVG component into the page at the top using `{% import "utils/svg.njk" as svg %}`

## Features

- Using [Eleventy v3](https://github.com/11ty/eleventy/releases/tag/v3.0.0) with lightweight JavaScript output.
	- Content is exclusively pre-rendered (this is a static site).
	- All URLs are decoupled from the content’s location on the file system.
	- Configure templates via the [Eleventy Data Cascade](https://www.11ty.dev/docs/data-cascade/)
- Local development live reload provided by [Eleventy Dev Server](https://www.11ty.dev/docs/dev-server/).
- Content-driven [navigation menu](https://www.11ty.dev/docs/plugins/navigation/)
- Draft content: use `draft: true` to mark any template as a draft. Drafts are **only** included during `--serve`/`--watch` and are excluded from full builds. This is driven by the `addPreprocessor` configuration API in `eleventy.config.js`. Schema validator will show an error if non-boolean value is set in data cascade.
- Blog Posts
	- Automated next/previous links
	- Accessible deep links to headings
- Generated Pages
	- [Atom feed included (with easy one-line swap to use RSS or JSON](https://www.11ty.dev/docs/plugins/rss/)
	- `sitemap.xml`
	- Zero-maintenance tag pages ([View on the Demo](https://eleventy-base-blog.netlify.app/tags/))
	- 404 page
