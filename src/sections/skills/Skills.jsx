import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Heading from '../../components/heading/Heading';
import SkillComponet from '../../components/skillComponent/SkillComponent';
import { skills } from './skills';
import './style.css';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

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

        <motion.ul
          initial="hidden"
          whileInView="show"
          variants={container}
          className="skills__list"
        >
          {skills.map((skill) => (
            <motion.li
              key={skill.id}
              transition={{ duration: 0.5 }}
              variants={item}
              className="skill__card"
              aria-label={skill.tech}
            >
              <SkillComponet
                key={skill.id}
                skill={skill}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Skills;
