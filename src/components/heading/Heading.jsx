import "./style.css";

const Heading = ({ title, slogan, className = '', }) => {
  return (
    <h3 className="heading heading-sec heading-sec__mb-med">
      <span className={`heading-sec__main ${className}`}>{title}</span>
      <span className={`heading-sec__sub ${className}`}>{slogan}</span>
    </h3>
  );
};

export default Heading;
