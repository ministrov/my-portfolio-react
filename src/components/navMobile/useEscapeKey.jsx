import { useEffect } from 'react';

/**
 * Хук для закрытия меню по клавише Escape.
 *
 * @param {boolean} isOpen - Флаг открытия меню.
 * @param {Function} onClose - Функция закрытия меню.
 */
const useEscapeKey = (isOpen, onClose) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
};

export default useEscapeKey;
