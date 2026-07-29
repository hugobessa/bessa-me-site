/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        page: 'var(--page)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        field: 'var(--field)',
        ink: 'var(--ink)',
        'ink-body': 'var(--ink-body)',
        'ink-muted': 'var(--ink-muted)',
        accent: 'var(--accent)',
        'on-accent': 'var(--on-accent)',
        'logo-tile': 'var(--logo-tile)',
        frame: 'var(--frame)',
        rule: 'var(--rule)',
      },
      borderRadius: {
        DEFAULT: '0',
      },
      boxShadow: {
        'hard-sm': 'var(--shadow-sm)',
        hard: 'var(--shadow)',
        'hard-lg': 'var(--shadow-lg)',
        // not `field`/`frame` — a key shared with colors resolves as a shadow colour
        'field-focus': 'var(--shadow-field)',
        card: '6px 6px 0 var(--card-shadow)',
      },
      fontFamily: {
        titles: ['var(--font-titles)', 'sans-serif'],
      },
      backgroundImage: {
        stripes:
          'repeating-linear-gradient(90deg, var(--surface-2) 0 6px, var(--surface) 6px 12px)',
        'stripes-45':
          'repeating-linear-gradient(45deg, var(--surface-2) 0 8px, var(--surface) 8px 16px)',
      },
      spacing: {
        13: '3.25rem',
      },
      transitionProperty: {
        hard: 'transform, box-shadow',
      },
      transitionDuration: {
        120: '120ms',
      },
    },
  },
  plugins: [],
}
