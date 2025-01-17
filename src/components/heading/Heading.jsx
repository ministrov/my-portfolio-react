import "./style.css";

const Heading = ({ title, slogan, className = '', }) => {
  return (
    <h2 className="heading heading-sec heading-sec__mb-med">
      <span className={`heading-sec__main ${className}`}>{title}</span>
      <span className={`heading-sec__sub ${className}`}>{slogan}</span>
    </h2>
  );
};

export default Heading;
