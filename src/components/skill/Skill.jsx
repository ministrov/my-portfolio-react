import ConicAnimation from '../conicAnimation/ConicAnimation';
import './style.css';

const Skill = ({ skill }) => {
  return (
    <ConicAnimation>
      <div
        className="skill__card"
        aria-label={skill.tech}
      >
        <div className="skill__card-icon">{skill.icon}</div>
        <span className="skill__card-header">{skill.tech}</span>
      </div>
    </ConicAnimation>
  );
}

export default Skill;