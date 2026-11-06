import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../context/LanguageContext';

/**
 * Кастомный хук для работы с языком интерфейса.
 * Использует контекст языка и библиотеку i18n для синхронизации текущего языка.
 * При изменении языка автоматически обновляет язык в i18n.
 * Мост к i18next — только здесь; если нужен лишь код языка, без смены языка
 * i18next, — `useLanguageContext` из `context/LanguageContext.js`.
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
  const { lang, toggleLang } = useLanguageContext();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return { lang, toggleLang };
};
