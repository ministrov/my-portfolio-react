import './style.css';

const Heading = ({ title, slogan, className }) => {
  console.log(className);
  return (
    <h2 className="heading heading-sec heading-sec__mb-med">
      <span className="heading-sec__main">{title}</span>
      <span className="heading-sec__sub">{slogan}</span>
    </h2>
  )
};

export default Heading;