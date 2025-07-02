import CountUp from 'react-countup';
import './style.css';

const Skill = ({ skill }) => {
  return (
    <li
      key={skill.id}
      className="skill__card"
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
    </li>
  );
}

export default Skill;