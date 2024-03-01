import { motion } from 'framer-motion';
import Button from '../button/Button';
import Heading from '../heading/Heading';
import myPicture from '../../img/my-avatar.jpg';
import './style.css';

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <Heading title={"About"} slogan={"Unleash the power of code and create extraordinary digital experiences."} className="about__title"></Heading>

        <section className="about-section">
          <div className="about-section__bottom">
            <motion.div
              className="about-section__left"
              initial={{ x: -50, opacity: 1 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ type: 'tween', duration: 1 }}
            >
              
              <p className="about-section__description">
                Hi, I'm Anton!
                <br />
                <br />
                I am a frontend developer with 3 years of experience. I specialize in creating functional and beautiful interfaces for web applications. My job is to help the customer realize his idea and make the product user-friendly.
                <br />
                <br />
                To achieve this goal, I use the most modern technologies and tools. I also pay great attention to communication with the team and the customer in order to understand their needs and offer optimal solutions.
                I will be glad to discuss your project and contribute to its success.portfolio, I showcase a range of projects that demonstrate my technical proficiency, design skills, and ability to work collaboratively with teams to achieve project goals.
              </p>

              <div className="about-section__button-block">
                <Button href={"#!"} text={"Read more >"} className={"btn--theme btn--med"} />
              </div>
            </motion.div>

            <motion.div
              className="about-section__right"
              initial={{ x: 50, opacity: 1 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ type: 'tween', duration: 1 }}
            >
              <img
                className="about-section__image"
                src={myPicture}
                alt="Focus on author's face"
              />
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default About
