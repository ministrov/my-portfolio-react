import "./style.css";

const SkillComponet = ({ skill, variant, skillName }) => {
  return (
    <>
      {variant ? (
        <li key={skill.id} className="skill__card">
          <div className="skill__card-icon">{skill.icon}</div>
          <span className="skill__card-header">{skill.tech}</span>
        </li>
      ) : (
        <li className="skill__text" aria-label="label of skills">
          {skillName}
        </li>
      )}
    </>
  );
};

export default SkillComponet;
