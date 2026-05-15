import { memo } from 'react';
import './style.css';

/**
 * Компонент-контейнер для списка преимуществ.
 * Оборачивает элементы AdvantagesItem в семантический список.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {React.ReactNode} props.children - Дочерние элементы (AdvantagesItem)
 * @example
 * <AdvantagesList>
 *   <AdvantagesItem ... />
 *   <AdvantagesItem ... />
 * </AdvantagesList>
 */
const AdvantagesList = ({ children }) => {
  return <ul className="advantages__list">{children}</ul>;
};

export default memo(AdvantagesList);
