import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tag from '../tag/Tag';
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
  custom
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: (index) => ({
      opacity: 1,
      transition: { delay: index * 0.5 },
    }),
  };
  return (
    <motion.li
      variants={variants}
      initial={'hidden'}
      animate={'visible'}
      custom={custom}
      className="project-card__item"
      tabIndex={0}
    >
      <motion.div
        whileHover={{ scale: 1.04, transition: 0.7 }}
        className="project-card__image"
      >
        <NavLink to={`/project/${id}`} className={'project-card__link'}>
          <Image
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
      </motion.div>

      <div className="project-card__info">
        <h3 className="project-card__title">{title}</h3>

        <div className="project-card__skills">
          <h4 className="project-card__title">Tools:</h4>
          <ul className="project-card__list">
            {skills.map((skill, index) => (
              <Tag key={`id - ${index}: ${skill}`}>{skill}</Tag>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
  );
};

export default ProjectCard;
