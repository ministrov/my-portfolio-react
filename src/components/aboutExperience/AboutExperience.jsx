import { useState } from 'react';
import Heading from '../heading/Heading';
import './style.css';

const AboutExperience = () => {
  const [isBlack, setIsBlack] = useState(false);

  return (
    <section
      className={`about-experience ${isBlack ? 'about-experience--dark' : ''}`}
    >
      <div className="container">
        <Heading title={'My Experience'} />

        <div>AboutExperience</div>

        <button onClick={() => setIsBlack((prev) => !prev)} type="button">
          Сменить фон
        </button>
      </div>
    </section>
  );
};

export default AboutExperience;
