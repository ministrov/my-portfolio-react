import Heading from '../heading/Heading';
import './style.css';

const AboutCapabilities = () => {
  return (
    <section className="about-capabilities">
      <div className="container">
        <div className="about-capabilities__wrapper">
          <Heading title={'My Capabilities'} />

          <div className="about-capabilites__text">
            <p>
              I am always looking to add more skills.Morbi egestas neque eu
              blandit fermentum. Nulla ac lobortis ligula. Pellentesque ac ex at
              purus faucibus tristique ut et dolor.{' '}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCapabilities;
