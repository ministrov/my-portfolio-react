import PropTypes from 'prop-types';
import { memo } from 'react';

/**
 * Макет секции проектов.
 * Оборачивает содержимое в семантическую секцию с контейнером.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Дочерние элементы
 * @returns {JSX.Element} Макет секции проектов
 */
const ProjectsLayout = ({ children }) => {
  return (
    <section className="projects">
      <div className="container">{children}</div>
    </section>
  );
};

ProjectsLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(ProjectsLayout);
