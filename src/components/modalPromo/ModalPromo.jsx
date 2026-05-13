import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import fire from '../../assets/svg/fire.svg';
import './style.css';

/**
 * Компонент для отображения промо-акции в модальном окне.
 * 
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} [props.text] - Текст промо-акции. Если не указан, используется перевод из i18n.
 * @param {string} [props.icon] - URL иконки. По умолчанию используется fire.svg.
 * @param {string} [props.testId] - ID для тестирования.
 * @param {string} [props.className] - Дополнительные CSS-классы.
 * @returns {JSX.Element} Элемент промо-акции с анимацией.
 * 
 * @example
 * <ModalPromo />
 * 
 * @example
 * <ModalPromo text="Special Offer -30%" icon="/path/to/icon.svg" />
 */
const ModalPromo = ({
  text,
  icon = fire,
  testId = 'modal-promo',
  className = '',
}) => {
  const { t } = useTranslation();

  const promoText = text || t('modal.promoText', 'Development -50%');

  const animationVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={`modal__promo modal-promo ${className}`.trim()}
        data-testid={testId}
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        aria-label={promoText}
        role="status"
      >
        <img
          className="modal-promo__icon"
          src={icon}
          alt={t('modal.promoIconAlt', 'Promotion fire icon')}
          width={35}
          height={47}
          loading="lazy"
        />
        {promoText}
      </m.div>
    </LazyMotion>
  );
};

export default memo(ModalPromo);
