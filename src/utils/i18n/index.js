import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import EnLang from './locales/en/en.json';
import RuLang from './locales/ru/ru.json';

const resources = {
  en: {
    translation: EnLang,
  },
  ru: {
    translation: RuLang,
  },
};

/**
 * Определяет начальный язык интерфейса до инициализации i18next.
 * Приоритет: URL-параметр `lang` → localStorage → 'ru'.
 * Позволяет избежать флэша неправильного языка при первом рендере.
 *
 * @returns {'ru'|'en'} Код начального языка.
 */
const getInitialLang = () => {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang === 'ru' || urlLang === 'en') return urlLang;
  const saved = localStorage.getItem('preferredLang');
  if (saved === 'ru' || saved === 'en') return saved;
  return 'ru';
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'ru',
  lng: getInitialLang(),

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
