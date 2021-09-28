module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: ['tailwindcss', 'autoprefixer'],
}
