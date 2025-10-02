import { useTranslation } from 'react-i18next';
import './style.css';

const AccordionPanel = ({ item, isOpen }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return <div className="faq__answer">{item.answer && t(item.answer)}</div>;
};

export default AccordionPanel;

// import { motion, AnimatePresence } from 'framer-motion';
// import { useTranslation } from 'react-i18next';
// import './style.css';

// const AccordionPanel = ({ item, isOpen }) => {
//   const { t } = useTranslation();
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="faq__answer"
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           exit={{ opacity: 0, height: 0 }}
//           transition={{ duration: 0.5, ease: 'easeInOut' }}
//         >
//           {item.answer && t(item.answer)}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default AccordionPanel;
