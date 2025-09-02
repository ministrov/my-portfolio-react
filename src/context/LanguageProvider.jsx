import { useEffect, createContext, useContext } from 'react';
import { useUrlParams } from '../hooks/useUrlParams';
import { useTranslation } from 'react-i18next';

export const LanguageContext = createContext({
  lang: 'ru',
  toggleLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useUrlParams('lang', 'ru');
  // const [i18nLoaded, setI18nLoaded] = useState(false);

  // useEffect(() => {
  //   const loadI18n = async () => {
  //     if (!i18nLoaded) {
  //       // Динамически импортируем i18n только при первом изменении языка
  //       const { i18n } = await import('react-i18next');
  //       await i18n.changeLanguage(lang);
  //       setI18nLoaded(true);
  //     } else {
  //       // Если уже загружено, просто меняем язык
  //       const { i18n } = await import('react-i18next');
  //       i18n.changeLanguage(lang);
  //     }
  //   };

  //   loadI18n();
  // }, [lang, i18nLoaded]);

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'ru' ? 'en' : 'ru'));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
