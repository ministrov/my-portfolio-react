import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/LanguageProvider';

export const useLanguage = () => {
  // const context = useContext(LanguageContext);
  const { lang, toggleLang } = useContext(LanguageContext);
  // if (!context) {
  //   throw new Error('useLanguage must be used within LanguageProvider');
  // }

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  // const { lang, toggleLang } = context;

  console.log(lang);
  console.log(toggleLang);

  return { lang, toggleLang };
};
