/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: { DEFAULT: '#FAF8F5', dark: '#0F1410' },
        surface: { DEFAULT: '#FFFFFF', dark: '#1A1F1A' },
        primary: { DEFAULT: '#4A6741', dark: '#9CB89A' },
        accent: { DEFAULT: '#A87344', dark: '#C49870' },
        ink: { DEFAULT: '#1F2419', dark: '#E8E5DD' },
        muted: { DEFAULT: '#5A6151', dark: '#9CA092' },
        danger: '#C8341B',
        warn: '#D4A012',
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        sansSemibold: ['Inter_600SemiBold'],
        sansBold: ['Inter_700Bold'],
        serif: ['Lora_400Regular'],
        serifBold: ['Lora_700Bold'],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
      },
      spacing: {
        touch: '48px',
      },
    },
  },
  plugins: [],
}
