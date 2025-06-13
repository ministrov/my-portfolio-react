import CountUp from 'react-countup';
import './style.css';

const SkillComponet = ({ skill }) => {
  return (
    <li key={skill.id} className="skill__card" aria-label={`${skill.tech}`}>
      <div>
        <div className="skill__card-icon">{skill.icon}</div>
        <span className="skill__card-header">{skill.tech}</span>
      </div>

      <div>
        <CountUp
          end={skill.percent}
        />
        %
      </div>
    </li>
  );
};

export default SkillComponet;
