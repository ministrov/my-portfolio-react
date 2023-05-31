/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import '../styles/about.css';
import myPicture from '../img/my-picture.jpg';
import shapes from '../img/shapes.png';

import Video from '../components/video/Video';

const About = () => {
  return (
    <>
      <main className="about">
        <>
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
                    Hello, i’m Anton!
                    <br />
                    <br />
                    I’m a self-taught front-end developer based in Moscow, Russia. I
                    can develop responsive websites from scratch and raise them into
                    modern user-friendly web experiences.
                    <br />
                    <br />
                    Transforming my creativity and knowledge into a websites has been
                    my passion for over a three year. I have been helping various clients to
                    establish their presence online. I always strive to learn about
                    the newest technologies and frameworks.
                  </p>
                  {/* button */}
                  <div className="about__button-block">
                    <a
                      href="#"
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
              {/* bottom */}
              <h2 className="skills__title title-1">#skills</h2>

              <div className="skills__bottom">
                {/* left */}
                <div className="skills__left">
                  <img className="about__image" src={shapes} alt="a diffrent of shapes" />
                </div>
                <div className="skills__right">
                  <Video/>
                </div>
              </div>
            </section>
          </div>
        </>
      </main>
    </>
  )
}

export default About;