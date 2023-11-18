import './style.css';

const Heading = ({ children, className }) => {
  return <h3 className={className}>
    {children}
  </h3>;
};

export default Heading;