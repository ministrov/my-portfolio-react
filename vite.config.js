import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Конфигурация Vite для SPA-портфолио.
 *
 * `outDir: 'build'` оставлен вместо дефолтного `dist` сознательно: так продолжают
 * работать `/build` в `.gitignore`, скрипт `npm run prod` (`serve -s build`)
 * и внешние настройки деплоя.
 *
 * Source maps в обычной сборке выключены (дефолт Vite): иначе вместе с сайтом
 * на сервер уходят ~15 MB карт, а по ним читаются исходники. Карты нужны только
 * `npm run analyze` (source-map-explorer) — скрипт собирает их сам флагом
 * `--sourcemap` в отдельную папку `build-analyze/`, чтобы `build/` для выкладки
 * никогда не содержала `.map`.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
