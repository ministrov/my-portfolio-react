import { useTranslation } from 'react-i18next';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import AccordionPanel from '../accordionPanel/AccordionPanel';
import AccordionButton from '../accordionButton/AccordionButton';
import './style.css';

const AccordionItem = ({ item, isActive, onClick }) => {
  const { t } = useTranslation();

  const itemVariants = {
    hidden: {
      x: '-100vw',
      y: 20,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 14,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.li className={'faq__item'} variants={itemVariants}>
        <div
          className={'faq__question'}
          onClick={() => onClick(item.id)}
          role="button"
          tabIndex={0}
          aria-expanded={isActive}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick(item.id);
            }
          }}
        >
          <h3>{t(item.question)}</h3>
          <AccordionButton isActive={isActive} />
        </div>

        <AccordionPanel item={item} open={isActive} />
      </m.li>
    </LazyMotion>
  );
};

export default AccordionItem;

// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import AccordionPanel from '../accordionPanel/AccordionPanel';
// import AccordionButton from '../accordionButton/AccordionButton';
// import './style.css';

// const AccordionItem = ({ item, isActive, onClick }) => {
//   const { t } = useTranslation();

//   const itemVariants = {
//     hidden: {
//       x: '-100vw',
//       y: 20,
//       opacity: 0,
//     },
//     visible: {
//       x: 0,
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: 'spring',
//         stiffness: 60,
//         damping: 14,
//       },
//     },
//   };

//   return (
//     <motion.li className={'faq__item'} variants={itemVariants}>
//       <div
//         className={'faq__question'}
//         onClick={() => onClick(item.id)}
//         role="button"
//         aria-expanded={isActive}
//       >
//         <h3>{t(item.question)}</h3>
//         <AccordionButton isActive={isActive} />
//       </div>

//       <AccordionPanel item={item} open={isActive} />
//     </motion.li>
//   );
// };

// export default AccordionItem;
