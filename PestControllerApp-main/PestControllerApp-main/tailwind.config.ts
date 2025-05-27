import type { Config } from 'tailwindcss'

export const colors = {
  gray: {
    light: '#d1d5db',
    DEFAULT: '#6b7280',
    dark: '#1f2937',
  },
  text: '#27272a',
  error: '#dc2626',
  primary: {
    light: '#51b68c',
    DEFAULT: '#4d965e',
    dark: '#206631',
  },
  secondary: '#0284c7',
  green: {
    light: '#14BA6D',
    dark: '#037847',
  },
  red: {
    light: '#f25151',
    dark: '#c11414',
  },
  blue: {
    light: '#4d64f1',
    dark: '#1c2fa6',
  },
  sky: {
    light: '#61d9f3',
    dark: '#00abd1',
  },
  yellow: {
    light: '#eae54b',
    dark: '#efd450',
  },
  purple: '#5536ca',
  sidebar: '#040d06',
  mobile: '#010a01',
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/screens/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
}
export default config
