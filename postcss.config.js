const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/assets/js/**/*.js',
    './src/site/**/*.njk',
    './src/site/**/*.md',
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
})

module.exports = {
  plugins: [
    require('postcss-nested'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
}
