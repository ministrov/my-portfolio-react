import { motion } from 'framer-motion';
import Button from '../button/Button';
// import Video from '../video/Video';
import Heading from '../heading/Heading';
import myPicture from '../../img/my-avatar.jpg';
import './style.css';

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <Heading className="about__title title-2">About</Heading>

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
                <Button href={"#!"} text={"Read more >"} />
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

        <motion.p
          className="about__descr"
          initial={{ x: -50, opacity: 1 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: 'tween', duration: 1.2 }}
        >
          Stack: HTML, CSS, ECMAScript 6 (ES6), React, Vue<br />
          <br />
          I am developing cross-platform web applications on HTML, CSS, ECMAScript 6 (ES6), React, Vue<br />
          <br />
          Since July 2021 I have been working in the company "Service Market" LLC, I am engaged in the maintenance and refinement of the site vamvoda.ru . As well as web development of a new company website from scratch . The company is engaged in the retail trade of water and food, as well as soft drinks.<br />
          <br />
          I will consider invitations to the role of junior Frontend Developer / HTML-coder.<br />
          <br />
          - Due to my vast life experience, I easily build communication with designers and testers, Backend developers and all team members.<br />

          - I am not afraid to learn new things<br />
          - I approach any task responsibly, I do it efficiently, I pay attention to details<br />
          - I have experience working in projects with different technologies: HTML, PUG, CSS, ECMAScript 6 (ES6), React, Vue, etc.<br />
          <br />
          I like to do my job efficiently, I know how to meet
          deadlines, quickly assimilate new information, attentive to details.
        </motion.p>
      </div>
      {/* <Video /> */}
    </section>
  );
}

export default About
