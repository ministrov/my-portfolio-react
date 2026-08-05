import { Trans, useTranslation } from 'react-i18next';
import { m } from 'motion/react';
import { memo } from 'react';
import './style.css';

/** Коэффициент задержки появления карточек (в секундах) для stagger-эффекта. */
const ANIMATION_DELAY_FACTOR = 0.15;

/**
 * Компонент элемента списка преимуществ.
 * Отображает иконку (react-icons компонент) и текстовое описание с поддержкой
 * перевода и выделения. Появляется с анимацией fade-in при попадании во
 * вьюпорт (Framer Motion).
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string} props.text - Ключ перевода для текста элемента
 * @param {React.ComponentType} props.icon - react-icons компонент
 * @param {number} [props.index=0] - Порядковый индекс для расчёта задержки анимации
 * @param {Object} props... - Дополнительные пропсы, передаваемые в элемент li
 * @example
 * <AdvantagesItem text="advantages.items.sixth" icon={BsPhone} index={5} />
 */
const AdvantagesItem = ({ text, icon: Icon, index = 0, ...props }) => {
  // Trans не подписывается на смену языка самостоятельно — без этого вызова
  // memo блокирует ре-рендер элемента при смене языка
  useTranslation();

  return (
    <m.li
      className="advantages__item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3, delay: index * ANIMATION_DELAY_FACTOR }}
      {...props}
    >
      <Icon className="advantages__item-img" aria-hidden="true" />
      <p className="advantages__item-text">
        <Trans i18nKey={text} components={{ highlight: <strong /> }} />
      </p>
    </m.li>
  );
};

export default memo(AdvantagesItem);
