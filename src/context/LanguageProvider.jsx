import { createContext, useContext, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

export const LanguageContext = createContext({
  lang: 'ru',
  toggleLang: () => { },
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ru');
  // const [lang, setLang] = useState(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   return params.get('lang') || 'ru';
  // });

  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   if (params.get('lang') !== lang) {
  //     params.set('lang', lang);
  //     navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  //   }
  // }, [lang, location, navigate]);

  const toggleLang = () => setLang(lang === 'ru' ? 'en' : 'ru');
  // const toggleLang = () => {
  //   const newLang = lang === 'ru' ? 'en' : 'ru';
  //   setLang(newLang);
  // };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
