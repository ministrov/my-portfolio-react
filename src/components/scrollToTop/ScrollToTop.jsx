import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Компонент для автоматической прокрутки страницы вверх при изменении маршрута.
 * Если в URL есть hash, скроллит к элементу с этим id вместо верха страницы —
 * цель может быть частью лениво загружаемой (`React.lazy`) страницы, поэтому
 * попытки повторяются по кадрам, пока элемент не появится в DOM. После первого
 * попадания положение цели ещё какое-то время досверяется по кадрам (motion-
 * анимация появления карточки и подмена шрифта на `font-display: swap` обе
 * сдвигают лейаут уже после первого скролла) — прокрутка повторяется, пока
 * позиция не перестанет меняться. Ручной скролл/тач/клавиатура пользователя
 * сразу останавливают досверку, чтобы не бороться с его собственным вводом.
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
      let framesLeft = 90; // ~1.5s при 60fps: lazy-чанк + entrance-анимация + шрифты
      let lastTop = null;
      let stableStreak = 0;
      let frameId;

      const stopWatchingUserInput = () => {
        window.removeEventListener('wheel', cancelWatch);
        window.removeEventListener('touchstart', cancelWatch);
        window.removeEventListener('keydown', cancelWatch);
      };

      // Ручной скролл пользователя сразу побеждает — не спорим с его вводом.
      const cancelWatch = () => {
        framesLeft = 0;
        stopWatchingUserInput();
      };

      window.addEventListener('wheel', cancelWatch, { passive: true });
      window.addEventListener('touchstart', cancelWatch, { passive: true });
      window.addEventListener('keydown', cancelWatch);

      const tick = () => {
        const target = document.getElementById(targetId);

        if (target) {
          const currentTop = target.getBoundingClientRect().top;
          const isStable =
            lastTop !== null && Math.abs(currentTop - lastTop) < 0.5;
          lastTop = currentTop;

          if (!isStable) {
            target.scrollIntoView({ behavior, block: 'start' });
            stableStreak = 0;
          } else {
            stableStreak += 1;
          }

          if (stableStreak >= 6) {
            stopWatchingUserInput();
            return;
          }
        }

        framesLeft -= 1;
        if (framesLeft > 0) {
          frameId = requestAnimationFrame(tick);
        } else {
          stopWatchingUserInput();
        }
      };

      tick();
      return () => {
        cancelAnimationFrame(frameId);
        stopWatchingUserInput();
      };
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
