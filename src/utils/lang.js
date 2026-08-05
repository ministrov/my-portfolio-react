import { LANGUAGES, LOCAL_STORAGE_KEY } from '../const';

/**
 * Проверяет, что значение — поддерживаемый код языка.
 *
 * @param {*} value - Проверяемое значение.
 * @returns {boolean} true, если это 'ru' или 'en'.
 */
const isSupportedLang = (value) =>
  value === LANGUAGES.RU || value === LANGUAGES.EN;

/**
 * Возвращает сохранённый в localStorage язык, если он валиден.
 *
 * @returns {'ru'|'en'|null} Код языка или null, если ничего валидного не сохранено.
 */
export const getStoredLang = () => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return isSupportedLang(saved) ? saved : null;
};

/**
 * Определяет начальный язык интерфейса.
 * Приоритет: URL-параметр `lang` → localStorage → 'ru'.
 *
 * Единственный источник правды об этом приоритете. Используется в двух местах:
 * при инициализации i18next (`utils/i18n/index.js`) и как начальное значение
 * состояния в `context/LanguageProvider.jsx`. Раньше логика была продублирована,
 * и слои расходились: i18next стартовал с сохранённым языком, а провайдер —
 * с дефолтным 'ru' и тут же перебивал i18next обратно.
 *
 * @returns {'ru'|'en'} Код начального языка.
 */
export const resolveInitialLang = () => {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (isSupportedLang(urlLang)) return urlLang;

  return getStoredLang() ?? LANGUAGES.RU;
};
