import ButtonGitHub from '../components/buttonGitHub/ButtonGitHub';
import img from '../img/projects/02-big.jpg';

const Project = () => {
  return (
    <main className="section">
      <h1 className="visually-hidden">Page about single author's project</h1>
      <div className="container">
        <div className="project-details">

          <h2 className="title-1">Video service</h2>

          <img src={img} alt="" className="project-details__cover" />

            <div className="project-details__desc">
              <p>Skills: React, Node.js, MongoDB</p>
            </div>

            <ButtonGitHub link="https://github.com"/>
        </div>
      </div>
    </main>
  )
}

export default Project;