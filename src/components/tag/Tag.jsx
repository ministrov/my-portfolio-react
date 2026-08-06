import { forwardRef } from 'react';
import './style.css';

/**
 * Компонент тега для отображения категорий, технологий или меток.
 * Поддерживает forwardRef для совместимости с m.create() из motion.
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

export default Tag;
