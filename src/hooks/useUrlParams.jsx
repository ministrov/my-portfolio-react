import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Кастомный хук для синхронизации состояния React с параметром URL.
 * Позволяет хранить и обновлять значение в query-параметрах URL.
 * При изменении значения хук автоматически обновляет URL, сохраняя историю навигации.
 * При первоначальном рендере извлекает значение из URL или использует переданное начальное значение.
 *
 * @param {string} paramName - Название параметра в URL (например, 'tab', 'filter').
 * @param {*} initialValue - Начальное значение, если параметр отсутствует в URL.
 *   Может быть любого типа, но при наличии в URL значение будет строкой.
 * @returns {Array} Массив из двух элементов аналогично useState:
 *   - value: текущее значение параметра (строка или initialValue).
 *   - setValue: функция для обновления значения, принимает новое значение.
 *
 * @example
 * // Использование в компоненте
 * const [activeTab, setActiveTab] = useUrlParams('tab', 'home');
 * // При изменении activeTab URL обновится на /current-path?tab=home
 * // При загрузке страницы с /current-path?tab=settings activeTab будет 'settings'
 *
 * @see {@link https://reactrouter.com/} для работы с навигацией
 */
export function useUrlParams(paramName, initialValue) {
  const navigate = useNavigate();
  const location = useLocation();

  // Извлекаем начальное значение из URL или используем initialValue
  const [value, setValue] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get(paramName) || initialValue;
  });

  // Обновляем URL при изменении значения
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // Устанавливаем/обновляем параметр
    params.set(paramName, value);

    // Формируем новый URL без лишних параметров
    const newSearch = params.toString();

    // Выполняем навигацию только если URL изменился
    if (location.search !== `?${newSearch}`) {
      navigate(`${location.pathname}?${newSearch}`, { replace: true });
    }
  }, [value, paramName, location.search, navigate, location.pathname]);

  return [value, setValue];
}
