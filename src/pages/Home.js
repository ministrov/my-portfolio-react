import Header from '../components/header/Header';
import Video from '../components/video/Video';

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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque facilis assumenda illum ex! Quod omnis nostrum neque minima accusantium tenetur praesentium ducimus dolore, quisquam corporis, impedit provident nulla eaque vero culpa quia asperiores voluptatibus blanditiis ad tempore corrupti laudantium nesciunt illo! Eos rerum voluptatum laborum in aut esse reiciendis eligendi dolores voluptatem veniam ex rem fugit ipsam mollitia, voluptatibus facere fuga? Voluptas repellat officia reiciendis molestias optio id facilis, ducimus deleniti nostrum in aperiam cum corporis rerum quo alias, quasi obcaecati incidunt consequuntur sint fugit! Harum reprehenderit, consectetur provident hic alias cupiditate voluptas quaerat, ab, nemo ipsum illo ipsa libero? A maiores, in delectus perferendis fugit quas dolorem magnam aspernatur! Nostrum, doloribus ducimus maiores, quisquam tempore magni consequatur, repellendus quibusdam assumenda illum sunt labore tempora error. Aut accusamus corrupti voluptates blanditiis nihil consectetur totam reprehenderit sunt molestiae veritatis, itaque est expedita, debitis ducimus repellat, hic optio dolorum nobis temporibus doloremque? Rem nulla expedita dicta incidunt assumenda est aliquid minima harum id. Dolores architecto, nemo asperiores ratione in doloremque consequuntur mollitia error labore dolorem placeat neque adipisci est animi exercitationem quis nesciunt sunt consectetur. Culpa quibusdam reprehenderit cumque eius laboriosam, nihil id, optio vitae minima perspiciatis quae enim, natus debitis repudiandae!
            </p>

            <Video/>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home;