import { LazyMotion, m, domAnimation } from 'framer-motion';
import { FaPlus } from 'react-icons/fa6';
import './style.css';

const AccordionButton = ({ isActive, id }) => {
  const iconVariants = {
    open: { rotate: 45 },
    closed: { rotate: 0 },
  };
  const ariaLabel = isActive ? 'Collapse section' : 'Expand section';

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        type="button"
        className="faq__button"
        variants={iconVariants}
        animate={isActive ? 'open' : 'closed'}
        transition={{ duration: 0.4 }}
        aria-expanded={isActive}
        aria-controls={`panel-${id}`}
        aria-label={ariaLabel}
      >
        <FaPlus />
      </m.button>
    </LazyMotion>
  );
};

export default AccordionButton;

// import { motion } from 'framer-motion';
// import { FaPlus } from 'react-icons/fa6';
// import './style.css';

// const AccordionButton = ({ isActive, id }) => {
//   const iconVariants = {
//     open: { rotate: 45 },
//     closed: { rotate: 0 },
//   };
//   const ariaLabel = isActive ? 'Collapse section' : 'Expand section';

//   return (
//     <motion.button
//       type="button"
//       className="faq__button"
//       variants={iconVariants}
//       animate={isActive ? 'open' : 'closed'}
//       transition={{ duration: 0.4 }}
//       aria-expanded={isActive ? 'true' : 'false'}
//       aria-controls={`panel-${id}`}
//       aria-label={ariaLabel}
//     >
//       <FaPlus />
//     </motion.button>
//   );
// };

// export default AccordionButton;
