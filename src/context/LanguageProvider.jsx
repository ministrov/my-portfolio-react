import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useUrlParams } from '../hooks/useUrlParams';
import { resolveInitialLang } from '../utils/lang';
import { LANGUAGES, LOCAL_STORAGE_KEY } from '../const';

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
  // Начальный язык разрешается синхронно, до первого рендера: URL → localStorage → 'ru'.
  // useUrlParams читает initialValue ровно один раз, в инициализаторе useState.
  //
  // Раньше здесь был эффект, который восстанавливал язык из localStorage уже
  // после монтирования, и рефа isMounted, гасившая его повторный вызов. Связка
  // была нерабочей: эффект сохранения (ниже) успевал записать в localStorage
  // текущий, ещё дефолтный 'ru' до того, как StrictMode прогонял эффект
  // восстановления во второй раз — тот читал уже затёртое значение и возвращал
  // язык к 'ru'. Рефа эту гонку лишь маскировала, глуша второй прогон.
  // Синхронное разрешение убирает и эффект, и гонку целиком.
  const [lang, setLang] = useUrlParams('lang', resolveInitialLang());

  // Сохранение языка в localStorage при изменении
  useEffect(() => {
    if (lang === LANGUAGES.RU || lang === LANGUAGES.EN) {
      localStorage.setItem(LOCAL_STORAGE_KEY, lang);
    }
  }, [lang]);

  /**
   * Переключает язык между 'ru' и 'en'.
   * @private
   */
  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === LANGUAGES.RU ? LANGUAGES.EN : LANGUAGES.RU));
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
 *     {lang === LANGUAGES.RU ? 'Switch to English' : 'Переключить на русский'}
 *   </button>
 * );
 */
export const useLanguage = () => useContext(LanguageContext);
