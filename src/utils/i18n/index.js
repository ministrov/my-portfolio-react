import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resolveInitialLang } from '../lang';
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

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'ru',
  // Приоритет URL → localStorage → 'ru' живёт в utils/lang.
  // Тот же резолвер задаёт начальное состояние LanguageProvider, поэтому оба
  // слоя стартуют с одним языком и не перебивают друг друга.
  lng: resolveInitialLang(),

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
