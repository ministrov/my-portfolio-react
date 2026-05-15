import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/LanguageProvider';

/**
 * Кастомный хук для работы с языком интерфейса.
 * Использует контекст языка и библиотеку i18n для синхронизации текущего языка.
 * При изменении языка автоматически обновляет язык в i18n.
 *
 * @returns {Object} Объект с текущим языком и функцией переключения языка.
 * @property {string} lang - Текущий язык (например, 'ru', 'en').
 * @property {Function} toggleLang - Функция для переключения языка.
 *
 * @example
 * const { lang, toggleLang } = useLanguage();
 * console.log(lang); // 'ru'
 * toggleLang(); // переключает на 'en'
 */
export const useLanguage = () => {
  const { lang, toggleLang } = useContext(LanguageContext);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return { lang, toggleLang };
};
