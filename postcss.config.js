const purgecss = require('@fullhuman/postcss-purgecss');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(isProduction && {
      purgecss: purgecss({
        content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
        ],
        safelist: ['safelisted-class'], // Add any classes you want to keep
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      }),
    }),
  },
};
