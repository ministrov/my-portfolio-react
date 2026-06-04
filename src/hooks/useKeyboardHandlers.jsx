import { useCallback } from 'react';

/**
 * Хук для управления обработчиками клавиатуры компонента Up.
 * Инкапсулирует логику обработки клавиши Escape (глобальное скрытие кнопки).
 * Активация кнопки по Enter/Space не обрабатывается здесь — это нативное
 * поведение элемента `<button>` (срабатывает через `onClick`).
 *
 * @param {Object} params - Параметры хука.
 * @param {boolean} params.isShowed - Видимость кнопки.
 * @param {boolean} params.enableEscape - Разрешено ли скрытие кнопки по клавише Escape.
 * @param {Function} params.setIsShowed - Функция установки состояния видимости кнопки.
 * @returns {Object} Объект с обработчиком клавиатуры:
 *   - handleGlobalKeyDown: обработчик для глобальных событий клавиатуры (документ)
 *
 * @example
 * // Использование в компоненте
 * const { handleGlobalKeyDown } = useKeyboardHandlers({
 *   isShowed,
 *   enableEscape,
 *   setIsShowed,
 * });
 *
 * // Подписка на глобальные события
 * useEffect(() => {
 *   document.addEventListener('keydown', handleGlobalKeyDown);
 *   return () => document.removeEventListener('keydown', handleGlobalKeyDown);
 * }, [handleGlobalKeyDown]);
 */
const useKeyboardHandlers = ({ isShowed, enableEscape, setIsShowed }) => {
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

  return { handleGlobalKeyDown };
};

export default useKeyboardHandlers;
