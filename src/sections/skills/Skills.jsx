import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import SkillComponet from '../../components/skillComponent/SkillComponent';
import { skills } from './skills';
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
            <h3 className="skills__left-heading">{t('skills.titleOne')}</h3>

            <ul className="skills__list">
              {skills.map((skill) => (
                <SkillComponet
                  key={skill.id}
                  skill={skill}
                />
              ))}
            </ul>
          </div>
          <div className="skills__right">
            <h3 className="skills__right-heading">{t('skills.titleTwo')}</h3>

            <div className="skills__right-content">
              <p className="skills__text">{t('skills.descriptionOne')}</p>
              <p className="skills__text">{t('skills.descriptionTwo')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
