// postcss.config.js
module.exports = {
  plugins: {
    'tailwindcss': {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false
      }
    },
    '@fullhuman/postcss-purgecss': process.env.NODE_ENV === 'production' ? {
      content: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './templates/**/*.{js,jsx,ts,tsx}'
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: [
          'html',
          'body',
          /^wp-/,
          /^has-/,
          /^align/,
          /^theme-/,
          /^data-/,
          /^hover:/,
          /^focus:/,
          /^sm:/,
          /^md:/,
          /^lg:/,
          /^xl:/,
          /^2xl:/
        ],
        deep: [/^prose/],
        greedy: [
          /safe$/,
        ]
      }
    } : false,
    'autoprefixer': {}
  }
}