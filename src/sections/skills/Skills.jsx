import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import SkillComponet from '../../components/skillComponent/SkillComponent';
import { skills } from '../../helpers/mocks/skills';
import './style.css';

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section className="skills">
      <div className="container">
        <Heading
          title={t('heading.mySkills.name')}
          slogan={t('heading.mySkills.subheading')}
          className="skills__title"
        ></Heading>

        <div className="skills__wrapper">
          <div className="skills__left">
            <h3 className="skills__left-heading">My Skills</h3>

            <ul className="skills__list">
              {skills.map((skill) => (
                <SkillComponet
                  variant={'skill-icon'}
                  key={skill.id}
                  skill={skill}
                />
              ))}
            </ul>
          </div>
          <div className="skills__right">
            <h3 className="skills__right-heading">Get to know me!</h3>

            <div className="skills__right-content">
              <p className="skills__text">
                As a Developer, I have a wide range of experience in front-end
                development. I am proficient in HTML, CSS, JavaScript, React. My
                strong experience in building responsive and dynamic interfaces
                using React and Next, and some time I can use vanilly JS, if it
                needs to my clients. It is allowed me to create engaging and
                interactive web applications.
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
