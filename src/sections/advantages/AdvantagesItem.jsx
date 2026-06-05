import { Trans } from 'react-i18next';
import { m } from 'framer-motion';
import { memo } from 'react';
import './style.css';

/** Размер иконки преимущества в пикселях (квадрат). */
const ICON_SIZE = 56;

/** Коэффициент задержки появления карточек (в секундах) для stagger-эффекта. */
const ANIMATION_DELAY_FACTOR = 0.15;

/**
 * Компонент элемента списка преимуществ.
 * Отображает иконку и текстовое описание с поддержкой перевода и выделения.
 * Появляется с анимацией fade-in при попадании во вьюпорт (Framer Motion).
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string} props.text - Ключ перевода для текста элемента
 * @param {string} props.icon - URL иконки элемента
 * @param {string} [props.altText=''] - Альтернативный текст для изображения
 * @param {number} [props.index=0] - Порядковый индекс для расчёта задержки анимации
 * @param {Object} props... - Дополнительные пропсы, передаваемые в элемент li
 * @example
 * <AdvantagesItem
 *   text="advantages.items.first"
 *   icon="/path/to/icon.svg"
 *   altText="Иконка: сайт"
 *   index={0}
 * />
 */
const AdvantagesItem = ({ text, icon, altText = '', index = 0, ...props }) => (
  <m.li
    className="advantages__item"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.3, delay: index * ANIMATION_DELAY_FACTOR }}
    {...props}
  >
    <img
      className="advantages__item-img"
      src={icon}
      width={ICON_SIZE}
      height={ICON_SIZE}
      alt={altText}
      loading="lazy"
    />
    <p className="advantages__item-text">
      <Trans i18nKey={text} components={{ highlight: <strong /> }} />
    </p>
  </m.li>
);

export default memo(AdvantagesItem);
