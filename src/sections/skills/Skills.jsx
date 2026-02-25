import { useTranslation } from 'react-i18next';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import Heading from '../../components/heading/Heading';
import Skill from '../../components/skill/Skill';
import { itemsArrayForLeft, itemsArrayForRight } from './skills';
import './style.css';

import 'swiper/css';
import 'swiper/css/a11y';

const Skills = () => {
  const { t } = useTranslation();

  const animationConfigRight = {
    initial: { x: '0%' },
    animate: { x: '-50%' },
    transition: {
      repeat: Infinity,
      ease: 'linear',
      duration: 25,
    },
  };

  const animationConfigLeft = {
    initial: { x: '-50%' },
    animate: { x: '0%' },
    transition: {
      repeat: Infinity,
      ease: 'linear',
      duration: 25,
    },
  };

  return (
    <section className="skills">
      <div className="container">
        <Heading
          title={t('heading.mySkills.name')}
          slogan={t('heading.mySkills.subheading')}
          className="skills__title"
        />
      </div>

      <div className="skills__list-container">
        <LazyMotion features={domAnimation}>
          <m.ul
            className="skills__list"
            style={{ display: 'flex', width: '200%' }}
            {...animationConfigRight}
          >
            {[...itemsArrayForRight, ...itemsArrayForRight].map(
              (skill, index) => (
                <li key={index}>
                  <Skill skill={skill} />
                </li>
              )
            )}
          </m.ul>

          <m.ul
            className="skills__list"
            style={{ display: 'flex', width: '200%' }}
            {...animationConfigLeft}
          >
            {[...itemsArrayForLeft, ...itemsArrayForLeft].map(
              (skill, index) => (
                <li key={index}>
                  <Skill skill={skill} />
                </li>
              )
            )}
          </m.ul>
        </LazyMotion>
      </div>
    </section>
  );
};

export default Skills;
