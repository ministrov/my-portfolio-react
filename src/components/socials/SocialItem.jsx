import './style.css';
import PropTypes from 'prop-types';

/**
 * Компонент элемента социальной сети.
 * Отображает иконку социальной сети в виде кликабельной ссылки.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.social - Объект социальной сети.
 * @param {React.ReactNode} props.social.icon - Иконка социальной сети (React-элемент).
 * @param {string} props.social.name - Название социальной сети (например, 'github').
 * @param {string} props.social.path - URL-адрес профиля.
 * @param {string} [props.variant='white'] - Вариант стилизации ('white' или 'blue').
 * @param {Object} [props.rest] - Дополнительные атрибуты для элемента <a>.
 * @returns {JSX.Element} Элемент списка с ссылкой на социальную сеть.
 */
const SocialItem = ({ social, variant = 'white', ...rest }) => {
  if (!social || !social.path) {
    console.warn('SocialItem: проп social или social.path отсутствует');
    return null;
  }

  const { icon, name, path } = social;

  // Формируем читаемый текст для accessibility
  const socialNameMap = {
    github: 'GitHub',
    telegram: 'Telegram',
    vk: 'ВКонтакте',
  };

  const displayName = socialNameMap[name] || name;
  const ariaLabel = `Перейти в ${displayName} (открывается в новой вкладке)`;

  return (
    <li className="socials__item">
      <a
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        title={`${displayName}`}
        className={`socials__link socials__link--${variant}`}
        tabIndex={0}
        {...rest}
      >
        {icon}
      </a>
    </li>
  );
};

SocialItem.propTypes = {
  social: PropTypes.shape({
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  variant: PropTypes.oneOf(['white', 'blue']),
};

export default SocialItem;
