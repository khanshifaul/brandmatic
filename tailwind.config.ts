import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        tertiary: 'var(--color-tertiary)',
        quaternary: 'var(--color-quaternary)',

        // Background colors
        background: {
          DEFAULT: 'var(--background-default)',
          muted: 'var(--background-muted)',
          subtle: 'var(--background-subtle)',
        },

        // Foreground colors
        foreground: {
          DEFAULT: 'var(--foreground-default)',
          muted: 'var(--foreground-muted)',
          subtle: 'var(--foreground-subtle)',
        },

        // Border colors
        border: {
          DEFAULT: 'var(--border-default)',
          muted: 'var(--border-muted)',
          subtle: 'var(--border-subtle)',
        },

        // State colors
        focus: 'var(--focus-ring)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',

        // Disabled states
        disabled: {
          DEFAULT: 'var(--disabled)',
          light: 'var(--disabled-light)',
          dark: 'var(--disabled-dark)',
        },
      },
      // Add gradient utilities
      backgroundImage: {
        'gradient-brand': 'var(--gradient-brand)',
      },
    },
  },
  plugins: [],
};

export default config; 