import { useState } from 'react';
import { motion } from 'framer-motion';
import Promo from '../components/promo/Promo';
import Video from '../components/video/Video';
import HomeSkills from '../helpers/homeSkills';
import Modal from '../components/modal/Modal';
import myPicture from '../img/my-photo.webp';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onCloseHandler = (event) => {
    const target = event.target;

    if (target) setIsOpen(false);
  }

  return (
    <>
      <main className="section">
        <h1 className="visually-hidden">Home page of the author</h1>

        <Promo setIsOpen={setIsOpen}/>

        <section className="home-skills">
          <h2 className="visually-hidden">Frontent Anton Zhilin</h2>
          <h3 className="home-skills__title title-2">My Skills</h3>

          <div className="container">
            <div className="home-skills__wrapper">
              <motion.div
                className="home-skills__left"
                initial={{ x: -50, opacity: 1 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: 'tween', duration: 1 }}
              >
                {HomeSkills.map(skill => (
                  <div key={skill.id} className="home-skill__card">
                    <div className="home-skill__card-icon">
                      {skill.icon}
                    </div>
                    <div className="home-skill__card-header">
                      {skill.tech}
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div
                className="home-skills__right"
                initial={{ x: 50, opacity: 1 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: 'tween', duration: 1 }}
              >
                <h4>What <span>I can do</span></h4>

                <p>
                  As a Developer, I have a wide range of experience in front-end development. I am proficient in JavaScript , React, Vue , HTML and CSS. My strong experience in building responsive and dynamic interfaces using React and Redux, and some time I can use vanilly JS, if it needs to my clients. It is allowed me to create engaging and interactive web applications.
                </p>
                <p>
                  I have experience in using React for building scalable and maintainable applications. This has allowed me to create efficient and sustainable code that can adept to the changing needs of a business.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="about">

          <div className="container">
            <h2 className="about__title title-2">About</h2>

            <motion.p
              className="about__descr"
              initial={{ x: -50, opacity: 1 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ type: 'tween', duration: 1 }}
            >
              Stack: HTML, CSS, ECMAScript 6 (ES6), React, Vue<br/>
              <br />
              I am developing cross-platform web applications on HTML, CSS, ECMAScript 6 (ES6), React, Vue<br />
              <br />
              Since July 2021 I have been working in the company "Service Market" LLC, I am engaged in the maintenance and refinement of the site vamvoda.ru . As well as web development of a new company website from scratch . The company is engaged in the retail trade of water and food, as well as soft drinks.<br />
              <br />
              I will consider invitations to the role of junior Frontend Developer / HTML-coder.<br />
              <br />
              - Due to my vast life experience, I easily build communication with designers and testers, Backend developers and all team members.<br />

              - I am not afraid to learn new things<br />
              - I approach any task responsibly, I do it efficiently, I pay attention to details<br />
              - I have experience working in projects with different technologies: HTML, PUG, CSS, ECMAScript 6 (ES6), React, Vue, etc.<br />
              <br />
              I like to do my job efficiently, I know how to meet
              deadlines, quickly assimilate new information, attentive to details. The development awakened in me
            </motion.p>

            <section className="about-section">
              <div className="about-section__bottom">
                <motion.div
                  className="about-section__left"
                  initial={{ x: -50, opacity: 1 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ type: 'tween', duration: 1 }}
                >
                  <div className="about-section__title-block">
                    <div className="about-section__title-wrapper">
                      <h2 className="about-section__title title-1">#about-me</h2>
                      <div className="about-section__title-line">--------------</div>
                    </div>
                  </div>
                  <p className="about-section__description">
                    Hi, I'm Anton!
                    <br />
                    <br />
                    I'm a junior frontend developer with a passion for creating beautiful and functional websites. With a year and a half of experience in the industry, I have honed my skills in technical development, design principles, user experience, and effective communication.
                    <br />
                    <br />
                    Through my work, I strive to create engaging and intuitive web experiences that delight users and drive business results. In this portfolio, I showcase a range of projects that demonstrate my technical proficiency, design skills, and ability to work collaboratively with teams to achieve project goals.
                  </p>

                  <div className="about-section__button-block">
                    <a
                      href="#!"
                      className="about-section__link"
                    >
                      <button>Read more -{">"}</button>
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="about-section__right"
                  initial={{ x: 50, opacity: 1 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ type: 'tween', duration: 1 }}
                >
                  <img className="about-section__image" src={myPicture} alt="Focus on author's face" />
                </motion.div>
              </div>
            </section>
          </div>

          <Video />
        </section>
      </main>

      <Modal open={isOpen} onClose={onCloseHandler}>
        Fancy modal
      </Modal>
    </>
  )
}

export default Home;