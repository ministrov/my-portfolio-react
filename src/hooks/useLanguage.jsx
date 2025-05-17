import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageProvider';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  console.log(context);

  return context;
};
