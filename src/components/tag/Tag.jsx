import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент тега для отображения категорий, технологий или меток.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {React.ReactNode} props.children - Содержимое тега (текст или элементы).
 * @returns {JSX.Element} Элемент списка (`<li>`) с классом `tag`.
 *
 * @example
 * <Tag>React</Tag>
 */
const Tag = ({ children, ...props }) => {
  return (
    <li className="tag" {...props}>
      {children}
    </li>
  );
};

Tag.propTypes = {
  /** Содержимое тега */
  children: PropTypes.node.isRequired,
};

export default Tag;
