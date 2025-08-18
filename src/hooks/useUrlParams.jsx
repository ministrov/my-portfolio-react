import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Хук для синхронизации состояния с URL-параметром
 * @param paramName - Название параметра в URL
 * @param initialValue - Начальное значение
 * @returns [value, setValue] - Пара значений как useState
 */
export function useUrlParams(paramName, initialValue) {
  const navigate = useNavigate();
  const location = useLocation();

  // Извлекаем начальное значение из URL или используем initialValue
  const [value, setValue] = useState(() => {
    const params = new URLSearchParams(location.search);

    console.log(params);
    return params.get(paramName) || initialValue;
  });

  // Обновляем URL при изменении значения
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.has(paramName)) {
      // Если значение изменилось, обновляем URL
      if (params.get(paramName) !== value) {
        params.set(paramName, value);
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
      }
    } else {
      // Если параметр отсутствует, добавляем его
      params.set(paramName, value);
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  }, [value, paramName, location, navigate]);

  return [value, setValue];
}