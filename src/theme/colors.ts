export const colors = {
  light: {
    canvas: '#FAF8F5', surface: '#FFFFFF', primary: '#4A6741', accent: '#A87344',
    ink: '#1F2419', muted: '#5A6151', danger: '#C8341B', warn: '#D4A012',
  },
  dark: {
    canvas: '#0F1410', surface: '#1A1F1A', primary: '#9CB89A', accent: '#C49870',
    ink: '#E8E5DD', muted: '#9CA092', danger: '#C8341B', warn: '#D4A012',
  },
} as const

export type ThemeMode = 'light' | 'dark'
