import './style.css';

const Skill = ({ skill }) => {
  return (
    <div
      key={skill.id}
      className="skill__card"
      aria-label={skill.tech}
    >
      <div className="skill__card-icon">{skill.icon}</div>
      <span className="skill__card-header">{skill.tech}</span>
    </div>
  );
}

export default Skill;