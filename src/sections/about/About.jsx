import Button from "../../components/button/Button";
import Heading from "../../components/heading/Heading";
import myPicture from "../../assets/my-avatar.jpg";
import "./style.css";

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <Heading
          title={"About"}
          slogan={
            "Unleash the power of code and create extraordinary digital experiences."
          }
          className="about__title"
        ></Heading>

        <div className="about__wrapper">
          <div
            className="about__left"
          >
            <p className="about__description">
              Hi, I'm Anton!
              <br />
              <br />
              I am a frontend developer with 3 years of experience. I specialize
              in creating functional and beautiful interfaces for web
              applications. My job is to help the customer realize his idea and
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

            <div className="about__button-block">
              <Button
                href={"#!"}
                text={"Read more >"}
                className={"btn--theme btn--med"}
              />
            </div>
          </div>

          <div
            className="about__right"
          >
            <img
              className="about__image"
              src={myPicture}
              alt="Focus on author's face"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
