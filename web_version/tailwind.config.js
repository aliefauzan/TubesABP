/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          dark: '#004F9E',
          light: '#4D94DB',
        },
        secondary: {
          DEFAULT: '#00A8E8',
          dark: '#0087B8',
          light: '#4DC1EF',
        },
        accent: {
          DEFAULT: '#F5A623',
          dark: '#D48800',
          light: '#F8BE5C',
        },
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        background: '#F8F9FA',
        text: '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
