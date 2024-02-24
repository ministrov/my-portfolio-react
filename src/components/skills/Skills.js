import { motion } from "framer-motion";
import HomeSkills from "../../helpers/homeSkills";
import Heading from "../heading/Heading";
import "./style.css";

const Skills = () => {
  return (
    <section className="skills">
      <Heading
        title={"My Skills"}
        slogan={
          "Unleash the power of code and create extraordinary digital experiences."
        }
        className="skills__title"
      ></Heading>

      <div className="container">
        <div className="skills__wrapper">
          <motion.div
            className="skills__left"
            initial={{ x: -50, opacity: 1 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "tween", duration: 1 }}
          >
            <h3 className="skills__left-heading">My Skills</h3>

            <div className="skills__content-wrapper">
              {HomeSkills.map((skill) => (
                <div key={skill.id} className="skill__card">
                  <div className="skill__card-icon">{skill.icon}</div>
                  <span className="skill__card-header">{skill.tech}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="skills__right"
            initial={{ x: 50, opacity: 1 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "tween", duration: 1 }}
          >
            <h3 className="skills__right-heading">Get to know me!</h3>

            <div className="skills__right-content">
              <p className="skills__text">
                As a Developer, I have a wide range of experience in front-end
                development. I am proficient in JavaScript , React, Vue , HTML and
                CSS. My strong experience in building responsive and dynamic
                interfaces using React and Redux, and some time I can use vanilly
                JS, if it needs to my clients. It is allowed me to create engaging
                and interactive web applications.
              </p>
              <p className="skills__text">
                I have experience in using React for building scalable and
                maintainable applications. This has allowed me to create efficient
                and sustainable code that can adept to the changing needs of a
                business.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
