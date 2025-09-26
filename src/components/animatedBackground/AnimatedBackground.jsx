import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './styles.css';

const AnimatedBackground = () => {
  const [stars, setStars] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const generateStarsAnimation = useCallback(() => {
    if (!isVisible) return;

    // Фиксированное количество звезд вместо расчета по площади
    const countStars = Math.min(150, Math.floor(window.innerWidth / 5));

    const neonColors = [
      '#ffffff',
      'rgb(19,0,247)',
      '#ffffff',
      'rgb(254,6,110)',
    ];

    const newStars = [];
    for (let i = 0; i < countStars; i++) {
      const color = neonColors[Math.floor(Math.random() * neonColors.length)];
      const size = Math.random() * 2 + 0.5;
      const baseOpacity = Math.random() * 0.3 + 0.1;

      newStars.push({
        id: i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        baseOpacity,
        animationType: Math.random() > 0.8 ? 'pulse' : 'none',
        pulseIntensity: Math.random() * 0.2 + 0.1,
        pulseDuration: Math.random() * 6 + 4,
        color,
      });
    }
    setStars(newStars);
  }, [isVisible]);

  useEffect(() => {
    // Задержка инициализации для приоритета основного контента
    const timer = setTimeout(() => {
      setIsVisible(true);
      generateStarsAnimation();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [generateStarsAnimation]);

  const getStarAnimation = (star) => {
    if (star.animationType === 'pulse') {
      return {
        opacity: [
          star.baseOpacity,
          star.baseOpacity + star.pulseIntensity,
          star.baseOpacity,
        ],
        transition: {
          duration: star.pulseDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      };
    }
    return {};
  };

  if (!isVisible) return null;

  return (
    <div className="background">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            background: `${star.color}`,
            opacity: star.baseOpacity,
          }}
          animate={getStarAnimation(star)}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import './styles.css';

// const AnimatedBackground = () => {
//   const [stars, setStars] = useState([]);

//   useEffect(() => {
//     generateStarsAnimation();

//     const handleResize = () => {
//       generateStarsAnimation();
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const generateStarsAnimation = () => {
//     const countStars = Math.floor(
//       (window.innerWidth * window.innerHeight) / 2000 // Увеличил делитель для меньшей плотности
//     );

//     const neonColors = [
//       '#ffffff',
//       'rgba(43, 87, 168, 1)',
//       '#ffffff',
//       'rgb(254,6,110)',
//       '#ffffff',
//     ];

//     const newStars = [];
//     for (let i = 0; i < countStars; i++) {
//       const color = neonColors[Math.floor(Math.random() * neonColors.length)];

//       // Более разнообразные параметры для естественного эффекта
//       const size = Math.random() * 3 + 0.5;
//       const baseOpacity = Math.random() * 0.4 + 0.1;

//       newStars.push({
//         id: i,
//         size,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         baseOpacity,
//         // Параметры для разных типов анимаций
//         animationType: Math.random() > 0.7 ? 'pulse' : 'drift',
//         // Для дрейфа - случайное направление и расстояние
//         driftDistance: Math.random() * 10 + 2,
//         driftAngle: Math.random() * 360,
//         // Для пульсации - разная интенсивность
//         pulseIntensity: Math.random() * 0.5 + 0.2,
//         pulseDuration: Math.random() * 4 + 3,
//         // Общие параметры
//         color,
//         duration: Math.random() * 8 + 4, // Более длительные анимации
//       });
//     }
//     setStars(newStars);
//   };

//   // Варианты анимации для Framer Motion
//   const getStarAnimation = (star) => {
//     if (star.animationType === 'pulse') {
//       return {
//         opacity: [
//           star.baseOpacity,
//           star.baseOpacity + star.pulseIntensity,
//           star.baseOpacity,
//         ],
//         scale: [1, 1.2, 1],
//         transition: {
//           duration: star.pulseDuration,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         },
//       };
//     } else {
//       // Анимация дрейфа (медленного перемещения)
//       const rad = (star.driftAngle * Math.PI) / 180;
//       const x = Math.cos(rad) * star.driftDistance;
//       const y = Math.sin(rad) * star.driftDistance;

//       return {
//         x: [0, x, 0],
//         y: [0, y, 0],
//         opacity: [star.baseOpacity, star.baseOpacity * 0.7, star.baseOpacity],
//         transition: {
//           duration: star.duration,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         },
//       };
//     }
//   };

//   return (
//     <div className="background">
//       {stars.map((star) => (
//         <motion.div
//           key={star.id}
//           className="star"
//           style={{
//             width: `${star.size}px`,
//             height: `${star.size}px`,
//             left: `${star.x}%`,
//             top: `${star.y}%`,
//             background: `${star.color}`,
//             boxShadow: `0 0 ${star.size * 2}px ${star.color}`, // Добавляем свечение
//           }}
//           animate={getStarAnimation(star)}
//           initial={false}
//         />
//       ))}
//     </div>
//   );
// };

// export default AnimatedBackground;
