import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import Heading from '../../components/heading/Heading';
import './style.css';

const ProjectsHeader = ({ breadcrumbs, title, slogan }) => {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <Heading title={title} className="projects__title" slogan={slogan} />
    </>
  );
};

export default ProjectsHeader;
