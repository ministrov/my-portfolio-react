import { createContext, useContext, useState } from 'react';

export const LanguageContext = createContext({
  lang: 'ru',
  toggleLang: () => { },
});

// console.log(LanguageContext);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ru');

  const toggleLang = () => setLang(lang === 'ru' ? 'en' : 'ru');

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
