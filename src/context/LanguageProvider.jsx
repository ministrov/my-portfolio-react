import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useUrlParams } from '../hooks/useUrlParams';

/**
 * Контекст для управления языком интерфейса.
 * Предоставляет текущий язык и функцию для его переключения.
 *
 * @typedef {Object} LanguageContextValue
 * @property {string} lang - Текущий язык ('ru' или 'en')
 * @property {Function} toggleLang - Функция переключения языка
 *
 * @type {React.Context<LanguageContextValue>}
 */
export const LanguageContext = createContext({
  lang: 'ru',
  toggleLang: () => {},
});

/**
 * Ключ для сохранения предпочтительного языка в localStorage.
 * @constant {string}
 */
const LOCAL_STORAGE_KEY = 'preferredLang';

/**
 * Провайдер контекста языка.
 * Управляет состоянием языка через URL-параметр 'lang' с сохранением выбора в localStorage.
 * Значение контекста мемоизировано для оптимизации производительности.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы.
 * @returns {JSX.Element} Провайдер контекста языка.
 *
 * @example
 * // Использование в приложении
 * <LanguageProvider>
 *   <App />
 * </LanguageProvider>
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useUrlParams('lang', 'ru');

  // Восстановление языка из localStorage при монтировании (если нет параметра в URL)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('lang')) {
      const savedLang = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedLang === 'ru' || savedLang === 'en') {
        setLang(savedLang);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Сохранение языка в localStorage при изменении
  useEffect(() => {
    if (lang === 'ru' || lang === 'en') {
      localStorage.setItem(LOCAL_STORAGE_KEY, lang);
    }
  }, [lang]);

  /**
   * Переключает язык между 'ru' и 'en'.
   * @private
   */
  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ru' ? 'en' : 'ru'));
  }, [setLang]);

  // Мемоизация значения контекста для предотвращения лишних ререндеров
  const contextValue = useMemo(
    () => ({ lang, toggleLang }),
    [lang, toggleLang]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Кастомный хук для доступа к контексту языка.
 *
 * @returns {LanguageContextValue} Объект с текущим языком и функцией переключения.
 *
 * @example
 * // Использование в компоненте
 * const { lang, toggleLang } = useLanguage();
 *
 * return (
 *   <button onClick={toggleLang}>
 *     {lang === 'ru' ? 'Switch to English' : 'Переключить на русский'}
 *   </button>
 * );
 */
export const useLanguage = () => useContext(LanguageContext);
