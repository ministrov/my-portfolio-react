/**
 * Утилита debounce для оптимизации обработчиков событий
 * 
 * @module utils/debounce
 * @description Функция debounce ограничивает частоту вызова переданной функции,
 * гарантируя, что она будет вызвана только после истечения указанного времени
 * с момента последнего вызова. Это полезно для обработки событий, которые
 * происходят часто (например, resize, scroll, input).
 * 
 * @example
 * // Использование в компоненте React
 * const handleResize = () => {
 *   console.log('Window resized');
 * };
 * const debouncedResize = debounce(handleResize, 250);
 * window.addEventListener('resize', debouncedResize);
 * 
 * @param {Function} func - Функция, которую нужно дебаунсить
 * @param {number} wait - Время задержки в миллисекундах
 * @returns {Function} Дебаунсированная функция
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default debounce;