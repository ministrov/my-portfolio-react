import { useTranslation } from 'react-i18next';
import { BsArrowDownRight } from 'react-icons/bs';
import './style.css';

const ServicesListItem = ({ service, open, onClick }) => {
  const { id, icon, title, description } = service;
  const { t } = useTranslation();

  return (
    <li className={`services__item ${open ? "services__expanded" : ""}`}>
      <div className="services__item-block">
        <div className="services__item-text text-outline">{`0${id}`}</div>
        <BsArrowDownRight className="services__arrow" />
      </div>
      <div className="services__icon">{icon}</div>
      <h2 className="services__subheading">{title}</h2>
      <p className="services__description">{description}</p>

      <button
        className="services__more"
        onClick={onClick}
        aria-expanded={open}
      >
        {open ? t('services.hide') : t('services.showMore')}
      </button>
    </li>
  );
};

export default ServicesListItem;

// // Import necessary components and libraries
// import { motion, AnimatePresence } from 'framer-motion';
// import { useTranslation } from 'react-i18next';
// import { BsArrowDownRight } from 'react-icons/bs';

// // Определение вариантов анимации для эффекта раскрытия карточки
// const cardVariants = {
//   closed: { height: 'fit-content', opacity: 0 },
//   opened: { height: 'auto', opacity: 1, transition: { delay: 0.1, duration: 0.4 } }
// };

// // Основной компонент списка услуг
// const ServicesListItem = ({ service, open, onClick }) => {
//   const { id, icon, title, description } = service;
//   const { t } = useTranslation(); // Получаем локализованные тексты

//   return (
//     <AnimatePresence mode="wait">
//       <motion.li
//         key={service.id}
//         className="services__item"
//         variants={cardVariants}
//         initial="closed"
//         animate={open ? "opened" : "closed"}
//         // style={{ padding: '3rem', fontSize: '1rem', lineHeight: '1.2', color: 'var(--color-blue-700)' }}
//       >
//         <div className="services__item-block">
//           <div className="services__item-text text-outline">0{id}</div>
//           <BsArrowDownRight className="services__arrow" />
//         </div>

//         <div className="services__icon">{icon}</div>
//         <h2 className="services__subheading">{title}</h2>

//         {/* Анимированное содержимое, которое открывается постепенно */}
//         <motion.div
//           className="services__content"
//           layoutId={`${service.id}-content`}
//           style={{ overflow: 'hidden' }}
//         >
//           <p className="services__description">{description}</p>
//         </motion.div>

//         {/* Кнопка для управления раскрытием карточки */}
//         <button
//           className="services__more"
//           onClick={onClick}
//           aria-expanded={open}
//         >
//           {open ? t('services.hide') : t('services.showMore')}
//         </button>
//       </motion.li>
//     </AnimatePresence>
//   );
// };

// export default ServicesListItem;
