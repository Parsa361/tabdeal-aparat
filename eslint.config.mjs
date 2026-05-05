import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default withNuxt(
  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      'vue/multi-word-component-names': 'off',

      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  eslintConfigPrettier,
)
