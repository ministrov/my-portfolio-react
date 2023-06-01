
import '../styles/about.css';
import myPicture from '../img/my-picture.jpg';
import shapes from '../img/shapes.png';
import { skills } from '../helpers/skills';

const About = () => {
  return (
    <>
      <main className="about">
        <h1 className="visually-hidden">Page about author</h1>
        <div className="container">
          <section className="about__section">
            {/* bottom */}
            <div className="about__bottom">
              {/* left */}
              <div className="about__left">
                {/* title */}
                <div className="about__title-block">
                  <div className="about__title-wrapper">
                    <h2 className="about__title title-1">#about-me</h2>
                    <div className="about__title-line">--------------</div>
                  </div>
                </div>
                <p className="about__description">
                  Hi, I'm Anton!
                  <br />
                  <br />
                  I'm a junior frontend developer with a passion for creating beautiful and functional websites. With a year and a half of experience in the industry, I have honed my skills in technical development, design principles, user experience, and effective communication.
                  <br />
                  <br />
                  Through my work, I strive to create engaging and intuitive web experiences that delight users and drive business results. In this portfolio, I showcase a range of projects that demonstrate my technical proficiency, design skills, and ability to work collaboratively with teams to achieve project goals.
                </p>
                {/* button */}
                <div className="about__button-block">
                  <a
                    href="#!"
                    className="about__link"
                  >
                    <button>Read more -{">"}</button>
                  </a>
                </div>
              </div>
              {/* right */}
              <div className="about__right">
                <img className="about__image" src={myPicture} alt="Focus on author's face" />
              </div>
            </div>
          </section>

          <section className="skills__section">
            <h2 className="skills__title title-1">#skills</h2>
            <div className="skills__bottom">
              <div className="skills__left">
                <img className="about__image" src={shapes} alt="a diffrent of shapes" />
              </div>
              <div className="skills__right">
                {skills.map(skill => (
                  <>
                    <div className="skills__elements" key={skill.id}>
                      <div className="skills__title-wrapper">
                        <h2 className="skills__title">{skill.title}</h2>
                      </div>
                      <div className="skills__items">
                        {skill.languages.map((language) => {
                          return <span>{language}</span>;
                        })}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default About;