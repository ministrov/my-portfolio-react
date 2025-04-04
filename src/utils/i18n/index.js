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
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
