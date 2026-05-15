import './style.css';

/**
 * Компонент-обёртка для списка услуг
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Дочерние элементы (элементы списка)
 * @returns {JSX.Element} Элемент списка услуг
 */
const ServicesList = ({ children }) => {
  return <ul className="services__list">{children}</ul>;
};

export default ServicesList;
