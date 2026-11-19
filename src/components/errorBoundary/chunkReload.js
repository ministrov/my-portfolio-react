import { reloadPage } from './reloadPage';

/**
 * Сбой загрузки файла сборки и одна автоматическая перезагрузка вкладки.
 *
 * Страницы и две секции главной грузятся через `lazy()` отдельными файлами с
 * хешем в имени. После выкладки старых файлов на сервере нет, и вкладка,
 * открытая до неё, при переходе запрашивает файл, которого больше нет.
 * Перезагрузка берёт свежий `index.html` с новыми именами — и всё работает.
 *
 * Чтобы постоянный сбой (нет сети, файл заблокирован) не перезагружал вкладку
 * по кругу, перед перезагрузкой ставится метка в `sessionStorage`: с ней
 * вкладка сама больше не перезагружается до конца сессии, а показывает экран
 * с кнопкой. Без доступа к хранилищу метку не поставить — тогда и
 * автоперезагрузки нет.
 *
 * @module errorBoundary/chunkReload
 */

/**
 * Тексты, с которыми браузеры и Vite отклоняют загрузку файла сборки: Chrome
 * и Edge, Firefox, Safari и предзагрузка CSS у Vite. Chrome пишет одно и то же
 * и при обрыве сети, и при ответе 404 с `index.html` — проверено на S03-T10.
 */
const CHUNK_ERROR_RE =
  /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS/i;

/** Ключ метки в `sessionStorage`: вкладка уже перезагружалась сама. */
export const RELOAD_FLAG_KEY = 'chunk-reload';

/**
 * Отличает сбой загрузки файла от остальных ошибок.
 *
 * @param {unknown} error - Ошибка, пойманная границей.
 * @returns {boolean} `true`, если не загрузился файл сборки.
 */
export const isChunkLoadError = (error) =>
  CHUNK_ERROR_RE.test(String(error?.message ?? ''));

/**
 * Можно ли перезагрузить вкладку автоматически: в этой сессии она ещё не
 * перезагружалась сама, и хранилище доступно. Только читает — поэтому её
 * можно звать из `getDerivedStateFromError`.
 *
 * @returns {boolean}
 */
export const canAutoReload = () => {
  try {
    return window.sessionStorage.getItem(RELOAD_FLAG_KEY) === null;
  } catch {
    return false;
  }
};

/**
 * Ставит метку и перезагружает вкладку. Если метку поставить нельзя, не
 * перезагружает: без метки следующий сбой снова вызвал бы перезагрузку.
 */
export const autoReload = () => {
  try {
    window.sessionStorage.setItem(RELOAD_FLAG_KEY, '1');
  } catch {
    return;
  }
  reloadPage();
};
