import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import Skill from '../../components/skill/Skill';
import { itemsArrayForLeft } from './skills';
import { itemsArrayForRight } from './skills';
// import { skills } from './skills';
import './style.css';

import 'swiper/css';
import 'swiper/css/a11y';

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
      </div>

      <div className="skills__list-container">
        <ul className="skills__list">
          {itemsArrayForRight.map((skill) => (
            <li key={skill.id}>
              <Skill skill={skill} />
            </li>
          ))}
        </ul>
        <ul className="skills__list">
          {itemsArrayForLeft.map((skill) => (
            <li key={skill.id}>
              <Skill skill={skill} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
