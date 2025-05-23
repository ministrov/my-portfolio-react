import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import SkillComponet from '../skillComponent/SkillComponent';
import { Tag } from '../tag/Tag.tsx';
import Image from '../image/Image';
import './style.css';

const ProjectCard = ({
  id,
  title,
  skills,
  img,
  wepImg,
  imageAlt,
  isProduction,
  custom,
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: (index) => ({
      opacity: 1,
      transition: { delay: index * 0.2 },
    }),
  };
  return (
    <motion.li
      whileHover={{ scale: 1.04, transition: 0.7 }}
      variants={variants}
      initial={'hidden'}
      animate={'visible'}
      custom={custom}
      className="project-card__item"
      tabIndex={0}
    >
      <NavLink to={`/project/${id}`} className={'project-card__link'}>
        <Image
          className="project-card__image"
          width={338}
          height={224}
          src={wepImg}
          fallback={img}
          alt={imageAlt}
        />
      </NavLink>

      {isProduction ? (
        <Tag color={'red'}>{'Production'}</Tag>
      ) : (
        <Tag color={'purple'}>{'Pet project'}</Tag>
      )}

      <h3 className="project-card__title">{title}</h3>

      <div className="project-card__skills">
        <h4 className="project-card__title">Tools:</h4>
        <ul className="project-card__list">
          {skills.map((skill) => (
            <SkillComponet key={uuidv4()} skillName={skill} />
          ))}
        </ul>
      </div>
    </motion.li>
  );
};

export default ProjectCard;
