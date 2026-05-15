import { Trans } from 'react-i18next';
import { memo } from 'react';
import './style.css';

/**
 * Компонент элемента списка преимуществ.
 * Отображает иконку преимущества и текстовое описание с поддержкой перевода и выделения.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string} props.text - Ключ перевода для текста элемента
 * @param {string} props.icon - URL иконки элемента
 * @param {string} [props.altText=''] - Альтернативный текст для изображения
 * @param {Object} props... - Дополнительные пропсы, передаваемые в элемент li
 * @example
 * <AdvantagesItem
 *   text="advantages.items.quality"
 *   icon="/path/to/icon.svg"
 *   altText="Качество"
 * />
 */
const AdvantagesItem = ({ text, icon, altText = '', ...props }) => {
  // Константы для размеров изображения
  const IMG_WIDTH = 56;
  const IMG_HEIGHT = 56;

  return (
    <li className="advantages__item" {...props}>
      <img
        className="advantages__item-img"
        src={icon}
        width={IMG_WIDTH}
        height={IMG_HEIGHT}
        alt={altText}
        loading="lazy"
      />
      <p className="advantages__item-text">
        <Trans i18nKey={text} components={{ hightlight: <strong /> }} />
      </p>
    </li>
  );
};

export default memo(AdvantagesItem);
