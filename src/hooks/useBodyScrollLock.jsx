import { useEffect } from 'react';

/**
 * Счётчик активных блокировок на уровне модуля. Несколько независимых
 * оверлеев (мобильное меню, модальное окно) могут запрашивать блокировку
 * скролла одновременно — страница разблокируется только когда закрылся
 * последний из них, а не первый попавшийся.
 */
let lockCount = 0;

/**
 * Хук блокировки прокрутки страницы, безопасный для нескольких
 * независимых потребителей одновременно (например, мобильное меню
 * и модальное окно на одной странице).
 *
 * Блокирует overflow и на `body`, и на `html` — одного `body` местами
 * недостаточно для полной блокировки скролла.
 *
 * Зависимость эффекта — только сам флаг `isLocked`: если он не менялся,
 * эффект не перезапускается даже при постороннем ре-рендере компонента,
 * поэтому здесь не может повториться баг, когда несвязанный ре-рендер
 * с нестабильным колбэком в зависимостях сбрасывал чужую блокировку.
 *
 * @param {boolean} isLocked - Флаг запроса блокировки.
 */
const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (!isLocked) return undefined;

    lockCount += 1;
    if (lockCount === 1) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.style.overflow = 'unset';
        document.documentElement.style.overflow = 'unset';
      }
    };
  }, [isLocked]);
};

export default useBodyScrollLock;
