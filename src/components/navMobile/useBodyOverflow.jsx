import { useEffect } from 'react';

/**
 * Хук для управления overflow body при открытии/закрытии модального меню.
 * Блокирует прокрутку страницы когда меню открыто.
 *
 * @param {boolean} isOpen - Флаг открытия меню
 */
const useBodyOverflow = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
};

export default useBodyOverflow;