import { useState, useCallback } from 'react';

/**
 * Хук для управления состоянием мобильного меню.
 * Предоставляет состояние открытия/закрытия и обработчики переключения.
 *
 * @returns {Object} Объект с состоянием и обработчиками
 * @property {boolean} isOpen - Текущее состояние меню
 * @property {Function} handleMenuToggle - Функция переключения состояния
 * @property {Function} handleMenuClose - Функция закрытия меню
 */
const useMenuControl = () => {
  const [isOpen, setOpen] = useState(false);

  const handleMenuToggle = useCallback((toggled) => {
    setOpen(toggled);
  }, []);

  const handleMenuClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    isOpen,
    handleMenuToggle,
    handleMenuClose,
  };
};

export default useMenuControl;