import { createContext, useContext } from 'react';
import { useUrlParams } from '../hooks/useUrlParams';
// import { useTranslation } from 'react-i18next';

export const LanguageContext = createContext({
  lang: 'ru',
  toggleLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useUrlParams('lang', 'ru');

  // const { i18n } = useTranslation();

  // useEffect(() => {
  //   i18n.changeLanguage(lang);
  // }, [lang, i18n]);

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
