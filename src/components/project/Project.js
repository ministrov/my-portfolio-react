import { NavLink } from 'react-router-dom';
import './style.css';

// Need to find out what this component for

const Project = ({ title, img, index }) => {
  return (
    <>
      <NavLink to={`/project/${index}`}>
        <li className="project">
          <img src={img} alt={title} className="project__img" />
          <h3 className="project__title">{title}</h3>
        </li>
      </NavLink>
    </>
  )
}

export default Project;