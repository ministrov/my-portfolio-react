import { VscTerminalCmd } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import './style.css';

/**
 * Компонент логотипа сайта с иконкой и текстом
 * @param {Object} props - Свойства компонента
 * @param {string} [props.className=''] - Дополнительные CSS-классы
 * @param {string} [props.color='#0058a7'] - Цвет иконки (HEX). Используется только если variant не задан
 * @param {string} [props.variant] - Вариант оформления. 'default' (синий), 'white' (белый), 'monochrome' (чёрно-белый)
 * @param {string} [props.size='medium'] - Размер логотипа. 'small', 'medium', 'large'
 * @param {boolean} [props.showIcon=true] - Показывать ли иконку
 * @param {string} [props.text='AntoshkinDev'] - Текст логотипа
 * @returns {JSX.Element} Элемент логотипа
 */
const Logo = ({
  className = '',
  color = '#0058a7',
  variant,
  size = 'medium',
  showIcon = true,
  text = 'AntoshkinDev',
}) => {
  // Определяем классы на основе пропсов
  const linkClasses = [
    'logo',
    'logo__link',
    variant ? `logo__link--${variant}` : '',
    `logo--${size}`,
    className,
  ].filter(Boolean).join(' ');

  // Цвет иконки: если задан variant, используем CSS, иначе переданный color
  const iconColor = variant ? undefined : color;

  return (
    <Link
      to="/"
      className={linkClasses}
      aria-label={`${text} - главная страница`}
    >
      {showIcon && (
        <VscTerminalCmd
          className="logo__icon"
          size={size === 'small' ? 28 : size === 'large' ? 48 : 38}
          color={iconColor}
        />
      )}
      <span className="logo__text">{text}</span>
    </Link>
  );
};

export default Logo;
