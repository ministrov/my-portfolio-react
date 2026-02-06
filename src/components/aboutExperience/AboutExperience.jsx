import { useState } from 'react';
import Heading from '../heading/Heading';
import './style.css';

const AboutExperience = () => {
  const [color, setColor] = useState(false);

  console.log(color);

  return (
    <section
      className={`about-experience ${color ? 'about-experience--dark' : ''}`}
    >
      <div className="container">
        <Heading title={'My Experience'} />

        <div>AboutExperience</div>

        <button onClick={() => setColor((prev) => !prev)} type="button">
          Сменить фон
        </button>
      </div>
    </section>
  );
};

export default AboutExperience;
