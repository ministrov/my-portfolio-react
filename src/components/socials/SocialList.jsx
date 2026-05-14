import SocialItem from './SocialItem.jsx';
import { socials } from './socials.js';
import './style.css';
import PropTypes from 'prop-types';

/**
 * Компонент списка социальных сетей.
 * Отображает список иконок социальных сетей с возможностью кастомизации класса и варианта стиля.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {string} [props.className='socials__list'] - Дополнительный CSS-класс для контейнера списка.
 * @param {string} [props.variant='white'] - Вариант стилизации элементов ('white' или 'blue').
 * @returns {JSX.Element} Неупорядоченный список элементов социальных сетей.
 */
const SocialList = ({ className = 'socials__list', variant = 'white' }) => {
  return (
    <ul className={`socials ${className}`}>
      {socials.map((social) => (
        <SocialItem key={social.name} social={social} variant={variant} />
      ))}
    </ul>
  );
};

SocialList.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['white', 'blue']),
};

export default SocialList;
