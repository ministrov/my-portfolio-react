import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Конфигурация Vite для SPA-портфолио.
 *
 * `outDir: 'build'` оставлен вместо дефолтного `dist` сознательно: так продолжают
 * работать `/build` в `.gitignore`, скрипт `npm run prod` (`serve -s build`)
 * и внешние настройки деплоя.
 *
 * `sourcemap: true` нужен для `npm run analyze` (source-map-explorer).
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
