import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import './style.css';

const variants = {
  hidden: { opacity: 0 },
  visible: (index) => ({
    opacity: 1,
    transition: { delay: index * 0.6 },
  }),
};

const SkillComponet = ({ skill, custom }) => {
  if (!skill) return null;

  return (
    <motion.li
      key={skill.id}
      variants={variants}
      initial={'hidden'}
      animate={'visible'}
      className="skill__card"
      custom={custom}
      aria-label={skill.tech}
    >
      <div className="skill__left">
        <div className="skill__card-icon">{skill.icon}</div>
        <span className="skill__card-header">{skill.tech}</span>
      </div>

      <p className="skill__count">
        <CountUp
          end={skill.percent}
          duration={5}
          delay={2}
          className="skill__percent-num"
        />%
      </p>
    </motion.li>
  );
};

export default SkillComponet;
