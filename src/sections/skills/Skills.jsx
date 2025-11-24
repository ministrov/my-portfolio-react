import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Heading from '../../components/heading/Heading';
import Skill from '../../components/skill/Skill';
import { itemsArrayForLeft } from './skills';
import { itemsArrayForRight } from './skills';
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
        ></Heading>
      </div>

      <div className="skills__list-container">
        <motion.ul
          className="skills__list"
          style={{ display: 'flex', width: '200%' }}
          {...animationConfigRight}
        >
          {[...itemsArrayForRight, ...itemsArrayForRight].map((skill) => (
            <li key={skill.id + Math.random()}>
              <Skill skill={skill} />
            </li>
          ))}
        </motion.ul>

        {/* Анимируем влево (left) */}
        <motion.ul
          className="skills__list"
          style={{ display: 'flex', width: '200%' }}
          {...animationConfigLeft}
        >
          {[...itemsArrayForLeft, ...itemsArrayForLeft].map((skill) => (
            <li key={skill.id + Math.random()}>
              <Skill skill={skill} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Skills;
