import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
})

export default [
  ...compat.extends('standard'),

  {
    ignores: ['dist']
  },

  {
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.vite.rules,

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    },

    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]
