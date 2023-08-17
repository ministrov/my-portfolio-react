import { motion } from 'framer-motion';
import Button from '../button/Button';
import Video from '../video/Video';
import myPicture from '../../img/my-avatar.jpg';
import './style.css';

// const TIME_LINE = {
//   textAlign: 'center'
// };

const About = () => {
  return (
    <section className="about">

      <div className="container">
        <h2 className="about__title title-2">About</h2>

        {/* <div className="about__time-line time-line" style={TIME_LINE}>
          <h3>Time line section</h3>
        </div> */}

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

        <section className="about-section">
          <div className="about-section__bottom">
            <motion.div
              className="about-section__left"
              initial={{ x: -50, opacity: 1 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ type: 'tween', duration: 1 }}
            >
              <div className="about-section__title-block">
                <div className="about-section__title-wrapper">
                  <h2 className="about-section__title title-1">#about-me</h2>
                  <div className="about-section__title-line">--------------</div>
                </div>
              </div>
              <p className="about-section__description">
                Hi, I'm Anton!
                <br />
                <br />
                I'm a junior frontend developer with a passion for creating beautiful and functional websites. With a year and a half of experience in the industry, I have honed my skills in technical development, design principles, user experience, and effective communication.
                <br />
                <br />
                Through my work, I strive to create engaging and intuitive web experiences that delight users and drive business results. In this portfolio, I showcase a range of projects that demonstrate my technical proficiency, design skills, and ability to work collaboratively with teams to achieve project goals.
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
      </div>

      <Video />
    </section>
  );
}

export default About
