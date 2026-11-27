import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { i18nReady } from './utils/i18n/index';

/**
 * Точка входа приложения.
 *
 * Отрисовка ждёт `i18nReady`: для `ru` это микрозадача (словарь уже в главном
 * чанке), для `en` — загрузка словаря отдельным чанком. Так английская
 * страница не мелькнёт русским текстом. Если чанк не приехал, `init` всё равно
 * завершается, и страница остаётся на русском — лучше, чем белый экран.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

// Ошибку загрузки словаря i18next не считает фатальной и `init` всё равно
// завершает — но если `init` сорвётся по другой причине, отрисовка обязана
// состояться: пустая страница хуже непереведённой.
i18nReady
  .catch(() => {})
  .then(() => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
