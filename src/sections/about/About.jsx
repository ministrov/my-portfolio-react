import Heading from "../../components/heading/Heading";
import Photo from "../../components/photo/Photo";
import "./style.css";

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <Heading
          title={"About"}
          slogan={
            "A Passion for Crafting Digital Experiences"
          }
          className="about__title"
        ></Heading>

        <div className="about__wrapper">
          <div
            className="about__left"
          >
            <p className="about__description">
              <span className="about__greeting">Hi, I'm Anton, a Frontend Developer!</span>
              <br />
              <br />
              With several years spent weaving pixels and lines of code into captivating experiences, I've honed my skills as a frontend developer who transforms visions into interactive realities. My job is to help the customer realize his idea and
              make the product user-friendly.
              <br />
              <br />
              To achieve this goal, I use the most modern technologies and
              tools. I also pay great attention to communication with the team
              and the customer in order to understand their needs and offer
              optimal solutions. I will be glad to discuss your project and
              contribute to its success.portfolio, I showcase a range of
              projects that demonstrate my technical proficiency, design skills,
              and ability to work collaboratively with teams to achieve project
              goals.
            </p>
          </div>

          <div
            className="about__right"
          >
            <Photo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
