import './style.css';

const ServicesList = ({ children }) => {
  return (
    <ul
      className="services__list"
    >
      {children}
    </ul>
  );
}

export default ServicesList;