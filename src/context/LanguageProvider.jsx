import { createContext, useContext, useState } from 'react';

export const LanguageContext = createContext({
  lang: 'en',
  toggleLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const toggleLang = () => setLang(lang === 'en' ? 'ru' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
