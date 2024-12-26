import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    colors: {
      'foreground-300': '#cbd5e1',
      'foreground-500': '#64748b',
      'foreground-700': '#334155',
      'cell': '#f1f5f9',
      'cell-revealed': '#f8fafc',
      'cell-revealed-mine': '#fca5a5',
      'adjacent-1': '#4ade80',
      'adjacent-2': '#22d3ee',
      'adjacent-3': '#38bdf8',
      'adjacent-4': '#818cf8',
      'adjacent-5': '#c084fc',
      'adjacent-6': '#f472b6',
      'adjacent-7': '#fb7185',
      'adjacent-8': '#be123c',
    },
    extend: {}
  },

  plugins: []
} satisfies Config;
