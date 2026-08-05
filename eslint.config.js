import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

/**
 * Flat-config ESLint 9 — заменяет секцию `eslintConfig` из package.json,
 * которая ушла вместе с `eslint-config-react-app` и Create React App.
 *
 * `eslint-plugin-react` подключён намеренно узко — только ради понимания JSX:
 * без правила `react/jsx-uses-vars` базовое `no-unused-vars` не видит
 * использование компонентов в разметке и помечает почти каждый импорт мёртвым
 * (в этом проекте — 200 ложных ошибок). Конфиг `jsx-runtime` снимает
 * требование импортировать React: используется новый JSX-трансформ.
 *
 * Полный набор `react.configs.flat.recommended` сознательно НЕ включён:
 * его принятие — отдельное решение со своим разбором находок, а не побочный
 * эффект замены сборщика.
 */
export default [
  { ignores: ['build', 'dist', 'node_modules'] },
  js.configs.recommended,
  react.configs.flat['jsx-runtime'],
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/jsx-uses-vars': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Новое правило eslint-plugin-react-hooks 7.x. Срабатывает в
      // AnimatedBackground и useScrambleText — замечания по делу, но их разбор
      // означает переписывание анимаций, а миграция обязана быть визуально
      // нейтральной. Понижено до предупреждения, вынесено в отдельную задачу.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];
