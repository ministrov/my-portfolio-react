import { motion } from 'framer-motion';
import HomeSkills from '../../helpers/homeSkills';
import Heading from '../heading/Heading';
import './style.css';

const Skills = () => {
  return (
    <section className="skills">
      <Heading className="skills__title">My Skills</Heading>

      <div className="container">
        <div className="skills__wrapper">
          <motion.div
            className="skills__left"
            initial={{ x: -50, opacity: 1 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: 'tween', duration: 1 }}
          >
            {HomeSkills.map(skill => (
              <div
                key={skill.id}
                className="skill__card"
              >
                <div className="skill__card-icon">
                  {skill.icon}
                </div>
                <div className="skill__card-header">
                  {skill.tech}
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div
            className="skills__right"
            initial={{ x: 50, opacity: 1 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: 'tween', duration: 1 }}
          >
            <h4>What <span>I can do</span></h4>

            <p>
              As a Developer, I have a wide range of experience in front-end development. I am proficient in JavaScript , React, Vue , HTML and CSS. My strong experience in building responsive and dynamic interfaces using React and Redux, and some time I can use vanilly JS, if it needs to my clients. It is allowed me to create engaging and interactive web applications.
            </p>
            <p>
              I have experience in using React for building scalable and maintainable applications. This has allowed me to create efficient and sustainable code that can adept to the changing needs of a business.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Skills;