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

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    lng: 'ru',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
