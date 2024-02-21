import './style.css';

const Heading = ({ children, className }) => {
  console.log(className);
  return (
    <h2 class="heading heading-sec heading-sec__mb-med">
        <span class="heading-sec__main">{children}</span>
        <span class="heading-sec__sub">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis
          tempora explicabo quae quod deserunt eius sapiente
        </span>
    </h2>
  )
};

export default Heading;