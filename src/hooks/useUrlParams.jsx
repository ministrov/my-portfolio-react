import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Хук для синхронизации состояния с URL-параметром
 * @param {string} paramName - Название параметра в URL
 * @param {*} initialValue - Начальное значение
 * @returns {[any, Function]} - Пара [значение, сеттер] как useState
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
