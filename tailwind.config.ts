import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['IRANSans', 'system-ui', 'sans-serif'],
      },
      colors: {
        text: {
          primary: '#8f8282',
          secondary: '#EAEAEA',
          muted: '#AEAEAE',
          description: '#E2E2E2',
        },
        border: {
          default: '#404244',
        },
      },
    },
  },
} satisfies Config
