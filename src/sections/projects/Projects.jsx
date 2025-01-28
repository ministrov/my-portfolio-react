import FilterButton from '../../components/filterButton/FilterButton';
import Heading from "../../components/heading/Heading";
import ProjectsList from "../../components/projectsList/ProjectsList";
import { filters } from '../../data/filter';
import "./style.css";

const Projects = () => {
  return (
    <section className="projects">
      <div className="container">
        <Heading
          title={"Projects"}
          className="projects__title"
          slogan={
            "Unleash the power of code and create extraordinary digital experiences."
          }
        ></Heading>

        <div className="projects__filter">
          <ul className="projects__filter-list">
            {filters.map((filter) => (
              <li key={filter.id} className="projects__filter-list-item">
                <FilterButton
                  filterName={filter.name}
                  onClick={() => console.log(`filter name: ${filter.name}`)}
                />
              </li>
            ))}
          </ul>
        </div>

        <ProjectsList />
      </div>
    </section>
  );
};

export default Projects;
