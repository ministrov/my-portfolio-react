import { forwardRef } from 'react';
import './style.css';

/**
 * Компонент тега для отображения категорий, технологий или меток.
 * Поддерживает два цветовых варианта: красный (red) и фиолетовый (purple) по умолчанию.
 * Компонент обёрнут в `forwardRef` для передачи ref на DOM-элемент `<li>`.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {React.ReactNode} props.children - Содержимое тега (текст или элементы).
 * @param {string|null} [props.color=null] - Цвет тега. Если `'red'`, применяется класс `red`, иначе `purple`.
 * @param {React.Ref} ref - Ref, который будет прикреплён к корневому элементу `<li>`.
 * @returns {JSX.Element} Элемент списка (`<li>`) с классом `tag` и соответствующим модификатором цвета.
 *
 * @example
 * // Базовое использование (фиолетовый тег)
 * <Tag>React</Tag>
 *
 * @example
 * // Красный тег
 * <Tag color="red">Срочно</Tag>
 *
 * @example
 * // С передачей дополнительных атрибутов
 * <Tag color="red" onClick={handleClick} aria-label="Тег React">
 *   React
 * </Tag>
 */
const Tag = forwardRef(({ children, color = null, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={`tag ${color === 'red' ? 'red' : 'purple'}`}
      {...props}
    >
      {children}
    </li>
  );
});

Tag.displayName = 'Tag';

export default Tag;
