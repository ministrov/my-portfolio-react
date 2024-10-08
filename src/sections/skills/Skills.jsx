import Heading from "../../components/heading/Heading";
import SkillComponet from "../../components/skillComponent/SkillComponent";
import { skills } from "../../data/skills";
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
          <div
            className="skills__left"
          >
            <h3 className="skills__left-heading">My Skills</h3>

            <div role="contentinfo" className="skills__content-wrapper">
              {skills.map((skill) => (
                <SkillComponet
                  variant={"skill-icon"}
                  key={skill.id}
                  skill={skill}
                />
              ))}
            </div>
          </div>
          <div
            className="skills__right"
          >
            <h3 className="skills__right-heading">Get to know me!</h3>

            <div className="skills__right-content">
              <p className="skills__text">
                As a Developer, I have a wide range of experience in front-end
                development. I am proficient in JavaScript , React, Vue , HTML
                and CSS. My strong experience in building responsive and dynamic
                interfaces using React and Redux, and some time I can use
                vanilly JS, if it needs to my clients. It is allowed me to
                create engaging and interactive web applications.
              </p>
              <p className="skills__text">
                I have experience in using React for building scalable and
                maintainable applications. This has allowed me to create
                efficient and sustainable code that can adept to the changing
                needs of a business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
