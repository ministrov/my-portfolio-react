import { useCallback } from 'react';

/**
 * Хук для управления обработчиками клавиатуры компонента Up.
 * Инкапсулирует логику обработки клавиш Escape (глобальное скрытие) и Enter/Space (скролл наверх).
 *
 * @param {Object} params - Параметры хука.
 * @param {boolean} params.isShowed - Видимость кнопки.
 * @param {boolean} params.enableEscape - Разрешено ли скрытие кнопки по клавише Escape.
 * @param {Function} params.scrollToTop - Функция скролла к началу страницы.
 * @param {Function} params.setIsShowed - Функция установки состояния видимости кнопки.
 * @returns {Object} Объект с двумя обработчиками клавиатуры:
 *   - handleGlobalKeyDown: обработчик для глобальных событий клавиатуры (документ)
 *   - handleButtonKeyDown: обработчик для событий клавиатуры на самой кнопке
 *
 * @example
 * // Использование в компоненте
 * const { handleGlobalKeyDown, handleButtonKeyDown } = useKeyboardHandlers({
 *   isShowed,
 *   enableEscape,
 *   scrollToTop,
 *   setIsShowed,
 * });
 *
 * // Подписка на глобальные события
 * useEffect(() => {
 *   document.addEventListener('keydown', handleGlobalKeyDown);
 *   return () => document.removeEventListener('keydown', handleGlobalKeyDown);
 * }, [handleGlobalKeyDown]);
 *
 * // Использование на кнопке
 * <button onKeyDown={handleButtonKeyDown}>Наверх</button>
 */
const useKeyboardHandlers = ({
  isShowed,
  enableEscape,
  scrollToTop,
  setIsShowed,
}) => {
  /**
   * Обработчик глобальных клавиш (документ).
   * Обрабатывает только Escape для скрытия кнопки.
   * @param {KeyboardEvent} e - Событие клавиатуры.
   * @private
   */
  const handleGlobalKeyDown = useCallback(
    (e) => {
      if (!isShowed || !enableEscape) return;
      if (e.key === 'Escape') {
        setIsShowed(false);
      }
    },
    [isShowed, enableEscape, setIsShowed]
  );

  /**
   * Обработчик клавиш на кнопке.
   * Обрабатывает Enter и Space для скролла наверх.
   * @param {KeyboardEvent} e - Событие клавиатуры.
   * @private
   */
  const handleButtonKeyDown = useCallback(
    (e) => {
      if (!isShowed) return;
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          scrollToTop();
          break;
        default:
          break;
      }
    },
    [isShowed, scrollToTop]
  );

  return { handleGlobalKeyDown, handleButtonKeyDown };
};

export default useKeyboardHandlers;
