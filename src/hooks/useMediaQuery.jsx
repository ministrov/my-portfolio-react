import { useCallback, useSyncExternalStore } from 'react';

/**
 * Проверяет, доступен ли `window.matchMedia` в текущем окружении
 * (его нет при рендере вне браузера и в части тестовых сред).
 * @returns {boolean} true, если `matchMedia` можно вызывать.
 */
const canMatchMedia = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function';

/**
 * Значение по умолчанию для рендера вне браузера: запрос считается несовпавшим.
 * @returns {boolean} Всегда false.
 */
const getServerSnapshot = () => false;

/**
 * Отслеживает, совпадает ли текущее окружение с CSS media query.
 * Значение верное уже на первом рендере (без мигания) и обновляется по событию
 * `change` — при ресайзе окна, повороте планшета, смене способа ввода.
 *
 * Построен на `useSyncExternalStore`, а не на `useState` + `useEffect`: так React
 * читает текущее значение синхронно при рендере, сам подписывается и отписывается,
 * а состояние не дублирует внешний источник.
 *
 * @param {string} query - Media query в синтаксисе CSS, например `'(max-width: 1024px)'`.
 * @returns {boolean} true, если запрос сейчас совпадает; false — если нет или `matchMedia` недоступен.
 *
 * @example
 * const isTouchLayout = useMediaQuery('(max-width: 1024px), (hover: none)');
 * // true на планшете/телефоне и на тач-устройствах, false на десктопе с мышью
 */
const useMediaQuery = (query) => {
  const subscribe = useCallback(
    (onChange) => {
      if (!canMatchMedia()) return () => {};

      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onChange);

      return () => {
        mediaQueryList.removeEventListener('change', onChange);
      };
    },
    [query]
  );

  const getSnapshot = () =>
    canMatchMedia() ? window.matchMedia(query).matches : false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default useMediaQuery;
