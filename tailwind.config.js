module.exports = {
  content: ['./index.html', './main.js', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0906',
        surface: '#12110d',
        surface2: '#1a1711',
        border: 'rgba(241,234,219,.11)',
        border2: 'rgba(241,234,219,.055)',
        gold: '#d8bd78',
        'gold-dim': '#967a45',
        teal: '#54dec5',
        coral: '#ff8f70',
        violet: '#8a2be2',
        'violet-soft': '#b066ff',
        text: '#f1eadb',
        mid: '#c7beae',
        dim: '#918879'
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace']
      }
    }
  },
  corePlugins: {
    preflight: false
  }
};
