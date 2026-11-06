import { useMemo, useEffect, useCallback } from 'react';
import { useUrlParams } from '../hooks/useUrlParams';
import { resolveInitialLang } from '../utils/lang';
import { LANGUAGES, LOCAL_STORAGE_KEY } from '../const';
import { LanguageContext } from './LanguageContext';

/**
 * Провайдер контекста языка.
 * Управляет состоянием языка через URL-параметр 'lang' с сохранением выбора в localStorage.
 * Значение контекста мемоизировано для оптимизации производительности.
 * Сам контекст и хук чтения `useLanguageContext` — в `./LanguageContext.js`.
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
