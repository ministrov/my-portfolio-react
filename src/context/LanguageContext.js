import { createContext, useContext } from 'react';

/**
 * Контекст языка интерфейса: текущий язык и функция его переключения.
 *
 * Состоянием владеет `LanguageProvider` (`context/LanguageProvider.jsx`). Здесь
 * — только сам контекст и хук чтения: файл с компонентом не должен
 * экспортировать ничего, кроме компонентов, иначе Fast Refresh в dev
 * перезагружает страницу целиком.
 *
 * @module context/LanguageContext
 */

/**
 * @typedef {Object} LanguageContextValue
 * @property {'ru'|'en'} lang - Текущий язык.
 * @property {Function} toggleLang - Переключает язык между 'ru' и 'en'.
 */

/**
 * Контекст языка. Значение по умолчанию — для компонентов вне провайдера,
 * например в тестах.
 *
 * @type {React.Context<LanguageContextValue>}
 */
export const LanguageContext = createContext({
  lang: 'ru',
  toggleLang: () => {},
});

/**
 * Читает контекст языка — и только. Язык i18next не трогает: для
 * переключателя и всего, что должно сменить язык i18next, есть хук-мост
 * `useLanguage` из `hooks/useLanguage.jsx`.
 *
 * @returns {LanguageContextValue} Текущий язык и функция переключения.
 *
 * @example
 * // Нужен только код языка — например, для SEO-ссылок
 * const { lang } = useLanguageContext();
 * const canonical = `${BASE_URL}${pathname}?lang=${lang}`;
 */
export const useLanguageContext = () => useContext(LanguageContext);
