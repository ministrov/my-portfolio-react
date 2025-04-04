import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    // Обработчик события изменения размера окна
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    // Добавляем обработчик события
    window.addEventListener('resize', handleResize);

    // Убираем обработчик события при размонтировании компонента
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Пустой массив зависимостей указывает на выполнение эффекта только при монтировании

  return windowSize; // Возвращаем текущее значение размера окна
};
