module.exports = {
  plugins: {
    // Tailwind CSS integration. Must be the first plugin.
    'tailwindcss': {},

    // Autoprefixer adds vendor prefixes to CSS rules.
    // Ensure it runs after Tailwind to process the generated CSS.
    'autoprefixer': {},

    // Optional: postcss-preset-env is often used to polyfill modern CSS features.
    // It's helpful if you need compatibility with older browsers beyond what Autoprefixer covers.
    // If you enable it, ensure it runs after Tailwind and Autoprefixer, or configure its stage
    // appropriately. For basic React/Vite setups, often Autoprefixer alone is sufficient.
    /*
    'postcss--preset-env': {
      stage: 3, // Default stage
      features: {
        'nesting-rules': true,
      }
    },
    */
  },
};