import Header from '../components/header/Header';
import Video from '../components/video/Video';

/**
 * 
 * Change className at the content-list to not duplicate with another section
 */

const Home = () => {
  return (
    <>
      <Header />

      <main className="section">
        <h1 className="visually-hidden">Home page of the author</h1>
        <section className='section-content'>
          <h2 className='visually-hidden'>Frontent Anton Zhilin</h2>
          <div className="container">

            <ul className="content-list">
              <li className="content-list__item">
                <h2 className="title-2">Frontend</h2>
                <p>JavaScript, ReactJS, HTML, CSS, NPM, BootStrap, MaterialUI, Yarn, TailwindCSS, StyledComponents</p>
              </li>
              <li className="content-list__item">
                <h2 className="title-2">Backend</h2>
                <p>NodeJS, MySQL, MongoDB, PHP, Laravel</p>
              </li>
            </ul>

          </div>
        </section>

        <section className="section-about">
          <div className="container">
            <h2 className="section-about__title title-2">About</h2>
          </div>
          <div className="container">
            <p className="section-about__descr">
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
            </p>

            <Video/>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home;