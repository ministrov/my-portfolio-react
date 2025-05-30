import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Heading from '../../components/heading/Heading';
import Button from '../../components/button/Button';
import Image from '../../components/image/Image';
import SkillComponet from '../../components/skillComponent/SkillComponent';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { projects } from '../../helpers/mocks/projects';
import './style.css';

const ProjectPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('project_id', id);
      setSearchParams(newParams);
    }
  }, [id, searchParams, setSearchParams]);

  if (!projects[id - 1]) {
    return <div className="container">Project not found</div>;
  }

  const project = projects[id - 1];

  const BREADCRUMBS = [
    { id: 1, name: t('breadcrumbs.home'), link: '/' },
    { id: 2, name: t('breadcrumbs.projects'), link: '/projects' },
    { id: 3, name: t('breadcrumbs.project') },
  ];

  const META_TAGS = {
    title: `Page of the project: ${project.title}`,
    description: `Detailed information about project: ${project.title}`,
    canonical: `/project/${id}`,
  };

  return (
    <>
      <Helmet>
        <title>{META_TAGS.title}</title>
        <meta name="description" content={META_TAGS.description} />
        <link rel="canonical" href={META_TAGS.canonical} />

        <meta property="og:title" content={META_TAGS.title} />
        <meta property="og:description" content={META_TAGS.description} />
        <meta property="og:url" content={META_TAGS.canonical} />
      </Helmet>

      <section className="project-page">
        <h1 className="visually-hidden">Page about {project.title} project</h1>
        <div className="container">
          <div className="project-details">
            <Breadcrumbs items={BREADCRUMBS} />

            <Heading title={t(project.title)} slogan={t(project.slogan)} />

            <div className="project-details__cover">
              <Image
                src={project.webpBig}
                fallback={project.fullImg}
                width={1200}
                height="auto"
                alt={project.title}
                loading="lazy"
              />
            </div>

            <div className="project-details__content">
              <p className="project-detail__text-overview">
                {t(project.overview)}
              </p>

              <h3 className="project-detail__overview">{t(project.tools)}</h3>
              <ul className="project-detail__tools-list">
                {project.skills.split(', ').map((item) => (
                  <SkillComponet key={item} skillName={item} />
                ))}
              </ul>

              <div className="project-detail__btn-box">
                {project.demoLink && (
                  <Button
                    text={'Demo'}
                    href={project.demoLink || '#'}
                    className="btn--theme-inv"
                  />
                )}
                {project.gitHubLink && (
                  <Button
                    text={'GitHub'}
                    href={project.gitHubLink}
                    className="btn--theme-inv"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectPage;
