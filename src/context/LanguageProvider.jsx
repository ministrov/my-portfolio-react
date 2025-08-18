// В LanguageProvider.jsx нужно добавить синхронизацию с i18n
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LanguageContext = createContext({
  lang: 'ru',
  toggleLang: () => { },
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'ru';
  });

  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Синхронизация языка между контекстом и i18n
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  // Обновление URL при изменении языка
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.has('lang')) {
      if (params.get('lang') !== lang) {
        params.set('lang', lang);
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
      }
    } else {
      params.set('lang', lang);
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  }, [lang, location, navigate]);

  const toggleLang = () => {
    setLang(prev => prev === 'ru' ? 'en' : 'ru');
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);


// import { createContext, useContext } from 'react';
// import { useUrlParam } from '../hooks/useUrlParams';

// export const LanguageContext = createContext({
//   lang: 'ru',
//   toggleLang: () => { },
// });

// export function LanguageProvider({ children }) {
//   // const [lang, setLang] = useState('ru');
//   const [lang, setLang] = useUrlParam('lang', 'ru');

//   const toggleLang = () => setLang(lang === 'ru' ? 'en' : 'ru');

//   return (
//     <LanguageContext.Provider value={{ lang, toggleLang }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// export const useLanguage = () => useContext(LanguageContext);
