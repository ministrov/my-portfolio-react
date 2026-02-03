import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/LanguageProvider';

export const useLanguage = () => {
  const { lang, toggleLang } = useContext(LanguageContext);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return { lang, toggleLang };
};
