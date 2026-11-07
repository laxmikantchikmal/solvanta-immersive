/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { ink: '#090d0c', panel: '#111816', lime: '#c8f169', muted: '#8b9690' }, fontFamily: { sans: ['Manrope', 'sans-serif'], mono: ['DM Mono', 'monospace'] } } },
  plugins: []
}
