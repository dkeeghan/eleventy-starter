> THIS IS CURRENTLY A BETA - UPDATING MIDDLEMAN TO ELEVENTY

# [Deloitte Digital CMS and Static Starter](https://hub.deloittedigital.com.au/stash/projects/FED/repos/cms-and-static-starter)

A project scaffold for quickly starting a site build with:

- [Eleventy](https://11ty.dev) for templates and site generation
- [Parcel JS](https://parceljs.org) for a simple asset build pipeline

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

## Trouble running locally?

If you are having trouble loading the when running the build/server locally, examine the terminal for any error messages.

If you are getting an error stating "Unknown version 81 of edge" (or similar), run the following command to resolve the issue and then re-attempt the build:
```bash
npm --depth 100 update caniuse-lite browserslist
```

## Still having trouble?

Try re-running "npm install" in the project directory. When you do so, check if you see the following error message:

```bash
gyp: No XCode or CLT version detected!
```

If this is the case, you need to reinstall the command line tools by running the following:

```bash
# get the location of the installed command-line tools
xcode-select --print-path
# the result of the above command should be /Library/Developer/CommandLineTools

# remove the command-line tools from your system
sudo rm -r -f /Library/Developer/CommandLineTools
# you will have to enter your password to remove the tools
# if you have git installed, a pop-up should now prompt you to re-install the tools
# if you do not see this pop-up, run the following command to prompt it
xcode-select --install
# click "Install" and follow the prompts
```

Follow the "running locally" steps again to successfully build the project.

## Code standards and format

Before starting development, please review our:

- [Committing guidelines](https://hub.deloittedigital.com.au/wiki/display/fed/Commit+Guidelines)
- [Code standards and formatting](https://hub.deloittedigital.com.au/wiki/display/fed/Code+Standards+and+Format)

Additionally, our templates are configured to use a number of [Code Quality Tools](https://hub.deloittedigital.com.au/wiki/display/fed/Code+Quality+Tools). Be sure to review each and install the necessary plugins for your editor.

## TODO notes

Before deployment, search through the project folder for the string `TODO` or `FIXME` to check if anything has been labelled as requiring attention.

You may like to install a plugin in your code editor to display warnings when you encounter these annotations. See [Code Quality Tools](https://hub.deloittedigital.com.au/wiki/display/fed/Code+Quality+Tools) for more information.

## TODO

- [Tasks tracked in JIRA](https://hub.deloittedigital.com.au/jira/projects/CMSSTARTER/issues)
- CSS
- JS
- Port all the old relevant .erb components to .njk
