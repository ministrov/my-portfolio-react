import CollapsingSidebar from "../collapsingSidebar/CollapsingSidebar";
import Heading from "../heading/Heading";
import ProjectsList from "../projectsList/ProjectsList";
import "./style.css";

const routes = [
  { id: 1, title: "Home", icon: "fas-solid fa-house", path: "/" },
  { id: 2, title: "Sales", icon: "chart-line", path: "/sales" },
  { id: 3, title: "Costs", icon: "chart-column", path: "/costs" },
  { id: 4, title: "Payments", icon: "wallet", path: "/payments" },
  { id: 5, title: "Finances", icon: "chart-pie", path: "/finances" },
  { id: 6, title: "Messages", icon: "envelope", path: "/messages" },
];

const settings = [
  { id: 1, title: "Settings", icon: "fas-solid fa-house", path: "/settings" },
  { id: 2, title: "Support", icon: "chart-line", path: "/support" },
];

// console.log(routes);

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

        <ProjectsList />

        <CollapsingSidebar routes={routes} settings={settings} />
      </div>
    </section>
  );
};

export default Projects;
