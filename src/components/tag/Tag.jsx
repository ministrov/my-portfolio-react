import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент тега для отображения категорий, технологий или меток.
 * Поддерживает forwardRef для совместимости с motion() из Framer Motion.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {React.ReactNode} props.children - Содержимое тега (текст или элементы).
 * @param {React.Ref} ref - Реф, прокидываемый на корневой `<li>`.
 * @returns {JSX.Element} Элемент списка (`<li>`) с классом `tag`.
 *
 * @example
 * <Tag>React</Tag>
 */
const Tag = forwardRef(({ children, ...props }, ref) => {
  return (
    <li ref={ref} className="tag" {...props}>
      {children}
    </li>
  );
});

Tag.propTypes = {
  /** Содержимое тега */
  children: PropTypes.node.isRequired,
};

export default Tag;
