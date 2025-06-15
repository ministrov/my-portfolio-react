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

// return (
//   <motion.ol
//     variants={container}
//     initial="hidden"
//     animate="show"
//   >
//     <motion.li variants={item} />
//     <motion.li variants={item} />
//   </motion.ol>
// )

// const charVariants = {
//   hidden: { opacity: 0 },
//   reveal: { opacity: 1 },
// };

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
