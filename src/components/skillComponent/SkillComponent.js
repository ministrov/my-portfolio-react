import "./style.css";

const SkillComponet = ({ skill, variant, skillName }) => {
  return (
    <>
      {variant ? (
        <div role="listitem" key={skill.id} className="skill__card">
          <div className="skill__card-icon">{skill.icon}</div>
          <span className="skill__card-header">{skill.tech}</span>
        </div>
      ) : (
        <div role="textbox" className="skill__text">
          {skillName}
        </div>
      )}
    </>
  );
};

export default SkillComponet;
