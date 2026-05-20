/**
 * Tailwind CSS config for the project.
 * Using CommonJS since Next/Tailwind read this file as CJS.
 */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ["'Space Grotesk'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Helvetica', 'Arial', 'sans-serif'],
        'geist-sans': ["'Geist Sans'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        zinc: {
          950: '#09090b',
          900: '#18181b',
          800: '#27272a',
          400: '#a1a1aa',
          100: '#f4f4f5',
        },
      },
    },
  },
  plugins: [],
}
