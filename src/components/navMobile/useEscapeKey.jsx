import { useEffect } from 'react';

/**
 * Хук для обработки нажатия клавиши Escape.
 * Закрывает меню при нажатии Escape, если оно открыто.
 *
 * @param {boolean} isOpen - Флаг открытия меню
 * @param {Function} onClose - Функция закрытия меню
 */
const useEscapeKey = (isOpen, onClose) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);
};

export default useEscapeKey;