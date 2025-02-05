import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Heading from "../components/heading/Heading";
import Button from "../components/button/Button";
import Image from '../components/image/Image';
import SkillComponet from "../components/skillComponent/SkillComponent";
import ScrollUp from '../components/scrollUp/scrollUp';
import { projects } from "../data/projects";
import { motion } from "framer-motion";

const ProjectPage = () => {
  const { id } = useParams();
  const project = projects[id];

  return (
    <>
      <Helmet>
        <title>{`${project.title}`}</title>
        <meta
          name="description"
          content={`Page of the project name: ${project.title}`}
          data-rh="true"
        />
        <link rel="canonical" href="/product/:id" />  
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="visually-hidden">Page about single author's project</h1>
        <div className="container">
          <div className="project-details">
            <Button
              text={"Back to Projects"}
              className={"project-details__btn btn--theme"}
              href={"/projects"}
            />
            <Heading title={project.title} slogan={project.slogan} />
            <Image 
              className="project-details__cover"
              src={project.webpBig}
              fallback={project.fullImg}
              alt={project.title}
            />
            <div className="project-details__content">
              <h2 className="project-detail__overview">Project Overview</h2>

              <p className="project-detail__text-overview">{project.overview}</p>

              <p className="project-detail__text-overview">{project.overview}</p>

              <h3 className="project-detail__overview">Tools Used</h3>

              <ul className="project-detail__tools-list">
                {project.skills.split(", ").map((item) => (
                  <SkillComponet key={item} skillName={item} />
                ))}
              </ul>

              <h4 className="project-detail__overview">See Live</h4>

              <div className="project-details__links">
                <Button
                  text={"Live Link"}
                  href={"/"}
                  className={"project-detail__btn btn--med btn--theme"}
                />
                <Button
                  text={"Code Link"}
                  href={"/"}
                  className={"project-detail__btn btn--med btn--theme-inv"}
                />
              </div>
            </div>
          </div>
        </div>

        <ScrollUp/>
      </motion.div>
    </>
  );
};

export default ProjectPage;
