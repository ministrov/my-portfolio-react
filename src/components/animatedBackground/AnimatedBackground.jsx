import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles.css';

const AnimatedBackground = () => {
  const [stars, setStars] = useState([]);

  // Временная отладка - добавьте в компонент
  useEffect(() => {
    if (stars.length > 0) {
      console.log('Stars generated:', stars.length);
      console.log('Animation types:', {
        pulse: stars.filter((s) => s.animationType === 'pulse').length,
        drift: stars.filter((s) => s.animationType === 'drift').length,
      });
    }
  }, [stars]);

  useEffect(() => {
    generateStarsAnimation();
  }, []);

  const generateStarsAnimation = () => {
    const countStars = Math.min(350, Math.floor(window.innerWidth / 5));

    const neonColors = [
      '#ffffff',
      'rgba(43, 87, 168, 1)',
      '#ffffff',
      'rgb(254,6,110)',
      '#ffffff',
    ];

    const newStars = [];
    for (let i = 0; i < countStars; i++) {
      const color = neonColors[Math.floor(Math.random() * neonColors.length)];
      const size = Math.random() * 4 + 0.7;
      const baseOpacity = Math.random() * 0.6 + 0.1;

      newStars.push({
        id: i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        baseOpacity,
        // Увеличиваем вероятность анимации
        animationType: Math.random() > 0.4 ? 'pulse' : 'drift', // 60% pulse, 40% drift
        // Для дрейфа - случайное направление и расстояние
        driftDistance: Math.random() * 15 + 5, // Увеличиваем расстояние
        driftAngle: Math.random() * 360,
        // Для пульсации - разная интенсивность
        pulseIntensity: Math.random() * 0.5 + 0.3, // Увеличиваем интенсивность
        pulseDuration: Math.random() * 3 + 2, // Уменьшаем длительность для более частого пульса
        // Общие параметры
        color,
        duration: Math.random() * 6 + 3, // Уменьшаем длительность дрейфа
      });
    }
    setStars(newStars);
  };

  // Варианты анимации для Framer Motion
  const getStarAnimation = (star) => {
    if (star.animationType === 'pulse') {
      return {
        opacity: [
          star.baseOpacity,
          star.baseOpacity + star.pulseIntensity,
          star.baseOpacity,
        ],
        scale: [1, 1.3, 1], // Увеличиваем масштаб
        transition: {
          duration: star.pulseDuration,
          repeat: Infinity,
          repeatType: 'loop', // Явно указываем тип повторения
          ease: 'easeInOut',
        },
      };
    } else {
      // Анимация дрейфа (медленного перемещения)
      const rad = (star.driftAngle * Math.PI) / 180;
      const x = Math.cos(rad) * star.driftDistance;
      const y = Math.sin(rad) * star.driftDistance;

      return {
        x: [0, x, 0, -x, 0], // Добавляем движение вперед-назад для более естественного эффекта
        y: [0, y, 0, -y, 0],
        opacity: [
          star.baseOpacity,
          star.baseOpacity * 0.8,
          star.baseOpacity,
          star.baseOpacity * 0.6,
          star.baseOpacity,
        ],
        transition: {
          duration: star.duration,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        },
      };
    }
  };

  return (
    <div className="background">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          initial={{
            opacity: star.baseOpacity,
            scale: 1,
            x: 0,
            y: 0,
          }}
          animate={getStarAnimation(star)}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            background: `${star.color}`,
            boxShadow: `0 0 ${star.size * 3}px ${star.color}`, // Увеличиваем свечение
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
