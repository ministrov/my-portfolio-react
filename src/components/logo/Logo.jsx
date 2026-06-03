import { VscTerminalCmd } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент логотипа сайта с иконкой и текстом. Ведёт на главную;
 * доступное имя ссылки локализуется из словаря `logo`.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {string} [props.className=''] - Дополнительные CSS-классы
 * @param {string} [props.color='#0058a7'] - Цвет иконки (HEX). Используется только если variant не задан
 * @param {('white'|'monochrome')} [props.variant] - Вариант оформления; не задан — синий по умолчанию
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Размер логотипа
 * @param {boolean} [props.showIcon=true] - Показывать ли иконку
 * @param {string} [props.text='AntoshkinDev'] - Текст логотипа
 * @returns {JSX.Element} Элемент логотипа
 *
 * @example
 * <Logo />
 * <Logo variant="white" size="large" />
 */
const Logo = ({
  className = '',
  color = '#0058a7',
  variant,
  size = 'medium',
  showIcon = true,
  text = 'AntoshkinDev',
}) => {
  const { t } = useTranslation();

  // Определяем классы на основе пропсов
  const linkClasses = [
    'logo',
    'logo__link',
    variant ? `logo__link--${variant}` : '',
    `logo--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Цвет иконки: если задан variant, используем CSS, иначе переданный color
  const iconColor = variant ? undefined : color;

  return (
    <Link
      to="/"
      className={linkClasses}
      aria-label={t('logo.ariaLabel', { text })}
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

Logo.propTypes = {
  /** Дополнительные CSS-классы */
  className: PropTypes.string,
  /** Цвет иконки (HEX); применяется только без variant */
  color: PropTypes.string,
  /** Вариант оформления; не задан — синий по умолчанию */
  variant: PropTypes.oneOf(['white', 'monochrome']),
  /** Размер логотипа */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Показывать ли иконку */
  showIcon: PropTypes.bool,
  /** Текст логотипа */
  text: PropTypes.string,
};

export default Logo;
