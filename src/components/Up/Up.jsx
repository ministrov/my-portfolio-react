import { useEffect, useState, useCallback } from 'react';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { FaLongArrowAltUp } from 'react-icons/fa';
import './style.css';

const Up = () => {
  const [isShowed, setIsShowed] = useState(false);

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsShowed(window.scrollY >= 300);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isShowed) return;
      switch (e.key) {
        case 'Escape':
          setIsShowed(false);
          break;
        case 'Enter':
          if (isShowed) scrollToTop();
          break;
        default:
          break;
      }
    },
    [isShowed]
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleScroll, handleKeyDown]);

  return (
    <AnimatePresence>
      {isShowed && (
        <LazyMotion features={domAnimation}>
          <m.button
            type="button"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="scroll-to"
            onClick={scrollToTop}
            onKeyDown={handleKeyDown}
            aria-label="Вернуться в начало страницы"
          >
            <FaLongArrowAltUp size={20} color="white" />
          </m.button>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};

export default Up;

// import { useEffect, useState, useCallback } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { FaLongArrowAltUp } from 'react-icons/fa';
// import './style.css';

// const Up = () => {
//   const [isShowed, setIsShowed] = useState(false);

//   const handleScroll = useCallback(() => {
//     if (typeof window !== 'undefined') {
//       setIsShowed(window.scrollY >= 300);
//     }
//   }, []);

//   const handleKeyDown = useCallback(
//     (e) => {
//       if (!isShowed) return;
//       switch (e.key) {
//         case 'Escape':
//           setIsShowed(false);
//           break;
//         case 'Enter':
//           if (isShowed) scrollToTop();
//           break;
//         default:
//           break;
//       }
//     },
//     [isShowed]
//   );

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   useEffect(() => {
//     if (typeof window === 'undefined') {
//       return;
//     }

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [handleScroll, handleKeyDown]);

//   return (
//     <AnimatePresence>
//       {isShowed && (
//         <motion.button
//           type="button"
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: 50, opacity: 0 }}
//           transition={{ duration: 0.65, ease: 'easeOut' }}
//           className="scroll-to"
//           onClick={scrollToTop}
//           onKeyDown={handleKeyDown}
//           aria-label="Вернуться в начало страницы"
//         >
//           <FaLongArrowAltUp size={20} color="white" />
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Up;
