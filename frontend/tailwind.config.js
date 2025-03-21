module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#4da6ff',
            DEFAULT: '#0080ff',
            dark: '#0059b3',
          },
          secondary: {
            light: '#f8fafc',
            DEFAULT: '#f1f5f9',
            dark: '#e2e8f0',
          },
        },
      },
    },
    plugins: [],
  }