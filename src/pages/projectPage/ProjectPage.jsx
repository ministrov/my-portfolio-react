// import { useEffect } from 'react';
// import { useParams, useSearchParams } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { Helmet } from 'react-helmet-async';
// import Heading from '../../components/heading/Heading';
// import Project from '../../components/project/Project';
// import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
// import { projects } from '../../sections/projects/projects';
// import './style.css';

// const ProjectPage = () => {
//   const { id } = useParams();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { t } = useTranslation();

//   useEffect(() => {
//     if (id) {
//       const newParams = new URLSearchParams(searchParams);
//       newParams.set('project_id', id);
//       setSearchParams(newParams);
//     }
//   }, [id, searchParams, setSearchParams]);

//   if (!projects[id - 1]) {
//     return <div className="container">Project not found</div>;
//   }

//   const project = projects[id - 1];

//   const BREADCRUMBS = [
//     { id: 1, name: t('breadcrumbs.home'), link: '/' },
//     { id: 2, name: t('breadcrumbs.projects'), link: '/projects' },
//     { id: 3, name: t('breadcrumbs.project') },
//   ];

//   const META_TAGS = {
//     title: `Page of the project: ${project.title}`,
//     description: `Detailed information about project: ${project.title}`,
//     canonical: `/project/${id}`,
//   };

//   return (
//     <>
//       <Helmet>
//         <title>{META_TAGS.title}</title>
//         <meta name="description" content={META_TAGS.description} />
//         <link rel="canonical" href={META_TAGS.canonical} />

//         <meta property="og:title" content={META_TAGS.title} />
//         <meta property="og:description" content={META_TAGS.description} />
//         <meta property="og:url" content={META_TAGS.canonical} />
//       </Helmet>

//       <section className="project-page">
//         <h1 className="visually-hidden">Page about {project.title} project</h1>
//         <div className="container">
//           <div className="project-details">
//             <Breadcrumbs items={BREADCRUMBS} />

//             <Heading title={t(project.title)} slogan={t(project.slogan)} />

//             <Project project={project}/>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProjectPage;
