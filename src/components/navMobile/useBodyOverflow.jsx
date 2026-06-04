import { useEffect } from 'react';

/**
 * Хук для блокировки прокрутки страницы когда меню открыто.
 *
 * @param {boolean} isOpen - Флаг открытия меню.
 */
const useBodyOverflow = (isOpen) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
};

export default useBodyOverflow;
