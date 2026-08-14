import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Компонент для автоматической прокрутки страницы вверх при изменении маршрута.
 * Если в URL есть hash, скроллит к элементу с этим id вместо верха страницы —
 * цель может быть частью лениво загружаемой (`React.lazy`) страницы, поэтому
 * попытки повторяются по кадрам, пока элемент не появится в DOM.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {('auto'|'smooth'|'instant')} [props.behavior='auto'] - Поведение скролла
 * @param {number} [props.top=0] - Вертикальная позиция скролла (пиксели)
 * @param {number} [props.left=0] - Горизонтальная позиция скролла (пиксели)
 * @returns {null} Компонент не рендерит никакого UI
 */
const ScrollToTop = ({ behavior = 'auto', top = 0, left = 0 }) => {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);

  // Браузер по умолчанию сам восстанавливает scroll-позицию записи истории
  // при обычной перезагрузке страницы (F5) — это конфликтует с тем, что ниже
  // мы явно управляем скроллом при смене маршрута в SPA. Отключаем нативное
  // восстановление один раз, чтобы им не «перетягивало» страницу после reload.
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'scrollRestoration' in window.history
    ) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const isOnlyHashChange = prevPathnameRef.current === pathname && hash;
    prevPathnameRef.current = pathname;

    if (hash) {
      const targetId = hash.slice(1);
      let attemptsLeft = 30; // ~0.5s при 60fps — запас на загрузку lazy-чанка
      let frameId;

      const tryScrollToTarget = () => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior, block: 'start' });
          return;
        }
        attemptsLeft -= 1;
        if (attemptsLeft > 0) {
          frameId = requestAnimationFrame(tryScrollToTarget);
        }
      };

      tryScrollToTarget();
      return () => cancelAnimationFrame(frameId);
    }

    if (!isOnlyHashChange) {
      try {
        window.scrollTo({
          top,
          left,
          behavior,
        });
      } catch (error) {
        // Fallback для старых браузеров или окружений без window.scrollTo
        console.warn(
          'ScrollToTop: window.scrollTo failed, using fallback',
          error
        );
        window.scrollTo(left, top);
      }
    }

    return undefined;
  }, [pathname, hash, behavior, top, left]);

  return null;
};

export default ScrollToTop;
